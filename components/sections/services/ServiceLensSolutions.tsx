"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Zap, Eye, Search, ShieldCheck } from "lucide-react";

const LENS_TYPES = [
  {
    title: "Single Vision",
    desc: "For distance or reading",
    icon: <Eye className="w-5 h-5" />
  },
  {
    title: "Progressive",
    desc: "Seamless multi-focal",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Blue-Cut",
    desc: "Digital eye strain protection",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    title: "Anti-Glare",
    desc: "Enhanced visual clarity",
    icon: <Search className="w-5 h-5" />
  }
];

export function ServiceLensSolutions() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading mb-8">
              Quality<br /><em className="italic text-brand-gold">Lenses</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Choose from a wide range of premium lenses designed to meet your specific vision needs and lifestyle.
            </p>
          </Reveal>
        </div>

        {/* 4 Cards Grid */}
        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LENS_TYPES.map((lens, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white/5 border border-white/10 p-10 hover:border-brand-gold transition-all duration-700 h-full flex flex-col group rounded-3xl">
                <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-700">
                  {lens.icon}
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4 font-heading">
                  {lens.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {lens.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

        {/* Quality Standard Note */}
        <Reveal delay={0.4}>
          <div className="mt-20 text-center text-xs md:text-sm text-white/40 font-light tracking-wide italic">
            * All lenses come with anti-scratch coating and UV protection as standard.
          </div>
        </Reveal>

      </div>
    </section>
  );
}
