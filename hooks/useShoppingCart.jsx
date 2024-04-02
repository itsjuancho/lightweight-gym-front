"use client";

import { useEffect, useState } from "react";
import {
  BASE_URL,
  COUPON_CLIENT_URL,
  COUPON_URL,
  PROFILE_URL_REST,
  PURCHAGE_URL,
  ROUTE_HOME,
  ROUTE_LOGIN,
} from "../app/utils/routes";
import { useRouter } from "next/navigation";
import { useSession } from "./sessionContext";
import useFindUserInfo from "./useFindUserInfo";

function useShoppingCart() {
  const router = useRouter();
  const { session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const [nameUser, setNameUser] = useState(null);
  const [category, setCategory] = useState(null);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [status, setStatus] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    if (session === null) {
      router.push(ROUTE_LOGIN);
    }
  }, []);

  useEffect(() => {
    const getProductLocalStorage = localStorage.getItem("cartItem");

    if (getProductLocalStorage) {
      setCartProducts(JSON.parse(getProductLocalStorage));
    }
  }, []);

  useEffect(() => {
    calculateSubTotal(cartProducts);
  }, [subtotal, cartProducts]);

  useEffect(() => {
    calculateDiscount();
  }, [appliedCoupons, coupons, discount,subtotal]);

  useEffect(() => {
    const headers = new Headers();
    headers.append(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, X-Auth-Token"
    );
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append(
      "Access-Control-Expose-Headers",
      "Content-Length, X-Kuma-Revision"
    );
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("Authorization", `Bearer ${session}`);

    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const accountResponse = await fetch(
          `${BASE_URL}/${PROFILE_URL_REST}/${username}`,
          {
            headers: headers,
            method: "GET",
          }
        );
        if (!accountResponse.ok) {
          throw new Error(
            `Failed to get profile info ${await accountResponse.text()}`
          );
        }
        const accountData = await accountResponse.json();
        setAccountId(accountData.accountId);
        setNameUser(`${accountData.firstName} ${accountData.lastName}`);
        setCategory(accountData.rank);

        const couponsResponse = await fetch(
          `${BASE_URL}/coupon/valid-coupons/${accountData.accountId}`,
          {
            headers: headers,
            method: "GET",
          }
        );
        if (!couponsResponse.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const couponsData = await couponsResponse.json();

        setCoupons(couponsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedAccount(event.target.value);
  };

  const calculateSubTotal = (cartProducts) => {
    let newSubtotal = 0;
    cartProducts.forEach((product) => {
      newSubtotal += parseFloat(product.price) * product.quantity;
    });
    setSubtotal(newSubtotal);
    if (appliedCoupons.length === 0) {
      setTotalToPay(newSubtotal);
    }
  };

  const calculateDiscount = () => {
    if (appliedCoupons.length > 0) {
      let totalWithoutDiscount = subtotal;
      let totalDiscount = discount;

      appliedCoupons.forEach((couponId) => {
        let coupon = coupons.find((coupon) => coupon.id === couponId);
        if (coupon && !coupon.spent) {
          totalDiscount += coupon.amount;
          coupon.spent = true;
        }
      });

      let totalWithDiscount = totalWithoutDiscount - totalDiscount;
      if (totalWithDiscount <= 0) {
        setTotalToPay(0);
      } else {
        setTotalToPay(totalWithDiscount);
      }
      setDiscount(totalDiscount);
    } else {
      setTotalToPay(subtotal);
      setDiscount(0);
    }
  };

  const handleQuantityChange = (productId, operation) => {
    const productIndex = cartProducts.findIndex(
      (product) => product.id === productId
    );
    const updatedProducts = [...cartProducts];

    if (productIndex !== -1) {
      let newQuantity = updatedProducts[productIndex].quantity;
      if (operation === "increment") {
        newQuantity += 1;
      } else if (operation === "decrement" && newQuantity > 1) {
        newQuantity -= 1;
      }
      updatedProducts[productIndex].quantity = newQuantity;
      /*  const price = parseFloat(
        updatedProducts[productIndex].price.replace(",", ".") || 0
      ); */
      updatedProducts[productIndex].total =
        updatedProducts[productIndex].price * newQuantity;
      setCartProducts(updatedProducts);
    }

    setCartProducts(updatedProducts);
    localStorage.setItem("cartItem", JSON.stringify(updatedProducts));
  };

  const applyCoupon = (couponId) => {
    if (!appliedCoupons.includes(couponId)) {
      setAppliedCoupons([...appliedCoupons, couponId]);
    }
  };

  const removeItem = (prodId) => {
    const updatedProducts = cartProducts.filter(
      (product) => product.id !== prodId
    );
    setCartProducts(updatedProducts);
    localStorage.setItem("cartItem", JSON.stringify(updatedProducts));
  };

  const removeCoupon = (cupId) => {
    const updatedCouponApplied = appliedCoupons.filter((id) => id !== cupId);
    setAppliedCoupons(updatedCouponApplied);

    const updatedCoupons = coupons.map((coupon) => {
      if (coupon.id === cupId) {
        return { ...coupon, spent: false };
      }
      return coupon;
    });
    setCoupons(updatedCoupons);

    const couponsDeleted = coupons.find((coupon) => coupon.id === cupId);
    const updateDiscountTotal = discount - couponsDeleted.amount;
    setDiscount(updateDiscountTotal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(session)
      const headers = new Headers();
      headers.append("Access-Control-Allow-Headers", "Content-Type");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
      headers.append("X-Requested-With", "XMLHttpRequest");
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${session}`);
  
      const purchaseDetails = cartProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));

      let requestData = {
        accountId: accountId,
        storeSubscriptionId: null,
        purchaseDetails: purchaseDetails,
        couponsIds: appliedCoupons,
      };

      const response = await fetch(`${BASE_URL}/${PURCHAGE_URL}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setStatus({
          title: "Error to buy products",
          message: errorData.message,
        });
        setOpenModal(true);
        return;
      }

      if (response.ok) {
        setStatus({
          title: "Purchase Successfully Completed",
          message: "thank you very much for your purchase",
        });

        setCartProducts([]);
        localStorage.setItem("cartItem", []);
        setOpenModal(true);
        setTimeout(() => {
          router.push(ROUTE_HOME);
        }, 2000);
      }
    } catch (error) {
      console.error(error.message);
      setShowNotification(false);
      setOpenModal(true);
    }
  };

  return {
    cartProducts,
    subtotal,
    totalToPay,
    handleQuantityChange,
    applyCoupon,
    coupons,
    discount,
    appliedCoupons,
    handleSelectChange,
    handleSubmit,
    showNotification,
    removeItem,
    removeCoupon,
    openModal,
    setOpenModal,
    nameUser,
    category,
    status,
  };
}

export default useShoppingCart;
