"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Settings, ShieldCheck, RefreshCw, Heart, CheckCircle2 } from "lucide-react";

const SUPPORT_FEATURES = [
  { 
    icon: <Settings className="w-5 h-5" />, 
    title: "Frame Adjustments & Tuning",
    desc: "Lifetime complimentary alignment and frame tightening at any of our branches to guarantee comfort."
  },
  { 
    icon: <ShieldCheck className="w-5 h-5" />, 
    title: "Warranty & Repair Assistance",
    desc: "Comprehensive 2-year manufacturer warranty support on all luxury frames and premium lens coatings."
  },
  { 
    icon: <RefreshCw className="w-5 h-5" />, 
    title: "Eco Lens Replacement",
    desc: "Seamless replacement of scratched lenses while keeping your existing luxury frames intact."
  },
  { 
    icon: <Heart className="w-5 h-5" />, 
    title: "Ultrasonic Deep Cleansing",
    desc: "Complementary deep-sonic cleaning sessions to keep your nose-pads and hinges in showroom condition."
  }
];

export function ServiceSupport() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden border-t border-black/5">
      <div className="container-tight">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Support Beyond<br /><em className="italic text-brand-gold">The Purchase</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
              Emirates Optician provides ongoing complimentary adjustments and support to ensure your luxury frames remain comfortable for a lifetime.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Support Features list */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <GridStagger className="space-y-8">
              {SUPPORT_FEATURES.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-start gap-5 p-6 rounded-2xl hover:bg-brand-pearl/40 transition-colors duration-500 border border-transparent hover:border-black/5 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-pearl flex items-center justify-center text-brand-gold shrink-0 transition-all duration-500 group-hover:bg-brand-charcoal group-hover:text-white">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-charcoal/50 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>

          {/* Right: Craftsmanship workshop photo */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden group rounded-3xl border border-black/5 shadow-2xl bg-brand-pearl">
              <img 
                src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=1200"
                alt="Emirates Optical Craftsmanship Adjustments workshop"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-charcoal/10" />
              
              {/* Overlapping Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 bg-brand-gold text-brand-charcoal rounded-xl text-[8.5px] font-extrabold uppercase tracking-widest shadow-md">
                Lifetime Warranty Node
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
