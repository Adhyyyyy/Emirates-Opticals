"use client";

import React from "react";
import { m } from "framer-motion";
import { Eye, Zap, ShieldCheck, Search } from "lucide-react";

const LENS_TYPES = [
  { icon: Eye, title: "Single Vision", desc: "For distance or reading" },
  { icon: Zap, title: "Progressive", desc: "Seamless multi-focal" },
  { icon: ShieldCheck, title: "Blue-Cut", desc: "Digital eye strain protection" },
  { icon: Search, title: "Anti-Glare", desc: "Enhanced visual clarity" }
];

export function ServiceLensSolutions() {
  return (
    <section className="w-full bg-neutral-950 py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 block"
          >
            Our Services
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-white tracking-tight uppercase mb-4"
          >
            Quality <em className="italic font-light text-amber-400/80">Lenses</em>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed"
          >
            Choose from a wide range of premium lenses designed to meet your specific vision needs and lifestyle.
          </m.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LENS_TYPES.map((lens, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-amber-400/30 transition-all duration-300 flex flex-col gap-5 group"
            >
              <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 text-amber-400 group-hover:border-amber-400/30 transition-all duration-200 shrink-0">
                <lens.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                {lens.title}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {lens.desc}
              </p>
            </m.div>
          ))}
        </div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 text-center text-xs text-neutral-600 font-light italic"
        >
          * All lenses come with anti-scratch coating and UV protection as standard.
        </m.p>

      </div>
    </section>
  );
}
