"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/shop";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { MessageCircle, Calendar, Phone, Heart, Share2, Maximize2, MapPin, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { getWhatsAppUrl } from "@/lib/shop/whatsapp";

interface ProductHeroGalleryProps {
  product: Product;
}

export function ProductHeroGallery({ product }: ProductHeroGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  const handleAction = (type: "product" | "appointment" | "contact", branchPhone: string, branchName: string) => {
    window.open(getWhatsAppUrl(product, branchPhone, branchName, type), "_blank");
  };

  return (
    <section className="w-full bg-white pt-32 pb-24 overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* Cinematic Gallery Section */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[4/5] bg-brand-pearl/20 overflow-hidden group border border-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="w-full h-full"
                >
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Interaction Overlays */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                {product.isNewArrival && (
                  <span className="bg-brand-gold text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-xl">New Arrival</span>
                )}
                {product.category === "Luxury Collection" && (
                  <span className="bg-brand-charcoal text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-xl">Luxury House</span>
                )}
              </div>

              <div className="absolute bottom-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <button className="p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-brand-gold hover:text-white transition-all shadow-xl">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button className="p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-brand-gold hover:text-white transition-all shadow-xl">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "flex-shrink-0 w-24 aspect-[4/5] relative border-2 transition-all duration-500 snap-start",
                    activeImage === idx ? "border-brand-gold scale-95" : "border-transparent opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Core Info & Primary Actions */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="sticky top-32 flex flex-col gap-10">
              
              {/* Brand & Identity */}
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">{product.brand}</span>
                    <div className="w-8 h-[1px] bg-brand-gold/30" />
                    <span className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-[0.2em]">{product.collectionType}</span>
                  </div>
                </Reveal>
                <div className="flex justify-between items-start gap-4 mb-8">
                  <Reveal delay={0.2}>
                    <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading leading-[0.9]">
                      {product.name}
                    </h1>
                  </Reveal>
                  <button className="p-3 border border-black/5 rounded-full hover:bg-brand-gold hover:text-white transition-all duration-500 flex-shrink-0">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <Reveal delay={0.3}>
                  <p className="text-3xl font-light text-brand-charcoal mb-8">₹{product.price.toLocaleString()}</p>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="text-brand-charcoal/60 font-light leading-relaxed italic font-serif text-lg">
                    "{product.description}"
                  </p>
                </Reveal>
              </div>

              {/* Instant Conversion Hub */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-600">Available For Enquiry</span>
                </div>
                
                <LuxuryButton 
                  className="w-full py-6 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center justify-center gap-3 group/btn shadow-2xl"
                  onClick={() => handleAction("product", product.branches[0]?.whatsapp || "", product.branches[0]?.branchName || "")}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">Enquire Now via WhatsApp</span>
                </LuxuryButton>

                <div className="grid grid-cols-2 gap-4">
                  <LuxuryButton 
                    variant="outline" 
                    className="py-5 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                    onClick={() => handleAction("appointment", product.branches[0]?.whatsapp || "", product.branches[0]?.branchName || "")}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </LuxuryButton>
                  <LuxuryButton 
                    variant="outline" 
                    className="py-5 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                    onClick={() => handleAction("contact", product.branches[0]?.whatsapp || "", product.branches[0]?.branchName || "")}
                  >
                    <Phone className="w-4 h-4" />
                    Contact Branch
                  </LuxuryButton>
                </div>
              </div>

              {/* Quick Trust Pillars */}
              <div className="flex items-center justify-between py-8 border-y border-black/5">
                {[
                  { icon: ShieldCheck, text: "Authentic" },
                  { icon: MapPin, text: "Multi-Branch" },
                  { icon: Share2, text: "Warranty" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <item.icon className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 group-hover:text-brand-charcoal transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile Floating Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[100] p-4 bg-white/90 backdrop-blur-xl border-t border-black/5 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <LuxuryButton 
          className="flex-1 py-4 bg-brand-charcoal text-white hover:bg-brand-gold text-[10px] uppercase font-bold tracking-widest"
          onClick={() => handleAction("product", product.branches[0]?.whatsapp || "", product.branches[0]?.branchName || "")}
        >
          Enquire Now
        </LuxuryButton>
      </div>
    </section>
  );
}
