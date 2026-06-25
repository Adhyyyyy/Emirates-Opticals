"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product, BranchStock } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { MessageCircle, Calendar, Phone, Share2, MapPin, ShieldCheck, ChevronRight, X, ArrowLeft, Sparkles } from "lucide-react";
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

  // Group specs beautifully for clean, typographic presentation
  const specs = [
    { label: "Collection", value: product.collectionType || "Designer Brands" },
    { label: "Frame Material", value: product.frameMaterial || "Premium Cellulose Acetate" },
    { label: "Lens Type", value: product.lensType || "Precision Demo Lens" },
    { label: "Silhouette Shape", value: product.frameShape || "Standard Geometric" },
    { label: "Gender Profile", value: product.gender || "Unisex" },
    { label: "Style Direction", value: product.style || "Modern Editorial" },
    ...(product.craftsmanshipDetails ? [{ label: "Craftsmanship", value: product.craftsmanshipDetails, fullWidth: true }] : []),
    ...(product.recommendedUsage ? [{ label: "Recommendation", value: product.recommendedUsage, fullWidth: true }] : []),
  ];

  return (
    <>
      <section className="w-full bg-white pt-28 md:pt-32 pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Elegant Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 md:mb-12">
            <Link
              href="/shop"
              className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/30 hover:text-brand-gold transition-colors flex items-center gap-1.5 group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Catalog
            </Link>
            <span className="text-brand-charcoal/10 text-[9px] font-bold">/</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40">{product.brand}</span>
            <span className="text-brand-charcoal/10 text-[9px] font-bold">/</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal line-clamp-1 max-w-[150px]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">
            
            {/* ── LEFT COLUMN: Elegant Gallery ── */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
              {/* Vertical Thumbnail List for Desktop */}
              {product.images.length > 1 && (
                <div className="hidden md:flex flex-col gap-3 shrink-0 max-h-[500px] overflow-y-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "w-16 aspect-[3/4] rounded-[2px] relative overflow-hidden border transition-all duration-300",
                        activeImage === idx
                          ? "border-brand-gold opacity-100 shadow-md"
                          : "border-transparent opacity-40 hover:opacity-80"
                      )}
                    >
                      <Image src={img} alt={`Product view ${idx + 1}`} fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Master Display Image */}
              <div className="flex-1 relative aspect-[3/4] bg-brand-pearl/20 rounded-[3px] overflow-hidden border border-black/[0.02]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={product.images[activeImage]}
                          alt={product.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                {/* Subtle Signature Badge */}
                {product.isInHouseProduct && (
                  <span className="absolute top-4 left-4 bg-brand-charcoal border border-brand-gold/30 text-brand-gold text-[7px] font-bold uppercase tracking-[0.22em] px-3 py-1.5 rounded-[2px] shadow-lg flex items-center gap-1.5 z-10">
                    <Sparkles className="w-2.5 h-2.5 text-brand-gold" />
                    Emirates Signature
                  </span>
                )}
              </div>

              {/* Horizontal Thumbnail Strip for Mobile */}
              {product.images.length > 1 && (
                <div className="flex md:hidden gap-3 overflow-x-auto pb-1 mt-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "w-14 aspect-[3/4] shrink-0 relative rounded-[2px] overflow-hidden border transition-all",
                        activeImage === idx ? "border-brand-gold opacity-100" : "border-transparent opacity-40"
                      )}
                    >
                      <Image src={img} alt={`Product view ${idx + 1}`} fill sizes="56px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: Editorial Sticky Sidebar ── */}
            <div className="lg:col-span-5 sticky top-36">
              <div className="flex flex-col gap-8">
                
                {/* Product Title & Brand Block */}
                <div>
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.35em] block mb-3">
                    {product.brand}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extralight font-heading uppercase tracking-tight text-brand-charcoal leading-tight mb-4">
                    {product.name}
                  </h1>

                  {/* Clean Price */}
                  <div className="text-xl font-light text-brand-charcoal tracking-tight">
                    {product.price > 0
                      ? `₹${product.price.toLocaleString("en-IN")}`
                      : "Price on Request"}
                  </div>
                </div>

                {/* Clean Narrative Description */}
                {product.description && (
                  <p className="text-brand-charcoal/65 font-light leading-relaxed text-[13px] border-l border-brand-gold/20 pl-4 italic">
                    "{product.description}"
                  </p>
                )}

                {/* Available Colors Badges */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex flex-col gap-2.5 pt-4">
                    <span className="text-[8.5px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40">Available Colors</span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span 
                          key={color} 
                          className="bg-brand-pearl/50 border border-black/5 hover:border-brand-gold/40 text-brand-charcoal text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-[3px] transition-colors duration-300"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data-Rich Specifications Table (Typographic Elegance) */}
                <div className="border-t border-black/[0.06] pt-6">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40 mb-4">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
                    {specs.map((spec: any, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex flex-col pb-3 border-b border-black/[0.02]",
                          spec.fullWidth ? "col-span-2" : "col-span-1"
                        )}
                      >
                        <span className="text-[7.5px] font-bold uppercase tracking-wider text-brand-charcoal/30 mb-0.5">
                          {spec.label}
                        </span>
                        <span className="text-[11px] font-medium text-brand-charcoal/80 uppercase tracking-tight break-words">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>



                {/* Unified Premium Editorial CTAs */}
                <div className="border-t border-black/[0.06] pt-6 space-y-3">
                  <button
                    onClick={() => handleAction("product")}
                    className="w-full py-4.5 bg-brand-charcoal text-white hover:bg-brand-gold text-[9px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 rounded-[3px] transition-all duration-500 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire via WhatsApp
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAction("appointment")}
                      className="py-3.5 border border-black/[0.08] hover:border-brand-gold text-brand-charcoal hover:text-brand-gold text-[8.5px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-[3px] transition-all duration-500"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Eye Test
                    </button>
                    <button
                      onClick={() => handleAction("contact")}
                      className="py-3.5 border border-black/[0.08] hover:border-brand-gold text-brand-charcoal hover:text-brand-gold text-[8.5px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-[3px] transition-all duration-500"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Contact Lounge
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Mobile Floating CTA Strip ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[100] p-4 bg-white/95 backdrop-blur-md border-t border-black/[0.05] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => handleAction("product")}
          className="w-full py-4 bg-brand-charcoal text-white text-[9px] font-bold uppercase tracking-[0.25em] rounded-[3px]"
        >
          Enquire Availability
        </button>
      </div>

      {/* ── Multi-Branch Boutique Location Selector ── */}
      <AnimatePresence>
        {showBranchSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setShowBranchSelector(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-charcoal w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[1rem] p-8 shadow-[0_-20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.35em] block mb-1">Select Lounge</span>
                  <h3 className="text-base font-bold text-white uppercase tracking-tighter">Choose Boutique Branch</h3>
                </div>
                <button
                  onClick={() => setShowBranchSelector(false)}
                  className="p-2 text-white/30 hover:text-brand-gold rounded-full transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto" data-lenis-prevent>
                {[...product.branches]
                  .sort((a, b) => {
                    const priority: Record<string, number> = { "In Stock": 3, "Low Stock": 2, "Out of Stock": 1 };
                    return (priority[b.stockStatus] || 0) - (priority[a.stockStatus] || 0);
                  })
                  .map((branch) => (
                    <button
                      key={branch.branchSlug}
                      onClick={() => handleBranchSelect(branch)}
                      className="w-full p-4 border border-white/[0.05] hover:border-brand-gold/30 hover:bg-white/[0.02] rounded-[3px] flex items-center justify-between group/b transition-all duration-300"
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
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover/b:text-brand-gold group-hover/b:translate-x-1 transition-all" />
                    </button>
                  ))}
              </div>
              <p className="text-center text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mt-6 pt-5 border-t border-white/[0.05]">
                Tap branch to connect instantly on WhatsApp
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
