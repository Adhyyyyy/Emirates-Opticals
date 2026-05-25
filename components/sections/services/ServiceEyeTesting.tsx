"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { Microscope, Zap, Eye, ShieldCheck } from "lucide-react";
import { Calendar } from "lucide-react";

const FEATURES = [
  { icon: Microscope, text: "Comprehensive vision assessment" },
  { icon: Zap, text: "Modern diagnostic equipment" },
  { icon: Eye, text: "Experienced certified optometrists" },
  { icon: ShieldCheck, text: "Detailed prescription and recommendations" }
];

export function ServiceEyeTesting() {
  return (
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 overflow-hidden" id="eye-testing">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              Our Services
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Free Professional
              <br />
              <em className="italic font-light text-amber-500/80">Eye Testing</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed mb-10 max-w-xl"
            >
              Your vision deserves professional care. Every Emirates Optician branch offers complimentary eye examinations conducted by experienced optometrists using state-of-the-art equipment.
            </m.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {FEATURES.map((item, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center bg-white text-amber-500 shrink-0">
                    <item.icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                    {item.text}
                  </span>
                </m.div>
              ))}
            </div>

            <Link
              href="/book-eye-test"
              className="bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] px-7 py-3.5 rounded-full hover:bg-neutral-700 transition inline-flex items-center gap-2 font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Your Free Eye Test
            </Link>
          </div>

          {/* Right: Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden rounded-2xl group shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
              alt="Professional Eye Testing"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
          </m.div>

        </div>
      </div>
    </section>
  );
}
