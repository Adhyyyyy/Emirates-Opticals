"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, Glasses } from "lucide-react";

export function HelpChoosingCTA() {
  return (
    <section className="bg-black section-padding border-t border-white/5" id="help-choosing-cta">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-4 max-w-[600px]">
            <h2 className="font-heading font-extralight text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase leading-tight">
              Ready to Experience Premium Care
            </h2>
            <p className="body-editorial-light max-w-xl text-white/50">
              Book your complimentary eye test and discover eyewear designed entirely around your lifestyle and needs.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/book-eye-test"
                className="group relative w-full sm:w-auto px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-500 rounded-[3px] bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white shadow-lg"
              >
                Book Eye Test
                <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/branches"
                className="group relative w-full sm:w-auto px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-500 rounded-[3px] bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
              >
                Find a Branch
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
