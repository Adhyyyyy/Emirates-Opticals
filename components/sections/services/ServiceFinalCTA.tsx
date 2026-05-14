"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function ServiceFinalCTA() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-10">
              Experience Premium<br />
              <em className="italic">Eye Care Today</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Visit your nearest Emirates Optician branch for professional eye testing, expert consultation, and access to authentic luxury eyewear collections.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton asChild className="bg-black text-white hover:bg-brand-gold px-12">
                <a href="/book-eye-test">Book Eye Test</a>
              </LuxuryButton>
              <LuxuryButton asChild variant="secondary" className="px-12">
                <a href="/branches">Find Your Branch</a>
              </LuxuryButton>
              <LuxuryButton asChild variant="outline" className="px-12">
                <a href="/shop">Explore Collections</a>
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
