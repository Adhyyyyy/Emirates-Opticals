"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { EyewearCarousel } from "@/components/common/EyewearCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle, Eye, MapPin } from "lucide-react";

const FALLBACK_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=2000"
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
        title: b.title,
        subtitle: b.subtitle || "Exclusive Collection"
      }))
    : FALLBACK_BACKGROUNDS.map(url => ({
        url,
        title: "Spring In Full Focus",
        subtitle: "A New Season of Elevated Vision"
      }));

  useEffect(() => {
    if (backgroundItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [backgroundItems.length]);

  const activePromo = activeOffers[0];

  return (
    <section className="relative w-full h-screen min-h-[680px] bg-black z-20 overflow-visible flex flex-col justify-between">
      
      {/* ── CINEMATIC DYNAMIC BACKGROUND CAROUSEL ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${backgroundItems[currentIndex]?.url}')`,
              backgroundPosition: "center 30%" 
            }}
          />
        </AnimatePresence>
        
        {/* Soft Premium Visual Filters */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-[1]" />
        
        {/* Subtle radial gradient overlay at bottom for text legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.85)_0%,transparent_75%)] z-[2]" />
      </div>

      {/* ── TOP LAYER: ACTIVE PROMOTIONAL TICKER ── */}
      <div className="relative z-30 w-full pt-28">
      </div>

      {/* ── MAIN INTERACTIVE HUD: CINEMATIC COPY & CTAs ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="max-w-[700px] w-full mx-auto flex flex-col items-center gap-6 sm:gap-8">
          
          {/* Tagline / Eyebrow */}
          <Reveal delay={0.2}>
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#C9A84C] drop-shadow-md select-none">
              {backgroundItems[currentIndex]?.subtitle || "Premium Eyewear Collection"}
            </span>
          </Reveal>
          
          {/* Main Cinematic Headings */}
          <Reveal delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-extralight text-white uppercase tracking-tight leading-none drop-shadow-lg font-heading select-none">
              {backgroundItems[currentIndex]?.title.includes("Spring") ? (
                <>
                  Spring<br />
                  <span className="italic font-extralight text-[#C9A84C]/90">In Full Focus</span>
                </>
              ) : (
                backgroundItems[currentIndex]?.title
              )}
            </h1>
          </Reveal>

          {/* Luxury Visionist Copy */}
          <Reveal delay={0.5}>
            <p className="text-white/60 text-xs md:text-sm font-light tracking-[0.1em] max-w-lg leading-relaxed select-none uppercase">
              Shop Frames, Lenses & Sunglasses • Visit Our Store Today
            </p>
          </Reveal>
          
          {/* ── PREMIUM IMMEDIATE ACTIONS (ABOVE THE FOLD) ── */}
          <Reveal delay={0.6} className="w-full max-w-md mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              
              {/* Primary CTA Button */}
              <button 
                onClick={() => document.getElementById("homepage-showcase")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-[11px] uppercase tracking-widest hover:bg-[#C9A84C] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Explore Catalog</span>
              </button>

              {/* Secondary Ghost CTA Button */}
              <a 
                href="https://wa.me/919682929968?text=Hi%20Emirates%20Opticians%2C%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20eyewear%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/60 text-white px-8 py-3.5 rounded-full font-medium text-[11px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>WhatsApp Expert</span>
              </a>

            </div>
          </Reveal>

        </div>
      </div>

      {/* ── SIDE indicators DOCK ── */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-4">
        {backgroundItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group flex items-center justify-end gap-3 text-right focus:outline-none"
          >
            <span className={cn(
              "text-[8px] font-extrabold uppercase tracking-[0.2em] transition-all duration-700 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
              currentIndex === idx ? "text-[#C9A84C] opacity-100 translate-x-0" : "text-white/60"
            )}>
              0{idx + 1}
            </span>
            <div className={cn(
              "h-[1.5px] transition-all duration-700",
              currentIndex === idx ? "w-10 bg-[#C9A84C]" : "w-3 bg-white/30 group-hover:w-6 group-hover:bg-white"
            )} />
          </button>
        ))}
      </div>

      {/* Eyewear Floating Carousel bridge */}
      <div className="relative z-30 pb-6 w-full">
        <EyewearCarousel />
      </div>

    </section>
  );
}
