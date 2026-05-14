"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function ServiceStyling() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden group">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200"
                alt="Expert Styling Consultation"
                className="w-full h-full"
                distance={50}
              />
              <div className="absolute inset-0 border border-black/5" />
            </div>
          </div>

          <div className="lg:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-8">
                Expert Styling<br />
                <em className="italic">Consultation</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/60 font-light leading-relaxed mb-12 max-w-xl">
                Our trained optical consultants help you discover frames that complement your face shape, lifestyle, personality, and visual requirements.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mb-16">
              {[
                "Face Shape Analysis",
                "Personalized Recommendations",
                "Luxury Brand Guidance",
                "Professional Adjustments"
              ].map((text, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-4 group">
                    <div className="w-6 h-[1px] bg-brand-gold group-hover:w-10 transition-all duration-700" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                      {text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>

            <Reveal delay={0.6}>
              <LuxuryButton asChild variant="outline" className="px-12">
                <a href="/brands">Explore Brands</a>
              </LuxuryButton>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
