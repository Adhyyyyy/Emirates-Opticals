"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EyewearShowcase() {
  return (
    <section className="relative w-full h-[55vh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-black flex flex-col">
      {/* â”€â”€ HERO AREA â”€â”€ */}
      <m.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform transform-gpu"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=2000')`,
        }}
      />

      {/* Overlays for legibility & cinematic depth */}
      <div className="absolute inset-0 bg-black/10 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* â”€â”€ CENTER ALIGNED TEXT â”€â”€ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-3xl flex flex-col items-center gap-4"
        >
          <h2 className="h1-editorial text-white drop-shadow-xl">
            Curated Elegance
          </h2>
          
          <Link 
            href="/shop" 
            className="mt-6 md:mt-8 flex items-center justify-center gap-2 bg-white text-brand-charcoal px-8 py-3.5 rounded-[3px] font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-white transition-colors duration-500 shadow-lg group"
          >
            <span>Explore The Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
