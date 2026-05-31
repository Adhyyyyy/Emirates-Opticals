import React from "react";
import { DataTable } from "@/components/ui/admin/DataTable";
import { columns, AppointmentColumn } from "@/features/appointments/components/columns";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { getAppointments } from "@/actions/appointments";
import { 
  CalendarCheck, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

export default async function AppointmentsPage() {
  const { data: dbAppointments } = await getAppointments();
  
  const formattedAppointments: AppointmentColumn[] = (dbAppointments || []).map((apt: any) => ({
    id: apt.id,
    customerName: apt.customerName,
    customerEmail: apt.customerEmail,
    customerPhone: apt.customerPhone,
    branchName: apt.branch?.name || "Global",
    date: new Date(apt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: apt.notes?.match(/\[Preferred Time: (.*?)\]/)?.[1] || "N/A",
    status: apt.status
  }));

  return (
    <div className="space-y-12">
      {/* Header & Operational Briefing */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2">Consultation Control</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Global synchronization of eye tests and concierge clinical appointments.
            </p>
          </Reveal>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-[1px] bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Daily Load: {formattedAppointments.length} Consultations</span>
        </div>
      </header>

      {/* High-Level Appointment Intelligence */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Total", value: formattedAppointments.length.toString(), icon: CalendarCheck, color: "text-brand-gold" },
          { label: "Pending Review", value: formattedAppointments.filter(a => a.status === "PENDING").length.toString(), icon: Clock, color: "text-orange-500" },
          { label: "Completion Rate", value: "92%", icon: CheckCircle, color: "text-green-500" },
          { label: "New Leads", value: formattedAppointments.filter(a => a.status === "CONFIRMED").length.toString(), icon: Users, color: "text-blue-500" }
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

      {/* Main Appointment Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Global Consultation Matrix</h2>
        </div>
        <DataTable columns={columns} data={formattedAppointments} searchKey="customerName" />
      </div>

    </div>
  );
}

// Utility for status colors
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

