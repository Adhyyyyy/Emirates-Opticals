"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Zap, Eye, Search, ShieldCheck } from "lucide-react";

const LENS_TYPES = [
  {
    title: "Single Vision",
    desc: "Clear vision correction for reading or distance.",
    icon: <Eye className="w-5 h-5" />
  },
  {
    title: "Progressive Lenses",
    desc: "Seamless multi-distance vision without visible lines.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Blue-Cut Lenses",
    desc: "Protection against digital eye strain and harmful blue light.",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    title: "Anti-Glare Lenses",
    desc: "Enhanced visual clarity with reduced reflections and glare.",
    icon: <Search className="w-5 h-5" />
  }
];

export function ServiceLensSolutions() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading mb-8">
              Advanced Lens<br /><em className="italic text-brand-gold">Technology</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Discover premium lens solutions designed for clarity, comfort, digital protection, and enhanced visual performance.
            </p>
          </Reveal>
        </div>

        {/* 4 Cards Grid */}
        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {LENS_TYPES.map((lens, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white/5 border border-white/10 p-10 hover:border-brand-gold transition-all duration-700 h-full flex flex-col group">
                <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-700">
                  {lens.icon}
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">
                  {lens.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {lens.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

        {/* Dynamic Split Panel with Premium Lens Crafting Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-12 border-t border-white/10">
          
          {/* Left: Precision Optical Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden group rounded-2xl border border-white/10 shadow-2xl bg-black">
              <img 
                src="https://images.unsplash.com/photo-1509696772497-90a5ab093e1a?auto=format&fit=crop&q=80&w=1200"
                alt="Emirates Precision Lens Laboratory Craftsmanship"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-charcoal/20" />
            </div>
          </div>

          {/* Right: Technical Engineering Features */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Lens Curation</span>
              <h3 className="text-2xl md:text-3xl font-extralight text-white uppercase tracking-tight font-heading mt-2">
                Precision Optical <em className="italic">Engineering</em>
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed mt-4">
                Every prescription lens goes through a 7-step surface-finish inspection inside our local laboratory, checking alignment, curvature index, and optical coatings.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-2 gap-6">
              {[
                { title: "UV400 Blocker", desc: "100% defense against UVA/UVB." },
                { title: "Anti-Scratch Coating", desc: "Nano-ceramic armor layers." },
                { title: "Hydrophobic Seal", desc: "Repels water & fingerprints." },
                { title: "Blue-Light Guard", desc: "Softens harmful digital flares." }
              ].map((c, idx) => (
                <StaggerItem key={idx}>
                  <div className="space-y-1">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">{c.title}</h5>
                    <p className="text-xs text-white/40 font-light">{c.desc}</p>
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
