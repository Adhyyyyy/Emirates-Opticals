import React from "react";
import { DataTable } from "@/components/ui/admin/DataTable";
import { columns, EnquiryColumn } from "@/features/enquiries/components/columns";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  BarChart3, 
  MessageCircle, 
  Users, 
  Zap,
  ArrowUpRight
} from "lucide-react";

// Mock Data for Initial UI Rendering
const MOCK_ENQUIRIES: EnquiryColumn[] = [
  {
    id: "enq-1",
    customerName: "Arjun Varma",
    customerPhone: "+91 9988776655",
    type: "PRODUCT",
    branchName: "Cochin Boutique",
    productName: "Prada Linear Rossa",
    message: "Is this frame available in Blue color?",
    status: "NEW",
    createdAt: "2 hours ago"
  },
  {
    id: "enq-2",
    customerName: "Saira Banu",
    customerPhone: "+91 8877665544",
    type: "WHATSAPP",
    branchName: "Calicut Center",
    message: "Clicked WhatsApp from Product Page",
    status: "RESPONDED",
    createdAt: "5 hours ago"
  },
  {
    id: "enq-3",
    customerName: "Thomas Kurian",
    customerPhone: "+91 7766554433",
    type: "BRANCH",
    branchName: "Trivandrum Hub",
    message: "What are your Sunday timings?",
    status: "NEW",
    createdAt: "1 day ago"
  }
];

export default async function EnquiriesPage() {
  return (
    <div className="space-y-12">
      {/* Header & Lead Intelligence */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2">Lead Command</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Global multi-channel lead aggregation and boutique routing protocol.
            </p>
          </Reveal>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-[1px] bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Total Leads: 1,284</span>
        </div>
      </header>

      {/* High-Level Lead Analytics */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "New Enquiries", value: "14", icon: Zap, color: "text-blue-500" },
          { label: "WhatsApp Leads", value: "48", icon: MessageCircle, color: "text-green-500" },
          { label: "Conversion Rate", value: "18%", icon: BarChart3, color: "text-brand-gold" },
          { label: "Active Customers", value: "842", icon: Users, color: "text-purple-500" }
        ].map((stat, idx) => (
          <StaggerItem key={idx}>
            <div className="bg-white p-8 border border-black/5 rounded-[1.5rem] relative group hover:shadow-2xl transition-all duration-700">
              <div className={cn("absolute top-6 right-6", stat.color)}>
                <stat.icon className="w-5 h-5 opacity-30" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/20 mb-3">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-brand-charcoal tracking-tighter">{stat.value}</p>
                <ArrowUpRight className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </StaggerItem>
        ))}
      </GridStagger>

      {/* Main Enquiry Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Global Lead Matrix</h2>
        </div>
        <DataTable columns={columns} data={MOCK_ENQUIRIES} searchKey="customerName" />
      </div>

    </div>
  );
}

// Utility for status colors
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

