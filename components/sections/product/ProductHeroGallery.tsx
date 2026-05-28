"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Product, BranchStock } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { MessageCircle, Calendar, Phone, Heart, Share2, MapPin, ShieldCheck, ChevronLeft, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductHeroGalleryProps {
  product: Product;
}

export function ProductHeroGallery({ product }: ProductHeroGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"product" | "appointment" | "contact">("product");

  const handleAction = (type: "product" | "appointment" | "contact") => {
    setEnquiryType(type);
    if (product.branches.length === 1) {
      const b = product.branches[0];
      window.open(getWhatsAppUrl(product, b.whatsapp, b.branchName, type), "_blank");
    } else {
      setShowBranchSelector(true);
    }
  };

  const handleBranchSelect = (branch: BranchStock) => {
    window.open(getWhatsAppUrl(product, branch.whatsapp, branch.branchName, enquiryType), "_blank");
    setShowBranchSelector(false);
  };

  return (
    <>
      <section className="w-full bg-white pt-36 lg:pt-40 pb-20 overflow-hidden">
        <div className="section-container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/30 hover:text-brand-gold transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Collections
            </Link>
            <span className="text-brand-charcoal/15">/</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/50">{product.brand}</span>
            <span className="text-brand-charcoal/15">/</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal line-clamp-1 max-w-[180px]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

            {/* ── LEFT: Gallery ── */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Main Image */}
              <div className="relative aspect-[4/5] bg-[#F5F3EF] rounded-[3px] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.images[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {product.isInHouseProduct ? (
                    <span className="bg-brand-gold text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-lg rounded-[2px]">
                      ✦ Emirates Signature
                    </span>
                  ) : product.isNewArrival ? (
                    <span className="bg-brand-charcoal text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-[2px]">
                      New Arrival
                    </span>
                  ) : null}
                </div>

                {/* Hover Actions */}
                <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 z-10">
                  <button
                    onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                    className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-brand-gold hover:text-white transition-all shadow-lg"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "flex-shrink-0 w-20 aspect-[3/4] rounded-[3px] overflow-hidden border-2 transition-all duration-400",
                        activeImage === idx
                          ? "border-brand-gold opacity-100"
                          : "border-transparent opacity-40 hover:opacity-80 hover:border-brand-charcoal/20"
                      )}
                    >
                      <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: Info Panel ── */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 flex flex-col gap-8">

                {/* Brand & Collection */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.35em]">
                      {product.isInHouseProduct && product.signatureCollectionName
                        ? product.signatureCollectionName
                        : product.brand}
                    </span>
                    <div className="flex-1 h-[1px] bg-brand-gold/20" />
                    <span className="text-[9px] font-bold text-brand-charcoal/25 uppercase tracking-[0.2em]">
                      {product.collectionType || product.style}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-extralight font-heading uppercase tracking-tight text-brand-charcoal leading-[0.92] mb-6">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-light text-brand-charcoal">
                      {product.price > 0
                        ? `₹${product.price.toLocaleString("en-IN")}`
                        : "Price on Request"}
                    </span>
                    {product.price > 0 && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30">Enquire for best offer</span>
                    )}
                  </div>

                  <p className="text-brand-charcoal/55 font-light leading-relaxed text-[15px] italic font-serif border-l-2 border-brand-gold/30 pl-4">
                    "{product.description}"
                  </p>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2.5 py-4 border-y border-black/[0.06]">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-emerald-600">Available for Enquiry</span>
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/30">
                    {product.branches.length} Location{product.branches.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleAction("product")}
                    className="w-full py-5 bg-brand-charcoal text-white hover:bg-brand-gold text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 rounded-[3px] transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.3)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire Now via WhatsApp
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAction("appointment")}
                      className="py-4 border border-brand-charcoal/10 hover:border-brand-gold text-brand-charcoal hover:text-brand-gold text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-[3px] transition-all duration-500"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Appointment
                    </button>
                    <button
                      onClick={() => handleAction("contact")}
                      className="py-4 border border-brand-charcoal/10 hover:border-brand-gold text-brand-charcoal hover:text-brand-gold text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-[3px] transition-all duration-500"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Contact Branch
                    </button>
                  </div>
                </div>

                {/* Trust Pillars */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {[
                    { icon: ShieldCheck, label: "Authentic" },
                    { icon: MapPin, label: "Multi-Branch" },
                    { icon: Share2, label: "Warranty" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-3 bg-[#FAF9F6] rounded-[3px] group hover:bg-brand-gold/5 transition-colors">
                      <item.icon className="w-4 h-4 text-brand-gold" />
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">{item.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Mobile Floating CTA */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-[100] p-4 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => handleAction("product")}
            className="w-full py-4 bg-brand-charcoal text-white hover:bg-brand-gold text-[10px] font-bold uppercase tracking-[0.25em] rounded-[3px] transition-all duration-500"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* ── Branch Selector ── */}
      <AnimatePresence>
        {showBranchSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setShowBranchSelector(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-charcoal w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[1.5rem] p-8"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.35em] block mb-1">Select Location</span>
                  <h3 className="text-base font-bold text-white uppercase tracking-tighter">Choose Your Branch</h3>
                </div>
                <button
                  onClick={() => setShowBranchSelector(false)}
                  className="p-2 text-white/30 hover:text-brand-gold rounded-full hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-[55vh] overflow-y-auto" data-lenis-prevent>
                {product.branches.map((branch) => (
                  <button
                    key={branch.branchSlug}
                    onClick={() => handleBranchSelect(branch)}
                    className="w-full p-4 border border-white/[0.06] hover:border-brand-gold/30 hover:bg-white/[0.03] rounded-xl flex items-center justify-between group/b transition-all duration-400"
                  >
                    <div className="text-left">
                      <span className="text-sm font-bold text-white uppercase tracking-tight block mb-1 group-hover/b:text-brand-gold transition-colors">
                        {branch.branchName}
                      </span>
                      <span className={cn(
                        "text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px]",
                        branch.stockStatus === "In Stock"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-amber-400 bg-amber-500/10"
                      )}>
                        {branch.stockStatus}
                      </span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-white/20 group-hover/b:text-brand-gold rotate-180 group-hover/b:translate-x-1 transition-all duration-400" />
                  </button>
                ))}
              </div>
              <p className="text-center text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mt-6 pt-5 border-t border-white/[0.06]">
                Tap a branch to open WhatsApp
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
