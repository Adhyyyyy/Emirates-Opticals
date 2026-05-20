"use client";

import React, { useState, useTransition } from "react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { toggleCollectionStatus } from "@/actions/cms-curation";
import { Search, Flame, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  isNewArrival: boolean;
  isFeatured: boolean;
  images: { url: string }[];
  brand: { name: string };
  category: { name: string };
}

interface CollectionListProps {
  initialProducts: Product[];
}

export function CollectionList({ initialProducts }: CollectionListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, field: "isFeatured" | "isNewArrival", currentValue: boolean) => {
    // Optimistic Update
    setProducts(prev => 
      prev.map(p => p.id === id ? { ...p, [field]: !currentValue } : p)
    );

    startTransition(async () => {
      const res = await toggleCollectionStatus(id, field, !currentValue);
      if (res.error) {
        // Rollback on error
        setProducts(prev => 
          prev.map(p => p.id === id ? { ...p, [field]: currentValue } : p)
        );
        alert(res.error);
      }
    });
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="relative max-w-md group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/30 group-focus-within:text-brand-gold transition-colors" />
        <input 
          type="text"
          placeholder="Filter catalog by product, brand, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl text-xs font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all duration-500 shadow-sm"
        />
      </div>

      {/* Curation List */}
      <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-brand-pearl/30 text-[10px] uppercase tracking-[0.25em] font-bold text-brand-charcoal/50">
                <th className="py-6 px-8">Product Entity</th>
                <th className="py-6 px-6 text-center">New Arrival Status</th>
                <th className="py-6 px-6 text-center">Top Collection (Featured)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-pearl/20 transition-all duration-300 group">
                    {/* Column 1: Info */}
                    <td className="py-5 px-8 flex items-center gap-5">
                      <div className="w-12 h-16 rounded-xl bg-brand-pearl overflow-hidden border border-black/5 flex-shrink-0 group-hover:scale-105 transition-transform duration-700 relative">
                        <OptimizedImage 
                          src={product.images[0]?.url || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=100"} 
                          alt={product.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter mb-1">{product.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">{product.brand.name}</span>
                          <span className="text-[9px] text-brand-charcoal/30">•</span>
                          <span className="text-[9px] font-medium text-brand-charcoal/40 uppercase tracking-widest">{product.category.name}</span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: New Arrival Toggle */}
                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => handleToggle(product.id, "isNewArrival", product.isNewArrival)}
                        className={cn(
                          "inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-500 shadow-sm border",
                          product.isNewArrival 
                            ? "bg-blue-50/80 text-blue-600 border-blue-500/20" 
                            : "bg-white text-brand-charcoal/40 border-black/5 hover:border-black/10"
                        )}
                      >
                        <Flame className={cn("w-3.5 h-3.5", product.isNewArrival && "fill-current animate-pulse")} />
                        {product.isNewArrival ? "New Arrival Active" : "Set New Arrival"}
                      </button>
                    </td>

                    {/* Column 3: Featured Toggle */}
                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => handleToggle(product.id, "isFeatured", product.isFeatured)}
                        className={cn(
                          "inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-500 shadow-sm border",
                          product.isFeatured 
                            ? "bg-amber-50/80 text-brand-gold border-brand-gold/20" 
                            : "bg-white text-brand-charcoal/40 border-black/5 hover:border-black/10"
                        )}
                      >
                        <Sparkles className={cn("w-3.5 h-3.5", product.isFeatured && "fill-current")} />
                        {product.isFeatured ? "Featured Collection" : "Set Featured"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-4 text-brand-charcoal/30">
                      <AlertCircle className="w-8 h-8 font-light" />
                      <p className="text-xs uppercase tracking-widest font-bold">No product entities matched search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
