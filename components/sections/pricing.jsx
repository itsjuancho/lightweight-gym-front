import React from "react";
import Container from "../ui/container";
import Link from "next/link";

const Pricing = () => {
  return (
    // <div className="bg-[#030712] text-gray-50  flex flex-col justify-center items-center">
    //   <Container className="w-full px-5 md:px-20 py-16">
    //     <h1 className="md:text-heading text-4xl text-center md:text-start self-start md:mb-16 mb-8">Standard pricing options</h1>
    //     <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
    //       {packages.map((item, idx) => (
    //         <div key={idx} className="bg-gradient-to-b from-slate-900 to-transparent p-4 rounded-2xl flex flex-col justify-between items-start">
    //           <p className="text-3xl">{item.name}</p>
    //           <p className="text-red-500 text-xl">{item.price}</p>
    //           <ul className="mt-16 space-y-3 text-lg">
    //             {item.features.map((feature, idx) => (
    //               <li key={idx}>
    //                 <span className="text-red-500">✓</span>
    //                 {feature}
    //               </li>
    //             ))}
    //           </ul>
    //           <Link href={item.link} className="border-red-500 border rounded px-4 self-end text-lg mt-16">{item.buttonText}</Link>
    //         </div>
    //       ))}
    //     </div>
    //   </Container>
    // </div>
    <></>
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
    link: '/login'
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
    link: '/login'
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
    link: '/login'
  },
];
