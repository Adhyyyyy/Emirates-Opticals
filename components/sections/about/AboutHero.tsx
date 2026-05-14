"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function AboutHero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Eyewear Craftsmanship"
          className="w-full h-full"
          distance={120}
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        {/* Cinematic Top Mask for Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-tight text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-8 block drop-shadow-md">
              About Emirates Optician
            </span>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-normal text-white uppercase tracking-[-0.03em] leading-[0.85] mb-12 drop-shadow-lg font-heading">
              Kerala’s Trusted<br />
              <em className="italic font-light">Luxury Eyewear</em><br />
              Destination
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-sm md:text-lg text-white/80 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Emirates Optician brings together authentic global eyewear brands, advanced optical expertise, and personalized customer care — delivering premium eye care experiences across Kerala.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <LuxuryButton className="bg-white text-black hover:bg-brand-gold hover:text-white px-12">
                Explore Collections
              </LuxuryButton>
              <LuxuryButton variant="outline" className="border-white/40 text-white hover:bg-white hover:text-black px-12">
                Book Eye Test
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Atmospheric Texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-20" />
    </section>
  );
}
