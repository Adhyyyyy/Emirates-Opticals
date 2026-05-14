"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { TrendingUp, MapPin, Users, Layout, Award, Star } from "lucide-react";

const WHY_JOIN = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Growth Opportunities",
    desc: "Build long-term career growth through continuous learning and development."
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Multiple Kerala Locations",
    desc: "Work at branches conveniently located across Kerala."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Supportive Team Environment",
    desc: "Collaborate with experienced professionals in a welcoming culture."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Premium Work Environment",
    desc: "Be part of a modern luxury retail and professional optical ecosystem."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Competitive Benefits",
    desc: "Attractive salary packages and employee benefits."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Customer Excellence",
    desc: "Deliver meaningful experiences through premium service and expertise."
  }
];

export function CareersWhyJoin() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-6">
              Why Professionals<br />Choose Emirates
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-16 h-[2px] bg-brand-gold" />
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_JOIN.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-white p-10 border border-black/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
                <div className="text-brand-gold mb-8 transition-transform duration-700 group-hover:scale-110 origin-left">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter mb-4">
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
