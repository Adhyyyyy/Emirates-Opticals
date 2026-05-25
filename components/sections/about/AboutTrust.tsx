"use client";

import React from "react";
import { m } from "framer-motion";

const STATS = [
  { label: "Branches", value: "10+" },
  { label: "Happy Customers", value: "Thousands" },
  { label: "Luxury Brands", value: "Global" },
  { label: "Optical Experts", value: "Professional" }
];

export function AboutTrust() {
  return (
    <section className="w-full bg-neutral-950 py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="max-w-[700px] mx-auto text-center mb-16">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 block"
          >
            Our Reach
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-white tracking-tight uppercase mb-4"
          >
            Serving Customers Across Kerala
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed"
          >
            With multiple branches strategically located across Kerala, Emirates Optician makes premium optical experiences more accessible, convenient, and trusted than ever before.
          </m.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-[1140px] mx-auto">
          {STATS.map((stat, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-4xl md:text-5xl font-light text-amber-400 font-heading tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                {stat.label}
              </span>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
