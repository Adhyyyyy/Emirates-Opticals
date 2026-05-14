"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";

const STATS = [
  { label: "Branches", value: "10+" },
  { label: "Happy Customers", value: "Thousands" },
  { label: "Luxury Brands", value: "Global" },
  { label: "Optical Experts", value: "Professional" }
];

export function AboutTrust() {
  return (
    <section className="w-full bg-brand-charcoal text-white py-24 md:py-32 overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading mb-8">
              Serving Customers<br />Across Kerala
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              With multiple branches strategically located across Kerala, Emirates Optician makes premium optical experiences more accessible, convenient, and trusted than ever before.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center group">
                <motion.span 
                  className="text-4xl md:text-6xl font-light text-brand-gold mb-4 font-heading tracking-tighter"
                  whileInView={{ opacity: [0, 1], y: [20, 0] }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <div className="w-10 h-[1px] bg-white/20 mb-4 group-hover:w-full group-hover:bg-brand-gold transition-all duration-700" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40">
                  {stat.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>
      </div>
    </section>
  );
}
