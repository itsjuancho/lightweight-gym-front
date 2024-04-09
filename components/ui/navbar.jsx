"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import cart from "../../public/images/cart.svg";
import lwLogo from "../../public/lw-logo.svg";
import Container from "./container";

import {
  LOGIN_URL,
  ROUTE_ABOUT,
  ROUTE_CART,
  ROUTE_CONTACT,
  ROUTE_FAQ,
  ROUTE_FORGOT_PASS,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "../../app/utils/routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useSession } from "../../hooks/sessionContext";
import HamburgerIcon from "./burger";
import MenuPanel from "./mobile-menu";
import Link from "next/link";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { session, setSession, role } = useSession();
 /*  const [totalItem, setTotalItem] = useState(0); */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {totalItem} =useSession();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  const handleCloseSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setSession(null);
    window.location.reload()
  };

/*   useEffect(() => {
    const cartItems = localStorage.getItem("cartItem");
    if (cartItems) {
      const items = JSON.parse(cartItems);
      setTotalItem(items ? items.length : 0);
    }
  }, [totalItem]); */

/*   useEffect(() => {
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
  }, []); */

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <div
      className={`z-[1000] fixed top-0 h-20 md:h-28 w-screen aeonik bg-gradient-to-b from-slate-950 to-transparent text-gray-50 text-sm md:text-lg py-4 md:py-8 transition-all duration-500 ease-in-out ${
        visible ? "" : "-translate-y-[110%]"
      }`}
    >
      <Container className="px-5 md:px-20 flex justify-between items-center">
        <HamburgerIcon isOpen={isMenuOpen} toggle={toggleMenu} />
        <MenuPanel isOpen={isMenuOpen} />
        <a href="/" className="flex items-center">
          <Image
            src={lwLogo}
            alt="logo"
            width={32}
            height={32}
            className="md:w-auto md:h-auto"
          />
          <p className="coanda-bold ml-3 md:ml-6 text-sm md:text-lg">
            {role === "ROLE_ADMIN" ? "Administration" : "Lightweight"}
          </p>
        </a>

        <div className="hidden md:flex justify-end space-x-4 items-center w-[40%]">
          <div
            className={`text-red-500 ${
              session === null ? "visible" : "hidden"
            }`}
          >
            <a href={ROUTE_REGISTER}>Join/ </a>
            <a href={ROUTE_LOGIN}> Sign in</a>
          </div>
          <a href="/products">Products</a>
          <a href={ROUTE_FAQ}>FAQ</a>
          <a href={ROUTE_ABOUT}>About us</a>
          <a href={ROUTE_CONTACT}>Contact</a>

          {role === "ROLE_ADMIN" ? (
            <div className="space-x-4">
              <Link className="text-red-500 text-xl" href="/admin">
                Admin
              </Link>
              <button onClick={handleCloseSession}>Logout</button>
            </div>
          ) : (
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
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="shadcn"
                  />
                  <AvatarFallback>@</AvatarFallback>
                </Avatar>
              </a>
              <button onClick={handleCloseSession}>Logout</button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
