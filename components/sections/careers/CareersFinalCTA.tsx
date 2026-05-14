"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function CareersFinalCTA() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-10">
              Your Next<br />
              Professional Chapter<br />
              <em className="italic">Starts Here</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Become part of a growing luxury optical ecosystem focused on premium experiences, professional excellence, and customer trust.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton 
                asChild
                className="bg-black text-white hover:bg-brand-gold px-12"
              >
                <a href="https://forms.google.com/your-form-id" target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </LuxuryButton>
              <LuxuryButton variant="secondary" className="px-12">
                Explore Branches
              </LuxuryButton>
              <LuxuryButton variant="outline" className="px-12">
                Contact HR
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Decorative Brand Watermark */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
        <span className="text-[150px] md:text-[250px] font-bold uppercase tracking-tighter text-brand-charcoal">
          Join Emirates
        </span>
      </div>
    </section>
  );
}
