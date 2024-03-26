"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import lwLogo from "../../public/lw-logo.svg";
import Container from "./container";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const route = usePathname();
  const token = localStorage.getItem("token");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) setAuthorized(true);
    console.log(token, authorized);
  }, [token]);

  useEffect(() => {
    console.log("Authorization status:", authorized);
  }, [authorized]);

  return route === "/login" || route === "/register" ? null : (
    <div className="z-50 fixed top-0 h-28 min-w-[100dvw]  text-gray-50 text-2xl py-8">
      <Container className="px-20 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <Image src={lwLogo} />
          <p className="coanda-bold ml-6">Lightweight</p>
        </a>

        <ul className="flex space-x-4 text-lg">
          <li>
            <Link
              href="/products"
              className="group transition duration-300 animate-fade-in"
            >
              Products
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-white"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className="group transition duration-300 animate-fade-in"
            >
              About us
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-white"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="group transition duration-300 animate-fade-in"
            >
              Contact
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-white"></span>
            </Link>
          </li>
          {authorized ? (
            <button>Log out</button>
          ) : (
            <Link
              href="/login"
              className="group transition duration-300 animate-fade-in text-red-500"
            >
              Join/ sign in
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-red-500"></span>
            </Link>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;
