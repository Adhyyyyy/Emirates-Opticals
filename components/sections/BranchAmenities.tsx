"use client";

import React from "react";
import { m } from "framer-motion";
import { Eye, Sparkles, ParkingCircle, Award, ShieldCheck, Heart } from "lucide-react";

const AMENITIES = [
  { icon: Eye, title: "Free Eye Testing" },
  { icon: Sparkles, title: "Expert Styling" },
  { icon: ParkingCircle, title: "Ample Parking" },
  { icon: Award, title: "Authentic Brands" },
  { icon: ShieldCheck, title: "Premium Lenses" },
  { icon: Heart, title: "Friendly Support" },
];

export function BranchAmenities() {
  return (
    <section className="bg-neutral-950 py-20 md:py-24 overflow-hidden border-y border-white/[0.05]">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        {/* Subtle Ribbon Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-400/70 mb-3 block"
          >
            Signature Ateliers
          </m.span>
          <m.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-xl md:text-2xl font-light text-white tracking-wider uppercase"
          >
            The Boutique Amenities Suite
          </m.h3>
        </div>

        {/* 6-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
          {AMENITIES.map((item, idx) => (
            <m.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div 
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-amber-400 rounded-full mb-5 group-hover:bg-amber-400 group-hover:text-neutral-900 group-hover:border-amber-400 transition-all duration-300 shadow-sm"
              >
                <item.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-300">
                {item.title}
              </span>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
