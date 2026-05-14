"use client";

import React, { useState } from "react";
import { m, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ROW_1 = [
  { id: 1, name: "Jacques Marie Mage", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Oliver Peoples", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "DITA", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Chrome Hearts", img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Cartier", img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800" },
];

const ROW_2 = [
  { id: 6, name: "Gucci", img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Prada", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Ray-Ban", img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "Maui Jim", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "Oakley", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" },
];

export function BrandShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Double the arrays for infinite loop
  const displayRow1 = [...ROW_1, ...ROW_1];
  const displayRow2 = [...ROW_2, ...ROW_2];

  return (
    <section className="w-full bg-white section-padding overflow-hidden border-b border-black/5">
      <div className="container-tight mb-16 md:mb-24 text-center">
        <m.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="h2-editorial"
        >
          Shop by Brand
        </m.h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-10">
        
        {/* Row 1: Moves Right */}
        <div className="flex relative">
          <m.div 
            animate={{ 
              x: hoveredId ? 0 : [0, -1500] 
            }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }
            }}
            className="flex gap-6 md:gap-10"
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

        {/* Row 2: Moves Left */}
        <div className="flex relative">
          <m.div 
            animate={{ 
              x: hoveredId ? 0 : [-1500, 0] 
            }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear"
              }
            }}
            className="flex gap-6 md:gap-10"
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
    </section>
  );
}

function BrandCard({ brand, isHovered, isAnyHovered, onHover, onLeave }: any) {
  return (
    <div 
      className="relative flex-shrink-0"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <m.div 
        animate={{ 
          scale: isHovered ? 1.02 : 1,
          filter: isAnyHovered ? "blur(8px)" : "blur(0px)",
          opacity: isAnyHovered ? 0.4 : 1
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[180px] h-[120px] md:w-[320px] md:h-[200px] bg-white flex items-center justify-center group cursor-pointer overflow-hidden"
      >
        <Image 
          src={brand.img}
          alt={brand.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="320px"
        />
        
        {/* Brand Name Overlay - Bold and White */}
        <div className="absolute inset-0 flex items-center justify-center">
          <m.span 
            animate={{ 
              opacity: isHovered ? 1 : (isAnyHovered ? 0 : 0.9),
              scale: isHovered ? 1.1 : 1
            }}
            className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-2xl"
          >
            {brand.name}
          </m.span>
        </div>
      </m.div>
    </div>
  );
}
