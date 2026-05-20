"use client";

import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
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

// Slide direction: +1 = going forward (slide left), -1 = going back (slide right)
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.94,
  }),
};

export function FeaturedCollections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const advance = useCallback((dir: number) => {
    setDirection(dir);
    setActiveIndex((prev) =>
      (prev + dir + COLLECTIONS.length) % COLLECTIONS.length
    );
  }, []);

  // Auto-advance loop
  useEffect(() => {
    if (!isMobile || isPaused) return;
    const timer = setInterval(() => advance(1), 3500);
    return () => clearInterval(timer);
  }, [isMobile, isPaused, advance]);

  // Swipe gesture detection
  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) advance(delta > 0 ? 1 : -1);
    // Resume auto-loop after 6s idle
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section className="bg-[#0A0A0A] overflow-hidden section-padding border-y border-[#1E1E1E]">
      <div className="container-tight">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-24">
          <m.span
            suppressHydrationWarning
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial-light mb-4"
          >
            Curated Architecture
          </m.span>
          <m.h2
            suppressHydrationWarning
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial-light"
          >
            Featured Collections
          </m.h2>
        </div>

        {/* ── MOBILE: Single-card AnimatePresence carousel ── */}
        {isMobile ? (
          <div
            className="relative w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.35 },
                }}
                className="w-full"
              >
                <CollectionCard {...COLLECTIONS[activeIndex]} />
              </m.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {COLLECTIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: activeIndex === idx ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: activeIndex === idx
                      ? "#C9A84C"
                      : "rgba(255,255,255,0.2)",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: Static 2-column grid ── */
          <div className="grid grid-cols-2 gap-x-12 gap-y-20">
            {COLLECTIONS.map((collection, index) => (
              <m.div
                key={collection.id}
                suppressHydrationWarning
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: index * 0.1 }}
              >
                <CollectionCard {...collection} />
              </m.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
