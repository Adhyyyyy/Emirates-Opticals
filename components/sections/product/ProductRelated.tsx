"use client";

import React from "react";
import { PRODUCTS } from "@/lib/shop/data";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "../shop/ProductCard";

export function ProductRelated() {
  // Show 3 random-ish products (just slice for now)
  const related = PRODUCTS.slice(0, 3);

  return (
    <section className="w-full bg-white section-padding overflow-hidden border-t border-black/5">
      <div className="container-tight">
        
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Curated For<br /><em className="italic text-brand-gold">Your Style</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto" />
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
