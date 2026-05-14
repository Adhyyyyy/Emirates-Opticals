"use client";

import React from "react";
import { motion } from "framer-motion";
import { EyewearCarousel } from "@/components/common/EyewearCarousel";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] max-h-[1000px] bg-[#f0f0f0] z-20">
      
      {/* Exact Visionist Lifestyle Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=2000')",
            backgroundPosition: "center 30%" 
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
        {/* Cinematic Top Mask for Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/20 to-transparent z-10" />
      </div>

      {/* Hero Content - Exact Visionist Hierarchy */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-[1200px] mx-auto mb-16">
          <div className="flex flex-col items-center">
            <Reveal delay={0.2}>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white mb-8 block drop-shadow-md">
                A New Season of Elevated Vision:
              </span>
            </Reveal>
            
            <Reveal delay={0.4}>
              <h1 className="text-5xl md:text-8xl lg:text-[120px] font-normal text-white uppercase tracking-[-0.03em] leading-[0.85] mb-14 drop-shadow-lg">
                Spring<br />In Full Focus
              </h1>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="flex justify-center">
                <button className="px-12 py-5 bg-white text-black text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-700 shadow-2xl">
                  The Spring Edit: New Arrivals
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Discovery Carousel - Exact Pill Architecture */}
      <div className="absolute bottom-0 inset-x-0 z-50">
        <EyewearCarousel />
      </div>

    </section>
  );
}
