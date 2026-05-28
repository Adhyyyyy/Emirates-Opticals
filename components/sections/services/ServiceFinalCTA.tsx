"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export function ServiceFinalCTA() {
  return (
    <section className="w-full bg-[#0D0D0D] py-20 md:py-24 border-t border-brand-gold/15 relative overflow-hidden">
      {/* Cinematic subtle backdrop glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Text Block */}
        <div className="flex flex-col max-w-[600px] text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold/80 mb-3 block"
          >
            Your Vision Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extralight text-white leading-[1.1] tracking-tighter uppercase mb-4"
          >
            Ready to Experience <br />
            <em className="font-serif italic text-brand-gold" style={{ fontStyle: "italic" }}>Premium Eye Care?</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[13px] text-white/50 font-light max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
            Book your complimentary comprehensive vision consultation today or locate an optical gallery near you.
          </motion.p>
        </div>

        {/* Buttons Block */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto"
        >
          <Link
            href="/book-eye-test"
            className="bg-brand-gold hover:bg-brand-gold/90 text-white text-[9px] font-bold uppercase tracking-[0.22em] py-4 px-8 rounded-[3px] transition-all duration-500 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg shadow-brand-gold/10"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Free Eye Test</span>
          </Link>
          <Link
            href="/branches"
            className="border border-white/10 hover:border-brand-gold/40 text-white hover:text-brand-gold text-[9px] font-bold uppercase tracking-[0.22em] py-4 px-8 rounded-[3px] hover:bg-white/[0.02] transition-all duration-500 flex items-center justify-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Find a Gallery</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
