"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

interface BranchProps {
  name: string;
  address: string;
  description: string;
  image: string;
  phone?: string;
  hours?: string;
  coordinates?: string;
  slug?: string;
}

export function BranchCard({ name, address, description, image, phone = "+91 000 000 0000", hours = "10:00 AM - 08:00 PM", coordinates, slug }: BranchProps) {
  const mapsQuery = coordinates ? coordinates : `${name} ${address}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const cleanName = name.includes(",") ? name.split(",")[1].trim() : name.replace("Emirates Optician,", "").trim();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="group relative bg-white border border-black/[0.03] hover:border-brand-gold/25 p-4 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 flex flex-col h-full justify-between"
    >
      
      {/* Elegant Visual Image Card Block (Same style as Brand Cards) */}
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-900 rounded-xl mb-5">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover object-center opacity-90 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
        


        {/* Elegant Bottom-Left Location Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase font-heading drop-shadow-md bg-brand-charcoal/45 px-3 py-1 rounded-[2px] backdrop-blur-sm border border-white/10">
            {cleanName}
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className="flex-1 flex flex-col justify-between px-2">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-2 block">
            Kerala Gallery
          </span>
          <h3 className="text-base font-light text-brand-charcoal tracking-tight mb-4 uppercase leading-tight">
            {name}
          </h3>
          <p className="text-[12px] text-brand-charcoal/50 font-light leading-relaxed mb-6">
            {description}
          </p>

          <div className="space-y-3.5 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <p className="text-[12px] text-brand-charcoal/65 font-light leading-relaxed">
                {address}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a 
                href={`tel:${phone.replace(/\s+/g, "")}`} 
                className="text-[12px] text-brand-charcoal/65 font-light hover:text-brand-gold transition-colors duration-300"
              >
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-brand-gold shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70">
                {hours}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-5 border-t border-black/[0.04] flex flex-col sm:flex-row gap-3">
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <span className="w-full border border-brand-charcoal/10 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-brand-charcoal text-[9px] uppercase tracking-[0.2em] py-3.5 rounded-[3px] font-bold transition-all duration-500 flex items-center justify-center gap-1.5 cursor-pointer">
              Get Directions
            </span>
          </a>
          
          <Link href={`/branches/${slug}`} className="flex-1">
            <span className="w-full bg-brand-charcoal text-brand-gold text-[9px] uppercase tracking-[0.2em] py-3.5 rounded-[3px] font-bold hover:bg-brand-gold hover:text-white border border-brand-charcoal hover:border-brand-gold transition-all duration-500 flex items-center justify-center gap-1.5 cursor-pointer shadow-md">
              View Boutique
            </span>
          </Link>
        </div>
      </div>

    </motion.div>
  );
}
