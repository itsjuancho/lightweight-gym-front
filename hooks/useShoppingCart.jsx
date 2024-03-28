import { useEffect, useState } from "react";
import { BASE_URL, COUPON_URL, PURCHAGE_URL } from "../app/utils/routes";

function useShoppingCart(products) {
  const [cartProducts, setCartProducts] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem("token");
      setToken(userToken);
    }
  }, [token]);

  let couponsIds = [];

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

  const calculateDiscount = (couponId) => {
    couponsIds.push(couponId);

    if (couponsIds.length > 0) {
      let totalWithoutDiscount = subtotal;
      let totalDiscount = discount;

      couponsIds.forEach((couponId) => {
        let coupon = coupons.find((coupon) => coupon.id === couponId);
        if (coupon && !coupon.spent) {
          totalDiscount += coupon.amount;
          if (!appliedCoupons.includes(couponId)) {
            setAppliedCoupons([...appliedCoupons, couponId]);
          }
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
      calculateSubTotal(cartProducts);
      calculateDiscount();
    }

    setCartProducts(updatedProducts);
    calculateSubTotal(cartProducts);
    calculateDiscount();
  };

  const applyCoupon = (couponId) => {
    if (!appliedCoupons.includes(couponId)) {
      console.log("wenas");
      calculateDiscount(couponId);
      setAppliedCoupons([...appliedCoupons, couponId]);
    }

    console.log(discount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const purchaseDetails = cartProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity, // Se establece la cantidad como 1 para cada producto
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
        console.error(response)
        return;
      }
      setShowNotification(true)
      setCartProducts([]);
      localStorage.setItem("cartItem", []);
    } catch (error) {
      console.error(error.message);
      setShowNotification(false)
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
  };
}

export default useShoppingCart;
