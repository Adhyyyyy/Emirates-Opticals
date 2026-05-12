"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { EASE_LUXURY } from "@/lib/motion";

export function BookingCTA() {
  return (
    <section className="relative w-full py-24 md:py-40 bg-black overflow-hidden">
      {/* Background Atmosphere: The 'Optical Lens' Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">
              The Visionist Service
            </span>
          </Reveal>

          <div className="mb-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-heading text-white leading-[1.1] mb-2">
              Book Your
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-heading text-white italic leading-[1.1]">
              Free Eye Test Today
            </h2>
          </div>

          <Reveal delay={0.4} className="mb-16">
            <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-xl mx-auto">
              Visit your nearest Emirates Optician branch for professional eye testing, expert consultation, and personalized eyewear recommendations.
            </p>
          </Reveal>

          {/* Action Engagement Duo */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE_LUXURY }}
            >
              <LuxuryButton variant="primary" className="px-12 py-5 bg-white text-black hover:bg-white/90" icon={<Calendar className="w-4 h-4" />}>
                Book Appointment
              </LuxuryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE_LUXURY }}
            >
              <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors group">
                <MapPin className="w-4 h-4" />
                Find Nearest Branch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Signature */}
      <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-white/[0.05] -mr-32 -mt-32 rounded-tr-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b border-l border-white/[0.05] -ml-32 -mb-32 rounded-bl-[100px]" />
    </section>
  );
}
