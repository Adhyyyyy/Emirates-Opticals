"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE_LUXURY, DURATION_BASE } from "@/lib/motion";

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
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: DURATION_BASE,
            ease: EASE_LUXURY,
            delay: 0.1
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20, 
          scale: 0.98,
          transition: {
            duration: 0.5,
            ease: EASE_LUXURY
          }
        }}
        className="w-full relative"
      >
        {children}
        
        {/* Subtle Route Indicator - Premium Polish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          className="fixed inset-0 bg-white z-[9999] pointer-events-none flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/20 animate-pulse">
              Emirates Opticians
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
