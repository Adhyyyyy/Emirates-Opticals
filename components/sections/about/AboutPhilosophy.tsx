"use client";

import React from "react";
import { m } from "framer-motion";

export function AboutPhilosophy() {
  return (
    <section className="w-full bg-neutral-950 py-20 md:py-24 overflow-hidden relative">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-white uppercase font-heading leading-tight mb-14"
          >
            Luxury Eyewear.
            <br />
            Professional Eye Care.
            <br />
            <em className="italic font-light text-amber-400/80">Exceptional Experience.</em>
          </m.h2>

          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-3xl flex flex-col items-center gap-8"
          >
            <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed font-serif italic">
              &ldquo;At Emirates Optician, we believe eyewear is more than vision correction — it is a reflection of personality, confidence, lifestyle, and self-expression.&rdquo;
            </p>
            <div className="w-16 h-[1px] bg-amber-400/40" />
            <p className="text-sm text-neutral-400 font-light tracking-wide max-w-2xl mx-auto leading-loose uppercase">
              Our carefully curated collections combine luxury fashion, advanced lens technology, and personalized styling to create truly premium optical experiences.
            </p>
          </m.div>

        </div>
      </div>
    </section>
  );
}
