"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MapPin, Award, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  coords: { x: number; y: number };
}

const BRANCHES: Branch[] = [
  {
    id: "kakkanad",
    name: "Kakkanad Contemporary Hub",
    area: "Seaport-Airport Road",
    address: "Seaport - Airport Rd, Chittethukara, Kakkanad, Kerala 682037, India",
    phone: "+91 77364 41211",
    hours: "10:00 AM — 08:00 PM",
    coords: { x: 45, y: 35 },
  },
  {
    id: "irumpanam",
    name: "Irumpanam Sports Atelier",
    area: "Seaport-Airport Road",
    address: "MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    hours: "10:00 AM — 09:00 PM",
    coords: { x: 48, y: 45 },
  },
  {
    id: "kottayam",
    name: "Kottayam Premium Flagship",
    area: "Kottayam-Kumily Road",
    address: "M D Commercial Centre, opp. Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    hours: "09:30 AM — 08:00 PM",
    coords: { x: 52, y: 60 },
  },
  {
    id: "changanassery",
    name: "Changanassery Grand Lounge",
    area: "Mathumoola",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    phone: "+91 87140 32601",
    hours: "09:30 AM — 07:30 PM",
    coords: { x: 55, y: 70 },
  },
  {
    id: "thiruvalla",
    name: "Thiruvalla Luxury Boutique",
    area: "Thirumoolapuram",
    address: "Karappunnasseril arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    hours: "10:00 AM — 07:00 PM",
    coords: { x: 58, y: 80 },
  },
];

export function BranchShowcase() {
  const [activeBranch, setActiveBranch] = useState<Branch>(BRANCHES[0]);

  const handleDirections = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-white py-20 overflow-hidden border-t border-black/5" id="boutique-locator">
      <div className="section-container">
        
        {/* Centered Editorial Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial mb-3 text-center"
          >
            Atelier Directory
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial text-center"
          >
            Our Destination Boutiques
          </m.h2>
        </div>

        {/* Symmetric Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-stretch w-full">
          
          {/* Left Column: Interactive Map Representation */}
          <div className="rounded-2xl overflow-hidden min-h-[480px] relative bg-[#fbfbf9] border border-black/5 flex items-center justify-center group w-full">
            {/* Stylized Outline Map Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none p-12">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                <path d="M40,10 Q50,0 60,10 T70,30 T60,50 T40,70 T30,90 Z" />
              </svg>
            </div>

            {/* Interactive Markers */}
            {BRANCHES.map((branch) => (
              <m.button
                key={branch.id}
                onClick={() => setActiveBranch(branch)}
                className="absolute z-10 group/marker"
                style={{ left: `${branch.coords.x}%`, top: `${branch.coords.y}%` }}
                whileHover={{ scale: 1.25 }}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center shadow-lg",
                  activeBranch.id === branch.id 
                    ? "bg-[#C9A84C] border-black scale-125" 
                    : "bg-white border-black/20 hover:border-black"
                )}>
                  {activeBranch.id === branch.id && (
                    <m.div 
                      layoutId="pulse"
                      className="absolute inset-0 bg-[#C9A84C] rounded-full animate-ping opacity-30" 
                    />
                  )}
                  <MapPin className={cn("w-2.5 h-2.5", activeBranch.id === branch.id ? "text-black" : "text-black/30")} />
                </div>
                <span className="absolute top-7 left-1/2 -translate-x-1/2 text-[7px] font-extrabold uppercase tracking-[0.25em] bg-black text-white px-2 py-0.5 rounded shadow-xl opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                  {branch.name.split(" ")[0]}
                </span>
              </m.button>
            ))}

            <div className="text-[10px] font-extrabold uppercase tracking-[0.45em] text-black/5 vertical-text select-none absolute bottom-8 right-8">
              KERALA REGION
            </div>
          </div>

          {/* Right Column: Active Branch Detail Panel */}
          <div className="flex flex-col justify-between gap-6 pl-0 md:pl-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={activeBranch.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between h-full gap-6 w-full"
              >
                {/* Top Info Header Segment */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-amber-600 font-medium bg-amber-50 px-2.5 py-1 rounded-full select-none">
                      <Award className="w-3.5 h-3.5" />
                      Certified Eyecare & Curation Center
                    </span>
                  </div>
                  
                  <h4 className="text-4xl md:text-5xl font-light text-neutral-900 leading-[1.1] tracking-tight max-w-full truncate">
                    {activeBranch.name}
                  </h4>
                  
                  <p className="text-[11px] uppercase tracking-[0.2em] text-amber-500 mt-1 mb-2 select-none">
                    {activeBranch.area}
                  </p>
                </div>

                {/* Symmetric Info Grid with divider */}
                <div className="grid grid-cols-2 gap-6 border-y border-neutral-100 py-6">
                  
                  {/* Address Column */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-1 block select-none">
                      Address
                    </span>
                    <p className="text-sm text-neutral-700 leading-relaxed font-light uppercase">
                      {activeBranch.address}
                    </p>
                  </div>

                  {/* Hours & Contact Column (with divider) */}
                  <div className="flex flex-col gap-4 border-l border-neutral-100 pl-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-1 block select-none">
                        Atelier Hours
                      </span>
                      <p className="text-sm text-neutral-700 leading-relaxed font-light">
                        {activeBranch.hours}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-1 block select-none">
                        Contact Hotline
                      </span>
                      <a 
                        href={`tel:${activeBranch.phone.replace(/\s+/g, "")}`} 
                        className="text-sm font-medium text-neutral-900 hover:text-amber-500 transition"
                      >
                        {activeBranch.phone}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Call-to-action Footer Actions */}
                <div className="flex gap-3 mt-auto w-full">
                  <Link 
                    href="/book-eye-test"
                    className="bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] px-7 py-3.5 rounded-full hover:bg-neutral-700 transition flex-1 text-center font-medium block"
                  >
                    Book Appointments
                  </Link>
                  
                  <button 
                    onClick={() => handleDirections(activeBranch.address)}
                    className="border border-neutral-300 text-neutral-700 text-xs uppercase tracking-[0.15em] px-6 py-3.5 rounded-full hover:border-neutral-900 hover:text-neutral-900 transition font-medium shrink-0 flex items-center justify-center gap-2 group/directions"
                  >
                    <Compass className="w-3.5 h-3.5 text-neutral-500 group-hover/directions:text-neutral-900 transition-colors" />
                    <span>Get Directions</span>
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
