import React from "react";
import Container from "../ui/container";

const Pricing = () => {
  return (
    <div className="bg-[#030712] text-gray-50  flex flex-col justify-center items-center">
      <Container className="w-full">
        <h1 className="text-heading self-start mb-16">Standard pricing options</h1>
        <div className="grid grid-cols-3 gap-5">
          {packages.map((item, idx) => (
            <div key={idx} className="bg-gradient-to-b from-slate-900 to-transparent p-4 rounded-2xl flex flex-col justify-between items-start">
              <p className="text-3xl">{item.name}</p>
              <p className="text-red-500 text-xl">{item.price}</p>
              <ul className="mt-16 space-y-3 text-lg">
                {item.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="text-red-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="border-red-500 border rounded px-4 self-end text-lg mt-16">{item.buttonText}</button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Pricing;

const packages = [
  {
    id: 1,
    name: "Basic Gym Access",
    price: "$30/month",
    features: [
      "Unlimited gym access",
      "Free initial fitness consultation",
      "5% discount on all supplements and equipment",
    ],
    buttonText: "Get Started",
  },
  {
    id: 2,
    name: "Premium Membership",
    price: "$50/month",
    features: [
      "All Basic benefits",
      "Access to special classes (e.g., Yoga, Spinning)",
      "10% discount on supplements and equipment",
      "Free guest pass once a month",
    ],
    buttonText: "Go Premium",
  },
  {
    id: 3,
    name: "Credits Package",
    price: "$100 (for 110 credits, 10% bonus)",
    features: [
      "Pay for products, classes, and access with credits",
      "Exclusive members' discounts and offers",
      "Earn levels for additional discounts and vouchers",
      "Credits never expire",
    ],
    buttonText: "Buy Credits",
  },
];
