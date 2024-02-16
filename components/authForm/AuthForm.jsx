import React from "react";
import "../../app/globals.css";
import Logo from "@/public/images/Logo.png";
import GymMen from "@/public/images/menGym.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function AuthForm({ title }) {
  return (
    <div className="authform min-w-max min-h-screen">
      <div className="form-img">
        <Image src={GymMen} />
      </div>

      <div className="form bg-black w-4/5 bg-gradient-to-t form-shadow-right">
        <div className="form-title flex  items-center w-full max-w-sm">
          <Image src={Logo} className="min-w-min p-5" />
          <h1 className="text-white coanda-bold text-2xl">
            <span className="text-white">{title}</span>
            <span className="text-red-500"> Lightweight</span>
          </h1>
        </div>
        <div className="text-white coanda-bold w-2/6 ">
          <div className="grid w-full items-center gap-1.5 my-6">
            <Label htmlFor="email" className="text-2xl">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="bg-transparent border border-white w-13"
            />
          </div>

          <div className="flex justify-between items-center">
            <div> <Label htmlFor="password" className="text-2xl"> Password </Label></div>
            <div><Link href="#" className="text-sm coanda">Forgot your password?</Link></div>
          </div>

          <div className="w-full">
            <Input type="password" id="pass" className="bg-transparent border border-white "/>
          </div>

        </div>
        <Button className="coanda-bold w-1/3 bg-red-500 hover:bg-red-500 focus:bg-red-500 text-xl m-5 ">
          Login
        </Button>
        <Link href="#" className="text-sm text-white coanda">Aren’t a member yet? Sign up instead</Link>
        
      </div>
    </div>
  );
}

export default AuthForm;
