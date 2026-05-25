"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

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

  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group bg-white flex flex-col h-full border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-sm hover:border-neutral-300 transition-all duration-300"
    >
      {/* Cinematic Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <m.div 
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </m.div>
        {/* Branch Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 border border-neutral-200/50 rounded-full">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-800">Active Destination</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-lg font-light text-neutral-900 tracking-tight mb-4 uppercase">
          {name}
        </h3>
        
        <div className="space-y-4 mb-8 flex-1">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              {address}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-sm text-neutral-500 font-light hover:text-amber-500 transition-colors">
              {phone}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
              {hours}
            </p>
          </div>
        </div>

        {/* Action Engagement */}
        <div className="mt-auto pt-6 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <span className="w-full border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 text-xs uppercase tracking-[0.15em] py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer">
              Get Directions
            </span>
          </a>
          
          <Link href={`/branches/${slug}`} className="flex-1">
            <span className="w-full bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] py-3 rounded-full font-medium hover:bg-neutral-700 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer">
              View Branch
            </span>
          </Link>
        </div>
      </div>
    </m.div>
  );
}
