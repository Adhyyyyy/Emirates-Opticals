"use client";

import { motion } from "framer-motion";
import { CollectionCard } from "@/components/ui/CollectionCard";

const COLLECTIONS = [
  {
    id: 1,
    title: "Elevate your sport game",
    linkText: "Discover Maui Jim Sunglasses",
    href: "/collections/maui-jim",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    title: "Travel in style",
    linkText: "Accessorize your look",
    href: "/collections/accessories",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    title: "New Prescription? Discover latest frames",
    linkText: "New Arrivals",
    href: "/collections/optical",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 4,
    title: "New Collection Alert!",
    linkText: "DITA Eyewear on Emirates",
    href: "/collections/dita",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1200"
  }
];

export function FeaturedCollections() {
  return (
    <section className="bg-white overflow-visible section-padding">
      <div className="container-tight">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="h2-editorial">
            Featured Collections
          </h2>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {COLLECTIONS.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <CollectionCard {...collection} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
