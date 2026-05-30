"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Warehouse, 
  AlertTriangle,
  History,
  Edit3,
  Plus
} from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { InventoryUpdateDialog } from "./InventoryUpdateDialog";
import { InventoryProvisionDialog } from "./InventoryProvisionDialog";

interface InventoryTableProps {
  inventory: any[];
  availableProducts: any[];
}

export function InventoryTable({ inventory, availableProducts }: InventoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");

  // Dynamically extract unique active branches from inventory items
  const branchesList = useMemo(() => {
    const unique = new Map();
    inventory.forEach((item) => {
      if (item.branch) {
        unique.set(item.branch.id, item.branch.name);
      }
    });
    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }, [inventory]);

  // Compute filtered inventory based on reactive query and branch criteria
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const productName = item.product?.name || "";
      const productBrand = item.product?.brand || "";
      const branchName = item.branch?.name || "";

      const matchesSearch = 
        productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branchName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBranch = selectedBranch === "all" || item.branchId === selectedBranch;

      return matchesSearch && matchesBranch;
    });
  }, [inventory, searchQuery, selectedBranch]);

  return (
    <div className="space-y-8">
      {/* Search, Filter & Global Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 w-full max-w-2xl">
          {/* Real-time search box */}
          <div className="flex items-center gap-4 bg-white border border-black/5 px-6 py-4 rounded-2xl flex-1 group focus-within:border-brand-gold transition-all shadow-lg shadow-black/[0.02]">
            <Search className="w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold" />
            <input 
              type="text" 
              placeholder="Search Brand, Product Name, or Branch..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-widest w-full placeholder:text-black/10 text-brand-charcoal"
            />
          </div>

          {/* Showroom filter dropdown */}
          <div className="flex items-center gap-4 bg-white border border-black/5 px-6 py-4 rounded-2xl group focus-within:border-brand-gold transition-all shadow-lg shadow-black/[0.02]">
            <Filter className="w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold" />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest cursor-pointer text-brand-charcoal/60 focus:text-brand-charcoal"
            >
              <option value="all">All Showrooms</option>
              {branchesList.map((br) => (
                <option key={br.id} value={br.id}>{br.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <LuxuryButton variant="outline" className="px-6 py-4 text-[10px] uppercase tracking-widest">
            <History className="w-3.5 h-3.5 mr-2" />
            Audit Log
          </LuxuryButton>
          <InventoryProvisionDialog 
            availableProducts={availableProducts}
            trigger={
              <LuxuryButton className="bg-brand-charcoal text-white hover:bg-brand-gold px-8 py-4 text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3">
                <Plus className="w-3.5 h-3.5" />
                Provision Boutique Stock
              </LuxuryButton>
            }
          />
        </div>
      </div>

      {/* Main Inventory Grid */}
      <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-brand-pearl/20">
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">Product Entity</th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">Branch Location</th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">Current Stock</th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">Protocol Status</th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-24">
                    <p className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold mb-2">No Matching Inventory Records</p>
                    <p className="text-[11px] font-light text-brand-charcoal/30">Adjust your showroom selector or search criteria above.</p>
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-pearl/10 transition-all duration-500 group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-brand-pearl rounded-full flex items-center justify-center text-brand-charcoal/30">
                          <Warehouse className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter mb-1">{item.product?.name}</p>
                          <p className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">{item.product?.brand || item.product?.brandId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                        <span className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-widest">{item.branch?.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-xl font-bold tracking-tighter",
                          item.quantity <= 5 ? "text-red-500" : "text-brand-charcoal"
                        )}>
                          {item.quantity}
                        </span>
                        <span className="text-[9px] font-bold text-brand-charcoal/20 uppercase tracking-widest">Units</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
                        item.status === "IN_STOCK" ? "bg-green-50 text-green-600" :
                        item.status === "LOW_STOCK" ? "bg-red-50 text-red-600 animate-pulse" :
                        "bg-gray-50 text-gray-400"
                      )}>
                        {item.status === "LOW_STOCK" && <AlertTriangle className="w-3 h-3" />}
                        <span className="text-[9px] font-bold uppercase tracking-widest">
                          {(item.status || "IN_STOCK").replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <InventoryUpdateDialog 
                        item={item}
                        trigger={
                          <button className="p-3 hover:bg-brand-pearl rounded-xl text-brand-charcoal/20 hover:text-brand-gold transition-all">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
