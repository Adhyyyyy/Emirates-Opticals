"use client";

import React, { useRef } from "react";
import { m, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const STATS = [
  { value: 20, suffix: "+", label: "Years of Expertise" },
  { value: 50000, suffix: "+", label: "Frames Delivered" },
  { value: 12, suffix: "", label: "Atelier Branches" },
  { value: 200, suffix: "+", label: "Premium Brands" },
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
    <section className="w-full bg-neutral-950 py-20 md:py-28 overflow-hidden relative" id="homepage-promise">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.02),transparent_65%)] pointer-events-none" />

      {/* Main Inner Container */}
      <div className="max-w-[800px] mx-auto px-4 text-center flex flex-col items-center gap-8 relative z-10">
        
        {/* Eyebrow */}
        <m.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[0.2em] text-amber-400/70"
        >
          Our Promise
        </m.span>

        {/* Cinematic Headline */}
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight font-heading"
        >
          Change the way<br />
          <em className="italic text-amber-400/70 font-light font-serif">you see</em> the world.
        </m.h2>

        {/* Sub-copy & CTA */}
        <div className="flex flex-col items-center">
          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base text-neutral-400 leading-relaxed max-w-[520px] mx-auto mt-2 font-light"
          >
            For over two decades, Emirates Opticians has defined optical luxury across Kerala — pairing precision science with the world&apos;s most coveted eyewear.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6"
          >
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-[0.15em] rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold"
            >
              Our Story
            </Link>
          </m.div>
        </div>

      </div>

      {/* Stats Row (below, full width) */}
      <div className="section-container relative z-10">
        <div className="border-t border-white/10 mt-16 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full">
          {STATS.map((stat, idx) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl md:text-6xl font-extralight text-white leading-none font-heading tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-2 block font-medium">
                {stat.label}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
