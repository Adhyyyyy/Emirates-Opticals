"use client";

import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, Ticket, Copy, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getOffers } from "@/actions/cms-marketing";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import Link from "next/link";

export function PromotionsShowcase() {
  const [offers, setOffers] = useState<any[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    async function loadOffers() {
      const data = await getOffers();
      if (data) {
        const now = new Date();
        const active = data.filter((o: any) => {
          if (!o.isActive) return false;
          if (o.startDate && new Date(o.startDate) > now) return false;
          if (o.endDate && new Date(o.endDate) < now) return false;
          return true;
        });
        setOffers(active);
      }
    }
    loadOffers();
  }, []);


  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (offers.length === 0) return null;

  return (
    <section className="bg-black text-white section-padding overflow-hidden border-t-[1.5px] border-white/10 relative">
      {/* Decorative Editorial Background Shine */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-tight relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-brand-gold" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
                Limited Campaigns
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal uppercase tracking-tighter leading-none">
              Exclusive <br />
              <em className="italic font-light text-brand-gold/80">Promotions</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="body-editorial text-white/50 max-w-sm">
              Unlock access to premium privileges and seasonal optical curation. Copy code at checkout or mention to your personal stylist.
            </p>
          </Reveal>
        </div>

        {/* Promotions Grid */}
        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <StaggerItem key={offer.id}>
              <div className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-brand-gold/30 hover:bg-white/[0.07] transition-all duration-700 flex flex-col justify-between h-[360px] relative overflow-hidden">
                
                {/* Visual Flair Background */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-gold/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
                
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 bg-brand-gold/10 text-brand-gold rounded-full flex items-center gap-1.5 border border-brand-gold/20">
                      <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                      {offer.discountVal || "Active"}
                    </span>
                    <Ticket className="w-4 h-4 text-white/20 group-hover:text-brand-gold transition-colors duration-500" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-brand-gold transition-colors duration-500">
                      {offer.title}
                    </h3>
                    <p className="text-xs font-light text-white/60 leading-relaxed max-w-xs">
                      {offer.description}
                    </p>
                  </div>
                </div>

                {/* Bottom interactive Code Banner */}
                <div className="space-y-6">
                  <div className="w-full flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-2xl group-hover:border-white/15 transition-all">
                    <div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 block mb-1">PROMO CODE</span>
                      <span className="text-xs font-extrabold tracking-[0.1em] text-white font-mono">{offer.promoCode}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleCopyCode(offer.promoCode)}
                      className={cn(
                        "p-3 rounded-xl transition-all duration-300 flex items-center gap-2",
                        copiedCode === offer.promoCode 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {copiedCode === offer.promoCode ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-extrabold uppercase tracking-widest">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-extrabold uppercase tracking-widest">COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Action Link */}
                  <Link 
                    href="/shop" 
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold hover:text-white transition-colors group/btn"
                  >
                    <span>Apply to Catalog</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
