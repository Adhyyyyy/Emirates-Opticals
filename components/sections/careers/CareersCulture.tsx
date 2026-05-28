"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

const CULTURE_POINTS = [
  "Collaborative Team Culture",
  "Customer-First Environment",
  "Professional Growth Opportunities",
  "Modern Retail Experience",
  "Supportive Leadership",
  "Premium Brand Ecosystem"
];

export function CareersCulture() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Narrative Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Culture
            </m.span>
            
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              More Than A Workplace.
              <br />
              <em className="italic font-light text-amber-500/80">A Premium Experience.</em>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10"
            >
              At Emirates Optician, we believe exceptional customer experiences begin with empowered teams. We foster a collaborative, growth-driven environment where professionalism, creativity, and customer care come together.
            </m.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {CULTURE_POINTS.map((point, idx) => (
                <m.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.08 }}
                  className="flex flex-col gap-3 group"
                >
                  <div className="w-8 h-[1px] bg-amber-400 group-hover:w-16 transition-all duration-300" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    {point}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl group shadow-sm bg-neutral-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
              alt="Our Collaborative Environment"
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
          </m.div>

        </div>
      </div>
    </section>
  );
}
