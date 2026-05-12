"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FRAMES = [
  { id: 1, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
  { id: 2, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=400" },
  { id: 3, image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400" },
  { id: 4, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400" },
  { id: 5, image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400" },
  { id: 6, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
  { id: 7, image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=400" },
  { id: 8, image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400" },
  { id: 9, image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=400" },
];

export function EyewearCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[95%] max-w-[1600px] bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 px-12 py-2 overflow-hidden z-50"
    >
      <div 
        ref={containerRef}
        className="flex items-center gap-10 md:gap-16 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {FRAMES.map((frame) => (
          <motion.div 
            key={frame.id}
            whileHover={{ scale: 1.1, y: -2 }}
            className="flex-shrink-0 w-24 md:w-32 aspect-[2/1] relative cursor-pointer group"
          >
            <Image 
              src={frame.image}
              alt={`Eyewear Frame ${frame.id}`}
              fill
              className="object-contain transition-all duration-500"
              sizes="128px"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
