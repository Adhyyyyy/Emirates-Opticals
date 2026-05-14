"use client";

import React from "react";
import { m } from "framer-motion";
import { 
  Users, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  MapPin,
  Warehouse,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const stats = [
    { label: "Global Inventory", value: "4,280", sub: "Items across Kerala", icon: Warehouse, trend: "+12.5%", color: "text-brand-gold", bg: "bg-brand-gold/5" },
    { label: "Active Products", value: "842", sub: "Master Catalog", icon: ShoppingBag, trend: "Luxury Tier", color: "text-blue-500", bg: "bg-blue-500/5" },
    { label: "Today's Tests", value: "12", sub: "Eye Appointments", icon: Calendar, trend: "4 Pending", color: "text-green-500", bg: "bg-green-500/5" },
    { label: "WhatsApp Leads", value: "28", sub: "Recent Enquiries", icon: MessageSquare, trend: "Fast Response", color: "text-purple-500", bg: "bg-purple-500/5" }
  ];

  const recentEnquiries = [
    { name: "Suresh Joseph", branch: "Cochin Boutique", item: "Prada Linear Rossa", time: "12 mins ago", status: "New" },
    { name: "Anjali Menon", branch: "Trivandrum Atelier", item: "Ray-Ban Reverse", time: "45 mins ago", status: "Active" },
    { name: "Rahul Nair", branch: "Calicut Hub", item: "Oakley Kato", time: "2 hours ago", status: "Replied" }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Cinematic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-charcoal" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Retail Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-normal text-brand-charcoal uppercase tracking-tighter leading-none">
            Operational <em className="italic font-light text-brand-gold/60">Overview</em>
          </h1>
          <p className="mt-4 text-sm text-brand-charcoal/40 font-light max-w-lg">
            Global Multi-Branch Command Center. Monitor real-time boutique traffic, inventory velocity, and client engagement.
          </p>
        </Reveal>
        
        <Reveal delay={0.4}>
          <div className="flex items-center gap-3 bg-brand-charcoal px-6 py-4 rounded-2xl shadow-xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Live Protocol Active</span>
          </div>
        </Reveal>
      </header>

      {/* Luxury Stats Grid */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <StaggerItem key={idx}>
            <div className="group bg-white p-10 border border-black/5 rounded-[2.5rem] hover:shadow-2xl transition-all duration-1000 relative overflow-hidden">
              <div className={cn("mb-8 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110", stat.bg, stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30">{stat.label}</p>
                <h3 className="text-4xl font-bold text-brand-charcoal tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-medium text-brand-charcoal/60 italic">{stat.sub}</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className={cn("text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full", stat.bg, stat.color)}>
                  {stat.trend}
                </span>
                <ArrowUpRight className="w-4 h-4 text-brand-charcoal/10 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>

              {/* Glassmorphism Flare */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </StaggerItem>
        ))}
      </GridStagger>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Operational Activity */}
        <div className="lg:col-span-8 bg-white p-12 border border-black/5 rounded-[3rem] relative overflow-hidden">
          <div className="flex justify-between items-center mb-12 relative z-10">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-charcoal">Smart Enquiries</h2>
              <p className="text-[10px] text-brand-charcoal/40 uppercase mt-2">Recent Client Interest Routing</p>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/20 pb-1 hover:text-brand-charcoal hover:border-brand-charcoal transition-all">
              Live Feed
            </button>
          </div>
          
          <div className="space-y-4 relative z-10">
            {recentEnquiries.map((enquiry, i) => (
              <m.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="flex items-center justify-between p-6 bg-brand-pearl/20 hover:bg-brand-pearl rounded-3xl transition-all duration-500 group cursor-pointer border border-transparent hover:border-brand-gold/10"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-charcoal rounded-2xl flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {enquiry.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-charcoal">{enquiry.name}</p>
                    <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">
                      {enquiry.item} • <span className="text-brand-gold">{enquiry.branch}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30 block mb-1">{enquiry.time}</span>
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm",
                      enquiry.status === "New" ? "bg-brand-gold text-brand-charcoal" : "bg-brand-charcoal/5 text-brand-charcoal/40"
                    )}>
                      {enquiry.status}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-brand-charcoal/10 group-hover:text-brand-gold transition-all" />
                </div>
              </m.div>
            ))}
          </div>
        </div>

        {/* Inventory Critical Alerts */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-charcoal p-12 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <AlertCircle className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-12">Stock Protocol</h2>
              <div className="space-y-2 mb-16">
                <p className="text-5xl font-normal tracking-tighter">Inventory <br /><em className="italic font-light text-brand-gold/60">Alerts</em></p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Critical Low</span>
                  <span className="text-lg font-bold text-brand-gold">14 SKU</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pending Transfers</span>
                  <span className="text-lg font-bold text-white">08</span>
                </div>
              </div>

              <button className="mt-12 w-full py-5 bg-brand-gold text-brand-charcoal text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-colors duration-500 shadow-xl">
                Manage Stock Velocity
              </button>
            </div>
          </div>

          <div className="bg-brand-gold/5 p-10 rounded-[2.5rem] border border-brand-gold/10">
            <div className="flex items-center gap-4 mb-8">
              <MapPin className="w-5 h-5 text-brand-gold" />
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Top Boutique</h3>
            </div>
            <p className="text-2xl font-normal text-brand-charcoal tracking-tight">Cochin Luxury Hub</p>
            <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-2">Leading in Eye-Test Conversions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
