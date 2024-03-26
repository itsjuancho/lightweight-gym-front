import { useEffect, useState } from "react";
import { BASE_URL, COUPON_URL, PURCHAGE_URL } from "../app/utils/routes";

function useShoppingCart(products) {
  const [cartProducts, setCartProducts] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [couponsIds, setCouponsIds] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
      calculateSubTotal(cartProducts);
      calculateDiscount()
    
  }, [subtotal,cartProducts,couponsIds]);
  
   useEffect(() => {
    const fetchCounpons = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${COUPON_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    if (couponsIds.length === 0) {
      setTotalToPay(newSubtotal);
    }
  };

  const calculateDiscount = () => {
    if (couponsIds.length > 0) {
      let totalWithoutDiscount = subtotal;
      let totalDiscount = discount;

      couponsIds.forEach((couponId) => {
        let coupon = coupons.find((coupon) => coupon.id === couponId);
        if (coupon && !coupon.spent) {
          totalDiscount += coupon.amount;
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
      setCouponsIds([...couponsIds, couponId]);
      setAppliedCoupons([...appliedCoupons, couponId]);
    }
  };

  const removeItem = (prodId) => {
    const updatedProducts = products.filter((product) => product.id !== prodId);
    console.log(updatedProducts);
    setCartProducts(updatedProducts);
    localStorage.setItem("cartItem", JSON.stringify(updatedProducts));
  };

  const removeCoupon = (cupId) => {
    const updatedCoupon = coupons.filter((counpon) => counpon.id !== cupId);
    const updatedCouponApplied = appliedCoupons.filter((id) => id !== cupId);
    setCoupons(updatedCoupon);
    setAppliedCoupons(updatedCouponApplied);
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
        console.error(response);
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
  };
}

export default useShoppingCart;
