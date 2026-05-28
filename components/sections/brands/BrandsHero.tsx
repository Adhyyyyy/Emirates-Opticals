"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function BrandsHero() {
  return (
    <section className="hidden md:flex relative w-full h-[60vh] min-h-[480px] flex-col overflow-hidden bg-neutral-100 pt-24 md:pt-32" id="brands-hero">
      {/* Crisp raw brand hero background - no dimming masks or filters */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hero/brand hero.webp"
          alt="Luxury Eyewear Collection"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Centered Title Overlay with subtle high-contrast drop shadow */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pt-16 md:pt-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light font-heading uppercase tracking-[0.25em] text-white drop-shadow-2xl select-none">
              Global Brands
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Decorative layout line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-brand-gold/20 z-10" />
    </section>
  );
}
