"use client";

import React, { useState, useMemo, useEffect, useTransition, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, X, SlidersHorizontal, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ShopFiltersProps {
  availableColors?: string[];
  availableBranches?: string[];
}

interface FilterContentProps {
  visibleFilterGroups: any[];
  pendingFilters: Record<string, string[]>;
  openGroups: string[];
  expandedLists: string[];
  activeCategory: string | undefined;
  toggleFilter: (groupTitle: string, option: string) => void;
  toggleGroup: (title: string) => void;
  toggleListExpansion: (title: string) => void;
}

const FilterContent = React.memo(function FilterContent({
  visibleFilterGroups,
  pendingFilters,
  openGroups,
  expandedLists,
  activeCategory,
  toggleFilter,
  toggleGroup,
  toggleListExpansion,
}: FilterContentProps) {
  return (
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
        const activeCount = (pendingFilters[key] || []).length;
        const isOpen = openGroups.includes(group.title);

        return (
          <div key={group.title} className="border-b border-black/[0.04] pb-6 last:border-0 last:pb-0">
            {/* Header / Accordion Toggle */}
            <button
              type="button"
              onClick={() => toggleGroup(group.title)}
              className="w-full flex items-center justify-between py-2 group text-left cursor-pointer"
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
                    {activeCount} selected
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
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden mt-4"
                >
                  {/* Grid layout for Gender */}
                  {group.type === "grid" && (
                    <div className="grid grid-cols-2 gap-2">
                      {group.options.map((option: string) => {
                        const isChecked = (pendingFilters[key] || []).includes(option);
                        return (
                          <button
                            type="button"
                            key={option}
                            onClick={() => toggleFilter(group.title, option)}
                            className={cn(
                              "py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider border rounded-[3px] transition-all duration-300 flex items-center justify-between cursor-pointer",
                              isChecked
                                ? "bg-brand-charcoal text-brand-gold border-brand-charcoal shadow-sm"
                                : "bg-white text-brand-charcoal/60 border-black/5 hover:border-brand-gold hover:text-brand-gold"
                            )}
                          >
                            <span>{option}</span>
                            {isChecked && <Check className="w-3 h-3 text-brand-gold" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Checkbox list layout */}
                  {group.type === "checkbox" && (
                    <div className="space-y-2.5">
                      {group.options
                        .slice(0, expandedLists.includes(group.title) ? undefined : 6)
                        .map((option: string) => {
                          const isChecked = (pendingFilters[key] || []).includes(option);
                          return (
                            <label
                              key={option}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFilter(group.title, option);
                              }}
                              className="flex items-center gap-3 group cursor-pointer select-none py-1"
                            >
                              <div className={cn(
                                "w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all duration-300",
                                isChecked
                                  ? "bg-brand-gold border-brand-gold text-brand-charcoal"
                                  : "border-black/10 group-hover:border-brand-gold bg-white"
                              )}>
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className={cn(
                                "text-[10px] uppercase tracking-wider transition-colors duration-300",
                                isChecked
                                  ? "text-brand-charcoal font-bold"
                                  : "text-brand-charcoal/60 group-hover:text-brand-charcoal"
                              )}>
                                {option}
                              </span>
                            </label>
                          );
                        })}

                      {/* Expandable toggle for long lists */}
                      {group.options.length > 6 && (
                        <button
                          type="button"
                          onClick={() => toggleListExpansion(group.title)}
                          className="text-[8px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors mt-2 block"
                        >
                          {expandedLists.includes(group.title)
                            ? `- Show Less`
                            : `+ Show ${group.options.length - 6} More`}
                        </button>
                      )}
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
});

export function ShopFilters({ availableColors = [], availableBranches = [] }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([
    "Gender",
    "Category",
    "Brand",
    "Price Range",
    "Collection Type",
    "Frame Shape",
    "Frame Material",
    "Branches",
    "Color Way",
    "Availability"
  ]);
  const [expandedLists, setExpandedLists] = useState<string[]>([]);

  // Prevent background scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  // Derived state from URL search parameters
  const activeFiltersFromUrl = useMemo(() => {
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      filters[key] = value.split(";").filter(Boolean);
    });
    return filters;
  }, [searchParams]);

  // Staged pending state for filter selections before applying
  const [pendingFilters, setPendingFilters] = useState<Record<string, string[]>>(activeFiltersFromUrl);

  // Sync staged state when URL changes externally
  useEffect(() => {
    setPendingFilters(activeFiltersFromUrl);
  }, [activeFiltersFromUrl]);

  const activeCategory = useMemo(() => {
    return activeFiltersFromUrl["category"]?.[0];
  }, [activeFiltersFromUrl]);

  // Define filter definitions
  const allFilterGroups = useMemo(() => [
    {
      title: "Gender",
      type: "grid",
      options: ["Men", "Women", "Unisex", "Kids"],
      categoryScope: null,
    },
    {
      title: "Collection Type",
      type: "checkbox",
      options: ["Emirates Signature", "Designer Brands"],
      categoryScope: null,
    },
    {
      title: "Category",
      type: "checkbox",
      options: [
        "Sunglasses",
        "Optical Frames",
        "Reading Glasses",
        "Contact Lenses",
        "Lens Care Solutions",
        "Eyewear Accessories",
        "Children's Eyewear",
        "Sports Eyewear",
      ],
      categoryScope: null,
    },
    {
      title: "Brand",
      type: "checkbox",
      options: [
        "Ray-Ban",
        "Oakley",
        "PRADA",
        "Gucci",
        "Tom Ford",
        "BVLGARI",
        "Cartier",
        "Police",
        "Diesel",
        "Dolce & Gabbana",
        "Vogue Eyewear",
        "Montblanc",
        "Carrera",
        "Lacoste",
        "Calvin Klein",
        "DB Eyewear",
        "Maui Jim",
        "Tommy Hilfiger",
        "Emporio Armani",
        "Armani Exchange",
        "Stepper",
      ],
      categoryScope: null,
    },
    {
      title: "Frame Shape",
      type: "checkbox",
      options: [
        "Aviator",
        "Wayfarer",
        "Round",
        "Square",
        "Cat Eye",
        "Rectangle",
        "Oval",
        "Geometric",
        "Rimless",
        "Semi-Rimless",
      ],
      categoryScope: null,
    },
    {
      title: "Frame Material",
      type: "checkbox",
      options: [
        "Acetate",
        "Titanium",
        "Metal",
        "Stainless Steel",
        "Carbon Fiber",
        "Injection Molded Plastic",
        "TR90",
        "Wood Grain Finish",
      ],
      categoryScope: null,
    },
    {
      title: "Price Range",
      type: "checkbox",
      options: [
        "Under ₹3,000",
        "₹3,000 - ₹15,000",
        "₹15,000 - ₹30,000",
        "Luxury (Above ₹30,000)",
      ],
      categoryScope: null,
    },
    /*
    {
      title: "Branches",
      type: "checkbox",
      options: availableBranches.length > 0 ? availableBranches : [
        "Emirates Optician, Changanassery",
        "Emirates Optician, Thiruvalla",
        "Emirates Optician, Kumbanad",
        "Emirates Optician, Kothamangalam",
        "Emirates Optician, Pandalam",
      ],
      categoryScope: null,
    },
    */
    {
      title: "Color Way",
      type: "checkbox",
      options: availableColors.length > 0 ? availableColors : [
        "Glossy Black",
        "Matte Black",
        "Tortoise Shell",
        "Clear Crystal",
        "Shiny Gold",
        "Shiny Silver",
        "Rose Gold",
        "Gunmetal",
      ],
      categoryScope: null,
    },
    /*
    {
      title: "Availability",
      type: "checkbox",
      options: ["In Stock", "New Arrivals", "Best Sellers"],
      categoryScope: null,
    },
    */
  ], [availableColors, availableBranches]);

  const visibleFilterGroups = useMemo(() => {
    return allFilterGroups.filter((group) => {
      if (!group.categoryScope) return true;
      return group.categoryScope === activeCategory;
    });
  }, [allFilterGroups, activeCategory]);

  const toggleGroup = useCallback((title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }, []);

  const toggleListExpansion = useCallback((title: string) => {
    setExpandedLists((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }, []);

  const toggleFilter = useCallback((groupTitle: string, option: string) => {
    const key = groupTitle.toLowerCase().replace(/\s+/g, "_");
    setPendingFilters((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];

      const next = { ...prev };
      if (updated.length > 0) {
        next[key] = updated;
      } else {
        delete next[key];
      }
      return next;
    });
  }, []);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(pendingFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        params.set(key, values.join(";"));
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setIsMobileDrawerOpen(false);
    });
  };

  const clearAllFilters = () => {
    setPendingFilters({});
    startTransition(() => {
      router.push(pathname, { scroll: false });
      setIsMobileDrawerOpen(false);
    });
  };

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside 
        data-lenis-prevent
        className="hidden lg:flex flex-col w-72 flex-shrink-0 sticky top-28 self-start h-[calc(100vh-140px)] pr-2"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.04] flex-shrink-0">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Filter Catalog</h2>
          </div>
          {Object.keys(pendingFilters).some(k => pendingFilters[k]?.length > 0) && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[8px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors border-b border-brand-gold hover:border-brand-charcoal duration-500 pb-0.5"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Scrollable Filter List with isolated touch/scroll wheel propagation */}
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar pr-4 overscroll-contain touch-pan-y"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <FilterContent
            visibleFilterGroups={visibleFilterGroups}
            pendingFilters={pendingFilters}
            openGroups={openGroups}
            expandedLists={expandedLists}
            activeCategory={activeCategory}
            toggleFilter={toggleFilter}
            toggleGroup={toggleGroup}
            toggleListExpansion={toggleListExpansion}
          />
        </div>

        <div className="pt-4 pb-2 border-t border-black/[0.04] bg-white flex-shrink-0 flex gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={handleApplyFilters}
            className={cn(
              "flex-1 bg-brand-charcoal text-brand-gold hover:bg-brand-gold hover:text-white py-3.5 px-3 text-[9px] font-bold uppercase tracking-[0.2em] rounded-[3px] transition-all duration-300 shadow-md flex items-center justify-center gap-2",
              isPending && "opacity-80 cursor-wait"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
                <span>Applying...</span>
              </>
            ) : (
              <span>Apply Filters</span>
            )}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={clearAllFilters}
            className="py-3.5 px-3 border border-black/10 text-brand-charcoal text-[9px] font-bold uppercase tracking-widest hover:bg-brand-pearl transition-colors rounded-[3px]"
          >
            Reset
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/[0.04] py-3 px-4 flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-2 bg-brand-charcoal text-white px-4 py-2.5 text-[9px] uppercase font-bold tracking-widest hover:bg-brand-gold transition-all duration-500 rounded-[3px]"
        >
          <Filter className="w-3 h-3 text-brand-gold" />
          Filter catalog
          {Object.keys(pendingFilters).some(k => pendingFilters[k]?.length > 0) && (
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse ml-1" />
          )}
        </button>
        {Object.keys(pendingFilters).some(k => pendingFilters[k]?.length > 0) && (
          <button
            type="button"
            disabled={isPending}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              data-lenis-prevent
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 z-[101] w-[88%] max-w-sm h-[100dvh] max-h-[100dvh] bg-white shadow-2xl lg:hidden flex flex-col rounded-r-3xl overflow-hidden overscroll-contain"
            >
              <div className="p-5 border-b border-black/5 flex items-center justify-between bg-brand-charcoal text-white flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em]">Filters</span>
                </div>
                <button type="button" onClick={() => setIsMobileDrawerOpen(false)} className="p-2 hover:text-brand-gold transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div 
                className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar overscroll-contain touch-pan-y"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <FilterContent
                  visibleFilterGroups={visibleFilterGroups}
                  pendingFilters={pendingFilters}
                  openGroups={openGroups}
                  expandedLists={expandedLists}
                  activeCategory={activeCategory}
                  toggleFilter={toggleFilter}
                  toggleGroup={toggleGroup}
                  toggleListExpansion={toggleListExpansion}
                />
              </div>

              <div className="p-4 md:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,16px))] border-t border-black/10 bg-white flex gap-3 flex-shrink-0 shadow-lg z-10">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={clearAllFilters}
                  className="flex-1 py-3.5 border border-black/15 text-[9px] font-bold uppercase tracking-widest hover:bg-brand-pearl transition-colors rounded-[3px] text-brand-charcoal"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleApplyFilters}
                  className={cn(
                    "flex-1 py-3.5 bg-brand-charcoal text-brand-gold text-[9px] font-bold uppercase tracking-widest shadow-xl rounded-[3px] border border-brand-charcoal flex items-center justify-center gap-2",
                    isPending && "opacity-80 cursor-wait"
                  )}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
                      <span>Applying...</span>
                    </>
                  ) : (
                    <span>Apply Filters</span>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
