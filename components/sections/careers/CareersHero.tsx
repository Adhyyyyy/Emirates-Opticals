"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function CareersHero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Cinematic Workplace Visual */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
          alt="Modern Luxury Optical Workspace"
          className="w-full h-full"
          distance={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        {/* Cinematic Top Mask for Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-tight text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-8 block drop-shadow-md">
              Careers At Emirates Optician
            </span>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-white uppercase tracking-[-0.03em] leading-[0.95] mb-12 drop-shadow-lg font-heading">
              Build Your Career<br />
              With Kerala’s<br />
              <em className="italic font-light">Premium Brand</em>
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-sm md:text-lg text-white/80 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Join a growing team passionate about luxury eyewear, professional eye care, and exceptional customer experiences across Kerala.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <LuxuryButton asChild className="bg-white text-black hover:bg-brand-gold hover:text-white px-12">
                <Link href="/shop/optical">Explore Opportunities</Link>
              </LuxuryButton>
              <LuxuryButton asChild variant="outline" className="border-white/40 text-white hover:bg-white hover:text-black px-12">
                <a href="https://forms.google.com/your-form-id" target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
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
