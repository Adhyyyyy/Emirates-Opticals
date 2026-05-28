"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MapPin, Users, Layout, Award, Star } from "lucide-react";

const WHY_JOIN = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    desc: "Build rewarding long-term career growth through structured continuous optical training and leadership tracks."
  },
  {
    icon: MapPin,
    title: "Ten Showrooms in Kerala",
    desc: "Work at pristine, state-of-the-art luxury boutiques conveniently established near prime hubs across Kerala."
  },
  {
    icon: Users,
    title: "Supportive Culture",
    desc: "Collaborate side-by-side with seasoned clinical optometrists and luxury frame stylists in a united family."
  },
  {
    icon: Layout,
    title: "Premium Environments",
    desc: "Excel inside state-of-the-art diagnostic clinics and stunningly curated global designer glass galleries."
  },
  {
    icon: Award,
    title: "Bespoke Compensation",
    desc: "Enjoy attractive compensation packages, client satisfaction incentives, and extensive healthcare benefits."
  },
  {
    icon: Star,
    title: "Standard of Excellence",
    desc: "Deliver meaningful consultations through genuine luxury products, uncompromised value, and optical care."
  }
];

export function CareersWhyJoin() {
  return (
    <section className="w-full bg-[#FAF9F6] py-20 md:py-28 overflow-hidden border-t border-black/[0.02]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase leading-tight"
          >
            Why Professionals Choose Emirates
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-16 h-[1px] bg-brand-gold/50 mt-6"
          />
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {WHY_JOIN.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="group relative bg-white border border-black/[0.03] hover:border-brand-gold/25 p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 flex flex-col gap-6"
            >
              {/* Premium Icon Circle Frame */}
              <div className="w-12 h-12 rounded-[3px] border border-black/[0.03] bg-[#FAF9F6] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shrink-0">
                <item.icon className="w-5 h-5 stroke-[1.5]" />
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-[12px] text-brand-charcoal/50 leading-relaxed font-light group-hover:text-brand-charcoal/70 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
