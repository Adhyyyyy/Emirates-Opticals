"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function AboutExpertTeam() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-12">
                Expert Guidance<br />
                <em className="italic">At Every Step</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/70 font-light leading-relaxed mb-16 max-w-xl">
                Our experienced optical consultants and trained professionals help customers discover frames that perfectly complement their face shape, lifestyle, and visual needs.
              </p>
            </Reveal>

            <div className="space-y-10">
              {[
                "Personalized Styling",
                "Professional Consultation",
                "Precision Eye Testing",
                "Premium Lens Guidance",
                "Comfortable Customer Experience"
              ].map((feature, idx) => (
                <Reveal key={idx} delay={0.4 + idx * 0.1}>
                  <div className="flex items-center gap-6 group cursor-default">
                    <span className="text-[10px] text-brand-gold font-bold">0{idx + 1}</span>
                    <span className="text-lg md:text-xl font-light text-brand-charcoal/80 group-hover:text-brand-gold transition-colors duration-500 tracking-tight">
                      {feature}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Immersive Image */}
          <div className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden group shadow-2xl">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200"
              alt="Professional Consultation"
              className="w-full h-full"
              distance={80}
            />
            <div className="absolute inset-0 bg-brand-charcoal/10 mix-blend-overlay" />
          </div>

        </div>
      </div>
    </section>
  );
}
