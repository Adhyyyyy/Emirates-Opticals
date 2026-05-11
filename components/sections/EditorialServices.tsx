"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function EditorialServices() {
  return (
    <section className="bg-black text-white section-padding overflow-hidden">
      <div className="container-tight">
        
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2-editorial text-white"
          >
            At Your Service
          </motion.h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Tall Visionist Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[600px] md:h-[800px] group cursor-pointer overflow-hidden"
          >
            <Image 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200"
              alt="Connect with a Visionist"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Top-aligned Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-12 bg-gradient-to-b from-black/60 via-transparent to-transparent">
              <h3 className="text-2xl md:text-3xl font-light mb-4 text-white">
                Connect with a Visionist
              </h3>
              <p className="text-xs md:text-sm text-white/70 max-w-sm mb-8 leading-relaxed">
                Chat now or book ahead. Our Visionists are trained in the art of styling and the craft of fitting, so you're in good hands.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Live Chat</span>
                </button>
                <button className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-white/40 hover:border-white transition-colors">
                  Book a video call
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stacked Cards */}
          <div className="flex flex-col gap-12 md:gap-16">
            
            {/* Build a Pair Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[300px] md:h-[350px] overflow-hidden mb-6">
                <Image 
                  src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200"
                  alt="Build a Pair"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-light text-white">Build a Pair</h3>
                <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/40 hover:border-white transition-colors">
                  Explore Build a Pair
                </button>
              </div>
            </motion.div>

            {/* Digital Stylist Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[300px] md:h-[350px] overflow-hidden mb-6">
                <Image 
                  src="https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=1200"
                  alt="Digital Stylist"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-light text-white">Digital Stylist</h3>
                <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/40 hover:border-white transition-colors">
                  Take the quiz
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
