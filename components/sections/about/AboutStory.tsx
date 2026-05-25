"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

const HIGHLIGHTS = [
  "Authentic Global Brands",
  "Professional Eye Care",
  "Expert Styling Consultation",
  "Trusted Customer Relationships",
  "Premium Optical Experience"
];

export function AboutStory() {
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
            className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200"
              alt="The Emirates Optician Journey"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
          </m.div>

          {/* Right: Narrative Content */}
          <div className="flex flex-col justify-center">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Story
            </m.span>

            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-8"
            >
              A Vision Built On
              <br />
              <em className="italic font-light text-amber-500/80">Trust & Authenticity</em>
            </m.h2>

            <m.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 text-neutral-500 font-light leading-relaxed text-sm max-w-xl mb-10"
            >
              <p>
                Emirates Optician was founded with a clear mission: to bring world-class optical solutions to the people of Kerala. We recognized a growing need for authentic branded eyewear and professional eye care services in our communities.
              </p>
              <p>
                What started as a single store has grown into a trusted network of branches across Kerala, each offering the same commitment to quality, authenticity, and customer care. We&apos;ve built our reputation by standing firmly against cheap imitations and by delivering genuine value through authentic international and Indian brands.
              </p>
              <p>
                Today, Emirates Optician serves thousands of satisfied customers who trust us for their optical needs — from free professional eye testing to finding the perfect frames that reflect their personal style.
              </p>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {HIGHLIGHTS.map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                    {item}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
