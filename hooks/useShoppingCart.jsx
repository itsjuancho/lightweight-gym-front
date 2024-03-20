import { useEffect, useState } from "react";
import { BASE_URL, COUPON_URL } from "../app/utils/routes";

function useShoppingCart(products) {
  const [formData, setFormData] = useState({
    accountId: "",
  });
  
  const [cartProducts, setCartProducts] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const token = localStorage.getItem("token");
  let couponsIds=[];
  
  useEffect(() => {
    if (products.length > 0) {
      setCartProducts(products);
      calculateSubTotal(products);
    }
  }, []);

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

  const calculateSubTotal = (cartProducts) => {
    let newSubtotal = 0;
    cartProducts.forEach((product) => {
      newSubtotal += parseFloat(product.price) * product.quantity;
    });
    setSubtotal(newSubtotal);
    if (couponsIds.length === 0){
      setTotalToPay(newSubtotal)
    }
  };

  const calculateDiscount = (couponId) => {
    
    couponsIds.push(couponId)

    console.log(couponsIds)
    if (couponsIds.length > 0) {
      let totalWithoutDiscount = subtotal;
      let totalDiscount = 0;
      couponsIds.forEach((couponId) => {
        let coupon = coupons.find((coupon) => coupon.id === couponId);
        if (coupon && !coupon.spent) {
          let discountAmount = Math.min(
            coupon.amount,
            totalWithoutDiscount * 0.3
          );
          totalDiscount += discountAmount;

          if (!appliedCoupons.includes(couponId)) {
            setAppliedCoupons([...appliedCoupons, couponId]);
          }
        }
      });

      let totalWithDiscount = totalWithoutDiscount - totalDiscount;
      setDiscount(totalDiscount);
      setTotalToPay(totalWithDiscount);
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
      calculateSubTotal(cartProducts);
      calculateDiscount();
    }

    setCartProducts(updatedProducts);
    calculateSubTotal(cartProducts);
    calculateDiscount();
    
  };

  const applyCoupon = (couponId) => {
    if (!appliedCoupons.includes(couponId)) {
      console.log("wenas")
      calculateDiscount(couponId);
      setAppliedCoupons([...appliedCoupons, couponId]);
    }

    console.log(discount);
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
  };
}

export default useShoppingCart;
