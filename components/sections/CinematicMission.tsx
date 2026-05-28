"use client";

import React, { useRef } from "react";
import { m, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const STATS = [
  { value: 10, suffix: "+", label: "Branches in Kerala" },
  { value: 100, suffix: "%", label: "Authentic Brands" },
  { value: 100, suffix: "%", label: "Precision Eye Care" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {  
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2200, bounce: 0 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export function CinematicMission() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden relative" id="homepage-promise">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.05),transparent_65%)] pointer-events-none" />

      {/* Main Inner Container */}
      <div className="max-w-[800px] mx-auto px-4 text-center flex flex-col items-center gap-8 relative z-10">

        {/* Cinematic Headline */}
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extralight text-4xl sm:text-5xl md:text-7xl tracking-tight text-brand-charcoal uppercase leading-[1.1]"
        >
          Designed Around<br />
          <em className="italic text-brand-gold font-light font-serif">Vision & Style</em>
        </m.h2>

        {/* Sub-copy & CTA */}
        <div className="flex flex-col items-center">
          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-[520px] mx-auto mt-4 md:mt-6 font-light"
          >
            At Emirates Optician, every detail is curated to combine expert eye care with premium fashion-forward eyewear. From luxury frames to precision lenses, we create experiences centered around confidence, comfort, and authenticity.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 md:mt-10"
          >
            <Link
              href="/about"
              className="inline-flex w-full sm:w-auto items-center justify-center px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] rounded-[3px] bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white shadow-lg transition-colors duration-500"
            >
              Our Story
            </Link>
          </m.div>
        </div>

      </div>

      {/* Stats Row (below, full width) */}
      <div className="section-container relative z-10 max-w-5xl mx-auto">
        <div className="border-t border-brand-charcoal/10 mt-16 pt-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center w-full">
          {STATS.map((stat, idx) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl md:text-6xl font-extralight text-brand-charcoal leading-none font-heading tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-brand-charcoal/60 mt-2 block font-medium">
                {stat.label}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
