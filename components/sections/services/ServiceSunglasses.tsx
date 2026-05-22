"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

const BRANDS = ["Ray-Ban", "Oakley", "Prada", "Maui Jim", "Gucci", "Tom Ford"];

export function ServiceSunglasses() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative">
      <div className="container-tight relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-tight mb-8">
                Premium Sunglasses<br />
                <em className="italic text-brand-gold">Collection</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/60 font-light leading-relaxed mb-10 max-w-xl">
                Protect your eyes in style with our curated collection of authentic branded sunglasses from the world's leading designers.
              </p>
            </Reveal>

            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
              {[
                "100% UV protection guaranteed",
                "Polarized lens options",
                "Ray-Ban, Oakley, PRADA, and more",
                "Prescription sunglasses available"
              ].map((text, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-brand-charcoal/80">
                      {text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>

            <Reveal delay={0.6}>
              <p className="text-xs text-brand-charcoal/50 font-light italic mb-10 leading-relaxed">
                * All sunglasses come with authenticity certification and warranty as standard.
              </p>
            </Reveal>

            <Reveal delay={0.8}>
              <LuxuryButton asChild className="bg-brand-charcoal text-white hover:bg-brand-gold px-12">
                <a href="/shop">Explore Sunglasses</a>
              </LuxuryButton>
            </Reveal>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Sunglasses"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-charcoal/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
