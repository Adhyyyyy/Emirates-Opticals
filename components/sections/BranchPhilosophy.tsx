"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ParkingCircle, Eye, UserCheck, Award, HeartHandshake } from "lucide-react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { EASE_LUXURY } from "@/lib/motion";

const FEATURES = [
  { icon: <MapPin className="w-5 h-5" />, title: "10+ Kerala Branches", description: "Conveniently located in every major city across the state." },
  { icon: <ParkingCircle className="w-5 h-5" />, title: "Ample Parking", description: "Stress-free visits with dedicated parking at all destinations." },
  { icon: <Eye className="w-5 h-5" />, title: "Professional Eye Testing", description: "Clinical accuracy with state-of-the-art optical equipment." },
  { icon: <UserCheck className="w-5 h-5" />, title: "Expert Styling", description: "Personalized consultation to find your perfect frame match." },
  { icon: <Award className="w-5 h-5" />, title: "Authentic Brands", description: "Only genuine luxury eyewear from the world's finest houses." },
  { icon: <HeartHandshake className="w-5 h-5" />, title: "Friendly Support", description: "Exceptional care that extends long after your purchase." },
];

export function BranchPhilosophy() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">
          
          {/* Left Column: The Statement */}
          <div className="sticky top-32">
            <Reveal delay={0.2}>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-6 block">
                The Visionist Philosophy
              </span>
            </Reveal>
            <div className="mb-10">
              <h2 className="text-4xl md:text-6xl xl:text-7xl font-light font-heading text-black leading-[1.1] mb-4">
                Premium Eyecare.
              </h2>
              <h2 className="text-4xl md:text-6xl xl:text-7xl font-light font-heading text-black italic leading-[1.1]">
                Closer Than Ever.
              </h2>
            </div>
            <Reveal delay={0.4} className="max-w-xl">
              <p className="text-base md:text-lg text-black/60 font-light leading-relaxed">
                With multiple branches across Kerala, Emirates Optician combines authentic luxury eyewear, expert eye care, and personalized styling consultation — making premium optical experiences easily accessible to every customer.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Feature Mosaic - Corrected for Horizontal Flow */}
          <GridStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {FEATURES.map((feature, idx) => (
              <StaggerItem key={idx}>
                <div className="group flex flex-col items-start p-8 md:p-10 bg-[#fdfdfd] border border-black/[0.03] hover:border-black/10 transition-all duration-700 h-full">
                  <div className="w-12 h-12 flex items-center justify-center bg-black text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-black/50 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </GridStagger>

        </div>
      </div>
    </section>
  );
}
