"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function AboutPhilosophy() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      {/* Background Texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-4xl md:text-7xl font-extralight tracking-[0.05em] text-white uppercase font-heading leading-tight mb-16">
              Luxury Eyewear.<br />
              Professional Eye Care.<br />
              <em className="italic font-light">Exceptional Experience.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="max-w-3xl space-y-10">
              <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed font-serif italic">
                "At Emirates Optician, we believe eyewear is more than vision correction — it is a reflection of personality, confidence, lifestyle, and self-expression."
              </p>
              <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
              <p className="text-sm md:text-base text-white/60 font-light tracking-wide max-w-2xl mx-auto leading-loose uppercase">
                Our carefully curated collections combine luxury fashion, advanced lens technology, and personalized styling to create truly premium optical experiences.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
