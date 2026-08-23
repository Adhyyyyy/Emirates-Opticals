"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleEnquire = (e: React.MouseEvent, type: "product" | "appointment" | "contact" = "product") => {
    e.preventDefault();
    e.stopPropagation();

    // 1. If uploaded to a single branch with valid WhatsApp, direct to that branch
    if (product.branches && product.branches.length === 1 && product.branches[0]?.whatsapp) {
      const b = product.branches[0];
      window.open(getWhatsAppUrl(product, b.whatsapp, b.branchName, type), "_blank");
      return;
    }

    // 2. If multi-branch or no specific branch assigned -> Auto-redirect to Changanassery Branch
    const changanasseryBranch = product.branches?.find(b => 
      b.branchSlug?.toLowerCase() === "changanassery" || b.branchName?.toLowerCase().includes("changanassery")
    );

    const phone = changanasseryBranch?.whatsapp || "918714032601";
    const name = changanasseryBranch?.branchName || "Changanassery Branch";

    window.open(getWhatsAppUrl(product, phone, name, type), "_blank");
  };

  return (
    <div className="group relative flex flex-col h-full bg-white border border-black/[0.02] p-3 rounded-xl transition-all duration-700 hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] hover:border-brand-gold/20">
      {/* ── Visual Frame Block ── */}
      <Link 
        href={`/product/${product.slug}`} 
        prefetch={true}
        className="block relative overflow-hidden bg-gradient-to-b from-[#FAF9F6] to-[#F5F4F0] aspect-[3/4] rounded-[3px] border border-black/[0.02]"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
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
        <Link href={`/product/${product.slug}`} prefetch={true}>
          <h3 className="text-xs sm:text-sm font-bold font-heading tracking-tight text-brand-charcoal uppercase leading-snug group-hover:text-brand-gold transition-colors duration-500 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Colors Tag Strip */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5 mb-1">
            {product.colors.slice(0, 3).map((color) => (
              <span 
                key={color} 
                className="bg-[#FAF9F6] border border-black/[0.04] text-brand-charcoal/60 text-[6.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[2px]"
              >
                {color}
              </span>
            ))}
            {product.colors.length > 3 && (
              <span className="text-brand-charcoal/30 text-[6.5px] font-bold uppercase tracking-wider px-1 py-0.5">
                +{product.colors.length - 3} More
              </span>
            )}
          </div>
        )}

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

        {/* Editorial Direct WhatsApp Enquire CTA */}
        <button
          onClick={(e) => handleEnquire(e, "product")}
          className="mt-3.5 w-full bg-brand-charcoal hover:bg-brand-gold text-brand-gold hover:text-white border border-brand-charcoal hover:border-brand-gold text-[9px] font-bold uppercase tracking-[0.22em] py-3.5 rounded-[3px] transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg shadow-brand-charcoal/5"
        >
          <MessageCircle className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:scale-110" />
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
}
