"use client";

import React from "react";
import { PRODUCTS } from "@/lib/shop/data";
import { GridStagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "../shop/ProductCard";
import { m } from "framer-motion";

export function ProductRelated() {
  // Show 3 random-ish products (just slice for now)
  const related = PRODUCTS.slice(0, 3);

  return (
    <section className="w-full bg-white section-padding overflow-hidden border-t border-black/5">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-10 md:mb-24">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial mb-4"
          >
            Recommendations
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial"
          >
            Curated For Your Style
          </m.h2>
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
