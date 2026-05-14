"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Search, ChevronDown, LayoutGrid, List } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/shop";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Basic client-side search filtering
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1">
      {/* Top Bar - Desktop */}
      <div className="hidden lg:flex items-center justify-between mb-12 pb-6 border-b border-black/5">
        <div className="flex items-center gap-10">
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search Luxury Eyewear..."
              className="bg-transparent border-none outline-none py-2 pl-8 pr-4 text-xs font-medium tracking-tight w-64 focus:w-80 transition-all duration-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30">
            Showing {filteredProducts.length} Collections
          </span>
        </div>

        <div className="flex items-center gap-8">
          {/* Sorting */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 group-hover:text-brand-charcoal transition-colors">Sort By</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">New Arrivals</span>
              <ChevronDown className="w-3 h-3 text-brand-gold group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>
          
          <div className="w-[1px] h-4 bg-black/5" />
          
          {/* View Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-1 transition-colors", viewMode === "grid" ? "text-brand-gold" : "text-brand-charcoal/20 hover:text-brand-charcoal")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-1 transition-colors", viewMode === "list" ? "text-brand-gold" : "text-brand-charcoal/20 hover:text-brand-charcoal")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <GridStagger className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
        {filteredProducts.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </GridStagger>

      {/* Pagination / Load More */}
      <div className="mt-24 flex flex-col items-center">
        <div className="w-full max-w-xs bg-brand-pearl h-[2px] mb-8 relative">
          <div className="absolute inset-y-0 left-0 bg-brand-gold w-1/2" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 mb-10">
          Showing 4 of 48 Collections
        </p>
        <button className="px-16 py-5 border border-black/10 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-brand-charcoal hover:text-white transition-all duration-700">
          View More Collections
        </button>
      </div>
    </div>
  );
}

// Helper function for cn since I might not have it in local scope
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
