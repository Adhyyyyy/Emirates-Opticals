"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const HIGHLIGHTS = [
  "Authentic Global Brands",
  "Professional Eye Care",
  "Expert Styling Consultation",
  "Trusted Customer Relationships",
  "Premium Optical Experience"
];

export function AboutStory() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Cinematic Visual */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden group">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=1200"
              alt="The Emirates Optician Journey"
              className="w-full h-full object-cover"
              distance={60}
            />
            <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-transparent transition-colors duration-1000" />
          </div>

          {/* Right: Narrative Content */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                A Vision Built On<br />
                <em className="italic">Trust & Authenticity</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-8 text-brand-charcoal/70 font-light leading-relaxed text-sm md:text-base max-w-xl">
                <p>
                  Founded with a passion for delivering world-class optical experiences, Emirates Optician was created to bring authentic luxury eyewear, professional eye care, and expert styling consultation closer to customers across Kerala.
                </p>
                <p>
                  From a single vision to a growing multi-branch presence, Emirates Optician continues to serve thousands of customers with trusted expertise, genuine global brands, and personalized optical care.
                </p>
              </div>
            </Reveal>

            {/* Feature Highlights Stagger */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {HIGHLIGHTS.map((item, idx) => (
                <Reveal key={idx} delay={0.4 + idx * 0.1}>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
