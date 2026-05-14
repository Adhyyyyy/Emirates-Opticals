"use client";

import React, { ReactNode } from "react";
import { m, useInView, Variants } from "framer-motion";
import { fadeUp, EASE_LUXURY, DURATION_BASE, DURATION_SLOW } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

/**
 * BASE REVEAL
 * Standard fade-and-rise entrance for editorial sections.
 */
export function Reveal({
  children,
  variant = fadeUp,
  delay = 0,
  duration = DURATION_BASE,
  threshold = 0.1,
  className,
  once = true,
}: RevealProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variant}
      custom={delay}
      className={className}
      transition={{ duration, ease: EASE_LUXURY, delay }}
    >
      {children}
    </m.div>
  );
}

/**
 * IMAGE REVEAL
 * Cinematic 'Lens Discovery' with clip-path and subtle zoom.
 */
export function ImageReveal({
  children,
  delay = 0.2,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <m.div
        initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
        whileInView={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ 
          duration: DURATION_SLOW, 
          ease: EASE_LUXURY, 
          delay 
        }}
        className="w-full h-full"
      >
        {children}
      </m.div>
    </div>
  );
}

/**
 * TEXT REVEAL
 * Line-by-line editorial reveal for high-impact headers.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  
  return (
    <div className={`flex flex-wrap overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <m.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: DURATION_BASE,
            ease: EASE_LUXURY,
            delay: delay + i * 0.05,
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </m.span>
      ))}
    </div>
  );
}

/**
 * GRID STAGGER ORCHESTRATOR
 * High-precision reveal for product grids and collections.
 */
export function GridStagger({
  children,
  delay = 0.2,
  stagger = 0.1,
  className,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  threshold?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/**
 * STAGGER ITEM
 * Standardized child for GridStagger reveals.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION_BASE,
            ease: EASE_LUXURY,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
