"use client";

import React, { useState, useMemo, useEffect, useRef, useTransition, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Search, ChevronDown, LayoutGrid, List, X, RotateCcw, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/shop";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

const BATCH_SIZE = 12;

const SORT_OPTIONS = [
  { value: "new_arrivals", label: "New Arrivals" },
  { value: "alphabetical_az", label: "Alphabetically: A-Z" },
  { value: "alphabetical_za", label: "Alphabetically: Z-A" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" }
];

function ProductGridSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div 
      className={cn(
        "grid gap-y-10 md:gap-x-8 md:gap-y-16 animate-pulse",
        viewMode === "grid" 
          ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4" 
          : "grid-cols-1 gap-x-0"
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3.5 p-3.5 bg-white border border-black/[0.03] rounded-xl shadow-sm">
          <div className="w-full aspect-[3/4] bg-neutral-200/50 rounded-[3px]" />
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-1/3 bg-neutral-200/60 rounded" />
            <div className="h-2.5 w-1/5 bg-neutral-200/40 rounded" />
          </div>
          <div className="h-4 w-3/4 bg-neutral-200/60 rounded" />
          <div className="h-3 w-1/4 bg-neutral-200/50 rounded mt-auto" />
          <div className="h-10 w-full bg-neutral-200/60 rounded-[3px] mt-2" />
        </div>
      ))}
    </div>
  );
}

export function ProductGrid({ products }: ProductGridProps) {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"new_arrivals" | "alphabetical_az" | "alphabetical_za" | "price_low_high" | "price_high_low">("new_arrivals");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Infinite Scroll Display Limit State
  const [displayLimit, setDisplayLimit] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Active filters derived from URL parameters
  const activeFilters = useMemo(() => {
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      filters[key] = value.split(";");
    });
    return filters;
  }, [searchParams]);

  // List of active filters for tag display
  const activeFilterList = useMemo(() => {
    const list: { key: string; groupKey: string; groupName: string; value: string }[] = [];
    Object.entries(activeFilters).forEach(([groupKey, values]) => {
      if (groupKey === "page" || groupKey === "sort") return;
      values.forEach(val => {
        if (!val) return;
        const groupName = groupKey.replace(/_/g, " ");
        list.push({ key: `${groupKey}-${val}`, groupKey, groupName, value: val });
      });
    });
    return list;
  }, [activeFilters]);

  const handleRemoveFilter = (groupKey: string, valueToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(groupKey)?.split(";") || [];
    const updatedValues = currentValues.filter(v => v !== valueToRemove);
    
    if (updatedValues.length > 0) {
      params.set(groupKey, updatedValues.join(";"));
    } else {
      params.delete(groupKey);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleResetAllFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const [isUrlTransitioning, setIsUrlTransitioning] = useState(false);

  useEffect(() => {
    setIsUrlTransitioning(true);
    const timer = setTimeout(() => {
      setIsUrlTransitioning(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const showSkeleton = isPending || isUrlTransitioning;

  // Reset infinite scroll limit back to initial BATCH_SIZE on filter, search, or sort change
  useEffect(() => {
    setDisplayLimit(BATCH_SIZE);
  }, [searchParams, searchQuery, sortBy]);

  // Reactive filtering
  const filteredProducts = useMemo(() => {
    if (!isMounted) return products;

    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // 2. Color Way Match
      const colorWayFilters = activeFilters["color_way"];
      if (colorWayFilters && colorWayFilters.length > 0) {
        const productColors = product.colors || (product.color ? [product.color] : []);
        const hasMatchingColor = colorWayFilters.some(filterColor =>
          productColors.some(pColor => pColor.toLowerCase().includes(filterColor.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }

      // 3. Contact Lens Usage Frequency Match
      const usageFilters = activeFilters["usage_frequency"];
      if (usageFilters && usageFilters.length > 0) {
        if (!usageFilters.includes(product.style || "")) return false;
      }

      // 4. Contact Lens Water Content Match
      const waterFilters = activeFilters["water_content"];
      if (waterFilters && waterFilters.length > 0) {
        const hasMatchingWater = waterFilters.some(wf =>
          (product.frameWeightCategory || "").includes(wf.replace("%", ""))
        );
        if (!hasMatchingWater) return false;
      }

      // 5. Contact Lens Base Curve Match
      const curveFilters = activeFilters["base_curve"];
      if (curveFilters && curveFilters.length > 0) {
        const hasMatchingCurve = curveFilters.some(cf =>
          (product.size || "").includes(cf.replace("mm", "").trim())
        );
        if (!hasMatchingCurve) return false;
      }

      // 6. Precision Lens Design Match
      const designFilters = activeFilters["lens_design"];
      if (designFilters && designFilters.length > 0) {
        if (!designFilters.includes(product.lensType || "")) return false;
      }

      // 7. Precision Lens Material Index Match
      const indexFilters = activeFilters["material_index"];
      if (indexFilters && indexFilters.length > 0) {
        const hasMatchingIndex = indexFilters.some(idx => {
          const indexValue = idx.match(/\d\.\d+/)?.[0];
          return indexValue && (product.frameMaterial || "").includes(indexValue);
        });
        if (!hasMatchingIndex) return false;
      }

      // 8. Volume Capacity Match
      const volumeFilters = activeFilters["volume_capacity"];
      if (volumeFilters && volumeFilters.length > 0) {
        const hasMatchingVolume = volumeFilters.some(vf =>
          (product.size || "").includes(vf.replace("ml", "").trim())
        );
        if (!hasMatchingVolume) return false;
      }

      // 9. Availability / Collections Match
      const availabilityFilters = activeFilters["availability"];
      if (availabilityFilters && availabilityFilters.length > 0) {
        let matches = false;
        if (availabilityFilters.includes("In Stock") && product.stockStatus === "In Stock") matches = true;
        if (availabilityFilters.includes("New Arrivals") && product.isNewArrival) matches = true;
        if (availabilityFilters.includes("Best Sellers") && product.isFeatured) matches = true;
        if (!matches) return false;
      }

      return true;
    });
  }, [products, searchQuery, activeFilters, isMounted]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "alphabetical_az") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "alphabetical_za") {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortBy === "price_low_high") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price_high_low") {
      return list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Products currently displayed (Infinite Scroll slice)
  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(0, displayLimit);
  }, [sortedProducts, displayLimit]);

  const hasMore = displayLimit < sortedProducts.length;

  // Load next batch function
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayLimit(prev => Math.min(prev + BATCH_SIZE, sortedProducts.length));
      setIsLoadingMore(false);
    }, 350);
  }, [isLoadingMore, hasMore, sortedProducts.length]);

  // IntersectionObserver Sentinel setup (Instagram-style trigger)
  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: "300px 0px" } // Triggers 300px before reaching the bottom for seamless loading
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  return (
    <div className="flex-1">
      {/* Top Bar - Control Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-black/5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-charcoal/30 group-focus-within:text-brand-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search Luxury Eyewear..."
              className="w-full bg-brand-pearl/20 border border-black/5 rounded-full py-2.5 pl-9 pr-4 text-[11px] font-medium tracking-tight focus:bg-white focus:border-brand-gold/30 transition-all duration-500 outline-none placeholder:text-brand-charcoal/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto">
          {/* Sorting Dropdown */}
          <div className="relative">
            <div 
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="flex items-center gap-2.5 group cursor-pointer select-none"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 group-hover:text-brand-charcoal transition-colors">Sort By</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal">
                  {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                </span>
                <ChevronDown className={cn("w-3 h-3 text-brand-gold transition-transform duration-500", isSortDropdownOpen && "rotate-180")} />
              </div>
            </div>
            
            <AnimatePresence>
              {isSortDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-white border border-black/5 shadow-2xl z-20 p-2 rounded-xl overflow-hidden"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value as any);
                          setIsSortDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-[9px] uppercase tracking-wider transition-colors block rounded-md",
                          sortBy === opt.value ? "bg-brand-pearl text-brand-gold font-bold" : "text-brand-charcoal/60 hover:bg-brand-pearl hover:text-brand-charcoal"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <div className="hidden sm:block w-[1px] h-4 bg-black/5" />
          
          {/* View Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 transition-colors rounded-md", viewMode === "grid" ? "text-brand-gold bg-brand-pearl" : "text-brand-charcoal/20 hover:text-brand-charcoal")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 transition-colors rounded-md", viewMode === "list" ? "text-brand-gold bg-brand-pearl" : "text-brand-charcoal/20 hover:text-brand-charcoal")}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      <AnimatePresence>
        {activeFilterList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mr-2 flex items-center gap-1.5">
              Active Filters:
              {showSkeleton && <Loader2 className="w-3 h-3 text-brand-gold animate-spin ml-1" />}
            </span>
            {activeFilterList.map((tag) => (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                key={tag.key}
                disabled={showSkeleton}
                onClick={() => handleRemoveFilter(tag.groupKey, tag.value)}
                className="inline-flex items-center gap-1.5 bg-brand-pearl/40 hover:bg-brand-gold/10 border border-black/5 hover:border-brand-gold/25 py-1 px-3 text-[9px] font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold rounded-[3px] transition-all duration-300 disabled:opacity-50"
              >
                <span className="text-brand-gold/60">{tag.groupName}:</span>
                <span>{tag.value}</span>
                <X className="w-2.5 h-2.5 text-brand-charcoal/30 hover:text-brand-gold ml-0.5" />
              </motion.button>
            ))}
            <button 
              disabled={showSkeleton}
              onClick={handleResetAllFilters}
              className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.15em] text-brand-gold hover:text-brand-charcoal transition-colors ml-2 py-1 disabled:opacity-50"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Display or Loading Skeleton */}
      {showSkeleton ? (
        <ProductGridSkeleton viewMode={viewMode} />
      ) : visibleProducts.length > 0 ? (
        <GridStagger 
          key={`grid-${sortBy}`}
          className={cn(
            "grid gap-y-10 md:gap-x-8 md:gap-y-16",
            viewMode === "grid" 
              ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4" 
              : "grid-cols-1 gap-x-0"
          )}
        >
          {visibleProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </GridStagger>
      ) : (
        <div className="text-center py-24 border border-dashed border-black/10 flex flex-col items-center justify-center rounded-2xl">
          <p className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold mb-2">No items found</p>
          <p className="text-[11px] font-light text-brand-charcoal/30">Try clearing active search or filter tags.</p>
        </div>
      )}

      {/* Infinite Scroll Sentinel & Loading Indicator */}
      {sortedProducts.length > 0 && (
        <div ref={observerRef} className="mt-16 flex flex-col items-center justify-center py-6">
          {hasMore ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C9A84C]" />
                <span>Loading More Eyewear...</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-black/30 font-medium">
                Scroll to discover more
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full max-w-md pt-8 border-t border-black/5">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All {sortedProducts.length} Collections Loaded</span>
              </div>
              <div className="w-full bg-neutral-200/60 h-[2px] rounded-full overflow-hidden mt-1">
                <div className="bg-[#C9A84C] h-full w-full" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
