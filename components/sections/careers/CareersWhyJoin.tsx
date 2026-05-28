"use client";

import React from "react";
import { m } from "framer-motion";
import { TrendingUp, MapPin, Users, Layout, Award, Star } from "lucide-react";

const WHY_JOIN = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    desc: "Build long-term career growth through continuous learning and development."
  },
  {
    icon: MapPin,
    title: "Multiple Kerala Locations",
    desc: "Work at branches conveniently located across Kerala."
  },
  {
    icon: Users,
    title: "Supportive Team Environment",
    desc: "Collaborate with experienced professionals in a welcoming culture."
  },
  {
    icon: Layout,
    title: "Premium Work Environment",
    desc: "Be part of a modern luxury retail and professional optical ecosystem."
  },
  {
    icon: Award,
    title: "Competitive Benefits",
    desc: "Attractive salary packages and employee benefits."
  },
  {
    icon: Star,
    title: "Customer Excellence",
    desc: "Deliver meaningful experiences through premium service and expertise."
  }
];

export function CareersWhyJoin() {
  return (
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">

        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Why Emirates
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
          >
            Why Professionals Choose Emirates
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_JOIN.map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="group bg-white p-8 border border-neutral-200 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all duration-300 flex flex-col gap-5"
            >
              <div className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                <item.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
