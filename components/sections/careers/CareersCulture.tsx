"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const CULTURE_POINTS = [
  "Collaborative Team Culture",
  "Customer-First Environment",
  "Professional Growth Opportunities",
  "Modern Retail Experience",
  "Supportive Leadership",
  "Premium Brand Ecosystem"
];

export function CareersCulture() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Narrative Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                More Than A Workplace.<br />
                <em className="italic">A Premium Experience.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/70 font-light leading-relaxed mb-16 max-w-xl text-base">
                At Emirates Optician, we believe exceptional customer experiences begin with empowered teams. We foster a collaborative, growth-driven environment where professionalism, creativity, and customer care come together.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              {CULTURE_POINTS.map((point, idx) => (
                <Reveal key={idx} delay={0.4 + idx * 0.1}>
                  <div className="flex flex-col gap-3 group">
                    <div className="w-8 h-[1.5px] bg-brand-gold/30 group-hover:w-full group-hover:bg-brand-gold transition-all duration-700" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                      {point}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Cinematic Image Integration */}
          <div className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden group shadow-2xl">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=1200"
              alt="Our Collaborative Environment"
              className="w-full h-full"
              distance={70}
            />
            <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-transparent transition-all duration-1000" />
          </div>

        </div>
      </div>
    </section>
  );
}
