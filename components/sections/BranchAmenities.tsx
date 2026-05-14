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
    <section className="bg-black py-20 overflow-hidden border-y border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        
        {/* Signature Suite Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          <GridStagger>
            {AMENITIES.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="flex flex-col items-center text-center group cursor-default">
                  <motion.div 
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-white/40 mb-6 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors duration-500">
                    {item.title}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </GridStagger>
        </div>

      </div>
    </section>
  );
}
