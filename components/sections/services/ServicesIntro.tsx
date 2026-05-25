"use client";

import React from "react";
import { m } from "framer-motion";
import { Microscope, Zap, Search, ShieldCheck, Heart, UserPlus } from "lucide-react";

const FEATURES = [
  { icon: Microscope, text: "Professional Eye Testing" },
  { icon: Zap, text: "Premium Lens Solutions" },
  { icon: Search, text: "Expert Styling Consultation" },
  { icon: ShieldCheck, text: "Authentic Global Brands" },
  { icon: Heart, text: "Personalized Eye Care" },
  { icon: UserPlus, text: "After-Sales Support" }
];

export function ServicesIntro() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden" id="main-services">
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
              What We Offer
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              More Than Eyewear.
              <br />
              <em className="italic font-light text-amber-500/80">A Complete Experience.</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10 max-w-xl"
            >
              At Emirates Optician, every service is designed to combine professional expertise, advanced technology, and personalized customer care — creating a premium optical experience tailored to your vision and lifestyle.
            </m.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
              {FEATURES.map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.07 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white text-amber-500 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                    <item.icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                    {item.text}
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
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=1200"
              alt="Emirates Styling Consultation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
            <div className="absolute bottom-5 left-5 p-5 bg-white/95 border border-black/5 backdrop-blur-md rounded-2xl max-w-[180px] shadow-xl hidden sm:block">
              <span className="text-amber-500 font-heading text-lg italic block mb-0.5">Excellence</span>
              <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-400">
                Precision Optical Care
              </p>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
