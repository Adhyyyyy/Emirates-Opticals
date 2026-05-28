"use client";

import React from "react";
import Link from "next/link";

const COLLECTIONS = [
  {
    id: 1,
    title: "Luxury Frames",
    subtitle: "Premium Handcrafted Eyewear",
    href: "/collections/luxury",
    image: "/featured/1.webp"
  },
  {
    id: 2,
    title: "Modern Sunglasses",
    subtitle: "Advanced Lens Technology",
    href: "/collections/sunglasses",
    image: "/featured/2.webp"
  },
  {
    id: 3,
    title: "Everyday Essentials",
    subtitle: "Versatile Daily Eyewear",
    href: "/collections/essentials",
    image: "/featured/3.webp"
  }
];

export function FeaturedCollections() {
  return (
    <section className="bg-gradient-to-tr from-[#FAF9F6] to-white overflow-hidden section-padding border-y border-black/5">
      <div className="w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="h2-editorial">
            Featured Collections
          </h2>
        </div>

        {/* Controlled Asymmetric Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:max-h-[620px] w-full">
          
          {/* Left Card: Row Span 2, max height 620px */}
          <div 
            className="md:row-span-2 h-[400px] md:h-full max-h-[620px] rounded-[3px] overflow-hidden relative group border border-black/5 block"
          >
            <img 
              src={COLLECTIONS[0].image} 
              alt={COLLECTIONS[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Scrim */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent z-[1]" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 p-5 text-white z-[2] flex flex-col items-start">
              <span className="text-[10px] tracking-[0.15em] uppercase opacity-70 mb-1 font-bold">
                {COLLECTIONS[0].subtitle}
              </span>
              <h3 className="text-base md:text-lg font-medium leading-snug text-white">
                {COLLECTIONS[0].title}
              </h3>
            </div>
          </div>

          {/* Right Top Card */}
          <div 
            className="rounded-[3px] overflow-hidden relative group h-[290px] md:h-[300px] border border-black/5 block"
          >
            <img 
              src={COLLECTIONS[1].image} 
              alt={COLLECTIONS[1].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Scrim */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent z-[1]" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 p-5 text-white z-[2] flex flex-col items-start">
              <span className="text-[10px] tracking-[0.15em] uppercase opacity-70 mb-1 font-bold">
                {COLLECTIONS[1].subtitle}
              </span>
              <h3 className="text-base md:text-lg font-medium leading-snug text-white">
                {COLLECTIONS[1].title}
              </h3>
            </div>
          </div>

          {/* Right Bottom Card */}
          <div 
            className="rounded-[3px] overflow-hidden relative group h-[290px] md:h-[300px] border border-black/5 block"
          >
            <img 
              src={COLLECTIONS[2].image} 
              alt={COLLECTIONS[2].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Scrim */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent z-[1]" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 p-5 text-white z-[2] flex flex-col items-start">
              <span className="text-[10px] tracking-[0.15em] uppercase opacity-70 mb-1 font-bold">
                {COLLECTIONS[2].subtitle}
              </span>
              <h3 className="text-base md:text-lg font-medium leading-snug text-white">
                {COLLECTIONS[2].title}
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
