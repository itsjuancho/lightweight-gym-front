"use client";

import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import lwLogo from "../../public/lw-logo.svg";
import cart from "../../public/images/cart.svg";
import fab from "../../public/images/fab.svg";
import ig from "../../public/images/ig.svg";
import linke from "../../public/images/linke.svg";
import x from "../../public/images/x.svg";
import protein from "../../public/images/protein.png";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { BASE_URL, COUPON_URL, ROUTE_HOME } from "../../app/utils/routes";
import Coupon from "../coupon/coupon";
import useShoppingCart from "../../hooks/useShoppingCart";
import useCreditCard from "../../hooks/useCreditCard";

const Checkout = () => {
  const getProductLocalStorage = localStorage.getItem("cartItem");
  const products = getProductLocalStorage
    ? JSON.parse(getProductLocalStorage)
    : [];
  const { addCard, cards, formDataCard, handleChange, handleChangeSelect } =
    useCreditCard();
  const {
    subtotal,
    totalToPay,
    handleQuantityChange,
    cartProducts,
    applyCoupon,
    coupons,
    discount,
    appliedCoupons,
    handleSubmit,
    showNotification,
  } = useShoppingCart(products);

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

            <Image src={cart} alt="cart" className="my-3" />

            <Avatar className="mx-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
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
              Shopping <span className="text-red-500 ">Cart</span> -{" "}
              {cartProducts.length} Items
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

          <div className="h-[77%] w-[95%]">
            {cartProducts.map((prod) => (
              <div className="flex bg-[#D9D9D9] my-7" key={prod.id}>
                <div className="flex items-center">
                  <Image
                    src={prod.img}
                    alt="protein"
                    width={150}
                    height={150}
                  ></Image>
                </div>

                <div className="w-[30%] m-4 p-1">
                  <h3 className="text-lg my-2">{prod.name}</h3>
                  <p>{prod.description}</p>
                </div>

                <div className="flex justify-center items-center w-[10%] text-black">
                  <Button
                    onClick={() => handleQuantityChange(prod.id, "decrement")}
                    className="bg-transparent text-black hover:text-white text-2xl"
                  >
                    -
                  </Button>
                  <span className="bg-red-200 w-[3rem] h-[3rem] px-5 pt-2 text-lg">
                    {prod.quantity}
                  </span>
                  <Button
                    onClick={() => handleQuantityChange(prod.id, "increment")}
                    className="bg-transparent text-black hover:text-white text-2xl"
                  >
                    +
                  </Button>
                </div>

                <div className="w-[33%] flex justify-center items-center">
                  <h4>{prod.price}</h4>
                </div>

                <div className="w-[7%] flex justify-center items-center">
                  <h4>{parseFloat(prod.total).toFixed(2)}</h4>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
          <div className="my-8">
            <Link href={ROUTE_HOME} className="text-red-500 text-xl">
              Continue Shopping
            </Link>
          </div>
        </ScrollArea>

        <div className="flex flex-col justify-start items-center aeonik bg-[#0E0E0E] w-3/12 text-white py-10">
          {showNotification && (
            <div className="fixed top-[8%] z-10 text-center left-[79%] w-60 p-3 bg-red-500 text-white rounded shadow-lg">
              Success
            </div>
          )}

          <div className="w-4/5">
            <h2 className="font-semibold text-2xl leading-[3.5rem] px-8">
              Order Summary
            </h2>
            <hr className="w-full" />
          </div>
          <div className="w-4/5 h-[70dvh] my-2">
            <div className="flex justify-between font-semibold text-2xl px-8">
              <h3>Payment</h3>
              <span>$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="grid w-full items-center gap-1.5 px-8 my-3">
              <Label className="font-semibold text-xl my-2">
                Account Holder
              </Label>
              <Input
                type="text"
                id="account"
                className="bg-transparent border border-white text-lg	"
                placeholder="Your Name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 px-8 my-6">
              <Label className="font-semibold text-xl my-2">Shipping</Label>
              <Select>
                <SelectTrigger className="bg-transparent border border-white text-lg">
                  <SelectValue placeholder="Select a account" />
                </SelectTrigger>
                <SelectContent className="bg-white text-lg">
                  <SelectItem value="1">123944-Lina Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="grid w-full items-center gap-1.5 px-8 my-6">
              <Label className="font-semibold text-xl my-2">Enter Cupon</Label>
              <Input
                type="text"
                id="cupon"
                className="bg-transparent border border-white"
              />
            </div> */}

            <div className="font-semibold px-8 my-6">
              {/* <Button className="bg-[#413E3E] text-base w-[144px] h-[44px]">
                Apply
              </Button> */}

              <Dialog className="w-full bg-blue dialog-size">
                <DialogTrigger asChild>
                  <Button className="bg-transparent text-red-500 text-base hover:bg-red-500 hover:text-white">
                    View Coupns
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80rem] h-[40rem] bg-[#232323] text-white w-full">
                  <DialogHeader>
                    <DialogTitle> My Coupons </DialogTitle>
                    <Separator className="my-9 bg-gray-500" />
                  </DialogHeader>

                  <div className="flex flex-wrap h-[29rem]">
                    {coupons.map((counpon) => (
                      <Coupon
                        amount={counpon.amount}
                        idCoupon={counpon.id}
                        key={counpon.id}
                        dueDate={counpon.dueDate}
                        issueDate={counpon.issueDate}
                        applyCoupon={applyCoupon}
                        isApplied={appliedCoupons.includes(counpon.id)}
                      />
                    ))}
                  </div>

                  <DialogFooter>
                    <div>
                      <p>
                        By redeeming this coupon, you agree to abide by the
                        terms and conditions specified by the issuer. This
                        coupon is non-transferable and cannot be combined with
                        other offers. Validity dates apply. The issuer reserves
                        the right to modify or terminate this offer at any time
                        without prior notice.
                      </p>
                    </div>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-gray-500"
                      >
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid w-full items-center gap-1.5 px-8 my-7">
              <Label className="font-semibold text-xl my-2">
                Payment Method
              </Label>
              <Select disabled={true}>
                <SelectTrigger className="bg-transparent border border-white text-base">
                  <SelectValue placeholder={'debit credits from my account'} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem key={20} value={"myAccount"}>
                    debit my account
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* 
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#413E3E] w-[180px] h-[44px] my-2 text-base">
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#232323] text-white">
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Type
                      </Label>

                      <Select
                        id="cardType"
                        onValueChange={handleChangeSelect}
                        value={formDataCard.cardType}
                      >
                        <SelectTrigger className=" col-span-3 bg-transparent border border-white text-base">
                          <SelectValue placeholder="Select Payment Method" />
                        </SelectTrigger>
                        <SelectContent className="bg-white cursor-default">
                          <SelectItem value="MasterCard">
                            Master Card
                          </SelectItem>
                          <SelectItem value="VISA">Visa Card</SelectItem>
                          <SelectItem value="debit">Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Number</Label>
                      <Input
                        id="number"
                        className="col-span-3 bg-transparent border border-white"
                        value={formDataCard.number}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">due Date</Label>
                      <Input
                        id="username"
                        className="col-span-3 bg-transparent border border-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">CV OR CVV</Label>
                      <Input
                        id="username"
                        type="password"
                        className="col-span-3 bg-transparent border border-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => addCard(formDataCard)}
                      className="bg-red-500 text-whi"
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
            </div>
            <hr />
            <div className="font-semibold px-8 my-7">
              <div className="flex justify-between my-5">
                <p>SubTotal</p>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between my-5">
                <p>Coupon Discount</p>
                <span>- ${discount}</span>
              </div>
              <div className="flex justify-between my-5">
                <p>Total (Tax Incl.)</p>
                <span>$ {totalToPay.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col justify-items-center items-center my-6">
              <Button
                onClick={handleSubmit}
                className="bg-red-500 text-base w-[90%]"
              >
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
