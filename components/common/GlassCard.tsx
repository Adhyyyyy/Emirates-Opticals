"use client";

import React, { memo } from "react";
import { m } from "framer-motion";
import Image from "next/image";

export interface GlassItem {
  id: number;
  name: string;
  thumbnail: string;
  heroImage: string;
  accentColor?: string;
  subtitle?: string;
}

interface GlassCardProps {
  item: GlassItem;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
  onHoverEnd: () => void;
}

export const GlassCard = memo(function GlassCard({
  item,
  isActive,
  onClick,
  onHover,
  onHoverEnd,
}: GlassCardProps) {
  return (
    <m.button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      onFocus={onHover}
      onBlur={onHoverEnd}
      // Ensure we use hardware acceleration and smooth spring
      layout
      initial={false}
      animate={{
        scale: isActive ? 1.12 : 0.92,
        opacity: isActive ? 1 : 0.45,
        filter: isActive ? "blur(0px)" : "blur(2px)",
        zIndex: isActive ? 10 : 1,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for buttery smooth motion
      }}
      className="relative flex-shrink-0 w-24 md:w-28 lg:w-32 aspect-[2/1] rounded-[3px] cursor-pointer overflow-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 will-change-transform transform-gpu"
      aria-label={`Select ${item.name}`}
      aria-pressed={isActive}
    >
      <div className="relative w-full h-full bg-white rounded-[3px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 overflow-hidden flex items-center justify-center">
        <Image
          src={item.thumbnail}
          alt={item.name}
          fill
          className="object-contain p-2 drop-shadow-sm transition-all duration-500"
          sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
        />
        {/* Subtle reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
      
      {/* Active state indicator dot (Optional subtle luxury touch) */}
      <m.div 
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold"
      />
    </m.button>
  );
});
