"use client";

import React, { useRef } from "react";
import { m } from "framer-motion";
import Image from "next/image";

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
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[95%] max-w-[1600px] bg-white rounded-[2rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 px-4 md:px-12 py-2 md:py-3 z-50"
    >
      <div 
        ref={containerRef}
        className="flex items-center gap-6 md:gap-16 overflow-x-auto no-scrollbar scroll-smooth group/carousel relative"
      >
        {FRAMES.map((frame) => (
          <div 
            key={frame.id}
            className="flex-shrink-0 w-20 md:w-32 aspect-[2/1] relative cursor-pointer transition-all duration-500 group-hover/carousel:blur-[3px] group-hover/carousel:opacity-50 hover:!blur-none hover:!opacity-100 hover:!scale-125 hover:!-translate-y-1 z-0 hover:z-10"
          >
            <Image 
              src={frame.image}
              alt={`Eyewear Frame ${frame.id}`}
              fill
              className="object-contain"
              sizes="128px"
            />
          </div>
        ))}
      </div>
    </m.div>
  );
}
