import React from "react";
import Container from "../../components/ui/container";
import arrowDown from "@/public/arrow-down.svg";
import Image from "next/image";

const Contact = () => {
  return (
    <div
      id="contact"
      className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50 aeonik flex flex-col justify-center"
    >
      <Container className="w-full py-16 grid grid-cols-12 gap-5 px-20">
        <div className=" col-span-12 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="coanda-bold text-4xl text-red-500">Let&apos;s do it</h1>
            <span className="text-2xl">
              Call us, or submit your email and we&apos;ll be in touch
            </span>
          </div>
          <span className="coanda-bold text-4xl text-red-500">
            (214) 296-5026
          </span>
        </div>

        <div className="col-span-12 mt-32">
          <form className="flex flex-col items-start justify-center">
            <div className="flex space-x-4">
              <span className="text-[74px]">I am</span>
              <input
                type="text"
                className="max-w-[517px] h-24 border-b-2 bg-transparent p-4 text-[74px]"
              />
            </div>
            <div className="flex space-x-4">
              <span className="text-[74px]">My email is</span>
              <input
                type="text"
                className="min-w-[517px] h-24 border-b-2 bg-transparent p-4 text-[74px]"
              />
            </div>
            <span className="text-[74px]">And I wanna join Lightweight.</span>
            <div className="flex justify-center items-center">
              <button className="coanda-bold text-red-500 text-[74px] mt-9 hover:underline">
                Send
              </button>
              <Image src={arrowDown} className="w-12 h-12 -rotate-90 mt-6 ml-5"/>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
