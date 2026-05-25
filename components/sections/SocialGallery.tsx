"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

// Inline custom Instagram SVG Icon
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InstagramPost {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
}

interface SocialGalleryProps {
  initialPosts?: InstagramPost[];
}

const STATIC_FALLBACK_POSTS: InstagramPost[] = [
  { 
    id: "s1", 
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://instagram.com/emirates__optician", 
    caption: "Premium Collections Reveal Atelier Kerala" 
  },
  { 
    id: "s2", 
    imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://instagram.com/emirates__optician", 
    caption: "Editorial Design Excellence Curation" 
  },
  { 
    id: "s3", 
    imageUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://instagram.com/emirates__optician", 
    caption: "Seaside Clarity Polarized Lenses" 
  }
];

const limitCaption = (text: string, maxWords: number): string => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

export function SocialGallery({ initialPosts = [] }: SocialGalleryProps) {
  const posts = initialPosts.length >= 3 ? initialPosts : STATIC_FALLBACK_POSTS;

  return (
    <section className="w-full bg-neutral-950 py-20 overflow-hidden" id="homepage-instagram">
      <div className="section-container">

        {/* Minimal Header Area */}
        <div className="max-w-[600px] mx-auto text-center flex flex-col items-center gap-3 mb-12">
          
          <m.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <InstagramIcon className="w-8 h-8 text-neutral-500" />
          </m.div>

          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium block"
          >
            Visual Journal
          </m.span>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-5xl font-light text-white tracking-tight font-heading uppercase"
          >
            Life in Focus
          </m.h2>

          <m.a
            href="https://instagram.com/emirates__optician"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs text-neutral-500 tracking-widest hover:text-white transition-colors duration-300 font-medium"
          >
            @emirates_optician
          </m.a>
        </div>

        {/* Asymmetric 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">

          {/* Post 0 — Hero Left spans 2 columns & rows on desktop */}
          <m.a
            href={posts[0].permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="md:col-span-2 md:row-span-2 h-[320px] md:h-[520px] max-h-[520px] rounded-2xl overflow-hidden relative group bg-neutral-900 block"
          >
            <Image
              src={posts[0].imageUrl}
              alt={posts[0].caption || "Life in Focus"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            {/* Caption overlay (only for dynamic hero image) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl z-10">
              <p className="text-xs text-white uppercase tracking-[0.1em] font-medium max-w-[90%] truncate">
                {limitCaption(posts[0].caption, 5)}
              </p>
            </div>
            {/* Subtle hovering vignette */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 rounded-2xl" />
          </m.a>

          {/* Post 1 — Top Right Card */}
          <m.a
            href={posts[1].permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="md:col-span-1 aspect-[4/3] rounded-2xl overflow-hidden relative group bg-neutral-900 block"
          >
            <Image
              src={posts[1].imageUrl}
              alt={posts[1].caption || "Life in Focus"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 rounded-2xl" />
          </m.a>

          {/* Post 2 — Bottom Right Card */}
          <m.a
            href={posts[2].permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-1 aspect-[4/3] rounded-2xl overflow-hidden relative group bg-neutral-900 block"
          >
            <Image
              src={posts[2].imageUrl}
              alt={posts[2].caption || "Life in Focus"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 rounded-2xl" />
          </m.a>

        </div>

        {/* Pill Outline Follow CTA */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://instagram.com/emirates__optician"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow on Instagram
          </a>
        </m.div>

      </div>
    </section>
  );
}
