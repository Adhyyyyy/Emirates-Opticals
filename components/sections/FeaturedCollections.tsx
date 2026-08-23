"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";

const COLLECTIONS = [
  {
    id: 1,
    title: "Luxury Frames",
    subtitle: "Emirates Signature Series",
    href: "/shop?collectionType=Emirates+Signature",
    image: "/featured/1.webp"
  },
  {
    id: 2,
    title: "Modern Sunglasses",
    subtitle: "Advanced UV & Polarized Tech",
    href: "/shop?category=Sunglasses",
    image: "/featured/2.webp"
  },
  {
    id: 3,
    title: "Everyday Essentials",
    subtitle: "Optical Precision & Style",
    href: "/shop?category=Optical+Frames",
    image: "/featured/3.webp"
  }
];

export function FeaturedCollections() {
  return (
    <section className="bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] overflow-hidden section-padding border-y border-black/5">
      <div className="w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h2 className="h2-editorial text-brand-charcoal">
            Featured Collections
          </h2>
        </div>

        {/* Interactive Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:max-h-[620px] w-full">
          
          {/* Main Hero Card */}
          <Link
            href={COLLECTIONS[0].href}
            className="md:row-span-2 h-[380px] md:h-full max-h-[620px] rounded-[3px] overflow-hidden relative group border border-black/10 block shadow-sm hover:shadow-xl transition-all duration-700"
          >
            <Image 
              src={COLLECTIONS[0].image} 
              alt={COLLECTIONS[0].title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1] transition-opacity duration-500 group-hover:opacity-90" />
            
            <div className="absolute bottom-0 p-6 md:p-8 text-white z-[2] flex flex-col items-start w-full">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1 font-bold">
                {COLLECTIONS[0].subtitle}
              </span>
              <h3 className="text-xl md:text-2xl font-light leading-snug text-white mb-4">
                {COLLECTIONS[0].title}
              </h3>

              <div className="inline-flex items-center gap-2 bg-[#C9A84C] text-black px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 group-hover:bg-white group-hover:text-black shadow-lg">
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Secondary Cards */}
          {COLLECTIONS.slice(1).map((item) => (
            <Link 
              key={item.id}
              href={item.href}
              className="rounded-[3px] overflow-hidden relative group h-[280px] md:h-[300px] border border-black/10 block shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]" />
              
              <div className="absolute bottom-0 p-6 text-white z-[2] flex flex-col items-start w-full">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1 font-bold">
                  {item.subtitle}
                </span>
                <h3 className="text-lg font-light leading-snug text-white mb-3">
                  {item.title}
                </h3>

                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] group-hover:text-white transition-colors duration-300">
                  <span>Discover Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
