"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  "Face Shape Analysis",
  "Luxury Brand Selection",
  "Comfort Fit Guidance",
  "Fashion Styling",
  "Personal Recommendations"
];

export function ServiceStyling() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[3px] group shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1200"
                alt="Expert Styling Consultation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-700 rounded-[3px]" />
            </m.div>

          {/* Right: Content */}
          <div>
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Services
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Styling
              <br />
              <em className="italic font-light text-amber-500/80">Consultation</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10 max-w-xl"
            >
              Discover frames that complement your face shape, personality, profession, and lifestyle.
            </m.p>

            <div className="flex flex-col gap-4 mb-10">
              {FEATURES.map((text, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.08 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-5 h-[1px] bg-amber-400 group-hover:w-8 transition-all duration-300 shrink-0" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    {text}
                  </span>
                </m.div>
              ))}
            </div>

            <Link
              href="/brands"
              className="bg-[#C9A84C] text-[#0D0D0D] text-xs uppercase tracking-[0.15em] px-7 py-3.5 rounded-[3px] font-bold hover:bg-[#B8952E] hover:text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              Explore Our Brands <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
