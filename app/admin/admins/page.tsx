"use client";

import React, { useState, useEffect } from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  Users, 
  Plus, 
  Search, 
  Trash2, 
  ShieldAlert, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  User,
  Building,
  Key,
  Shield,
  Activity,
  Clock,
  Power
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";
import { getBranches } from "@/actions/branches";
import { getAdmins, createBranchAdmin, toggleAdminStatus, deleteAdmin, getActivityLogs } from "@/actions/admins";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"BRANCH_ADMIN" | "STAFF">("BRANCH_ADMIN");
  const [branchId, setBranchId] = useState("");

  const loadData = async () => {
    setLoading(true);
    const [branchesRes, adminsRes, logsRes] = await Promise.all([
      getBranches(),
      getAdmins(),
      getActivityLogs()
    ]);

    if (branchesRes.data) setBranches(branchesRes.data);
    if (adminsRes.data) setAdmins(adminsRes.data);
    if (logsRes) setLogs(logsRes);
    
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    if (!branchId) {
      setError("Please select a target physical branch assignment.");
      setSubmitting(false);
      return;
    }

    const payload = { email, name, role, branchId };
    const result = await createBranchAdmin(payload);

    if (result.success) {
      setSuccess(true);
      setName("");
      setEmail("");
      setBranchId("");
      await loadData();
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError(result.error || "Failed to create administrator.");
    }
    setSubmitting(false);
  };

  const handleToggleAdminStatus = async (admin: any) => {
    const isCurrentlyEnabled = admin.role !== "CUSTOMER";
    const previousRole = admin.role === "CUSTOMER" ? "BRANCH_ADMIN" : admin.role;

    const result = await toggleAdminStatus(
      admin.id, 
      !isCurrentlyEnabled, 
      previousRole
    );

    if (result.success) {
      await loadData();
    } else {
      alert(result.error || "Could not toggle admin access status.");
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (confirm("Are you sure you want to completely revoke permissions and delete this administrator account?")) {
      const result = await deleteAdmin(id);
      if (result.success) {
        await loadData();
      } else {
        alert(result.error || "Could not complete account decommissioning.");
      }
    }
  };

  // Filter Logic
  const filteredAdmins = admins.filter((admin: any) => 
    admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-12 text-black">
      {/* Cinematic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Security Protocols</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-normal text-brand-charcoal uppercase tracking-tighter leading-none mb-6 font-heading">
              Admin <em className="italic font-light text-brand-gold/60">Privileges</em>
            </h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Provision branch administrator accounts, associate managers with physical boutique lounges, revoke dynamic access keys instantly, and monitor login activity audits.
            </p>
          </Reveal>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-brand-charcoal/40">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Accessing Security Databases...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION: ADMIN REGISTRY & DIRECTORY LISTING */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Directory Widget */}
            <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/5">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-brand-charcoal">Security Directory</h2>
                  <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">Active Boutique Managers & Staff</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-64 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-charcoal/20 group-focus-within:text-brand-gold transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search Admin Name or Email..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-pearl/50 border-none rounded-xl py-3 pl-10 pr-4 text-[11px] focus:ring-1 focus:ring-brand-gold/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredAdmins.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-black/10 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold">No administrator accounts found.</p>
                  </div>
                ) : (
                  filteredAdmins.map((admin: any) => {
                    const isEnabled = admin.role !== "CUSTOMER";
                    
                    return (
                      <div 
                        key={admin.id}
                        className={cn(
                          "flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl transition-all duration-500 border",
                          isEnabled 
                            ? "bg-brand-pearl/20 hover:bg-brand-pearl/40 border-transparent hover:border-black/5" 
                            : "bg-red-50/10 border-red-100/20 opacity-60"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-charcoal flex items-center justify-center text-white shrink-0 mt-0.5">
                            {admin.role === "SUPER_ADMIN" ? (
                              <Key className="w-5 h-5 text-brand-gold" />
                            ) : (
                              <User className="w-5 h-5 text-brand-gold" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-charcoal flex items-center gap-2">
                              {admin.name || "Master Coordinator"}
                              <span className={cn(
                                "text-[7.5px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm border",
                                admin.role === "SUPER_ADMIN" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                admin.role === "BRANCH_ADMIN" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                admin.role === "STAFF" ? "bg-purple-50 text-purple-600 border-purple-100" :
                                "bg-red-50 text-red-600 border-red-100"
                              )}>
                                {admin.role}
                              </span>
                            </h4>
                            <p className="text-[10px] text-brand-charcoal/40 mt-1">{admin.email}</p>
                            
                            {admin.branch && (
                              <div className="flex items-center gap-1.5 mt-2 text-brand-gold">
                                <Building className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">{admin.branch.name}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {admin.role !== "SUPER_ADMIN" && (
                          <div className="mt-4 sm:mt-0 flex items-center gap-3 self-start sm:self-center shrink-0">
                            {/* Toggle Access Switch */}
                            <button 
                              onClick={() => handleToggleAdminStatus(admin)}
                              className={cn(
                                "p-2.5 rounded-xl transition-all border",
                                isEnabled 
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100" 
                                  : "bg-red-50 text-red-600 border-red-100 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-100"
                              )}
                              title={isEnabled ? "Disable Admin Access Keys" : "Enable Admin Access"}
                            >
                              <Power className="w-3.5 h-3.5" />
                            </button>
                            
                            <button 
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="p-2.5 hover:bg-red-50 rounded-xl text-brand-charcoal/20 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                              title="Delete Administrator account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* REAL-TIME ACTIVITY AUDIT LOGS TIMELINE */}
            <div className="bg-white p-10 border border-black/5 rounded-[3rem] shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-black/5">
                <Activity className="w-5 h-5 text-brand-gold" />
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-brand-charcoal">Login Audit System</h3>
                  <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">Real-time operational activity tracking logs</p>
                </div>
              </div>

              <div className="relative border-l border-black/5 ml-4 pl-8 space-y-8 max-h-[350px] overflow-y-auto custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="text-left py-4 text-brand-charcoal/40 text-[10px] uppercase tracking-widest font-bold">
                    No activity logs recorded in audit feed.
                  </div>
                ) : (
                  logs.map((log: any) => (
                    <div key={log.id} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 bg-white border border-brand-gold rounded-full flex items-center justify-center shrink-0">
                        <Clock className="w-2.5 h-2.5 text-brand-gold" />
                      </div>
                      
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">
                            {log.action}
                          </span>
                          <span className="text-[8.5px] font-bold text-brand-charcoal/30">
                            {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light mt-1.5">{log.details}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SECTION: REGISTER / ASSIGN NEW ADMIN FORM */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 border border-black/5 rounded-[2.5rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-black/5">
                <Shield className="w-5 h-5 text-brand-gold" />
                <h3 className="text-md font-bold uppercase tracking-tight text-brand-charcoal font-heading">
                  Deploy Manager
                </h3>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <CheckCircle className="w-14 h-14 text-emerald-500 stroke-[1.5]" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">Account Deployed</h4>
                  <p className="text-[11px] text-brand-charcoal/40 font-light leading-relaxed">
                    The administrator record was safely created and synchronized with the assigned branch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 text-[10px] font-medium rounded-xl flex items-center gap-2 border border-red-100">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Manager Name"
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 pl-12 pr-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Secure Identifier (Email)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="manager@emirates.com"
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 pl-12 pr-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Security Role</label>
                    <select
                      value={role}
                      onChange={(e: any) => setRole(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    >
                      <option value="BRANCH_ADMIN">BRANCH_ADMIN (Boutique Manager)</option>
                      <option value="STAFF">STAFF (Optometrist / Assistant)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Boutique Assignment</label>
                    <select
                      required
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    >
                      <option value="">Select Boutique Assignment...</option>
                      {branches.map((b: any) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4.5 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl transition-colors flex items-center justify-center gap-3 shadow-xl"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Deploying Manager...</span>
                      </>
                    ) : (
                      <span>Deploy Credentials</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-brand-charcoal p-10 rounded-[2.5rem] text-white relative overflow-hidden group border border-white/5 shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-105 transition-transform duration-1000">
                <ShieldAlert className="w-24 h-24" />
              </div>
              
              <div className="relative z-10">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-8 block">SECURITY POLICY</span>
                <p className="text-xl font-light font-heading leading-tight mb-4">
                  Instant Revocation <br /><em className="italic font-light text-brand-gold/60">Protocol</em>
                </p>
                <p className="text-[10px] text-white/40 leading-relaxed font-light mb-6">
                  Toggling the operational access state immediately demotes a manager to a regular customer profile in the next HTTP request, locking them out instantly of all protected interfaces.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
