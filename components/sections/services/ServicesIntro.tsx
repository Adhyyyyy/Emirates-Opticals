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
    <section className="w-full bg-white section-padding overflow-hidden" id="main-services">
      <div className="container-tight">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                More Than Eyewear.<br />
                <em className="italic text-brand-gold">A Complete Experience.</em>
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

          {/* Symmetrical Luxury Lifestyle Visual with Intersecting Excellence Badge */}
          <div className="lg:w-1/2 relative flex justify-center w-full">
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden group border border-black/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=1200"
                alt="Emirates Styling Consultation Curation"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-charcoal/10" />
              
              {/* Overlapping Glassmorphism Curation Badge */}
              <div className="absolute bottom-6 left-6 p-6 bg-white/95 border border-black/5 backdrop-blur-md rounded-2xl max-w-[200px] shadow-xl hidden sm:block">
                <span className="text-brand-gold font-heading text-xl italic block mb-1">Excellence</span>
                <p className="text-[8px] uppercase tracking-widest font-bold text-brand-charcoal/40">
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
