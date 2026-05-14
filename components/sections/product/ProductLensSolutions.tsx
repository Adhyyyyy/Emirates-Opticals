"use client";

import React from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Eye, Zap, ShieldCheck, Search, Activity } from "lucide-react";

export function ProductLensSolutions() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      <div className="container-tight relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white uppercase font-heading leading-tight mb-8">
                Compatible With<br /><em className="italic text-brand-gold">Premium Lens Solutions</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/40 font-light max-w-xl leading-relaxed mb-12">
                This frame supports multiple premium lens configurations customized to your visual and lifestyle requirements, ensuring clarity and protection in every environment.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Expert Optical Precision</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-1/2">
            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Eye, title: "Single Vision", desc: "Crystal clear correction" },
                { icon: Zap, title: "Progressive Lenses", desc: "Multi-distance seamless" },
                { icon: ShieldCheck, title: "Blue-Cut Protection", desc: "Digital eye strain relief" },
                { icon: Search, title: "Anti-Glare Lenses", desc: "Enhanced visual clarity" },
                { icon: Activity, title: "Prescription Sunglasses", desc: "Luxury outdoor vision" }
              ].map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="bg-white/5 p-8 border border-white/10 hover:border-brand-gold transition-all duration-700 h-full group">
                    <item.icon className="w-6 h-6 text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-700" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">{item.title}</h3>
                    <p className="text-[10px] text-white/40 font-light leading-relaxed">{item.desc}</p>
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
