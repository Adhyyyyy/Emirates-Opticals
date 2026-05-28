"use client";

import React from "react";
import { m } from "framer-motion";
import { Settings, ShieldCheck, RefreshCw, Heart } from "lucide-react";

const SUPPORT_FEATURES = [
  {
    icon: Settings,
    title: "Frame Adjustments & Tuning",
    desc: "Lifetime complimentary alignment and frame tightening at any of our branches to guarantee comfort."
  },
  {
    icon: ShieldCheck,
    title: "Warranty & Repair Assistance",
    desc: "Comprehensive 2-year manufacturer warranty support on all luxury frames and premium lens coatings."
  },
  {
    icon: RefreshCw,
    title: "Eco Lens Replacement",
    desc: "Seamless replacement of scratched lenses while keeping your existing luxury frames intact."
  },
  {
    icon: Heart,
    title: "Ultrasonic Deep Cleansing",
    desc: "Complementary deep-sonic cleaning sessions to keep your nose-pads and hinges in showroom condition."
  }
];

export function ServiceSupport() {
  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden border-t border-black/5">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            After-Sales Care
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase mb-4"
          >
            Support Beyond <em className="italic font-light text-amber-500/80">The Purchase</em>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed"
          >
            Emirates Optician provides ongoing complimentary adjustments and support to ensure your luxury frames remain comfortable for a lifetime.
          </m.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* Left: Feature list */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {SUPPORT_FEATURES.map((item, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl hover:bg-[#FAF8F5] transition-colors duration-300 border border-transparent hover:border-neutral-100 group"
              >
                <div className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                  <item.icon className="w-4.5 h-4.5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-[0.1em] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Right: Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl group shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=1200"
              alt="After-Sales Optical Support"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-700 rounded-2xl" />
            <div className="absolute top-5 right-5 px-3 py-1.5 bg-amber-400 text-neutral-900 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-md">
              Lifetime Support
            </div>
          </m.div>

        </div>

      </div>
    </section>
  );
}
