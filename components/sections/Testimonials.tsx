"use client";

import { m } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The attention to facial architecture during my styling session was unparalleled. I've never felt more confident in my frames.",
    author: "Arjun S.",
    location: "Calicut",
    rating: 5,
  },
  {
    id: 2,
    quote: "Expert clinical care met with world-class luxury. The digital-strain lenses have completely changed my workflow.",
    author: "Meera Nair",
    location: "Kochi",
    rating: 5,
  },
  {
    id: 3,
    quote: "A definitive destination for the true eyewear connoisseur. Their collection of Jacques Marie Mage is the best in India.",
    author: "Rohan Kapoor",
    location: "Dubai / Kerala",
    rating: 5,
  },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export function Testimonials() {
  return (
    <section className="bg-[#FAF8F5] py-20 overflow-hidden border-t border-neutral-200">
      <div className="section-container">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <m.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="meta-editorial mb-3 text-center"
          >
            Patron Experiences
          </m.span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 w-full">
          {TESTIMONIALS.map((patron, idx) => (
            <m.div 
              key={patron.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col gap-5 min-h-[240px] justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Top Section: Stars and Quote */}
              <div className="flex flex-col gap-4">
                {/* Stars Row */}
                <div className="flex gap-1 text-amber-400 text-base">
                  {[...Array(patron.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-none" />
                  ))}
                </div>

                {/* Left-Aligned Quote */}
                <p className="text-[15px] text-neutral-800 leading-relaxed font-light text-left">
                  <span className="font-serif italic text-lg text-neutral-400 mr-0.5 select-none">“</span>
                  {patron.quote}
                </p>
              </div>

              {/* Bottom Section: Author Row */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-100">
                {/* Initial-based Avatar */}
                <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-medium shrink-0 select-none">
                  {getInitials(patron.author)}
                </div>
                
                {/* Author Name and Location */}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-neutral-900">
                    {patron.author}
                  </span>
                  <span className="text-xs text-neutral-400 uppercase tracking-[0.1em] mt-0.5">
                    {patron.location}
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
