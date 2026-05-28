"use client";

import { motion, m } from "framer-motion";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function EditorialServices() {
  return (
    <section className="bg-[#FAF9F6] text-brand-charcoal section-padding overflow-hidden border-t border-[#E8E4DC]">
      <div className="container-tight">
        
        {/* Section Heading - Exact Sizing */}
        <div className="text-center mb-10 md:mb-32 flex flex-col items-center">
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="h2-editorial leading-tight"
          >
            At Your <em className="italic">Service</em>
          </m.h2>
        </div>

        {/* Asymmetric Grid - Perfectly Balanced Vertical Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch h-full">
          
          {/* Left Column: Visionist Card (The Anchor) */}
          <div className="lg:col-span-7 relative h-[600px] md:min-h-[850px] group cursor-pointer overflow-hidden bg-brand-charcoal rounded-[3px]">
            <ParallaxImage 
              src="/service/At_Your_Service_-_Main_Image_1_1200x.webp"
              alt="Expert Eye Consultation"
              className="absolute inset-0 w-full h-full"
              distance={80}
            />
            
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-start bg-black/20">
              <TextReveal 
                text="Expert Eye Consultation"
                className="text-3xl md:text-5xl font-extralight mb-6 text-white font-heading italic"
                delay={0.4}
              />
              <Reveal delay={0.6}>
                <p className="body-editorial-light max-w-sm mb-10">
                  Experience professional eye testing and personalized optical guidance from trained specialists focused on comfort, clarity, and confidence.
                </p>
                <div className="flex flex-wrap items-center gap-8">
                  <Link 
                    href="/book-eye-test"
                    className="flex items-center gap-3 px-6 py-3 rounded-[3px] border border-white text-white hover:bg-white hover:text-brand-charcoal transition-all duration-500"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em]">Book Eye Test &rarr;</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Perfectly Stacked to Match Height */}
          <div className="lg:col-span-5 flex flex-col justify-between py-0 gap-12">
            
            {/* Build a Pair Card */}
            <div className="group cursor-pointer flex flex-col">
              <div className="relative h-[250px] md:h-[350px] overflow-hidden mb-5 bg-brand-charcoal rounded-[3px]">
                <ParallaxImage 
                  src="/service/At_Your_Service_-_Top_Right_1200x.webp"
                  alt="Premium Lens Solutions"
                  className="w-full h-full"
                  distance={40}
                />
              </div>
              <div className="flex items-end justify-between border-t border-brand-charcoal/10 pt-4">
                <h3 className="text-xl md:text-2xl font-extralight text-brand-charcoal font-heading italic">Premium Lens Solutions</h3>
              </div>
            </div>

            {/* Digital Stylist Card */}
            <div className="group cursor-pointer flex flex-col">
              <div className="relative h-[250px] md:h-[350px] overflow-hidden mb-5 bg-brand-charcoal rounded-[3px]">
                <ParallaxImage 
                  src="/service/At_Your_Service_-_Bottom_Right_1200x.webp"
                  alt="Styling Consultation"
                  className="w-full h-full"
                  distance={-40}
                />
              </div>
              <div className="flex items-end justify-between border-t border-brand-charcoal/10 pt-4">
                <h3 className="text-xl md:text-2xl font-extralight text-brand-charcoal font-heading italic">Styling Consultation</h3>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
