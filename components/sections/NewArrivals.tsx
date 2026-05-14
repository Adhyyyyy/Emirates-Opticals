"use client";

import { m } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";
import { GridStagger, StaggerItem } from "@/components/motion/Reveal";

const PRODUCTS = [
  {
    id: "new-1",
    brand: "Jacques Marie Mage",
    name: "Vivienne Sun",
    price: 960,
    colorsCount: 4,
    primaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: "new-2",
    brand: "Jacques Marie Mage",
    name: "Evelyn Sun",
    price: 1050,
    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: "new-3",
    brand: "Jacques Marie Mage",
    name: "Koenig",
    price: 1410,
    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: "new-4",
    brand: "Oliver Peoples",
    name: "Gregory Peck",
    price: 450,
    colorsCount: 6,
    primaryImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    isNew: true
  }
];

export function NewArrivals() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        {/* Header Area */}
        <div className="flex flex-col items-center mb-20 md:mb-28">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2-editorial"
          >
            New Arrivals
          </m.h2>
        </div>

        {/* Products Grid */}
        <GridStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </GridStagger>

        {/* View All CTA */}
        <div className="mt-20 md:mt-32 flex justify-center">
          <button className="group flex items-center gap-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-charcoal hover:text-brand-gold transition-colors duration-500">
            Discover All Collections
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
        </div>
      </div>

      {/* Editorial Footer Divider */}
      <div className="mt-32 max-w-[1800px] mx-auto px-6 md:px-10">
        <div className="h-[1px] w-full bg-black/5" />
      </div>
    </section>
  );
}
