"use client";
import React, { useState, useEffect } from "react";
import Container from "../../components/ui/container";
import arrowDown from "../../public/arrow-down.svg";
import Image from "next/image";
import { Toaster, toast } from "sonner";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MobileVersion = () => (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50 flex flex-col justify-center py-10 px-5">
      <h1 className="text-heading coanda-bold text-red-500 mb-4">
        Let&apos;s do it
      </h1>
      <span className="text-xl text-balance">
        Call us, or submit your email and we&apos;ll be in touch
      </span>
      <span className="text-3xl text-red-500 mt-4">(214) 296-5026</span>
      <form className="flex flex-col items-start justify-center mt-10 w-full">
        <div className="flex flex-col mb-4 w-full">
          <span className="text-2xl">I am</span>
          <input
            type="text"
            className="w-full border-b-2 bg-transparent p-2 text-2xl"
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <span className="text-2xl">My email is</span>
          <input
            type="text"
            className="w-full border-b-2 bg-transparent p-2 text-2xl"
          />
        </div>
        <span className="text-2xl mb-4">And I wanna join Lightweight.</span>
        <div className="flex justify-center items-center">
          <button className="text-red-500 text-2xl hover:underline">
            Send
          </button>
          <Image
            src={arrowDown}
            alt="Arrow down"
            className="w-8 h-8 -rotate-90 ml-2"
          />
        </div>
      </form>
    </div>
  );

  return isMobile ? (
    <MobileVersion />
  ) : (
    <div
      id="contact"
      className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-center"
    >
      <Container className="w-full py-32 grid grid-cols-12 gap-5 md:px-20 px-5">
        <div className=" col-span-12 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="coanda-bold text-4xl text-red-500">
              Let&apos;s do it
            </h1>
            <span className="text-2xl">
              Call us, or submit your email and we&apos;ll be in touch
            </span>
          </div>
          <span className="coanda-bold text-4xl text-red-500">
            (214) 296-5026
          </span>
        </div>

        <div className="col-span-12 mt-20">
          <form className="flex flex-col items-start justify-center">
            <div className="flex space-x-4">
              <span className="text-[56px]">I am</span>
              <input
                type="text"
                className="max-w-[517px] h-24 border-b-2 bg-transparent p-4 text-[56px]"
              />
            </div>
            <div className="flex space-x-4">
              <span className="text-[56px]">My email is</span>
              <input
                type="text"
                className="min-w-[517px] h-24 border-b-2 bg-transparent p-4 text-[56px]"
              />
            </div>
            <span className="text-[56px]">And I wanna join Lightweight.</span>
            <div className="flex justify-center items-center">
              <div
                onClick={() =>
                  toast.message("Done!", {
                    description: "We will be in touch soon!",
                  })
                }
                className="coanda-bold text-red-500 text-[56px] mt-9 hover:underline"
              >
                Send
              </div>
              <Image
                src={arrowDown}
                className="w-12 h-12 -rotate-90 mt-6 ml-5"
              />
            </div>
          </form>
        </div>
      </Container>
      <Toaster position="bottom-right"/>
    </div>
  );
};

export default Contact;
