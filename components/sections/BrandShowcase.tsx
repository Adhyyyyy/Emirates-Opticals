"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const ROW_1 = [
  { id: 1, name: "Tom Ford", brandFilter: "Tom Ford", logoText: "TOM FORD", fontClass: "font-cormorant font-bold uppercase text-xl md:text-2xl tracking-widest", imageUrl: "/Brands/Man_in_suit_wearing_eyeglasses_202605281338.jpeg", showText: true },
  { id: 2, name: "Gucci", brandFilter: "Gucci", logoText: "", fontClass: "", imageUrl: "/Brands/Androgynous_model_wearing_Gucci_._202605281315.jpeg", showText: false },
  { id: 3, name: "Oakley", brandFilter: "Oakley", logoText: "", fontClass: "", imageUrl: "/Brands/Athlete_wearing_Oakley_sunglasses_202605281315.jpeg", showText: false },
  { id: 4, name: "Dolce & Gabbana", brandFilter: "Dolce & Gabbana", logoText: "DOLCE & GABBANA", fontClass: "font-didot uppercase text-lg md:text-xl tracking-widest", imageUrl: "/Brands/Woman_in_gold_embroidered_dress_202605281338.jpeg", showText: true },
  { id: 5, name: "Vogue", brandFilter: "Vogue Eyewear", logoText: "", fontClass: "", imageUrl: "/Brands/Female_model_wearing_Vogue_Eyewear_202605281316.jpeg", showText: false },
  { id: 6, name: "Carrera 1", brandFilter: "Carrera", logoText: "", fontClass: "", imageUrl: "/Brands/Man_wearing_aviators_highway_202605281316.jpeg", showText: false },
  { id: 7, name: "Carrera 2", brandFilter: "Carrera", logoText: "", fontClass: "", imageUrl: "/Brands/Man_wearing_aviators_highway_202605281326.jpeg", showText: false },
  { id: 8, name: "Bvlgari", brandFilter: "BVLGARI", logoText: "BVLGARI", fontClass: "font-trajan uppercase text-xl md:text-2xl tracking-[0.25em]", imageUrl: "/Brands/Woman_wearing_Bvlgari_frames_202605281327.jpeg", showText: true },
  { id: 9, name: "Police", brandFilter: "Police", logoText: "", fontClass: "", imageUrl: "/Brands/Man_wearing_Police_sunglasses_202605281316.jpeg", showText: false },
  { id: 10, name: "Stylish Overcoat", brandFilter: "Ray-Ban", logoText: "", fontClass: "", imageUrl: "/Brands/Stylish_man_in_overcoat_202605281338.jpeg", showText: false },
  { id: 11, name: "Diesel", brandFilter: "Diesel", logoText: "", fontClass: "", imageUrl: "/Brands/Tattooed_person_wearing_Diesel_s._202605281317.jpeg", showText: false },
  { id: 12, name: "Bvlgari 2", brandFilter: "BVLGARI", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_Bvlgari_frames_202605281328.jpeg", showText: false },
];

const ROW_2 = [
  { id: 13, name: "Montblanc", brandFilter: "Montblanc", logoText: "MONTBLANC", fontClass: "font-futura font-light uppercase text-lg md:text-xl tracking-[0.3em]", imageUrl: "/Brands/Man_wearing_Montblanc_frames_202605281316.jpeg", showText: true },
  { id: 14, name: "Dolce & Gabbana", brandFilter: "Dolce & Gabbana", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_D&G_sunglasses_202605281316.jpeg", showText: false },
  { id: 15, name: "Eyewear Collection", brandFilter: "Ray-Ban", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_eyewear_collection_202605281317.jpeg", showText: false },
  { id: 16, name: "DB Eyewear", brandFilter: "DB Eyewear", logoText: "DB EYEWEAR", fontClass: "font-helvetica font-thin uppercase text-xl md:text-2xl tracking-widest", imageUrl: "/Brands/Mature_man_wearing_glasses_202605281338.jpeg", showText: true },
  { id: 17, name: "Carrera", brandFilter: "Carrera", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_eyewear_collection_202605281327.jpeg", showText: false },
  { id: 18, name: "Gold Rimmed", brandFilter: "Cartier", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_gold-rimmed_eyegla._202605281338.jpeg", showText: false },
  { id: 19, name: "Cartier", brandFilter: "Cartier", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_gold_Cartier_glasses_202605281315.jpeg", showText: false },
  { id: 20, name: "Prada", brandFilter: "PRADA", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_Prada_glasses_202605281315.jpeg", showText: false },
  { id: 21, name: "Beach", brandFilter: "Oakley", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_sunglasses_beach_202605281316.jpeg", showText: false },
  { id: 22, name: "Young Man", brandFilter: "Ray-Ban", logoText: "", fontClass: "", imageUrl: "/Brands/Young_man_wearing_sunglasses_202605281315.jpeg", showText: false },
  { id: 23, name: "Lacoste", brandFilter: "Lacoste", logoText: "", fontClass: "", imageUrl: "/Brands/Young_woman_wearing_Lacoste_frames_202605281316.jpeg", showText: false },
  { id: 24, name: "Calvin Klein", brandFilter: "Calvin Klein", logoText: "", fontClass: "", imageUrl: "/Brands/Androgynous_model_wearing_Calvin._202605281317 - Copy.jpeg", showText: false },
];

export function BrandShowcase() {
  const displayRow1 = [...ROW_1, ...ROW_1];
  const displayRow2 = [...ROW_2, ...ROW_2];

  return (
    <section className="w-full bg-white pb-16 md:pb-24 pt-12 md:pt-16 overflow-hidden border-y border-[#E8E4DC]">
      <div className="w-full">
        
        {/* Harmonized Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 relative z-10">
          <h2 className="h2-editorial">
            Shop by Brand
          </h2>
        </div>

        {/* Dense Grid Display Window */}
        <div className="relative w-full bg-white flex flex-col gap-1 md:gap-2 group/showcase">
          
          {/* Row 1: Moves Right to Left */}
          <div className="flex relative w-full overflow-hidden group/track">
            <div 
              className="flex w-max animate-[ticker_140s_linear_infinite] group-hover/track:[animation-play-state:paused]"
            >
              {displayRow1.map((brand, idx) => (
                <div key={`${brand.id}-${idx}`} className="pr-1 md:pr-2 shrink-0">
                  <BrandCard brand={brand} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Left to Right */}
          <div className="flex relative w-full overflow-hidden group/track">
            <div 
              className="flex w-max animate-[ticker_160s_linear_infinite_reverse] group-hover/track:[animation-play-state:paused]"
            >
              {displayRow2.map((brand, idx) => (
                <div key={`${brand.id}-${idx}`} className="pr-1 md:pr-2 shrink-0">
                  <BrandCard brand={brand} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function BrandCard({ brand }: any) {
  const brandName = brand.brandFilter || brand.name;

  return (
    <Link 
      href={`/shop?brand=${encodeURIComponent(brandName)}`}
      className="relative flex-shrink-0 select-none cursor-pointer overflow-hidden group w-[280px] h-[160px] md:w-[380px] md:h-[220px] block rounded-[3px]"
    >
      <div 
        className="relative w-full h-full bg-neutral-900 transition-opacity duration-500 group-hover/showcase:opacity-60 hover:!opacity-100"
      >
        {/* Full Bleed Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src={brand.imageUrl} 
            alt={brand.name} 
            fill
            sizes="(max-width: 768px) 280px, 380px"
            className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.85] group-hover:brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 group-hover:from-black/70 transition-colors duration-500" />
        </div>

        {/* Glassmorphic Top-Right Micro-Pill Indicator */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 opacity-80 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-0.5 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-[#C9A84C] border border-[#C9A84C]/40 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-md group-hover:bg-[#C9A84C] group-hover:text-black group-hover:border-[#C9A84C] transition-colors duration-300">
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </span>
        </div>

        {brand.showText && (
          <div className="absolute inset-0 z-10 flex w-full h-full items-end justify-start p-6 md:p-8">
            <span 
              className={cn(
                "select-none transition-transform duration-500 block text-white drop-shadow-md",
                brand.fontClass
              )}
            >
              {brand.logoText}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
