import React from "react";
import "../../app/globals.css";
import Logo from "@/public/images/Logo.png";
import GymMen from "@/public/images/menGym.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ROUTE_REGISTER } from "@/utils/routes";

function AuthForm({ title }) {
  const isSignUp = title.includes("Sign up");
  const SHOW_ELEMENT = {
    input: isSignUp ? "" : "hidden",
    label: isSignUp ? "hidden" : ""
  };

  return (
    <div className="authform w-full h-full">
      <div className="form-img hidden lg:hiden xl:block">
        <Image src={GymMen} />
      </div>

      <div className="form bg-black xl:w-4/5 w-full h-screen bg-gradient-to-t form-shadow-right">
        <div className="form-title flex  items-center w-full max-w-sm">
          <Image src={Logo} className="min-w-min p-5" />
          <h1 className="text-white coanda-bold text-2xl">
            <span className="text-white">{title}</span>
            <span className="text-red-500"> Lightweight</span>
          </h1>
        </div>
        <div className="text-white coanda-bold xl:w-2/6 md:w-7/12 w-4/5">
          <div className="grid w-full items-center gap-1.5 my-6 md:my-8">
            <Label htmlFor="email" className="text-2xl">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>

          <div className="flex justify-between items-center block">
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
              id="pass"
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
              id="password"
              className="bg-transparent border border-white w-full md:w-13"
            />
          </div>
        </div>
        <Button className="coanda-bold w-4/5 xl:w-2/6 md:w-7/12 bg-red-500 hover:bg-red-500 focus:bg-red-500 text-xl m-5 ">
          Login
        </Button>
        <Link
          href={ROUTE_REGISTER}
          className={`text-sm text-white coanda inline-block ${SHOW_ELEMENT.label}`} >Aren’t a member yet?<span className="inline border-b border-white"> Sign up instead</span>
        </Link>
      </div>
    </div>
  );
}

export default AuthForm;
