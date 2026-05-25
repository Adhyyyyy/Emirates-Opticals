"use client";

import React from "react";
import { m } from "framer-motion";

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
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Application Journey
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
          >
            Simple Application. <em className="italic font-light text-amber-500/80">Professional Journey.</em>
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative p-8 bg-white border border-neutral-200 rounded-2xl flex flex-col h-full group"
            >
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-6 block">
                Step 0{idx + 1}
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                {step.desc}
              </p>
              {/* Connector */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-neutral-200 z-10" />
              )}
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
