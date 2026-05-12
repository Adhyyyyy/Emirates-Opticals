"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Interactive, LuxuryButton } from "@/components/ui/LuxuryButton";

// Verified Unsplash IDs to avoid 404s
const GALLERY_POSTS = [
  { id: 1, type: "large", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, type: "stacked", img1: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", img2: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800" },
  { id: 3, type: "large", img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, type: "stacked", img1: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800", img2: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800" },
];

export function SocialGallery() {
  return (
    <section className="bg-black text-white py-24 md:py-32 overflow-hidden border-t-[1.5px] border-white/40">
      <div className="container-tight">
        
        {/* Brand Anchor - Minimalist Strip */}
        <div className="mb-12 md:mb-16">
          <motion.a 
            href="https://instagram.com/emirates__optician"
            target="_blank"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block group"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase border-b border-white pb-1 group-hover:text-white/70 transition-colors">
              @emirates__optician
            </span>
          </motion.a>
        </div>

        {/* Mosaic Grid - Compact & Symmetrical */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-start">
          
          {/* Column 1: Large */}
          <GalleryItem src={GALLERY_POSTS[0].img!} isLarge />

          {/* Column 2: Stacked */}
          <div className="flex flex-col gap-3 md:gap-4">
            <GalleryItem src={GALLERY_POSTS[1].img1!} />
            <GalleryItem src={GALLERY_POSTS[1].img2!} />
          </div>

          {/* Column 3: Large */}
          <GalleryItem src={GALLERY_POSTS[2].img!} isLarge />

          {/* Column 4: Stacked */}
          <div className="flex flex-col gap-3 md:gap-4">
            <GalleryItem src={GALLERY_POSTS[3].img1!} />
            <GalleryItem src={GALLERY_POSTS[3].img2!} />
          </div>

        </div>

        <div className="mt-20 flex justify-center">
          <LuxuryButton variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
            Follow the Journey
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ src, isLarge = false }: { src: string; isLarge?: boolean }) {
  return (
    <Interactive 
      hoverScale={1.02}
      className={cn(
        "relative group overflow-hidden bg-white/5",
        isLarge ? "aspect-square md:h-[420px]" : "aspect-square md:h-[202px]"
      )}
    >
      <Image 
        src={src}
        alt="Social Post"
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
        sizes={isLarge ? "500px" : "300px"}
      />
      
      {/* Social Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
        <Camera className="w-5 h-5 text-white stroke-[1.5px]" />
      </div>
    </Interactive>
  );
}
