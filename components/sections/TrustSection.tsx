"use client";

import { motion } from "framer-motion";
import { Eye, ShieldCheck, Microscope } from "lucide-react";

const PILLARS = [
  {
    title: "Eyewear For All",
    description: "Handcrafted pieces that feel tailor-made for your unique features and individual style.",
    icon: Eye
  },
  {
    title: "Advanced RX Tech",
    description: "High-performance lenses, finished and fitted at our state-of-the-art in-house lab.",
    icon: Microscope
  },
  {
    title: "Our Eyes on Every Detail",
    description: "Expert fit and styling support from our Visionists—part stylist, part optical whiz.",
    icon: ShieldCheck
  }
];

export function TrustSection() {
  return (
    <section className="bg-black text-white section-padding overflow-hidden relative">
      <div className="container-tight relative z-10 flex flex-col items-center">
        
        {/* Cinematic Brand Statement - Strictly Matched Scale */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl font-extralight tracking-[0.45em] text-white uppercase font-heading leading-relaxed"
          >
            Change the way you see the world.
          </motion.h2>
        </div>

        {/* Feature Highlight Columns - Lean and Spread */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 w-full mb-16 md:mb-24">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white mb-3 relative pb-1 border-b-[0.5px] border-white/60">
                {pillar.title}
              </h3>
              <p className="text-[8px] md:text-[9.5px] tracking-[0.05em] leading-relaxed text-white/60 max-w-[240px] uppercase font-medium">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Geometric Icon - Visionist Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-12 h-12 flex items-center justify-center opacity-80"
        >
          <div className="absolute w-8 h-8 border border-white rounded-full translate-x-1" />
          <div className="absolute w-8 h-8 border border-white rounded-full -translate-x-1" />
          <div className="absolute w-8 h-8 border border-white rounded-full translate-y-1" />
          <div className="absolute w-8 h-8 border border-white rounded-full -translate-y-1" />
        </motion.div>

      </div>
    </section>
  );
}
