"use client";

import { Variants } from "framer-motion";

/**
 * LUXURY MOTION TOKENS
 * Signature easing and timing for a cinematic editorial experience.
 */

export const EASE_LUXURY = [0.16, 1, 0.3, 1]; // Weighted, smooth deceleration
export const EASE_STARK = [0.19, 1, 0.22, 1];  // Fast entry, ultra-smooth end
export const EASE_CINEMATIC = [0.4, 0, 0.2, 1]; // Balanced, natural flow

export const DURATION_FAST = 0.4;
export const DURATION_BASE = 0.8;
export const DURATION_SLOW = 1.2;
export const DURATION_ATMOSPHERIC = 2.0;

/**
 * REUSABLE ANIMATION VARIANTS
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: DURATION_BASE,
      ease: EASE_LUXURY,
    },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: DURATION_BASE,
      ease: EASE_LUXURY,
    },
  }),
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_LUXURY,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const hoverMagnetic = {
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};
