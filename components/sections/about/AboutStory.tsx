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
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200"
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
                  Emirates Optician was founded with a clear mission: to bring world-class optical solutions to the people of Kerala. We recognized a growing need for authentic branded eyewear and professional eye care services in our communities.
                </p>
                <p>
                  What started as a single store has grown into a trusted network of branches across Kerala, each offering the same commitment to quality, authenticity, and customer care. We&apos;ve built our reputation by standing firmly against cheap imitations and by delivering genuine value through authentic international and Indian brands.
                </p>
                <p>
                  Today, Emirates Optician serves thousands of satisfied customers who trust us for their optical needs — from free professional eye testing to finding the perfect frames that reflect their personal style.
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
