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

  // Lock body scroll when branch modal is active to delegate mouse scrolls exclusively to the list
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
          <span className="text-xl font-light text-brand-charcoal">₹{product.price.toLocaleString("en-IN")}</span>
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
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setShowBranchSelector(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-charcoal border border-white/10 w-full max-w-lg h-[600px] max-h-[80vh] flex flex-col p-6 md:p-8 shadow-2xl relative rounded-none"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-1">Enquiry Location</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Select Branch</h3>
                </div>
                <button 
                  onClick={() => setShowBranchSelector(false)} 
                  className="p-2 text-white/50 hover:text-brand-gold hover:bg-white/5 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div 
                className="flex-1 min-h-0 max-h-[380px] overflow-y-auto space-y-3 pr-1 custom-scrollbar touch-pan-y" 
                style={{ WebkitOverflowScrolling: "touch" }}
                data-lenis-prevent
              >
                {product.branches.map((branch) => (
                  <button 
                    key={branch.branchSlug}
                    onClick={() => handleBranchSelect(branch)}
                    className="w-full p-5 border border-white/5 bg-white/[0.02] hover:border-brand-gold hover:bg-white/[0.05] transition-all duration-500 text-left flex items-center justify-between group/branch"
                  >
                    <div className="text-left">
                      <span className="text-sm text-white font-bold uppercase tracking-tight block mb-1.5 group-hover/branch:text-brand-gold transition-colors">
                        {branch.branchName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[8px] font-bold uppercase px-1.5 py-0.5 border rounded-sm",
                          branch.stockStatus === "In Stock" 
                            ? "text-green-400 border-green-500/20 bg-green-500/5" 
                            : "text-orange-400 border-orange-500/20 bg-orange-500/5"
                        )}>
                          {branch.stockStatus}
                        </span>
                        <span className="text-[8px] text-white/30 uppercase tracking-widest">Tap to enquire</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover/branch:text-brand-gold group-hover/branch:translate-x-1.5 transition-all duration-500" />
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] text-center leading-relaxed">
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
