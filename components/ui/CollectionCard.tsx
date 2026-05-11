"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CollectionCardProps {
  title: string;
  linkText: string;
  href: string;
  image: string;
}

export function CollectionCard({ title, linkText, href, image }: CollectionCardProps) {
  return (
    <Link href={href} className="group block w-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-pearl mb-6">
        {/* Explore Badge */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-brand-charcoal shadow-sm transition-transform duration-500 group-hover:scale-105">
            Explore +
          </div>
        </div>

        {/* Background Image with Zoom */}
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
      </div>

      {/* Editorial Labels */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <p className="text-[13px] md:text-[15px] font-medium text-brand-charcoal/90 tracking-tight">
          {title}
        </p>
        <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em] text-brand-charcoal border-b border-brand-charcoal/20 pb-0.5 group-hover:border-brand-charcoal transition-colors duration-300">
          {linkText}
        </span>
      </div>
    </Link>
  );
}
