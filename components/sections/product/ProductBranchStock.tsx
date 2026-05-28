"use client";

import React from "react";
import { Product } from "@/types/shop";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { MapPin, MessageCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { m } from "framer-motion";
import Link from "next/link";

interface ProductBranchStockProps {
  product: Product;
}

export function ProductBranchStock({ product }: ProductBranchStockProps) {
  const handleAction = (type: "product" | "appointment" | "contact", branchPhone: string, branchName: string) => {
    window.open(getWhatsAppUrl(product, branchPhone, branchName, type), "_blank");
  };

  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="section-container">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <m.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-4"
            >
              Showroom Availability
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extralight font-heading uppercase tracking-tight text-brand-charcoal leading-[0.95]"
            >
              Find at Your<br />
              <em className="italic font-light text-brand-gold">Nearest Branch</em>
            </m.h2>
          </div>
          <Reveal delay={0.3}>
            <p className="text-brand-charcoal/50 font-light leading-relaxed text-sm max-w-xs">
              Visit any of our branches for expert eye testing, professional fitting, and personalised styling — complimentary with every enquiry.
            </p>
          </Reveal>
        </div>

        {/* Branch Cards */}
        {product.branches.length > 0 ? (
          <GridStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {product.branches.map((branch) => (
              <StaggerItem key={branch.branchSlug}>
                <div className="group flex flex-col h-full border border-black/[0.06] hover:border-brand-gold/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-700 rounded-[3px] overflow-hidden">

                  {/* Card Header */}
                  <div className="bg-[#FAF9F6] p-6 flex items-start justify-between border-b border-black/[0.04]">
                    <div className="p-2.5 bg-white border border-black/[0.06] rounded-full group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors duration-700">
                      <MapPin className="w-4 h-4 text-brand-gold group-hover:text-white transition-colors duration-700" />
                    </div>
                    <span className={cn(
                      "text-[7px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[2px]",
                      branch.stockStatus === "In Stock"
                        ? "text-emerald-600 bg-emerald-50"
                        : branch.stockStatus === "Low Stock"
                        ? "text-amber-600 bg-amber-50"
                        : "text-red-500 bg-red-50"
                    )}>
                      {branch.stockStatus}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter mb-1 group-hover:text-brand-gold transition-colors duration-500">
                      {branch.branchName}
                    </h3>
                    <p className="text-[9px] font-bold text-brand-charcoal/25 uppercase tracking-widest mb-6">
                      Kerala, India
                    </p>

                    <div className="mt-auto space-y-2">
                      <button
                        onClick={() => handleAction("product", branch.whatsapp, branch.branchName)}
                        className="w-full py-3.5 bg-brand-charcoal text-white hover:bg-brand-gold text-[8px] font-bold uppercase tracking-[0.22em] flex items-center justify-center gap-2 rounded-[3px] transition-all duration-500"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Enquire Now
                      </button>
                      <Link
                        href={`/branches/${branch.branchSlug}`}
                        className="w-full text-center text-[8px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 hover:text-brand-gold transition-colors py-2 flex items-center justify-center gap-1 group/link"
                      >
                        View Branch
                        <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </GridStagger>
        ) : (
          <div className="text-center py-20 border border-dashed border-black/10 rounded-[3px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30">
              Contact us to check availability
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
