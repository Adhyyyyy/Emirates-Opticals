import React from "react";
import { DataTable } from "@/components/ui/admin/DataTable";
import { columns, EnquiryColumn } from "@/features/enquiries/components/columns";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { getEnquiries } from "@/actions/enquiries";
import { 
  BarChart3, 
  MessageCircle, 
  Users, 
  Zap,
  ArrowUpRight
} from "lucide-react";

export default async function EnquiriesPage() {
  const { data: dbEnquiries } = await getEnquiries();

  const formattedEnquiries: EnquiryColumn[] = (dbEnquiries || []).map((enq: any) => ({
    id: enq.id,
    customerName: enq.user?.name || "Web Visitor",
    customerPhone: enq.user?.phone || "N/A",
    type: enq.type === "WHATSAPP_LEAD" ? "WHATSAPP" : enq.type,
    branchName: enq.branch?.name || "Global",
    productName: enq.product?.name ? `${enq.product.brand || ""} ${enq.product.name}` : "General Inquiry",
    message: enq.message,
    status: enq.status,
    createdAt: new Date(enq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }));

  const newEnquiriesCount = formattedEnquiries.filter(e => e.status === "NEW").length;
  const whatsappLeadsCount = formattedEnquiries.filter(e => e.type === "WHATSAPP").length;
  const uniqueCustomersCount = Array.from(new Set(formattedEnquiries.map(e => e.customerPhone).filter(p => p !== "N/A"))).length;

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
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Total Leads: {formattedEnquiries.length}</span>
        </div>
      </header>

      {/* High-Level Lead Analytics */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "New Enquiries", value: newEnquiriesCount.toString(), icon: Zap, color: "text-blue-500" },
          { label: "WhatsApp Leads", value: whatsappLeadsCount.toString(), icon: MessageCircle, color: "text-green-500" },
          { label: "Conversion Rate", value: "18%", icon: BarChart3, color: "text-brand-gold" },
          { label: "Active Customers", value: uniqueCustomersCount.toString(), icon: Users, color: "text-purple-500" }
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
        <DataTable columns={columns} data={formattedEnquiries} searchKey="customerName" />
      </div>

    </div>
  );
}

// Utility for status colors
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

