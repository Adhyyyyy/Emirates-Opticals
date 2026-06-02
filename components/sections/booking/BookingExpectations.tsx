"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Warm Welcome",
    desc: "Our team will guide you through a comfortable and highly professional consultation experience."
  },
  {
    title: "Advanced Diagnostics",
    desc: "State-of-the-art diagnostic equipment ensures highly precise clinical vision assessment."
  },
  {
    title: "Personalized Care",
    desc: "Receive bespoke lens recommendations tailored exactly around your visual lifestyle."
  },
  {
    title: "Bespoke Eyewear",
    desc: "Discover curated global designer frames and receive customized retail boutique styling."
  }
];

export function BookingExpectations() {
  return (
    <section className="w-full bg-[#FAF9F6] pt-40 pb-20 md:pt-24 md:pb-24 overflow-hidden text-brand-charcoal">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Mobile-Only Page Title (no badges or underlines) */}
        <div className="md:hidden text-center mb-12">
          <h2 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            Book Eye Test
          </h2>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase leading-tight"
          >
            What To Expect During Your Visit
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-16 h-[1px] bg-brand-gold/50 mt-6"
          />
        </div>

        {/* Premium Numbered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group relative bg-white border border-black/[0.03] hover:border-brand-gold/25 p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 flex flex-col items-center text-center gap-6"
            >
              {/* Luxury Bracket Number Frame */}
              <div className="w-12 h-12 rounded-[3px] border border-black/[0.03] bg-[#FAF9F6] flex items-center justify-center text-brand-gold font-heading text-lg group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shrink-0">
                0{idx + 1}
              </div>
              
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-[12px] text-brand-charcoal/50 leading-relaxed font-light group-hover:text-brand-charcoal/70 transition-colors duration-500">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
