"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { EyewearCarousel } from "@/components/common/EyewearCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=2000"
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-black z-20 overflow-visible">
      
      {/* 1. Cinematic Multi-Image Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${BACKGROUNDS[currentIndex]}')`,
              backgroundPosition: "center 30%" 
            }}
          />
        </AnimatePresence>
        
        {/* Soft Luxury Overlay Mask */}
        <div className="absolute inset-0 bg-black/35" />
        {/* Cinematic Top Mask for Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10" />
      </div>

      {/* 2. Interactive Navigation Indicators (Side Dock) */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-4">
        {BACKGROUNDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group flex items-center justify-end gap-3 text-right focus:outline-none"
          >
            <span className={cn(
              "text-[8px] font-extrabold uppercase tracking-[0.2em] transition-all duration-700 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
              currentIndex === idx ? "text-brand-gold opacity-100 translate-x-0" : "text-white/60"
            )}>
              0{idx + 1}
            </span>
            <div className={cn(
              "h-[1.5px] transition-all duration-700",
              currentIndex === idx ? "w-10 bg-brand-gold" : "w-3 bg-white/30 group-hover:w-6 group-hover:bg-white"
            )} />
          </button>
        ))}
      </div>

      {/* 3. Hero Content - Exact Visionist Hierarchy */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-[1200px] mx-auto mb-10 md:mb-16">
          <div className="flex flex-col items-center">
            <Reveal delay={0.2}>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-8 block drop-shadow-md">
                A New Season of Elevated Vision:
              </span>
            </Reveal>
            
            <Reveal delay={0.4}>
              <h1 className="text-5xl md:text-8xl lg:text-[120px] font-normal text-white uppercase tracking-[-0.03em] leading-[0.85] mb-14 drop-shadow-lg font-heading">
                Spring<br />In Full Focus
              </h1>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="flex justify-center">
                <button 
                  onClick={() => document.getElementById("featured-grid")?.scrollIntoView({ behavior: "smooth" })}
                  className="py-4 md:py-5 px-8 md:px-12 bg-white text-black text-[10px] md:text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-brand-gold hover:text-white transition-all duration-700 shadow-2xl"
                >
                  The Spring Edit: New Arrivals
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Discovery Carousel - Straddles hero/next section */}
      <EyewearCarousel />

    </section>
  );
}
