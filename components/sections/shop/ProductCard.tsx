"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Product, BranchStock } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MessageCircle, Calendar, Phone, Heart, ShoppingBag, MapPin, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"product" | "appointment" | "contact">("product");

  const handleEnquire = (type: "product" | "appointment" | "contact") => {
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
    <div 
      className="group relative bg-white border border-black/5 overflow-hidden transition-all duration-700 hover:border-brand-gold/20 hover:shadow-2xl flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-brand-pearl/20">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-brand-gold text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1">New Arrival</span>
          )}
          {product.category === "Luxury Collection" && (
            <span className="bg-brand-charcoal text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1">Luxury</span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-4 right-4 p-2 bg-white/40 backdrop-blur-md rounded-full text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-10"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Branch Availability Info (Mobile Friendly) */}
        <div className="absolute bottom-0 inset-x-0 bg-white/60 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-brand-gold" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-charcoal/60">
              {product.branches.length} Branch{product.branches.length > 1 ? 'es' : ''}
            </span>
          </div>
          <span className={cn(
            "text-[8px] font-bold uppercase px-1.5 py-0.5",
            product.stockStatus === "In Stock" ? "text-green-600" : "text-orange-600"
          )}>
            {product.stockStatus}
          </span>
        </div>
      </Link>

      {/* Product Info Section */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <Link href={`/product/${product.slug}`} className="block mb-4">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-1">
            {product.brand}
          </span>
          <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter leading-tight group-hover:text-brand-gold transition-colors duration-500">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline justify-between mb-8">
          <span className="text-xl font-light text-brand-charcoal">₹{product.price.toLocaleString()}</span>
          <span className="text-[10px] text-brand-charcoal/40 font-medium uppercase tracking-tighter">{product.gender} • {product.frameShape}</span>
        </div>

        {/* Actions - Desktop Reveal / Mobile Static */}
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <LuxuryButton 
              variant="outline" 
              className="py-3 text-[9px] uppercase tracking-wider"
              onClick={() => handleEnquire("appointment")}
            >
              <Calendar className="w-3 h-3 mr-1.5" />
              Book
            </LuxuryButton>
            <LuxuryButton 
              variant="outline" 
              className="py-3 text-[9px] uppercase tracking-wider"
              onClick={() => handleEnquire("contact")}
            >
              <Phone className="w-3 h-3 mr-1.5" />
              Call
            </LuxuryButton>
          </div>
          <LuxuryButton 
            className="w-full py-4 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center justify-center gap-2 group/btn"
            onClick={() => handleEnquire("product")}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Enquire Now</span>
          </LuxuryButton>
        </div>
      </div>

      {/* Branch Selector Modal/Overlay */}
      <AnimatePresence>
        {showBranchSelector && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-brand-charcoal/95 backdrop-blur-md p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Select Branch</span>
              <button onClick={() => setShowBranchSelector(false)} className="text-white hover:text-brand-gold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
              {product.branches.map((branch) => (
                <button 
                  key={branch.branchSlug}
                  onClick={() => handleBranchSelect(branch)}
                  className="w-full p-4 border border-white/10 hover:border-brand-gold hover:bg-white/[0.05] transition-all duration-500 text-left flex items-center justify-between group/branch"
                >
                  <div>
                    <span className="text-white font-bold uppercase tracking-tighter block mb-1 group-hover/branch:text-brand-gold transition-colors">
                      {branch.branchName}
                    </span>
                    <span className={cn(
                      "text-[8px] font-bold uppercase",
                      branch.stockStatus === "In Stock" ? "text-green-400" : "text-orange-400"
                    )}>
                      {branch.stockStatus}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover/branch:text-brand-gold group-hover/branch:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            
            <p className="mt-8 text-[9px] text-white/30 uppercase tracking-widest text-center">
              Choose the nearest branch for availability enquiry.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
