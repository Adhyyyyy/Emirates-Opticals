"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock4,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AppointmentColumn = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  branchName: string;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export const columns: ColumnDef<AppointmentColumn>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const { customerName, customerEmail, customerPhone } = row.original;
      return (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-pearl rounded-full flex items-center justify-center text-brand-charcoal/40 border border-black/5">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter mb-0.5">{customerName}</p>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-widest">{customerPhone}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "branchName",
    header: "Branch",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
        <span className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-widest">{row.original.branchName}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3 text-brand-charcoal/30" />
          <span className="text-[10px] font-bold text-brand-charcoal uppercase tracking-tighter">{row.original.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-brand-charcoal/30" />
          <span className="text-[10px] font-medium text-brand-charcoal/60 uppercase tracking-tighter">{row.original.time}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        PENDING: { color: "bg-orange-50 text-orange-600", icon: Clock4 },
        CONFIRMED: { color: "bg-blue-50 text-blue-600", icon: CheckCircle2 },
        COMPLETED: { color: "bg-green-50 text-green-600", icon: CheckCircle2 },
        CANCELLED: { color: "bg-red-50 text-red-600", icon: XCircle },
      };
      
      const { color, icon: Icon } = statusConfig[status] || statusConfig.PENDING;

      return (
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
          color
        )}>
          <Icon className="w-3 h-3" />
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <button className="px-4 py-2 bg-brand-charcoal text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-brand-gold transition-colors">
          Confirm
        </button>
        <button className="p-2 hover:bg-brand-pearl rounded-lg text-brand-charcoal/20 hover:text-brand-charcoal transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
