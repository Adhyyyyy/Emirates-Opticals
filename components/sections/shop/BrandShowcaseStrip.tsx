"use client";

import React from "react";
import { motion } from "framer-motion";

const BRANDS = ["PRADA", "Ray-Ban", "Oakley", "Cartier", "Gucci", "Tom Ford", "BVLGARI", "Maui Jim"];

export function BrandShowcaseStrip() {
  return (
    <section className="w-full bg-brand-pearl py-12 overflow-hidden border-y border-black/5">
      <div className="flex items-center gap-20 animate-marquee whitespace-nowrap">
        {[...BRANDS, ...BRANDS].map((brand, idx) => (
          <span 
            key={idx}
            className="text-2xl md:text-3xl font-bold text-brand-charcoal/20 uppercase tracking-[0.4em] hover:text-brand-gold transition-colors duration-700 cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
