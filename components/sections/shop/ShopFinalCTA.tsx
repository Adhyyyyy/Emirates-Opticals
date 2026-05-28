"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function ShopFinalCTA() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-10">
              Find Frames That<br />
              <em className="italic">Match Your Identity</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Visit your nearest Emirates Optician branch for personalized styling consultation and expert recommendations.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton className="bg-black text-white hover:bg-brand-gold px-12">
                Talk to a Stylist
              </LuxuryButton>
              <LuxuryButton variant="secondary" className="px-12">
                Find Your Branch
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
