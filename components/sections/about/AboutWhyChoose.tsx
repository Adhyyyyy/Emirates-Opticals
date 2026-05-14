"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Check } from "lucide-react";

const FEATURES = [
  "Authentic Luxury Brands",
  "Professional Eye Testing",
  "Premium Lens Technology",
  "Expert Styling Consultation",
  "Multiple Kerala Branches",
  "After Sales Support",
  "Friendly Customer Care",
  "Modern Optical Experience"
];

export function AboutWhyChoose() {
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden border-t border-black/5">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Sticky Left: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-[1.1] mb-8">
                Why Thousands<br />
                <em className="italic">Choose</em><br />
                Emirates Optician
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/60 font-light max-w-sm leading-relaxed uppercase tracking-[0.1em] text-xs">
                Excellence in vision, authenticity in style, and trust across every branch.
              </p>
            </Reveal>
          </div>

          {/* Right: Feature Grid */}
          <div className="lg:col-span-7">
            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {FEATURES.map((feature, idx) => (
                <StaggerItem key={idx}>
                  <div className="group flex items-start gap-6 border-b border-black/5 pb-8">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pearl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-base md:text-lg font-medium text-brand-charcoal tracking-tight">
                      {feature}
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
