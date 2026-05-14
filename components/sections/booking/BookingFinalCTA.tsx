"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function BookingFinalCTA() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-10">
              Your Vision<br />
              Deserves <em className="italic">Premium Care</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Book your free eye test today and experience professional consultation, authentic luxury eyewear, and exceptional customer care at Emirates Optician.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <LuxuryButton 
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-black text-white hover:bg-brand-gold px-12"
              >
                Book Appointment
              </LuxuryButton>
              <LuxuryButton variant="secondary" className="px-12">
                Explore Collections
              </LuxuryButton>
              <LuxuryButton variant="outline" className="px-12">
                Find Your Branch
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Atmospheric Texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-0" />
    </section>
  );
}
