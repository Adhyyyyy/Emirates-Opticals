"use client";

import React from "react";
import { m } from "framer-motion";

const STATS = [
  { label: "Kerala Branches", value: "10+" },
  { label: "Happy Customers", value: "Thousands" },
  { label: "Luxury Brands", value: "Global" },
  { label: "Optical Experts", value: "Professional" }
];

export function CareersTrust() {
  return (
    <section className="w-full bg-neutral-950 text-white py-20 md:py-24 overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-amber-400/70 mb-3 block"
          >
            Trusted Reputation
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-white tracking-tight uppercase"
          >
            Join A Brand Trusted Across Kerala
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed mt-4"
          >
            Emirates Optician continues to build trusted customer relationships through authentic luxury eyewear, professional expertise, and exceptional service experiences across multiple branches.
          </m.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <span className="text-4xl md:text-5xl font-light text-amber-400 mb-3 font-heading tracking-tight">
                {stat.value}
              </span>
              <div className="w-8 h-[1px] bg-white/20 mb-3 group-hover:w-16 group-hover:bg-amber-400 transition-all duration-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                {stat.label}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
