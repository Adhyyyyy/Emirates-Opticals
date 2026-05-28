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
    <section className="bg-gradient-to-b from-[#FAF9F6] to-white section-padding overflow-hidden" id="homepage-showcase">
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
                "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-[3px] border border-brand-charcoal/10 cursor-pointer transition-all duration-500 hover:bg-brand-charcoal hover:text-white focus:outline-none",
                activeCategory === cat
                  ? "bg-brand-charcoal text-white border-brand-charcoal"
                  : "bg-transparent text-brand-charcoal/60"
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
                const imageSrc = product.images?.[0] || "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400";
                
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug || product.id}`}
                    className="group cursor-pointer block"
                  >
                    {/* Image container */}
                    <div className="rounded-[3px] overflow-hidden relative aspect-[3/4] bg-brand-charcoal/5">
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-[3px] animate-in fade-in duration-300" />
                    </div>
                    
                    <div className="mt-2 px-1">
                      <span className="eyebrow-editorial text-brand-charcoal/40 mb-0.5">
                        {product.brand}
                      </span>
                      <h3 className="text-sm font-medium text-brand-charcoal leading-snug mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-brand-charcoal/70 font-normal">
                        â‚¹{(product.price || 0).toLocaleString("en-IN")}
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
              className="text-center py-20 border border-dashed border-black/10 rounded-[3px] flex flex-col items-center justify-center bg-[#FAF9F6]"
            >
              <p className="text-xs uppercase tracking-widest text-black/40 font-bold mb-2">No matching frames</p>
              <p className="text-[11px] font-light text-black/30 mb-6">Try refining your curation filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("All Curation");
                }}
                className="text-[10px] font-extrabold uppercase tracking-[0.2em] bg-brand-charcoal text-white hover:bg-brand-charcoal/90 py-3.5 px-8 transition-all duration-500 rounded-[3px]"
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
