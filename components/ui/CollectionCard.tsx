"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE_LUXURY } from "@/lib/motion";

interface CollectionCardProps {
  title: string;
  linkText: string;
  href: string;
  image: string;
  index: number;
  aspectRatio?: string;
}

export function CollectionCard({ 
  title, 
  linkText, 
  href, 
  image, 
  index,
  aspectRatio = "aspect-[16/10]" 
}: CollectionCardProps) {
  const serial = String(index + 1).padStart(2, "0");

  return (
    <Link href={href} className="group block w-full relative">
      {/* Curved Image Frame Container */}
      <m.div 
        whileHover={{ y: -8 }}
        transition={{ duration: 0.8, ease: EASE_LUXURY }}
        className="relative w-full p-2 card-luxury"
      >
        <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-[2px]`}>
          {/* Gentle light overlay to prevent image blowing out */}
          <div className="absolute inset-0 bg-black/[0.02] z-10 transition-colors duration-700 group-hover:bg-black/[0.05]" />
          
          {/* Zoom Image */}
          <m.img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />

          {/* Top Left Floating Frosted Glass Index Indicator */}
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-white/80 backdrop-blur-md border border-black/5 px-4 py-2 rounded-[3px] shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-bold text-brand-gold font-mono tracking-widest">{serial}</span>
              <div className="w-3 h-[1px] bg-brand-gold/30" />
              <span className="text-[8px] font-bold text-brand-charcoal/40 uppercase tracking-[0.2em]">Collection</span>
            </div>
          </div>

          {/* Top Right Hover Floating Arrow */}
          <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/5 flex items-center justify-center text-brand-charcoal hover:bg-brand-gold hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </m.div>

      {/* Pristine Light Typography Details (Below Image) */}
      <div className="mt-6 px-2">
        <h3 className="text-xl font-heading font-light text-brand-charcoal tracking-tight mb-2.5 transition-colors duration-300 group-hover:text-brand-gold">
          {title}
        </h3>
        
        {/* Dynamic Underlined Action Text */}
        <div className="inline-flex items-center gap-2 group/btn">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/60 group-hover:text-brand-gold transition-colors duration-300 relative">
            {linkText}
            {/* Sliding Gold Line */}
            <div className="absolute bottom-[-4px] left-0 w-6 h-[1px] bg-brand-charcoal/20 group-hover:w-full group-hover:bg-brand-gold transition-all duration-500" />
          </span>
          <m.span 
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] text-brand-charcoal/40 group-hover:text-brand-gold transition-colors duration-300"
          >
            â†’
          </m.span>
        </div>
      </div>
    </Link>
  );
}
