"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  MessageSquare, 
  ShoppingBag, 
  MapPin, 
  User, 
  Clock,
  Phone,
  ExternalLink,
  MessageCircle, // For WhatsApp
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EnquiryColumn = {
  id: string;
  customerName: string;
  customerPhone: string;
  type: "PRODUCT" | "BRANCH" | "GENERAL" | "WHATSAPP";
  branchName: string;
  productName?: string;
  message: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<EnquiryColumn>[] = [
  {
    accessorKey: "customerName",
    header: "Lead Identity",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-pearl rounded-full flex items-center justify-center text-brand-charcoal/30 border border-black/5">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter mb-0.5">{row.original.customerName}</p>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-brand-gold" />
            <span className="text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-widest">{row.original.customerPhone}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Channel",
    cell: ({ row }) => {
      const type = row.original.type;
      const icons = {
        PRODUCT: ShoppingBag,
        BRANCH: MapPin,
        GENERAL: MessageSquare,
        WHATSAPP: MessageCircle
      };
      const Icon = icons[type] || MessageSquare;
      
      return (
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            type === "WHATSAPP" ? "bg-green-50 text-green-600" : "bg-brand-pearl text-brand-charcoal/40"
          )}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/60">{type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "branchName",
    header: "Routed Branch",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="w-3 h-3 text-brand-gold" />
        <span className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-widest">{row.original.branchName}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Protocol Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className={cn(
          "inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
          status === "NEW" ? "bg-blue-50 text-blue-600 animate-pulse" :
          status === "RESPONDED" ? "bg-green-50 text-green-600" :
          "bg-gray-50 text-gray-400"
        )}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Timestamp",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3 text-brand-charcoal/20" />
        <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-tighter">{row.original.createdAt}</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <button className="px-4 py-2 bg-brand-charcoal text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-brand-gold transition-colors">
          View Detail
        </button>
        <button className="p-2 hover:bg-brand-pearl rounded-lg text-brand-charcoal/20 hover:text-brand-charcoal transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
