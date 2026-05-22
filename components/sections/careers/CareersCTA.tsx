"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export function CareersCTA() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden text-black border-t border-black/5">
      <div className="container-tight">
        
        <div className="max-w-4xl mx-auto bg-brand-pearl/25 border border-black/5 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center max-w-2xl"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
              Apply Now
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-charcoal uppercase tracking-tighter font-heading leading-tight mb-6">
              Begin Your Journey
            </h2>
            <p className="text-sm text-brand-charcoal/50 font-light mb-10 leading-relaxed">
              We collect all candidate details, backgrounds, and CVs securely through our official Google Forms portal. Click below to open the application portal and submit your details.
            </p>

            <LuxuryButton asChild className="bg-brand-charcoal text-white hover:bg-brand-gold py-4 px-10 rounded-full shadow-2xl">
              <a 
                href="https://forms.gle/emirates-optician-careers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Apply via Google Form</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </LuxuryButton>
            
            <p className="text-[9px] text-brand-charcoal/30 font-light mt-6 leading-relaxed">
              You will be redirected to Google Forms. Please ensure you have your resume/CV ready in PDF or Word format before applying.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
