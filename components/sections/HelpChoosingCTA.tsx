"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export function HelpChoosingCTA() {
  return (
    <section className="w-full bg-[#F7F5F0] section-padding border-t border-[#E8E4DC]">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Copy */}
          <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left">
            <m.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A8A8A] block"
            >
              Complimentary Styling
            </m.span>

            <m.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-[48px] font-light font-heading uppercase tracking-tight text-[#0A0A0A] leading-[1.1]"
            >
              Need help<br />
              <em className="italic font-extralight text-[#0A0A0A]/60">choosing?</em>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[15px] font-light text-[#8A8A8A] leading-relaxed"
            >
              Our certified Visionists offer free in-store consultations — matching your face shape, lifestyle, and prescription to the perfect frame.
            </m.p>
          </div>

          {/* Right CTAs */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 shrink-0"
          >
            <Link
              href="/book-eye-test"
              className="inline-flex items-center justify-center gap-3 bg-[#0A0A0A] text-white hover:bg-[#C9A84C] h-[48px] px-8 text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 rounded-none"
            >
              <Calendar className="w-4 h-4" />
              Book Eye Test
            </Link>
            <Link
              href="/branches"
              className="inline-flex items-center justify-center gap-3 border border-[#0A0A0A] text-[#0A0A0A] hover:border-[#C9A84C] hover:text-[#C9A84C] h-[48px] px-8 text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 rounded-none"
            >
              Find a Branch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </m.div>

        </div>
      </div>
    </section>
  );
}
