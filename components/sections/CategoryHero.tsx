"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryHeroProps {
  title: string;
  breadcrumb: string;
  imageLeft: string;
  imageRight: string;
}

export function CategoryHero({ title, breadcrumb, imageLeft, imageRight }: CategoryHeroProps) {
  return (
    <section className="relative w-full h-[400px] md:h-[550px] bg-[#E2DEDC] overflow-hidden flex items-center justify-center">
      
      {/* Background Gradient / Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D8D4D2] via-[#E2DEDC] to-[#D8D4D2] opacity-50" />

      {/* Breadcrumb - Top Left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-20">
        <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white drop-shadow-sm">
          {breadcrumb}
        </span>
      </div>

      {/* Hero Content Container */}
      <div className="container-tight relative h-full w-full flex items-center justify-center">
        
        {/* Left Model */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 bottom-0 h-[110%] w-[35%] md:w-[30%] z-10"
        >
          <Image 
            src={imageLeft}
            alt="Optical Fashion Left"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 50vw, 30vw"
          />
        </motion.div>

        {/* Center Title */}
        <div className="relative z-20 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-5xl md:text-8xl font-extralight tracking-[0.3em] text-white uppercase font-heading drop-shadow-md"
          >
            {title}
          </motion.h1>
          
          {/* Geometric Detail Underline */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-8 flex items-center gap-0 w-32 md:w-48 h-[2px]"
          >
            <div className="flex-1 h-full bg-white/30" />
            <div className="flex-1 h-full bg-black/80" />
          </motion.div>
        </div>

        {/* Right Model */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 bottom-0 h-[110%] w-[35%] md:w-[30%] z-10"
        >
          <Image 
            src={imageRight}
            alt="Optical Fashion Right"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 50vw, 30vw"
          />
        </motion.div>

      </div>
    </section>
  );
}
