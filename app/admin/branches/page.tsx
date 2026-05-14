"use client";

import React, { useState } from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Globe,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

// Mock Data for Initial UI Rendering
const MOCK_BRANCHES = [
  {
    id: "br-1",
    name: "Cochin Luxury Hub",
    district: "Ernakulam",
    address: "Marine Drive, Kochi, Kerala 682031",
    whatsapp: "+91 98765 43210",
    timings: "9:00 AM - 9:00 PM",
    isActive: true,
    image: "https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "br-2",
    name: "Trivandrum Atelier",
    district: "Trivandrum",
    address: "MG Road, Trivandrum, Kerala 695001",
    whatsapp: "+91 98765 43211",
    timings: "10:00 AM - 8:00 PM",
    isActive: true,
    image: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=600"
  }
];

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-12 pb-12">
      {/* Cinematic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Network Infrastructure</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-normal text-brand-charcoal uppercase tracking-tighter leading-none mb-6">
              Boutique <em className="italic font-light text-brand-gold/60">Registry</em>
            </h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Manage your physical retail presence. Synchronize boutique metadata, WhatsApp routing, and localized operational hours across the Kerala network.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <button className="px-10 py-5 bg-brand-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-gold transition-all duration-700 shadow-2xl group">
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500" />
            Establish New Branch
          </button>
        </Reveal>
      </header>

      {/* Utility Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 rounded-3xl border border-black/5">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search Boutique Name or District..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-pearl/20 border-none rounded-2xl py-4 pl-14 pr-6 text-xs focus:ring-2 focus:ring-brand-gold/20 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
           <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30">Status Filter:</span>
           <div className="flex p-1 bg-brand-pearl rounded-xl">
             <button className="px-4 py-2 bg-white rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-gold shadow-sm">All Active</button>
             <button className="px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 hover:text-brand-charcoal">Maintenance</button>
           </div>
        </div>
      </div>

      {/* Boutique Grid */}
      <GridStagger className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_BRANCHES.map((branch, idx) => (
          <StaggerItem key={branch.id}>
            <div className="group bg-white border border-black/5 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-1000 flex flex-col md:flex-row h-full">
              {/* Cinematic Thumbnail */}
              <div className="w-full md:w-2/5 aspect-[4/5] relative overflow-hidden">
                <img 
                  src={branch.image} 
                  alt={branch.name}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold uppercase tracking-widest text-white">
                    {branch.district}
                  </span>
                </div>
              </div>

              {/* Boutique Intel */}
              <div className="flex-1 p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-normal text-brand-charcoal tracking-tighter uppercase">{branch.name}</h3>
                    <div className="flex items-center gap-2">
                       <button className="p-3 hover:bg-brand-pearl rounded-xl text-brand-charcoal/20 hover:text-brand-gold transition-all">
                         <Edit className="w-4 h-4" />
                       </button>
                       <button className="p-3 hover:bg-red-50 rounded-xl text-brand-charcoal/20 hover:text-red-500 transition-all">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <MessageSquare className="w-4 h-4 text-brand-gold shrink-0" />
                      <p className="text-[11px] font-bold text-brand-charcoal uppercase tracking-widest">{branch.whatsapp}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                      <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">{branch.timings}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500" />
                     <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Live Sync</span>
                   </div>
                   <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors group">
                     Visit Site 
                     <Globe className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                   </button>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </GridStagger>
    </div>
  );
}
