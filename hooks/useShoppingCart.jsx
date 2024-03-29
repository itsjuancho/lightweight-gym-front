"use client";

import { useEffect, useState } from "react";
import {
  BASE_URL,
  COUPON_CLIENT_URL,
  COUPON_URL,
  PURCHAGE_URL,
  ROUTE_LOGIN,
} from "../app/utils/routes";
import { useRouter } from "next/navigation";
import { useSession } from "./sessionContext";

function useShoppingCart() {
  const router = useRouter();
  const { session } = useSession();
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [profile, setProfile] = useState(null);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const accountId = 1;

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
  }, [appliedCoupons, coupons, discount]);

  useEffect(() => {
    const fetchCounpons = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/coupon/valid-coupons/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/coupon/valid-coupons/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCounpons();
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
      const price = parseFloat(
        updatedProducts[productIndex].price.replace(",", ".") || 0
      );
      updatedProducts[productIndex].total = price * newQuantity;
      setCartProducts(updatedProducts);
    }

    setCartProducts(updatedProducts);
  };

  const applyCoupon = (couponId) => {
    if (!appliedCoupons.includes(couponId)) {
      setAppliedCoupons([...appliedCoupons, couponId]);
    }
  };

  const removeItem = (prodId) => {
    const updatedProducts = cartProducts.filter((product) => product.id !== prodId);
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
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const purchaseDetails = cartProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));

      let requestData = {
        accountId: 1,
        storeSubscriptionId: 1,
        purchaseDetails: purchaseDetails,
        couponsIds: appliedCoupons,
      };

      const response = await fetch(`${BASE_URL}/${PURCHAGE_URL}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.log(response);
        return;
      }
      setShowNotification(true);
      setCartProducts([]);
      localStorage.setItem("cartItem", []);
    } catch (error) {
      console.error(error.message);
      setShowNotification(false);
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
  };
}

export default useShoppingCart;
