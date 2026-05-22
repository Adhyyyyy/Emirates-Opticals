"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
// Inline custom Instagram SVG Icon
function InstagramIcon({ className = "w-5 h-5", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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

const STATIC_FALLBACK_POSTS = [
  { id: "s1", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Premium collections reveal." },
  { id: "s2", imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Editorial design excellence." },
  { id: "s3", imageUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Seaside clarity. Polarized lenses." },
  { id: "s4", imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Luxury boutique experience." },
  { id: "s5", imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Structural lightweight acetate." },
  { id: "s6", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800", permalink: "https://instagram.com/emirates__optician", caption: "Advanced vision care." },
];

export function SocialGallery({ initialPosts = [] }: SocialGalleryProps) {
  const posts = initialPosts.length >= 6 ? initialPosts : STATIC_FALLBACK_POSTS;

  return (
    <section className="w-full bg-[#0A0A0A] section-padding overflow-hidden border-t border-white/10">
      <div className="container-tight">

        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 flex items-center justify-center border border-[#C9A84C]/30 rounded-full mb-8"
          >
            <InstagramIcon className="w-5 h-5 text-[#C9A84C]" strokeWidth={1.5} />
          </m.div>

          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-4 block"
          >
            The Visual Journal
          </m.span>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-[-0.03em] leading-[0.9] font-heading mb-6"
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-[#C9A84C] transition-colors duration-500"
          >
            <span className="w-6 h-[1px] bg-current transition-all duration-500 group-hover:w-10" />
            @emirates__optician
            <span className="w-6 h-[1px] bg-current transition-all duration-500 group-hover:w-10" />
          </m.a>
        </div>

        {/* Asymmetric Mosaic Grid */}
        <div className="grid grid-cols-12 grid-rows-2 gap-3 md:gap-4 h-[500px] md:h-[680px]">

          {/* Post 0 — Large left, spans 2 rows */}
          <GalleryTile post={posts[0]} className="col-span-5 row-span-2" delay={0} />

          {/* Post 1 — Top middle */}
          <GalleryTile post={posts[1]} className="col-span-4 row-span-1" delay={0.08} />

          {/* Post 2 — Top right */}
          <GalleryTile post={posts[2]} className="col-span-3 row-span-1" delay={0.16} />

          {/* Post 3 — Bottom middle (wide) */}
          <GalleryTile post={posts[3]} className="col-span-3 row-span-1" delay={0.24} />

          {/* Post 4 — Bottom right tall */}
          <GalleryTile post={posts[4]} className="col-span-4 row-span-1" delay={0.32} />

        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-14 md:mt-20 flex justify-center"
        >
          <a
            href="https://instagram.com/emirates__optician"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 py-4 px-10 border border-white/20 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-700"
          >
            <InstagramIcon className="w-4 h-4 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
            Follow the Journey
          </a>
        </m.div>

      </div>
    </section>
  );
}

function GalleryTile({ post, className, delay }: { post: any; className: string; delay: number }) {
  return (
    <m.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group bg-white/5 block ${className}`}
    >
      <Image
        src={post.imageUrl}
        alt={post.caption || "Emirates Optician"}
        fill
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
      />

      {/* Cinematic hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

      {/* Caption reveal */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="w-6 h-[1px] bg-[#C9A84C] mb-3" />
        <p className="text-[9px] md:text-[10px] text-white/90 uppercase tracking-[0.2em] font-bold leading-relaxed">
          {post.caption}
        </p>
      </div>

      {/* Instagram icon badge */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <div className="w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20">
          <InstagramIcon className="w-3.5 h-3.5 text-[#C9A84C]" strokeWidth={1.5} />
        </div>
      </div>
    </m.a>
  );
}
