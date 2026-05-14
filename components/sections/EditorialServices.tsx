"use client";

import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function EditorialServices() {
  return (
    <section className="bg-black text-white py-24 md:py-32 overflow-hidden">
      <div className="container-tight">
        
        {/* Section Heading - Exact Sizing */}
        <div className="text-center mb-16 md:mb-32">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-6 block">
              Curated Luxury
            </span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] text-white uppercase font-heading leading-tight">
              At Your <em className="italic">Service</em>
            </h2>
          </Reveal>
        </div>

        {/* Asymmetric Grid - Perfectly Balanced Vertical Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch h-full">
          
          {/* Left Column: Visionist Card (The Anchor) */}
          <div className="lg:col-span-7 relative h-[600px] md:min-h-[850px] group cursor-pointer overflow-hidden bg-[#111]">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200"
              alt="Connect with a Visionist"
              className="absolute inset-0 w-full h-full"
              distance={80}
            />
            
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-start bg-black/20">
              <TextReveal 
                text="Connect with a Visionist"
                className="text-3xl md:text-5xl font-extralight mb-6 text-white font-heading italic"
                delay={0.4}
              />
              <Reveal delay={0.6}>
                <p className="text-sm md:text-[15px] text-white/90 max-w-sm mb-10 leading-relaxed font-light">
                  Chat now or book ahead. Our Visionists are trained in the art of styling and the craft of fitting, so you're in good hands.
                </p>
                <div className="flex flex-wrap items-center gap-8">
                  <button className="flex items-center gap-3 px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-500">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">Live Chat</span>
                  </button>
                  <button className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-white/70 transition-colors">
                    Book a video call
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Perfectly Stacked to Match Height */}
          <div className="lg:col-span-5 flex flex-col justify-between py-0 gap-12">
            
            {/* Build a Pair Card */}
            <div className="group cursor-pointer flex flex-col">
              <div className="relative h-[250px] md:h-[350px] overflow-hidden mb-5 bg-[#111]">
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1200"
                  alt="Build a Pair"
                  className="w-full h-full"
                  distance={40}
                />
              </div>
              <div className="flex items-end justify-between border-t border-white/20 pt-4">
                <h3 className="text-xl md:text-2xl font-extralight text-white font-heading italic">Build a Pair</h3>
                <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/60 pb-1">
                  Explore Build a Pair
                </button>
              </div>
            </div>

            {/* Digital Stylist Card */}
            <div className="group cursor-pointer flex flex-col">
              <div className="relative h-[250px] md:h-[350px] overflow-hidden mb-5 bg-[#111]">
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1200"
                  alt="Digital Stylist"
                  className="w-full h-full"
                  distance={-40}
                />
              </div>
              <div className="flex items-end justify-between border-t border-white/20 pt-4">
                <h3 className="text-xl md:text-2xl font-extralight text-white font-heading italic">Digital Stylist</h3>
                <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/60 pb-1">
                  Take the quiz
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
