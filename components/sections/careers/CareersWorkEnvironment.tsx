"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const GALLERY = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
];

const HIGHLIGHTS = [
  "Modern Retail Interiors",
  "Luxury Product Displays",
  "Professional Consultation Spaces",
  "Collaborative Team Environment",
  "Advanced Optical Equipment",
  "Customer Experience Focus"
];

export function CareersWorkEnvironment() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white uppercase font-heading leading-tight mb-8">
                Designed For<br />
                <em className="italic">Growth & Excellence</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 font-light leading-relaxed mb-16 max-w-sm">
                Experience a modern retail environment that combines premium eyewear experiences, professional consultation, and collaborative teamwork across Emirates Optician branches.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {HIGHLIGHTS.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">
                      {item}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>

          {/* Right: Gallery Collage */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] overflow-hidden group col-span-1">
              <ParallaxImage src={GALLERY[0]} alt="Workplace 1" className="w-full h-full" distance={40} />
            </div>
            <div className="flex flex-col gap-4 col-span-1">
              <div className="aspect-[1/1] overflow-hidden group">
                <ParallaxImage src={GALLERY[1]} alt="Workplace 2" className="w-full h-full" distance={30} />
              </div>
              <div className="aspect-[1/1] overflow-hidden group">
                <ParallaxImage src={GALLERY[2]} alt="Workplace 3" className="w-full h-full" distance={30} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
