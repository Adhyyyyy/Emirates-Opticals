"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Product, BranchStock } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { MessageCircle, MapPin, ChevronRight, X, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"product" | "appointment" | "contact">("product");

  React.useEffect(() => {
    if (showBranchSelector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showBranchSelector]);

  const handleEnquire = (e: React.MouseEvent, type: "product" | "appointment" | "contact") => {
    e.preventDefault();
    e.stopPropagation();
    if (product.branches.length === 1) {
      const branch = product.branches[0];
      window.open(getWhatsAppUrl(product, branch.whatsapp, branch.branchName, type), "_blank");
    } else {
      setEnquiryType(type);
      setShowBranchSelector(true);
    }
  };

  const handleBranchSelect = (branch: BranchStock) => {
    window.open(getWhatsAppUrl(product, branch.whatsapp, branch.branchName, enquiryType), "_blank");
    setShowBranchSelector(false);
  };

  return (
    <>
      <motion.div
        className="group relative flex flex-col h-full bg-white border border-black/[0.02] p-3 rounded-xl transition-all duration-700 hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] hover:border-brand-gold/20"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* ── Visual Frame Block ── */}
        <Link 
          href={`/product/${product.slug}`} 
          className="block relative overflow-hidden bg-gradient-to-b from-[#FAF9F6] to-[#F5F4F0] aspect-[3/4] rounded-[3px] border border-black/[0.02]"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.19,1,0.22,1) group-hover:scale-[1.06]"
          />

          {/* Luxury Vignette Reveal */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* High-End Absolute Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isInHouseProduct ? (
              <span className="bg-brand-charcoal border border-brand-gold text-brand-gold text-[7px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] shadow-lg flex items-center gap-1">
                <Sparkles className="w-2 h-2 text-brand-gold" />
                Emirates Signature
              </span>
            ) : product.isNewArrival ? (
              <span className="bg-white/95 backdrop-blur-md text-brand-charcoal border border-black/5 text-[7px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px]">
                New Arrival
              </span>
            ) : null}
            {product.isFeatured && (
              <span className="bg-brand-gold text-white text-[7px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px]">
                Bestseller
              </span>
            )}
          </div>

          {/* Quick Discover arrow — slides up on hover */}
          <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center shadow-xl">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Location status stripe — slides up on hover */}
          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
            <div className="bg-brand-charcoal/95 backdrop-blur-sm px-4 py-2 flex items-center justify-center gap-1.5">
              <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
              <span className="text-[7.5px] font-bold uppercase tracking-[0.22em] text-white/90">
                {product.branches.length} Branch{product.branches.length !== 1 ? "es" : ""} Available
              </span>
            </div>
          </div>
        </Link>

        {/* ── Product Info Panel ── */}
        <div className="pt-4 pb-1 flex-1 flex flex-col">
          {/* Brand Row */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.25em]">
              {product.isInHouseProduct && product.signatureCollectionName
                ? product.signatureCollectionName
                : product.brand}
            </span>
            {product.style && (
              <span className="text-[7px] font-bold text-brand-charcoal/20 uppercase tracking-[0.15em] border border-black/[0.04] px-1.5 py-0.5 rounded-[2px]">
                {product.style}
              </span>
            )}
          </div>

          {/* Name Header */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-bold font-heading tracking-tight text-brand-charcoal uppercase leading-snug group-hover:text-brand-gold transition-colors duration-500 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Specification Strip */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/[0.04]">
            <span className="text-[8px] font-bold text-brand-charcoal/40 uppercase tracking-wider flex items-center gap-1.5">
              <span>{product.gender}</span>
              {product.frameShape && (
                <>
                  <span className="w-1 h-1 rounded-full bg-black/10" />
                  <span>{product.frameShape}</span>
                </>
              )}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-brand-charcoal">
              {product.price > 0
                ? `₹${product.price.toLocaleString("en-IN")}`
                : "Price on Request"}
            </span>
          </div>

          {/* Editorial Enquire CTA */}
          <button
            onClick={(e) => handleEnquire(e, "product")}
            className="mt-3.5 w-full bg-brand-charcoal hover:bg-brand-gold text-brand-gold hover:text-white border border-brand-charcoal hover:border-brand-gold text-[9px] font-bold uppercase tracking-[0.22em] py-3.5 rounded-[3px] transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg shadow-brand-charcoal/5"
          >
            <MessageCircle className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:scale-110" />
            <span>Enquire Now</span>
          </button>
        </div>
      </motion.div>

      {/* ── Premium Branch Selector Modal ── */}
      <AnimatePresence>
        {showBranchSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setShowBranchSelector(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-charcoal w-full sm:max-w-md rounded-t-[2.5rem] sm:rounded-[1.5rem] p-8 shadow-[0_-20px_80px_rgba(0,0,0,0.5)] border-t sm:border border-white/5"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.35em] block mb-1">Stock Availability</span>
                  <h3 className="text-base font-bold text-white uppercase tracking-tighter">Select a Boutique Branch</h3>
                </div>
                <button
                  onClick={() => setShowBranchSelector(false)}
                  className="p-2 text-white/30 hover:text-brand-gold rounded-full hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1" data-lenis-prevent>
                {product.branches.map((branch) => (
                  <button
                    key={branch.branchSlug}
                    onClick={() => handleBranchSelect(branch)}
                    className="w-full p-4 border border-white/[0.04] hover:border-brand-gold/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-400 flex items-center justify-between group/b rounded-xl"
                  >
                    <div className="text-left">
                      <span className="text-sm font-bold text-white uppercase tracking-tight block mb-1 group-hover/b:text-brand-gold transition-colors">
                        {branch.branchName}
                      </span>
                      <span className={cn(
                        "text-[7px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-[2px]",
                        branch.stockStatus === "In Stock"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-amber-400 bg-amber-500/10"
                      )}>
                        {branch.stockStatus}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover/b:text-brand-gold group-hover/b:translate-x-1 transition-all duration-400" />
                  </button>
                ))}
              </div>

              <p className="text-center text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mt-6 pt-6 border-t border-white/[0.06]">
                Tap branch to connect instantly on WhatsApp
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
