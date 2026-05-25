"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

const FEATURES = [
  "Personalized Styling",
  "Professional Consultation",
  "Precision Eye Testing",
  "Premium Lens Guidance",
  "Comfortable Customer Experience"
];

export function AboutExpertTeam() {
  return (
    <section className="w-full bg-[#fcfcfc] py-20 md:py-24 overflow-hidden border-y border-black/5">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Team
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Expert Guidance
              <br />
              <em className="italic font-light text-amber-500/80">At Every Step</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10 max-w-xl"
            >
              Our experienced optical consultants and trained professionals help customers discover frames that perfectly complement their face shape, lifestyle, and visual needs.
            </m.p>

            <div className="flex flex-col gap-4">
              {FEATURES.map((feature, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.08 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <span className="text-[10px] text-amber-400 font-bold tabular-nums">0{idx + 1}</span>
                  <span className="text-base font-light text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 tracking-tight">
                    {feature}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden rounded-2xl group shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=1200"
              alt="Professional Consultation"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-700" />
          </m.div>

        </div>
      </div>
    </section>
  );
}
