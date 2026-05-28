"use client";

import React from "react";
import { motion } from "framer-motion";
import { Glasses } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FAF9F6] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Rotating Premium Eyewear */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="text-[#C9A84C]"
      >
        <Glasses className="w-12 h-12 md:w-16 md:h-16 stroke-[1.5]" />
      </motion.div>
      
      {/* Luxury Loading Subtitle */}
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-charcoal/40"
      >
        Loading Style
      </motion.span>
      
    </div>
  );
}
