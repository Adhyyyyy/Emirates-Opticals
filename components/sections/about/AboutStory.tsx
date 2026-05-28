"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HIGHLIGHTS = [
  "Authentic Global Brands",
  "Professional Eye Care",
  "Expert Styling Consultation",
  "Trusted Customer Relationships",
  "Premium Optical Experience"
];

export function AboutStory() {
  return (
    <section className="w-full bg-[#FAF9F6] pt-40 pb-20 md:pt-24 md:pb-24 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Mobile-Only Page Title */}
        <div className="md:hidden text-center mb-12">
          <h1 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            About Us
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Standardized Double-Border Image Frame */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative bg-white border border-black/[0.03] p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-700 flex flex-col group"
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src="/about/How_it_s_done_choose_your_chassis_b4cefd88-4f03-49ef-a929-3fcf94cacf97.webp"
                alt="The Emirates Optician Boutique Experience"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlaid luxury tag */}
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-bold text-white tracking-[0.2em] uppercase font-heading drop-shadow-md bg-brand-charcoal/45 px-3 py-1 rounded-[2px] backdrop-blur-sm border border-white/10">
                  EST. 2002
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative Content */}
          <div className="flex flex-col justify-center lg:pl-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase mb-6 leading-tight"
            >
              Luxury Meets <br />
              <em className="italic font-light font-serif text-brand-gold">Optical Precision</em>
            </motion.h2>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-12 h-[1px] bg-brand-gold/50 mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-brand-charcoal/65 font-light leading-relaxed text-[13px] max-w-xl mb-10"
            >
              <p>
                Every Emirates Optician experience is built around expert clinical eye care, authentic luxury eyewear curation, and personalized aesthetic styling. We recognized a vital need for authentic branded optical masterpieces and professional vision testing in Kerala.
              </p>
              <p>
                From iconic international designer frames to state-of-the-art lens personalization, every single detail in our network is meticulously curated for absolute visual clarity and comfort. We have built our heritage by standing firmly against cheap imitations, delivering genuine value through official global partnerships.
              </p>
              <p>
                Today, Emirates Optician provides an unparalleled optical standard — featuring elegant boutique spaces, expert optometric guidance, and dynamic eyewear collections tailored to high-end modern lifestyles.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-6 border-t border-black/[0.04]">
              {HIGHLIGHTS.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-brand-gold text-xs shrink-0">◈</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/70">
                    {item}
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
