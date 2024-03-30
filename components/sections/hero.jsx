"use client";
import React from "react";
import Container from "../ui/container";
import Image from "next/image";
import overlay01 from "../../public/images/overlay01.png";
import pump01 from "../../public/images/pump01.png";
import arrowDown from "../../public/arrow-down.svg";
import { motion, cubicBezier } from "framer-motion";

const Hero = () => {

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-center">
      <Container className="md:pt-40 md:pb-16 grid grid-cols-1 sm:grid-cols-12 gap-5 px-5 md:px-20">
        <div className="relative z-20 sm:col-span-5 md:w-[637px]">
          <motion.h1
            variants={h1Variants}
            initial="initial"
            animate="animate"
            className="text-red-500 text-4xl text-center md:text-display coanda-bold sm:text-nowrap md:leading-normal leading-9"
          >
            Dominate the Iron
          </motion.h1>
          <motion.p
            variants={pVariants}
            initial="initial"
            animate="animate"
            className="sm:text-2xl text-lg text-justify mt-7"
          >
            not for the faint of heart—it&apos;s a haven for those who dare to
            push the boundaries of strength. With our exclusive membership
            perks, you&apos;ll gain access to redeemable coupons for each one of
            your purchases.
          </motion.p>
          <motion.button
            variants={btnVariants}
            initial="initial"
            animate="animate"
            className="bg-red-500 hover:bg-transparent border-transparent border hover:border-red-500 transition-colors px-6 py-2 w-full md:w-max rounded-sm md:mt-14 mt-32"
          >
            <a href="/login">Start your journey</a>
          </motion.button>
          <motion.div
            variants={btnVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col space-y-4 absolute md:bottom-0 bottom-12"
          >
            <Image
              src={arrowDown}
              alt="animate"
              className="animation-fadeInOut delay-0 w-6 2xl:w-full"
            />
            <Image
              src={arrowDown}
              alt="animate"
              className="animation-fadeInOut delay-300 w-6 2xl:w-full"
            />
            <Image
              src={arrowDown}
              alt="animate"
              className="animation-fadeInOut delay-700 w-6 2xl:w-full"
            />
          </motion.div>
        </div>
        <motion.div
          variants={imgVariants}
          initial="initial"
          animate="animate"
          className="relative md:col-span-7"
        >
          <Image src={pump01} alt="pupm01" className="hidden md:block" />
          <Image src={overlay01} alt="overlay" className="z-10 absolute top-0 hidden md:block" />
        </motion.div>
      </Container>
    </div>
  );
};

export default Hero;

const h1Variants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    ease: cubicBezier(0.65, 0.05, 0.36, 1),
    transition: {
      duration: 0.9,
    },
  },
};

const pVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    ease: cubicBezier(0.65, 0.05, 0.36, 1),
    transition: {
      duration: 0.6,
      delay: 0.3,
    },
  },
};

const btnVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    ease: cubicBezier(0.65, 0.05, 0.36, 1),
    transition: {
      duration: 0.3,
      delay: 0.6,
    },
  },
};

const imgVariants = {
  initial: {
    opacity: 0,
    translateX: -30,
  },
  animate: {
    opacity: 1,
    translateX: 0,
    ease: cubicBezier(0.65, 0.05, 0.36, 1),
    transition: {
      duration: 0.9,
      delay: 0.9,
    },
  },
};
