"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { EASE_LUXURY } from "@/lib/motion";

export function BranchesHero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[650px] bg-white overflow-hidden">
      
      {/* Cinematic Layer 1: The Destination Visual */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')",
            filter: "brightness(0.85) contrast(1.05)"
          }}
        />
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Layer 2: Narrative Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-[1000px] mx-auto">
          
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/90 mb-8 block">
              PREMIUM OPTICAL DESTINATIONS ACROSS KERALA
            </span>
          </Reveal>

          <div className="mb-10">
            <TextReveal 
              text="Experience Emirates Optician"
              className="text-4xl md:text-7xl lg:text-8xl font-light font-heading text-white tracking-tight leading-[1.1]"
              delay={0.4}
            />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: EASE_LUXURY }}
              className="text-3xl md:text-6xl lg:text-7xl font-light font-heading text-white italic tracking-tight block mt-2"
            >
              Near You
            </motion.span>
          </div>

          <Reveal delay={1} className="max-w-2xl mx-auto mb-16">
            <p className="text-sm md:text-lg text-white/80 font-light leading-relaxed tracking-wide">
              Visit our premium optical destinations across Kerala for authentic luxury eyewear, professional eye testing, and expert styling consultation — all delivered with exceptional customer care.
            </p>
          </Reveal>

          {/* Trio of Engagement */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <LuxuryButton variant="primary" className="px-12 py-5" icon={<MapPin className="w-4 h-4" />}>
                Find Your Branch
              </LuxuryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <LuxuryButton variant="secondary" className="px-12 py-5" icon={<Calendar className="w-4 h-4" />}>
                Book Eye Test
              </LuxuryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white hover:text-black transition-colors group">
                Explore Collections
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-white/20 origin-left scale-x-100" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/40">Discover Locations</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-black/40 to-transparent" />
      </motion.div>

    </section>
  );
}
