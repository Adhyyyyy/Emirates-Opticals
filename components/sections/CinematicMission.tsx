"use client";

import React, { useRef } from "react";
import { m, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section className="w-full bg-[#0A0A0A] section-padding border-t border-[#1E1E1E] overflow-hidden relative">

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.04),transparent_65%)] pointer-events-none" />

      <div className="container-luxury relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <m.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#C9A84C] mb-8 block"
        >
          Our Promise
        </m.span>

        {/* Cinematic Headline */}
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[72px] font-light font-heading uppercase tracking-tight text-white leading-[1.05] max-w-4xl mb-8"
        >
          Change the way<br />
          <em className="italic text-[#C9A84C]/80 font-extralight">you see</em> the world.
        </m.h2>

        {/* Sub-copy */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[15px] font-light text-white/50 max-w-xl leading-relaxed mb-16"
        >
          For over two decades, Emirates Opticians has defined optical luxury across Kerala — pairing precision science with the world's most coveted eyewear.
        </m.p>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-24"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] px-8 h-[48px] transition-all duration-300"
          >
            Our Story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </m.div>

        {/* Gold Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent mb-24" />

        {/* Animated Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 w-full">
          {STATS.map((stat, idx) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              className="flex flex-col items-center gap-3 md:border-r md:border-[#1E1E1E] last:border-0 px-6"
            >
              <span className="text-[42px] md:text-5xl font-extralight font-heading text-white leading-none tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 text-center">
                {stat.label}
              </span>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
