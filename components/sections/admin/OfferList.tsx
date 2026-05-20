"use client";

import React, { useState, useTransition } from "react";
import { createOffer, deleteOffer, toggleOfferStatus } from "@/actions/cms-marketing";
import { 
  Tag, 
  Trash2, 
  Plus, 
  X, 
  ShieldCheck, 
  Percent, 
  MapPin, 
  Calendar, 
  Image as ImageIcon, 
  Power, 
  AlertCircle,
  HelpCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

interface Offer {
  id: string;
  title: string;
  description: string;
  promoCode: string;
  discountVal: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
  bannerUrl?: string;
  isActive: boolean;
  createdAt: string;
}

interface OfferListProps {
  initialOffers: Offer[];
  branches: any[];
  currentAdminBranchId?: string | null;
}

export function OfferList({ initialOffers, branches, currentAdminBranchId }: OfferListProps) {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [isPosting, setIsPosting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [isPending, startTransition] = useTransition();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountVal, setDiscountVal] = useState("");
  const [branchId, setBranchId] = useState(currentAdminBranchId || "Global");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  
  const [error, setError] = useState<string | null>(null);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !promoCode || !discountVal) {
      setError("Please fill out all required parameters.");
      return;
    }

    const data = {
      title,
      description,
      promoCode,
      discountVal,
      branchId,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      bannerUrl: bannerUrl || undefined
    };

    startTransition(async () => {
      const res = await createOffer(data);
      if (res.success && res.data) {
        setOffers(prev => [res.data as Offer, ...prev]);
        setTitle("");
        setDescription("");
        setPromoCode("");
        setDiscountVal("");
        setBranchId(currentAdminBranchId || "Global");
        setStartDate("");
        setEndDate("");
        setBannerUrl("");
        setIsPosting(false);
      } else {
        setError(res.error || "Failed to deploy campaign.");
      }
    });
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    // Optimistic Update
    setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: !currentStatus } : o));

    const res = await toggleOfferStatus(id, !currentStatus);
    if (res.error) {
      // Rollback
      setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: currentStatus } : o));
      alert(res.error);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to permanently withdraw this promotional campaign?")) return;

    startTransition(async () => {
      const res = await deleteOffer(id);
      if (res.success) {
        setOffers(prev => prev.filter(o => o.id !== id));
      } else {
        alert(res.error || "Failed to remove offer.");
      }
    });
  };

  const filteredOffers = offers.filter(o => {
    if (activeFilter === "active") return o.isActive;
    if (activeFilter === "inactive") return !o.isActive;
    return true;
  });

  return (
    <div className="space-y-10 text-black">
      
      {/* 1. Filters and Header Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-black/5">
        <div className="flex items-center gap-2 p-1 bg-brand-pearl rounded-2xl w-fit border border-black/5">
          {[
            { id: "all", label: "All Campaigns" },
            { id: "active", label: "Live Active" },
            { id: "inactive", label: "Suspended / Paused" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                activeFilter === f.id ? "bg-white text-brand-gold shadow-md" : "text-brand-charcoal/40 hover:text-brand-charcoal"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {!isPosting && (
          <button 
            onClick={() => setIsPosting(true)}
            className="px-8 py-4 bg-brand-charcoal text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-3 hover:bg-brand-gold transition-all duration-500 shadow-md shrink-0 w-fit"
          >
            <Plus className="w-4 h-4" />
            Deploy Campaign
          </button>
        )}
      </div>

      {/* 2. Create Offer Form */}
      <AnimatePresence>
        {isPosting && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handlePost} className="bg-white p-10 md:p-12 border border-black/5 rounded-[2.5rem] shadow-sm space-y-8 max-w-4xl">
              <div className="flex justify-between items-center pb-4 border-b border-black/5">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-charcoal">New Promotion Protocol</h3>
                <button type="button" onClick={() => setIsPosting(false)} className="p-2 hover:bg-brand-pearl rounded-lg text-brand-charcoal/30">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Campaign Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Kakkanad Boutique Launch Edit"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Promo Code</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. KAKKANAD20"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-bold font-mono tracking-wider focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none uppercase"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Discount Value</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 20% OFF FRAMES"
                        value={discountVal}
                        onChange={(e) => setDiscountVal(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-bold tracking-widest focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Target Showroom Node</label>
                    {currentAdminBranchId ? (
                      <div className="bg-brand-pearl/40 p-4 rounded-xl text-xs font-bold text-brand-charcoal flex items-center gap-2 border border-black/5">
                        <MapPin className="w-4 h-4 text-brand-gold" />
                        <span>Scoped strictly to your boutique</span>
                      </div>
                    ) : (
                      <select
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-3.5 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                      >
                        <option value="Global">Global (All Showrooms)</option>
                        {branches.map(br => (
                          <option key={br.id} value={br.id}>{br.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Start Date</label>
                      <input 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-3.5 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">End Date</label>
                      <input 
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-3.5 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Campaign Banner URL (Optional)</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20" />
                      <input 
                        type="text" 
                        placeholder="Paste CDN Link from Media Library"
                        value={bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none py-3.5 pl-12 pr-4 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Description</label>
                    <textarea 
                      required
                      rows={2.5}
                      placeholder="e.g. Enjoy exclusive boutique launch savings on all Italian prescription frames..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl leading-relaxed outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-black/5">
                <button 
                  type="button" 
                  onClick={() => setIsPosting(false)}
                  className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 hover:text-red-500 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="px-10 py-4 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors shadow-lg"
                >
                  {isPending ? "Deploying..." : "Finalize Campaign"}
                </button>
              </div>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* 3. Active Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => {
            const branchName = offer.branchId === "Global" ? "Global (All Showrooms)" : branches.find(b => b.id === offer.branchId)?.name || offer.branchId;
            return (
              <div key={offer.id} className="bg-white border border-black/5 rounded-[2rem] shadow-sm flex flex-col justify-between group hover:border-brand-gold/20 transition-all duration-500 overflow-hidden relative">
                
                {/* Visual Campaign Banner Preview */}
                {offer.bannerUrl ? (
                  <div className="aspect-video relative overflow-hidden shrink-0 border-b border-black/5 bg-brand-pearl/20">
                    <img 
                      src={offer.bannerUrl} 
                      alt={offer.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 text-white rounded-full text-[8px] font-extrabold uppercase tracking-widest backdrop-blur-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-gold" />
                        {branchName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 pb-4 shrink-0 flex items-start justify-between">
                    <span className="flex items-center gap-1 text-[8.5px] font-bold text-brand-gold uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5" />
                      {branchName}
                    </span>
                  </div>
                )}

                {/* Details */}
                <div className="p-8 flex-1 flex flex-col justify-between gap-6 relative">
                  
                  {/* Decorative corner tag if no banner */}
                  {!offer.bannerUrl && (
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-pearl rounded-full translate-x-6 -translate-y-6 flex items-center justify-center text-brand-gold/10 group-hover:bg-brand-gold/5 group-hover:text-brand-gold/20 transition-all duration-700">
                      <Percent className="w-8 h-8" />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="px-4 py-2 bg-brand-gold text-brand-charcoal text-[9px] font-extrabold uppercase tracking-[0.2em] rounded-xl flex items-center gap-1.5 shadow-sm">
                        <Tag className="w-3.5 h-3.5" />
                        {offer.discountVal}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggle(offer.id, offer.isActive)}
                          className={cn(
                            "p-2 rounded-xl border transition-colors flex items-center justify-center gap-1 text-[8px] font-bold uppercase tracking-widest",
                            offer.isActive 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-500/10 hover:bg-emerald-100" 
                              : "bg-gray-50 text-gray-400 border-black/5 hover:bg-brand-pearl"
                          )}
                        >
                          <Power className="w-3.5 h-3.5" />
                          {offer.isActive ? "Live" : "Paused"}
                        </button>

                        <button 
                          onClick={() => handleDelete(offer.id)}
                          disabled={isPending}
                          className="p-2 bg-brand-pearl/40 hover:bg-red-50 rounded-xl text-brand-charcoal/20 hover:text-red-500 border border-transparent hover:border-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-brand-charcoal uppercase tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-brand-charcoal/50 font-light leading-relaxed line-clamp-3">
                        {offer.description}
                      </p>
                    </div>

                    {(offer.startDate || offer.endDate) && (
                      <div className="flex items-center gap-2 text-[9px] font-medium text-brand-charcoal/40 uppercase tracking-widest bg-brand-pearl/20 p-2.5 rounded-xl border border-black/5">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        <span>
                          {offer.startDate ? new Date(offer.startDate).toLocaleDateString() : "Immediate"}
                          {" — "}
                          {offer.endDate ? new Date(offer.endDate).toLocaleDateString() : "Ongoing"}
                        </span>
                      </div>
                    )}

                    <div className="bg-brand-pearl/40 border border-black/5 p-4 rounded-2xl flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/30">Voucher Code</span>
                      <span className="text-xs font-bold font-mono tracking-widest text-brand-charcoal select-all bg-white px-3 py-1 rounded-lg border border-black/5">
                        {offer.promoCode}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30">
                    <span className={cn(
                      "flex items-center gap-1.5 font-bold",
                      offer.isActive ? "text-green-600" : "text-brand-charcoal/40"
                    )}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {offer.isActive ? "Live on Storefront" : "Campaign Suspended"}
                    </span>
                    <span>ID: {offer.id}</span>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white border border-dashed border-black/10 rounded-[2.5rem]">
            <div className="flex flex-col items-center gap-4 text-brand-charcoal/30">
              <Tag className="w-10 h-10 font-light animate-pulse" />
              <p className="text-xs uppercase tracking-widest font-bold">No listed promotions matched active filter.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
