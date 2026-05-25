"use client";

import React from "react";
import { m } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BranchesHero() {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col justify-center items-center overflow-hidden bg-neutral-950 pt-32 pb-16" id="branches-hero">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt="Our Branches Across Kerala"
          fill
          className="object-cover opacity-80"
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
          Premium Optical Destinations
        </m.span>
        
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white uppercase tracking-tight leading-[1.05] font-heading drop-shadow-lg mb-6"
        >
          Our Branches
          <br />
          <em className="italic font-light text-amber-400/90">Across Kerala</em>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed mb-10"
        >
          Visit any of our 10 convenient locations for professional eye care and authentic branded eyewear.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-3 justify-center items-center"
        >
          <Link
            href="#brand-grid"
            className="bg-amber-400 text-neutral-900 text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5" />
            Find Your Branch
          </Link>
          <Link
            href="/book-eye-test"
            className="border border-white/20 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full hover:border-white hover:bg-white/5 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Eye Test
          </Link>
        </m.div>
      </div>

      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-20" />
    </section>
  );
}
