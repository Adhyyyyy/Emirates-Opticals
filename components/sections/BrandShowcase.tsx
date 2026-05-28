"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const ROW_1 = [
  { id: 1, name: "Tom Ford", logoText: "TOM FORD", fontClass: "font-cormorant font-bold uppercase text-xl md:text-2xl tracking-widest", imageUrl: "/Brands/Man_in_suit_wearing_eyeglasses_202605281338.jpeg", showText: true },
  { id: 2, name: "Gucci", logoText: "", fontClass: "", imageUrl: "/Brands/Androgynous_model_wearing_Gucci_._202605281315.jpeg", showText: false },
  { id: 3, name: "Oakley", logoText: "", fontClass: "", imageUrl: "/Brands/Athlete_wearing_Oakley_sunglasses_202605281315.jpeg", showText: false },
  { id: 4, name: "Dolce & Gabbana", logoText: "DOLCE & GABBANA", fontClass: "font-didot uppercase text-lg md:text-xl tracking-widest", imageUrl: "/Brands/Woman_in_gold_embroidered_dress_202605281338.jpeg", showText: true },
  { id: 5, name: "Vogue", logoText: "", fontClass: "", imageUrl: "/Brands/Female_model_wearing_Vogue_Eyewear_202605281316.jpeg", showText: false },
  { id: 6, name: "Aviators 1", logoText: "", fontClass: "", imageUrl: "/Brands/Man_wearing_aviators_highway_202605281316.jpeg", showText: false },
  { id: 7, name: "Aviators 2", logoText: "", fontClass: "", imageUrl: "/Brands/Man_wearing_aviators_highway_202605281326.jpeg", showText: false },
  { id: 8, name: "Bvlgari", logoText: "BVLGARI", fontClass: "font-trajan uppercase text-xl md:text-2xl tracking-[0.25em]", imageUrl: "/Brands/Woman_wearing_Bvlgari_frames_202605281327.jpeg", showText: true },
  { id: 9, name: "Police", logoText: "", fontClass: "", imageUrl: "/Brands/Man_wearing_Police_sunglasses_202605281316.jpeg", showText: false },
  { id: 10, name: "Stylish Overcoat", logoText: "", fontClass: "", imageUrl: "/Brands/Stylish_man_in_overcoat_202605281338.jpeg", showText: false },
  { id: 11, name: "Diesel", logoText: "", fontClass: "", imageUrl: "/Brands/Tattooed_person_wearing_Diesel_s._202605281317.jpeg", showText: false },
  { id: 12, name: "Bvlgari 2", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_Bvlgari_frames_202605281328.jpeg", showText: false },
];

const ROW_2 = [
  { id: 13, name: "Montblanc", logoText: "MONTBLANC", fontClass: "font-futura font-light uppercase text-lg md:text-xl tracking-[0.3em]", imageUrl: "/Brands/Man_wearing_Montblanc_frames_202605281316.jpeg", showText: true },
  { id: 14, name: "D&G", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_D&G_sunglasses_202605281316.jpeg", showText: false },
  { id: 15, name: "Eyewear Collection", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_eyewear_collection_202605281317.jpeg", showText: false },
  { id: 16, name: "DB Eyewear", logoText: "DB EYEWEAR", fontClass: "font-helvetica font-thin uppercase text-xl md:text-2xl tracking-widest", imageUrl: "/Brands/Mature_man_wearing_glasses_202605281338.jpeg", showText: true },
  { id: 17, name: "Collection 2", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_eyewear_collection_202605281327.jpeg", showText: false },
  { id: 18, name: "Gold Rimmed", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_gold-rimmed_eyegla._202605281338.jpeg", showText: false },
  { id: 19, name: "Cartier", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_gold_Cartier_glasses_202605281315.jpeg", showText: false },
  { id: 20, name: "Prada", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_Prada_glasses_202605281315.jpeg", showText: false },
  { id: 21, name: "Beach", logoText: "", fontClass: "", imageUrl: "/Brands/Woman_wearing_sunglasses_beach_202605281316.jpeg", showText: false },
  { id: 22, name: "Young Man", logoText: "", fontClass: "", imageUrl: "/Brands/Young_man_wearing_sunglasses_202605281315.jpeg", showText: false },
  { id: 23, name: "Lacoste", logoText: "", fontClass: "", imageUrl: "/Brands/Young_woman_wearing_Lacoste_frames_202605281316.jpeg", showText: false },
  { id: 24, name: "Calvin Klein", logoText: "", fontClass: "", imageUrl: "/Brands/Androgynous_model_wearing_Calvin._202605281317 - Copy.jpeg", showText: false },
];

export function BrandShowcase() {

  const displayRow1 = [...ROW_1, ...ROW_1];
  const displayRow2 = [...ROW_2, ...ROW_2];

  return (
    <section className="w-full bg-white pb-16 md:pb-24 pt-12 md:pt-16 overflow-hidden border-y border-[#E8E4DC]">
      <div className="w-full">
        
        {/* Harmonized Section Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
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
  return (
    <div 
      className="relative flex-shrink-0 select-none cursor-pointer overflow-hidden group w-[280px] h-[160px] md:w-[380px] md:h-[220px]"
    >
      <div 
        className="relative w-full h-full bg-neutral-900 transition-opacity duration-500 group-hover/showcase:opacity-60 hover:!opacity-100"
      >
        {/* Full Bleed Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={brand.imageUrl} 
            alt={brand.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] group-hover:brightness-[0.9]"
          />
          {brand.showText && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          )}
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
    </div>
  );
}
