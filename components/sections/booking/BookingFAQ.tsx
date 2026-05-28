"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is the eye test completely free?",
    a: "Yes, Emirates Optician provides highly professional comprehensive eye testing completely free of charge at all our locations as part of our core heritage commitment to accessible optometry care."
  },
  {
    q: "How long does the appointment take?",
    a: "A typical comprehensive eye examination and visual styling consultation takes approximately 20 to 30 minutes, allowing our optometrists to ensure accurate parameters and personalized guidance."
  },
  {
    q: "Should I bring my previous prescription?",
    a: "Yes, presenting your previous clinical prescription and your active everyday glasses helps our clinical team map your visual development history and provide better recommendations."
  },
  {
    q: "Can I book for family members?",
    a: "Absolutely. You can request vision test appointments for family members. Kindly submit separate reservations for each individual or list them inside the 'Additional Notes' block."
  },
  {
    q: "Are contact lens consultations available?",
    a: "Yes, we offer custom contact lens diagnostic fittings and comfort trials. Our optical experts will guide you to determine the ideal brand and parameters for your eyes."
  },
  {
    q: "Do all branches provide eye testing?",
    a: "Yes, every pristine Emirates Optician boutique showroom across Kerala is fully outfitted with advanced diagnostic darkroom clinics and certified clinical optometrists."
  }
];

export function BookingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#FAF9F6] pb-24 md:pb-32 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase leading-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-16 h-[1px] bg-brand-gold/50 mt-6"
          />
        </div>

        {/* Premium Accordion Panel List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border overflow-hidden transition-all duration-700 rounded-2xl bg-white shadow-sm ${
                  isOpen ? 'border-brand-gold/30 shadow-md' : 'border-black/[0.03] hover:border-black/10 hover:shadow-md'
                }`}
              >
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between group text-left"
                >
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-brand-charcoal">
                    {faq.q}
                  </h3>
                  
                  <div className={`p-2 rounded-full border border-black/5 transition-all duration-500 shrink-0 ${
                    isOpen ? 'bg-brand-gold text-white border-brand-gold rotate-180' : 'group-hover:bg-brand-charcoal group-hover:text-white'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div className="px-6 md:px-10 pb-8 pt-2 border-t border-black/[0.02]">
                        <p className="text-[12px] md:text-[13px] text-brand-charcoal/50 font-light leading-relaxed max-w-3xl">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
