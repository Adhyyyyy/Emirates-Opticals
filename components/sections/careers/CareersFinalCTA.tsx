"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function CareersFinalCTA() {
  return (
    <section className="w-full bg-neutral-900 py-20 border-t border-white/10">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">

        <div className="flex flex-col max-w-[500px]">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.2em] text-amber-400/70 mb-3 block font-medium"
          >
            Apply Now
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight mb-4 uppercase font-heading"
          >
            Your Next
            <br />
            <em className="font-serif italic text-amber-300/90" style={{ fontStyle: "italic" }}>Professional Chapter</em>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-400 leading-relaxed max-w-[420px]"
          >
            Become part of a growing luxury optical ecosystem focused on premium experiences, professional excellence, and customer trust.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col md:flex-row gap-3 shrink-0 w-full md:w-auto"
        >
          <a
            href="https://forms.gle/emirates-optician-careers"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C9A84C] text-[#0D0D0D] text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] font-bold hover:bg-[#B8952E] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <Link
            href="/branches"
            className="border border-white/20 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] hover:border-white hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            Explore Branches
          </Link>
          <a
            href="mailto:careers@emiratesopticians.com"
            className="border border-white/20 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] hover:border-white hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact HR
          </a>
        </m.div>

      </div>
    </section>
  );
}
