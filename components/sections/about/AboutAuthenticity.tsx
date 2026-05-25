"use client";

import React from "react";
import { m } from "framer-motion";
import { CheckCircle } from "lucide-react";

const POINTS = [
  "Authenticity Verified",
  "Official Brand Warranty",
  "Premium Lens Compatibility",
  "Trusted Global Partnerships"
];

export function AboutAuthenticity() {
  return (
    <section className="w-full bg-neutral-950 py-20 md:py-24 overflow-hidden border-y border-white/5">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Headline */}
          <div>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-4xl md:text-5xl font-light tracking-tight text-white uppercase font-heading leading-tight mb-6"
            >
              Only Genuine.
              <br />
              Always Authentic.
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-400 font-light max-w-lg leading-relaxed"
            >
              Every product at Emirates Optician is carefully sourced from authorized distributors to ensure authenticity, warranty support, premium quality, and long-term customer confidence.
            </m.p>
          </div>

          {/* Right: Point Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POINTS.map((point, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="p-6 border border-white/10 rounded-2xl hover:border-amber-400/30 transition-colors duration-300 bg-white/[0.02] flex flex-col gap-4"
              >
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">
                  {point}
                </span>
              </m.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
