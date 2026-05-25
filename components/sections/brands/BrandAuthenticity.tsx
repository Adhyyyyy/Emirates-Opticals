"use client";

import React from "react";
import { m } from "framer-motion";
import { ShieldCheck, Award, Zap, CheckCircle2 } from "lucide-react";

const AUTH_POINTS = [
  { icon: ShieldCheck, title: "Authenticity Verified", desc: "Sourced directly from authorized distributors." },
  { icon: Award, title: "Official Brand Warranty", desc: "Complete coverage as per global brand standards." },
  { icon: Zap, title: "Premium Lens Compatibility", desc: "Precision fitting for any brand prescription." },
  { icon: CheckCircle2, title: "Expert Fitting & Support", desc: "Personalized styling and maintenance." }
];

export function BrandAuthenticity() {
  return (
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 overflow-hidden border-t border-black/5">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Official Promise
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase mb-4"
          >
            Guaranteed Authentic. Always Genuine.
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed"
          >
            Every frame at Emirates Optician is sourced from authorized distributors and trusted global partners — ensuring authenticity, warranty protection, and uncompromised quality.
          </m.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AUTH_POINTS.map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group bg-white p-8 border border-neutral-200 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center gap-5"
            >
              <div className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                <item.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                {item.desc}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
