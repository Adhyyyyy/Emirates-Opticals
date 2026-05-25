"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  "100% UV protection guaranteed",
  "Polarized lens options",
  "Ray-Ban, Oakley, PRADA, and more",
  "Prescription sunglasses available"
];

export function ServiceSunglasses() {
  return (
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Services
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Premium Sunglasses
              <br />
              <em className="italic font-light text-amber-500/80">Collection</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-8 max-w-xl"
            >
              Protect your eyes in style with our curated collection of authentic branded sunglasses from the world&apos;s leading designers.
            </m.p>

            <div className="flex flex-col gap-3 mb-3">
              {FEATURES.map((text, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    {text}
                  </span>
                </m.div>
              ))}
            </div>

            <p className="text-xs text-neutral-400 font-light italic mb-8">
              * All sunglasses come with authenticity certification and warranty as standard.
            </p>

            <Link
              href="/shop"
              className="bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] px-7 py-3.5 rounded-full hover:bg-neutral-700 transition inline-flex items-center gap-2 font-medium"
            >
              Explore Sunglasses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right: Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl group shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Sunglasses"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
          </m.div>

        </div>
      </div>
    </section>
  );
}
