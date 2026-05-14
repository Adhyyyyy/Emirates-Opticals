"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckCircle } from "lucide-react";

export function AboutAuthenticity() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter text-white uppercase font-heading leading-[0.9] mb-10">
                Only Genuine.<br />
                Always Authentic.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/50 font-light max-w-lg leading-relaxed text-sm md:text-base">
                Every product at Emirates Optician is carefully sourced from authorized distributors to ensure authenticity, warranty support, premium quality, and long-term customer confidence.
              </p>
            </Reveal>
          </div>

          <div className="lg:w-1/2 w-full">
            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                "Authenticity Verified",
                "Official Brand Warranty",
                "Premium Lens Compatibility",
                "Trusted Global Partnerships"
              ].map((point, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-8 border border-white/10 hover:border-brand-gold/40 transition-colors duration-700 bg-white/[0.02]">
                    <CheckCircle className="w-6 h-6 text-brand-gold mb-6" />
                    <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white/90">
                      {point}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>

        </div>
      </div>
    </section>
  );
}
