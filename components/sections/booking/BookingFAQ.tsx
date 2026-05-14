"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Plus, Minus, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is the eye test completely free?",
    a: "Yes, Emirates Optician provides professional eye testing completely free of charge at all our branches as part of our commitment to accessible eye care."
  },
  {
    q: "How long does the appointment take?",
    a: "A typical comprehensive eye examination and consultation takes approximately 20 to 30 minutes, allowing us to ensure accurate results and personalized guidance."
  },
  {
    q: "Should I bring my previous prescription?",
    a: "Yes, bringing your previous prescription and your current eyewear helps our optometrists understand your visual history and provide better recommendations."
  },
  {
    q: "Can I book for family members?",
    a: "Certainly. You can book multiple appointments for family members. Please mention their details in the 'Additional Notes' section or book separately for each person."
  },
  {
    q: "Are contact lens consultations available?",
    a: "Yes, we provide specialized contact lens consultations and fitting sessions. Our experts will help you find the most comfortable and suitable lenses for your needs."
  },
  {
    q: "Do all branches provide eye testing?",
    a: "Yes, every Emirates Optician branch across Kerala is equipped with advanced diagnostic technology and professional optometrists for comprehensive eye testing."
  }
];

export function BookingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="max-w-3xl mx-auto mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Frequently Asked<br /><em className="italic">Questions</em>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto">
          <GridStagger className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <StaggerItem key={idx}>
                  <div className={`border border-black/5 transition-all duration-700 ${isOpen ? 'bg-brand-pearl border-brand-gold/20' : 'bg-white'}`}>
                    <button 
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full px-8 md:px-12 py-8 flex items-center justify-between group text-left"
                    >
                      <h3 className="text-lg md:text-xl font-normal text-brand-charcoal uppercase tracking-tighter group-hover:tracking-normal transition-all duration-700">
                        {faq.q}
                      </h3>
                      <div className={`p-2 rounded-full border border-black/5 transition-all duration-500 ${isOpen ? 'bg-brand-gold text-white rotate-180' : 'group-hover:bg-brand-charcoal group-hover:text-white'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        >
                          <div className="px-8 md:px-12 pb-10 pt-2">
                            <p className="text-brand-charcoal/60 font-light leading-relaxed max-w-3xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </GridStagger>
        </div>

      </div>
    </section>
  );
}
