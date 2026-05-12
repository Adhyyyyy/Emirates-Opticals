"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";

const BEST_SELLER_PRODUCTS = [
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
    primaryImage: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
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
    primaryImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800",
  },
];

export function BestSellers() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-tight">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-black/40 mb-4"
          >
            Top Collections
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light font-heading tracking-tight italic"
          >
            The Best Sellers
          </motion.h3>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
          {BEST_SELLER_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Seasonal Badge - Optional Logic */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                  Trending
                </span>
              </div>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {/* View All Action */}
        <div className="mt-20 flex justify-center">
          <button className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:text-black/60 transition-colors">
            Explore All Best Sellers
            <div className="w-8 h-[1.5px] bg-black/10 group-hover:w-16 group-hover:bg-black transition-all duration-700" />
          </button>
        </div>

      </div>
    </section>
  );
}
