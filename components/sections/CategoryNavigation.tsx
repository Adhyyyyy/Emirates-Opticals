"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "optical",
    title: "Optical Mastery",
    subtitle: "Clinical precision meets high fashion",
    image: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=1200",
    href: "/shop?category=Optical+Frames",
  },
  {
    id: "sun",
    title: "Sun Editorial",
    subtitle: "The definitive shade collection",
    image: "https://images.unsplash.com/photo-1589718539308-169b183615fa?auto=format&fit=crop&q=80&w=1200",
    href: "/shop?category=Sunglasses",
  },
  {
    id: "lenses",
    title: "Contact Lenses & Care",
    subtitle: "Advanced clarity technologies",
    image: "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&q=80&w=1200",
    href: "/shop?category=Contact+Lenses",
  },
];

export function CategoryNavigation() {
  return (
    <section className="w-full bg-gradient-to-b from-[#F7F5F0] via-white to-[#F7F5F0] section-padding overflow-hidden border-b border-[#E8E4DC]">
      <div className="section-container">
        
        {/* Harmonized Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <Reveal delay={0.2}>
            <span className="meta-editorial mb-4 text-[#C9A84C]">
              The Visionist Gateway
            </span>
          </Reveal>
          <Reveal delay={0.4}>
            <h2 className="h2-editorial text-black">
              Curated Discovery
            </h2>
          </Reveal>
        </div>

        {/* Discovery Grid - Redesigned Curated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href} 
              className="flex flex-col rounded-2xl overflow-hidden bg-white border border-neutral-200/80 relative group h-full shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Frame - Forced Aspect Ratio for Identical Height */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF9F6]">
                <Image 
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Info Area */}
              <div className="p-6 flex flex-col gap-1.5 text-left justify-center flex-1">
                {/* Eyebrow */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] block font-bold">
                  {cat.id === "optical" ? "Ophthalmic" : cat.id === "sun" ? "Sunglasses" : "Precision Lenses"}
                </span>
                
                {/* Title and Sliding Arrow */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-medium text-neutral-900 transition-transform duration-500 group-hover:translate-x-0.5">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:text-black transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
                
                {/* Sub-label */}
                <span className="text-xs text-neutral-500 block">
                  {cat.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
