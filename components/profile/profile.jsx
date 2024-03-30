import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import lwLogo from "../../public/lw-logo.svg";
import cart from "../../public/images/cart.svg";
import { ROUTE_CART } from "../../app/utils/routes";

export const Profile = () => {
  return (
    <div>
      <div className="flex justify-between justify-center bg-black px-11">
        <a href={`/`} className="flex justify-center items-center">
          <Image src={lwLogo} alt="logo" className="w-[2rem] h-[2rem]" />
          <span className="coanda-bold mx-5 text-red-500 text-2xl">
            Lightweight
          </span>
        </a>
        <div className=" flex justify-between w-full">
          <div className="flex justify-evenly items-center text-white w-2/4 text-xl underline">
            <Link href={"/#services"}>View Products</Link>
            <Link href={"/#about"}>About Us </Link>
            <Link href={"/#contact"}>Contact </Link>
          </div>

          <div className="flex justify-end items-center w-2/5 text-white">
            <div className="flex flex-col items-center mx-2">
              <p className="text-center">Lina Huertas</p>
              <span className="text-center">Silver Category</span>
            </div>

            <a href={ROUTE_CART}>
            <Image src={cart} alt="cart" className="my-3 cursor-pointer" />
            </a>

            <Avatar className="mx-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};
