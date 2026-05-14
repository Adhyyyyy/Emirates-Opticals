"use client";

import React, { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/motion";

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  colorsCount: number;
  primaryImage: string;
  secondaryImage: string;
  isNew?: boolean;
  hasVirtualTryOn?: boolean;
}

export function ProductCard({
  id,
  brand,
  name,
  price,
  colorsCount,
  primaryImage,
  secondaryImage,
  isNew = false,
  hasVirtualTryOn = true,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link 
      href={`/product/${id}`}
      className="group relative flex flex-col items-center text-center w-full transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Indicators Layer - Layered Discovery */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
        <div className="flex-1" />
        
        {/* Try It On - Top Center Reveal */}
        {hasVirtualTryOn && (
          <m.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
            className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 shadow-sm"
          >
            <div className="w-2.5 h-2.5 relative">
              <div className="absolute inset-0 border-[1.5px] border-black rounded-full opacity-20" />
              <div className="absolute inset-[2px] bg-black rounded-full" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-black">Try It On</span>
          </m.div>
        )}

        {/* Wishlist - Top Right Reveal */}
        <div className="flex-1 flex justify-end">
          <m.button 
            animate={{ opacity: isHovered ? 1 : 0.3, scale: isHovered ? 1.1 : 1 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="transition-transform duration-300"
          >
            <Heart 
              className={cn(
                "w-4 h-4 transition-colors duration-300",
                isWishlisted ? "fill-black stroke-black" : "stroke-black/20 group-hover:stroke-black"
              )} 
            />
          </m.button>
        </div>
      </div>

      {/* Main Product Frame - Weighted Lift & Shadow */}
      <m.div 
        animate={{ 
          y: isHovered ? -12 : 0,
          boxShadow: isHovered 
            ? "0 40px 80px -20px rgba(0,0,0,0.12)" 
            : "0 0px 0px 0px rgba(0,0,0,0)"
        }}
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="relative w-full aspect-[4/3] bg-[#fcfcfc] flex items-center justify-center overflow-hidden cursor-pointer mb-8 group-hover:bg-white"
      >
        <AnimatePresence mode="wait">
          <m.div
            key={isHovered ? "secondary" : "primary"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.0, ease: EASE_LUXURY }}
            className="relative w-[80%] h-[80%]"
          >
            <Image
              src={isHovered ? secondaryImage : primaryImage}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </m.div>
        </AnimatePresence>

        {/* Cinematic Object Shadow */}
        <m.div 
          animate={{ 
            opacity: isHovered ? 0.2 : 0.6,
            scale: isHovered ? 1.4 : 1,
            y: isHovered ? 10 : 0
          }}
          transition={{ duration: 1.2, ease: EASE_LUXURY }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-1/4 h-2 bg-black/[0.08] blur-2xl rounded-full transition-all" 
        />
      </m.div>

      {/* Product Information - Subtle Vertical Shift */}
      <m.div 
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="flex flex-col gap-2 items-center"
      >
        <h3 className="text-[12px] md:text-[13px] font-bold text-black tracking-[0.1em] uppercase">
          {brand}
        </h3>
        <p className="text-[13px] md:text-[14px] text-black/50 italic font-serif">
          {name}
        </p>
        <div className="flex flex-col items-center mt-2">
          <p className="text-[12px] md:text-[13px] font-bold text-black">
            ${price.toLocaleString()}
          </p>
          <m.p 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="text-[9px] text-black/40 uppercase font-bold tracking-[0.3em] mt-3"
          >
            {colorsCount} Exclusive Colors
          </m.p>
        </div>
      </m.div>
    </Link>
  );
}
