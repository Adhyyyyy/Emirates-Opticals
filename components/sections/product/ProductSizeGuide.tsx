"use client";

import React from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Ruler } from "lucide-react";

export function ProductSizeGuide() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden border-b border-black/5">
      <div className="container-tight">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
                Find Your<br /><em className="italic text-brand-gold">Perfect Fit</em>
              </h2>
            </Reveal>
            
            <GridStagger className="grid grid-cols-2 gap-8 mb-12">
              {[
                { label: "Lens Width", value: "54 mm", desc: "Horizontal eye size" },
                { label: "Bridge Width", value: "18 mm", desc: "Nose rest distance" },
                { label: "Temple Length", value: "145 mm", desc: "Arm length to ear" },
                { label: "Frame Width", value: "138 mm", desc: "Total front width" }
              ].map((size, idx) => (
                <StaggerItem key={idx}>
                  <div className="group border-l border-black/10 pl-6 hover:border-brand-gold transition-colors duration-700">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30 mb-2 block">{size.label}</span>
                    <p className="text-2xl font-bold text-brand-charcoal mb-1">{size.value}</p>
                    <p className="text-[9px] font-medium text-brand-charcoal/40 uppercase tracking-tighter">{size.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-4 p-5 bg-brand-pearl/50 border border-black/5 rounded-xl">
                <Ruler className="w-4 h-4 text-brand-gold" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 leading-relaxed">
                  Visit any branch for a professional ergonomic fitting adjustment.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-[16/9] bg-brand-pearl/20 border border-black/5 p-12 flex items-center justify-center overflow-hidden">
               {/* Abstract Frame Diagram Placeholder */}
               <div className="w-full h-full relative opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[40%] border-2 border-brand-charcoal rounded-full relative">
                      <div className="absolute -left-10 top-1/2 w-20 h-[2px] bg-brand-charcoal" />
                      <div className="absolute -right-10 top-1/2 w-20 h-[2px] bg-brand-charcoal" />
                    </div>
                  </div>
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/20">Anatomical Fit Guide</span>
               </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
