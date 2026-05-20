"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Interactive, LuxuryButton } from "@/components/ui/LuxuryButton";
import { GridStagger, StaggerItem } from "@/components/motion/Reveal";

interface InstagramPost {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
}

interface SocialGalleryProps {
  initialPosts?: InstagramPost[];
}

const STATIC_FALLBACK_POSTS = [
  { id: "s1", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Premium collections reveal." },
  { id: "s2", imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Editorial design excellence." },
  { id: "s3", imageUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Seaside clarity polarized lenses." },
  { id: "s4", imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Luxury boutique checking lounge." },
  { id: "s5", imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Structural lightweight design acetate frames." },
  { id: "s6", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Advanced vision care map equipment." }
];

export function SocialGallery({ initialPosts = [] }: SocialGalleryProps) {
  // Graceful fallback to static posts if feed is empty or lacks minimum tiles
  const posts = initialPosts.length >= 6 ? initialPosts : STATIC_FALLBACK_POSTS;

  return (
    <section className="bg-black text-white section-padding overflow-hidden border-t-[1.5px] border-white/40">
      <div className="container-tight">
        
        {/* Brand Anchor Link */}
        <div className="mb-12 md:mb-16">
          <m.a 
            href="https://instagram.com/emirates__optician"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block group"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase border-b border-white pb-1 group-hover:text-white/70 transition-colors">
              @emirates__optician
            </span>
          </m.a>
        </div>

        {/* Mosaic Symmetrical Grid */}
        <GridStagger className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-start">
          
          {/* Column 1: Large card */}
          <StaggerItem>
            <GalleryItem post={posts[0]} isLarge />
          </StaggerItem>

          {/* Column 2: Stacked cards */}
          <div className="flex flex-col gap-3 md:gap-4">
            <StaggerItem>
              <GalleryItem post={posts[1]} />
            </StaggerItem>
            <StaggerItem>
              <GalleryItem post={posts[2]} />
            </StaggerItem>
          </div>

          {/* Column 3: Large card */}
          <StaggerItem>
            <GalleryItem post={posts[3]} isLarge />
          </StaggerItem>

          {/* Column 4: Stacked cards */}
          <div className="flex flex-col gap-3 md:gap-4">
            <StaggerItem>
              <GalleryItem post={posts[4]} />
            </StaggerItem>
            <StaggerItem>
              <GalleryItem post={posts[5]} />
            </StaggerItem>
          </div>

        </GridStagger>

        <div className="mt-20 flex justify-center">
          <LuxuryButton asChild variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
            <a href="https://instagram.com/emirates__optician" target="_blank" rel="noopener noreferrer">
              Follow the Journey
            </a>
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ post, isLarge = false }: { post: any; isLarge?: boolean }) {
  return (
    <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
      <Interactive 
        hoverScale={1.02}
        className={cn(
          "relative group overflow-hidden bg-white/5",
          isLarge ? "aspect-square md:h-[420px]" : "aspect-square md:h-[202px]"
        )}
      >
        <Image 
          src={post.imageUrl}
          alt={post.caption || "Instagram Post"}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes={isLarge ? "500px" : "300px"}
        />
        
        {/* Dynamic Social Overlay with Caption */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
          <Camera className="w-6 h-6 text-brand-gold mb-3 stroke-[1.5px]" />
          <p className="text-[10px] text-white/90 line-clamp-3 leading-relaxed uppercase tracking-wider font-light">
            {post.caption}
          </p>
        </div>
      </Interactive>
    </a>
  );
}
