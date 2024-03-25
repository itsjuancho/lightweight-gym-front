import Image from "next/image";
import React from "react";
import timer from "../../public/images/timer.svg";
import { Button } from "../ui/button";

const Coupon = ({
  amount,
  issueDate,
  dueDate,
  idCoupon,
  isApplied,
  applyCoupon,
}) => {
  const handleRedeemCoupon = () => {
    applyCoupon(idCoupon);
  };

  return (
    <div className="bg-[#353535] h-[13rem] w-[20rem] mx-4 my-4">
      <div className="flex flex-col justify-center items-center py-4">
        <div>
          <h3 className="text-3xl">{amount}</h3>
        </div>
        <span>Issue Date:{issueDate}</span>
        <span>ID: {idCoupon}</span>
      </div>
      <div
        className="flex
    "
      >
        <div>
           {isApplied ? (
           <Button
              disable
              className="bg-transparent text-white my-4 text-base mx-3"
            >
              Applied
            </Button>
          ) : (
            <Button
              onClick={handleRedeemCoupon}
              className="bg-transparent text-red-500 my-4 hover:bg-red-500 hover:text-white text-base mx-3"
            >
              Redeem Coupon
            </Button>
          )}
        </div>
        <div className="flex flex-col justify-items-center items-center">
          <p>Expiration Date</p>
          <div className="flex mx-4">
            <Image src={timer} alt="timer" className="w-[40px] mx-1" />
            <span>{dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
