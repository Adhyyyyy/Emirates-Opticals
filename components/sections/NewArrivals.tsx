"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  brandName?: string;
  categoryName?: string;
  image: string;
  secondaryImage?: string;
  color?: string;
  gender?: string;
  isNewArrival?: boolean;
}

interface NewArrivalsProps {
  products?: Product[];
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "demo-1",
    slug: "cartier-santos-de-cartier",
    name: "Cartier Santos de Cartier",
    brandName: "Cartier",
    categoryName: "Sunglasses",
    price: 68500,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    color: "Platinum / Black",
    gender: "UNISEX",
    isNewArrival: true
  },
  {
    id: "demo-2",
    slug: "prada-cinema-shield",
    name: "Prada Cinema Shield",
    brandName: "Prada",
    categoryName: "Sunglasses",
    price: 34200,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800",
    color: "Rose Gold",
    gender: "FEMALE",
    isNewArrival: true
  },
  {
    id: "demo-3",
    slug: "ray-ban-wayfarer-ease",
    name: "Ray-Ban Wayfarer Ease",
    brandName: "Ray-Ban",
    categoryName: "Sunglasses",
    price: 14500,
    image: "https://images.unsplash.com/photo-1517498327491-f903e1e281cd?auto=format&fit=crop&q=80&w=800",
    color: "Gloss Black",
    gender: "UNISEX",
    isNewArrival: true
  },
  {
    id: "demo-4",
    slug: "gucci-double-g-round",
    name: "Gucci Double G Round",
    brandName: "Gucci",
    categoryName: "Sunglasses",
    price: 38900,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    color: "Glossy Black",
    gender: "FEMALE",
    isNewArrival: true
  },
  {
    id: "demo-5",
    slug: "oakley-holbrook-prizm",
    name: "Oakley Holbrook Prizm",
    brandName: "Oakley",
    categoryName: "Sports Eyewear",
    price: 16800,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
    color: "Matte Black",
    gender: "MALE",
    isNewArrival: true
  },
  {
    id: "demo-6",
    slug: "tom-ford-henry-classic",
    name: "Tom Ford Henry Classic",
    brandName: "Tom Ford",
    categoryName: "Optical Frames",
    price: 29500,
    image: "https://images.unsplash.com/photo-1462146449396-2d7d4ba877d7?auto=format&fit=crop&q=80&w=800",
    color: "Dark Havana",
    gender: "UNISEX",
    isNewArrival: true
  }
];

export function NewArrivals({ products = [] }: NewArrivalsProps) {
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;
  const totalOriginal = displayProducts.length;

  // Triplicate the array for seamless infinite circular loop
  const infiniteItems = useMemo(() => {
    return [...displayProducts, ...displayProducts, ...displayProducts];
  }, [displayProducts]);

  // Start at the middle set (index = totalOriginal)
  const [activeIndex, setActiveIndex] = useState(totalOriginal);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Measure container for pixel-perfect dead-centering
  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        setContainerWidth(viewportRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  // When activeIndex reaches end of 2nd set (totalOriginal * 2), seamlessly jump back to 1st set (totalOriginal)
  useEffect(() => {
    if (activeIndex >= totalOriginal * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(totalOriginal);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, totalOriginal]);

  // Reset transition flag right after silent position reset
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-play timer (3.2 seconds stay per frame)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Card dimensions & offsets for dead-centering
  const cardWidth = containerWidth > 0 && containerWidth < 640 ? 280 : 310;
  const gap = 24;
  const targetX = containerWidth > 0 
    ? (containerWidth / 2 - cardWidth / 2) - activeIndex * (cardWidth + gap)
    : 0;

  const currentDotIndex = activeIndex % totalOriginal;

  return (
    <section className="w-full bg-gradient-to-b from-white via-brand-pearl/20 to-white section-padding border-b border-black/5 overflow-hidden">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <h2 className="h2-editorial text-brand-charcoal">
            Latest Arrivals
          </h2>
        </div>

        {/* Infinite Circular Track */}
        <div ref={viewportRef} className="relative w-full overflow-hidden pt-8 pb-12">
          <motion.div
            animate={{ x: `${targetX}px` }}
            transition={isTransitioning ? { type: "spring", stiffness: 220, damping: 26 } : { duration: 0 }}
            className="flex gap-6 items-center"
          >
            {infiniteItems.map((product, idx) => {
              const isActive = idx === activeIndex;

              return (
                <motion.div
                  key={`${product.id}-${idx}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  animate={{
                    scale: isActive ? 1.05 : 0.94,
                    y: isActive ? -6 : 0,
                    opacity: isActive ? 1 : 0.6
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-[280px] sm:w-[310px] shrink-0 group cursor-pointer"
                >
                  <Link href={`/product/${product.slug || product.id}`} className="block">
                    {/* Image Card */}
                    <div className={cn(
                      "relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border transition-all duration-700 shadow-sm",
                      isActive ? "border-[#C9A84C]/70 shadow-2xl ring-2 ring-[#C9A84C]/30" : "border-black/5 group-hover:border-[#C9A84C]/40"
                    )}>
                      <Image
                        src={product.image || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 80vw, 310px"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* New Tag */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                        <span className="bg-brand-charcoal/95 text-[#C9A84C] backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-extrabold uppercase tracking-[0.2em] shadow-md border border-[#C9A84C]/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#C9A84C]" />
                          New Arrival
                        </span>
                      </div>

                      {/* Glassmorphic Explore Hover Button */}
                      <div className="absolute inset-x-4 bottom-4 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-full bg-white/95 backdrop-blur-md text-brand-charcoal py-3 px-4 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-between border border-black/5 shadow-xl group-hover:bg-[#C9A84C] group-hover:text-black">
                          <span className="flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5" />
                            Explore Frame
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-4 px-1 flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                        {product.brandName || "Luxury Brand"}
                      </span>
                      <h3 className="text-sm font-medium text-brand-charcoal mt-1 line-clamp-1 group-hover:text-[#C9A84C] transition-colors duration-300">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                        <span className="text-xs font-bold text-brand-charcoal">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.gender && (
                          <span className="text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/50 bg-brand-pearl/60 px-2 py-0.5 rounded">
                            {product.gender}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {displayProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(totalOriginal + i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentDotIndex === i ? "w-6 bg-[#C9A84C]" : "w-1.5 bg-black/15 hover:bg-black/30"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>



      </div>
    </section>
  );
}
