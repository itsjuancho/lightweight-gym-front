"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import lwLogo from "../../public/lw-logo.svg";
import fab from "../../public/images/fab.svg";
import ig from "../../public/images/ig.svg";
import linke from "../../public/images/linke.svg";
import x from "../../public/images/x.svg";
import cart from "../../public/images/cart.svg";
import { Separator } from "../ui/separator";
import { ROUTE_CART } from "../../app/utils/routes";
import EditForm from "../../components/editForm/EditForm";
import PurchaseHistory from "../../components/purchaseHistory/PurchaseHistory";

export const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [titleOption, setTitleOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTitleOption(option);
  };

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

      <div className="flex">
        <div className="bg-[#0E0E0E] w-2/5 h-[90vh] flex flex-col items-center">
          <div>
            <Avatar className="my-10 mx-10 w-[160px] h-[160px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="text-white aeonik text-2xl">
              <h1 className="text-center">Lina Huertas</h1>
              <p className="text-center text-red-500">Bronze Category</p>
            </div>
          </div>
          <Separator className="my-8 bg-gray-500" />
          <div className="cursor-pointer">
            <ul className="text-white aeonik text-2xl">
              <li onClick={() => handleOptionSelect("User Information")}>
                Edit Info
              </li>
              <li onClick={() => handleOptionSelect("Purchase History")}>
                Purchase History
              </li>
              <li onClick={() => handleOptionSelect("Purchase History")}>
                Logout
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#090808] w-full">
          {selectedOption === "User Information" && <EditForm />}
          {selectedOption === "Purchase History" && <PurchaseHistory/>}
        </div>
      </div>
      <footer className="flex justify-between bg-black text-white text-xl py-[1.2rem] px-12">
        <p>©2024 Lightweight</p>

        <div className="flex justify-evenly w-72">
          <Image src={fab} alt="facebook" />
          <Image src={linke} alt="Linkedin" />
          <Image src={x} alt="X" />
          <Image src={ig} alt="IG" />
        </div>
      </footer>
    </div>
  );
};
