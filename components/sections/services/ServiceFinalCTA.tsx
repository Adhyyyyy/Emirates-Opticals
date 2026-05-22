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
              Ready to<br />
              <em className="italic">Get Started?</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Visit any of our branches for a free eye test and personalized consultation.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton asChild className="bg-black text-white hover:bg-brand-gold px-12">
                <a href="/book-eye-test">Book Free Eye Test</a>
              </LuxuryButton>
              <LuxuryButton asChild variant="secondary" className="px-12">
                <a href="/branches">Find a Branch</a>
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
