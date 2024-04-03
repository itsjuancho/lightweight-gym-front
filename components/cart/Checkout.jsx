"use client";

import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import lwLogo from "../../public/lw-logo.svg";
import cart from "../../public/images/cart.svg";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  BASE_URL,
  COUPON_URL,
  ROUTE_HOME,
  ROUTE_PROFILE,
} from "../../app/utils/routes";
import Coupon from "../coupon/coupon";
import useShoppingCart from "../../hooks/useShoppingCart";
import useCreditCard from "../../hooks/useCreditCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "../ui/container";
import { Loader2, Trash2 } from "lucide-react";

const Checkout = () => {
  const phoneRegex = /^\d{5,}$/;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  const validatePhone = () => phoneRegex.test(phone);

  const handleNameChange = (event) => {
    setName(event.target.value);
    enableCheckoutButton();
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    enableCheckoutButton();
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    enableCheckoutButton();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    removeItem,
    removeCoupon,
    openModal,
    setOpenModal,
    nameUser,
    category,
    status,
  } = useShoppingCart();

  const enableCheckoutButton = () => {
    setIsButtonDisabled(
      !(name && address && validatePhone() && cartProducts.length > 0)
    );
  };

  const handleClose = () => {
    if (!status.title.includes("Error to buy products")) {
      router.push(ROUTE_HOME);
    }
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-slate-950 py-32">
      <Container className={"px-5 md:px-20 w-full"}>
        <motion.div
          className={`loading-screen ${loading ? "" : "hidden"}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center items-center h-screen bg-slate-950">
            <Loader2 className="animate-spin text-white size-8"/>
          </div>
        </motion.div>

        {!loading && (
          <>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>{status.title}</DialogTitle>
                  <DialogDescription className="text-lg">
                    {status.message}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="secondary"
                    className="bg-red-500 text-white text-lg"
                  >
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* <div className="flex justify-between items-center bg-black px-11">
            <a href={`/`} className="flex justify-center items-center">
              <Image src={lwLogo} alt="logo" className="w-[2rem] h-[2rem]" />
              <span className="coanda-bold mx-5 text-red-500 text-2xl">
                Lightweight
              </span>
            </a>
            <div className=" flex justify-between w-full">
              <div className="flex justify-evenly items-center text-white w-2/4 text-xl underline">
                <Link href={"/products"}>View Products</Link>
                <Link href={"/about-us"}>About Us </Link>
                <Link href={"/contact"}>Contact </Link>
              </div>

              <div className="flex justify-end items-center w-2/5 text-white">
                <div className="flex flex-col items-center mx-2">
                  <p className="text-center">{nameUser}</p>
                  <span className="text-center">{category} Category</span>
                </div>

                <Image src={cart} alt="cart" className="my-3" />

                <a href={ROUTE_PROFILE}>
                  <Avatar className="mx-4 cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </a>
              </div>
            </div>
          </div> */}

            {/* main */}
            <div className="flex flex-col md:flex-row w-full h-full">
              <ScrollArea className="h-full w-full p-4 bg-slate-950 aeonik">
                <div className="text-3xl text-white my-6">
                  <h1>
                    Shopping <span className="text-red-500 ">Cart</span> -{" "}
                    {cartProducts.length} Item/s
                  </h1>
                </div>

                <div className="text-white md:flex justify-between items-center text-xl my-8 hidden">
                  <p>Product Detail</p>
                  <div className="flex justify-evenly w-[48%]">
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Total</p>
                  </div>
                </div>

                <div className="w-full">
                  {cartProducts.map((prod) => (
                    <div
                      className="flex bg-white/80 border p-2 my-8 rounded-xl md:p-4 justify-center items-center"
                      key={prod.id}
                    >
                      <div className="flex items-center justify-center">
                        <Image
                          src={prod.img}
                          className="object-cover rounded-full"
                          alt="protein"
                          width={150}
                          height={150}
                        ></Image>
                      </div>

                      <div className="w-full md:p-2 ml-2">
                        <h3 className="md:text-lg text-sm leading-none">{prod.name}</h3>
                        <p className="hidden md:block">{prod.description}</p>
                      </div>

                      <div className="flex justify-center items-center text-black">
                        <Button
                          onClick={() =>
                            handleQuantityChange(prod.id, "decrement")
                          }
                          className="bg-transparent text-black hover:text-white text-2xl"
                        >
                          -
                        </Button>
                        <span className="bg-red-200 size-8 px-3 md:py-0.5 py-1 rounded md:text-lg">
                          {prod.quantity}
                        </span>
                        <Button
                          onClick={() =>
                            handleQuantityChange(prod.id, "increment")
                          }
                          className="bg-transparent text-black hover:text-white text-2xl"
                        >
                          +
                        </Button>
                      </div>

                      <div className="w-[33%] flex justify-center items-center">
                        <p className="text-xs md:text-base">{prod.price}</p>
                      </div>

                      <div className="w-[7%] flex justify-center items-center">
                        <p className="text-xs md:text-base">{parseFloat(prod.total).toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => removeItem(prod.id)}
                        className="text-red-500 text-base ml-2"
                      >
                        <Trash2/>
                      </button>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>

              <div className="flex flex-col justify-start items-center aeonik bg-slate-950 md:pl-8 md:w-1/2 text-white md:py-24">
                {showNotification && (
                  <div className="fixed top-[8%] z-10 text-center left-[79%] w-60 p-3 bg-red-500 text-white rounded shadow-lg">
                    Success
                  </div>
                )}

                <div className="w-full ">
                  <h2 className="w-full font-semibold text-2xl">
                    Order Summary
                  </h2>
                  <hr className="w-full" />
                </div>
                <div className="w-full h-full my-8">
                  <div className="flex justify-between font-semibold text-2xl">
                    <h3>Payment</h3>
                    <span>$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="grid w-full items-center gap-1.5 my-3">
                    <Label className="font-semibold text-xl my-2">
                      Invoicing for
                    </Label>
                    <Input
                      type="text"
                      id="account"
                      onChange={handleNameChange}
                      className="bg-transparent border border-white text-lg	"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 my-3">
                    <Label className="font-semibold text-xl my-2">
                      Address
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      onChange={handleAddressChange}
                      className="bg-transparent border border-white text-lg	"
                      placeholder="Your Address"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 my-3">
                    <Label className="font-semibold text-xl my-2">Phone</Label>
                    <Input
                      type="number"
                      id="phone"
                      onChange={handlePhoneChange}
                      className="bg-transparent border border-white text-lg	"
                      placeholder="Your Phone"
                    />
                  </div>
                  {/*                 <div className="grid w-full items-center gap-1.5  my-6">
                  <Label className="font-semibold text-xl my-2">Shipping</Label>
                  <Select>
                    <SelectTrigger className="bg-transparent border border-white text-lg">
                      <SelectValue placeholder="Select a account" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-lg">
                      <SelectItem value="1">123944-Lina Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                  <div className="font-semibold  my-6">
                    <Dialog className="w-full bg-blue dialog-size">
                      <DialogTrigger asChild>
                        <Button className="bg-transparent text-red-500 text-base hover:bg-red-500 hover:text-white">
                          View Coupons
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[80rem] h-[40rem] bg-[#232323] text-white w-full">
                        <DialogHeader>
                          <DialogTitle className="text-xl">
                            {" "}
                            My Coupons{" "}
                          </DialogTitle>
                          <Separator className="my-9 bg-slate-500" />
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
                              handleRemove={removeCoupon}
                            />
                          ))}
                        </div>

                        <DialogFooter>
                          <div>
                            <p>
                              By redeeming this coupon, you agree to abide by
                              the terms and conditions specified by the issuer.
                              This coupon is non-transferable and cannot be
                              combined with other offers. Validity dates apply.
                              The issuer reserves the right to modify or
                              terminate this offer at any time without prior
                              notice.
                            </p>
                          </div>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="secondary"
                              className="bg-slate-500 text-lg"
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <hr />
                  <div className="font-semibold  my-7">
                    <div className="flex justify-between my-5">
                      <p>SubTotal</p>
                      <span>$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between my-5">
                      <p>Coupon Discount</p>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between my-5">
                      <p>Total (Tax Incl.)</p>
                      <span>$ {totalToPay.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-items-center items-center my-6">
                    <Button
                      onClick={handleSubmit}
                      className="bg-red-500 text-base w-full"
                      disabled={isButtonDisabled}
                    >
                      {" "}
                      Checkout{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Checkout;
