import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useSession } from "../../hooks/sessionContext";
import {
  LOGIN_URL,
  ROUTE_ABOUT,
  ROUTE_CART,
  ROUTE_CONTACT,
  ROUTE_FORGOT_PASS,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "../../app/utils/routes";
import cart from "../../public/images/cart.svg";

const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const MenuPanel = ({ isOpen }) => {
  const { session, setSession } = useSession();
  const [totalItem, setTotalItem] = useState(0);

  const handleCloseSession = () => {
    localStorage.removeItem("token");
    setSession(null);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItem");
    if (cartItems) {
      const items = JSON.parse(cartItems);
      setTotalItem(items ? items.length : 0);
    }
  }, [totalItem]);

  useEffect(() => {
    const handleStorageChange = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItem"));
      setTotalItem(cartItems ? cartItems.length : 0);
    };

    const handlePopState = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItem"));
      setTotalItem(cartItems ? cartItems.length : 0);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ ease: "circInOut" }}
      className="fixed top-0 left-0 h-full w-full bg-slate-900 text-white z-40"
    >
      <nav className="flex flex-col p-16 text-4xl bg-slate-900 min-h-[115dvh]">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col space-y-5">
            <a href="/products">Products</a>
            <a href={ROUTE_ABOUT}>About us</a>
            <a href={ROUTE_CONTACT}>Contact</a>
            <a href={ROUTE_CART} className="flex items-center relative">
              Cart
              <Badge
                className={`absolute bg-red-500 text-center -top-2 right-0`}
              >
                {totalItem}
              </Badge>
              <Image src={cart} alt="cart" className="" />
            </a>
            <a onClick={handleCloseSession} className="text-red-500">Logout</a>
            <div
              className={`text-red-500 ${
                session === null ? "visible" : "hidden"
              }`}
            >
              <a href={ROUTE_REGISTER}>Join/ </a>
              <a href={ROUTE_LOGIN}> Sign in</a>
            </div>
          </div>
          <div className={`flex flex-col ${session !== null ? "" : "hidden"}`}>
            <a href={ROUTE_PROFILE}>
              <Avatar className="cursor-pointer scale-125">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>@</AvatarFallback>
              </Avatar>
            </a>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default MenuPanel;
