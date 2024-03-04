import React from "react";
import "@/app/globals.css";
import lwLogo from "@/public/lw-logo.svg";
import cart from "@/public/images/cart.svg";
import fab from "@/public/images/fab.svg";
import ig from "@/public/images/ig.svg";
import linke from "@/public/images/linke.svg";
import x from "@/public/images/x.svg";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const Checkout = () => {
  return (
    <div>
      {/* header */}
      <div className="flex justify-between justify-center bg-black px-11">
        <a href={`/`} className="flex justify-center items-center">
          <Image src={lwLogo} />
          <span className="coanda-bold mx-5 text-red-500 text-2xl">
            Lightweight
          </span>
        </a>
        <div className=" flex justify-between w-full">
          <div className="flex justify-evenly items-center text-white w-2/4 text-xl underline">
            <Link href={"/#services"}>Services</Link>
            <Link href={"/#about"}>About Us </Link>
            <Link href={"/#contact"}>Contact </Link>
          </div>

          <div className="flex justify-end items-center w-2/5 text-white">
            <div className="flex flex-col items-center mx-2">
              <p className="text-center">Lina Huertas</p>
              <span className="text-center">Silver Category</span>
            </div>

            <Image src={cart} alt="cart" className="my-3" />

            <Avatar className="mx-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="flex w-full h-[84dvh]">

        <ScrollArea className="h-[100%] w-[80%] border p-4 bg-[#D9D9D9]">
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the king's pillow, in his
          soup, even in the royal toilet. The king was furious, but he couldn't
          seem to stop Jokester. And then, one day, the people of the kingdom
          discovered that the jokes left by Jokester were so funny that they
          couldn't help but laugh. And once they started laughing, they couldn't
          stop.
        </ScrollArea>

        <div className="bg-[#0E0E0E] w-6/12 text-white  ">checkout</div>
      </div>

      {/* footer */}
      <footer className="flex justify-between bg-black text-white text-xl py-[3.4rem] px-12">
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

export default Checkout;
