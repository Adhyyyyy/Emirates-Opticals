"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

export function BrandsHero() {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col justify-center items-center overflow-hidden bg-neutral-950 pt-32 pb-16" id="brands-hero">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Eyewear Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10" />
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 w-full text-center">
        <m.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-amber-400/80 mb-4 block"
        >
          Authentic Global Eyewear
        </m.span>
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white uppercase tracking-tight leading-[1.05] font-heading drop-shadow-lg"
        >
          Curated Luxury Eyewear
          <br />
          {"From The World's"}
          <br />
          <em className="italic font-light text-amber-400/90">Most Iconic Brands</em>
        </m.h1>
      </div>

      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-20" />
    </section>
  );
}
