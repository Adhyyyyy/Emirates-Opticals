"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Sofa, ParkingCircle, Eye, UserPlus, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_LUXURY } from "@/lib/motion";

const HIGHLIGHTS = [
  { icon: <Sofa className="w-4 h-4" />, text: "Modern Optical Interiors" },
  { icon: <ParkingCircle className="w-4 h-4" />, text: "Ample Parking" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Luxury Product Displays" },
  { icon: <Eye className="w-4 h-4" />, text: "Advanced Testing Equipment" },
  { icon: <UserPlus className="w-4 h-4" />, text: "Expert Staff Assistance" },
  { icon: <Check className="w-4 h-4" />, text: "Comfortable Consultation Areas" },
];

export function BranchExperience() {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative w-full py-24 md:py-40 bg-[#fdfdfd] overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Immersive Imagery with Parallax */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[700px] overflow-hidden group">
            <motion.div 
              style={{ y: yImage }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Retail Interior"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/5" />
            
            {/* Experience Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-10 right-10 bg-white p-8 md:p-12 shadow-2xl max-w-xs border border-black/5"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-4 block">Destination Quality</span>
              <p className="text-sm font-light text-black/60 italic leading-relaxed">
                "A space where clinical excellence meets high-fashion hospitality."
              </p>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Features */}
          <div className="lg:col-span-5 lg:pl-12">
            <Reveal delay={0.2}>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-6 block">
                The In-Store Story
              </span>
            </Reveal>
            
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-light font-heading text-black leading-[1.1] mb-2">
                Designed For
              </h2>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-light font-heading text-black italic leading-[1.1]">
                Comfort & Care
              </h2>
            </div>

            <Reveal delay={0.4} className="mb-12">
              <p className="text-base text-black/60 font-light leading-relaxed">
                Every Emirates Optician branch is thoughtfully designed to combine luxury eyewear experiences, professional consultation, and welcoming customer care in a refined retail environment.
              </p>
            </Reveal>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {HIGHLIGHTS.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: EASE_LUXURY }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black/70">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
