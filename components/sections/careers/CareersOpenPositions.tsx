"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Calendar, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Position {
  id: string;
  title: string;
  desc: string;
  requirements: string[];
  branchId: string;
  googleFormUrl?: string;
  expiryDate?: string;
  isActive: boolean;
}

interface CareersOpenPositionsProps {
  positions: Position[];
  branches: any[];
}

export function CareersOpenPositions({ positions = [], branches = [] }: CareersOpenPositionsProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  // Filter out inactive and expired openings
  const activeOpenings = positions.filter(pos => {
    if (!pos.isActive) return false;
    if (pos.expiryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expDate = new Date(pos.expiryDate);
      expDate.setHours(0, 0, 0, 0);
      if (expDate < today) return false; // expired
    }
    return true;
  });

  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden text-neutral-900">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Explore Careers
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 uppercase"
          >
            Current Opportunities
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Join a team dedicated to luxury eyewear, state-of-the-art clinical optometry, and exceptional retail experiences across Kerala.
          </m.p>
        </div>

        {activeOpenings.length > 0 ? (
          <div className="space-y-4">
            {activeOpenings.map((pos, idx) => {
              const isExpanded = expandedIdx === idx;
              const branchName = pos.branchId === "Global" ? "Global (All Branches)" : branches.find(b => b.id === pos.branchId)?.name || pos.branchId;
              const applyUrl = pos.googleFormUrl || "https://forms.gle/emirates-optician-careers";

              return (
                <div 
                  key={pos.id}
                  className={cn(
                    "border border-neutral-200 overflow-hidden transition-all duration-300 rounded-2xl",
                    isExpanded ? "bg-[#FAF8F5] border-amber-400/50" : "bg-white hover:border-neutral-300"
                  )}
                >
                  <button 
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between group text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-amber-600 font-bold mb-2">OPPORTUNITY 0{idx + 1}</span>
                      <h3 className="text-base font-semibold uppercase tracking-[0.1em] text-neutral-900">
                        {pos.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          {branchName}
                        </span>
                        {pos.expiryDate && (
                          <span className="flex items-center gap-1.5 text-[10px] font-light text-neutral-400 uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            Apply Before: {new Date(pos.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={cn(
                      "p-2 rounded-full border border-neutral-200 transition-all duration-300",
                      isExpanded ? "bg-amber-400 text-neutral-900 border-amber-400 rotate-180" : "group-hover:bg-neutral-900 group-hover:text-white"
                    )}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-4 border-t border-neutral-200/50">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Description</h4>
                              <p className="text-neutral-500 font-light leading-relaxed mb-8 text-sm whitespace-pre-line">
                                {pos.desc}
                              </p>
                              
                              <a 
                                href={applyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full font-medium hover:bg-neutral-700 transition-all duration-200 inline-flex items-center gap-2"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                Apply For This Position
                              </a>
                            </div>
                            
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Requirements</h4>
                              <ul className="space-y-3">
                                {pos.requirements.map((req, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-3 text-sm font-light text-neutral-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#FAF8F5] border border-dashed border-neutral-300 rounded-2xl">
            <div className="flex flex-col items-center gap-4 text-neutral-400 max-w-sm mx-auto">
              <Globe className="w-10 h-10 stroke-[1.5] animate-pulse" />
              <p className="text-xs uppercase tracking-widest font-semibold">No active job listings found</p>
              <p className="text-sm font-light text-neutral-500">All roles have been successfully closed. Check back soon for future openings!</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
