"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const BRANCHES = [
  {
    id: "calicut",
    name: "Calicut Flagship",
    area: "Near Mavoor Road",
    address: "Royal Square, Opp. Baby Memorial Hospital, Calicut, Kerala",
    phone: "+91 495 272 0000",
    hours: "09:30 AM — 08:30 PM",
    coords: { x: 45, y: 35 },
  },
  {
    id: "kochi",
    name: "Kochi Editorial",
    area: "MG Road",
    address: "Premium Plaza, MG Road, Ravipuram, Kochi, Kerala",
    phone: "+91 484 235 0000",
    hours: "10:00 AM — 09:00 PM",
    coords: { x: 55, y: 65 },
  },
  {
    id: "trivandrum",
    name: "Trivandrum Atelier",
    area: "Statue Junction",
    address: "Luxe Tower, Statue Junction, Thiruvananthapuram, Kerala",
    phone: "+91 471 247 0000",
    hours: "09:30 AM — 08:00 PM",
    coords: { x: 65, y: 90 },
  },
];

export function BranchShowcase() {
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

  return (
    <section className="bg-[#fcfcfc] py-24 md:py-32 overflow-hidden border-y border-black/5">
      <div className="container-tight">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-black/40 mb-4"
          >
            Our Presence in Kerala
          </m.h2>
          <m.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light font-heading tracking-tight italic"
          >
            Visit Our Luxury Ateliers
          </m.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Stylized Kerala Map Representation */}
          <div className="lg:col-span-6 relative aspect-square bg-[#f8f8f8] border border-black/5 flex items-center justify-center group">
            {/* Stylized Outline Placeholder */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                <path d="M40,10 Q50,0 60,10 T70,30 T60,50 T40,70 T30,90" />
              </svg>
            </div>

            {/* Interactive Markers */}
            {BRANCHES.map((branch) => (
              <m.button
                key={branch.id}
                onClick={() => setActiveBranch(branch)}
                className="absolute z-10 group/marker"
                style={{ left: `${branch.coords.x}%`, top: `${branch.coords.y}%` }}
                whileHover={{ scale: 1.2 }}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center",
                  activeBranch.id === branch.id ? "bg-black border-black scale-125" : "bg-white border-black/20"
                )}>
                  {activeBranch.id === branch.id && (
                    <m.div 
                      layoutId="pulse"
                      className="absolute inset-0 bg-black rounded-full animate-ping opacity-20" 
                    />
                  )}
                </div>
                <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover/marker:opacity-100 transition-opacity">
                  {branch.id}
                </span>
              </m.button>
            ))}

            <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/5 vertical-text select-none">
              KERALA STATE
            </div>
          </div>

          {/* Right: Active Branch Detail Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <m.div
                key={activeBranch.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-10"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-black/20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                      Certified Clinical Center
                    </span>
                  </div>
                  <h4 className="text-4xl md:text-5xl font-light font-heading italic tracking-tight">
                    {activeBranch.name}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/60">
                    {activeBranch.area}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-y border-black/5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-black/40">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Address</span>
                    </div>
                    <p className="text-sm leading-relaxed text-black/70">
                      {activeBranch.address}
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-black/40">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Inquiries</span>
                      </div>
                      <p className="text-sm font-medium">{activeBranch.phone}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-black/40">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Consultations</span>
                      </div>
                      <p className="text-sm font-medium">{activeBranch.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black/90 transition-all flex items-center justify-center gap-3 group">
                    Book Appointment
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-5 border border-black/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-black transition-all">
                    Get Directions
                  </button>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
