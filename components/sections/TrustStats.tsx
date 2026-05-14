"use client";

import React, { useEffect, useState, useRef } from "react";
import { m, useInView, useSpring, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({ value, suffix = "", label }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 40,
    damping: 30,
  });

  const displayValue = useTransform(spring, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex items-baseline mb-4">
        <m.span className="text-5xl md:text-7xl lg:text-8xl font-light font-heading text-black tracking-tight">
          {displayValue}
        </m.span>
        <span className="text-3xl md:text-5xl font-light font-heading text-black ml-1">{suffix}</span>
      </div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 text-center">
        {label}
      </span>
    </div>
  );
}

export function TrustStats() {
  return (
    <section className="bg-white py-24 md:py-40 overflow-hidden relative border-b border-black/5">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        
        {/* Editorial Heading */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-6 block">
              Our Institutional Reach
            </span>
          </Reveal>
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-heading text-black leading-[1.1] mb-2">
              Trusted By Thousands
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-heading text-black italic leading-[1.1] mb-12">
              Across Kerala
            </h2>
            <Reveal delay={0.4}>
              <p className="text-base md:text-lg text-black/50 font-light leading-relaxed max-w-2xl mx-auto">
                From personalized eye care consultations to authentic luxury eyewear collections, Emirates Optician continues to serve customers across Kerala with professionalism, trust, and exceptional service experiences.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Cinematic Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          <Counter value={10} suffix="+" label="Premium Branches" />
          <Counter value={25000} suffix="+" label="Happy Customers" />
          <Counter value={50} suffix="+" label="Global Luxury Brands" />
          <Counter value={100} suffix="+" label="Optical Experts" />
        </div>

      </div>
    </section>
  );
}
