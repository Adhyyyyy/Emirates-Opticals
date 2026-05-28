"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BRANDS = [
  {
    name: "PRADA",
    filterName: "Prada",
    type: "luxury",
    origin: "Milano, Italy",
    category: "Sophisticated Avant-Garde",
    desc: "Italian luxury defining intellectual glamour. Structural silhouettes combined with modern geometry and signature triangle badge.",
    img: "/Brands/Woman_wearing_Prada_glasses_202605281315.jpeg"
  },
  {
    name: "Cartier",
    filterName: "Cartier",
    type: "luxury",
    origin: "Paris, France",
    category: "High Jewellery Maison",
    desc: "Exquisite French jewelry design translated to optical masterworks. Finished with hand-polished gold, platinum, and Santos screws.",
    img: "/Brands/Woman_wearing_gold_Cartier_glasses_202605281315.jpeg"
  },
  {
    name: "GUCCI",
    filterName: "Gucci",
    type: "luxury",
    origin: "Florence, Italy",
    category: "Eclectic Retro Glamour",
    desc: "Maximalist frames capturing the spirit of high-fashion luxury. Rich acetates, web-stripes, and interlocking GG double-logos.",
    img: "/Brands/Androgynous_model_wearing_Gucci_._202605281315.jpeg"
  },
  {
    name: "OAKLEY",
    filterName: "Oakley",
    type: "performance",
    origin: "California, USA",
    category: "Athletic Performance",
    desc: "Engineered excellence for elite athletes. Patented High Definition Optics® matching impact protection with futuristic active ergonomics.",
    img: "/Brands/Athlete_wearing_Oakley_sunglasses_202605281315.jpeg"
  },
  {
    name: "Montblanc",
    filterName: "Montblanc",
    type: "contemporary",
    origin: "Hamburg, Germany",
    category: "Elite Craftsmanship",
    desc: "Sophisticated frames for distinguished professionals. Features minimalist German engineering, titanium, and signature snowcap star.",
    img: "/Brands/Man_wearing_Montblanc_frames_202605281316.jpeg"
  },
  {
    name: "BVLGARI",
    filterName: "BVLGARI",
    type: "luxury",
    origin: "Rome, Italy",
    category: "Italian Fine Jewelry",
    desc: "Sensual luxury frames inspired by Roman jewelry. Exquisite acetate frames decorated with precious crystal Serpenti links.",
    img: "/Brands/Woman_wearing_Bvlgari_frames_202605281327.jpeg"
  },
  {
    name: "POLICE",
    filterName: "Police",
    type: "contemporary",
    origin: "Veneto, Italy",
    category: "Urban Rebel",
    desc: "Bold metropolitan eyewear with a rebellious soul. Defining classic active urban culture with iconic blue polarized mirror lenses.",
    img: "/Brands/Man_wearing_Police_sunglasses_202605281316.jpeg"
  },
  {
    name: "LACOSTE",
    filterName: "Lacoste",
    type: "contemporary",
    origin: "Troyes, France",
    category: "Relaxed French Sport",
    desc: "Chic French athletic heritage. Easy-going frames combining vibrant colors, lightweight design, and the iconic green crocodile emblem.",
    img: "/Brands/Young_woman_wearing_Lacoste_frames_202605281316.jpeg"
  },
  {
    name: "DOLCE & GABBANA",
    filterName: "Dolce & Gabbana",
    type: "luxury",
    origin: "Milan, Italy",
    category: "High-Glamour Baroque",
    desc: "Sensual, highly expressive designs representing Sicilian luxury. Intense floral motifs, gold filigree carvings, and deep cat-eyes.",
    img: "/Brands/Woman_wearing_D&G_sunglasses_202605281316.jpeg"
  },
  {
    name: "TOM FORD",
    filterName: "Tom Ford",
    type: "luxury",
    origin: "Texas, USA",
    category: "Modern Sensuality",
    desc: "High-glamour eyewear balancing vintage charm with modern allure. Handcrafted in Italy and detailed with signature gold metal T-logos.",
    img: "/Brands/Man_in_suit_wearing_eyeglasses_202605281338.jpeg"
  },
  {
    name: "CALVIN KLEIN",
    filterName: "Calvin Klein",
    type: "contemporary",
    origin: "New York, USA",
    category: "Modern Minimalist",
    desc: "Sleek, lightweight frames built on high-fashion minimalism. Clean monochrome lines designed for effortless everyday wear.",
    img: "/Brands/Androgynous_model_wearing_Calvin._202605281317 - Copy.jpeg"
  },
  {
    name: "DIESEL",
    filterName: "Diesel",
    type: "contemporary",
    origin: "Breganze, Italy",
    category: "Futuristic Alternative",
    desc: "Industrial, military-inspired alternative luxury shapes. Built for fearless individuals expressing contemporary cyberpunk styling.",
    img: "/Brands/Tattooed_person_wearing_Diesel_s._202605281317.jpeg"
  },
  {
    name: "Vogue Eyewear",
    filterName: "Vogue Eyewear",
    type: "contemporary",
    origin: "New York, USA",
    category: "Playful Trends",
    desc: "Editorial street-style designs inspired by high fashion. Vibrant colors and lightweight materials for customizable daily looks.",
    img: "/Brands/Female_model_wearing_Vogue_Eyewear_202605281316.jpeg"
  }
];

const CATEGORIES = [
  { key: "all", name: "All Masterpieces" },
  { key: "luxury", name: "Luxury Couture" },
  { key: "performance", name: "Sports & Performance" },
  { key: "contemporary", name: "Contemporary Minimalist" }
];

export function FullBrandGrid() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBrands = useMemo(() => {
    if (activeCategory === "all") return BRANDS;
    return BRANDS.filter(b => b.type === activeCategory);
  }, [activeCategory]);

  const handleBrandClick = (filterName: string) => {
    // Redirect to products page pre-filtered with the selected brand
    router.push(`/shop?brand=${encodeURIComponent(filterName)}`);
  };

  return (
    <section className="w-full bg-[#FAF9F6] pt-40 pb-20 md:pt-12 md:pb-28 overflow-hidden" id="brand-grid">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Mobile-Only Page Title */}
        <div className="md:hidden text-center mb-12">
          <h1 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            Global Brands
          </h1>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 text-[9px] font-bold uppercase tracking-wider rounded-[3px] transition-all duration-500 border ${
                activeCategory === cat.key
                  ? "bg-brand-charcoal text-brand-gold border-brand-charcoal shadow-md"
                  : "bg-white text-brand-charcoal/50 border-black/5 hover:text-brand-charcoal hover:border-black/20"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Brand Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand, idx) => (
              <motion.div
                layout
                key={brand.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="group relative bg-white border border-black/[0.03] hover:border-brand-gold/20 p-4 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 flex flex-col justify-between"
              >
                {/* Brand Visual Image Banner */}
                <div className="relative aspect-[3/2] overflow-hidden bg-neutral-900 rounded-xl mb-6">
                  <Image 
                    src={brand.img} 
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                  {/* Subtle vignette over the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Absolute overlay of brand initials or sparkles */}
                  {brand.type === "luxury" && (
                    <div className="absolute top-3 left-3 bg-brand-charcoal/90 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-[7px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[2px] flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                      Couture
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold text-white tracking-[0.2em] uppercase font-heading drop-shadow-md bg-brand-charcoal/30 px-3 py-1 rounded-[2px] backdrop-blur-sm border border-white/10">
                      {brand.name}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex-1 flex flex-col justify-between px-2">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                        {brand.origin}
                      </span>
                      <span className="text-[7.5px] font-bold uppercase tracking-widest text-brand-charcoal/30 bg-brand-pearl/40 px-2 py-0.5 rounded-[2px]">
                        {brand.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-brand-charcoal/60 font-light leading-relaxed mb-6">
                      {brand.desc}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleBrandClick(brand.filterName)}
                    className="w-full bg-brand-charcoal hover:bg-brand-gold text-brand-gold hover:text-white border border-brand-charcoal hover:border-brand-gold text-[9px] font-bold uppercase tracking-[0.22em] py-3.5 rounded-[3px] transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg shadow-brand-charcoal/5"
                  >
                    <span>View Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
