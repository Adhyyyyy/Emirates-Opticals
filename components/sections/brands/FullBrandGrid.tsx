"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ArrowUpRight } from "lucide-react";

const BRANDS = [
  {
    name: "PRADA",
    origin: "Italy",
    category: "Luxury Fashion",
    desc: "Italian luxury with bold silhouettes and refined detailing. Fashion-forward frames with premium finishes.",
    img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Ray-Ban",
    origin: "United States",
    category: "Iconic Classics",
    desc: "Timeless eyewear defining generations with legendary designs like Aviator and Wayfarer.",
    img: "https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Oakley",
    origin: "United States",
    category: "Sports Performance",
    desc: "Performance-driven eyewear engineered for athletes and active lifestyles with advanced lens technology.",
    img: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Cartier",
    origin: "France",
    category: "Haute Luxury",
    desc: "Exceptional craftsmanship and timeless elegance inspired by Parisian luxury heritage.",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tom Ford",
    origin: "United States",
    category: "Luxury Glamour",
    desc: "Sophisticated contemporary eyewear combining bold elegance with iconic detailing.",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Gucci",
    origin: "Italy",
    category: "Bold Luxury",
    desc: "Eclectic statement-making frames blending modern fashion with Italian luxury craftsmanship.",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Maui Jim",
    origin: "United States",
    category: "Premium Sunglasses",
    desc: "Advanced polarized lens technology delivering exceptional color clarity and UV protection.",
    img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Vogue Eyewear",
    origin: "Italy",
    category: "Fashion Forward",
    desc: "Runway-inspired eyewear collections expressing contemporary style and vibrant fashion energy.",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Diesel",
    origin: "Italy",
    category: "Bold, Edgy Designs",
    desc: "Industrial-inspired contemporary eyewear with rebellious fashion identity.",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Police",
    origin: "Italy",
    category: "Urban Sport Style",
    desc: "Dynamic modern frames combining sporty aesthetics with urban attitude.",
    img: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Carrera",
    origin: "Austria",
    category: "Racing Heritage",
    desc: "Distinctive eyewear inspired by motorsport heritage and modern luxury performance.",
    img: "https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Lacoste",
    origin: "France",
    category: "Sporty Elegance",
    desc: "French fashion heritage combining sporty sophistication with timeless style.",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Calvin Klein",
    origin: "United States",
    category: "Minimalist Chic",
    desc: "Clean contemporary designs focused on refined simplicity and modern elegance.",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "BVLGARI",
    origin: "Italy",
    category: "Roman Luxury",
    desc: "Architectural eyewear inspired by Roman luxury craftsmanship and timeless glamour.",
    img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dolce & Gabbana",
    origin: "Italy",
    category: "Mediterranean Glamour",
    desc: "Opulent Italian fashion eyewear infused with bold personality and luxury aesthetics.",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Montblanc",
    origin: "Germany",
    category: "Refined Craftsmanship",
    desc: "Precision-crafted eyewear reflecting timeless sophistication and luxury craftsmanship.",
    img: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"
  }
];

export function FullBrandGrid() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden" id="brand-grid">
      <div className="container-tight">
        
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              The World's Finest<br /><em className="italic">Optical Collections</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-16 h-[2px] bg-brand-gold mx-auto" />
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((brand, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-brand-pearl border border-black/5 hover:border-brand-gold/30 transition-all duration-700 h-full flex flex-col overflow-hidden">
                {/* Brand Visual (Abstract Mood) */}
                <div className="relative h-48 overflow-hidden bg-brand-charcoal">
                  <img 
                    src={brand.img} 
                    alt={brand.name}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-white tracking-widest uppercase">
                      {brand.name}
                    </span>
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
                        {brand.origin}
                      </span>
                      <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter">
                        {brand.category}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed mb-10 flex-1">
                    {brand.desc}
                  </p>

                  <LuxuryButton variant="outline" className="w-full group/btn text-[10px] py-3">
                    View Collection
                    <ArrowUpRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </LuxuryButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
