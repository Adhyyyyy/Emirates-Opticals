"use client";

import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { getOffers } from "@/actions/cms-marketing";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Offer {
  id: string;
  title: string;
  description: string;
  percentage: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
}

export function PromotionsShowcase() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await getOffers();
        let activeList: Offer[] = [];
        if (data && data.length > 0) {
          const now = new Date();
          const active = data.filter((o: any) => {
            if (!o.isActive) return false;
            if (o.startDate && new Date(o.startDate) > now) return false;
            if (o.endDate && new Date(o.endDate) < now) return false;
            return true;
          });
          activeList = active.map((o: any) => ({
            id: o.id,
            title: o.title,
            description: o.description,
            percentage: o.percentage || "OFFER",
            branchId: o.branchId === "Global" ? "All Shops" : o.branchId,
            startDate: o.startDate,
            endDate: o.endDate,
          }));
        }
        setOffers(activeList);
      } catch (e) {
        console.warn("Failed to fetch CRM offers:", e);
        setOffers([]);
      }
    }
    loadOffers();
  }, []);

  // Auto-shuffle timer if there are multiple offers
  useEffect(() => {
    if (offers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [offers.length]);

  const handleDragEnd = (_event: unknown, info: { offset: { x: number; y: number } }) => {
    if (info.offset.y < -80 && offers.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }
  };

  return (
    <section className="bg-[#FAF9F6] section-padding overflow-hidden border-t border-[#E8E4DC]" id="homepage-promotions">
      <div className="section-container flex flex-col">
        
        {/* Inner Grid Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Column: Editorial Header */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col text-left"
          >
            <h2 className="h2-editorial mb-6 uppercase">
              Exclusive <br />
              <span className="italic font-light text-brand-gold">Offers</span>
            </h2>
            <p className="text-sm md:text-[15px] text-neutral-600 leading-relaxed font-light max-w-md">
              Discover our latest showroom events, seasonal privileges, and special discounts available at Emirates Optician.
            </p>
          </m.div>

          {/* Right Column: Stack of Cards */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-full h-[320px] md:h-[340px]">
              {offers.length === 0 ? (
                // No Offers Fallback
                <m.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-white/50 backdrop-blur-sm border border-brand-charcoal/5 rounded-[3px] flex flex-col items-center justify-center text-center p-8 shadow-sm"
                >
                  <p className="text-brand-charcoal/60 uppercase tracking-[0.2em] font-bold text-xs mb-2">Check back soon</p>
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-charcoal font-heading leading-snug">
                    Currently No Active Offers
                  </h3>
                </m.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {offers.map((offer, idx) => {
                    let position = idx - currentIndex;
                    if (position < 0) {
                      position += offers.length;
                    }

                    if (position > 2) return null;
                    const isTop = position === 0;

                    return (
                      <m.div
                        key={offer.id}
                        style={{
                           zIndex: offers.length - position,
                           transformOrigin: "bottom center",
                        }}
                        drag={false}
                        animate={{
                          y: position * 16,
                          scale: 1 - position * 0.04,
                          opacity: position === 0 ? 1 : position === 1 ? 0.6 : 0.2,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className={cn(
                          "absolute inset-x-0 top-0 bg-white text-brand-charcoal rounded-[3px] border border-black/5 p-8 md:p-10 flex flex-col gap-6 hover:border-brand-gold/40 hover:shadow-2xl transition-all duration-500 shadow-xl",
                          isTop ? "cursor-pointer pointer-events-auto" : "pointer-events-none select-none"
                        )}
                        onClick={() => {
                          if (isTop && offers.length > 1) {
                            setCurrentIndex((prev) => (prev + 1) % offers.length);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <span className="bg-brand-gold text-brand-charcoal text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-[3px] font-extrabold w-fit shadow-md">
                            {offer.percentage}
                          </span>
                        </div>

                        <div className="mt-2 flex-1 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-3xl font-normal text-brand-charcoal font-heading leading-tight tracking-wide">
                            {offer.title}
                          </h3>
                          <p className="text-sm md:text-[15px] text-brand-charcoal/60 leading-relaxed font-light mt-4 line-clamp-3">
                            {offer.description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 mt-2 pt-6 border-t border-black/5">
                          {offer.branchId && (
                            <div className="flex items-center gap-3 text-[10px] text-brand-charcoal/50 uppercase tracking-[0.15em] font-medium">
                              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                              <span className="truncate">{offer.branchId}</span>
                            </div>
                          )}
                          {(offer.startDate || offer.endDate) && (
                            <div className="flex items-center gap-3 text-[10px] text-brand-charcoal/50 uppercase tracking-[0.15em] font-medium">
                              <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                              <span className="truncate">
                                {offer.startDate ? new Date(offer.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Valid Now"}
                                {" — "}
                                {offer.endDate ? new Date(offer.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Ongoing"}
                              </span>
                            </div>
                          )}
                        </div>
                      </m.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Navigation Dots below stack */}
            {offers.length > 1 && (
              <div className="flex gap-2 justify-center mt-8 z-30 relative">
                {offers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none",
                      currentIndex === i ? "bg-brand-gold w-4" : "bg-brand-charcoal/20"
                    )}
                    aria-label={`Go to offer ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
