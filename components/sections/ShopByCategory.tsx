"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { Glasses, Sun, Monitor, Bike, Gem } from "lucide-react";

const CATEGORIES = [
  {
    id: "optical-frames",
    label: "Optical Frames",
    icon: Glasses,
    href: "/shop?category=optical-frames",
  },
  {
    id: "sunglasses",
    label: "Sunglasses",
    icon: Sun,
    href: "/shop?category=sunglasses",
  },
  {
    id: "blue-light",
    label: "Blue Light",
    icon: Monitor,
    href: "/shop?category=blue-light",
  },
  {
    id: "sports",
    label: "Sports",
    icon: Bike,
    href: "/shop?category=sports",
  },
  {
    id: "luxury",
    label: "Luxury Collection",
    icon: Gem,
    href: "/shop?category=luxury",
  },
];

export function ShopByCategory() {
  return (
    <section className="w-full bg-white section-padding border-t border-black/5">
      <div className="container-luxury">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]/80 block mb-4"
          >
            Browse
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-[48px] font-light font-heading uppercase tracking-tight text-[#0A0A0A] leading-[1.1]"
          >
            Shop by Category
          </m.h2>
        </div>

        {/* 5-Tile Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <m.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col items-center justify-center gap-5 py-10 px-6 border border-black/8 rounded-3xl hover:border-[#C9A84C]/50 bg-[#F7F5F0] hover:bg-[#C9A84C]/5 transition-all duration-400 text-center"
                >
                  <div className="w-14 h-14 flex items-center justify-center border border-black/10 rounded-full group-hover:border-[#C9A84C]/40 transition-colors duration-400">
                    <Icon className="w-6 h-6 text-black/35 group-hover:text-[#C9A84C] transition-colors duration-400" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/50 group-hover:text-[#0A0A0A] transition-colors duration-300 leading-tight">
                    {cat.label}
                  </span>
                </Link>
              </m.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
