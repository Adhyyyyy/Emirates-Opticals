"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight, Calendar } from "lucide-react";
import { LuxuryButton } from "./LuxuryButton";
import { EASE_LUXURY } from "@/lib/motion";

interface BranchProps {
  name: string;
  address: string;
  description: string;
  image: string;
  phone?: string;
  hours?: string;
}

export function BranchCard({ name, address, description, image, phone = "+91 000 000 0000", hours = "10:00 AM - 08:00 PM" }: BranchProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_LUXURY }}
      className="group bg-white flex flex-col h-full border border-black/5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] transition-all duration-700"
    >
      {/* Cinematic Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: EASE_LUXURY }}
          className="relative w-full h-full"
        >
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        {/* Branch Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-black/5">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">Active Destination</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-10 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-light font-heading text-black mb-4">
          {name}
        </h3>
        
        <div className="space-y-4 mb-8 flex-1">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-black/40 shrink-0 mt-1" />
            <p className="text-sm text-black/60 font-light leading-relaxed">
              {address}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-black/40" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-black/40">
              {hours}
            </p>
          </div>
        </div>

        <p className="text-[13px] text-black/50 font-light leading-relaxed mb-8 italic border-l-2 border-black/5 pl-4">
          "{description}"
        </p>

        {/* Action Engagement */}
        <div className="mt-auto space-y-4">
          <LuxuryButton variant="primary" className="w-full justify-center py-4" icon={<Calendar className="w-4 h-4" />}>
            Book Eye Test
          </LuxuryButton>
          
          <button className="w-full flex items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors group/link">
            View on Google Maps
            <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-2" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
