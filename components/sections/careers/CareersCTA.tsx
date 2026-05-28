"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

export function CareersCTA() {
  return (
    <section className="bg-black py-20 md:py-24 border-t border-white/5" id="careers-cta">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-4 max-w-[600px]">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-3.5 py-1.5 rounded-full w-fit mx-auto md:mx-0">
              Join Our Vision
            </span>
            <h2 className="font-heading font-extralight text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase leading-tight">
              Begin Your Professional Journey
            </h2>
            <p className="text-[13px] text-white/50 font-light leading-relaxed max-w-xl">
              We securely collect all candidate portfolios, optical backgrounds, and CVs through our official digital portal. Submit your application today!
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a
                href="https://forms.gle/emirates-optician-careers"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-500 rounded-[3px] bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white shadow-lg"
              >
                Apply via Google Form
                <Sparkles className="w-3.5 h-3.5" />
              </a>
              <a
                href="#careers-hero"
                className="group relative w-full sm:w-auto px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-500 rounded-[3px] bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
              >
                View Openings
              </a>
            </div>
            
            <span className="text-[10px] text-white/35 font-light">
              Secure redirect to official candidate gateway
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
