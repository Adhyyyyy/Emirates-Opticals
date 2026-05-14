"use client";

import React from "react";
import { Product } from "@/types/shop";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Info } from "lucide-react";

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = [
    { label: "Frame Material", value: product.frameMaterial },
    { label: "Lens Compatibility", value: product.lensType },
    { label: "Frame Shape", value: product.frameShape },
    { label: "Gender", value: product.gender },
    { label: "Color Way", value: product.color },
    { label: "Collection Type", value: product.collectionType },
    { label: "Brand Origin", value: "International" },
    { label: "Warranty Support", value: "2 Year Official" }
  ];

  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Header */}
          <div className="lg:w-1/3">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
                Technical<br /><em className="italic text-brand-gold">Precision</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 p-6 bg-brand-pearl/50 border border-black/5 rounded-2xl">
                <Info className="w-5 h-5 text-brand-gold flex-shrink-0 mt-1" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/60 leading-relaxed">
                  Every frame undergoes rigorous quality assessment to ensure absolute comfort and optical alignment for long-term wear.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Specs Grid */}
          <div className="lg:w-2/3">
            <GridStagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {specs.map((spec, idx) => (
                <StaggerItem key={idx}>
                  <div className="group border-b border-black/5 pb-6 hover:border-brand-gold transition-colors duration-700">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30 block mb-3 group-hover:text-brand-gold transition-colors">
                      {spec.label}
                    </span>
                    <p className="text-xl font-bold text-brand-charcoal uppercase tracking-tighter">
                      {spec.value}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>

        </div>
      </div>
    </section>
  );
}
