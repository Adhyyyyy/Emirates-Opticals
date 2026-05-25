"use client";

import { m } from "framer-motion";
import { 
  Eye, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Award, 
  HeartHandshake 
} from "lucide-react";

const SERVICES = [
  {
    id: 1,
    title: "Free Eye Testing",
    description: "Comprehensive eye examinations conducted by our resident ophthalmologists using state-of-the-art diagnostic technology.",
    icon: Eye,
  },
  {
    id: 2,
    title: "Expert Styling",
    description: "Curated eyewear consultations to find the perfect frame that complements your facial architecture and personal style.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Premium Lenses",
    description: "Advanced lens technologies including blue-light protection, digital-strain relief, and ultra-thin high-index materials.",
    icon: Layers,
  },
  {
    id: 4,
    title: "Warranty Support",
    description: "Comprehensive 2-year manufacturer warranty on all luxury frames and premium lens coatings for absolute peace of mind.",
    icon: ShieldCheck,
  },
  {
    id: 5,
    title: "Authentic Brands",
    description: "Guaranteed authenticity on all global luxury brands, including Jacques Marie Mage, DITA, and Cartier.",
    icon: Award,
  },
  {
    id: 6,
    title: "After-Sales Care",
    description: "Lifetime complimentary adjustments and deep-sonic cleaning to ensure your eyewear remains in showroom condition.",
    icon: HeartHandshake,
  },
];

export function ServiceShowcase() {
  return (
    <section className="bg-[#fcfcfc] py-20 md:py-24 border-y border-black/5" id="homepage-experience">
      <div className="section-container">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            The Emirates Experience
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight mb-14 uppercase text-center"
          >
            Expert Care. Exceptional Luxury.
          </m.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 w-full">
          {SERVICES.map((service, idx) => (
            <m.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group flex flex-col gap-4"
            >
              {/* Identical Outlined Icon Container */}
              <div className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                <service.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              
              {/* Feature Title */}
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900 mt-1">
                {service.title}
              </h4>
              
              {/* Feature Description with subtle hover state */}
              <p className="text-sm text-neutral-500 leading-relaxed font-light group-hover:text-neutral-700 transition-colors duration-200">
                {service.description}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
