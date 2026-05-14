"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

const POSITIONS = [
  {
    title: "Optometrist",
    desc: "Conduct professional eye examinations, prescribe corrective lenses, and provide expert eye care consultation to customers.",
    requirements: [
      "Diploma/B.Sc in Optometry",
      "Experience preferred",
      "Excellent communication skills",
      "Customer-focused mindset"
    ]
  },
  {
    title: "Optical Fitter",
    desc: "Adjust and fit eyeglasses, ensure lens alignment, and provide quality frame fitting support for customer comfort.",
    requirements: [
      "Optical fitting experience",
      "Lens & frame knowledge",
      "Attention to detail",
      "Customer service skills"
    ]
  },
  {
    title: "Sales Staff",
    desc: "Assist customers with frame selection, styling guidance, and luxury retail customer experience.",
    requirements: [
      "Optical retail experience preferred",
      "Strong interpersonal skills",
      "Fashion & styling interest",
      "Customer engagement skills"
    ]
  }
];

export function CareersOpenPositions() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading">
              Current Opportunities
            </h2>
          </Reveal>
        </div>

        <GridStagger className="space-y-4">
          {POSITIONS.map((pos, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <StaggerItem key={idx}>
                <div 
                  className={`border border-black/5 overflow-hidden transition-all duration-700 ${isExpanded ? 'bg-brand-pearl border-brand-gold/20' : 'bg-white'}`}
                >
                  <button 
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="w-full px-8 md:px-12 py-8 flex items-center justify-between group"
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2">0{idx + 1}</span>
                      <h3 className="text-xl md:text-2xl font-normal text-brand-charcoal uppercase font-heading group-hover:tracking-wider transition-all duration-700">
                        {pos.title}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-full border border-black/5 transition-all duration-500 ${isExpanded ? 'bg-brand-gold text-white rotate-180' : 'group-hover:bg-brand-charcoal group-hover:text-white'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                      >
                        <div className="px-8 md:px-12 pb-12 pt-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-4">Description</h4>
                              <p className="text-brand-charcoal/70 font-light leading-relaxed mb-8">
                                {pos.desc}
                              </p>
                              <LuxuryButton asChild className="bg-brand-charcoal text-white hover:bg-brand-gold">
                                <a href="https://forms.google.com/your-form-id" target="_blank" rel="noopener noreferrer">
                                  Apply For This Position
                                </a>
                              </LuxuryButton>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-4">Requirements</h4>
                              <ul className="space-y-3">
                                {pos.requirements.map((req, rIdx) => (
                                  <li key={rIdx} className="flex items-center gap-4 text-sm font-light text-brand-charcoal/80">
                                    <div className="w-1 h-1 rounded-full bg-brand-gold" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
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
    </section>
  );
}
