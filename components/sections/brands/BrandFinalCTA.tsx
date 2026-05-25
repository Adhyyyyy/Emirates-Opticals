"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export function BrandFinalCTA() {
  return (
    <section className="w-full bg-neutral-900 py-20 border-t border-white/10">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">

        <div className="flex flex-col max-w-[500px]">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.2em] text-amber-400/70 mb-3 block font-medium"
          >
            Explore Now
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight mb-4 uppercase font-heading"
          >
            Discover Your
            <br />
            <em className="font-serif italic text-amber-300/90" style={{ fontStyle: "italic" }}>Perfect Frame</em>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-400 leading-relaxed max-w-[420px]"
          >
            Visit your nearest Emirates Optician branch for expert styling guidance, premium eye testing, and access to the world&apos;s most iconic eyewear brands.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col md:flex-row gap-3 shrink-0"
        >
          <Link
            href="/shop"
            className="bg-amber-400 text-neutral-900 text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            Explore Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/branches"
            className="border border-white/20 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full hover:border-white hover:bg-white/5 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5" />
            Find a Branch
          </Link>
        </m.div>

      </div>
    </section>
  );
}
