"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

const GALLERY = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
];

const HIGHLIGHTS = [
  "Modern Retail Interiors",
  "Luxury Product Displays",
  "Professional Consultation Spaces",
  "Collaborative Team Environment",
  "Advanced Optical Equipment",
  "Customer Experience Focus"
];

export function CareersWorkEnvironment() {
  return (
    <section className="w-full bg-neutral-950 text-white py-20 md:py-24 overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 block"
            >
              Workplace Excellence
            </m.span>
            
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-white tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Designed For
              <br />
              <em className="italic font-light text-amber-400/80">Growth & Excellence</em>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-400 font-light leading-relaxed mb-10 max-w-sm"
            >
              Experience a modern retail environment that combines premium eyewear experiences, professional consultation, and collaborative teamwork across Emirates Optician branches.
            </m.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map((item, idx) => (
                <m.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-medium">
                    {item}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Right: Gallery Collage */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[4/5] overflow-hidden group rounded-2xl bg-neutral-900"
            >
              <Image 
                src={GALLERY[0]} 
                alt="Workplace 1" 
                fill 
                className="object-cover group-hover:scale-103 transition-transform duration-700" 
              />
            </m.div>
            <div className="flex flex-col gap-4">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="relative aspect-[1/1] overflow-hidden group rounded-2xl bg-neutral-900"
              >
                <Image 
                  src={GALLERY[1]} 
                  alt="Workplace 2" 
                  fill 
                  className="object-cover group-hover:scale-103 transition-transform duration-700" 
                />
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative aspect-[1/1] overflow-hidden group rounded-2xl bg-neutral-900"
              >
                <Image 
                  src={GALLERY[2]} 
                  alt="Workplace 3" 
                  fill 
                  className="object-cover group-hover:scale-103 transition-transform duration-700" 
                />
              </m.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
