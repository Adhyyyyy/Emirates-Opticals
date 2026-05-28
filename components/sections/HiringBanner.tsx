"use client";

import { ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface HiringBannerProps {
  jobsCount?: number;
}

export function HiringBanner({ jobsCount = 4 }: HiringBannerProps) {
  return (
    <section className="bg-black section-padding border-t border-white/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-4 max-w-[600px]">
            <h2 className="font-heading font-extralight text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase leading-tight">
              We are hiring
            </h2>
            <p className="body-editorial-light max-w-xl text-white/50">
              Join our team and be part of the next generation of optical care. We're looking for talented individuals who share our passion for quality, innovation, and customer excellence.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/careers"
                className="group relative w-full sm:w-auto px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-500 rounded-[3px] bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white shadow-lg"
              >
                View Open Positions
                <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
