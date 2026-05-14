"use client";

import React, { useState } from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  Layout, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon,
  Plus,
  Eye,
  Save,
  Trash2,
  MoveVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

export default function CMSPage() {
  const [activeModule, setActiveModule] = useState<"hero" | "banners" | "testimonials">("hero");

  const modules = [
    { id: "hero", label: "Hero Narrative", icon: Layout },
    { id: "banners", label: "Promotional Banners", icon: ImageIcon },
    { id: "testimonials", label: "Client Trust", icon: Type },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Cinematic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Narrative Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-normal text-brand-charcoal uppercase tracking-tighter leading-none mb-6">
              Content <br /><em className="italic font-light text-brand-gold/60">Management</em>
            </h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Orchestrate the cinematic storytelling of Emirates Optician. Manage high-fidelity banners, editorial collections, and brand narratives through our dynamic CMS engine.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Module Selector */}
      <div className="flex items-center gap-2 p-1 bg-brand-pearl rounded-2xl w-fit border border-black/5">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id as any)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
              activeModule === mod.id 
                ? "bg-white text-brand-gold shadow-lg" 
                : "text-brand-charcoal/40 hover:text-brand-charcoal"
            )}
          >
            <mod.icon className="w-3.5 h-3.5" />
            {mod.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content Grid */}
      <div className="bg-white p-10 md:p-16 border border-black/5 rounded-[3rem] shadow-xl">
        <AnimatePresence mode="wait">
          {activeModule === "hero" && (
            <m.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex justify-between items-center mb-8">
                 <div>
                   <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-charcoal">Main Hero Protocol</h3>
                   <p className="text-[10px] text-brand-charcoal/40 uppercase mt-2">Manage the first impression of your luxury boutique site.</p>
                 </div>
                 <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors">
                   <Eye className="w-3.5 h-3.5" />
                   Preview Cinematic Entry
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-8">
                   <div className="group relative">
                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Main Heading</label>
                     <input className="w-full bg-transparent border-b border-black/10 py-4 text-2xl font-light focus:border-brand-gold outline-none transition-all" defaultValue="EXPERIENCE VISION IN LUXURY" />
                   </div>
                   <div className="group relative">
                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Editorial Subtitle</label>
                     <textarea rows={3} className="w-full bg-brand-pearl/20 border border-black/5 p-6 rounded-2xl text-xs font-light focus:border-brand-gold outline-none transition-all" defaultValue="Discover the perfect fusion of technical precision and timeless aesthetics." />
                   </div>
                 </div>

                 <div className="space-y-8">
                   <div className="relative aspect-video bg-brand-pearl/50 rounded-[2rem] overflow-hidden group">
                     <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Hero Banner" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="px-6 py-3 bg-white rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all">Update Visual Asset</button>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <LinkIcon className="w-4 h-4 text-brand-gold" />
                     <input className="flex-1 bg-transparent border-b border-black/10 py-2 text-[10px] font-bold uppercase tracking-widest outline-none" defaultValue="/products/new-arrivals" />
                   </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-black/5 flex justify-end">
                <button className="px-12 py-5 bg-brand-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-gold transition-all">
                  <Save className="w-4 h-4" />
                  Finalize Narrative
                </button>
              </div>
            </m.div>
          )}

          {activeModule === "banners" && (
             <m.div
               key="banners"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
             >
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-charcoal">Promotional Sequence</h3>
                   <button className="px-6 py-3 bg-brand-pearl rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all flex items-center gap-3">
                      <Plus className="w-3.5 h-3.5" />
                      Add Campaign Node
                   </button>
                </div>

                <div className="space-y-4">
                   {[1, 2].map((i) => (
                     <div key={i} className="flex items-center gap-8 p-6 bg-brand-pearl/20 hover:bg-brand-pearl rounded-3xl border border-transparent hover:border-brand-gold/10 transition-all group">
                        <div className="cursor-grab active:cursor-grabbing text-brand-charcoal/20 hover:text-brand-gold transition-colors">
                           <MoveVertical className="w-5 h-5" />
                        </div>
                        <div className="w-24 h-16 bg-white rounded-xl overflow-hidden shadow-md">
                           <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Banner" />
                        </div>
                        <div className="flex-1">
                           <p className="text-xs font-bold text-brand-charcoal uppercase tracking-widest">Seasonal Collection Reveal</p>
                           <p className="text-[10px] text-brand-charcoal/40 uppercase mt-1">Status: <span className="text-brand-gold font-bold">Active</span></p>
                        </div>
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-3 hover:bg-white rounded-xl text-brand-charcoal/20 hover:text-brand-gold transition-all"><Edit className="w-4 h-4" /></button>
                           <button className="p-3 hover:bg-white rounded-xl text-brand-charcoal/20 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                     </div>
                   ))}
                </div>
             </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
