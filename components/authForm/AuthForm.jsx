'use client'
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
    <div className="authform w-screen min-h-[100dvh]">
      <Image src={GymMen} alt="gym men" className="xl:w-[956px] hidden sm:block" />
      <div className="form bg-black w-full bg-gradient-to-t form-shadow-right">
        <div className="form-title flex items-center justify-center w-full max-w-sm">
          <Image src={Logo} alt="logo" className="mr-8" />
          <h1 className="text-white coanda-bold text-2xl">
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
        <div className="text-white coanda-bold w-96">
          <div
            className={`grid w-full items-center gap-1.5 my-6 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="text" className="text-2xl">
              first name
            </Label>
            <Input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>

          <div
            className={`grid w-full items-center gap-1.5 my-6 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="text" className="text-2xl">
              Last name
            </Label>
            <Input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>

          <div className={`grid w-full items-center gap-1.5 my-6`}>
            <Label htmlFor="text" className="text-2xl">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>

          <div
            className={`grid w-full items-center gap-1.5 my-6 md:my-8 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="email" className="text-2xl">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="password" className="text-2xl">
                Password
              </Label>
            </div>
            <div className={` ml-4 md:ml-0 ${SHOW_ELEMENT.label}`}>
              <Link href="#" className="text-sm coanda">
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
              className="bg-transparent border border-white w-full"
            />
          </div>

          <div
            className={`grid w-full items-center gap-1.5 my-6 ${SHOW_ELEMENT.input}`}
          >
            <Label htmlFor="password" className="text-2xl">
              Re-Password
            </Label>
            <Input
              type="password"
              id="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="coanda-bold w-96 bg-red-500 hover:bg-red-500 focus:bg-red-500 text-xl my-5"
        >
          {SHOW_ELEMENT.buttonName}
        </Button>
        <Link
          href='/register'
          className={`text-sm text-white coanda inline-block ${SHOW_ELEMENT.label}`}
        >
          Aren&apos;t a member yet?
          <span className="inline border-b border-white"> Sign up instead</span>
        </Link>
        {isReg && (
          <Link
            href={'login'}
            className={`text-sm text-white coanda`}
          >
            Already a member?
            <span className="inline border-b border-white">
              {" "}
              Sign in instead
            </span>
          </Link>
        )}
        
      </div>
    </div>
  );
}

export default AuthForm;
