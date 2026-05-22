"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function BrandsHero() {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col justify-center items-center overflow-hidden bg-brand-charcoal pt-32 pb-16">
      {/* Cinematic Brand Imagery */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Eyewear Collection"
          className="w-full h-full"
          distance={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        {/* Cinematic Top Mask */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-tight text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-4 block drop-shadow-md">
              Authentic Global Eyewear
            </span>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white uppercase tracking-[-0.03em] leading-[1.0] drop-shadow-lg font-heading">
              Curated Luxury Eyewear<br />
              From The World’s<br />
              <em className="italic font-light">Most Iconic Brands</em>
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Atmospheric Texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-20" />
    </section>
  );
}
