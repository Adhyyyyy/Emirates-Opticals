"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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

export function Testimonials() {
  return (
    <section className="bg-black text-white py-24 md:py-32 overflow-hidden">
      <div className="container-tight">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full mb-8"
          >
            <Quote className="w-5 h-5 text-white/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-4"
          >
            Patron Experiences
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light font-heading tracking-tight italic"
          >
            The Voice of our Patrons
          </motion.h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {TESTIMONIALS.map((patron, idx) => (
            <motion.div 
              key={patron.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group flex flex-col items-center text-center p-8 border border-white/5 hover:bg-white/5 transition-all duration-700"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-8">
                {[...Array(patron.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-white stroke-none opacity-40 group-hover:opacity-100 transition-opacity" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl font-light font-heading italic leading-relaxed mb-10 text-white/80 group-hover:text-white transition-colors">
                "{patron.quote}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  {patron.author}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
                  {patron.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
