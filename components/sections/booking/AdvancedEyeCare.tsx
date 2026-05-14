"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Microscope, Zap, Eye, Activity, ShieldCheck, UserPlus } from "lucide-react";

const FEATURES = [
  { icon: <Microscope className="w-6 h-6" />, title: "Digital Eye Testing Equipment" },
  { icon: <Eye className="w-6 h-6" />, title: "Precision Vision Assessment" },
  { icon: <Zap className="w-6 h-6" />, title: "Blue Light Consultation" },
  { icon: <Activity className="w-6 h-6" />, title: "Prescription Analysis" },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Lens Recommendations" },
  { icon: <UserPlus className="w-6 h-6" />, title: "Expert Optical Guidance" }
];

export function AdvancedEyeCare() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading leading-tight mb-8">
                Modern Technology.<br />
                <em className="italic">Trusted Expertise.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 font-light leading-relaxed mb-16 max-w-sm">
                Our professional eye testing process combines advanced optical technology with experienced consultation to ensure accurate results and personalized care.
              </p>
            </Reveal>
          </div>

          {/* Right: Grid */}
          <div className="lg:col-span-7">
            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {FEATURES.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-8 border border-white/10 hover:border-brand-gold transition-colors duration-700 bg-white/[0.02] flex items-center gap-6">
                    <div className="text-brand-gold">
                      {item.icon}
                    </div>
                    <span className="text-sm md:text-base font-medium tracking-tight text-white/90">
                      {item.title}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>

        </div>
      </div>
    </section>
  );
}
