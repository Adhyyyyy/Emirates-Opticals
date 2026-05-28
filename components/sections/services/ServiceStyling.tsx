"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  "Bespoke Face Shape Analysis",
  "Luxury Brand Profiling",
  "Comfort Fit & Weight Tuning",
  "Color Palette Harmonization"
];

export function ServiceStyling() {
  return (
    <section className="w-full bg-[#FAF9F6] py-20 md:py-24 overflow-hidden border-t border-black/[0.03]" id="styling-consultations">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Image (Standardized Premium Frame) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl group shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 p-2 bg-white border border-black/[0.03]"
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-100">
              <img
                src="/service/At_Your_Service_-_Top_Right_1200x.webp"
                alt="Expert Bespoke Styling Consultation"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Content Block (Standardized Typography) */}
          <div className="px-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold bg-brand-gold/5 border border-brand-gold/10 px-3 py-1 rounded-[3px] mb-6 inline-block"
            >
              Couture Style
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase mb-6 leading-tight"
            >
              Bespoke <br />
              <em className="italic font-light font-serif text-brand-gold">Styling Consultations</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[13px] text-brand-charcoal/60 font-light leading-relaxed mb-8"
            >
              Eyewear is the ultimate canvas of personal identity. Our professional styling experts help you discover frames tailored perfectly to your facial structure, style profile, and presence.
            </motion.p>

            {/* Standardized Diamond Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {FEATURES.map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-[10px] text-brand-gold shrink-0">◈</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Premium Button */}
            <Link
              href="/brands"
              className="w-full sm:w-auto bg-brand-charcoal hover:bg-brand-gold text-brand-gold hover:text-white border border-brand-charcoal hover:border-brand-gold text-[9px] font-bold uppercase tracking-[0.22em] py-4 px-8 rounded-[3px] transition-all duration-500 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
            >
              <span>Explore Brand Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
