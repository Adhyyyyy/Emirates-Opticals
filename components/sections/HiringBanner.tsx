"use client";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ChevronRight, Briefcase } from "lucide-react";

export function HiringBanner() {
  return (
    <section className="bg-[#fcfcfc] py-20 border-t border-black/5">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-4 max-w-[600px]">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-[1px] bg-black/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
                Join the Collective
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-heading tracking-tight italic">
              Define the Future of Vision.
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black/60 font-light mt-2">
              We are seeking extraordinary optometrists, stylists, and artisans to join our Kerala ateliers. Experience a new standard of optical luxury.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <LuxuryButton 
                variant="primary" 
                icon={<ChevronRight className="w-4 h-4" />}
                onClick={() => {}}
              >
                Explore Careers
              </LuxuryButton>
              <LuxuryButton 
                variant="outline" 
                onClick={() => {}}
              >
                Get Directions
              </LuxuryButton>
            </div>
            <div className="flex items-center gap-3 text-black/30">
              <Briefcase className="w-4 h-4" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                4 Positions Available
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
