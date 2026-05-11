"use client";

import { motion } from "framer-motion";
import { EyewearCarousel } from "@/components/common/EyewearCarousel";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#f9f9f9] overflow-hidden">
      {/* Background Lifestyle Image (Simulated Split via masking or single wide image) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 h-full flex flex-col items-center pt-24 md:pt-32 pb-56 md:pb-48">
        
        {/* Eyebrow Text */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[9px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-brand-charcoal/40 mb-4 md:mb-6"
        >
          A New Season of Elevated Vision:
        </motion.span>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14 relative z-10"
        >
          <span className="block text-4xl md:text-8xl font-light tracking-[-0.02em] leading-[1.1] md:leading-[1.05] text-brand-charcoal uppercase font-body">
            Spring <br />
            <span className="font-medium italic text-brand-gold tracking-normal font-heading">In Full Focus</span>
          </span>
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button className="px-8 md:px-12 py-4 md:py-5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-brand-charcoal text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-brand-charcoal hover:text-white transition-all duration-700">
            The Spring Edit: New Arrivals
          </button>
        </motion.div>

        {/* Sidebar Tab - "OFFER INSIDE" */}
        <motion.div 
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="fixed right-0 top-[60%] md:top-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-black text-white px-2 md:px-3 py-5 md:py-10 flex flex-col items-center gap-4 cursor-pointer hover:bg-brand-gold transition-colors duration-500 shadow-xl">
            <span className="[writing-mode:vertical-lr] text-[7px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] font-bold uppercase rotate-180">
              Offer Inside
            </span>
          </div>
        </motion.div>

        {/* Product Carousel */}
        <EyewearCarousel />
      </div>

      {/* Background Models - Scaled down for mobile to prevent overlapping */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[-10%] md:left-[-8%] top-[25%] md:top-[15%] w-[40%] md:w-[38%] h-[40%] md:h-[65%] z-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800" 
          alt="Model Left" 
          className="w-full h-full object-contain mix-blend-darken opacity-20 md:opacity-90"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[-10%] md:right-[-8%] top-[25%] md:top-[15%] w-[40%] md:w-[38%] h-[40%] md:h-[65%] z-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800" 
          alt="Model Right" 
          className="w-full h-full object-contain mix-blend-darken opacity-20 md:opacity-90 scale-x-[-1]"
        />
      </motion.div>
    </section>
  );
}
