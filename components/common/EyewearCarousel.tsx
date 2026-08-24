"use client";

import React, { useRef } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FRAMES = [
  { id: 1, image: "/marqueopt/JMM-EvelynSun-MondaySun-1_1.webp" },
  { id: 2, image: "/marqueopt/JMM-Koenig-40Gold-1_1.webp" },
  { id: 3, image: "/marqueopt/JMM-KoenigSun-16HRoma-1A_1.webp" },
  { id: 4, image: "/marqueopt/JMM-Tomlin-5CArgyle-1_1.webp" },
  { id: 5, image: "/marqueopt/JMM-VivienneSun-5CArgyle-1_1.webp" },
  { id: 6, image: "/marqueopt/Maui-KAHANA-MatteBlackMauiHT-1.webp" },
  { id: 7, image: "/marqueopt/Maui-LELEKAWA-GreyStripe-1.webp" },
  { id: 8, image: "/marqueopt/Maui-OCEAN-TortoisewithPeacock-1.webp" },
];

export function EyewearCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <m.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[95%] max-w-[1600px] bg-white rounded-[2rem] md:rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#C9A84C]/20 px-4 md:px-12 py-3 md:py-4 z-50 group"
    >
      <div 
        ref={containerRef}
        className="flex items-center gap-6 md:gap-14 overflow-x-auto no-scrollbar scroll-smooth relative py-1"
      >
        {FRAMES.map((frame) => (
          <Link
            key={frame.id}
            href="/shop"
            className="flex-shrink-0 w-22 md:w-32 aspect-[2/1] relative cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-1 z-0 hover:z-10 group/item"
          >
            <div className="absolute inset-0 bg-[#C9A84C]/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 border border-[#C9A84C]/30" />
            <Image 
              src={frame.image}
              alt={`Shop Eyewear Frame ${frame.id}`}
              fill
              className="object-contain p-1 transition-transform duration-500 group-hover/item:scale-105"
              sizes="128px"
            />
          </Link>
        ))}
      </div>
    </m.div>
  );
}
