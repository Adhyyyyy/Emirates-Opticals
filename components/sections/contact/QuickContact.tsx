"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const METHODS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp Support",
    desc: "Quick branch-specific support and enquiries."
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone Assistance",
    desc: "Direct customer support and appointment help."
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Support",
    desc: "Professional assistance for customer enquiries."
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Branch Visits",
    desc: "Visit our premium optical destinations across Kerala."
  }
];

export function QuickContact() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative">
      <div className="container-tight relative z-10">
        
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading">
              Multiple Ways To Connect
            </h2>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODS.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white p-10 border border-black/5 hover:border-brand-gold/30 hover:shadow-xl transition-all duration-700 h-full flex flex-col group text-center items-center">
                <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-700">
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
