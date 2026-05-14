"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTER_GROUPS = [
  {
    title: "Gender",
    options: ["Men", "Women", "Unisex", "Kids"]
  },
  {
    title: "Price Range",
    options: ["Under ₹5,000", "₹5,000 - ₹15,000", "₹15,000 - ₹30,000", "₹30,000 - ₹50,000", "Luxury (Above ₹50,000)"]
  },
  {
    title: "Brand",
    options: ["PRADA", "Ray-Ban", "Oakley", "Cartier", "Gucci", "Tom Ford", "BVLGARI", "Maui Jim"]
  },
  {
    title: "Category",
    options: ["Optical Frames", "Sunglasses", "Blue Light Glasses", "Sports Eyewear", "Luxury Collection"]
  },
  {
    title: "Frame Shape",
    options: ["Aviator", "Wayfarer", "Rectangular", "Square", "Round", "Cat Eye", "Oval"]
  },
  {
    title: "Frame Material",
    options: ["Acetate", "Metal", "Titanium", "Gold Plated", "O-Matter"]
  },
  {
    title: "Availability",
    options: ["In Stock", "New Arrivals", "Best Sellers"]
  },
  {
    title: "Branches",
    options: ["Changanassery", "Thiruvalla", "Kumbanad", "Kothamangalam", "Pandalam", "Kakkanad"]
  }
];

export function ShopFilters() {
  const [openGroups, setOpenGroups] = useState<string[]>(["Gender", "Price Range", "Category"]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const FilterContent = () => (
    <div className="space-y-10">
      {FILTER_GROUPS.map((group) => (
        <div key={group.title} className="border-b border-black/5 pb-8 last:border-0">
          <button 
            onClick={() => toggleGroup(group.title)}
            className="w-full flex items-center justify-between mb-6 group"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal group-hover:text-brand-gold transition-colors">
              {group.title}
            </h3>
            <ChevronDown className={cn(
              "w-4 h-4 text-brand-charcoal/20 transition-transform duration-500",
              openGroups.includes(group.title) && "rotate-180"
            )} />
          </button>
          
          <AnimatePresence>
            {openGroups.includes(group.title) && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-3">
                  {group.options.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group/opt">
                      <div className="relative w-4 h-4 border border-black/10 group-hover/opt:border-brand-gold transition-colors">
                        <div className="absolute inset-[3px] bg-brand-gold scale-0 group-hover/opt:scale-50 transition-transform" />
                      </div>
                      <span className="text-xs font-light text-brand-charcoal/60 group-hover/opt:text-brand-charcoal transition-colors uppercase tracking-tight">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        data-lenis-prevent
        className="hidden lg:block w-72 flex-shrink-0 sticky top-28 self-start h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-6"
      >
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-black/5">
          <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Filter Collections</h2>
        </div>
        <FilterContent />
      </aside>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/5 py-3 px-4 flex items-center justify-between">
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-2 bg-brand-charcoal text-white px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-gold transition-colors"
        >
          <Filter className="w-3.5 h-3.5" />
          Filter
        </button>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase text-brand-charcoal/40 tracking-tighter">48 Products</span>
          <select className="bg-transparent text-[10px] font-bold uppercase text-brand-charcoal tracking-widest outline-none border-none">
            <option>New Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Mobile Drawer (Flipkart/Ajio Style) */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <m.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[101] w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between bg-brand-charcoal text-white">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">Filters</span>
                </div>
                <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 hover:text-brand-gold transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <FilterContent />
              </div>
              
              <div className="p-6 border-t border-black/5 flex gap-4">
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-4 border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-pearl transition-colors"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-4 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest shadow-xl"
                >
                  Apply Filters
                </button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
