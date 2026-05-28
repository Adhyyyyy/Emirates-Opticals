"use client";

import React from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const BRANDS = [
  {
    name: "PRADA",
    origin: "Italian Luxury",
    category: "Sophisticated, Avant-Garde",
    desc: "Italian luxury with bold silhouettes and refined detailing. Fashion-forward frames with premium finishes.",
    img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Cartier",
    origin: "French Maison",
    category: "Timeless Elegance",
    desc: "Exceptional craftsmanship and timeless elegance inspired by Parisian luxury heritage.",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Ray-Ban",
    origin: "American Classic",
    category: "Iconic, Everyday Style",
    desc: "Timeless eyewear defining generations with legendary designs like Aviator and Wayfarer.",
    img: "https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Oakley",
    origin: "American Performance",
    category: "Sports & Innovation",
    desc: "Performance-driven eyewear engineered for athletes and active lifestyles with advanced lens technology.",
    img: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tom Ford",
    origin: "American Glamour",
    category: "Bold, Sensual, Modern",
    desc: "Sophisticated contemporary eyewear combining bold elegance with iconic detailing.",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Carrera",
    origin: "Austrian Racing",
    category: "Sporty & Dynamic",
    desc: "Distinctive eyewear inspired by motorsport heritage and modern luxury performance.",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800"
  }
];

export function FullBrandGrid() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden" id="brand-grid">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Authentic Eyewear
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
          >
            The World&apos;s Finest <em className="italic font-light text-amber-500/80">Optical Collections</em>
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((brand, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="group bg-[#FAF8F5] border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 h-full flex flex-col overflow-hidden rounded-[3px]"
            >
              {/* Brand Visual (Abstract Mood) */}
              <div className="relative h-48 overflow-hidden bg-neutral-900 rounded-t-[3px]">
                <Image 
                  src={brand.img} 
                  alt={brand.name}
                  fill
                  className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] uppercase font-heading drop-shadow-md">
                    {brand.name}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-1">
                    {brand.origin}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900 mb-4">
                    {brand.category}
                  </h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">
                    {brand.desc}
                  </p>
                </div>

                <button className="w-full border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 text-xs uppercase tracking-[0.15em] py-3.5 rounded-[3px] font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                  View Collection
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
