"use client";

import React from "react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductTableProps {
  products: any[];
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 bg-white border border-black/5 px-6 py-3 rounded-2xl w-full max-w-md group focus-within:border-brand-gold transition-all">
          <Search className="w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search Global Catalog..." 
            className="bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-widest w-full placeholder:text-black/10"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <LuxuryButton variant="outline" className="px-6 py-3 text-[10px] uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5 mr-2" />
            Filters
          </LuxuryButton>
          <LuxuryButton asChild className="bg-brand-charcoal text-white hover:bg-brand-gold px-6 py-3 text-[10px] uppercase tracking-widest">
            <Link href="/admin/products/new">
              <Plus className="w-3.5 h-3.5 mr-2" />
              New Product
            </Link>
          </LuxuryButton>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-brand-pearl/20">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Product</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Price</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Inventory</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-brand-pearl/10 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-lg bg-brand-pearl overflow-hidden border border-black/5 flex-shrink-0">
                        <OptimizedImage 
                          src={product.images[0]?.url || ""} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter mb-0.5">{product.name}</p>
                        <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                      product.status === "PUBLISHED" ? "bg-green-50 text-green-600" : 
                      product.status === "DRAFT" ? "bg-orange-50 text-orange-600" : 
                      "bg-gray-50 text-gray-400"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-medium text-brand-charcoal">₹{product.price.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold text-brand-charcoal/60 uppercase">124 Units</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-brand-pearl rounded-lg text-brand-charcoal/40 hover:text-brand-gold transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-brand-charcoal/40 hover:text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-brand-pearl rounded-lg text-brand-charcoal/40 hover:text-brand-charcoal transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-16 h-16 bg-brand-pearl rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-6 h-6 text-brand-charcoal/10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30">No products found in the secure vault.</p>
          </div>
        )}
      </div>
    </div>
  );
}

