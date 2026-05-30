"use client";

import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MapPin, Award, Compass, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
}

const BRANCHES: Branch[] = [
  {
    id: "kakkanad",
    name: "Kakkanad Contemporary Boutique",
    area: "Seaport-Airport Road",
    address: "Seaport-Airport Rd, Chittethukara, Kakkanad, Kerala 682037",
    phone: "+91 77364 41211",
    hours: "10:00 AM — 08:00 PM",
  },
  {
    id: "angamaly",
    name: "Angamaly Premium Lounge",
    area: "MC Road",
    address: "MC Road, Near KSRTC Bus Stand, Angamaly, Kerala 683572",
    phone: "+91 87140 32605",
    hours: "09:00 AM — 08:00 PM",
  },
  {
    id: "kothamangalam",
    name: "Kothamangalam Eyewear Gallery",
    area: "Aluva-Munnar Road",
    address: "AM Road, Near Private Bus Stand, Kothamangalam, Kerala 686691",
    phone: "+91 87140 32607",
    hours: "09:00 AM — 08:00 PM",
  },
  {
    id: "irumpanam",
    name: "Irumpanam Sports Atelier",
    area: "Seaport-Airport Road",
    address: "MM Arcade, Seaport-Airport Rd, Irumpanam, Kerala 682309",
    phone: "+91 88899 90533",
    hours: "10:00 AM — 08:00 PM",
  },
  {
    id: "ettumanur",
    name: "Ettumanur Vision Center",
    area: "MC Road",
    address: "MC Road, Near Ettumanur Temple, Ettumanur, Kerala 686631",
    phone: "+91 87140 32604",
    hours: "09:00 AM — 08:00 PM",
  },
  {
    id: "kottayam",
    name: "Kottayam Premium Flagship",
    area: "Kottayam-Kumily Road",
    address: "M D Commercial Centre, Opp. Petrol Pump, Kottayam, Kerala 686001",
    phone: "+91 85478 66755",
    hours: "09:00 AM — 08:00 PM",
  },
  {
    id: "changanassery",
    name: "Changanassery Grand Lounge",
    area: "Mathumoola",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103",
    phone: "+91 87140 32601",
    hours: "09:30 AM — 07:30 PM",
  },
  {
    id: "thiruvalla",
    name: "Thiruvalla Luxury Boutique",
    area: "Thirumoolapuram",
    address: "Karappunnasseril Arcade, Thirumoolapuram, Thiruvalla, Kerala 689115",
    phone: "+91 87140 32602",
    hours: "09:30 AM — 07:30 PM",
  },
  {
    id: "kumbanad",
    name: "Kumbanad Signature Hub",
    area: "TK Road",
    address: "TK Road, Near Kumbanad Junction, Kumbanad, Kerala 689547",
    phone: "+91 87140 32603",
    hours: "09:30 AM — 07:30 PM",
  },
  {
    id: "pandalam",
    name: "Pandalam Optic Studio",
    area: "MC Road",
    address: "MC Road, Near Pandalam Bridge, Pandalam, Kerala 689501",
    phone: "+91 87140 32606",
    hours: "09:30 AM — 07:30 PM",
  },
];

export function BranchShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeBranch = BRANCHES[activeIndex];

  const handleDirections = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  const nextBranch = useCallback(() => {
    setActiveIndex((current) => (current + 1) % BRANCHES.length);
  }, []);

  const prevBranch = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current - 1 + BRANCHES.length) % BRANCHES.length);
  };

  const manualNext = () => {
    setIsAutoPlaying(false);
    nextBranch();
  };

  const jumpToBranch = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextBranch();
    }, 6000); // 6 second rotation

    return () => clearInterval(timer);
  }, [isAutoPlaying, nextBranch]);

  return (
    <section className="bg-white section-padding overflow-hidden border-t border-brand-charcoal/5" id="boutique-locator">
      <div className="section-container">
        
        {/* Centered Editorial Header */}
        <div className="flex flex-col items-center mb-12 md:mb-16 relative z-10 text-center">
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial text-center"
          >
            Our Branch Network
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-neutral-500 mt-4 max-w-lg text-sm md:text-base font-light"
          >
            Discover our premium eyewear boutiques located across Kerala.
          </m.p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Active Branch Display */}
          <div className="relative min-h-[460px] md:min-h-[400px] overflow-hidden bg-[#FAF9F6] border border-neutral-100 rounded-[3px] shadow-sm p-5 md:p-12">
            <AnimatePresence mode="wait">
              <m.div
                key={activeBranch.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                {/* Top Info Header Segment */}
                <div className="flex flex-col gap-4 text-center items-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-brand-gold font-medium bg-brand-gold/10 px-3 py-1.5 rounded-[3px] select-none">
                      <Award className="w-3.5 h-3.5" />
                      Premium Eyecare Boutique
                    </span>
                  </div>
                  
                  <h4 className="font-heading font-extralight tracking-tight text-brand-charcoal uppercase leading-[1.1] text-2xl sm:text-3xl md:text-5xl mt-2">
                    {activeBranch.name}
                  </h4>
                  
                  <p className="eyebrow-editorial text-brand-gold mt-1 mb-2 select-none text-xs md:text-sm">
                    {activeBranch.area}
                  </p>
                </div>

                {/* Info Grid with divider */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 border-y border-neutral-200/50 py-6 md:py-8 mt-6 md:mt-8">
                  
                  {/* Address Column */}
                  <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block select-none flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Location
                    </span>
                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-light uppercase">
                      {activeBranch.address}
                    </p>
                  </div>

                  {/* Hours & Contact Column (with divider) */}
                  <div className="flex flex-col gap-6 md:border-l md:border-neutral-200/50 md:pl-12 items-center md:items-start text-center md:text-left">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block select-none">
                        Atelier Hours
                      </span>
                      <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-light">
                        {activeBranch.hours}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block select-none">
                        Contact Hotline
                      </span>
                      <a 
                        href={`tel:${activeBranch.phone.replace(/\s+/g, "")}`} 
                        className="text-sm md:text-base font-medium text-neutral-900 hover:text-brand-gold transition-colors"
                      >
                        {activeBranch.phone}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Call-to-action Footer Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8 w-full max-w-xl mx-auto">
                  <Link 
                    href="/book-eye-test"
                    className="bg-[#C9A84C] text-[#0A0A0A] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-8 py-4 rounded-[3px] hover:bg-[#B8952E] hover:text-white transition-colors duration-500 flex-1 flex items-center justify-center gap-3 font-bold shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Eye Test
                  </Link>
                  
                  <button 
                    onClick={() => handleDirections(activeBranch.address)}
                    className="border border-neutral-300 bg-white text-neutral-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] hover:border-neutral-900 hover:text-neutral-900 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3 group/directions shadow-sm flex-1"
                  >
                    <Compass className="w-4 h-4 text-neutral-500 group-hover/directions:text-neutral-900 transition-colors" />
                    <span>Get Directions</span>
                  </button>
                </div>

              </m.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls Bar (Arrows + Dots) */}
          <div className="flex justify-between items-center mt-8 px-2 md:px-0">
            <button 
              onClick={prevBranch}
              className="p-2.5 bg-white border border-neutral-200 rounded-full text-neutral-400 hover:text-brand-charcoal hover:border-brand-charcoal hover:shadow-lg transition-all duration-300"
              aria-label="Previous Branch"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            <div className="flex justify-center items-center gap-2">
              {BRANCHES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToBranch(idx)}
                  className="group p-1"
                  aria-label={`Go to branch slide ${idx + 1}`}
                >
                  <div 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500 ease-in-out",
                      activeIndex === idx 
                        ? "w-8 bg-[#C9A84C]" 
                        : "w-1.5 bg-neutral-300 group-hover:bg-neutral-400"
                    )} 
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={manualNext}
              className="p-2.5 bg-white border border-neutral-200 rounded-full text-neutral-400 hover:text-brand-charcoal hover:border-brand-charcoal hover:shadow-lg transition-all duration-300"
              aria-label="Next Branch"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
