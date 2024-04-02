"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductsCarousel = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    addAnimation();
    const randomProducts = async () => {
      try {
        const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
        const res = await fetch(`${backUrl}/product/random`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setSuggestions([]);
      }
    }

    randomProducts()
    console.log(suggestions, 'suggestions');
  }, [suggestions.length === 0]);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {suggestions.map((item, idx) => (
          <li
            className="overflow-hidden w-96 flex justify-start items-end min-h-96 max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.id}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-30 mt-6 flex flex-row">
                <div className="flex flex-col gap-1">
                  <span className=" text-xl leading-[1.6] text-gray-50 font-bold line-clamp-1">
                    {item.name}
                  </span>
                  <span className="leading-[1.6] text-gray-400 font-normal">
                    $ {item.price} Credits
                  </span>
                  <Link href={`/products/${item.id}`} className="bg-red-500 text-xl rounded-md w-32 mt-2 text-center">View
                  </Link>
                </div>
              </div>
            </blockquote>
            <div className="z-30 pointer-events-none w-full h-2/3 absolute top-0 left-0 bg-gradient-to-b from-transparent to-[#111827]"/>
            <Image src={item.images[1].url} alt={item.name} width={384} height={0} className="z-10 absolute top-0 left-0 w-full h-2/3 object-cover mb-3" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsCarousel;