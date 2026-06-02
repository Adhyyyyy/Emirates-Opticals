"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      
      // Parse YYYY-MM-DD in local browser time to avoid off-by-one UTC timezone mismatch bugs
      const [year, month, day] = pos.expiryDate.split("-").map(Number);
      const expDate = new Date(year, month - 1, day);
      expDate.setHours(0, 0, 0, 0);
      
      if (expDate < today) return false; // expired
    }
    return true;
  });

  return (
    <section className="w-full bg-[#FAF9F6] pt-40 pb-20 md:pt-24 md:pb-24 overflow-hidden text-brand-charcoal">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Mobile-Only Page Title */}
        <div className="md:hidden text-center mb-12">
          <h2 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            Careers
          </h2>
        </div>


        {activeOpenings.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {activeOpenings.map((pos, idx) => {
              const isExpanded = expandedIdx === idx;
              const branchName = pos.branchId === "Global" ? "Global (All Branches)" : branches.find(b => b.id === pos.branchId)?.name || pos.branchId;
              const applyUrl = pos.googleFormUrl || "https://forms.gle/emirates-optician-careers";

              return (
                <div 
                  key={pos.id}
                  className={cn(
                    "border border-black/[0.03] overflow-hidden transition-all duration-[0.5s] rounded-2xl bg-white shadow-sm",
                    isExpanded ? "border-brand-gold/30 shadow-md" : "hover:border-black/10 hover:shadow-md"
                  )}
                >
                  <button 
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between group text-left"
                  >
                    <div className="flex flex-col items-start pr-4">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-bold mb-2">OPPORTUNITY 0{idx + 1}</span>
                      <h3 className="text-base font-light uppercase tracking-[0.1em] text-brand-charcoal">
                        {pos.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-2.5">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-brand-charcoal/55 uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                          {branchName}
                        </span>
                        {pos.expiryDate && (
                          <span className="flex items-center gap-1.5 text-[10px] font-light text-brand-charcoal/40 uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                            Apply Before: {new Date(pos.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={cn(
                      "p-2 rounded-full border border-black/5 transition-all duration-[0.5s] shrink-0",
                      isExpanded ? "bg-brand-gold text-white border-brand-gold rotate-180" : "group-hover:bg-brand-charcoal group-hover:text-white"
                    )}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-4 border-t border-black/[0.03]">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
                            <div>
                              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-4">Description</h4>
                              <p className="text-brand-charcoal/60 font-light leading-relaxed mb-8 text-[13px] whitespace-pre-line">
                                {pos.desc}
                              </p>
                              
                              <a 
                                href={applyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-brand-charcoal text-brand-gold text-[9px] uppercase tracking-[0.2em] px-8 py-4 rounded-[3px] font-bold hover:bg-brand-gold hover:text-white border border-brand-charcoal hover:border-brand-gold transition-all duration-500 inline-flex items-center gap-2 shadow-md"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                Apply For This Position
                              </a>
                            </div>
                            
                            <div>
                              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-4">Requirements</h4>
                              <ul className="space-y-3.5">
                                {pos.requirements.map((req, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-3.5 text-[13px] font-light text-brand-charcoal/60 leading-relaxed">
                                    <span className="text-brand-gold text-xs shrink-0 mt-0.5">◈</span>
                                    <span>{req}</span>
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
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-black/[0.03] rounded-2xl max-w-xl mx-auto shadow-sm">
            <div className="flex flex-col items-center gap-4 text-brand-charcoal/40 max-w-sm mx-auto px-6">
              <Globe className="w-10 h-10 stroke-[1.5] text-brand-gold animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/80">No active job listings found</p>
              <p className="text-[12px] font-light text-brand-charcoal/50">All career opportunities have been successfully closed. Please consult our Digital Concierge soon for future boutique openings!</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
