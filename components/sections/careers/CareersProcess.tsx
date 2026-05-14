"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";

const STEPS = [
  {
    title: "Submit Application",
    desc: "Share your resume and professional details."
  },
  {
    title: "Initial Review",
    desc: "Our recruitment team reviews your application carefully."
  },
  {
    title: "Interview Process",
    desc: "Shortlisted candidates will be contacted for interviews."
  },
  {
    title: "Join The Family",
    desc: "Begin your journey with Emirates Optician."
  }
];

export function CareersProcess() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-6">
              Simple Application.<br />
              <em className="italic">Professional Journey.</em>
            </h2>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="relative p-10 bg-white border border-black/5 flex flex-col h-full group">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] mb-8 block">
                  Step 0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">
                  {step.desc}
                </p>
                {/* Visual Connector for Desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-brand-gold/20" />
                )}
              </div>
            </StaggerItem>
          ))}
        </GridStagger>
      </div>
    </section>
  );
}
