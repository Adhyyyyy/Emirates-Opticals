"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ShieldCheck, Award, Sparkles, UserCheck, Star } from "lucide-react";

const FEATURES = [
  { icon: <ShieldCheck className="w-5 h-5" />, text: "100% Authentic Brands" },
  { icon: <Award className="w-5 h-5" />, text: "Authorized Global Partnerships" },
  { icon: <Sparkles className="w-5 h-5" />, text: "Luxury & Performance Collections" },
  { icon: <UserCheck className="w-5 h-5" />, text: "Expert Styling Consultation" },
  { icon: <Star className="w-5 h-5" />, text: "Premium Lens Compatibility" }
];

export function BrandPhilosophy() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                Authenticity You Can See.<br />
                <em className="italic">Luxury You Can Feel.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/70 font-light leading-relaxed mb-16 max-w-xl text-base">
                At Emirates Optician, every frame is sourced directly from authorized distributors and trusted global partners — ensuring authenticity, craftsmanship, and exceptional visual experience in every collection.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              {FEATURES.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-4 group">
                    <div className="text-brand-gold group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                      {item.text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>

          {/* Right Visual Badge */}
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="relative p-16 border border-black/5 bg-brand-pearl/30 backdrop-blur-sm rounded-full w-[400px] h-[400px] flex flex-col items-center justify-center text-center">
              <Reveal>
                <div className="space-y-6">
                  <div className="text-brand-gold font-heading text-4xl italic">Genuine</div>
                  <div className="w-8 h-[1px] bg-brand-gold mx-auto" />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal/40">
                    Official Brand Partner
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
