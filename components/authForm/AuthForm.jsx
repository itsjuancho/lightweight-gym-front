"use client";
import React from "react";
import Logo from "../../public/lw-logo.svg";
import GymMen from "../../public/images/menGym.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import ShowAlert from "../../components/alert/ShowAlert";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  ROUTE_FORGOT_PASS,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
} from "../../app/utils/routes";

function AuthForm({ title }) {
  const { formData, status, loading, handleChange, handleSubmit } = useAuth();

  const isSignUp = title.includes("Sign up");
  const isReg = usePathname().includes("register");

  formData.isRegister = isSignUp;
  const SHOW_ELEMENT = {
    input: isSignUp ? "" : "hidden",
    label: isSignUp ? "hidden" : "",
    buttonName: isSignUp ? "Register" : "Login",
  };

  return (
    <div className="flex w-screen min-h-[100dvh] overflow-x-hidden">
      <Image
        src={GymMen}
        alt="dude lifting weights"
        className="xl:w-[956px] 2xl:block hidden object-cover"
      />
      <div className="form bg-black w-full bg-gradient-to-t form-shadow-right py-16">
        <div className="form-title flex items-center justify-center w-full max-w-sm overflow-x-hidden">
          <Link href={ROUTE_HOME}>
            <Image src={Logo} alt="logo" className="mr-8" />
          </Link>
          <h1 className="text-white aeonik-bold text-2xl">
            <span className="text-white">{title}</span>
            <span className="text-red-500"> Lightweight</span>
          </h1>
        </div>
        <AnimatePresence>
          {status && (
            <ShowAlert
              type={status.includes("Success") ? "Success" : "Error"}
              message={status}
            />
          )}
        </AnimatePresence>
        <div className="text-white aeonik-bold xl:w-2/6 md:w-7/12 w-4/5">
          <div
            className={`grid w-full items-center gap-1.5 my-1 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="text" className="text-base">
              First name
            </Label>
            <Input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13 text-base font-normal"
            />
          </div>

          <div
            className={`grid w-full items-center gap-1.5 my-1 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="text" className="text-base">
              Last name
            </Label>
            <Input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13 text-base	font-normal"
            />
          </div>

          <div className={`grid w-full items-center gap-1.5 my-1`}>
            <Label htmlFor="text" className="text-base aeonik-bold">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13 text-base	font-normal"
            />
          </div>

          <div
            className={`grid w-full items-center gap-1.5 my-1 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13 text-base	font-normal"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="password" className="text-base aeonik-bold">
                Password
              </Label>
            </div>
            <div className={` ml-4 md:ml-0 ${SHOW_ELEMENT.label}`}>
              <Link href={ROUTE_FORGOT_PASS} className="aeonik text-xs">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="w-full md:mt-4">
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border border-white w-full text-base"
            />
          </div>

          <div
            className={`grid w-full items-center gap-1.5 my-1 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="password" className="text-base">
              Re-Password
            </Label>
            <Input
              type="password"
              id="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13 text-base"
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="aeonik-bold w-4/5 xl:w-2/6 md:w-7/12 text-white bg-red-500 hover:bg-red-500 focus:bg-red-500 text-base my-4"
        >
          {SHOW_ELEMENT.buttonName}
        </Button>
        <Link
          href={ROUTE_REGISTER}
          className={`text-xs text-white aeonik inline-block ${SHOW_ELEMENT.label}`}
        >
          Aren&apos;t a member yet?
          <span className="inline border-b border-white"> Sign up instead</span>

        </Link>

        {isReg && (
          <Link href={ROUTE_LOGIN} className={`text-xs text-white aeonik`}>
            Already a member?
            <span className="inline border-b border-white">
              {" "}
              Sign in instead
            </span>
          </Link>
        )}
        <a href={ROUTE_HOME} className=" my-4 text-white border-b border-white aeonik text-xs"> Back To Home</a>
      </div>
    </div>
  );
}

export default AuthForm;
