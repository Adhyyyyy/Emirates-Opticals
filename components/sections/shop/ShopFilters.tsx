"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, X, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FILTER_GROUPS = [
  {
    title: "Collection Type",
    type: "button-group",
    options: ["Designer Brands", "Emirates Signature"]
  },
  {
    title: "Gender",
    type: "grid",
    options: ["Men", "Women", "Unisex", "Kids"]
  },
  {
    title: "Price Range",
    type: "price-pills",
    options: [
      "Under ₹5,000",
      "₹5,000 - ₹15,000",
      "₹15,000 - ₹30,000",
      "₹30,000 - ₹50,000",
      "Luxury (Above ₹50,000)"
    ]
  },
  {
    title: "Category",
    type: "list",
    options: ["Optical Frames", "Sunglasses", "Contact Lenses", "Lens Solutions", "Luxury Collections", "New Arrivals"]
  },
  {
    title: "Brand",
    type: "list",
    options: [
      "Acuvue", "Alcon", "Bausch & Lomb", "BVLGARI", "Calvin Klein", "Cartier", 
      "Chanel", "Diesel", "Dolce & Gabbana", "Emirates Optician", "Gucci", 
      "Lacoste", "Montblanc", "Oakley", "Police", "Prada", "Ray-Ban", 
      "Tom Ford", "Vogue Eyewear"
    ]
  },
  // Eyewear Specific Filters
  {
    title: "Frame Shape",
    type: "list",
    scope: ["Frames"],
    options: ["Aviator", "Wayfarer", "Rectangular", "Square", "Round", "Cat Eye", "Oval", "Geometric"]
  },
  {
    title: "Frame Material",
    type: "list",
    scope: ["Frames"],
    options: ["Acetate", "Metal", "Titanium", "Gold Plated", "O-Matter", "Carbon Fiber"]
  },
  // Contact Lenses Specific Filters
  {
    title: "Usage Frequency",
    type: "list",
    scope: ["ContactLenses"],
    options: ["Daily Disposable", "Weekly Disposable", "Monthly Disposable", "Yearly Disposable"]
  },
  {
    title: "Water Content",
    type: "list",
    scope: ["ContactLenses"],
    options: ["38%", "48%", "55%", "68%"]
  },
  {
    title: "Base Curve",
    type: "list",
    scope: ["ContactLenses"],
    options: ["8.4mm", "8.5mm", "8.6mm", "8.7mm", "8.8mm"]
  },
  // Precision Lenses Specific Filters
  {
    title: "Lens Design",
    type: "list",
    scope: ["PrecisionLenses"],
    options: ["Single Vision", "Progressive", "Bifocal", "Blue-Cut Protective"]
  },
  {
    title: "Material Index",
    type: "list",
    scope: ["PrecisionLenses"],
    options: ["1.50 Standard", "1.56 Mid-Index", "1.61 High-Index", "1.67 Ultra-High", "1.74 Thinnest"]
  },
  // Solutions Specific Filters
  {
    title: "Volume Capacity",
    type: "list",
    scope: ["Solutions"],
    options: ["60ml", "120ml", "240ml", "360ml"]
  },
  {
    title: "Branches",
    type: "list",
    options: [
      "Changanassery", 
      "Thiruvalla", 
      "Kumbanad", 
      "Kothamangalam", 
      "Pandalam", 
      "Kakkanad", 
      "Kottayam", 
      "Ettumanur", 
      "Angamaly", 
      "Irumpanam"
    ]
  }
];

export function ShopFilters() {
  const [openGroups, setOpenGroups] = useState<string[]>([
    "Collection Type", 
    "Gender", 
    "Price Range", 
    "Category",
    "Frame Shape",
    "Usage Frequency",
    "Lens Design"
  ]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [expandedLists, setExpandedLists] = useState<string[]>([]);

  const toggleListExpansion = (title: string) => {
    setExpandedLists(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Active filters derived from URL
  const activeFilters = useMemo(() => {
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      filters[key] = value.split(";");
    });
    return filters;
  }, [searchParams]);

  const activeCategory = activeFilters.category?.[0];

  // Dynamically filter which specification panels are visible based on active category
  const visibleFilterGroups = useMemo(() => {
    return FILTER_GROUPS.filter(group => {
      if (!group.scope) return true; // Global filter always visible

      if (!activeCategory) {
        // Default to frame shape filters if no category is picked (default view)
        return group.scope.includes("Frames");
      }

      if (activeCategory === "Contact Lenses") {
        return group.scope.includes("ContactLenses");
      }
      if (activeCategory === "Lens Solutions") {
        return group.scope.includes("Solutions");
      }
      if (activeCategory === "Precision Lenses") {
        return group.scope.includes("PrecisionLenses");
      }
      if (
        activeCategory === "Optical Frames" || 
        activeCategory === "Sunglasses" || 
        activeCategory === "Luxury Collections" || 
        activeCategory === "New Arrivals"
      ) {
        return group.scope.includes("Frames");
      }

      return false;
    });
  }, [activeCategory]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const toggleFilter = (groupTitle: string, option: string) => {
    const key = groupTitle.toLowerCase().replace(/\s+/g, "_");
    const current = activeFilters[key] || [];
    let updated: string[];

    if (current.includes(option)) {
      updated = current.filter(o => o !== option);
    } else {
      updated = [...current, option];
    }

    const params = new URLSearchParams(searchParams.toString());
    if (updated.length > 0) {
      params.set(key, updated.join(";"));
    } else {
      params.delete(key);
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category Scope Ribbon Badge */}
      {activeCategory && (
        <div className="bg-brand-pearl/30 border border-brand-gold/15 p-4 rounded-xl flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <div className="flex-1">
            <p className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.25em]">Filter Scope</p>
            <p className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest mt-0.5">{activeCategory} Specifications</p>
          </div>
        </div>
      )}

      {visibleFilterGroups.map((group) => {
        const key = group.title.toLowerCase().replace(/\s+/g, "_");
        const activeCount = (activeFilters[key] || []).length;
        const isOpen = openGroups.includes(group.title);

        return (
          <div key={group.title} className="border-b border-black/[0.04] pb-6 last:border-0 last:pb-0">
            {/* Header / Accordion Toggle */}
            <button 
              onClick={() => toggleGroup(group.title)}
              className="w-full flex items-center justify-between py-2 group text-left"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">
                  {group.title}
                </h3>
                {activeCount > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeCount > 0 && (
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-brand-gold/60">
                    {activeCount} active
                  </span>
                )}
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-brand-charcoal/20 group-hover:text-brand-charcoal transition-transform duration-500",
                  isOpen && "rotate-180"
                )} />
              </div>
            </button>
            
            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden mt-4"
                >
                  {/* Grid layout for Gender */}
                  {group.type === "grid" && (
                    <div className="grid grid-cols-2 gap-2">
                      {group.options.map((option) => {
                        const isChecked = (activeFilters[key] || []).includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleFilter(group.title, option)}
                            className={cn(
                              "py-3 px-4 rounded-[3px] border text-[9px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-between text-left",
                              isChecked
                                ? "bg-brand-charcoal border-brand-gold text-white shadow-md shadow-brand-charcoal/10"
                                : "bg-transparent border-black/[0.04] text-brand-charcoal/60 hover:border-brand-charcoal/20 hover:text-brand-charcoal hover:bg-brand-pearl/10"
                            )}
                          >
                            <span>{option}</span>
                            {isChecked && (
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Button segments for Collection Type */}
                  {group.type === "button-group" && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {group.options.map((option) => {
                        const isChecked = (activeFilters[key] || []).includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleFilter(group.title, option)}
                            className={cn(
                              "py-3.5 px-4 rounded-[3px] border text-[9px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-between text-left group/btn",
                              isChecked
                                ? "bg-brand-charcoal border-brand-gold text-brand-gold shadow-lg shadow-brand-charcoal/10"
                                : "bg-brand-pearl/5 border-black/[0.04] text-brand-charcoal/50 hover:border-brand-gold/30 hover:text-brand-charcoal hover:bg-brand-pearl/20"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[10px] text-brand-gold opacity-60">
                                {option === "Emirates Signature" ? "✦" : "◈"}
                              </span>
                              {option}
                            </span>
                            {isChecked ? (
                              <Check className="w-3.5 h-3.5 text-brand-gold" />
                            ) : (
                              <span className="text-[7px] tracking-widest text-brand-charcoal/20 group-hover/btn:text-brand-gold/60 transition-colors uppercase">Select</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Price pill buttons */}
                  {group.type === "price-pills" && (
                    <div className="flex flex-col gap-2">
                      {group.options.map((option) => {
                        const isChecked = (activeFilters[key] || []).includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleFilter(group.title, option)}
                            className={cn(
                              "py-3 px-4 rounded-[3px] border text-[9px] font-bold uppercase tracking-[0.12em] transition-all duration-500 flex items-center justify-between w-full text-left",
                              isChecked
                                ? "bg-brand-charcoal border-brand-gold text-white"
                                : "bg-transparent border-black/[0.04] text-brand-charcoal/65 hover:border-brand-gold/30 hover:text-brand-charcoal hover:bg-brand-pearl/10"
                            )}
                          >
                            <span>{option}</span>
                            <div className={cn(
                              "w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all",
                              isChecked ? "border-brand-gold bg-brand-gold text-white" : "border-black/10"
                            )}>
                              {isChecked && <Check className="w-2 h-2 text-white stroke-[3px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Standard search lists */}
                  {(group.type === "list" || !group.type) && (
                    <div className="space-y-3">
                      {(() => {
                        const isExpanded = expandedLists.includes(group.title);
                        const hasMore = group.options.length > 5;
                        const visibleOptions = isExpanded ? group.options : group.options.slice(0, 5);

                        return (
                          <>
                            <div className="space-y-2">
                              {visibleOptions.map((option) => {
                                const isChecked = (activeFilters[key] || []).includes(option);
                                return (
                                  <div
                                    key={option}
                                    onClick={() => toggleFilter(group.title, option)}
                                    className="flex items-center justify-between cursor-pointer group/opt py-2 px-3 rounded-[3px] border border-transparent hover:border-black/[0.04] hover:bg-brand-pearl/10 transition-all duration-300 select-none"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="relative w-3.5 h-3.5 border border-black/10 rounded-full flex items-center justify-center transition-colors group-hover/opt:border-brand-gold">
                                        <div className={cn(
                                          "w-1.5 h-1.5 rounded-full bg-brand-gold transition-transform duration-300",
                                          isChecked ? "scale-100" : "scale-0 group-hover/opt:scale-50"
                                        )} />
                                      </div>
                                      <span className={cn(
                                        "text-[10px] uppercase tracking-wider transition-colors duration-300",
                                        isChecked ? "text-brand-charcoal font-bold" : "text-brand-charcoal/50 group-hover/opt:text-brand-charcoal"
                                      )}>
                                        {option}
                                      </span>
                                    </div>
                                    {isChecked && (
                                      <span className="text-[7px] font-bold text-brand-gold uppercase tracking-[0.25em] bg-brand-gold/5 px-2 py-0.5 rounded-[2px]">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {hasMore && (
                              <button
                                type="button"
                                onClick={() => toggleListExpansion(group.title)}
                                className="mt-2 text-[9px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors duration-300 flex items-center gap-1.5 py-2.5 px-3 bg-brand-gold/[0.04] hover:bg-brand-gold/[0.08] rounded-[3px] w-full justify-center border border-brand-gold/10"
                              >
                                <span>{isExpanded ? "− Show Less" : `+ Show More (${group.options.length - 5})`}</span>
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        data-lenis-prevent
        className="hidden lg:block w-72 flex-shrink-0 sticky top-28 self-start h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-6"
      >
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/[0.04]">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Filter Catalog</h2>
          </div>
          {Object.keys(activeFilters).length > 0 && (
            <button 
              onClick={clearAllFilters}
              className="text-[8px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors border-b border-brand-gold hover:border-brand-charcoal duration-500 pb-0.5"
            >
              Clear All
            </button>
          )}
        </div>
        
        {/* Filter Accordions */}
        <FilterContent />
      </aside>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/[0.04] py-3 px-4 flex items-center justify-between">
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-2 bg-brand-charcoal text-white px-4 py-2.5 text-[9px] uppercase font-bold tracking-widest hover:bg-brand-gold transition-all duration-500 rounded-[3px]"
        >
          <Filter className="w-3 h-3 text-brand-gold" />
          Filter catalog
          {Object.keys(activeFilters).length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse ml-1" />
          )}
        </button>
        {Object.keys(activeFilters).length > 0 && (
          <button 
            onClick={clearAllFilters} 
            className="text-[9px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer layout */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-[101] w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col rounded-r-3xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-black/5 flex items-center justify-between bg-brand-charcoal text-white">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em]">Filters</span>
                </div>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)} 
                  className="p-2 hover:text-brand-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <FilterContent />
              </div>
              
              {/* Actions Footer */}
              <div className="p-6 border-t border-black/5 bg-brand-pearl/10 flex gap-4">
                <button 
                  onClick={() => { clearAllFilters(); setIsMobileDrawerOpen(false); }}
                  className="flex-1 py-4 border border-black/10 text-[9px] font-bold uppercase tracking-widest hover:bg-brand-pearl transition-colors rounded-[3px]"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-4 bg-brand-charcoal text-brand-gold text-[9px] font-bold uppercase tracking-widest shadow-xl rounded-[3px] border border-brand-charcoal"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
