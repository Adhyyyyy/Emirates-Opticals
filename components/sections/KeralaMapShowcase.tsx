"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_LUXURY } from "@/lib/motion";

const BRANCH_LOCATIONS = [
  { id: "kochi", name: "Kochi Flagship", city: "Kochi", coords: { top: "45%", left: "40%" }, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400" },
  { id: "calicut", name: "Calicut Boutique", city: "Calicut", coords: { top: "25%", left: "30%" }, image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=400" },
  { id: "trivandrum", name: "Trivandrum Atelier", city: "Trivandrum", coords: { top: "85%", left: "60%" }, image: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=400" },
  { id: "thrissur", name: "Thrissur Hub", city: "Thrissur", coords: { top: "35%", left: "35%" }, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400" },
  { id: "kottayam", name: "Kottayam Studio", city: "Kottayam", coords: { top: "55%", left: "45%" }, image: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=400" },
];

export function KeralaMapShowcase() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: The Narrative */}
          <div className="z-10">
            <Reveal delay={0.2}>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block">
                Physical Dominance
              </span>
            </Reveal>
            <div className="mb-8">
              <h2 className="text-4xl md:text-6xl font-light font-heading text-white leading-[1.1] mb-2">
                Serving Customers
              </h2>
              <h2 className="text-4xl md:text-6xl font-light font-heading text-white italic leading-[1.1]">
                Across Kerala
              </h2>
            </div>
            <Reveal delay={0.4} className="max-w-md">
              <p className="text-base text-white/40 font-light leading-relaxed mb-12">
                Strategically located branches designed to deliver premium optical experiences with convenience, accessibility, and trusted expert care.
              </p>
            </Reveal>

            {/* Network Stats */}
            <div className="flex gap-12 border-t border-white/5 pt-12">
              <div>
                <span className="block text-3xl font-light text-white mb-1">10+</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Destinations</span>
              </div>
              <div>
                <span className="block text-3xl font-light text-white mb-1">15+</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Years of Trust</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Map */}
          <div className="relative aspect-[3/4] md:aspect-square bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center group">
            
            {/* Abstract Kerala Map Concept */}
            <div className="relative w-full h-full p-20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-1000">
              <svg 
                viewBox="0 0 200 400" 
                className="h-full w-auto text-white/5 fill-current"
                style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.05))" }}
              >
                {/* Stylized Kerala Path (Simplified) */}
                <path d="M50,20 C80,50 110,120 120,200 C130,280 100,350 70,380 L50,380 C30,350 20,280 30,200 C40,120 40,50 50,20 Z" />
              </svg>

              {/* Glowing Branch Constellation */}
              {BRANCH_LOCATIONS.map((branch) => (
                <div 
                  key={branch.id}
                  className="absolute"
                  style={{ top: branch.coords.top, left: branch.coords.left }}
                >
                  <button
                    onMouseEnter={() => setActiveBranch(branch.id)}
                    onMouseLeave={() => setActiveBranch(null)}
                    className="relative group/pin"
                  >
                    {/* The Glow Pulse */}
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 -m-3 bg-white/20 rounded-full"
                    />
                    <div className="w-2.5 h-2.5 bg-white rounded-full relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover/pin:scale-150 transition-transform duration-300" />
                  </button>

                  {/* Hover Preview Card */}
                  <AnimatePresence>
                    {activeBranch === branch.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -20, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: EASE_LUXURY }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 w-48 bg-white p-2 rounded-lg shadow-2xl z-50 pointer-events-none"
                      >
                        <div className="relative aspect-video rounded-md overflow-hidden mb-3">
                          <img src={branch.image} alt={branch.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="px-1 py-1">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-black mb-1">{branch.name}</h4>
                          <div className="flex items-center justify-between text-[8px] text-black/40 uppercase tracking-[0.2em] font-bold">
                            <span>{branch.city}</span>
                            <ArrowUpRight className="w-2 h-2" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}
