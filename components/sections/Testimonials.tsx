"use client";

import { m } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Excellent collection of authentic premium brands and very professional customer service.",
    author: "Arjun Menon",
    location: "Kerala",
    rating: 5,
  },
  {
    id: 2,
    quote: "The styling guidance was genuinely helpful. Found frames that suited me perfectly.",
    author: "Nimisha Paul",
    location: "Kerala",
    rating: 5,
  },
  {
    id: 3,
    quote: "Professional eye testing and premium store experience. Highly recommended.",
    author: "Fahad Rahman",
    location: "Kerala",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white section-padding overflow-hidden border-t border-brand-charcoal/5">
      <div className="section-container">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center mb-16 relative z-10">
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial text-center"
          >
            The Voice of our Patrons
          </m.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {TESTIMONIALS.map((patron, idx) => (
            <m.div 
              key={patron.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative bg-[#FAF9F6] border-l-[3px] border-brand-gold p-8 flex flex-col gap-5 min-h-[240px] justify-between overflow-hidden"
            >
              {/* Decorative oversized quote mark */}
              <span className="absolute top-2 left-4 font-serif text-[90px] text-brand-gold opacity-[0.08] leading-none select-none pointer-events-none">"</span>

              {/* Top Section: Stars and Quote */}
              <div className="flex flex-col gap-4 relative z-10">
                {/* Stars Row */}
                <div className="flex gap-1">
                  {[...Array(patron.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold stroke-none" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-neutral-700 leading-[1.7] font-light text-left">
                  {patron.quote}
                </p>
              </div>

              {/* Bottom Section: Author */}
              <div className="flex flex-col gap-0.5 pt-4 border-t border-brand-gold/20 relative z-10">
                <span className="text-[13px] font-semibold text-neutral-900 tracking-tight">
                  {patron.author}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] font-medium">
                  {patron.location}
                </span>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
