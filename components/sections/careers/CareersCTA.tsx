"use client";

import React from "react";
import { m } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export function CareersCTA() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden text-neutral-900 border-t border-neutral-100">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        <div className="max-w-4xl mx-auto bg-[#FAF8F5] border border-neutral-200 p-12 md:p-20 rounded-[3px] text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
          
          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center max-w-2xl"
          >
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-4 block">
              Apply Now
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-neutral-900 uppercase tracking-tight leading-tight mb-6">
              Begin Your Journey
            </h2>
            <p className="text-sm text-neutral-500 font-light mb-10 leading-relaxed">
              We collect all candidate details, backgrounds, and CVs securely through our official Google Forms portal. Click below to open the application portal and submit your details.
            </p>

            <a 
              href="https://forms.gle/emirates-optician-careers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] font-medium hover:bg-neutral-700 transition-all duration-200 inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply via Google Form</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            
            <p className="text-[10px] text-neutral-400 font-light mt-6 leading-relaxed">
              You will be redirected to Google Forms. Please ensure you have your resume/CV ready in PDF or Word format before applying.
            </p>
          </m.div>
        </div>

      </div>
    </section>
  );
}
