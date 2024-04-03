import React, { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "./separator";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const DropdownProfile = ({
  handleOptionSelect,
  handleCloseSession,
  profile,
  isOpen,
  toggleSidebar,
}) => {
  return (
    <motion.div
      className={`bg-slate-950 my-7 h-[80vh] flex w-[20rem] flex-col justify-between ${
        isOpen ? "ml-0" : "-ml-72 "
      } absolute z-50 `}
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
    >
      <div className="py-4">
        <div>
          <div className="flex justify-center">
            <Avatar className="my-7 w-[120px] h-[120px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="text-white aeonik text-xl">
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
        <div className="flex justify-center">
          <ul className="text-white cursor-pointer">
            <li
              onClick={() => handleOptionSelect("User Information")}
              className="flex items-center py-2 px-4 aeonik text-2xl"
            >
              Edit Info
            </li>
            <li
              onClick={() => handleOptionSelect("Purchase History")}
              className="flex items-center py-2 px-4 aeonik text-2xl"
            >
              Purchase History
            </li>
            <li
              onClick={handleCloseSession}
              className="flex items-center py-2 px-4 aeonik text-2xl"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white mx-auto cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggleSidebar}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
            animate={{ rotate: isOpen ? 90 : 0 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default DropdownProfile;
