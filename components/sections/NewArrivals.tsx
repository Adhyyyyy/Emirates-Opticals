"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  brand: string;
  name: string;
  price?: number;
  colorsCount: number;
  primaryImage: string;
  secondaryImage: string;
  isNew?: boolean;
}

interface NewArrivalsProps {
  products: Product[];
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "new-1",
    brand: "Jacques Marie Mage",
    name: "Vivienne Sun",

    colorsCount: 4,
    primaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
  {
    id: "new-2",
    brand: "Oliver Peoples",
    name: "Evelyn Sun",

    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
    isNew: false,
  },
  {
    id: "new-3",
    brand: "DITA",
    name: "Koenig",

    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    isNew: false,
  },
  {
    id: "new-4",
    brand: "Oliver Peoples",
    name: "Gregory Peck",

    colorsCount: 6,
    primaryImage: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
];

export function NewArrivals({ products = [] }: NewArrivalsProps) {
  // Slicing to exactly 4 items for perfect symmetry (1 row on desktop, 2x2 grid on mobile)
  const displayProducts = (products.length > 0 ? products : FALLBACK_PRODUCTS).slice(0, 4);

  return (
    <section className="w-full bg-gradient-to-br from-white via-[#FAF9F6] to-white section-padding overflow-hidden">
      <div className="section-container">

        {/* Harmonized Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <m.span
            suppressHydrationWarning
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="meta-editorial mb-3"
          >
            Seasonal Editorial
          </m.span>
          <m.h2
            suppressHydrationWarning
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="h2-editorial"
          >
            New Arrivals
          </m.h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {displayProducts.map((product, idx) => (
            <m.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link href={`/product/${product.id}`} className="group cursor-pointer block">
                {/* Image container */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-50 mb-3 relative">
                  <Image
                    src={product.primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Product details */}
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-0.5 block">
                  {product.brand}
                </span>
                <h3 className="text-sm font-medium text-neutral-900 leading-snug mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-600 font-normal">
                  â‚¹{(product.price || 0).toLocaleString("en-IN")}
                </p>
              </Link>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
