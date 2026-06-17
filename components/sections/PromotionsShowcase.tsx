"use client";

import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { getOffers } from "@/actions/cms-marketing";
import { MapPin, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Offer {
  id: string;
  title: string;
  description: string;
  percentage: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
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
            
            // Parse YYYY-MM-DD in local time to avoid false off-by-one UTC timezone mismatches
            if (o.endDate) {
              const [y, m, d] = o.endDate.split("-").map(Number);
              const eDate = new Date(y, m - 1, d);
              eDate.setHours(23, 59, 59, 999);
              if (eDate < now) return false;
            }
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
            imageUrl: o.imageUrl,
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
    }, 7000); 
    return () => clearInterval(timer);
  }, [offers.length]);

  const hasImages = offers.some(o => o.imageUrl);

  return (
    <section className="relative bg-[#FAF9F6] section-padding overflow-hidden border-t border-[#E8E4DC]" id="homepage-promotions">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="section-container flex flex-col relative z-10">
        
        {/* Inner Grid Split Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Column: Editorial Header */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col text-left space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-brand-charcoal font-heading leading-[1.1] tracking-tight uppercase">
              Exclusive <br />
              <span className="italic font-light text-brand-gold lowercase font-serif">Campaigns</span>
            </h2>
            
            <p className="text-sm md:text-[15px] text-neutral-600 leading-relaxed font-light max-w-md">
              Unlock seasonal curated advantages, product launches, and priority services across all Emirates Opticals showrooms.
            </p>
          </m.div>

          {/* Right Column: Stack of Cards */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className={cn(
              "relative w-full transition-all duration-500",
              offers.length === 0 ? "h-[220px]" : hasImages ? "h-[490px] md:h-[410px]" : "h-[370px] md:h-[390px]"
            )}>
              {offers.length === 0 ? (
                // No Offers Fallback
                <m.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-[#FAF9F6] border border-[#E8E4DC] p-4 flex flex-col items-center justify-center text-center shadow-sm"
                >
                  <div className="w-full h-full border border-brand-gold/10 flex flex-col items-center justify-center p-8 bg-white relative">
                    <div className="absolute inset-1 border border-brand-gold/5 pointer-events-none" />
                    <p className="text-brand-charcoal/40 uppercase tracking-[0.25em] font-bold text-[9px] mb-2">Exclusive Privileges</p>
                    <h3 className="text-lg md:text-xl font-normal text-brand-charcoal font-heading leading-snug uppercase tracking-wide">
                      Currently No Active Campaigns
                    </h3>
                  </div>
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
                          y: position * 18,
                          scale: 1 - position * 0.04,
                          opacity: position === 0 ? 1 : position === 1 ? 0.6 : 0.2,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className={cn(
                          "absolute inset-x-0 top-0 bg-[#FAF9F6] text-brand-charcoal border border-[#E8E4DC] flex flex-col hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500 shadow-xl overflow-hidden p-3 md:p-4",
                          isTop ? "cursor-pointer pointer-events-auto" : "pointer-events-none select-none",
                          hasImages ? "h-[470px] md:h-[390px]" : "h-[350px] md:h-[370px]"
                        )}
                        onClick={() => {
                          if (isTop && offers.length > 1) {
                            setCurrentIndex((prev) => (prev + 1) % offers.length);
                          }
                        }}
                      >
                        {offer.imageUrl ? (
                          <div className="flex flex-col md:flex-row w-full h-full bg-white border border-[#E8E4DC] relative">
                            {/* Inner Golden Double Filament Frame */}
                            <div className="absolute inset-1 border-2 border-double border-brand-gold/15 pointer-events-none z-10" />

                            {/* Left Side: Padded Campaign Image Frame */}
                            <div className="w-full md:w-[45%] h-[180px] md:h-full relative overflow-hidden shrink-0 bg-[#F5F2EC] p-2 border-b md:border-b-0 md:border-r border-[#E8E4DC]">
                              <div className="w-full h-full overflow-hidden relative border border-brand-gold/10">
                                <img 
                                  src={offer.imageUrl} 
                                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105" 
                                  alt={offer.title} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                              </div>
                            </div>
                            
                            {/* Right Side: Editorial Campaign Details */}
                            <div className="flex-1 min-w-0 p-6 md:p-8 flex flex-col justify-between h-[250px] md:h-full relative z-20">
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="border border-brand-gold/30 text-brand-gold text-[9px] uppercase tracking-[0.25em] px-3.5 py-1.5 font-bold bg-brand-gold/[0.03]">
                                    {offer.percentage}
                                  </span>
                                  {/* Fine serial code logo watermarking */}
                                  <span className="text-[8px] font-mono text-brand-charcoal/30 tracking-widest hidden lg:inline-block">EM-PRV-{offer.id.slice(-4).toUpperCase()}</span>
                                </div>
                                
                                <h3 className="text-xl md:text-2xl font-light text-brand-charcoal font-heading leading-tight tracking-wide line-clamp-2 uppercase break-words">
                                  {offer.title}
                                </h3>
                                
                                <p className="text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light line-clamp-3 break-words">
                                  {offer.description}
                                </p>
                              </div>
                              
                              <div className="flex flex-col gap-2 pt-4 border-t border-[#E8E4DC]/60">
                                {offer.branchId && (
                                  <div className="flex items-center gap-2.5 text-[9px] text-brand-charcoal/50 uppercase tracking-[0.2em] font-extrabold">
                                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                                    <span className="truncate">{offer.branchId}</span>
                                  </div>
                                )}
                                {(offer.startDate || offer.endDate) && (
                                  <div className="flex items-center gap-2.5 text-[9px] text-brand-charcoal/50 uppercase tracking-[0.2em] font-extrabold">
                                    <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                                    <span className="truncate">
                                      {offer.startDate ? new Date(offer.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Immediate"}
                                      {" — "}
                                      {offer.endDate ? new Date(offer.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Ongoing"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Text-only premium framed style
                          <div className="w-full h-full bg-white border border-[#E8E4DC] relative p-8 md:p-10 flex flex-col justify-between">
                            {/* Inner Golden Double Filament Frame */}
                            <div className="absolute inset-1 border-2 border-double border-brand-gold/15 pointer-events-none z-10" />

                            <div className="space-y-6 relative z-20">
                              <div className="flex justify-between items-center">
                                <span className="border border-brand-gold/30 text-brand-gold text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-bold bg-brand-gold/[0.03]">
                                  {offer.percentage}
                                </span>
                                <span className="text-[8px] font-mono text-brand-charcoal/30 tracking-widest">EM-PRV-{offer.id.slice(-4).toUpperCase()}</span>
                              </div>
                              
                              <h3 className="text-2xl md:text-3xl font-light text-brand-charcoal font-heading leading-tight tracking-wide uppercase break-words">
                                {offer.title}
                              </h3>
                              
                              <p className="text-sm md:text-[15px] text-brand-charcoal/60 leading-relaxed font-light mt-4 line-clamp-4 break-words">
                                {offer.description}
                              </p>
                            </div>
                            
                            <div className="flex flex-col gap-3 pt-6 border-t border-[#E8E4DC]/60 relative z-20">
                              {offer.branchId && (
                                <div className="flex items-center gap-3 text-[10px] text-brand-charcoal/50 uppercase tracking-[0.2em] font-extrabold">
                                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                                  <span className="truncate">{offer.branchId}</span>
                                </div>
                              )}
                              {(offer.startDate || offer.endDate) && (
                                <div className="flex items-center gap-3 text-[10px] text-brand-charcoal/50 uppercase tracking-[0.2em] font-extrabold">
                                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                                  <span className="truncate">
                                    {offer.startDate ? new Date(offer.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Immediate"}
                                    {" — "}
                                    {offer.endDate ? new Date(offer.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Ongoing"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </m.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Premium Editorial Controls and Slide Progress Indicators */}
            {offers.length > 1 && (
              <div className="flex items-center gap-6 mt-8 z-30 relative">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length)}
                  className="w-10 h-10 rounded-full border border-brand-charcoal/10 hover:border-brand-gold flex items-center justify-center text-brand-charcoal hover:text-brand-gold transition-all duration-300 group bg-white shadow-sm"
                  aria-label="Previous Campaign"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5 stroke-[1.5]" />
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-brand-charcoal tracking-wider">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="w-16 h-[2px] bg-brand-charcoal/5 relative overflow-hidden rounded-full">
                    <m.div 
                      className="absolute left-0 top-0 h-full bg-brand-gold" 
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentIndex + 1) / offers.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  
                  <span className="text-[10px] font-extrabold text-brand-charcoal/30 tracking-wider">
                    {String(offers.length).padStart(2, '0')}
                  </span>
                </div>
                
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % offers.length)}
                  className="w-10 h-10 rounded-full border border-brand-charcoal/10 hover:border-brand-gold flex items-center justify-center text-brand-charcoal hover:text-brand-gold transition-all duration-300 group bg-white shadow-sm"
                  aria-label="Next Campaign"
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 stroke-[1.5]" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
