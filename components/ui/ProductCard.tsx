"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/motion";

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price?: number;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showHoverEffects = isHovered && !isMobile;

  return (
    <Link 
      href={`/product/${id}`}
      className="group relative flex flex-col items-center text-center w-full transition-all duration-700 bg-white border border-black/[0.01] p-3 rounded-xl hover:shadow-2xl hover:shadow-brand-charcoal/[0.03]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Indicators Layer */}
      <div className="absolute top-6 inset-x-6 flex justify-between items-center z-10">
        <div className="flex-1" />
        
        {/* Try It On - Top Center Reveal */}
        {hasVirtualTryOn && !isMobile && (
          <motion.div 
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: showHoverEffects ? 0 : 8, opacity: showHoverEffects ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
            className="flex items-center gap-1.5 bg-brand-charcoal text-brand-gold px-3 py-1 rounded-[2px] border border-brand-gold/30 shadow-md"
          >
            <Sparkles className="w-2.5 h-2.5 text-brand-gold animate-pulse" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Try It On</span>
          </motion.div>
        )}

        {/* Wishlist - Top Right Reveal */}
        <div className="flex-1 flex justify-end">
          <motion.button 
            animate={{ opacity: isMobile ? 0.6 : (showHoverEffects ? 1 : 0.25), scale: showHoverEffects ? 1.08 : 1 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="transition-transform duration-300 p-1.5 rounded-full hover:bg-black/5"
          >
            <Heart 
              className={cn(
                "w-3.5 h-3.5 transition-colors duration-300",
                isWishlisted ? "fill-brand-gold stroke-brand-gold" : "stroke-brand-charcoal group-hover:stroke-brand-gold"
              )} 
            />
          </motion.button>
        </div>
      </div>

      {/* Main Product Frame - Weighted Lift & Shadow */}
      <motion.div 
        animate={{ 
          y: showHoverEffects ? -6 : 0,
          boxShadow: showHoverEffects 
            ? "0 16px 40px rgba(0,0,0,0.06)" 
            : "0 0px 0px 0px rgba(0,0,0,0)",
          borderColor: showHoverEffects 
            ? "rgba(201, 168, 76, 0.2)" 
            : "rgba(10, 10, 10, 0.02)"
        }}
        transition={{ duration: 0.8, ease: EASE_LUXURY }}
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#FAF9F6] to-[#F5F4F0] border border-black/5 flex items-center justify-center overflow-hidden cursor-pointer mb-6 rounded-[3px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showHoverEffects ? "secondary" : "primary"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: showHoverEffects ? 1.04 : 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY }}
            className="relative w-[75%] h-[75%]"
          >
            <Image
              src={showHoverEffects ? secondaryImage : primaryImage}
              alt={name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Object Shadow */}
        <motion.div 
          animate={{ 
            opacity: showHoverEffects ? 0.35 : 0.7,
            scale: showHoverEffects ? 1.25 : 1,
            y: showHoverEffects ? 6 : 0
          }}
          transition={{ duration: 1.0, ease: EASE_LUXURY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[35%] h-1.5 bg-black/[0.06] blur-xl rounded-full transition-all" 
        />
      </motion.div>

      {/* Product Information - Subtle Vertical Shift */}
      <motion.div 
        animate={{ y: showHoverEffects ? -4 : 0 }}
        transition={{ duration: 1.0, ease: EASE_LUXURY }}
        className="flex flex-col gap-1 items-center"
      >
        <h3 className="text-[10px] font-bold text-brand-gold tracking-[0.25em] uppercase">
          {brand}
        </h3>
        <p className="text-xs sm:text-sm font-bold font-heading tracking-tight uppercase text-brand-charcoal group-hover:text-brand-gold transition-colors duration-500 line-clamp-1">
          {name}
        </p>
        <div className="flex flex-col items-center mt-1">
          <p className="text-[11px] sm:text-xs font-bold text-brand-charcoal">
            ₹{(price || 0).toLocaleString("en-IN")}
          </p>
          <motion.p 
            animate={{ opacity: isMobile ? 1 : (isHovered ? 1 : 0) }}
            transition={{ duration: 0.4 }}
            className="text-[8px] text-brand-charcoal/40 uppercase font-bold tracking-[0.3em] mt-2.5 bg-brand-pearl/20 px-2 py-0.5 rounded-[2px]"
          >
            {colorsCount} Exclusive Colors
          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
}
