"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ShieldCheck, UserCheck, Heart, Sparkles, Microscope, Search } from "lucide-react";

const FEATURES = [
  { icon: <ShieldCheck className="w-5 h-5" />, text: "Free Professional Eye Testing" },
  { icon: <Microscope className="w-5 h-5" />, text: "Advanced Diagnostic Equipment" },
  { icon: <UserCheck className="w-5 h-5" />, text: "Experienced Optometrists" },
  { icon: <Heart className="w-5 h-5" />, text: "Personalized Consultation" },
  { icon: <Sparkles className="w-5 h-5" />, text: "Premium Eyewear Guidance" },
  { icon: <Search className="w-5 h-5" />, text: "Comfortable Branch Experience" }
];

export function BookingIntro() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                Professional Eye Care.<br />
                <em className="italic">Premium Experience.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/70 font-light leading-relaxed mb-16 max-w-xl text-base">
                At Emirates Optician, every eye test is designed to deliver accurate vision assessment, expert consultation, and personalized recommendations in a comfortable and premium environment.
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

          {/* Visual Overlay Section */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-brand-pearl rounded-full absolute -top-20 -right-20 w-80 h-80 opacity-50 blur-3xl" />
            <div className="relative z-10 p-12 border border-black/5 bg-white/40 backdrop-blur-xl">
              <Reveal>
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-brand-charcoal uppercase tracking-tighter">Accurate & Trusted</h3>
                  <div className="w-16 h-[2px] bg-brand-gold" />
                  <p className="text-sm text-brand-charcoal/60 font-light leading-loose italic font-serif">
                    "Precision eye care combined with expert styling consultation to help you see clearly and look exceptional."
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
