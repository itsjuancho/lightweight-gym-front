"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import lwLogo from "../../public/lw-logo.svg";
import fab from "../../public/images/fab.svg";
import ig from "../../public/images/ig.svg";
import linke from "../../public/images/linke.svg";
import x from "../../public/images/x.svg";
import cart from "../../public/images/cart.svg";
import { Separator } from "../ui/separator";
import { ROUTE_CART, ROUTE_HOME } from "../../app/utils/routes";
import EditForm from "../../components/editForm/EditForm";
import PurchaseHistory from "../../components/purchaseHistory/PurchaseHistory";
import { useSession } from "../../hooks/sessionContext";
import useFindUserInfo from "../../hooks/useFindUserInfo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Profile = () => {
  const router = useRouter();
  const { session, setSession } = useSession();
  const [selectedOption, setSelectedOption] = useState("Purchase History");
  const { profile } = useFindUserInfo();
  const [titleOption, setTitleOption] = useState(null);
  const [loading, setLoading] = useState(true);

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

      <div className="bg-slate-950 h-[5rem]">
      </div>

      <div className="flex">
        <div className="bg-[#070a16] w-2/5 h-[65rem] flex flex-col items-center">
          <div>
            <Avatar className="my-10 mx-[10rem] w-[160px] h-[160px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

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
          <div className="cursor-pointer">
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

        <div className="bg-[#090808] w-full h-[65rem]">
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
