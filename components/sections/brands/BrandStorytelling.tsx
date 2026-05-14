"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function BrandStorytelling() {
  return (
    <section className="w-full bg-brand-charcoal text-white section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white uppercase font-heading leading-tight mb-8">
                Where Vision Meets<br />
                <em className="italic">Luxury Craftsmanship</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 font-light max-w-xl leading-relaxed mb-12">
                From timeless Italian luxury to cutting-edge performance eyewear, Emirates Optician brings together the world’s finest eyewear houses under one premium experience.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="w-20 h-[1px] bg-brand-gold" />
            </Reveal>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Optical Craftsmanship"
                className="w-full h-full"
                distance={60}
              />
              <div className="absolute inset-0 border border-white/10 group-hover:border-brand-gold/30 transition-colors duration-1000" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
