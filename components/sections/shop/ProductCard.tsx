"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Product, BranchStock } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";
import { MessageCircle, Heart, MapPin, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"product" | "appointment" | "contact">("product");

  // Lock body scroll when branch modal is active
  React.useEffect(() => {
    if (showBranchSelector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
    <div 
      className="group relative bg-white border border-black/5 rounded-2xl p-1.5 transition-all duration-500 hover:border-brand-gold/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex flex-col h-full"
    >
      {/* Product Image Section */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-brand-pearl/10 rounded-2xl">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isInHouseProduct ? (
            <span className="bg-brand-gold text-white text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px] shadow-sm flex items-center gap-1">
              Emirates Signature
            </span>
          ) : (
            product.isNewArrival && (
              <span className="bg-brand-charcoal text-white text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px]">New</span>
            )
          )}
          {product.category === "Luxury Collection" && (
            <span className="bg-[#0A0A0A] text-white text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px] border border-white/20">Luxury</span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-3 right-3 p-1.5 bg-white/60 backdrop-blur-md rounded-full text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 z-10"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>

        {/* Quick Branch Availability Info */}
        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center border-t border-brand-charcoal/5">
          <div className="flex items-center gap-1.5 text-brand-charcoal">
            <MapPin className="w-3 h-3 text-brand-gold" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
              Available at {product.branches.length} Branch{product.branches.length > 1 ? 'es' : ''}
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info Section */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <Link href={`/product/${product.slug}`} className="block mb-2">
          <span className="text-[8px] sm:text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em] block mb-1">
            {product.isInHouseProduct && product.signatureCollectionName ? product.signatureCollectionName : product.brand}
          </span>
          <h3 className="text-sm sm:text-base font-heading tracking-tight uppercase text-brand-charcoal line-clamp-1 group-hover:text-brand-gold transition-colors duration-500">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1 mb-4">
          <span className="text-[8px] sm:text-[9px] text-brand-charcoal/50 font-bold uppercase tracking-[0.15em]">
            {product.gender} • {product.frameShape}
          </span>
          {product.price > 0 && (
            <span className="text-[9px] sm:text-[10px] font-semibold text-brand-charcoal">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Elegant Minimalist Bottom CTA */}
        <button 
          onClick={(e) => handleEnquire(e, "product")}
          className="w-full bg-[#FAF9F6] border border-brand-charcoal/10 hover:border-brand-gold hover:bg-brand-gold text-brand-charcoal hover:text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] py-3 rounded-[3px] transition-all duration-500 flex items-center justify-center gap-2 mt-auto shadow-sm"
        >
          <span>Enquire Now</span>
        </button>
      </div>

      {/* Branch Selector Modal/Overlay */}
      <AnimatePresence>
        {showBranchSelector && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setShowBranchSelector(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-charcoal border border-white/10 w-full max-w-md h-[480px] max-h-[85vh] flex flex-col p-6 shadow-2xl relative rounded-2xl"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-0.5">Enquiry Location</span>
                  <h3 className="text-base font-bold text-white uppercase tracking-tighter">Select Branch</h3>
                </div>
                <button 
                  onClick={() => setShowBranchSelector(false)} 
                  className="p-1.5 text-white/50 hover:text-brand-gold hover:bg-white/5 rounded-full transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div 
                className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 custom-scrollbar touch-pan-y" 
                style={{ WebkitOverflowScrolling: "touch" }}
                data-lenis-prevent
              >
                {product.branches.map((branch) => (
                  <button 
                    key={branch.branchSlug}
                    onClick={() => handleBranchSelect(branch)}
                    className="w-full p-4 border border-white/5 bg-white/[0.01] hover:border-brand-gold hover:bg-white/[0.04] transition-all duration-500 text-left flex items-center justify-between group/branch rounded-xl"
                  >
                    <div className="text-left">
                      <span className="text-xs text-white font-bold uppercase tracking-tight block mb-1 group-hover/branch:text-brand-gold transition-colors">
                        {branch.branchName}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={cn(
                          "text-[7px] font-bold uppercase px-1 py-0.5 border rounded-sm",
                          branch.stockStatus === "In Stock" 
                            ? "text-green-400 border-green-500/20 bg-green-500/5" 
                            : "text-orange-400 border-orange-500/20 bg-orange-500/5"
                        )}>
                          {branch.stockStatus}
                        </span>
                        <span className="text-[7px] text-white/30 uppercase tracking-widest">Tap to enquire</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover/branch:text-brand-gold group-hover/branch:translate-x-1 transition-all duration-500" />
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] text-center leading-relaxed">
                  Choose the nearest atelier branch to confirm local availability.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
