"use client";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-background">
      {/* Cinematic Background Grain / Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 flex flex-col items-center text-center"
      >
        <span className="mb-6 text-sm tracking-[0.3em] uppercase text-brand-gold-muted font-medium">
          Visionary Excellence
        </span>
        
        <h1 className="max-w-4xl mb-12 text-5xl font-light leading-[1.1] tracking-tight sm:text-8xl text-foreground font-heading">
          Redefining <span className="italic text-brand-gold">Luxury</span> <br className="hidden md:block" /> Perspective
        </h1>
        
        <p className="max-w-xl mb-12 text-lg leading-relaxed text-foreground/50 font-body tracking-wide">
          Explore our curated collection of artisanal eyewear, where timeless craftsmanship meets modern innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="px-10 py-4 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all duration-700 bg-brand-blue hover:bg-brand-charcoal hover:shadow-2xl hover:-translate-y-1">
            Explore Collection
          </button>
          <button className="px-10 py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-700 border border-black/10 text-brand-charcoal hover:border-brand-gold hover:text-brand-gold hover:bg-brand-pearl hover:-translate-y-1">
            Our Heritage
          </button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  );
}
