"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";

const GROWTH_FEATURES = [
  "Skill Development",
  "Leadership Opportunities",
  "Retail Expertise",
  "Optical Industry Exposure",
  "Customer Experience Training",
  "Branch Expansion Opportunities"
];

export function CareersGrowth() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-8">
              Grow With<br />
              A Brand That’s <em className="italic">Expanding</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
              As Emirates Optician continues to expand across Kerala, team members gain opportunities for skill development, leadership growth, and long-term career progression within a premium retail ecosystem.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {GROWTH_FEATURES.map((feature, idx) => (
            <StaggerItem key={idx}>
              <div className="group flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700 mb-8">
                  <span className="text-[10px] font-bold">0{idx + 1}</span>
                </div>
                <h3 className="text-lg md:text-xl font-normal text-brand-charcoal uppercase tracking-tighter mb-4 font-heading">
                  {feature}
                </h3>
                <div className="w-0 group-hover:w-16 h-[1px] bg-brand-gold transition-all duration-700" />
              </div>
            </StaggerItem>
          ))}
        </GridStagger>
      </div>
    </section>
  );
}
