"use client";

import React from "react";
import { m } from "framer-motion";
import { MapPin, ParkingCircle, Eye, UserCheck, Award, HeartHandshake } from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "10+ Kerala Branches", description: "Conveniently located in every major city across the state." },
  { icon: ParkingCircle, title: "Ample Parking", description: "Stress-free visits with dedicated parking at all destinations." },
  { icon: Eye, title: "Professional Eye Testing", description: "Clinical accuracy with state-of-the-art optical equipment." },
  { icon: UserCheck, title: "Expert Styling", description: "Personalized consultation to find your perfect frame match." },
  { icon: Award, title: "Authentic Brands", description: "Only genuine luxury eyewear from the world's finest houses." },
  { icon: HeartHandshake, title: "Friendly Support", description: "Exceptional care that extends long after your purchase." },
];

export function BranchPhilosophy() {
  return (
    <section className="bg-white py-20 md:py-24 overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: The Statement */}
          <div className="lg:sticky lg:top-32">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
            >
              The Visionist Philosophy
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase font-heading leading-tight mb-6"
            >
              Premium Eyecare.
              <br />
              <em className="italic font-light text-amber-500/80">Closer Than Ever.</em>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-neutral-500 font-light leading-relaxed max-w-lg"
            >
              With multiple branches across Kerala, Emirates Optician combines authentic luxury eyewear, expert eye care, and personalized styling consultation — making premium optical experiences easily accessible to every customer.
            </m.p>
          </div>

          {/* Right Column: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {FEATURES.map((feature, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="group flex flex-col items-start p-6 bg-[#FAF8F5] rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 h-full"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-neutral-700 rounded-xl mb-6 group-hover:border-neutral-300 group-hover:bg-neutral-50 transition-all duration-200">
                  <feature.icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {feature.description}
                </p>
              </m.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
