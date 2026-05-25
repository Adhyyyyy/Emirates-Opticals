"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const ROW_1 = [
  { 
    id: 1, 
    name: "Jacques Marie Mage", 
    logoText: "J.M.M", 
    fontClass: "font-serif tracking-[0.05em] text-sm md:text-base font-black uppercase text-center",
    bgClass: "from-[#FDFBF7] to-[#E9DFBE]" 
  },
  { 
    id: 2, 
    name: "Oliver Peoples", 
    logoText: "OLIVER PEOPLES", 
    fontClass: "font-sans tracking-[0.18em] text-[10px] md:text-[11px] font-semibold uppercase text-center",
    bgClass: "from-[#FAF5F0] to-[#E5D2C2]" 
  },
  { 
    id: 3, 
    name: "DITA Eyewear", 
    logoText: "DITA", 
    fontClass: "font-sans tracking-[0.35em] text-xs md:text-sm font-bold uppercase text-center",
    bgClass: "from-[#FAF6F8] to-[#E2D4DE]" 
  },
  { 
    id: 4, 
    name: "Chrome Hearts", 
    logoText: "Chrome Hearts", 
    fontClass: "font-serif tracking-wide italic text-xs md:text-sm font-black text-center",
    bgClass: "from-[#F5F6F8] to-[#DADEE2]" 
  },
  { 
    id: 5, 
    name: "Cartier Luxury", 
    logoText: "Cartier", 
    fontClass: "font-serif tracking-widest text-lg md:text-xl font-light italic text-center",
    bgClass: "from-[#FDF7F7] to-[#EAD2D2]" 
  },
];

const ROW_2 = [
  { 
    id: 6, 
    name: "Gucci Eyewear", 
    logoText: "GUCCI", 
    fontClass: "font-serif tracking-[0.25em] text-sm md:text-base font-bold uppercase text-center",
    bgClass: "from-[#F5FAF6] to-[#D5E5DC]" 
  },
  { 
    id: 7, 
    name: "Prada Linea", 
    logoText: "PRADA", 
    fontClass: "font-sans tracking-[0.3em] text-xs md:text-sm font-bold uppercase text-center",
    bgClass: "from-[#F5FAFD] to-[#D7E2EC]" 
  },
  { 
    id: 8, 
    name: "Ray-Ban Classic", 
    logoText: "Ray•Ban", 
    fontClass: "font-sans tracking-tight italic text-sm md:text-base font-black text-center",
    bgClass: "from-[#FDFBF7] to-[#EADCCB]" 
  },
  { 
    id: 9, 
    name: "Maui Jim Sport", 
    logoText: "Maui Jim", 
    fontClass: "font-sans italic tracking-wide text-xs md:text-sm font-extrabold text-center",
    bgClass: "from-[#F5FCFD] to-[#D5EAEC]" 
  },
  { 
    id: 10, 
    name: "Oakley Active", 
    logoText: "OAKLEY", 
    fontClass: "font-sans tracking-tighter text-sm md:text-base font-black uppercase text-center",
    bgClass: "from-[#F6F7F9] to-[#DCE0E4]" 
  },
];

export function BrandShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Triple array size to guarantee seamless infinite visual loop
  const displayRow1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const displayRow2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="w-full bg-[#F7F5F0] section-padding overflow-hidden border-y border-[#E8E4DC]">
      <div className="section-container">
        
        {/* Harmonized Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="meta-editorial mb-4">
            The Atelier Partners
          </span>
          <h2 className="h2-editorial">
            Shop by Brand
          </h2>
        </div>

        {/* Framed Cinematic Display Window for Marquees */}
        <div className="relative rounded-[2.5rem] border-4 border-white bg-[#F4F2EB]/30 p-6 md:p-8 overflow-hidden w-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_12px_32px_rgba(0,0,0,0.03)]">
          
          {/* Edge Gradient Fades - Dissolving cards smoothly at boundaries */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F7F5F0] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F7F5F0] to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col gap-6 md:gap-8 relative z-0">
            
            {/* Row 1: Moves Right to Left */}
            <div className="flex relative w-full overflow-hidden">
              <m.div 
                animate={{ 
                  x: hoveredId ? 0 : [0, -1000] 
                }}
                transition={{ 
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear"
                  }
                }}
                className="flex gap-4 md:gap-5"
                style={{ width: "fit-content" }}
              >
                {displayRow1.map((brand, idx) => (
                  <BrandCard 
                    key={`${brand.id}-${idx}`} 
                    brand={brand} 
                    isHovered={hoveredId === brand.id}
                    isAnyHovered={hoveredId !== null && hoveredId !== brand.id}
                    onHover={() => setHoveredId(brand.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
              </m.div>
            </div>

            {/* Row 2: Moves Left to Right */}
            <div className="flex relative w-full overflow-hidden">
              <m.div 
                animate={{ 
                  x: hoveredId ? 0 : [-1000, 0] 
                }}
                transition={{ 
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 28,
                    ease: "linear"
                  }
                }}
                className="flex gap-4 md:gap-5"
                style={{ width: "fit-content" }}
              >
                {displayRow2.map((brand, idx) => (
                  <BrandCard 
                    key={`${brand.id}-${idx}`} 
                    brand={brand} 
                    isHovered={hoveredId === brand.id}
                    isAnyHovered={hoveredId !== null && hoveredId !== brand.id}
                    onHover={() => setHoveredId(brand.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
              </m.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function BrandCard({ brand, isHovered, isAnyHovered, onHover, onLeave }: any) {
  return (
    <div 
      className="relative flex-shrink-0 select-none cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <m.div 
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          opacity: isAnyHovered ? 0.65 : 1
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative w-[145px] h-[145px] md:w-[190px] md:h-[190px] aspect-square rounded-3xl overflow-hidden p-4 flex flex-col items-center justify-between border border-neutral-100 bg-gradient-to-br shadow-sm hover:shadow-md transition-all duration-500",
          brand.bgClass
        )}
      >
        {/* Brand visual logo centered with rich editorial contrast */}
        <div className="flex-1 flex items-center justify-center w-full px-3 text-center">
          <span 
            className={cn(
              "select-none transition-all duration-500 block text-neutral-800/80 group-hover:text-neutral-950 font-medium",
              brand.fontClass,
              isHovered ? "scale-[1.08] opacity-100 text-neutral-950" : "opacity-85 text-neutral-600"
            )}
          >
            {brand.logoText}
          </span>
        </div>
        
        {/* Premium minimal borderless label at the bottom */}
        <div className="w-full flex items-center justify-center pt-2 border-t border-black/5">
          <span className="text-[7.5px] md:text-[9.5px] font-bold uppercase tracking-[0.24em] text-neutral-500 group-hover:text-neutral-900 transition-colors duration-300 text-center select-none truncate">
            {brand.name}
          </span>
        </div>
      </m.div>
    </div>
  );
}
