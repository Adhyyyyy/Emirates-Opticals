"use client";

import { LazyMotion, domMax, m } from "framer-motion";
import React from "react";

/**
 * PRODUCTION MOTION OPTIMIZATION
 * Uses domMax (subset of Framer Motion) to reduce bundle size
 * Only loads the animation engine when needed.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax}>
      {children}
    </LazyMotion>
  );
}

// Re-export the motion component as 'm' for optimized usage
export const Motion = m;
