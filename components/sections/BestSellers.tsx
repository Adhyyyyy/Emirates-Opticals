"use client";

import React, { useRef, useState, useEffect } from "react";
import { m } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";

import { Reveal } from "@/components/motion/Reveal";

interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  colorsCount: number;
  primaryImage: string;
  secondaryImage: string;
}

interface BestSellersProps {
  products: Product[];
}

const FALLBACK_BEST_SELLERS = [
  {
    id: "best-1",
    brand: "Jacques Marie Mage",
    name: "Avenue Square",
    price: 1250,
    colorsCount: 3,
    primaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=800",
    hasVirtualTryOn: true,
  },
  {
    id: "best-2",
    brand: "Oliver Peoples",
    name: "Coombs Oval",
    price: 480,
    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "best-3",
    brand: "DITA",
    name: "Mach-One",
    price: 850,
    colorsCount: 5,
    primaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=800",
    hasVirtualTryOn: true,
  },
  {
    id: "best-4",
    brand: "Cartier",
    name: "Rimless Elite",
    price: 2400,
    colorsCount: 4,
    primaryImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800",
  },
];

export function BestSellers({ products = [] }: BestSellersProps) {
  const displayProducts = products.length > 0 ? products : FALLBACK_BEST_SELLERS;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = () => {
    if (!containerRef.current || !isMobile) return;
    const container = containerRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.scrollWidth / displayProducts.length;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(newIndex);
  };

  return (
    <section className="bg-white section-padding">
      <div className="container-tight">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-20">
          <m.span
            suppressHydrationWarning={true}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial mb-4"
          >
            Curated Catalog
          </m.span>
          <m.h2 
            suppressHydrationWarning={true}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial"
          >
            Top Collections
          </m.h2>
        </div>

        {/* Product Grid - Swipeable on Mobile, Grid on Desktop */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-20 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-8 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {displayProducts.map((product, idx) => (
            <m.div
              key={product.id}
              suppressHydrationWarning={true}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                scale: isMobile ? (idx === activeIndex ? 1.02 : 0.94) : 1,
                opacity: isMobile ? (idx === activeIndex ? 1 : 0.6) : 1,
              }}
              transition={{
                scale: { type: "spring", stiffness: 150, damping: 20 },
                opacity: { duration: 0.4 },
                default: { delay: idx * 0.1 }
              }}
              className="relative w-[72vw] sm:w-[45vw] lg:w-full shrink-0 snap-start snap-always"
            >
              {/* Seasonal Badge - Optional Logic */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                  Trending
                </span>
              </div>
              <ProductCard {...product} />
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
