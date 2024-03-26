"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import cart from "../../public/images/cart.svg";
import lwLogo from "../../public/lw-logo.svg";
import Container from "./container";
import Link from "next/link";
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

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [totalItem, setTotalItem] = useState(
    JSON.parse(localStorage.getItem("cartItem"))?.length || 0
  );

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  };

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
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const route = usePathname();

  return route !== "/" ? null : (
    <div
      className={`z-50 fixed top-0 h-28 min-w-[100dvw] aeonik text-gray-50 text-2xl py-8 ${
        visible ? "visible" : "hidden"
      }`}
    >
      <Container className="px-20 flex justify-between items-start">
        <a href="/" className="flex items-center">
          <Image src={lwLogo} alt="logo" />
          <p className="coanda-bold ml-6">Lightweight</p>
        </a>

        <ul className="flex justify-around items-center w-[40%]">
          <li className="text-red-500">
            <Link href={ROUTE_LOGIN}>Join/</Link>
            <Link href={ROUTE_REGISTER}> sign in</Link>
          </li>
          <li>
            <a href={ROUTE_ABOUT}>About us</a>
          </li>
          <li>
            <a href={ROUTE_CONTACT}>Contact</a>
          </li>
          <li className="flex">
            {localStorage.getItem("token") ? (
              <a href={ROUTE_CART}>
                <Badge
                  className={`absolute bg-red-500 text-center top-[30px] mx-3`}
                >
                  {totalItem}
                </Badge>
                <Image src={cart} alt="cart" className="my-3" />
              </a>
            ) : (
              ""
            )}
            {localStorage.getItem("token") ? (
              <a href={ROUTE_PROFILE}>
                <Avatar className="mx-4 my-2 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </a>
            ) : (
              ""
            )}
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;
