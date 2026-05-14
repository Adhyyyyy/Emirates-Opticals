"use client";

import React, { useRef } from "react";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
  priority?: boolean;
}

/**
 * PARALLAX IMAGE COMPONENT
 * Provides a high-fidelity 'Weightless' scroll effect for editorial photography.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  distance = 100,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll progress for a 'Weightless' luxury feel
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const y = useTransform(springProgress, [0, 1], [-distance, distance]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
    >
      <m.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </m.div>
    </div>
  );
}
