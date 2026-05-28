"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Search, ChevronDown, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/shop";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

const SORT_OPTIONS = [
  { value: "new_arrivals", label: "New Arrivals" },
  { value: "alphabetical_az", label: "Alphabetically: A-Z" },
  { value: "alphabetical_za", label: "Alphabetically: Z-A" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" }
];

export function ProductGrid({ products }: ProductGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"new_arrivals" | "alphabetical_az" | "alphabetical_za" | "price_low_high" | "price_high_low">("new_arrivals");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const searchParams = useSearchParams();

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

  // Reset pagination to first page whenever search query, filters, or sorting order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams, searchQuery, sortBy]);

  // Reactive Multi-criteria Filtering
  const filteredProducts = useMemo(() => {
    if (!isMounted) return products;

    return products.filter((product) => {
      // 1. Search Bar Match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // 2. Gender Match
      const genderFilters = activeFilters["gender"];
      if (genderFilters && genderFilters.length > 0) {
        if (!genderFilters.includes(product.gender)) return false;
      }

      // 3. Category Match
      const categoryFilters = activeFilters["category"];
      if (categoryFilters && categoryFilters.length > 0) {
        if (!categoryFilters.includes(product.category)) return false;
      }

      // 4. Brand Match
      const brandFilters = activeFilters["brand"];
      if (brandFilters && brandFilters.length > 0) {
        if (!brandFilters.includes(product.brand)) return false;
      }

      // 5. Frame Shape Match
      const shapeFilters = activeFilters["frame_shape"];
      if (shapeFilters && shapeFilters.length > 0) {
        if (!shapeFilters.includes(product.frameShape)) return false;
      }

      // 6. Frame Material Match
      const materialFilters = activeFilters["frame_material"];
      if (materialFilters && materialFilters.length > 0) {
        if (!materialFilters.includes(product.frameMaterial)) return false;
      }

      // 7. Availability / Collections Match
      const availabilityFilters = activeFilters["availability"];
      if (availabilityFilters && availabilityFilters.length > 0) {
        let matches = false;
        if (availabilityFilters.includes("In Stock") && product.stockStatus === "In Stock") matches = true;
        if (availabilityFilters.includes("New Arrivals") && product.isNewArrival) matches = true;
        if (availabilityFilters.includes("Best Sellers") && product.isFeatured) matches = true;
        if (!matches) return false;
      }

      // 8. Branches Availability Match
      const branchFilters = activeFilters["branches"];
      if (branchFilters && branchFilters.length > 0) {
        const productBranchNames = product.branches.map(b => b.branchName);
        const hasMatchingBranch = branchFilters.some(filterBranch => 
          productBranchNames.some(pBranch => pBranch.toLowerCase().includes(filterBranch.toLowerCase()))
        );
        if (!hasMatchingBranch) return false;
      }

      // 9. Price Range Match
      const priceFilters = activeFilters["price_range"];
      if (priceFilters && priceFilters.length > 0) {
        const price = product.price;
        let matches = false;
        if (priceFilters.includes("Under â‚¹5,000") && price < 5000) matches = true;
        if (priceFilters.includes("â‚¹5,000 - â‚¹15,000") && price >= 5000 && price <= 15000) matches = true;
        if (priceFilters.includes("â‚¹15,000 - â‚¹30,000") && price >= 15000 && price <= 30000) matches = true;
        if (priceFilters.includes("â‚¹30,000 - â‚¹50,000") && price >= 30000 && price <= 50000) matches = true;
        if (priceFilters.includes("Luxury (Above â‚¹50,000)") && price > 50000) matches = true;
        if (!matches) return false;
      }

      return true;
    });
  }, [products, searchQuery, activeFilters, isMounted]);

  // Sorting logic applied to the filtered list
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

  // Calculate slice parameters for the current page
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(() => {
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, indexOfFirstProduct, indexOfLastProduct]);

  // Scroll smoothly back to shop-main viewport top
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    
    // Slight timeout to let DOM updates finish before scrolling
    setTimeout(() => {
      document.getElementById("shop-main")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="flex-1">
      {/* Top Bar - Fully Responsive Control Panel */}
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
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30">
            Showing {sortedProducts.length} Collections
          </span>
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

      {/* Grid Display */}
      {currentProducts.length > 0 ? (
        <GridStagger 
          key={`${currentPage}-${sortBy}`}
          className={cn(
            "grid gap-y-10 md:gap-x-8 md:gap-y-16",
            viewMode === "grid" 
              ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4" 
              : "grid-cols-1 gap-x-0"
          )}
        >
          {currentProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </GridStagger>
      ) : (
        <div className="text-center py-24 border border-dashed border-black/10 flex flex-col items-center justify-center">
          <p className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold mb-2">No items found</p>
          <p className="text-[11px] font-light text-brand-charcoal/30">Try clearing active search or filter tags.</p>
        </div>
      )}

      {/* Interactive Pagination HUD */}
      {totalPages > 1 && (
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-black/5">
          
          {/* Page Counter Stats */}
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40">
            Showing {indexOfFirstProduct + 1}â€“{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} Collections
          </span>

          {/* Dynamic Page Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "p-3 border rounded-xl flex items-center justify-center transition-all duration-300",
                currentPage === 1 
                  ? "text-brand-charcoal/10 border-black/[0.03] cursor-not-allowed" 
                  : "text-brand-charcoal border-black/5 hover:border-brand-gold hover:text-brand-gold"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-xl text-[9px] font-extrabold uppercase tracking-widest border flex items-center justify-center transition-all duration-300",
                  currentPage === page
                    ? "bg-brand-charcoal text-white border-brand-charcoal shadow-md"
                    : "bg-white text-brand-charcoal/60 border-black/5 hover:border-brand-gold hover:text-brand-gold"
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "p-3 border rounded-xl flex items-center justify-center transition-all duration-300",
                currentPage === totalPages 
                  ? "text-brand-charcoal/10 border-black/[0.03] cursor-not-allowed" 
                  : "text-brand-charcoal border-black/5 hover:border-brand-gold hover:text-brand-gold"
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Progress Bar & Status Footer if only 1 page */}
      {totalPages <= 1 && (
        <div className="mt-24 flex flex-col items-center">
          <div className="w-full max-w-xs bg-brand-pearl h-[2px] mb-8 relative">
            <div className="absolute inset-y-0 left-0 bg-brand-gold transition-all duration-700" style={{ width: `${sortedProducts.length > 0 ? 100 : 0}%` }} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 mb-10">
            Showing all {sortedProducts.length} of {products.length} Collections
          </p>
        </div>
      )}
    </div>
  );
}
