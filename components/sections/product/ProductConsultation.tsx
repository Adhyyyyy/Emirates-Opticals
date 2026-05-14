"use client";

import React from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function ProductConsultation() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden group">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200"
                alt="Expert Styling Guidance"
                className="w-full h-full"
                distance={60}
              />
              <div className="absolute inset-0 border border-white/10 group-hover:border-brand-gold transition-colors duration-1000" />
            </div>
          </div>

          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading leading-tight mb-8">
                Need Styling<br />
                <em className="italic text-brand-gold">Guidance?</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 font-light max-w-xl leading-relaxed mb-12">
                Our trained optical consultants help you discover frames that perfectly complement your face shape, style, and visual needs.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 mb-16">
              {[
                "Personalized Styling",
                "Face Shape Guidance",
                "Lens Recommendations",
                "Professional Consultation"
              ].map((text, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-4 group">
                    <div className="w-6 h-[1px] bg-brand-gold group-hover:w-12 transition-all duration-700" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                      {text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>

            <Reveal delay={0.6}>
              <LuxuryButton asChild className="bg-white text-black hover:bg-brand-gold hover:text-white px-12 py-5 shadow-2xl">
                <a href="/book-eye-test">Book Free Eye Test</a>
              </LuxuryButton>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
