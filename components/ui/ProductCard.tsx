"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
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
    <div 
      className="group relative flex flex-col items-center text-center w-full max-w-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Actions Layer */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="p-2 transition-transform duration-300 hover:scale-110"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors duration-300",
              isWishlisted ? "fill-brand-gold stroke-brand-gold" : "stroke-brand-charcoal/20 group-hover:stroke-brand-charcoal"
            )} 
          />
        </button>
      </div>

      {/* Main Product Frame */}
      <div className="relative w-full aspect-[4/3] bg-transparent flex items-center justify-center overflow-hidden cursor-pointer mb-4 group-hover:opacity-80 transition-opacity duration-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={isHovered ? "secondary" : "primary"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-[90%] h-[90%]"
          >
            <Image
              src={isHovered ? secondaryImage : primaryImage}
              alt={name}
              fill
              className="object-contain drop-shadow-sm"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Virtual Try-On Badge Overlay */}
        {hasVirtualTryOn && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 shadow-sm border border-black/5"
          >
            <Maximize2 className="w-2.5 h-2.5 text-brand-gold" />
            <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-brand-charcoal">Virtual Try-On</span>
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <h3 className="h3-editorial">
          {brand}
        </h3>
        <p className="body-editorial-italic">
          {name}
        </p>
        <div className="flex flex-col mt-1">
          <p className="text-[11px] md:text-[12px] font-medium text-brand-charcoal">
            ${price.toLocaleString()}
          </p>
          <p className="text-editorial-meta mt-1">
            {colorsCount} Colors
          </p>
        </div>
      </div>
    </div>
  );
}
