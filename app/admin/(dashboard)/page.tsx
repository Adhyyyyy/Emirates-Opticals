"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  MapPin,
  Warehouse,
  MessageSquare,
  Sparkles,
  Briefcase,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Clock,
  Eye,
  Phone,
  Mail,
  User,
  Inbox,
  Lock
} from "lucide-react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { getDashboardMetrics } from "@/actions/dashboard";
import { syncInstagramFeed } from "@/actions/cms-instagram";
import { cn } from "@/lib/utils";
import Image from "next/image";

// robust compile-safe inline SVG for Instagram icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  async function load() {
    setLoading(true);
    const res = await getDashboardMetrics();
    if (res.success) {
      setData(res);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const handleSyncInstagram = async () => {
    setSyncing(true);
    const res = await syncInstagramFeed();
    if (res.error) {
      alert(res.error);
    }
    await load();
    setSyncing(false);
  };

  if (loading || !data) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">Loading Command Center...</p>
      </div>
    );
  }

  const { metrics, recentProducts, branchActivity, topProducts, instagramSync, appointments = [], enquiries = [] } = data;

  const stats = data.isBranchAdmin
    ? [
        { label: "Boutique Showroom", value: 1, sub: data.branchName, icon: MapPin, color: "text-brand-gold", bg: "bg-brand-gold/5" },
        { label: "Showroom Inventory", value: metrics.totalProducts, sub: "In-Stock Product Lines", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/5" },
        { label: "Patient Bookings", value: metrics.totalAppointments, sub: `${metrics.pendingAppointments} Pending Slots`, icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/5" },
        { label: "Showroom Enquiries", value: metrics.totalEnquiries, sub: "Direct Customer Messages", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/5" }
      ]
    : [
        { label: "Boutique Network", value: metrics.totalBranches, sub: "Registered Branches", icon: MapPin, color: "text-brand-gold", bg: "bg-brand-gold/5" },
        { label: "Master Catalog", value: metrics.totalProducts, sub: "Total Frames & Lenses", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/5" },
        { label: "Seasonal Campaigns", value: metrics.totalOffers, sub: "Active Discount Vouchers", icon: Sparkles, color: "text-emerald-500", bg: "bg-emerald-500/5" },
        { label: "Recruitment Active", value: metrics.activeJobs, sub: "Open Careers Listings", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/5" }
      ];

  return (
    <div className="space-y-12 pb-12 text-black">
      
      {/* Dynamic Cinematic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-charcoal" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
              {data.isBranchAdmin ? "Showroom Operations Cockpit" : "Retail Intelligence Hub"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal uppercase tracking-tighter leading-none font-heading">
            {data.isBranchAdmin ? (
              <>
                {data.branchName} <em className="italic font-light text-brand-gold/60">Overview</em>
              </>
            ) : (
              <>
                Operational <em className="italic font-light text-brand-gold/60">Overview</em>
              </>
            )}
          </h1>
          <p className="mt-4 text-sm text-brand-charcoal/40 font-light max-w-lg leading-relaxed">
            {data.isBranchAdmin 
              ? "Local Boutique Command Dashboard. Monitor direct patient appointments, showroom stock quantities, customer eye enquiries, and campaigns."
              : "Global Multi-Branch Command Center. Monitor real-time boutique timings, catalog arrivals, active vouchers, and social proof syncing."
            }
          </p>
        </Reveal>
        
        <Reveal delay={0.4}>
          <div className="flex items-center gap-3 bg-brand-charcoal px-6 py-4 rounded-2xl shadow-xl border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              {data.isBranchAdmin ? "Boutique Active" : "Live Protocol Active"}
            </span>
          </div>
        </Reveal>
      </header>

      {/* Stats Cards Row */}
      <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <StaggerItem key={idx}>
            <div className="group bg-white p-8 md:p-10 border border-black/5 rounded-[2.5rem] hover:shadow-[0_30px_60px_rgba(0,0,0,0.03)] transition-all duration-700 relative overflow-hidden">
              <div className={cn("mb-8 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105", stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30">{stat.label}</p>
                <h3 className="text-4xl font-bold text-brand-charcoal tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-medium text-brand-charcoal/40 italic">{stat.sub}</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 bg-brand-pearl text-brand-charcoal/50 rounded-full">
                  Scope Verified
                </span>
                <ArrowUpRight className="w-4 h-4 text-brand-charcoal/10 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>

              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </StaggerItem>
        ))}
      </GridStagger>

      {/* DUAL DASHBOARD VIEW SCHEMAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN PANEL */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* PANEL A1: LOCAL APPOINTMENTS BOARD (BRANCH ADMIN MODE) */}
          {data.isBranchAdmin ? (
            <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-brand-charcoal">Showroom Bookings</h2>
                  <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">Patient Eye testing schedules</p>
                </div>
                <span className="px-3 py-1.5 bg-brand-pearl rounded-xl text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/50">
                  {appointments.length} Scheduled
                </span>
              </div>

              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-black/10 rounded-[2rem] flex flex-col items-center gap-3 text-brand-charcoal/30">
                    <Calendar className="w-8 h-8 font-light" />
                    <p className="text-[10px] uppercase tracking-widest font-bold">No eye testing appointments booked.</p>
                  </div>
                ) : (
                  appointments.map((apt: any) => (
                    <div key={apt.id} className="p-6 bg-brand-pearl/20 border border-black/5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-brand-gold" />
                          <span className="text-sm font-bold text-brand-charcoal uppercase tracking-tight">{apt.customerName}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] text-brand-charcoal/50">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {apt.customerPhone}</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {apt.customerEmail}</span>
                        </div>
                        {apt.notes && (
                          <p className="text-[10px] bg-white p-2.5 rounded-lg border border-black/5 text-brand-charcoal/60 font-light">
                            {apt.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="sm:text-right shrink-0">
                        <span className="text-[10px] font-bold text-brand-charcoal flex items-center gap-1 sm:justify-end">
                          <Clock className="w-3.5 h-3.5 text-brand-gold" />
                          {new Date(apt.date).toLocaleDateString()} at {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={cn(
                          "text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mt-2 inline-block border",
                          apt.status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-100" :
                          apt.status === "CONFIRMED" ? "bg-blue-50 text-blue-600 border-blue-100" :
                          apt.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                        )}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* PANEL A2: GLOBAL BOUTIQUE LOGS MONITOR (SUPER ADMIN MODE) */
            <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-brand-charcoal">Boutique Activity Logs</h2>
                  <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">Real-time timing schedules & registry states</p>
                </div>
                <span className="px-3 py-1.5 bg-brand-pearl rounded-xl text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/50">
                  {branchActivity.length} Node(s)
                </span>
              </div>
              
              <div className="space-y-4">
                {branchActivity.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-black/10 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold">No active physical boutiques registered.</p>
                  </div>
                ) : (
                  branchActivity.map((branch: any) => (
                    <div 
                      key={branch.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-brand-pearl/20 hover:bg-brand-pearl/40 rounded-3xl transition-all duration-500 border border-transparent hover:border-black/5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-charcoal flex items-center justify-center text-white shrink-0 mt-0.5">
                          <Warehouse className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-charcoal">{branch.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-charcoal/30" />
                            <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-wider">{branch.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 flex items-center gap-6 self-start sm:self-center">
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-1.5 sm:justify-end text-[10px] text-brand-charcoal/60">
                            <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                            <span>{branch.timings}</span>
                          </div>
                          <span className={cn(
                            "text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full mt-1.5 inline-block border",
                            branch.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                          )}>
                            {branch.isActive ? "ACTIVE FLAGSHIP" : "INACTIVE"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* PANEL B: RECENT PRODUCTS GRID */}
          <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-brand-charcoal">
                  {data.isBranchAdmin ? "My Showroom Eyewear Lines" : "Recently Cataloged Eyewear"}
                </h3>
                <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">
                  {data.isBranchAdmin ? "Dynamic local inventory allocations" : "Latest master inventory registries"}
                </p>
              </div>
              <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                {data.isBranchAdmin ? "Boutique Stock" : "Master Catalog"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentProducts.length === 0 ? (
                <div className="col-span-2 text-center py-12 border border-dashed border-black/10 rounded-2xl">
                  <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold">No product registries created.</p>
                </div>
              ) : (
                recentProducts.map((p: any) => (
                  <div key={p.id} className="p-4 border border-black/5 rounded-3xl flex items-center justify-between gap-4 hover:shadow-md transition-all duration-500 bg-brand-pearl/5 group hover:border-brand-gold/10">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-16 bg-brand-pearl/30 rounded-2xl relative overflow-hidden flex items-center justify-center shrink-0 border border-black/5 group-hover:scale-105 transition-transform duration-500">
                        <Image 
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[7.5px] font-bold uppercase tracking-widest text-brand-gold block">{p.brand}</span>
                        <h5 className="text-xs font-bold text-brand-charcoal truncate uppercase tracking-tight" title={p.name}>{p.name}</h5>
                        <span className="text-[11px] font-medium text-brand-charcoal/50 block mt-0.5">{p.brand}</span>
                      </div>
                    </div>
                    
                    {/* Render branch specific inventory levels if present */}
                    {data.isBranchAdmin && (
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-brand-charcoal bg-brand-pearl px-2 py-1 rounded-lg block w-fit ml-auto">
                          Qty: {p.quantity}
                        </span>
                        <span className={cn(
                          "text-[7px] font-extrabold uppercase tracking-widest mt-1 block",
                          p.status === "IN_STOCK" ? "text-emerald-600" :
                          p.status === "LOW_STOCK" ? "text-amber-500" : "text-red-500"
                        )}>
                          {p.status}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN PANEL */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* PANEL C: INSTAGRAM SYNC BLOCK */}
          <div className="bg-brand-charcoal p-10 rounded-[3rem] text-white relative overflow-hidden group border border-white/10 shadow-lg">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-105 transition-transform duration-1000">
              <InstagramIcon className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-2 block">SOCIAL PROOF MODULE</span>
                  <h3 className="text-2xl font-light font-heading uppercase leading-none">
                    Instagram <br /><em className="italic font-light text-brand-gold/60">Feed Sync</em>
                  </h3>
                </div>

                <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-full text-[8px] font-extrabold uppercase tracking-widest shadow-sm">
                  {instagramSync.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Sync Handle</span>
                  <span className="text-[11px] font-bold text-brand-gold">{instagramSync.handle}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Last Action</span>
                  <span className="text-[9px] font-light text-white/70">
                    {new Date(instagramSync.lastSync).toLocaleDateString()} at {new Date(instagramSync.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Disable sync for non-super admins to enforce secure brand control */}
              {data.isBranchAdmin ? (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-gold/50">
                  <Lock className="w-4 h-4" />
                  <span>Sync Restricted to Super Admins</span>
                </div>
              ) : (
                <button 
                  onClick={handleSyncInstagram}
                  disabled={syncing}
                  className="w-full py-4 bg-brand-gold text-brand-charcoal text-[9px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-colors duration-500 flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Syncing Media...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      Synchronize Feed Now
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* PANEL D: CLIENT ENQUIRIES BOARD (BRANCH ADMIN MODE) OR MOST CURATED GRID (SUPER ADMIN MODE) */}
          {data.isBranchAdmin ? (
            <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Client Inquiries</h4>
                </div>
                <span className="px-2.5 py-0.5 bg-brand-pearl rounded-full text-[8.5px] font-extrabold uppercase tracking-wider">
                  Lead Inbox
                </span>
              </div>

              <div className="space-y-4">
                {enquiries.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center gap-3 text-brand-charcoal/30">
                    <Inbox className="w-8 h-8 font-light" />
                    <p className="text-[10px] uppercase tracking-widest font-bold">No customer enquiries received yet.</p>
                  </div>
                ) : (
                  enquiries.map((enq: any) => (
                    <div key={enq.id} className="p-4 bg-brand-pearl/10 border border-black/5 rounded-2xl flex flex-col gap-2 hover:bg-brand-pearl/20 transition-all duration-500">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-extrabold bg-brand-gold text-brand-charcoal px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {enq.type}
                        </span>
                        <span className="text-[8.5px] text-brand-charcoal/30">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {enq.productName && (
                        <span className="text-[9px] font-bold text-brand-charcoal uppercase tracking-tight block">
                          Product: {enq.productName}
                        </span>
                      )}
                      
                      <p className="text-[10.5px] font-light text-brand-charcoal/70 leading-relaxed italic">
                        "{enq.message}"
                      </p>
                      
                      {enq.isWhatsApp && (
                        <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>WhatsApp Lead Generated</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-gold" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">Most Viewed Highlights</h4>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider border border-amber-100">
                  Featured
                </span>
              </div>

              <div className="space-y-4">
                {topProducts.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold">No highlighted collections found.</p>
                  </div>
                ) : (
                  topProducts.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-brand-pearl/10 rounded-2xl hover:bg-brand-pearl/30 transition-colors">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 bg-white rounded-xl relative overflow-hidden shrink-0 border border-black/5 flex items-center justify-center">
                          <Image 
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-contain p-0.5"
                            sizes="40px"
                          />
                        </div>
                        <div className="min-w-0">
                          <h6 className="text-xs font-bold text-brand-charcoal uppercase tracking-tight truncate">{p.name}</h6>
                          <span className="text-[7.5px] font-bold text-brand-gold uppercase tracking-wider block">{p.brand}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-brand-charcoal whitespace-nowrap shrink-0">{p.brand}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
