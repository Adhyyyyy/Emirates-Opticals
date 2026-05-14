"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const CATEGORIES = [
  {
    id: "optical",
    title: "Optical Mastery",
    subtitle: "Clinical precision meets high fashion",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200",
    href: "/shop/optical",
  },
  {
    id: "sun",
    title: "Sun Editorial",
    subtitle: "The definitive shade collection",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1200",
    href: "/shop/sun",
  },
  {
    id: "lenses",
    title: "Lens Atelier",
    subtitle: "Advanced clarity technologies",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200",
    href: "/shop/lenses",
  },
];

export function CategoryNavigation() {
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden border-b border-black/5">
      <div className="container-tight">
        
        {/* Harmonized Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 mt-16 md:mt-24">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-4 block">
              The Visionist Gateway
            </span>
          </Reveal>
          <Reveal delay={0.4}>
            <h2 className="h2-editorial text-black">
              Curated Discovery
            </h2>
          </Reveal>
        </div>

        {/* Discovery Grid - High Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CATEGORIES.map((cat, idx) => (
            <Link key={cat.id} href={cat.href} className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden group bg-[#fcfcfc]">
              
              {/* Background Image with Cinematic Discovery */}
              <m.div 
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image 
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                />
              </m.div>

              {/* Sophisticated Light Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent group-hover:from-white/100 transition-colors duration-700" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-center text-center">
                <m.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light font-heading tracking-tight italic text-black mb-4">
                    {cat.title}
                  </h3>
                  <div className="w-10 h-[1.5px] bg-black group-hover:w-20 transition-all duration-700" />
                  <span className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore Collection
                  </span>
                </m.div>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
