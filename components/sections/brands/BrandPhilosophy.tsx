"use client";

import React from "react";
import { m } from "framer-motion";
import { ShieldCheck, Award, Sparkles, UserCheck, Star } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, text: "100% Authentic Brands" },
  { icon: Award, text: "Authorized Global Partnerships" },
  { icon: Sparkles, text: "Luxury & Performance Collections" },
  { icon: UserCheck, text: "Expert Styling Consultation" },
  { icon: Star, text: "Premium Lens Compatibility" }
];

export function BrandPhilosophy() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div>
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Philosophy
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Authenticity You Can See.
              <br />
              <em className="italic font-light text-amber-500/80">Luxury You Can Feel.</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10 max-w-xl"
            >
              At Emirates Optician, every frame is sourced directly from authorized distributors and trusted global partners â€” ensuring authenticity, craftsmanship, and exceptional visual experience in every collection.
            </m.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
              {FEATURES.map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white text-amber-500 shrink-0 group-hover:border-neutral-400 transition-all duration-200">
                    <item.icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                    {item.text}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Right: Visual Badge */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex justify-center items-center"
          >
            <div className="relative p-16 border border-neutral-200 bg-[#FAF8F5] rounded-full w-[360px] h-[360px] flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="text-amber-500 font-heading text-4xl italic font-light">Genuine</div>
                <div className="w-8 h-[1px] bg-amber-400/50" />
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-400">
                  Official Brand Partner
                </p>
              </div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
