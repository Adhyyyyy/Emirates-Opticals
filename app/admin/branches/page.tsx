"use client";

import React, { useState, useEffect } from "react";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Globe, 
  MessageSquare,
  X,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Power
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";
import { getBranches, createBranch, updateBranch, deleteBranch } from "@/actions/branches";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Editor Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Form Fields State
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [timings, setTimings] = useState("09:00 AM - 08:30 PM");
  const [coordinates, setCoordinates] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const loadBranches = async () => {
    setLoading(true);
    const res = await getBranches();
    if (res.data) {
      setBranches(res.data);
    } else if (res.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const openCreateModal = () => {
    setEditingBranch(null);
    setName("");
    setLocation("");
    setAddress("");
    setPhone("");
    setWhatsapp("");
    setTimings("09:00 AM - 08:30 PM");
    setCoordinates("");
    setImageUrl("");
    setIsActive(true);
    setIsModalOpen(true);
    setFormSuccess(false);
    setError(null);
  };

  const openEditModal = (branch: any) => {
    setEditingBranch(branch);
    setName(branch.name);
    setLocation(branch.location || "");
    setAddress(branch.address);
    setPhone(branch.phone);
    setWhatsapp(branch.whatsapp);
    setTimings(branch.timings || "09:00 AM - 08:30 PM");
    setCoordinates(branch.coordinates || "");
    setImageUrl(branch.images?.[0] || "");
    setIsActive(branch.isActive ?? true);
    setIsModalOpen(true);
    setFormSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      location,
      address,
      phone,
      whatsapp,
      timings,
      coordinates: coordinates || undefined,
      images: imageUrl ? [imageUrl] : undefined,
      isActive,
    };

    let result;
    if (editingBranch) {
      result = await updateBranch(editingBranch.id, payload);
    } else {
      result = await createBranch(payload);
    }

    if (result.success) {
      setFormSuccess(true);
      await loadBranches();
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess(false);
      }, 1500);
    } else {
      setError(result.error || "Execution failed. Access restriction may apply.");
    }
    setSubmitting(false);
  };

  const handleToggleStatus = async (branch: any) => {
    const result = await updateBranch(branch.id, { isActive: !branch.isActive });
    if (result.success) {
      await loadBranches();
    } else {
      alert(result.error || "Could not toggle operational status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to decommission this physical boutique?")) {
      const result = await deleteBranch(id);
      if (result.success) {
        await loadBranches();
      } else {
        alert(result.error || "Could not complete branch removal.");
      }
    }
  };

  // Filter Logic
  const filteredBranches = branches.filter((b: any) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.location && b.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-12 text-black">
      {/* Cinematic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Network Infrastructure</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-normal text-brand-charcoal uppercase tracking-tighter leading-none mb-6 font-heading">
              Boutique <em className="italic font-light text-brand-gold/60">Registry</em>
            </h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Manage physical boutique presence. Synchronize localized coordinates, Google Maps pins, direct WhatsApp routing, operational timetables, and temporarily disable branches when under maintenance.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <button 
            onClick={openCreateModal}
            className="px-10 py-5 bg-brand-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-gold transition-all duration-700 shadow-2xl group"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500" />
            Establish New Branch
          </button>
        </Reveal>
      </header>

      {/* Utility Search Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 rounded-3xl border border-black/5">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search Boutique Name or Location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-pearl/20 border-none rounded-2xl py-4 pl-14 pr-6 text-xs focus:ring-2 focus:ring-brand-gold/20 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
           <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30">Registry:</span>
           <div className="flex p-1 bg-brand-pearl rounded-xl">
             <span className="px-4 py-2 bg-white rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-gold shadow-sm">
               {filteredBranches.length} Node(s)
             </span>
           </div>
        </div>
      </div>

      {/* Loading & Error Screens */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-brand-charcoal/40">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Accessing Registry Coordinates...</span>
        </div>
      ) : filteredBranches.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-black/10 rounded-3xl">
          <p className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold mb-2">No Boutiques Found</p>
          <p className="text-[11px] font-light text-brand-charcoal/30">Establish your first physical retail node above.</p>
        </div>
      ) : (
        /* Boutique Cards Grid */
        <GridStagger className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBranches.map((branch: any) => (
            <StaggerItem key={branch.id}>
              <div className="group bg-white border border-black/5 rounded-[3rem] overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.03)] transition-all duration-700 flex flex-col md:flex-row h-full">
                
                {/* Visual Thumbnail */}
                <div className="w-full md:w-2/5 aspect-[4/5] relative overflow-hidden bg-brand-pearl shrink-0">
                  <img 
                    src={branch.images?.[0] || "https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=600"} 
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold uppercase tracking-widest text-white">
                      {branch.location || "Kerala"}
                    </span>
                  </div>
                </div>

                {/* Boutique Intel Info */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-8 gap-4">
                      <h3 className="text-2xl font-normal text-brand-charcoal tracking-tighter uppercase leading-tight font-heading">{branch.name}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                         {/* Dynamic inline toggle */}
                         <button 
                           onClick={() => handleToggleStatus(branch)}
                           className={cn(
                             "p-2.5 rounded-xl transition-all border shrink-0",
                             branch.isActive 
                               ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100" 
                               : "bg-red-50 text-red-600 border-red-100 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-100"
                           )}
                           title={branch.isActive ? "Deactivate Boutique temporarily" : "Activate Boutique"}
                         >
                           <Power className="w-3.5 h-3.5" />
                         </button>
                         <button 
                           onClick={() => openEditModal(branch)}
                           className="p-2.5 hover:bg-brand-pearl rounded-xl text-brand-charcoal/20 hover:text-brand-gold transition-all"
                         >
                           <Edit className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => handleDelete(branch.id)}
                           className="p-2.5 hover:bg-red-50 rounded-xl text-brand-charcoal/20 hover:text-red-500 transition-all"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                        <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light">{branch.address}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                        <p className="text-[10px] text-brand-charcoal/60 leading-relaxed font-light">{branch.phone}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <MessageSquare className="w-4 h-4 text-brand-gold shrink-0" />
                        <p className="text-[10px] font-bold text-brand-charcoal uppercase tracking-widest">{branch.whatsapp}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                        <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">{branch.timings || "10:00 AM - 08:30 PM"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className={cn("w-2 h-2 rounded-full", branch.isActive ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
                       <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                         {branch.isActive ? "Active Network" : "Disabled"}
                       </span>
                     </div>
                     
                     {branch.coordinates ? (
                       <a 
                         href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.coordinates)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors group"
                       >
                         View Map
                         <Globe className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                       </a>
                     ) : (
                       <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/20">No Map Bounded</span>
                     )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </GridStagger>
      )}

      {/* Editor Dynamic Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            />
            
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:w-[600px] bg-white z-50 rounded-[2.5rem] shadow-2xl p-10 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between self-center justify-self-center"
            >
              <div className="space-y-8">
                {/* Form Header */}
                <div className="flex justify-between items-center pb-6 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-brand-gold" />
                    <h2 className="text-xl font-bold uppercase tracking-tight text-brand-charcoal font-heading">
                      {editingBranch ? "Modify Boutique Coordinates" : "Establish New Boutique Node"}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-brand-pearl rounded-full transition-colors text-brand-charcoal/50 hover:text-brand-charcoal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Form Body */}
                {formSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-emerald-500 stroke-[1.5]" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-brand-charcoal">Registry Updated</h3>
                    <p className="text-xs text-brand-charcoal/40 font-light">The network coordinates have been safely synchronized.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-5 bg-red-50 text-red-700 text-xs font-medium rounded-2xl flex items-center gap-3 border border-red-100">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Boutique Name</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Thiruvalla Luxury Hub"
                          className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Location / District</label>
                        <input 
                          type="text" 
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Pathanamthitta"
                          className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Physical Street Address</label>
                      <textarea 
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Full localized street directions..."
                        rows={3}
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Phone Number</label>
                        <input 
                          type="text" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 469 260 0000"
                          className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">WhatsApp Helpline</label>
                        <input 
                          type="text" 
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Opening Timings</label>
                        <input 
                          type="text" 
                          required
                          value={timings}
                          onChange={(e) => setTimings(e.target.value)}
                          placeholder="e.g. 10:00 AM - 08:30 PM"
                          className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Maps Coordinates (Lat, Lng or Address)</label>
                        <input 
                          type="text" 
                          value={coordinates}
                          onChange={(e) => setCoordinates(e.target.value)}
                          placeholder="e.g. 9.3835, 76.5740"
                          className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Boutique Image Link (Optional)</label>
                      <input 
                        type="url" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/... or blank for fallback"
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-4 px-5 text-xs focus:ring-2 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>

                    {/* Operational Toggle */}
                    <div className="flex items-center justify-between p-5 bg-brand-pearl/20 rounded-2xl border border-black/5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal block">Operational Status</span>
                        <span className="text-[9px] text-brand-charcoal/40 uppercase tracking-widest mt-0.5 block">Disable boutique temporarily from public listings</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors duration-500 relative flex items-center px-1 border",
                          isActive ? "bg-brand-charcoal border-brand-gold/30" : "bg-brand-pearl border-black/10"
                        )}
                      >
                        <m.div
                          animate={{ x: isActive ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={cn(
                            "w-4 h-4 rounded-full transition-colors",
                            isActive ? "bg-brand-gold" : "bg-brand-charcoal/20"
                          )}
                        />
                      </button>
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-5 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-xl"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Synchronizing Nodes...</span>
                        </>
                      ) : (
                        <span>Publish Boutique Coordinates</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
