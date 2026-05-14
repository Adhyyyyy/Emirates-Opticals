"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Settings, ShieldCheck, RefreshCw, Heart, Tool, UserCheck } from "lucide-react";

const SUPPORT_FEATURES = [
  { icon: <Settings className="w-6 h-6" />, title: "Frame Adjustments" },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Warranty Assistance" },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Lens Replacement" },
  { icon: <Heart className="w-6 h-6" />, title: "Comfort Tuning" }
];

export function ServiceSupport() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden border-t border-black/5">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Support Beyond<br /><em className="italic text-brand-gold">The Purchase</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
              Emirates Optician provides ongoing support to ensure your eyewear continues to deliver comfort, quality, and exceptional visual experience.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUPPORT_FEATURES.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-brand-pearl p-10 border border-black/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center">
                <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-700">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
                  {item.title}
                </h3>
                <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest font-bold">
                  Complimentary Service
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
