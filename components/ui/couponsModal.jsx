import React, { useState } from "react";

const CouponsModal = ({ close }) => {
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const toggleCouponSelection = (index) => {
    setSelectedCoupons((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  console.log(selectedCoupons);

  return (
    <div className="z-50 min-h-[100dvh] w-full fixed top-0 left-0 bg-slate-900/50 flex justify-center items-center">
      <div className="p-4 z-50 w-1/2 h-[600px] max-h-[600px] bg-slate-800 rounded-xl border border-slate-300 flex flex-col justify-start items-start">
        <button
          onClick={close}
          className="group text-neutral-100 transition duration-300 animate-fade-in border px-4 py-1 rounded self-end"
        >
          Close
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-neutral-100"></span>
        </button>

        <div className="grid grid-cols-4 gap-5 w-full mt-4">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              onClick={() => toggleCouponSelection(index)}
              className={`p-2 flex flex-col justify-between items-start h-32 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl ${
                selectedCoupons.includes(index) ? "border" : ""
              }`}
            >
              <div>
                <span className="text-5xl font-bold text-red-500">
                  {coupon.discount}
                </span>
                <span className="ml-1">credits</span>
              </div>
              <span className="text-slate-400">
                Expires on: {coupon.expiresOn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;

const coupons = [
  { discount: "100", expiresOn: "11/03/2024" },
  { discount: "500", expiresOn: "20/03/2024" },
  { discount: "2500", expiresOn: "09/05/2024" },
  { discount: "1000", expiresOn: "20/03/2024" },
  { discount: "300", expiresOn: "10/04/2024" },
  { discount: "500", expiresOn: "04/03/2024" },
];
