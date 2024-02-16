"use client";
import React, { useEffect, useRef } from "react";
import Container from "./ui/container";
import Image from "next/image";
import globe from "@/public/globe.svg";
import { motion, useInView } from "framer-motion";

const Services = () => {
    const ref1 = useRef(null);
    const isInView1 = useInView(ref1, { amount: 0.5, once: true });
  
    const ref2 = useRef(null);
    const isInView2 = useInView(ref2, { amount: 0.5, once: true });

    const fadeInUp = (delay) => ({
        initial: { opacity: 0, y: 20 },
        animate: (isInView) =>
          isInView ? { opacity: 1, y: 0, transition: { delay: delay, duration: 1.5 } } : '',
      });

  return (
    <div id='services' className="overflow-hidden min-h-[100dvh] bg-gradient-to-b from-[#210303] to-[#030712] text-gray-50 aeonik flex flex-col justify-center">
      <Container className="relative grid grid-cols-12 gap-5 px-20">
        <div className="col-span-3" />
        <div className="col-span-9">
          <motion.h2
            ref={ref1}
            initial={fadeInUp(0.5).initial}
            animate={fadeInUp(0.5).animate(isInView1)}
            className="coanda-bold text-red-500 text-5xl"
          >
            Join us at LightWeight and unlock a world of elite advantages—where
            every workout brings you closer to your peak
          </motion.h2>
          <motion.div
            ref={ref2}
            initial={fadeInUp(0.5).initial}
            animate={fadeInUp(0.5).animate(isInView2)}
            className="grid grid-cols-9 text-2xl mt-14"
          >
            <span className="col-span-3">(BENEFITS)</span>
            <p className="col-span-6">
              Leverage every purchase at{" "}
              <b className="text-red-500">Lightweight</b> to amplify your
              gains—inside and outside the gym. Our app rewards you with coupons
              redeemable across all our locations nationwide, turning your
              dedication into tangible rewards. As you invest in your strength,
              you&apos;ll accumulate member points, elevating your status and
              unlocking a cascade of passive perks. With each level, the
              benefits grow, enhancing your journey to peak fitness.
            </p>
          </motion.div>
        </div>
        <Image
          src={globe}
          className="absolute -bottom-[460px] -left-20 w-[729px] -rotate-6 opacity-30"
          alt="Enjoy our benefits globally"
        />
      </Container>
    </div>
  );
};

export default Services;