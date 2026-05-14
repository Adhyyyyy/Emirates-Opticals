"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckCircle2, ShieldCheck, Award, Zap } from "lucide-react";

const AUTH_POINTS = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Authenticity Verified", desc: "Sourced directly from authorized distributors." },
  { icon: <Award className="w-5 h-5" />, title: "Official Brand Warranty", desc: "Complete coverage as per global brand standards." },
  { icon: <Zap className="w-5 h-5" />, title: "Premium Lens Compatibility", desc: "Precision fitting for any brand prescription." },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: "Expert Fitting & Support", desc: "Personalized styling and maintenance." }
];

export function BrandAuthenticity() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden border-t border-black/5">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Guaranteed Authentic.<br /><em className="italic">Always Genuine.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
              Every frame at Emirates Optician is sourced from authorized distributors and trusted global partners — ensuring authenticity, warranty protection, and uncompromised quality.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUTH_POINTS.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-brand-pearl p-10 border border-black/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center">
                <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-700">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
