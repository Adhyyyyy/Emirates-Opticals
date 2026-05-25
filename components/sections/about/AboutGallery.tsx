"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800"
];

export function AboutGallery() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-12">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Our Spaces
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase mb-4"
          >
            Designed Around
            <br />Comfort & Style
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed"
          >
            Every Emirates Optician branch is thoughtfully designed to combine luxury eyewear retail, professional consultation, and welcoming customer care into one refined experience.
          </m.p>
        </div>

        {/* Asymmetric gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[480px] md:h-[600px]">
          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="md:col-span-8 h-full overflow-hidden relative group rounded-2xl bg-neutral-100"
          >
            <Image
              src={GALLERY_IMAGES[0]}
              alt="Luxury Retail Experience"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 rounded-2xl" />
          </m.div>
          <div className="md:col-span-4 grid grid-rows-3 gap-3 h-full">
            {GALLERY_IMAGES.slice(1).map((img, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 * (idx + 1) }}
                className="overflow-hidden relative group rounded-2xl bg-neutral-100"
              >
                <Image
                  src={img}
                  alt={`Retail Detail ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 rounded-2xl" />
              </m.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
