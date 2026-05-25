"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const CATEGORIES = [
  {
    id: "optical",
    title: "Optical Mastery",
    subtitle: "Clinical precision meets high fashion",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200",
    href: "/shop/optical",
  },
  {
    id: "sun",
    title: "Sun Editorial",
    subtitle: "The definitive shade collection",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1200",
    href: "/shop/sun",
  },
  {
    id: "lenses",
    title: "Lens Atelier",
    subtitle: "Advanced clarity technologies",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200",
    href: "/shop/lenses",
  },
];

export function CategoryNavigation() {
  return (
    <section className="w-full bg-[#F7F5F0] section-padding overflow-hidden border-b border-[#E8E4DC]">
      <div className="section-container">
        
        {/* Harmonized Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-24 mt-20 md:mt-24">
          <Reveal delay={0.2}>
            <span className="meta-editorial mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              key={cat.id} 
              href={cat.href} 
              className="flex flex-col rounded-2xl overflow-hidden bg-white border border-neutral-100 relative group h-full hover:shadow-xl transition-all duration-500"
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
              </div>

              {/* Card Info Area */}
              <div className="p-5 flex flex-col gap-1 text-left justify-center flex-1">
                {/* Eyebrow */}
                <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 block font-medium">
                  {cat.id === "optical" ? "Ophthalmic" : cat.id === "sun" ? "Sunglasses" : "Precision Lenses"}
                </span>
                
                {/* Title and Sliding Arrow */}
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="text-sm text-neutral-900 transform -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out select-none font-sans">
                    →
                  </span>
                  <h3 className="text-base font-medium text-neutral-900 transition-transform duration-500 group-hover:translate-x-0.5">
                    {cat.title}
                  </h3>
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
