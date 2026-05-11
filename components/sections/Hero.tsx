"use client";

import { motion } from "framer-motion";
import { EyewearCarousel } from "@/components/common/EyewearCarousel";

export function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-120px)] md:h-[calc(100vh-150px)] bg-[#fdfdfd] overflow-visible">
      {/* Cinematic Background Scene - Reliable Luxury Shot */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-90" />
        <div className="absolute inset-0 bg-white/10" /> 
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 h-full flex flex-col items-center pt-12 md:pt-20 pb-12 md:pb-24">
        
        {/* Eyebrow Text */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h3-editorial mb-8 md:mb-12 text-brand-charcoal/60"
        >
          A New Season of Elevated Vision:
        </motion.span>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24 relative z-10"
        >
          <span className="block h1-editorial">
            Spring <br />
            <span className="font-extralight italic text-brand-charcoal/80 tracking-normal normal-case text-4xl md:text-[6rem]">In Full Focus</span>
          </span>
        </motion.h1>

        {/* CTA Button - Leaner & More Refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button className="px-10 md:px-14 py-3.5 md:py-4 bg-white text-brand-charcoal text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-brand-gold hover:text-white transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/5">
            The Spring Edit: New Arrivals
          </button>
        </motion.div>

      </div>

      {/* Sidebar Tab - "OFFER INSIDE" - Moved here to ensure it stays on top of everything */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed right-0 top-[60%] md:top-1/2 -translate-y-1/2 z-[60]"
      >
        <div className="bg-black text-white px-2 md:px-3 py-6 md:py-12 flex flex-col items-center gap-4 cursor-pointer hover:bg-brand-gold transition-colors duration-500 shadow-2xl">
          <span className="[writing-mode:vertical-lr] text-[7px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] font-bold uppercase rotate-180">
            Offer Inside
          </span>
        </div>
      </motion.div>

      {/* Product Carousel - Floating Pill */}
      <EyewearCarousel />
    </section>
  );
}
