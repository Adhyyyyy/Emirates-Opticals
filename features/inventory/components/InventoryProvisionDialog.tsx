"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { 
  Plus, 
  Search, 
  Package,
  Check,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { initializeBranchStock } from "@/actions/inventory";

interface InventoryProvisionDialogProps {
  availableProducts: any[];
  trigger: React.ReactNode;
}

export function InventoryProvisionDialog({ availableProducts, trigger }: InventoryProvisionDialogProps) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = availableProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleProvision = async () => {
    if (!selectedProductId) return;
    setIsSubmitting(true);
    try {
      const result = await initializeBranchStock(selectedProductId, quantity);
      if (result.success) {
        setIsOpen(false);
        setSelectedProductId("");
        setQuantity(0);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white rounded-[3rem] border-none shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-0 overflow-hidden">
        <div className="p-12 space-y-10">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-brand-pearl rounded-2xl flex items-center justify-center text-brand-gold">
                  <Package className="w-6 h-6" />
               </div>
               <div>
                 <DialogTitle className="text-xl font-normal text-brand-charcoal uppercase tracking-tighter">Stock Provisioning</DialogTitle>
                 <p className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-widest mt-1">Initialize Global Asset to Boutique</p>
               </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Selection */}
            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Select Master Product</label>
              <div className="flex items-center gap-3 bg-brand-pearl/50 border border-black/5 px-4 py-3 rounded-2xl">
                <Search className="w-4 h-4 text-brand-charcoal/20" />
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter Catalog..."
                  className="bg-transparent border-none outline-none text-xs w-full"
                />
              </div>
              <div className="h-[300px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-300 group flex items-center justify-between",
                      selectedProductId === p.id 
                        ? "bg-brand-charcoal border-brand-charcoal text-white" 
                        : "bg-white border-black/5 hover:border-brand-gold"
                    )}
                  >
                    <div>
                      <p className={cn("text-[10px] font-bold uppercase tracking-tighter", selectedProductId === p.id ? "text-white" : "text-brand-charcoal")}>{p.name}</p>
                      <p className={cn("text-[9px] font-bold uppercase tracking-widest mt-1", selectedProductId === p.id ? "text-white/40" : "text-brand-gold")}>{p.brand?.name}</p>
                    </div>
                    {selectedProductId === p.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Initialization Parameters */}
            <div className="space-y-10 flex flex-col justify-center">
               <div className="p-8 bg-brand-pearl/30 rounded-[2.5rem] border border-black/5 space-y-6">
                  <div className="text-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-6">Initial Units</label>
                    <div className="flex items-center justify-center gap-8">
                       <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all">-</button>
                       <span className="text-4xl font-bold tracking-tighter text-brand-charcoal">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all">+</button>
                    </div>
                  </div>
               </div>

               <div className="p-6 border border-brand-gold/10 rounded-2xl bg-brand-pearl/20">
                  <p className="text-[10px] leading-relaxed text-brand-charcoal/60 font-light italic">
                    "Provisioning will establish a new inventory node for your boutique within the global Emirates Optician network."
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-brand-pearl/30 border-t border-black/5 flex items-center justify-between">
           <button 
             onClick={() => setIsOpen(false)}
             className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30 hover:text-brand-charcoal transition-colors"
           >
             Cancel Protocol
           </button>
           <LuxuryButton 
             onClick={handleProvision}
             disabled={isSubmitting || !selectedProductId}
             className="px-12 py-5 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center gap-3 group"
           >
             {isSubmitting ? "Initializing..." : "Establish Stock Node"}
             <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
           </LuxuryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
