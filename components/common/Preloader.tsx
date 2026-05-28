"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Glasses } from "lucide-react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick load time for the spinner
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="text-[#C9A84C]"
          >
            <Glasses className="w-12 h-12 md:w-16 md:h-16 stroke-[1.5]" />
          </m.div>
          <m.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-neutral-400"
          >
            Loading Style
          </m.span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
