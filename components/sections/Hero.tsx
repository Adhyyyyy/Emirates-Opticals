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
      </div>

      {/* Hero Content - Exact Visionist Hierarchy */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-[1200px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white mb-6 block drop-shadow-md">
              A New Season of Elevated Vision:
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[110px] font-normal text-white uppercase tracking-[-0.02em] leading-[0.95] mb-12 drop-shadow-lg">
              Spring<br />In Full Focus
            </h1>
            
            <div className="flex justify-center">
              <button className="px-10 py-4 bg-white text-black text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-all duration-500 shadow-xl">
                The Spring Edit: New Arrivals
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Discovery Carousel - Exact Pill Architecture */}
      <div className="absolute bottom-0 inset-x-0 z-50">
        <EyewearCarousel />
      </div>

    </section>
  );
}
