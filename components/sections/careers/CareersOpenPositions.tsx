"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ChevronDown, MapPin, Calendar, Globe, Sparkles } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
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
    <section className="w-full bg-white section-padding overflow-hidden text-black">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-10 md:mb-24">
          <Reveal>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
              Explore Careers
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-charcoal uppercase tracking-tighter font-heading">
              Current Opportunities
            </h2>
            <p className="text-sm text-brand-charcoal/40 font-light mt-4 max-w-xl mx-auto leading-relaxed">
              Join a team dedicated to luxury eyewear, state-of-the-art clinical optometry, and exceptional retail experiences across Kerala.
            </p>
          </Reveal>
        </div>

        {activeOpenings.length > 0 ? (
          <GridStagger className="space-y-4">
            {activeOpenings.map((pos, idx) => {
              const isExpanded = expandedIdx === idx;
              const branchName = pos.branchId === "Global" ? "Global (All Branches)" : branches.find(b => b.id === pos.branchId)?.name || pos.branchId;
              const applyUrl = pos.googleFormUrl || "https://forms.google.com/your-default-form-id";

              return (
                <StaggerItem key={pos.id}>
                  <div 
                    className={cn(
                      "border border-black/5 overflow-hidden transition-all duration-700",
                      isExpanded ? "bg-brand-pearl/45 border-brand-gold/25" : "bg-white hover:border-brand-gold/15"
                    )}
                  >
                    <button 
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className="w-full px-8 md:px-12 py-8 flex items-center justify-between group"
                    >
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2">OPPORTUNITY 0{idx + 1}</span>
                        <h3 className="text-lg md:text-2xl font-bold text-brand-charcoal uppercase font-heading group-hover:tracking-wider transition-all duration-700">
                          {pos.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-[8.5px] font-bold text-brand-gold uppercase tracking-widest">
                            <MapPin className="w-3.5 h-3.5" />
                            {branchName}
                          </span>
                          {pos.expiryDate && (
                            <span className="flex items-center gap-1 text-[8.5px] font-medium text-brand-charcoal/40 uppercase tracking-widest">
                              <Calendar className="w-3.5 h-3.5" />
                              Apply Before: {new Date(pos.expiryDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className={cn(
                        "p-3 rounded-full border border-black/5 transition-all duration-500",
                        isExpanded ? "bg-brand-gold text-white rotate-180" : "group-hover:bg-brand-charcoal group-hover:text-white"
                      )}>
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
                          <div className="px-8 md:px-12 pb-12 pt-4 border-t border-black/5">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                              <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-4">Description</h4>
                                <p className="text-brand-charcoal/70 font-light leading-relaxed mb-8 text-sm whitespace-pre-line">
                                  {pos.desc}
                                </p>
                                
                                <LuxuryButton asChild className="bg-brand-charcoal text-white hover:bg-brand-gold">
                                  <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Apply For This Position</span>
                                  </a>
                                </LuxuryButton>
                              </div>
                              
                              <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-4">Requirements</h4>
                                <ul className="space-y-3">
                                  {pos.requirements.map((req, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-4 text-sm font-light text-brand-charcoal/80">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
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
                </StaggerItem>
              );
            })}
          </GridStagger>
        ) : (
          <div className="py-24 text-center bg-brand-pearl/20 border border-dashed border-black/10 rounded-[3rem]">
            <div className="flex flex-col items-center gap-4 text-brand-charcoal/30">
              <Globe className="w-12 h-12 font-light animate-pulse" />
              <p className="text-xs uppercase tracking-widest font-bold">No active job listings found</p>
              <p className="text-[11px] font-light">All roles have been successfully closed. Check back soon for future openings!</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
