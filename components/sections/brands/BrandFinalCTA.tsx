"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function BrandFinalCTA() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-10">
              Discover Your<br />
              <em className="italic">Perfect Frame</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Visit your nearest Emirates Optician branch for expert styling guidance, premium eye testing, and access to the world’s most iconic eyewear brands.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton className="bg-black text-white hover:bg-brand-gold px-12">
                Explore Collections
              </LuxuryButton>
              <LuxuryButton variant="secondary" className="px-12">
                Find Your Branch
              </LuxuryButton>
              <LuxuryButton variant="outline" className="px-12">
                Book Eye Test
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Decorative Branding */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
        <span className="text-[150px] md:text-[250px] font-bold uppercase tracking-tighter text-brand-charcoal">
          Global Brands
        </span>
      </div>
    </section>
  );
}
