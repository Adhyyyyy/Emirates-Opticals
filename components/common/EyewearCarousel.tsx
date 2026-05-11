"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FEATURED_FRAMES = [
  { id: 1, name: "The Artisan", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format" },
  { id: 2, name: "Classic Aviator", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=400&auto=format" },
  { id: 3, name: "Modern Round", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=400&auto=format" },
  { id: 4, name: "Retro Square", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=400&auto=format" },
  { id: 5, name: "Luxe Gradient", image: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?q=80&w=400&auto=format" },
  { id: 6, name: "Heritage Gold", image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=400&auto=format" },
];

export function EyewearCarousel() {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[96%] max-w-[1500px] bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 px-6 md:px-12 py-2 md:py-3.5 overflow-hidden z-30"
    >
      <div className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar">
        {FEATURED_FRAMES.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex-shrink-0 cursor-pointer group"
          >
            <div className="relative w-24 md:w-32 h-12 md:h-16 flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-contain transition-all duration-700 brightness-[0.9] group-hover:brightness-100"
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Scroll Indicator Dot */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-charcoal text-white flex items-center justify-center text-[10px] cursor-pointer hover:bg-brand-gold transition-colors">
        ...
      </div>
    </motion.div>
  );
}
