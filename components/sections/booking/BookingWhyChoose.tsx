"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Free Eye Testing",
  "Authentic Luxury Brands",
  "Professional Consultation",
  "Expert Styling Support",
  "Multiple Kerala Branches",
  "Premium Customer Care",
  "Advanced Lens Solutions",
  "Comfortable Retail Experience"
];

export function BookingWhyChoose() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden border-t border-black/5">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Why Customers<br /><em className="italic">Trust Emirates Optician</em>
            </h2>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {FEATURES.map((feature, idx) => (
            <StaggerItem key={idx}>
              <div className="group flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-brand-pearl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700 mb-8">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-brand-charcoal tracking-tight">
                  {feature}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
