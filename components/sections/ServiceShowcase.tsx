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
    title: "Professional Eye Testing",
    description: "Comprehensive eye examinations using advanced diagnostic equipment to assess visual clarity and overall eye health.",
    icon: Eye,
  },
  {
    id: 2,
    title: "Premium Lens Solutions",
    description: "High-quality lenses tailored to your lifestyle, including progressive, blue-cut, and anti-glare technologies.",
    icon: Layers,
  },
  {
    id: 3,
    title: "Styling Consultation",
    description: "Expert guidance to help you find frames that perfectly complement your face shape and personal style.",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Premium Sunglasses",
    description: "Luxury sunglasses combining premium aesthetics with superior UV protection and polarized options.",
    icon: Award,
  },
  {
    id: 5,
    title: "100% Authentic Brands",
    description: "Every luxury frame and sunglass is guaranteed authentic, sourced directly from authorized global distributors.",
    icon: ShieldCheck,
  },
  {
    id: 6,
    title: "After-Sales Support",
    description: "Lifetime complimentary adjustments and deep-sonic cleaning to ensure your eyewear remains pristine.",
    icon: HeartHandshake,
  },
];

export function ServiceShowcase() {
  return (
    <section className="bg-white section-padding" id="homepage-experience">
      <div className="section-container">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial uppercase mb-14 text-center"
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
              {/* Premium Gold Circle Icon Container */}
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute inset-0 rounded-full bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon className="w-5 h-5 stroke-[1.5] text-brand-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Feature Title */}
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-charcoal mt-1">
                {service.title}
              </h4>
              
              {/* Feature Description with subtle hover state */}
              <p className="text-sm text-neutral-600 leading-relaxed font-light group-hover:text-brand-charcoal transition-colors duration-200">
                {service.description}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
