"use client";

import React from "react";
import { m } from "framer-motion";

export function BrandStorytelling() {
  return (
    <section className="w-full bg-neutral-950 py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 block"
            >
              Our Story
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-white tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Where Vision Meets
              <br />
              <em className="italic font-light text-amber-400/80">Luxury Craftsmanship</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-400 font-light max-w-xl leading-relaxed mb-8"
            >
              From timeless Italian luxury to cutting-edge performance eyewear, Emirates Optician brings together the world&apos;s finest eyewear houses under one premium experience.
            </m.p>
            <m.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-16 h-[1px] bg-amber-400/40 origin-left"
            />
          </div>

          {/* Right: Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Optical Craftsmanship"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/10 group-hover:border-amber-400/20 transition-colors duration-700 rounded-2xl" />
          </m.div>

        </div>
      </div>
    </section>
  );
}
