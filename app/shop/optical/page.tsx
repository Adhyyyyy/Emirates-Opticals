import React from "react";
import { CategoryHero } from "@/components/sections/CategoryHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/sections/FilterSidebar";

const OPTICAL_PRODUCTS = [
  {
    id: "1",
    name: "Avenue Square",
    brand: "Jacques Marie Mage",
    price: 1250,
    primaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    hasVirtualTryOn: true,
    colorsCount: 3,
  },
  {
    id: "2",
    name: "Coombs Oval",
    brand: "Oliver Peoples",
    price: 480,
    primaryImage: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    colorsCount: 2,
  },
  {
    id: "3",
    name: "Mach-One",
    brand: "DITA",
    price: 850,
    primaryImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    hasVirtualTryOn: true,
    colorsCount: 5,
  },
  {
    id: "4",
    name: "Rimless Elite",
    brand: "Cartier",
    price: 2400,
    primaryImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800",
    colorsCount: 4,
  },
];

export default function OpticalPage() {
  return (
    <main className="flex flex-col">
      <CategoryHero 
        title="Optical"
        breadcrumb="Home / Optical"
        imageLeft="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200"
        imageRight="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1200"
      />
      
      {/* Product Grid Section */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-6">
            <div className="flex items-center gap-8">
              <button className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                Hide Filters
                <span className="w-3 h-3 border-[1px] border-black" />
              </button>
              <button className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                Sort By Recommended
              </button>
            </div>
            <span className="text-[10px] md:text-xs font-medium text-black/40 uppercase tracking-[0.2em]">
              {OPTICAL_PRODUCTS.length} Results
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <FilterSidebar />
            </div>

            {/* Grid */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {OPTICAL_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
