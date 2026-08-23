"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { MessageCircle, Calendar, Phone, Share2, MapPin, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";

interface ProductHeroGalleryProps {
  product: Product;
}

export function ProductHeroGallery({ product }: ProductHeroGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  const handleAction = (type: "product" | "appointment" | "contact") => {
    // 1. Single uploaded branch -> direct to that branch
    if (product.branches && product.branches.length === 1 && product.branches[0]?.whatsapp) {
      const b = product.branches[0];
      window.open(getWhatsAppUrl(product, b.whatsapp, b.branchName, type), "_blank");
      return;
    }

    // 2. Multi-branch or zero -> Auto-redirect to Changanassery Branch
    const changanasseryBranch = product.branches?.find(b => 
      b.branchSlug?.toLowerCase() === "changanassery" || b.branchName?.toLowerCase().includes("changanassery")
    );

    const phone = changanasseryBranch?.whatsapp || "918714032601";
    const name = changanasseryBranch?.branchName || "Changanassery Branch";

    window.open(getWhatsAppUrl(product, phone, name, type), "_blank");
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
          <span className="text-[9px] text-brand-charcoal/20">/</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40">
            {product.brand}
          </span>
          <span className="text-[9px] text-brand-charcoal/20">/</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/70 truncate max-w-[180px]">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column: Editorial Gallery Layout ── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary High-Resolution Frame Display */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-b from-[#FAF9F6] to-[#F5F4F0] rounded-[3px] border border-black/[0.04] overflow-hidden group">
              <Image
                src={product.images[activeImage] || product.images[0]}
                alt={`${product.name} - View ${activeImage + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Absolute Editorial Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {product.isInHouseProduct ? (
                  <span className="bg-brand-charcoal border border-brand-gold text-brand-gold text-[8px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-[2px] shadow-xl flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-brand-gold" />
                    Emirates Signature
                  </span>
                ) : product.isNewArrival ? (
                  <span className="bg-white/95 backdrop-blur-md text-brand-charcoal border border-black/5 text-[8px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-[2px] shadow-sm">
                    New Arrival
                  </span>
                ) : null}
              </div>

              <div className="absolute bottom-6 right-6 z-10">
                <span className="bg-black/80 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-[2px]">
                  {activeImage + 1} / {product.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3 pt-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-[2px] overflow-hidden border transition-all duration-300 ${
                      activeImage === idx
                        ? "border-brand-gold ring-1 ring-brand-gold shadow-md"
                        : "border-black/[0.06] hover:border-black/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} Thumbnail ${idx + 1}`}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column: Editorial Product Information Panel ── */}
          <div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-32">
            
            {/* Header Block */}
            <div className="border-b border-black/[0.06] pb-6 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold block mb-2">
                {product.isInHouseProduct && product.signatureCollectionName
                  ? product.signatureCollectionName
                  : product.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading uppercase tracking-tight text-brand-charcoal leading-none mb-4">
                {product.name}
              </h1>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl sm:text-2xl font-bold text-brand-charcoal">
                    {product.price > 0
                      ? `₹${product.price.toLocaleString("en-IN")}`
                      : "Price on Request"}
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Description */}
            {product.description && (
              <div className="mb-8">
                <p className="text-xs sm:text-sm text-brand-charcoal/70 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Colors Strip */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8 border-t border-black/[0.06] pt-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40 block mb-3">
                  Available Colorways ({product.colors.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="bg-[#FAF9F6] border border-black/[0.06] text-brand-charcoal text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[2px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications Grid */}
            <div className="border-t border-black/[0.06] pt-6 mb-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40 block mb-4">
                Frame Specifications
              </span>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {specs.map((spec, i) => (
                  <div key={i} className={spec.fullWidth ? "col-span-2" : "col-span-1"}>
                    <span className="text-[8px] font-bold text-brand-charcoal/30 uppercase tracking-widest block mb-0.5">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase tracking-tight block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp CTAs */}
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
    </section>
  );
}
