"use client";
import React from "react";
import Image from "next/image";
import lwLogo from "../../public/lw-logo.svg";
import Container from "./container";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const route = usePathname();
  console.log(route);

  return route === "/login" || route === "/register" ? null : (
    <div className="z-50 fixed top-0 h-28 min-w-[100dvw] aeonik text-gray-50 text-2xl py-8">
      <Container className="px-20 flex justify-between items-start">
        <a href="/" className="flex items-center">
          <Image src={lwLogo} />
          <p className="coanda-bold ml-6">Lightweight</p>
        </a>

        <ul>
          <li className="text-red-500">
            <Link href="/login">Join/ sign in</Link>
          </li>
          <li>
            <a href="/about-us">About us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;
