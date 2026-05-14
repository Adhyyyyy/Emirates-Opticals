"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function ShopHero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Cinematic Shop Visual */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Eyewear Collection"
          className="w-full h-full"
          distance={80}
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
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-8 block drop-shadow-md">
              Premium Optical Collections
            </span>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-[-0.03em] leading-[0.95] mb-10 drop-shadow-lg font-heading">
              Discover Luxury<br />
              Eyewear Designed<br />
              <em className="italic font-light text-brand-gold">For Every Style</em>
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-sm md:text-base text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore authentic luxury eyewear collections, premium sunglasses, and advanced optical solutions curated from globally trusted brands.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <LuxuryButton 
                onClick={() => document.getElementById('shop-main')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black hover:bg-brand-gold hover:text-white px-12"
              >
                Start Exploring
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
