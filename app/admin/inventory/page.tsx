import React from "react";
import { InventoryTable } from "@/features/inventory/components/InventoryTable";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  Package, 
  AlertCircle, 
  MapPin, 
  ArrowUpRight 
} from "lucide-react";

import { getInventory } from "@/actions/inventory";
import { getProducts } from "@/actions/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InventoryPage() {
  const [{ data: inventory }, { data: products }] = await Promise.all([
    getInventory(),
    getProducts()
  ]);

  const totalUnits = (inventory || []).reduce((acc: number, item: any) => acc + item.quantity, 0);
  const criticalItems = (inventory || []).filter((item: any) => item.status === "LOW_STOCK").length;
  // Unique branches from inventory
  const activeBranches = new Set((inventory || []).map((item: any) => item.branchId)).size;

  return (
    <div className="space-y-12">
      {/* Header & Command Briefing */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2">Inventory Command</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Centralized stock matrix for real-time branch resource management.
            </p>
          </Reveal>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-[1px] bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Master Stock: {totalUnits} Units</span>
        </div>
      </header>

      {/* High-Level Stock Intelligence */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Asset Value", value: "Real-Time", icon: Package, color: "text-brand-gold" }, // Assuming value calculation requires price * qty
          { label: "Critical Low Stock", value: `${criticalItems} Items`, icon: AlertCircle, color: "text-red-500" },
          { label: "Active Nodes", value: `${activeBranches} Locations`, icon: MapPin, color: "text-blue-500" }
        ].map((stat, idx) => (
          <StaggerItem key={idx}>
            <div className="bg-white p-10 border border-black/5 rounded-3xl relative overflow-hidden group">
              <div className={cn("absolute top-8 right-8", stat.color)}>
                <stat.icon className="w-6 h-6 opacity-20" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/30 mb-4">{stat.label}</p>
              <div className="flex items-baseline gap-4">
                <p className="text-4xl font-bold tracking-tighter text-brand-charcoal">{stat.value}</p>
                <ArrowUpRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </StaggerItem>
        ))}
      </GridStagger>

      {/* Main Inventory Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Global Stock Matrix</h2>
        </div>
        <InventoryTable 
          inventory={inventory || []} 
          availableProducts={products || []} 
        />
      </div>

    </div>
  );
}

// Utility for status colors
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

