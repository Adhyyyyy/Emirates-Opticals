"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function AboutFinalCTA() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-10">
              Experience the<br />
              <em className="italic">Emirates Difference</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Visit any of our branches for a complimentary eye test and discover why thousands trust us.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton className="bg-black text-white hover:bg-brand-gold px-12">
                Book Free Eye Test
              </LuxuryButton>
              <LuxuryButton variant="secondary" className="px-12">
                Find a Branch
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Decorative Branding */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
        <span className="text-[120px] md:text-[200px] font-bold uppercase tracking-tighter text-brand-charcoal">
          Emirates Opticians
        </span>
      </div>
    </section>
  );
}
