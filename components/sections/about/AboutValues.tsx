"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { ShieldCheck, UserCheck, Heart, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Authenticity Guaranteed",
    desc: "Every frame is sourced directly from authorized distributors and trusted global partners."
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Professional Expertise",
    desc: "Experienced optometrists and trained stylists ensure exceptional eye care and personalized recommendations."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Customer-First Experience",
    desc: "We prioritize comfort, trust, service quality, and long-term customer relationships."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Luxury Optical Experience",
    desc: "From premium eyewear collections to refined retail environments, every detail is thoughtfully designed."
  }
];

export function AboutValues() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-6">
              The Values That<br />Define Emirates
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-16 h-[2px] bg-brand-gold" />
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {VALUES.map((val, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-white p-10 md:p-12 border border-black/5 hover:border-brand-gold/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 h-full flex flex-col">
                <div className="text-brand-gold mb-8 transition-transform duration-700 group-hover:scale-110 origin-left">
                  {val.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
                  {val.title}
                </h3>
                <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
