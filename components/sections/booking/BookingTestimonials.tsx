"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    text: "Professional eye testing and excellent customer service. The team was very patient and explained everything clearly.",
    author: "Anjali Nair"
  },
  {
    text: "Premium collections and expert guidance throughout the experience. Found the perfect frames that match my style.",
    author: "Rahul Varma"
  },
  {
    text: "Comfortable atmosphere and authentic luxury eyewear. Definitely the best optical experience in Kerala.",
    author: "Sneha Joseph"
  }
];

export function BookingTestimonials() {
  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative">
      <div className="container-tight relative z-10">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Trusted Experiences<br /><em className="italic">Across Kerala</em>
            </h2>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white p-12 border border-black/5 hover:border-brand-gold/20 transition-all duration-700 h-full flex flex-col relative">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-brand-gold/10" />
                
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-3 h-3 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <p className="text-lg md:text-xl font-light text-brand-charcoal italic leading-relaxed mb-10 flex-1">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">
                    {review.author}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
