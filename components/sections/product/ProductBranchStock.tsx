"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/shop";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MapPin, MessageCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { getWhatsAppUrl } from "@/lib/shop/whatsapp";

interface ProductBranchStockProps {
  product: Product;
}

export function ProductBranchStock({ product }: ProductBranchStockProps) {
  const handleAction = (type: "product" | "appointment" | "contact", branchPhone: string, branchName: string) => {
    window.open(getWhatsAppUrl(product, branchPhone, branchName, type), "_blank");
  };

  return (
    <section className="w-full bg-brand-pearl/30 section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-6">
                Available Across<br /><em className="italic text-brand-gold">Kerala Branches</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brand-charcoal/60 font-light leading-relaxed">
                Visit your nearest Emirates Optician branch for expert consultation, professional eye testing, and personalized styling assistance for this collection.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.4}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-[1px] bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Real-Time Availability</span>
            </div>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.branches.map((branch) => (
            <StaggerItem key={branch.branchSlug}>
              <div className="group bg-white p-8 border border-black/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-brand-pearl rounded-full text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-[8px] font-bold uppercase px-2 py-1 tracking-widest",
                    branch.stockStatus === "In Stock" ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50"
                  )}>
                    {branch.stockStatus}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 group-hover:text-brand-gold transition-colors">
                  {branch.branchName}
                </h3>
                <p className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-widest mb-10">
                  Kerala, India
                </p>

                <div className="mt-auto space-y-3">
                  <LuxuryButton 
                    className="w-full bg-brand-charcoal text-white hover:bg-brand-gold py-4 text-[9px] uppercase font-bold tracking-widest flex items-center justify-center gap-2"
                    onClick={() => handleAction("product", branch.whatsapp, branch.branchName)}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Enquire Now
                  </LuxuryButton>
                  <button className="w-full text-center text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 hover:text-brand-gold transition-colors py-2 flex items-center justify-center gap-1 group/link">
                    View Branch Details
                    <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
