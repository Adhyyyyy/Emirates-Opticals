"use client";

import React from "react";
import { m } from "framer-motion";
import { Check, Sofa, ParkingCircle, Eye, UserPlus, Sparkles } from "lucide-react";
import Image from "next/image";

const HIGHLIGHTS = [
  { icon: Sofa, text: "Modern Optical Interiors" },
  { icon: ParkingCircle, text: "Ample Parking" },
  { icon: Sparkles, text: "Luxury Product Displays" },
  { icon: Eye, text: "Advanced Testing Equipment" },
  { icon: UserPlus, text: "Expert Staff Assistance" },
  { icon: Check, text: "Comfortable Consultation Areas" },
];

export function BranchExperience() {
  return (
    <section className="relative w-full py-20 md:py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image */}
          <m.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7 relative h-[450px] md:h-[600px] overflow-hidden group rounded-2xl border border-neutral-200 shadow-sm bg-neutral-100"
          >
            <Image 
              src="https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Eyewear Consultation Atelier"
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
            
            {/* Experience Floating Badge */}
            <m.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-8 shadow-md max-w-[240px] border border-neutral-200/50 rounded-2xl hidden sm:block"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3 block">Destination Quality</span>
              <p className="text-sm font-light text-neutral-600 italic leading-relaxed">
                &ldquo;A space where clinical excellence meets high-fashion hospitality.&rdquo;
              </p>
            </m.div>
          </m.div>

          {/* Right Column: Narrative & Features */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              The In-Store Story
            </m.span>
            
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Designed For
              <br />
              <em className="italic font-light text-amber-500/80">Comfort & Care</em>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10"
            >
              Every Emirates Optician branch is thoughtfully designed to combine luxury eyewear experiences, professional consultation, and welcoming customer care in a refined retail environment.
            </m.p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.08, duration: 0.6 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white text-amber-500 shrink-0">
                    <item.icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    {item.text}
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
