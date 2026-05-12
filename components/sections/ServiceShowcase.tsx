"use client";

import { motion } from "framer-motion";
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
    <section className="bg-white py-24 md:py-32">
      <div className="container-tight">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-black/40 mb-4"
          >
            The Emirates Experience
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light font-heading tracking-tight italic"
          >
            Expert Care. Exceptional Luxury.
          </motion.h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-start"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#f8f8f8] mb-8 group-hover:bg-black transition-colors duration-500">
                <service.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-500 stroke-[1.5]" />
              </div>
              
              <h4 className="text-[13px] md:text-sm font-bold uppercase tracking-widest text-black mb-4">
                {service.title}
              </h4>
              
              <div className="w-12 h-[1px] bg-black/10 mb-6 group-hover:w-24 group-hover:bg-black transition-all duration-700" />
              
              <p className="text-sm leading-relaxed text-black/60 font-light max-w-[320px]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
