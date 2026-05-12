"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, Info, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCT_DATA = {
  id: "jmm-avenue",
  brand: "Jacques Marie Mage",
  name: "Avenue Square",
  price: 1250,
  colors: [
    { id: "black", label: "Midnight Noir", hex: "#000000" },
    { id: "tortoise", label: "Havana Tortoise", hex: "#4B3621" },
    { id: "crystal", label: "Champagne Crystal", hex: "#F3E5AB" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200",
  ],
  description: "A bold, sculptural masterpiece inspired by mid-century architecture. Handcrafted in Japan from 10mm blocks of premium acetate with 18k gold-plated hardware.",
};

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <div className="container-tight pt-24 md:pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Mobile: Horizontal Carousel | Desktop: Vertical Stack */}
          <div className="lg:col-span-7">
            {/* Desktop Gallery */}
            <div className="hidden lg:flex flex-col gap-6">
              {PRODUCT_DATA.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/5] bg-[#fcfcfc] w-full">
                  <Image src={img} alt="Product" fill className="object-contain" priority={idx === 0} />
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden relative w-full aspect-[4/5] overflow-hidden -mx-6 w-[calc(100%+3rem)]">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                {PRODUCT_DATA.gallery.map((img, idx) => (
                  <div key={idx} className="flex-none w-full h-full snap-center relative">
                    <Image src={img} alt="Product" fill className="object-contain" priority={idx === 0} />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {PRODUCT_DATA.gallery.map((_, idx) => (
                  <div key={idx} className="w-1 h-1 rounded-full bg-black/20" />
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Information Hub */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 flex flex-col gap-8 md:gap-10">
              
              {/* Header Editorial */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black/40">
                    {PRODUCT_DATA.brand}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-black/20 hover:text-black transition-colors"><Heart className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <h1 className="text-3xl md:text-5xl font-light font-heading tracking-tight italic">
                    {PRODUCT_DATA.name}
                  </h1>
                  <span className="text-lg md:text-xl font-medium">${PRODUCT_DATA.price}</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Select Finish — {selectedColor.label}
                </span>
                <div className="flex gap-4">
                  {PRODUCT_DATA.colors.map((color) => (
                    <button 
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border transition-all duration-300 p-0.5",
                        selectedColor.id === color.id ? "border-black scale-110" : "border-transparent opacity-60"
                      )}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Lens Customizer Trigger */}
              <div className="flex flex-col gap-6 py-8 border-y border-black/5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest">Prescription & Lenses</h3>
                  <p className="text-xs text-black/50">Free premium lenses with every frame purchase.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <button className="w-full group p-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black/80 transition-all flex justify-between items-center">
                    <span>Select Lenses</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="w-full py-4 border border-black/10 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black transition-all">
                    Virtual Try-On
                  </button>
                </div>
              </div>

              {/* Premium Perks Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: RotateCcw, label: "30-Day Returns" },
                  { icon: ShieldCheck, label: "2yr Warranty" },
                ].map((perk) => (
                  <div key={perk.label} className="flex flex-col items-center gap-2 text-center group">
                    <perk.icon className="w-4 h-4 text-black/40 group-hover:text-black transition-colors" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black">
                      {perk.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* The Narrative */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest">The Narrative</h3>
                <p className="text-sm leading-relaxed text-black/70 font-serif italic italic-editorial">
                  "{PRODUCT_DATA.description}"
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Floating Sticky Buy Bar (Mobile & Scroll) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 bg-white border-t border-black/5 z-50 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
          >
            <div className="container-tight flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{PRODUCT_DATA.name}</span>
                <span className="text-sm font-medium">${PRODUCT_DATA.price}</span>
              </div>
              <button className="flex-1 max-w-[200px] py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                Select Lenses
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
