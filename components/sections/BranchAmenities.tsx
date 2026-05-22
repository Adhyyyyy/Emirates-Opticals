"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Sparkles, ParkingCircle, Award, ShieldCheck, Heart } from "lucide-react";
import { GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { EASE_LUXURY } from "@/lib/motion";

const AMENITIES = [
  { icon: <Eye className="w-5 h-5" />, title: "Free Eye Testing" },
  { icon: <Sparkles className="w-5 h-5" />, title: "Expert Styling" },
  { icon: <ParkingCircle className="w-5 h-5" />, title: "Ample Parking" },
  { icon: <Award className="w-5 h-5" />, title: "Authentic Brands" },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Premium Lenses" },
  { icon: <Heart className="w-5 h-5" />, title: "Friendly Support" },
];

export function BranchAmenities() {
  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 overflow-hidden border-y border-white/[0.03]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        
        {/* Subtle Luxury Ribbon Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold/60 mb-3 block">
            Signature Ateliers
          </span>
          <h3 className="text-xl md:text-2xl font-light font-heading text-white tracking-widest uppercase">
            The Boutique Amenities Suite
          </h3>
        </div>

        {/* Corrected 6-Column Grid Layout */}
        <GridStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-16 w-full">
          {AMENITIES.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center group cursor-default">
                <motion.div 
                  whileHover={{ scale: 1.1, y: -6 }}
                  className="w-14 h-14 flex items-center justify-center bg-brand-gold/5 border border-brand-gold/20 text-brand-gold/80 rounded-full mb-6 group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold transition-all duration-500 shadow-[0_0_15px_rgba(199,168,76,0.02)] group-hover:shadow-[0_0_30px_rgba(199,168,76,0.25)]"
                >
                  {item.icon}
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 group-hover:text-brand-gold transition-colors duration-500">
                  {item.title}
                </span>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
