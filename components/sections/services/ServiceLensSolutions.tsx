"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Zap, Eye, Search, ShieldCheck } from "lucide-react";

const LENS_TYPES = [
  {
    title: "Single Vision",
    desc: "Clear vision correction for reading or distance.",
    icon: <Eye className="w-5 h-5" />
  },
  {
    title: "Progressive Lenses",
    desc: "Seamless multi-distance vision without visible lines.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Blue-Cut Lenses",
    desc: "Protection against digital eye strain and harmful blue light.",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    title: "Anti-Glare Lenses",
    desc: "Enhanced visual clarity with reduced reflections and glare.",
    icon: <Search className="w-5 h-5" />
  }
];

export function ServiceLensSolutions() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading mb-8">
              Advanced Lens<br /><em className="italic">Technology</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Discover premium lens solutions designed for clarity, comfort, digital protection, and enhanced visual performance.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {LENS_TYPES.map((lens, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white/5 border border-white/10 p-10 hover:border-brand-gold transition-all duration-700 h-full flex flex-col group">
                <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-700">
                  {lens.icon}
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">
                  {lens.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {lens.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

        <div className="flex flex-wrap justify-center gap-10 md:gap-20">
          {["UV Protection", "Anti-Scratch Coating", "Premium Materials", "Precision Fitting"].map((text, idx) => (
            <Reveal key={idx} delay={0.2 + idx * 0.1}>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                  {text}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
