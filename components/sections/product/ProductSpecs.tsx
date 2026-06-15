"use client";

import React from "react";
import { Product } from "@/types/shop";
import { m } from "framer-motion";
import { GridStagger, StaggerItem } from "@/components/motion/Reveal";

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = [
    { label: "Frame Material", value: product.frameMaterial || "Premium" },
    { label: "Lens Compatibility", value: product.lensType || "Standard" },
    { label: "Frame Shape", value: product.frameShape || "Standard" },
    { label: "Gender", value: product.gender || "Unisex" },
    { label: "Style Direction", value: product.style || "Classic" },
    { label: "Collection", value: product.collectionType || "Designer Brands" },
    { label: "Warranty", value: "2 Year Official" },
    ...(product.craftsmanshipDetails ? [{ label: "Craftsmanship", value: product.craftsmanshipDetails }] : []),
    ...(product.recommendedUsage ? [{ label: "Recommended For", value: product.recommendedUsage }] : []),
  ];

  return (
    <section className="w-full bg-[#0D0D0D] section-padding overflow-hidden">
      <div className="section-container">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <m.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-4"
            >
              Technical Profile
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extralight font-heading uppercase tracking-tight text-white leading-[0.95]"
            >
              Frame<br />
              <em className="italic font-light text-brand-gold">Specifications</em>
            </m.h2>
          </div>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/30 font-light leading-relaxed text-sm max-w-sm md:text-right"
          >
            Every frame passes rigorous quality assessment to ensure optical precision and long-term comfort.
          </m.p>
        </div>

        {/* Specs Grid */}
        <GridStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
          {specs.map((spec, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-[#0D0D0D] p-8 group hover:bg-white/[0.03] transition-colors duration-500 h-full">
                <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-white/25 block mb-4 group-hover:text-brand-gold transition-colors duration-500">
                  {spec.label}
                </span>
                <p className="text-lg md:text-xl font-bold text-white uppercase tracking-tighter group-hover:text-brand-gold transition-colors duration-500 line-clamp-2 break-words">
                  {spec.value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
