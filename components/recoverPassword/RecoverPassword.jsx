import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "@/public/images/Logo.png";
import "../../app/globals.css";
import { useRouter } from "next/router";
import useRecoverPasswod from "@/hooks/useRecoverPasswod";
import { AnimatePresence } from "framer-motion";
import ShowAlert from "../alert/ShowAlert";
const RecoverPassword = ({ title, labelButton }) => {
  const router = useRouter();
  const { token } = router.query;
  const { formData, status, handleChange, handleSubmit } =
    useRecoverPasswod();
  const isForgot = labelButton.includes("Forgot");

  formData.token = token;
  formData.isForgot = isForgot;
  const SHOW_ELEMENT = {
    inputEmail: isForgot ? "" : "hidden",
    inputCurrent: isForgot ? "hidden" : "",
    tokenIsNotEmpty: "hidden",
  };

  if (!isForgot) {
    SHOW_ELEMENT.tokenIsNotEmpty="";
    SHOW_ELEMENT.inputEmail="hidden"
  }

  if (isForgot && token)  {
    SHOW_ELEMENT.tokenIsNotEmpty="";
    SHOW_ELEMENT.inputEmail="hidden"
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black w-screen h-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 shadow-xl  overflow-hidden py-28">
      <div className="flex items-center justify-center py-16">
        <Image src={Logo} alt="logo" className="mr-8" width={48} height={48} />
        <h1 className="text-white aeonik-bold text-2xl">{title}</h1>
      </div>

      <AnimatePresence>
         {status && (
             <ShowAlert
             type={status.includes("Success") ? "Success" : "Error"}
             message={status}
           />
        )} 
      </AnimatePresence>

      <div className="flex justify-center  w-[60dvh] min-h-[60dvh] mx-auto py-6">
        <div className="flex flex-col items-center text-white aeonik-bold ">
          <div className={`my-6 w-[33rem] ${SHOW_ELEMENT.inputEmail}`}>
            <Label className="text-2xl">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-white w-full text-2xl px-4 py-2 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>
          <div className={`my-6 w-[33rem] ${SHOW_ELEMENT.inputCurrent}`}>
            <Label className="text-2xl">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="bg-transparent border border-white w-full text-2xl px-4 py-2 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>

          <div className={`my-6 w-[33rem] ${SHOW_ELEMENT.tokenIsNotEmpty}`}>
            <Label className="text-2xl">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-transparent border border-white w-full text-2xl px-4 py-2 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>
          <div className={`my-6 w-[33rem] ${SHOW_ELEMENT.tokenIsNotEmpty}`}>
            <Label className="text-2xl">Re-Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-transparent border border-white w-full text-2xl px-4 py-2 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-[33rem] bg-red-500 hover:bg-red-600 focus:bg-red-600 text-xl py-6 m-10 mb-5 rounded-md"
          >
            {labelButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
