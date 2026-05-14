"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE_LUXURY, EASE_EXPO, DURATION_SLOW } from "@/lib/motion";

/**
 * PAGE TRANSITION ORCHESTRATOR
 * Provides a cinematic 'Curated Reveal' transition between routes.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          transition: {
            duration: DURATION_SLOW,
            ease: EASE_LUXURY,
            delay: 0.2
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -10, 
          transition: {
            duration: 0.6,
            ease: EASE_LUXURY
          }
        }}
        className="w-full relative"
      >
        {children}
        
        {/* Cinematic Route Mask - Luxury Transition Element */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          style={{ originY: 0 }}
          className="fixed inset-0 bg-brand-pearl z-[9999] pointer-events-none"
        />
      </motion.div>
    </AnimatePresence>
  );
}
