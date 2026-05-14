"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Microscope, Zap, Search, ShieldCheck, Heart, UserPlus } from "lucide-react";

const FEATURES = [
  { icon: <Microscope className="w-5 h-5" />, text: "Professional Eye Testing" },
  { icon: <Zap className="w-5 h-5" />, text: "Premium Lens Solutions" },
  { icon: <Search className="w-5 h-5" />, text: "Expert Styling Consultation" },
  { icon: <ShieldCheck className="w-5 h-5" />, text: "Authentic Global Brands" },
  { icon: <Heart className="w-5 h-5" />, text: "Personalized Eye Care" },
  { icon: <UserPlus className="w-5 h-5" />, text: "After-Sales Support" }
];

export function ServicesIntro() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                More Than Eyewear.<br />
                <em className="italic">A Complete Experience.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/70 font-light leading-relaxed mb-16 max-w-xl text-base">
                At Emirates Optician, every service is designed to combine professional expertise, advanced technology, and personalized customer care — creating a premium optical experience tailored to your vision and lifestyle.
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

          {/* Badge Visual */}
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="relative p-12 border border-black/5 bg-brand-pearl rounded-full w-[350px] h-[350px] flex flex-col items-center justify-center text-center">
              <div className="space-y-4">
                <div className="text-brand-gold font-heading text-3xl italic">Excellence</div>
                <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal/30">
                  Precision Optical Care
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
