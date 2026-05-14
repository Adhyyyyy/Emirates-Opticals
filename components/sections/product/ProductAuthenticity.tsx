"use client";

import React from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ShieldCheck, Award, Zap, Heart } from "lucide-react";

export function ProductAuthenticity() {
  return (
    <section className="w-full bg-brand-pearl/50 section-padding overflow-hidden relative">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Guaranteed Authentic.<br /><em className="italic text-brand-gold">Always Genuine.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
              Every frame at Emirates Optician is sourced directly from authorized distributors and trusted global partners to ensure authenticity, quality, and warranty support.
            </p>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Authenticity Verified", desc: "100% Genuine Global Brands" },
            { icon: Award, title: "Official Warranty", desc: "Complete Brand Protection" },
            { icon: Zap, title: "Lens Compatibility", desc: "Precision Fitting Support" },
            { icon: Heart, title: "Expert Support", desc: "Lifelong Maintenance Care" }
          ].map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-white p-10 border border-black/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col items-center text-center">
                <div className="text-brand-gold mb-8 group-hover:rotate-12 transition-transform duration-700">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-charcoal/50 font-light leading-relaxed">
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
