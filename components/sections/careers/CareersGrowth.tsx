"use client";

import React from "react";
import { m } from "framer-motion";

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
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Career Progression
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
          >
            Grow With A Brand That&apos;s <em className="italic font-light text-amber-500/80">Expanding</em>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed mt-4"
          >
            As Emirates Optician continues to expand across Kerala, team members gain opportunities for skill development, leadership growth, and long-term career progression within a premium retail ecosystem.
          </m.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GROWTH_FEATURES.map((feature, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="group flex flex-col items-center text-center p-8 bg-[#FAF8F5] border border-neutral-200 hover:border-neutral-300 hover:shadow-sm rounded-2xl transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-amber-600 font-semibold text-[10px] tracking-widest mb-6">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900 mb-4">
                {feature}
              </h3>
              <div className="w-8 h-[1px] bg-amber-400 group-hover:w-16 transition-all duration-300" />
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
