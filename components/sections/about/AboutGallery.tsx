"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800"
];

export function AboutGallery() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Designed Around<br />Comfort & Style
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
              Every Emirates Optician branch is thoughtfully designed to combine luxury eyewear retail, professional consultation, and welcoming customer care into one refined experience.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[800px]">
          <div className="md:col-span-8 h-full overflow-hidden relative group">
            <ParallaxImage
              src={GALLERY_IMAGES[0]}
              alt="Luxury Retail Experience"
              className="w-full h-full"
              distance={100}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000" />
          </div>
          <div className="md:col-span-4 grid grid-rows-3 gap-4 h-full">
            {GALLERY_IMAGES.slice(1).map((img, idx) => (
              <div key={idx} className="overflow-hidden relative group">
                <ParallaxImage
                  src={img}
                  alt={`Retail Detail ${idx + 1}`}
                  className="w-full h-full"
                  distance={50}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
