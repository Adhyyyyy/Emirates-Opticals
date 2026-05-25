"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { getOffers } from "@/actions/cms-marketing";
import Link from "next/link";
import { ArrowRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Offer {
  id: string;
  title: string;
  description: string;
  promoCode: string;
  discountVal?: string;
}

const FALLBACK_OFFERS: Offer[] = [
  {
    id: "promo-1",
    title: "Ramadan Premium Edit",
    description: "Enjoy up to 30% off on all luxury brands, including Prada, Gucci, and Cartier sunglasses.",
    promoCode: "EID30",
    discountVal: "30% OFF",
  },
  {
    id: "promo-2",
    title: "Complimentary Eye Assessment",
    description: "Schedule a comprehensive diagnostic eye examination with our senior expert optometrists.",
    promoCode: "EXPERT26",
    discountVal: "Free Clinical",
  },
  {
    id: "promo-3",
    title: "Cartier Prestige Gift",
    description: "Receive a bespoke leather collector case with every Cartier Eyewear acquisition.",
    promoCode: "CARTIER26",
    discountVal: "Prestige Gift",
  }
];

export function PromotionsShowcase() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Stable page URL — empty string on server, real href once on client
  const pageHref = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await getOffers();
        let activeList: Offer[] = [];
        if (data && data.length > 0) {
          const now = new Date();
          const active = data.filter((o: { isActive: boolean; startDate?: string; endDate?: string }) => {
            if (!o.isActive) return false;
            if (o.startDate && new Date(o.startDate) > now) return false;
            if (o.endDate && new Date(o.endDate) < now) return false;
            return true;
          });
          activeList = active.map((o: { id: string; title: string; description: string; promoCode: string; discountVal?: string }) => ({
            id: o.id,
            title: o.title,
            description: o.description,
            promoCode: o.promoCode,
            discountVal: o.discountVal || "Exclusive Offer",
          }));
        }

        // Supplement active list with fallback offers if length is less than 3
        const combined = [...activeList];
        for (const fallback of FALLBACK_OFFERS) {
          if (combined.length >= 3) break;
          if (!combined.some((item) => item.promoCode === fallback.promoCode)) {
            combined.push(fallback);
          }
        }
        setOffers(combined);
      } catch (e) {
        console.warn("Failed to fetch CRM offers, using fallbacks:", e);
        setOffers(FALLBACK_OFFERS);
      }
    }
    loadOffers();
  }, []);

  const displayOffers = offers.length > 0 ? offers : FALLBACK_OFFERS;

  // Auto-shuffle timer if there are multiple offers
  useEffect(() => {
    if (displayOffers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayOffers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayOffers.length]);

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDragEnd = (_event: unknown, info: { offset: { x: number; y: number } }) => {
    // If swiped up past threshold, shuffle card to back
    if (info.offset.y < -80) {
      setCurrentIndex((prev) => (prev + 1) % displayOffers.length);
    }
  };

  return (
    <section className="bg-neutral-950 py-20 overflow-hidden" id="homepage-promotions">
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
            <span className="meta-editorial-light mb-3 block">
              Limited Campaigns
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight font-heading mb-6 uppercase tracking-tight">
              Exclusive <br />
              <span className="italic font-light text-amber-400">Promotions</span>
            </h2>
            <p className="text-sm md:text-[15px] text-neutral-400 leading-relaxed font-light max-w-md">
              Unlock access to premium privileges and seasonal optical curation. Claim code instantly on WhatsApp or apply it directly at checkout.
            </p>
          </m.div>

          {/* Right Column: Stack of Cards */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-full h-[340px] md:h-[360px]">
              <AnimatePresence mode="popLayout">
                {displayOffers.map((offer, idx) => {
                  // Calculate stack position relative to currentIndex
                  let position = idx - currentIndex;
                  if (position < 0) {
                    position += displayOffers.length;
                  }

                  // Only render the top 3 cards in the stack to prevent clutter
                  if (position > 2) return null;

                  const isTop = position === 0;

                  const waUrl = `https://wa.me/919682929968?text=Hi%20Emirates%20Opticians%2C%20I%20would%20like%20to%20claim%20the%20promo%20offer%20${offer.promoCode}%20(${encodeURIComponent(offer.title)}).`;
                  const shareText = encodeURIComponent(`Check out this exclusive campaign at Emirates Opticians: "${offer.title}" - Use promo code ${offer.promoCode}!\n\n`);
                  const shareUrl = `https://api.whatsapp.com/send?text=${shareText}${encodeURIComponent(pageHref)}`;

                  return (
                    <m.div
                      key={offer.id}
                      style={{
                        zIndex: displayOffers.length - position,
                        transformOrigin: "bottom center",
                      }}
                      drag={isTop ? "y" : false}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={{ top: 1, bottom: 0.2 }}
                      onDragEnd={handleDragEnd}
                      animate={{
                        y: position * 16, // Shift downward
                        scale: 1 - position * 0.04, // Scale down slightly
                        opacity: position === 0 ? 1 : position === 1 ? 0.6 : 0.2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className={cn(
                        "absolute inset-x-0 top-0 bg-neutral-900 rounded-2xl border border-white/10 p-6 flex flex-col gap-4 hover:border-amber-400/30 transition-all duration-300 shadow-2xl",
                        isTop ? "cursor-pointer pointer-events-auto" : "pointer-events-none select-none"
                      )}
                      onClick={() => {
                        if (isTop && displayOffers.length > 1) {
                          setCurrentIndex((prev) => (prev + 1) % displayOffers.length);
                        }
                      }}
                    >
                      {/* Top Row displaying badge and share icon */}
                      <div className="flex justify-between items-center">
                        <span className="bg-amber-400/10 text-amber-400 text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full font-bold">
                          {offer.discountVal || "Offer"}
                        </span>
                        <a
                          href={shareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                          aria-label="Share promo"
                          onClick={(e) => e.stopPropagation()}
                          suppressHydrationWarning
                        >
                          <Share2 className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Title and Body */}
                      <div>
                        <h3 className="text-xl font-semibold text-white font-heading">
                          {offer.title}
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light mt-2">
                          {offer.description}
                        </p>
                      </div>

                      {/* Promo Code Row */}
                      <div className="bg-neutral-800 rounded-xl px-4 py-3 flex justify-between items-center">
                        <span className="font-mono text-white text-sm font-bold">
                          {offer.promoCode}
                        </span>
                        <button
                          onClick={(e) => handleCopyCode(offer.promoCode, e)}
                          className="text-xs text-neutral-400 hover:text-white cursor-pointer transition-colors font-medium focus:outline-none"
                        >
                          {copiedCode === offer.promoCode ? "COPIED" : "COPY"}
                        </button>
                      </div>

                      {/* CTA Row */}
                      <div className="flex justify-between items-center mt-2">
                        <Link
                          href="/shop"
                          className="text-xs uppercase tracking-[0.15em] text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Explore Catalog <ArrowRight className="w-3 h-3" />
                        </Link>
                        
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-white hover:bg-white/5 transition-all font-bold"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Claim
                        </a>
                      </div>

                    </m.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Dots below stack */}
            {displayOffers.length > 1 && (
              <div className="flex gap-2 justify-center mt-6 z-30 relative">
                {displayOffers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none",
                      currentIndex === i ? "bg-amber-400 w-4" : "bg-white/30"
                    )}
                    aria-label={`Go to promo ${i + 1}`}
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
