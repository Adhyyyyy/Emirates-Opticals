"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface CategoryOption {
  id: string;
  name: string;
  badge?: string;
  image: string;
  href: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  tag?: string;
  options: CategoryOption[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "eyeglasses",
    title: "Eyeglasses",
    tag: "Optical Frames",
    options: [
      {
        id: "optical-men",
        name: "Men",
        badge: "Popular",
        image: "/category/men_eyeglass.webp",
        href: "/shop?category=Optical+Frames&gender=Men",
      },
      {
        id: "optical-women",
        name: "Women",
        badge: "Trending",
        image: "/category/women_eyeglasses.webp",
        href: "/shop?category=Optical+Frames&gender=Women",
      },
      {
        id: "optical-kids",
        name: "Kids",
        image: "/category/kids_eyeglasses.webp",
        href: "/shop?category=Optical+Frames&gender=Kids",
      },
      {
        id: "optical-unisex",
        name: "Unisex",
        image: "/category/uniswx_eyeglasses.webp",
        href: "/shop?category=Optical+Frames&gender=Unisex",
      },
    ],
  },
  {
    id: "sunglasses",
    title: "Sunglasses",
    tag: "UV Protection",
    options: [
      {
        id: "sun-men",
        name: "Men",
        badge: "Bestseller",
        image: "/category/me_sunglass.png",
        href: "/shop?category=Sunglasses&gender=Men",
      },
      {
        id: "sun-women",
        name: "Women",
        badge: "Signature",
        image: "/category/women_sunglasses.webp",
        href: "/shop?category=Sunglasses&gender=Women",
      },
      {
        id: "sun-kids",
        name: "Kids",
        image: "/category/kids_sunglasses.webp",
        href: "/shop?category=Sunglasses&gender=Kids",
      },
      {
        id: "sun-unisex",
        name: "Unisex",
        image: "/category/unisex_sunglass.webp",
        href: "/shop?category=Sunglasses&gender=Unisex",
      },
    ],
  },
  {
    id: "lenses-accessories",
    title: "Contact Lenses & Accessories",
    tag: "Vision Care",
    options: [
      {
        id: "contact-lenses",
        name: "Contact Lenses",
        badge: "Daily/Monthly",
        image: "/category/contactlense.webp",
        href: "/shop?category=Contact+Lenses",
      },
      {
        id: "lens-solutions",
        name: "Lens Solutions",
        badge: "Clinical",
        image: "/category/lenssolution.webp",
        href: "/shop?category=Lens+Care+Solutions",
      },
      {
        id: "eyewear-accessories",
        name: "Accessories",
        badge: "Boutique",
        image: "/category/accessories.webp",
        href: "/shop?category=Eyewear+Accessories",
      },
      {
        id: "reading-glasses",
        name: "Reading Frames",
        badge: "Essentials",
        image: "/category/readingglass2.webp",
        href: "/shop?category=Reading+Glasses",
      },
    ],
  },
];

export function CategoryNavigation() {
  return (
    <section className="w-full bg-[#FAF9F6] pt-16 sm:pt-20 md:pt-24 pb-12 md:pb-20 border-y border-black/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* 3 Rows Stack */}
        <div className="space-y-8 sm:space-y-12">
          {CATEGORY_GROUPS.map((group) => (
            <div key={group.id} className="space-y-3 sm:space-y-4">
              
              {/* Row Sub-header */}
              <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2">
                <h3 className="text-sm sm:text-lg font-bold font-heading text-brand-charcoal uppercase tracking-tight">
                  {group.title}
                </h3>
                {group.tag && (
                  <span className="text-[7.5px] sm:text-[9px] font-bold text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {group.tag}
                  </span>
                )}
              </div>

              {/* 4-Column Responsive Card Grid (4-cols on mobile!) */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                {group.options.map((option) => (
                  <Link
                    key={option.id}
                    href={option.href}
                    className="group flex flex-col items-center text-center select-none"
                  >
                    {/* Square Rounded Card Image */}
                    <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-300">
                      <Image
                        src={option.image}
                        alt={option.name}
                        fill
                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                      />

                      {/* Subtle Vignette Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Top Badge (if present) */}
                      {option.badge && (
                        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10">
                          <span className="bg-brand-charcoal/90 backdrop-blur-md text-[#C9A84C] text-[5.5px] sm:text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] shadow-sm flex items-center gap-0.5">
                            {option.badge === "Popular" || option.badge === "Bestseller" ? (
                              <Sparkles className="w-1.5 h-1.5 text-[#C9A84C]" />
                            ) : null}
                            {option.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Clean Label Below Card */}
                    <span className="mt-2 text-[10px] sm:text-xs md:text-sm font-bold text-brand-charcoal uppercase tracking-tight group-hover:text-[#C9A84C] transition-colors line-clamp-1">
                      {option.name}
                    </span>
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
