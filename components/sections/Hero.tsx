"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { EyewearCarousel } from "@/components/common/EyewearCarousel";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle, Eye, MapPin } from "lucide-react";

const FALLBACK_SLIDES = [
  {
    url: "/Hero/Hero.webp",
    mobileUrl: "/Hero/mobile1.png",
    title: "LUXURY MEETS VISION"
  },
  {
    url: "/Hero/Navigation_Bar_-_How_It_Works.webp",
    mobileUrl: "/Hero/mobile2.png",
    title: "CRAFTED AROUND STYLE"
  },
  {
    url: "/Hero/download.webp",
    mobileUrl: "/Hero/mobile3.png",
    title: "CURATED FOR CONFIDENCE"
  }
];

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  promoCode: string;
  discountVal: string;
  isActive: boolean;
}

interface HeroProps {
  banners?: Banner[];
  offers?: Offer[];
}

export function Hero({ banners = [], offers = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter active items
  const activeBanners = banners.filter(b => b.isActive);
  const activeOffers = offers.filter(o => o.isActive);

  // Background images logic: Use active banner URLs if present, otherwise fall back
  const backgroundItems = activeBanners.length > 0 
    ? activeBanners.map(b => ({
        url: b.imageUrl,
        mobileUrl: b.imageUrl,
        title: b.title
      }))
    : FALLBACK_SLIDES;

  useEffect(() => {
    if (backgroundItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [backgroundItems.length]);

  const activePromo = activeOffers[0];

  return (
    <section className="relative w-full h-[100svh] md:h-screen min-h-[550px] md:min-h-[680px] bg-black z-20 overflow-visible flex flex-col justify-between">
      
      {/* â”€â”€ CINEMATIC DYNAMIC BACKGROUND CAROUSEL â”€â”€ */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {backgroundItems.map((item, idx) => (
          <m.div
            key={idx}
            initial={false}
            animate={{ 
              opacity: currentIndex === idx ? 1 : 0,
              scale: currentIndex === idx ? 1 : 1.05
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ zIndex: currentIndex === idx ? 1 : 0 }}
          >
            {/* Desktop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-[center_30%] hidden md:block"
              style={{ backgroundImage: `url('${item.url}')` }}
            />
            {/* Mobile Image */}
            <div 
              className="absolute inset-0 bg-cover bg-[center_top] block md:hidden"
              style={{ backgroundImage: `url('${item.mobileUrl || item.url}')` }}
            />
          </m.div>
        ))}
        
        {/* Light overlays for legibility */}
        <div className="absolute inset-0 bg-black/20 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-[3]" />
      </div>

      {/* â”€â”€ TOP LAYER: ACTIVE PROMOTIONAL TICKER â”€â”€ */}
      <div className="relative z-30 w-full pt-16 md:pt-28">
      </div>

      {/* â”€â”€ MAIN INTERACTIVE HUD: CINEMATIC COPY & CTAs â”€â”€ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="max-w-[700px] w-full mx-auto flex flex-col items-center gap-6 sm:gap-8">
          
          {/* Main Cinematic Headings - Single Elegant Text */}
          <Reveal delay={0.4}>
            <h1 className="font-heading font-extralight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] uppercase text-white drop-shadow-lg tracking-wide leading-tight">
              {backgroundItems[currentIndex]?.title}
            </h1>
          </Reveal>

          {/* â”€â”€ PREMIUM IMMEDIATE ACTIONS (ABOVE THE FOLD) â”€â”€ */}
          <Reveal delay={0.6} className="mt-6 sm:mt-10">
            <div className="flex justify-center">
              <Link
                href="/shop"
                className="bg-[#C9A84C] text-[#0A0A0A] px-8 py-3.5 sm:px-10 sm:py-4 font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#B8952E] hover:text-white transition-all duration-500 shadow-lg rounded-[3px] inline-block text-center"
              >
                Shop New Arrivals
              </Link>
            </div>
          </Reveal>

        </div>
      </div>



      {/* Eyewear Floating Carousel bridge */}
      <div className="relative z-30 pb-6 w-full">
        <EyewearCarousel />
      </div>

    </section>
  );
}
