"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import profileIcon from "../../public/images/bxs-user-rectangle.svg";
import { Separator } from "../ui/separator";
import { ROUTE_CART, ROUTE_HOME } from "../../app/utils/routes";
import EditForm from "../../components/editForm/EditForm";
import PurchaseHistory from "../../components/purchaseHistory/PurchaseHistory";
import { useSession } from "../../hooks/sessionContext";
import useFindUserInfo from "../../hooks/useFindUserInfo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DropdownProfile from "../ui/DropdownProfile";
import HamburgerIcon from "../ui/burger";
import { Button } from "../ui/button";

export const Profile = () => {
  const router = useRouter();
  const { session, setSession } = useSession();
  const [selectedOption, setSelectedOption] = useState("Purchase History");
  const { profile } = useFindUserInfo();
  const [titleOption, setTitleOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTitleOption(option);
  };

  const handleCloseSession = () => {
    localStorage.removeItem("token");
    setSession(null);
    router.push(ROUTE_HOME);
  };
  const resetHandle = () => {
    console.log("wenas");
    window.location.reload();
  };

  return (
    <div>
      <motion.div
        className={`loading-screen ${loading ? "" : "hidden"}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-center items-center h-screen bg-black">
          <h1 className="text-3xl text-red-500 aeonik">Loading...</h1>
        </div>
      </motion.div>

      <div className="bg-slate-950 h-[5rem]"></div>
      <div className="flex relative">
        <Button
          onClick={toggleSidebar}
          className="Round bg-white absolute z-50 bottom-[10rem] left-[2rem] md:hidden cursor-pointer "
        >
          <Image src={profileIcon} alt="profile"></Image>
        </Button>

        <DropdownProfile isOpen={isOpen} toggleSidebar={toggleSidebar} handleCloseSession={handleCloseSession} handleOptionSelect={handleOptionSelect} profile={profile} />

        <div className="hidden md:block xl:w-2/6 w-3/6 h-[65rem] flex flex-col items-center bg-[#070a16]">
          <div>
            <div className="flex justify-center">
              <Avatar className="my-7 w-[160px] h-[160px]">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-white aeonik text-2xl">
              <h1 className="text-center">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-center text-white aeonik my-4">
                Account Balance: ${profile.creditBalance}
              </p>
              <p className="text-center text-red-500 aeonik">
                {profile.rank} Category
              </p>
            </div>
          </div>
          <Separator className="my-8 bg-gray-500" />
          <div className="cursor-pointer flex justify-center">
            <ul className="text-white aeonik text-2xl">
              <li onClick={() => handleOptionSelect("User Information")}>
                Edit Info
              </li>
              <li onClick={() => handleOptionSelect("Purchase History")}>
                Purchase History
              </li>
              <li onClick={handleCloseSession}>Logout</li>
            </ul>
          </div>
        </div>

        <div className="w-full h-[65rem] z-0">
          {selectedOption === "User Information" && (
            <EditForm
              firstName={profile.firstName}
              lastName={profile.lastName}
              email={profile.email}
              username={profile.username}
              document={profile.document}
              resetHandle={resetHandle}
            />
          )}
          {selectedOption === "Purchase History" && <PurchaseHistory />}
        </div>
      </div>
    </div>
  );
};
