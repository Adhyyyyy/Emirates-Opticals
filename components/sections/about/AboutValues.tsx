"use client";

import React from "react";
import { m } from "framer-motion";
import { ShieldCheck, UserCheck, Heart, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Brands",
    desc: "Every frame and sunglass is sourced only from authorized distributors."
  },
  {
    icon: Sparkles,
    title: "Advanced Eye Testing",
    desc: "Modern diagnostic technology and experienced optometrists."
  },
  {
    icon: UserCheck,
    title: "Expert Styling Guidance",
    desc: "Professional recommendations tailored to your features and lifestyle."
  },
  {
    icon: Heart,
    title: "Premium Experience",
    desc: "Luxury retail atmosphere designed around comfort and trust."
  }
];

export function AboutValues() {
  return (
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Our Core Values
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
          >
            The Principles That Guide Everything We Do
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((val, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group bg-white p-8 border border-neutral-200 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all duration-300 flex flex-col gap-5"
            >
              <div className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                <val.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
                {val.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light group-hover:text-neutral-700 transition-colors duration-200">
                {val.desc}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
