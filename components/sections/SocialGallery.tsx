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
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1", 
    caption: "Premium Collections Reveal Atelier Kerala" 
  },
  { 
    id: "s2", 
    imageUrl: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1", 
    caption: "Editorial Design Excellence Curation" 
  },
  { 
    id: "s3", 
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1", 
    caption: "Seaside Clarity Polarized Lenses" 
  },
  { 
    id: "s4", 
    imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1", 
    caption: "Timeless Elegance Silhouette Frames" 
  },
  { 
    id: "s5", 
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800", 
    permalink: "https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1", 
    caption: "Modern Geometry Vision Care" 
  }
];

export function SocialGallery({ initialPosts = [] }: SocialGalleryProps) {
  const posts = initialPosts.length >= 3 ? initialPosts : STATIC_FALLBACK_POSTS;

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden border-t border-brand-charcoal/5" id="homepage-instagram">
      <div className="w-full">

        {/* Minimal Header Area */}
        <div className="max-w-[600px] mx-auto text-center flex flex-col items-center gap-3 mb-12">
          
          <m.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <InstagramIcon className="w-8 h-8 text-brand-charcoal/50" />
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading font-extralight text-3xl md:text-5xl tracking-tight text-brand-charcoal uppercase leading-[1.1]"
          >
            Life in Focus
          </m.h2>

          <m.a
            href="https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs text-brand-charcoal/60 tracking-widest hover:text-brand-charcoal transition-colors duration-300 font-medium"
          >
            @emiratesoptician_opticals
          </m.a>
        </div>

        {/* Horizontal Scrolling Gallery (Prevents Vertical Congestion) */}
        <div className="w-full relative group max-w-[1600px] mx-auto">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {posts.map((post, index) => (
              <m.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="shrink-0 w-[260px] md:w-[320px] aspect-[4/5] md:aspect-square relative rounded-[3px] overflow-hidden snap-center group/card bg-neutral-900 block"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.caption || "Life in Focus"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 260px, 320px"
                />
                
                {/* Sleek Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity duration-300" />
                
                {/* Caption content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                  <InstagramIcon className="w-5 h-5 text-white/70 mb-3" />
                  <p className="text-xs text-white uppercase tracking-[0.1em] font-medium leading-relaxed line-clamp-2 shadow-sm">
                    {post.caption}
                  </p>
                </div>
              </m.a>
            ))}
          </div>
        </div>

        {/* Pill Outline Follow CTA */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 md:mt-10 flex justify-center px-4"
        >
          <a
            href="https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold px-10 py-4 rounded-[3px] transition-colors duration-500 shadow-lg bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow on Instagram
          </a>
        </m.div>

      </div>
    </section>
  );
}
