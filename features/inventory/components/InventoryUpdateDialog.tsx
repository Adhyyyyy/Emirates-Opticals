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
  Minus, 
  Save, 
  AlertTriangle,
  Package,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateStockLevel } from "@/actions/inventory";
import { m, AnimatePresence } from "framer-motion";

interface InventoryUpdateDialogProps {
  item: any;
  trigger: React.ReactNode;
}

export function InventoryUpdateDialog({ item, trigger }: InventoryUpdateDialogProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const result = await updateStockLevel(item.id, quantity);
      if (result.success) {
        setIsOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusInfo = quantity === 0 
    ? { label: "OUT OF STOCK", color: "text-red-500", bg: "bg-red-50" }
    : quantity <= 5 
    ? { label: "CRITICAL LOW", color: "text-orange-500", bg: "bg-orange-50" }
    : { label: "OPTIMAL STOCK", color: "text-green-600", bg: "bg-green-50" };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white rounded-[3rem] border-none shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-0 overflow-hidden">
        <div className="p-12 space-y-10">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-brand-pearl rounded-2xl flex items-center justify-center text-brand-gold">
                  <Package className="w-6 h-6" />
               </div>
               <div>
                 <DialogTitle className="text-xl font-normal text-brand-charcoal uppercase tracking-tighter">Stock Adjustment</DialogTitle>
                 <p className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-widest mt-1">Boutique Inventory Protocol</p>
               </div>
            </div>
          </DialogHeader>

          {/* Product Intel */}
          <div className="bg-brand-pearl/30 p-8 rounded-3xl border border-black/5">
            <p className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-2">{item.product.brand}</p>
            <h3 className="text-lg font-normal text-brand-charcoal tracking-tight uppercase leading-tight mb-4">{item.product.name}</h3>
            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest">Current Node</span>
              <span className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">{item.branch.name}</span>
            </div>
          </div>

          {/* Adjustment Interface */}
          <div className="space-y-8">
             <div className="flex items-center justify-between bg-white border border-black/5 p-6 rounded-[2rem] shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="w-14 h-14 bg-brand-pearl rounded-2xl flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-500"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                   <span className="text-6xl font-bold tracking-tighter text-brand-charcoal">{quantity}</span>
                   <p className="text-[10px] font-bold text-brand-charcoal/20 uppercase tracking-[0.3em] mt-1">Units</p>
                </div>

                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 bg-brand-pearl rounded-2xl flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-500"
                >
                  <Plus className="w-5 h-5" />
                </button>
             </div>

             {/* Dynamic Status Preview */}
             <div className={cn(
               "flex items-center justify-between p-6 rounded-2xl border transition-all duration-700",
               statusInfo.bg,
               "border-transparent"
             )}>
                <div className="flex items-center gap-3">
                  {quantity <= 5 && <AlertTriangle className={cn("w-4 h-4", statusInfo.color)} />}
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", statusInfo.color)}>
                    {statusInfo.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-20">
                   <span className="text-[9px] font-bold uppercase tracking-widest">{item.quantity}</span>
                   <ArrowRight className="w-3 h-3" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">{quantity}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="p-8 bg-brand-pearl/30 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
           <button 
             onClick={() => setIsOpen(false)}
             className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30 hover:text-brand-charcoal transition-colors order-3 md:order-1"
           >
             Cancel Protocol
           </button>

           <div className="flex items-center gap-4 w-full md:w-auto order-1 md:order-2">
             <LuxuryButton 
               variant="outline"
               onClick={async () => {
                 if (quantity > 0) {
                   setIsSubmitting(true);
                   try {
                     const result = await updateStockLevel(item.id, quantity - 1);
                     if (result.success) {
                       setQuantity(quantity - 1);
                       setIsOpen(false);
                     }
                   } finally {
                     setIsSubmitting(false);
                   }
                 }
               }}
               disabled={isSubmitting || quantity === 0}
               className="w-full md:w-auto px-8 py-5 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white flex items-center gap-2 group"
             >
               <Minus className="w-3.5 h-3.5" />
               Record Sale (-1)
             </LuxuryButton>

             <LuxuryButton 
               onClick={handleUpdate}
               disabled={isSubmitting || quantity === item.quantity}
               className="w-full md:w-auto px-10 py-5 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center gap-3 group"
             >
               <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
               {isSubmitting ? "Executing..." : "Apply Mutation"}
             </LuxuryButton>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
