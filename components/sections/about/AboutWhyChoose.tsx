"use client";

import React from "react";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { motion as m } from "framer-motion";
import { ShieldCheck, Eye, UserCheck, MapPin, HeartHandshake } from "lucide-react";

const WHY_CHOOSE = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Authentic International Brands",
    desc: "Direct partnerships with PRADA, Ray-Ban, Oakley, Cartier, and more — no imitations, ever."
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Free Professional Eye Testing",
    desc: "State-of-the-art equipment and experienced optometrists at every branch."
  },
  {
    icon: <UserCheck className="w-7 h-7" />,
    title: "Expert Styling Consultation",
    desc: "Personalized guidance to find frames that enhance your unique features and style."
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: "Convenient Locations",
    desc: "Multiple branches across Kerala with ample parking and easy accessibility."
  },
  {
    icon: <HeartHandshake className="w-7 h-7" />,
    title: "After-Sales Support",
    desc: "Warranty coverage, adjustments, and ongoing care for your eyewear investment."
  }
];

export function AboutWhyChoose() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">

        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial mb-4"
          >
            Why Emirates Optician
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial"
          >
            Why Choose Emirates Optician?
          </m.h2>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {WHY_CHOOSE.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="group flex flex-col gap-6 p-10 border border-black/5 rounded-3xl hover:border-brand-gold/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 h-full">
                <div className="text-brand-gold transition-transform duration-700 group-hover:scale-110 origin-left">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-charcoal/60 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
