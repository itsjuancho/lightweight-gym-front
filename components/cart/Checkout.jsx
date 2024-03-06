import React from "react";
import "@/app/globals.css";
import lwLogo from "@/public/lw-logo.svg";
import cart from "@/public/images/cart.svg";
import fab from "@/public/images/fab.svg";
import ig from "@/public/images/ig.svg";
import linke from "@/public/images/linke.svg";
import x from "@/public/images/x.svg";
import protein from "@/public/images/protein.png";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";



const Checkout = () => {
  return (
    <div>
      {/* header */}
      <div className="flex justify-between justify-center bg-black px-11">
        <a href={`/`} className="flex justify-center items-center">
          <Image src={lwLogo} className="w-[2rem] h-[2rem]" />
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
        <ScrollArea className="h-[100%] w-[80%] p-4 bg-[#222222] aeonik">
          <div className="text-3xl text-white my-6">
            <h1>
              Shopping <span className="text-red-500 ">Cart</span> - 10 Items
            </h1>
          </div>

          <div className="text-white flex justify-between items-center text-xl my-8">
            <p>Product Detail</p>
            <div className="flex justify-evenly w-3/4">
              <p>Quantity</p>
              <p>Price</p>
              <p>Total</p>
            </div>
          </div>

          <div className="h-[77%]">
            <div className="flex bg-[#D9D9D9]">

              <div className="flex items-center">
                <Image src={protein} alt="protein"></Image>
              </div>

              <div className="w-[30%] m-4 p-1">
                <h3 className="text-lg my-2">Favorite raw protein</h3>
                <p>
                  Energize with our premium Favorite Raw Protein blend, perfect
                  for post-workout recovery or on-the-go nutrition.
                </p>
              </div>

              <div className="flex justify-center items-center w-[15%] text-black">
                <Button className="bg-transparent text-black hover:text-white text-2xl">-</Button>
                <span className="bg-red-200 w-[3rem] h-[3rem] px-5 pt-2 text-lg">2</span>
                <Button className="bg-transparent text-black hover:text-white text-2xl">+</Button>
              </div>

              <div className="w-[22%] flex justify-center items-center">
                <h4>19.99</h4>
              </div>

              <div className="w-[16%] flex justify-center items-center">
                <h4>39.98</h4>
              </div>

            </div>
          </div>

          <div className="my-8">
            <Link href={"#"} className="text-red-500 text-xl">
              Continue Shopping
            </Link>
          </div>
        </ScrollArea>

        <div className="flex flex-col justify-start items-center aeonik bg-[#0E0E0E] w-3/12 text-white py-10">
          <div className="w-4/5">
            <h2 className="font-semibold text-2xl leading-[3.5rem] px-8">
              Order Summary
            </h2>
            <hr className="w-full" />
          </div>
          <div className="w-4/5 h-[70dvh] my-6">
            <div className="flex justify-between font-semibold text-2xl px-8">
              <h3>Items 10</h3>
              <span>$45.45</span>
            </div>
            <div className="grid w-full items-center gap-1.5 px-8 my-3">
              <Label className="font-semibold text-xl my-2">
                Account Holder
              </Label>
              <Input
                type="text"
                id="account"
                className="bg-transparent border border-white"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 px-8 my-6">
              <Label className="font-semibold text-xl my-2">Shipping</Label>
              <Select>
                <SelectTrigger className="bg-transparent border border-white text-base">
                  <SelectValue placeholder="Select a account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">1435 Master Card Colombia</SelectItem>
                  <SelectItem value="cst">
                    32452 Visa Card Nubank Colobia
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5 px-8 my-6">
              <Label className="font-semibold text-xl my-2">Enter Cupon</Label>
              <Input
                type="text"
                id="cupon"
                className="bg-transparent border border-white"
              />
            </div>

            <div className="font-semibold px-8 my-6">
              <Button className="bg-[#413E3E] text-base w-[144px] h-[44px]">
                Apply
              </Button>
              <Button className="bg-transparent text-red-500 text-base mx-6">
                View Coupns
              </Button>
            </div>

            <div className="grid w-full items-center gap-1.5 px-8 my-7">
              <Label className="font-semibold text-xl my-2">
                Payment Method
              </Label>
              <Select>
                <SelectTrigger className="bg-transparent border border-white text-base">
                  <SelectValue placeholder="Select a account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">1435 Master Card Colombia</SelectItem>
                  <SelectItem value="cst">
                    32452 Visa Card Nubank Colobia
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <hr />
            <div className="font-semibold px-8 my-7">
              <div className="flex justify-between my-5">
                <p>SubTotal</p>
                <span>$ 45.64</span>
              </div>

              <div className="flex justify-between my-5">
                <p>Shipping</p>
                <span>$ 20.43</span>
              </div>

              <div className="flex justify-between my-5">
                <p>Coupon Discount</p>
                <span>-$ 20.00</span>
              </div>
              <div className="flex justify-between my-5">
                <p>Total (Tax Incl.)</p>
                <span>$ 457.85</span>
              </div>
            </div>

            <div className="flex flex-col justify-items-center items-center my-6">
              <Button className="bg-red-500 text-base w-[90%]">
                {" "}
                Checkout{" "}
              </Button>
            </div>
          </div>
        </div>
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
