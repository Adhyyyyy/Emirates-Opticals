"use client";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface HiringBannerProps {
  jobsCount?: number;
}

export function HiringBanner({ jobsCount = 4 }: HiringBannerProps) {
  return (
    <section className="bg-[#fcfcfc] py-24 border-t border-black/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-4 max-w-[600px]">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-[1px] bg-black/20" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-black/40">
                Join the Collective
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-heading uppercase text-black leading-tight tracking-tight">
              Define the Future of Vision
            </h2>
            <p className="text-[13px] md:text-[14px] text-black/50 font-light mt-2 leading-relaxed">
              We are seeking extraordinary optometrists, stylists, and artisans to join our Kerala ateliers. Experience a new standard of optical luxury and professional care.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/careers">
                <LuxuryButton 
                  variant="primary" 
                  icon={<ChevronRight className="w-4 h-4 text-[#C9A84C]" />}
                  onClick={() => {}}
                >
                  Explore Careers
                </LuxuryButton>
              </Link>
              <Link href="/careers#apply">
                <LuxuryButton 
                  variant="outline" 
                  onClick={() => {}}
                >
                  Submit Resume
                </LuxuryButton>
              </Link>
            </div>
            
            <div className="flex items-center gap-3 text-black/40 bg-black/5 px-4 py-2 rounded-full border border-black/5 shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[8px] font-extrabold uppercase tracking-widest">
                {jobsCount > 0 ? `${jobsCount} Active Openings` : "Positions Open"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
