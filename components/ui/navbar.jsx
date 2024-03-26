"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import lwLogo from "../../public/lw-logo.svg";
import Container from "./container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOGIN_URL,
  ROUTE_CART,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
} from "../../app/utils/routes";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

        <ul className="flex justify-around w-[40%]">
          <li className="text-red-500">
            <Link href={ROUTE_LOGIN}>Join/</Link>
            <Link href={ROUTE_REGISTER}> sign in</Link>
          </li>
          <li>
            <a href="/about-us">About us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href={ROUTE_CART}>Cart</a>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;
