"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence, animate as fmAnimate, useMotionValue } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
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
    price: 960,
    colorsCount: 4,
    primaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
  {
    id: "new-2",
    brand: "Oliver Peoples",
    name: "Evelyn Sun",
    price: 1050,
    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800",
    isNew: false,
  },
  {
    id: "new-3",
    brand: "DITA",
    name: "Koenig",
    price: 1410,
    colorsCount: 2,
    primaryImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    isNew: false,
  },
  {
    id: "new-4",
    brand: "Oliver Peoples",
    name: "Gregory Peck",
    price: 450,
    colorsCount: 6,
    primaryImage: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
];

// How many cards visible on desktop at once
const VISIBLE = 3;

// Mobile: directional slide variants
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.95 }),
};

export function NewArrivals({ products = [] }: NewArrivalsProps) {
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;
  const count = displayProducts.length;

  // Triple for seamless infinite desktop loop
  const tripled = [...displayProducts, ...displayProducts, ...displayProducts];

  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mobile state
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Desktop track state
  // trackIndex: which item in `tripled` is at the left edge of viewport
  // Start at `count` (beginning of middle copy) so we can loop both ways
  const trackIndex = useRef(count);
  const isResetting = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Dots: which item in original array is "active" on desktop
  const [desktopDotIndex, setDesktopDotIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Compute card width from viewport
  const getCardWidth = useCallback(() => {
    if (!viewportRef.current) return 0;
    const gap = 32; // 2rem gap between cards
    return (viewportRef.current.offsetWidth - gap * (VISIBLE - 1)) / VISIBLE;
  }, []);

  // Animate desktop track to a given trackIndex position
  const animateTrackTo = useCallback(
    (idx: number, smooth = true) => {
      const cardWidth = getCardWidth();
      if (cardWidth === 0) return;
      const gap = 32;
      const target = -(idx * (cardWidth + gap));
      if (smooth) {
        fmAnimate(x, target, {
          type: "spring",
          stiffness: 200,
          damping: 32,
          mass: 0.8,
        });
      } else {
        x.set(target);
      }
    },
    [x, getCardWidth]
  );

  const advanceDesktop = useCallback(() => {
    if (isResetting.current) return;
    const next = trackIndex.current + 1;
    trackIndex.current = next;
    setDesktopDotIndex(((next - count) % count + count) % count);
    animateTrackTo(next);

    // Seamless reset: after reaching 2nd copy end, snap back to 1st copy start
    if (next >= count * 2) {
      isResetting.current = true;
      setTimeout(() => {
        trackIndex.current = count;
        animateTrackTo(count, false);
        isResetting.current = false;
      }, 700); // wait for spring to settle
    }
  }, [count, animateTrackTo]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (isMobile) {
        setDirection(1);
        setMobileIndex((prev) => (prev + 1) % count);
      } else {
        advanceDesktop();
      }
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused, isMobile, count, advanceDesktop]);

  // Initialize desktop track position on mount/resize
  useEffect(() => {
    if (!isMobile) {
      animateTrackTo(count, false);
    }
  }, [isMobile, count, animateTrackTo]);

  // Mobile touch handlers
  let touchX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchX = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      const dir = delta > 0 ? 1 : -1;
      setDirection(dir);
      setMobileIndex((prev) => (prev + dir + count) % count);
    }
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-20">
          <div className="flex flex-col">
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
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0A0A0A] border-b border-[#0A0A0A]/20 hover:border-[#C9A84C] hover:text-[#C9A84C] pb-1 transition-all duration-300"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </m.div>
        </div>

        {/* ── MOBILE: AnimatePresence single-card ── */}
        {isMobile ? (
          <div
            className="relative w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={mobileIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                }}
              >
                <ProductCard {...displayProducts[mobileIndex]} />
              </m.div>
            </AnimatePresence>

            {/* Mobile dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {displayProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > mobileIndex ? 1 : -1);
                    setMobileIndex(idx);
                  }}
                  aria-label={`Go to product ${idx + 1}`}
                  style={{
                    width: mobileIndex === idx ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      mobileIndex === idx
                        ? "#C9A84C"
                        : "rgba(0,0,0,0.15)",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: Sliding track, 3 visible ── */
          <div
            ref={viewportRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <m.div
              className="flex gap-8"
              style={{ x, width: "max-content" }}
            >
              {tripled.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  style={{
                    width: viewportRef.current
                      ? `${(viewportRef.current.offsetWidth - 32 * (VISIBLE - 1)) / VISIBLE}px`
                      : "30vw",
                    flexShrink: 0,
                  }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </m.div>

            {/* Desktop dots */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {displayProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const target = count + idx;
                    trackIndex.current = target;
                    setDesktopDotIndex(idx);
                    animateTrackTo(target);
                  }}
                  aria-label={`Go to product ${idx + 1}`}
                  style={{
                    width: desktopDotIndex === idx ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      desktopDotIndex === idx
                        ? "#C9A84C"
                        : "rgba(0,0,0,0.15)",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
