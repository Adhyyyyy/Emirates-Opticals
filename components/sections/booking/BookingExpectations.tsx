"use client";

import React from "react";
import { motion, m } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";

const STEPS = [
  {
    title: "Warm Welcome",
    desc: "Our team will guide you through a comfortable and professional experience."
  },
  {
    title: "Professional Eye Examination",
    desc: "Advanced diagnostic equipment ensures accurate vision assessment."
  },
  {
    title: "Personalized Consultation",
    desc: "Receive expert recommendations based on your lifestyle and visual needs."
  },
  {
    title: "Explore Premium Eyewear",
    desc: "Discover authentic luxury eyewear collections curated for you."
  }
];

export function BookingExpectations() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative">
      <div className="container-tight relative z-10">
        <div className="flex flex-col items-center text-center mb-10 md:mb-24">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial mb-4"
          >
            Atelier Experience
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial"
          >
            What To Expect During Your Visit
          </m.h2>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white border border-black/5 flex items-center justify-center text-brand-gold font-heading text-2xl group-hover:bg-brand-gold group-hover:text-white transition-all duration-700 mb-10">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
                  {step.title}
                </h3>
                <div className="w-8 h-[1px] bg-brand-gold/30 mb-6 group-hover:w-full transition-all duration-700" />
                <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>
      </div>
    </section>
  );
}
