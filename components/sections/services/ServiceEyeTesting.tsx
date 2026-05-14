"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Microscope, Zap, Eye, Activity, ShieldCheck, UserPlus } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

const FEATURES = [
  { icon: <Microscope className="w-5 h-5" />, text: "Comprehensive Vision Assessment" },
  { icon: <Zap className="w-5 h-5" />, text: "Advanced Diagnostic Equipment" },
  { icon: <Eye className="w-5 h-5" />, text: "Experienced Optometrists" },
  { icon: <Activity className="w-5 h-5" />, text: "Prescription Guidance" },
  { icon: <ShieldCheck className="w-5 h-5" />, text: "Personalized Consultation" },
  { icon: <UserPlus className="w-5 h-5" />, text: "Comfortable Testing Experience" }
];

export function ServiceEyeTesting() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative" id="eye-testing">
      <div className="container-tight relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-8">
                Free Professional<br />
                <em className="italic">Eye Testing</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/60 font-light leading-relaxed mb-12 max-w-xl">
                Our experienced optometrists use advanced diagnostic equipment to deliver accurate vision assessment and personalized recommendations for your visual needs.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-16">
              {FEATURES.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-4">
                    <div className="text-brand-gold">{item.icon}</div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-charcoal/70">
                      {item.text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>

            <Reveal delay={0.6}>
              <LuxuryButton asChild className="bg-brand-charcoal text-white hover:bg-brand-gold px-12">
                <a href="/book-eye-test">Book Your Eye Test</a>
              </LuxuryButton>
            </Reveal>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden group border border-black/5">
              <img 
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
                alt="Professional Eye Testing"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-charcoal/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
