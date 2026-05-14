import React from "react";
import { DataTable } from "@/components/ui/admin/DataTable";
import { columns, AppointmentColumn } from "@/features/appointments/components/columns";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  CalendarCheck, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

// Mock Data for Initial UI Rendering
const MOCK_APPOINTMENTS: AppointmentColumn[] = [
  {
    id: "apt-1",
    customerName: "Rahul Sharma",
    customerEmail: "rahul@example.com",
    customerPhone: "+91 9876543210",
    branchName: "Cochin Boutique",
    date: "Oct 24, 2024",
    time: "10:30 AM",
    status: "CONFIRMED"
  },
  {
    id: "apt-2",
    customerName: "Anjali Nair",
    customerEmail: "anjali@example.com",
    customerPhone: "+91 8877665544",
    branchName: "Calicut Center",
    date: "Oct 25, 2024",
    time: "02:15 PM",
    status: "PENDING"
  },
  {
    id: "apt-3",
    customerName: "Mohammad Fazil",
    customerEmail: "fazil@example.com",
    customerPhone: "+91 7766554433",
    branchName: "Trivandrum Hub",
    date: "Oct 24, 2024",
    time: "11:45 AM",
    status: "COMPLETED"
  }
];

export default async function AppointmentsPage() {
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
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Daily Load: {MOCK_APPOINTMENTS.length} Consultations</span>
        </div>
      </header>

      {/* High-Level Appointment Intelligence */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Total", value: "24", icon: CalendarCheck, color: "text-brand-gold" },
          { label: "Pending Review", value: "8", icon: Clock, color: "text-orange-500" },
          { label: "Completion Rate", value: "92%", icon: CheckCircle, color: "text-green-500" },
          { label: "New Leads", value: "12", icon: Users, color: "text-blue-500" }
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
        <DataTable columns={columns} data={MOCK_APPOINTMENTS} searchKey="customerName" />
      </div>

    </div>
  );
}

// Utility for status colors
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

