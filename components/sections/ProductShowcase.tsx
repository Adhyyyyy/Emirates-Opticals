"use client";

import React, { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Product } from "@/types/shop";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ProductShowcaseProps {
  initialProducts: Product[];
}

const CATEGORIES = [
  "All Curation",
  "Optical Frames",
  "Sunglasses",
  "Sports Eyewear",
  "Luxury Collection"
];

export function ProductShowcase({ initialProducts }: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("All Curation");

  // Client-side filtering by category
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (activeCategory === "All Curation") return true;
      return product.category === activeCategory;
    });
  }, [initialProducts, activeCategory]);

  // Display a curated limit of 8 items for perfect row symmetry (2 rows on desktop, 4 on mobile)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, 8);
  }, [filteredProducts]);

  return (
    <section className="bg-[#FAF8F5] py-20 overflow-hidden" id="homepage-showcase">
      <div className="section-container">
        
        {/* Harmonized Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <m.span
            suppressHydrationWarning
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="meta-editorial mb-3"
          >
            The Visionist Atelier
          </m.span>
          <m.h2
            suppressHydrationWarning
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="h2-editorial"
          >
            Curated Showcase
          </m.h2>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-xs uppercase tracking-[0.15em] px-5 py-2 rounded-full border border-neutral-200 cursor-pointer transition-all duration-200 hover:bg-neutral-900 hover:text-white focus:outline-none",
                activeCategory === cat
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-transparent text-neutral-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stunning Discovery Grid */}
        <AnimatePresence mode="wait">
          {displayedProducts.length > 0 ? (
            <m.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {displayedProducts.map((product) => {
                // Handle image arrays and string stand-ins cleanly
                const imageSrc = product.images?.[0] || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400";
                
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug || product.id}`}
                    className="group cursor-pointer block"
                  >
                    {/* Image container */}
                    <div className="rounded-2xl overflow-hidden relative aspect-[3/4] bg-neutral-100">
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-2xl animate-in fade-in duration-300" />
                    </div>
                    
                    {/* Card footer (outside image) */}
                    <div className="mt-2 px-1">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-0.5 block">
                        {product.brand}
                      </span>
                      <h3 className="text-sm font-medium text-neutral-900 leading-snug mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-600 font-normal">
                        ₹{(product.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </m.div>
          ) : (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-black/10 rounded-2xl flex flex-col items-center justify-center bg-[#FAF9F6]"
            >
              <p className="text-xs uppercase tracking-widest text-black/40 font-bold mb-2">No matching frames</p>
              <p className="text-[11px] font-light text-black/30 mb-6">Try refining your curation filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("All Curation");
                }}
                className="text-[10px] font-extrabold uppercase tracking-widest bg-neutral-900 text-white hover:bg-neutral-800 py-3.5 px-8 transition-all rounded-full"
              >
                Reset Curation Filters
              </button>
            </m.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
