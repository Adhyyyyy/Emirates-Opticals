"use client";

import React, { useState, useTransition } from "react";
import { createOffer, deleteOffer, toggleOfferStatus } from "@/actions/cms-marketing";
import { 
  Tag, 
  Trash2, 
  Plus, 
  X, 
  MapPin, 
  Power, 
  AlertCircle,
  Clock,
  Upload,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

interface Offer {
  id: string;
  title: string;
  description: string;
  percentage: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  imageUrl?: string;
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
  const [percentage, setPercentage] = useState("");
  const [branchId, setBranchId] = useState(currentAdminBranchId || "Global");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [error, setError] = useState<string | null>(null);

  const { upload: uploadOfferImage, isUploading: isUploadingOffer } = useCloudinaryUpload();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !percentage) {
      setError("Please fill out all required offer parameters.");
      return;
    }

    const data = {
      title,
      description,
      percentage,
      branchId,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      imageUrl: imageUrl || undefined,
    };

    startTransition(async () => {
      const res = await createOffer(data);
      if (res.success && res.data) {
        setOffers(prev => [res.data as Offer, ...prev]);
        setTitle("");
        setDescription("");
        setPercentage("");
        setBranchId(currentAdminBranchId || "Global");
        setStartDate("");
        setEndDate("");
        setImageUrl("");
        setIsPosting(false);
      } else {
        setError(res.error || "Failed to deploy offer.");
      }
    });
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: !currentStatus } : o));
    const res = await toggleOfferStatus(id, !currentStatus);
    if (res.error) {
      setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: currentStatus } : o));
      alert(res.error);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to permanently withdraw this offer?")) return;
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
            { id: "all", label: "All Offers" },
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
            Create Offer
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
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-charcoal">New Offer Configuration</h3>
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

              <div className="grid grid-cols-1 gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Offer Name (Title)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Summer Special"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Percentage / Discount</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 20% OFF"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-bold tracking-widest focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Target Showroom (Shop)</label>
                  {currentAdminBranchId ? (
                    <div className="bg-brand-pearl/40 p-4 rounded-xl text-xs font-bold text-brand-charcoal flex items-center gap-2 border border-black/5">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <span>Scoped strictly to your boutique</span>
                    </div>
                  ) : (
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                    >
                      <option value="Global">All Shops</option>
                      {branches.map(br => (
                        <option key={br.id} value={br.id}>{br.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Start Date (Optional)</label>
                    <input 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">End Date (Optional)</label>
                    <input 
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Description</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Provide details about the offer..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl leading-relaxed outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 mb-1.5 block">Offer Image Banner</label>
                  {imageUrl ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-black/5 bg-brand-pearl">
                      <img src={imageUrl} className="w-full h-full object-cover" alt="Campaign Banner Preview" />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-black/5 bg-brand-pearl/30 rounded-[2rem] p-8 text-center hover:border-brand-gold hover:bg-brand-pearl/50 transition-all duration-500 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await uploadOfferImage(file, {
                              folder: "PRODUCTS",
                              onSuccess: (url) => setImageUrl(url),
                              onError: (err) => alert(err),
                            });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {isUploadingOffer ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Loader2 className="w-6 h-6 text-brand-gold animate-spin animate-infinite" />
                          <span className="text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/40">Uploading to Cloudinary...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Upload className="w-5 h-5 text-brand-gold mx-auto" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Upload Campaign Image</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-black/5 mt-8">
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
                  {isPending ? "Saving..." : "Save Offer"}
                </button>
              </div>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* 3. Active Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => {
            const branchName = offer.branchId === "Global" ? "All Shops" : branches.find(b => b.id === offer.branchId)?.name || offer.branchId;
            return (
              <div key={offer.id} className="bg-white border border-black/5 rounded-[2rem] shadow-sm flex flex-col md:flex-row p-8 group hover:border-brand-gold/20 transition-all duration-500 relative gap-6">
                {offer.imageUrl && (
                  <div className="w-full md:w-32 aspect-video md:aspect-square rounded-2xl overflow-hidden shrink-0 border border-black/5 bg-brand-pearl relative">
                    <img src={offer.imageUrl} className="w-full h-full object-cover" alt="Offer Image" />
                  </div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-4 py-2 bg-brand-gold text-brand-charcoal text-[10px] font-extrabold uppercase tracking-[0.2em] rounded-xl flex items-center shadow-sm">
                      {offer.percentage}
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

                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-xl font-bold text-brand-charcoal uppercase tracking-tight group-hover:text-brand-gold transition-colors break-words">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/50 font-light leading-relaxed break-words">
                    {offer.description}
                  </p>

                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-brand-charcoal/60 uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{branchName}</span>
                    </div>

                    {(offer.startDate || offer.endDate) && (
                      <div className="flex items-center gap-2 text-[10px] font-medium text-brand-charcoal/60 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {offer.startDate ? new Date(offer.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Immediate"}
                          {" â€” "}
                          {offer.endDate ? new Date(offer.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Ongoing"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white border border-dashed border-black/10 rounded-[2.5rem]">
            <div className="flex flex-col items-center gap-4 text-brand-charcoal/30">
              <Tag className="w-10 h-10 font-light animate-pulse" />
              <p className="text-xs uppercase tracking-widest font-bold">No offers available.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
