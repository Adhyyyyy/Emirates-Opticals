"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  MapPin, 
  Briefcase, 
  Loader2, 
  Tag, 
  Calendar,
  Clock,
  User,
  ArrowRight
} from "lucide-react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { getDashboardMetrics } from "@/actions/dashboard";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await getDashboardMetrics();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/40">Initializing Command Console...</p>
      </div>
    );
  }

  const { metrics, recentProducts, appointments, enquiries } = data;

  const stats = data.isBranchAdmin
    ? [
        { label: "Active Boutique", value: 1, sub: data.branchName, icon: MapPin, color: "text-brand-gold", bg: "bg-brand-gold/5" },
        { label: "Boutique Stock", value: metrics.totalProducts || 0, sub: "Available Frames", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/5" },
        { label: "Active Offers", value: metrics.totalOffers || 0, sub: "Local Showroom Deals", icon: Tag, color: "text-emerald-500", bg: "bg-emerald-500/5" },
        { label: "Active Careers", value: metrics.activeJobs || 0, sub: "Hiring Campaigns", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/5" }
      ]
    : [
        { label: "Boutique Network", value: metrics.totalBranches || 0, sub: "Showroom Locations", icon: MapPin, color: "text-brand-gold", bg: "bg-brand-gold/5" },
        { label: "Global Catalog", value: metrics.totalProducts || 0, sub: "Registered Eyewear Items", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/5" },
        { label: "Global Campaigns", value: metrics.totalOffers || 0, sub: "Active Marketing Offers", icon: Tag, color: "text-emerald-500", bg: "bg-emerald-500/5" },
        { label: "Recruitment Portals", value: metrics.activeJobs || 0, sub: "Active Job Openings", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/5" }
      ];

  return (
    <div className="space-y-12 pb-12 text-black">
      
      {/* ── HEADER PANEL ── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/[0.05]">
        <Reveal>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              Emirates Optician Administration
            </span>
          </div>
          <h1 className="text-3xl font-light font-heading uppercase tracking-tight text-brand-charcoal">
            {data.isBranchAdmin ? data.branchName : "System Dashboard"}
          </h1>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="flex items-center gap-2.5 px-4.5 py-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded-[4px] w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">
              System Live & Operational
            </span>
          </div>
        </Reveal>
      </header>

      {/* ── METRIC TILES ── */}
      <GridStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StaggerItem key={idx}>
            <div className="bg-white p-8 border border-black/[0.05] rounded-[4px] transition-all hover:shadow-[0_12px_36px_rgba(0,0,0,0.03)] relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">
                  {stat.label}
                </span>
                <div className={cn("p-2 rounded-[4px]", stat.bg, stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-3xl font-semibold text-brand-charcoal tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-[10px] font-medium text-brand-charcoal/40">
                  {stat.sub}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </GridStagger>

      {/* ── DATA REGISTRY PANELS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Recently Cataloged Eyewear */}
        <div className="lg:col-span-6 bg-white p-8 border border-black/[0.05] rounded-[4px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/[0.05]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal">
                Recently Cataloged
              </h3>
              <p className="text-[9px] text-brand-charcoal/40 uppercase tracking-widest mt-1">
                Latest luxury eyewear frame additions
              </p>
            </div>
            <Link 
              href="/admin/products"
              className="text-[8px] font-bold uppercase tracking-wider text-brand-gold hover:text-brand-charcoal transition-colors flex items-center gap-1 group"
            >
              View Catalog
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentProducts.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-black/10 rounded-[3px]">
                <p className="text-[9.5px] uppercase tracking-widest text-brand-charcoal/30 font-bold">No product registries created.</p>
              </div>
            ) : (
              recentProducts.map((p: any) => (
                <div 
                  key={p.id} 
                  className="p-3.5 border border-black/[0.03] rounded-[4px] flex items-center justify-between gap-4 bg-[#FAF9F6] hover:bg-[#FAF9F6]/50 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-white rounded-[3px] relative overflow-hidden flex items-center justify-center shrink-0 border border-black/[0.05]">
                      <Image 
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[7.5px] font-bold uppercase tracking-widest text-brand-gold block mb-0.5">
                        {p.brand}
                      </span>
                      <h5 className="text-[11px] font-bold text-brand-charcoal uppercase tracking-tight truncate max-w-[180px]">
                        {p.name}
                      </h5>
                    </div>
                  </div>

                  <span className="text-[8px] font-bold text-brand-charcoal/30 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-2.5 h-2.5" />
                    {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Showroom Bookings & Activities */}
        <div className="lg:col-span-6 bg-white p-8 border border-black/[0.05] rounded-[4px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/[0.05]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal">
                Latest Bookings
              </h3>
              <p className="text-[9px] text-brand-charcoal/40 uppercase tracking-widest mt-1">
                Recent consultation and eye test appointments
              </p>
            </div>
            <Link 
              href="/admin/appointments"
              className="text-[8px] font-bold uppercase tracking-wider text-brand-gold hover:text-brand-charcoal transition-colors flex items-center gap-1 group"
            >
              All Appointments
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-black/10 rounded-[3px]">
                <p className="text-[9.5px] uppercase tracking-widest text-brand-charcoal/30 font-bold">No active appointments found.</p>
              </div>
            ) : (
              appointments.map((a: any) => (
                <div 
                  key={a.id} 
                  className="p-3.5 border border-black/[0.03] rounded-[4px] flex items-center justify-between gap-4 bg-[#FAF9F6]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 bg-brand-gold/5 text-brand-gold flex items-center justify-center rounded-full shrink-0 border border-brand-gold/10">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[11px] font-bold text-brand-charcoal uppercase tracking-tight truncate max-w-[150px]">
                        {a.customerName}
                      </h5>
                      <span className="text-[8px] text-brand-charcoal/40 font-mono tracking-tighter">
                        {a.customerPhone}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={cn(
                      "text-[6.5px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px] block w-fit ml-auto mb-1",
                      a.status === "PENDING" 
                        ? "text-amber-600 bg-amber-500/10 border border-amber-500/20" 
                        : "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20"
                    )}>
                      {a.status}
                    </span>
                    <span className="text-[8px] font-bold text-brand-charcoal/30 uppercase tracking-widest flex items-center gap-1 justify-end">
                      <Calendar className="w-2.5 h-2.5" />
                      {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
