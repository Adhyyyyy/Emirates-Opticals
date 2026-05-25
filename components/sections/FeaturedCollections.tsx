"use client";

import React from "react";
import Link from "next/link";

const COLLECTIONS = [
  {
    id: 1,
    title: "Elevate your sport game",
    subtitle: "Maui Jim Collection",
    href: "/collections/maui-jim",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    title: "Travel in style",
    subtitle: "Atelier Accessories",
    href: "/collections/accessories",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    title: "Discover latest designer frames",
    subtitle: "Luxury Optical Frames",
    href: "/collections/optical",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
  }
];

export function FeaturedCollections() {
  return (
    <section className="bg-[#FAF9F6] overflow-hidden section-padding border-y border-black/5">
      <div className="section-container">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="meta-editorial mb-4">
            Curated Architecture
          </span>
          <h2 className="h2-editorial">
            Featured Collections
          </h2>
        </div>

        {/* Controlled Asymmetric Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:max-h-[620px] w-full">
          
          {/* Left Card: Row Span 2, max height 620px */}
          <Link 
            href={COLLECTIONS[0].href}
            className="md:row-span-2 h-[400px] md:h-full max-h-[620px] rounded-2xl overflow-hidden relative group border border-black/5 block"
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
          </Link>

          {/* Right Top Card */}
          <Link 
            href={COLLECTIONS[1].href}
            className="rounded-2xl overflow-hidden relative group h-[290px] md:h-[300px] border border-black/5 block"
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
          </Link>

          {/* Right Bottom Card */}
          <Link 
            href={COLLECTIONS[2].href}
            className="rounded-2xl overflow-hidden relative group h-[290px] md:h-[300px] border border-black/5 block"
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
          </Link>

        </div>

      </div>
    </section>
  );
}
