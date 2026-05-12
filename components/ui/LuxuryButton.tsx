"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/motion";

interface LuxuryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  icon?: ReactNode;
}

/**
 * LUXURY BUTTON
 * A high-fidelity action trigger with premium microinteractions.
 */
export function LuxuryButton({
  children,
  onClick,
  className,
  variant = "primary",
  icon,
}: LuxuryButtonProps) {
  
  const variants = {
    primary: "bg-black text-white hover:bg-black/90",
    secondary: "bg-white text-black border border-black/10 hover:border-black",
    outline: "bg-transparent border border-black/20 text-black hover:bg-black hover:text-white",
    text: "bg-transparent text-black p-0",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE_LUXURY }}
      onClick={onClick}
      className={cn(
        "group relative px-10 py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-500",
        variants[variant],
        className
      )}
    >
      {children}
      {icon && (
        <motion.span 
          className="transition-transform duration-500 group-hover:translate-x-1"
        >
          {icon}
        </motion.span>
      )}

      {/* Signature Expanding Underline for Text Variant */}
      {variant === "text" && (
        <div className="absolute bottom-[-4px] left-0 w-8 h-[1px] bg-black/20 group-hover:w-full group-hover:bg-black transition-all duration-700" />
      )}
    </motion.button>
  );
}

/**
 * INTERACTIVE WRAPPER
 * Inject luxury kinetic DNA into any UI element.
 */
export function Interactive({
  children,
  className,
  hoverScale = 1.05,
}: {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: EASE_LUXURY }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}
