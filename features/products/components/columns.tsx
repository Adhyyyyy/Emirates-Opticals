"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { MoreHorizontal, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductColumn = {
  id: string;
  name: string;
  brand: string;
  price: number;
  status: string;
  image: string;
  stock: number;
  branchStock: number;
  inventoryId: string | null;
  isBranchAdmin: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-black/10 text-brand-gold focus:ring-brand-gold"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-black/10 text-brand-gold focus:ring-brand-gold"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-brand-charcoal transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="w-3 h-3" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { name, brand, image } = row.original;
      return (
        <div className="flex items-center gap-5">
          <div className="w-12 h-16 rounded-xl bg-brand-pearl overflow-hidden border border-black/5 flex-shrink-0 group-hover:scale-105 transition-transform duration-700">
            <OptimizedImage src={image} alt={name} fill className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter mb-1">{name}</p>
            <p className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">{brand}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className={cn(
          "inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
          status === "PUBLISHED" ? "bg-green-50 text-green-600" :
          status === "DRAFT" ? "bg-orange-50 text-orange-600" :
          "bg-gray-50 text-gray-400"
        )}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-brand-charcoal transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valuation
          <ArrowUpDown className="w-3 h-3" />
        </button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
      return <div className="text-xs font-bold text-brand-charcoal font-heading">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock Intelligence",
    cell: ({ row }) => <StockCell row={row} />
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />
  },
];

import { useState, useTransition, useEffect } from "react";
import { deleteProduct } from "@/actions/products";
import { updateStockLevel, initializeBranchStock } from "@/actions/inventory";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const StockCell = ({ row }: { row: any }) => {
  const { id, stock, branchStock, inventoryId, isBranchAdmin } = row.original;
  const [qty, setQty] = useState(branchStock);
  const [invId, setInvId] = useState(inventoryId);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setQty(branchStock);
    setInvId(inventoryId);
  }, [branchStock, inventoryId]);

  const handleAdjust = (delta: number) => {
    const newQty = Math.max(0, qty + delta);
    setQty(newQty); // Instant UI optimistic update
    
    startTransition(async () => {
      if (invId) {
        await updateStockLevel(invId, newQty);
      } else {
        const result = await initializeBranchStock(id, newQty);
        if (result.success) setInvId(result.id);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-[0.2em]">Global: {stock} Units</span>
      </div>
      
      {isBranchAdmin && (
        <div className="flex items-center gap-3 bg-brand-pearl/30 rounded-xl p-1 border border-black/5 w-fit shadow-sm">
          <button 
            onClick={() => handleAdjust(-1)}
            disabled={isPending || qty === 0}
            className="w-6 h-6 flex items-center justify-center bg-white rounded-lg hover:text-brand-gold disabled:opacity-50 transition-colors shadow-sm"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-bold w-4 text-center text-brand-charcoal">{qty}</span>
          <button 
            onClick={() => handleAdjust(1)}
            disabled={isPending}
            className="w-6 h-6 flex items-center justify-center bg-white rounded-lg hover:text-brand-gold disabled:opacity-50 transition-colors shadow-sm"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

const ActionsCell = ({ row }: { row: any }) => {
  const [isPending, startTransition] = useTransition();
  
  const handleDelete = () => {
    if (confirm("Execute deletion protocol? This will remove the asset from the global catalog.")) {
      startTransition(async () => {
        await deleteProduct(row.original.id);
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
      <Link 
        href={`/admin/products/edit/${row.original.id}`}
        className="p-3 hover:bg-brand-pearl rounded-xl text-brand-charcoal/20 hover:text-brand-gold transition-all"
      >
        <Edit className="w-4 h-4" />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isPending}
        className="p-3 hover:bg-red-50 rounded-xl text-brand-charcoal/20 hover:text-red-500 transition-all disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
