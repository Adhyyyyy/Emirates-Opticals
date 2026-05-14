"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { MapPin, Phone, MessageCircle, Navigation, Calendar } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

const BRANCHES = [
  {
    name: "Emirates Optician, Changanassery",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103",
    phone: "+91 96829 29968",
    img: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Emirates Optician, Thiruvalla",
    address: "Karappunnasseril Arcade, Thirumoolapuram, Thiruvalla, Kerala 689115",
    phone: "+91 80000 00002",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Emirates Optician, Kumbanad",
    address: "Bethel Complex, Kumbanad, Kerala 689547",
    phone: "+91 80000 00003",
    img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Emirates Optician, Kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Kothamangalam, Kerala 686691",
    phone: "+91 80000 00004",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Emirates Optician, Pandalam",
    address: "Karandiyil Building, IV/558-2, Thonallor, Pandalam, Kerala 689501",
    phone: "+91 80000 00005",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Emirates Optician, Kakkanad",
    address: "Seaport-Airport Road, Chittethukara, Kakkanad, Kerala 682037",
    phone: "+91 80000 00006",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
  }
];

export function ContactBranchShowcase() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-8">
              Contact Your<br />Nearest Branch
            </h2>
          </Reveal>
        </div>

        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch, idx) => (
            <StaggerItem key={idx}>
              <div className="group bg-brand-pearl border border-black/5 hover:border-brand-gold/30 transition-all duration-700 h-full flex flex-col overflow-hidden">
                {/* Branch Image */}
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={branch.img} 
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/20 group-hover:bg-transparent transition-colors duration-1000" />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-tighter mb-6 leading-tight">
                    {branch.name}
                  </h3>
                  
                  <div className="space-y-4 mb-8 flex-1">
                    <div className="flex items-start gap-4 text-xs font-light text-brand-charcoal/60">
                      <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-light text-brand-charcoal/60">
                      <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <LuxuryButton asChild variant="outline" className="text-[9px] py-3 px-1">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + " " + branch.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-3 h-3 mr-1.5" />
                        Map
                      </a>
                    </LuxuryButton>
                    <LuxuryButton 
                      onClick={() => window.open(`https://wa.me/${branch.phone.replace(/\D/g,"")}`, "_blank")}
                      className="text-[9px] py-3 px-1 bg-green-600 border-green-600 text-white hover:bg-green-700"
                    >
                      <MessageCircle className="w-3 h-3 mr-1.5" />
                      WhatsApp
                    </LuxuryButton>
                  </div>
                  
                  <LuxuryButton 
                    asChild
                    className="w-full text-[10px] py-3 bg-brand-charcoal text-white hover:bg-brand-gold"
                  >
                    <Link href="/book-eye-test">Book Eye Test</Link>
                  </LuxuryButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>

      </div>
    </section>
  );
}
