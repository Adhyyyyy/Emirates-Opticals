"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTER_GROUPS = [
  { id: "type", label: "Type", options: ["Optical", "Sunglasses", "Lenses"] },
  { id: "designers", label: "Designers", options: ["Jacques Marie Mage", "DITA", "Cartier", "Oliver Peoples", "Ray-Ban"] },
  { id: "shape", label: "Shape", options: ["Square", "Round", "Aviator", "Cat Eye", "Oval"] },
  { id: "material", label: "Material", options: ["Acetate", "Metal", "Titanium", "Combination"] },
  { id: "size", label: "Size", options: ["Small", "Medium", "Large", "Extra Large"] },
  { id: "color", label: "Color", options: ["Black", "Tortoise", "Gold", "Silver", "Crystal"] },
  { id: "traits", label: "Traits", options: ["New Arrivals", "Best Sellers", "Virtual Try-On"] },
  { id: "style", label: "Style", options: ["Classic", "Modern", "Vintage", "Avant-Garde"] },
];

export function FilterSidebar() {
  const [gender, setGender] = useState("Unisex");
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-full md:w-72 flex flex-col gap-10 sticky top-32">
      
      {/* Gender Selector - Cinematic Slider */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between relative px-1">
          {["Masculine", "Unisex", "Feminine"].map((g) => (
            <button 
              key={g}
              onClick={() => setGender(g)}
              className={cn(
                "text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500",
                gender === g ? "text-black" : "text-black/30"
              )}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="relative h-[2px] bg-black/10 w-full rounded-full">
          <motion.div 
            animate={{ 
              left: gender === "Masculine" ? "0%" : (gender === "Unisex" ? "50%" : "100%"),
              x: gender === "Masculine" ? "0%" : (gender === "Unisex" ? "-50%" : "-100%")
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 w-3 h-3 bg-black rounded-full -translate-y-1/2 border-[3px] border-white ring-1 ring-black/10 shadow-sm"
          />
        </div>
      </div>

      {/* Virtual Try-On Toggle */}
      <label className="flex items-center gap-4 cursor-pointer group py-2">
        <div className="relative w-5 h-5 border border-black group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <motion.div 
            initial={false}
            animate={{ scale: 1 }}
            className="w-2.5 h-2.5 bg-black scale-0"
          />
        </div>
        <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-black">
          Virtual Try-On
        </span>
      </label>

      {/* Filter Groups - Accordion System */}
      <div className="flex flex-col">
        {FILTER_GROUPS.map((group) => (
          <FilterGroup 
            key={group.id}
            group={group}
            isOpen={openGroups.includes(group.id)}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </div>

    </aside>
  );
}

function FilterGroup({ group, isOpen, onToggle }: any) {
  return (
    <div className="border-b border-black/10">
      <button 
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-black group-hover:text-black/60 transition-colors">
          {group.label}
        </span>
        <Plus className={cn(
          "w-3.5 h-3.5 text-black transition-transform duration-500",
          isOpen && "rotate-45"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 flex flex-col gap-3">
              {group.options.map((option: string) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-3.5 h-3.5 border border-black/20 group-hover:border-black transition-colors" />
                  <span className="text-xs text-black/60 group-hover:text-black transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
