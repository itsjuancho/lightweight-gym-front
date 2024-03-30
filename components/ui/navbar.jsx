"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import cart from "../../public/images/cart.svg";
import lwLogo from "../../public/lw-logo.svg";
import Container from "./container";
import { usePathname } from "next/navigation";
import {
  LOGIN_URL,
  ROUTE_ABOUT,
  ROUTE_CART,
  ROUTE_CONTACT,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "../../app/utils/routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useSession } from "../../hooks/sessionContext";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const {session, setSession } = useSession();
  const [totalItem, setTotalItem] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  const route = usePathname();

  return route !== "/" ? null : (
    <div
      className={`z-50 fixed top-0 h-28 w-screen aeonik bg-gradient-to-b from-slate-950 to-transparent text-gray-50 text-lg py-8 transition-all duration-500 ease-in-out ${
        visible ? "" : "-translate-y-[110%]"
      }`}
    >
      <Container className="px-20 flex justify-between items-start">
        <a href="/" className="flex items-center">
          <Image src={lwLogo} alt="logo" />
          <p className="coanda-bold ml-6">Lightweight</p>
        </a>

        <div className="flex justify-end space-x-4 items-center w-[40%]">
          <div
            className={`text-red-500 ${
              session === null ? "visible" : "hidden"
            }`}
          >
            <a href={ROUTE_REGISTER}>Join/ </a>
            <a href={ROUTE_LOGIN}> Sign in</a>
          </div>
            <a href="/products">Products</a>
            <a href={ROUTE_ABOUT}>About us</a>
            <a href={ROUTE_CONTACT}>Contact</a>

          <div className={`flex ${session !== null ? "" : "hidden"}`}>
            <a href={ROUTE_CART}>
              <Badge
                className={`absolute bg-red-500 text-center top-[30px] mx-3`}
              >
                {totalItem}
              </Badge>
              <Image src={cart} alt="cart" className="my-3" />
            </a>
            <a href={ROUTE_PROFILE}>
              <Avatar className="mx-4 my-2 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>@</AvatarFallback>
              </Avatar>
            </a>
            <button onClick={handleCloseSession}>Logout</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
