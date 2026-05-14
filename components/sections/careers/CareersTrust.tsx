"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";

const STATS = [
  { label: "Kerala Branches", value: "10+" },
  { label: "Happy Customers", value: "Thousands" },
  { label: "Luxury Brands", value: "Global" },
  { label: "Optical Experts", value: "Professional" }
];

export function CareersTrust() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading mb-8">
              Join A Brand<br />Trusted Across Kerala
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Emirates Optician continues to build trusted customer relationships through authentic luxury eyewear, professional expertise, and exceptional service experiences across multiple branches.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center group">
                <span className="text-4xl md:text-6xl font-light text-brand-gold mb-4 font-heading tracking-tighter">
                  {stat.value}
                </span>
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
