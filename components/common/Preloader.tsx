"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading or wait for window load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // 2.8s for a cinematic 'slow-burn' feel

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Layer 1: Ambient Noise/Texture */}
          <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />

          {/* Layer 2: Branded Narrative */}
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "1em", scale: 1.1 }}
              animate={{ opacity: 1, letterSpacing: "0.4em", scale: 1 }}
              transition={{ duration: 1.8, ease: EASE_LUXURY }}
              className="flex flex-col items-center"
            >
              <span className="text-xl md:text-3xl text-white font-light uppercase tracking-[0.4em] font-heading">
                Emirates
              </span>
              <span className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-[0.8em] mt-4 ml-[0.8em]">
                Opticians
              </span>
            </motion.div>

            {/* Layer 3: Minimalist Progress Signal */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mt-4">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="absolute inset-0 bg-white"
              />
            </div>
          </div>

          {/* Atmospheric Subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 text-[8px] font-bold uppercase tracking-[0.5em] text-white"
          >
            Spring Editorial 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
