"use client";

import React, { useState, useTransition } from "react";
import { 
  createBanner, 
  toggleBannerStatus, 
  deleteBanner, 
  createOffer, 
  toggleOfferStatus, 
  deleteOffer 
} from "@/actions/cms-marketing";
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Sparkles, 
  Image as ImageIcon, 
  Calendar, 
  Tag, 
  MapPin, 
  Power, 
  Globe, 
  Clock, 
  Percent, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

interface CmsWorkspaceProps {
  initialBanners: any[];
  initialOffers: any[];
  branches: any[];
}

export function CmsWorkspace({ initialBanners, initialOffers, branches }: CmsWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"banners" | "offers">("banners");
  const [banners, setBanners] = useState<any[]>(initialBanners);
  const [offers, setOffers] = useState<any[]>(initialOffers);
  const [isPending, startTransition] = useTransition();

  // Banner Form States
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerLinkUrl, setBannerLinkUrl] = useState("");
  const [bannerBranchId, setBannerBranchId] = useState("Global");
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [bannerSuccess, setBannerSuccess] = useState(false);

  // Offer Form States
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [offerPromoCode, setOfferPromoCode] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [offerBranchId, setOfferBranchId] = useState("Global");
  const [offerStartDate, setOfferStartDate] = useState("");
  const [offerEndDate, setOfferEndDate] = useState("");
  const [offerError, setOfferError] = useState<string | null>(null);
  const [offerSuccess, setOfferSuccess] = useState(false);

  // Sample banner image templates for one-click mock design quality
  const sampleBanners = [
    { label: "Summer Campaign", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" },
    { label: "Luxury Frames", url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" },
    { label: "Designer Collection", url: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800" }
  ];

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError(null);
    setBannerSuccess(false);

    if (!bannerTitle || !bannerImageUrl) {
      setBannerError("Banner Title and Image URL are required.");
      return;
    }

    startTransition(async () => {
      const res = await createBanner({
        title: bannerTitle,
        subtitle: bannerSubtitle || undefined,
        imageUrl: bannerImageUrl,
        linkUrl: bannerLinkUrl || undefined,
        branchId: bannerBranchId
      });

      if (res.success && res.data) {
        setBanners(prev => [res.data, ...prev]);
        setBannerTitle("");
        setBannerSubtitle("");
        setBannerImageUrl("");
        setBannerLinkUrl("");
        setBannerBranchId("Global");
        setBannerSuccess(true);
        setTimeout(() => setBannerSuccess(false), 2000);
      } else {
        setBannerError(res.error || "Failed to deploy banner");
      }
    });
  };

  const handleToggleBanner = async (id: string, currentStatus: boolean) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, isActive: !currentStatus } : b));
    const res = await toggleBannerStatus(id, !currentStatus);
    if (res.error) {
      setBanners(prev => prev.map(b => b.id === id ? { ...b, isActive: currentStatus } : b));
      alert(res.error);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm("Are you sure you want to delete this promotional banner?")) {
      const res = await deleteBanner(id);
      if (res.success) {
        setBanners(prev => prev.filter(b => b.id !== id));
      } else {
        alert(res.error || "Could not delete banner");
      }
    }
  };

  const handleAddOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfferError(null);
    setOfferSuccess(false);

    if (!offerTitle || !offerPromoCode || !offerDiscount) {
      setOfferError("Title, Promo Code, and Discount Value are required.");
      return;
    }

    startTransition(async () => {
      const res = await createOffer({
        title: offerTitle,
        description: offerDesc,
        promoCode: offerPromoCode,
        discountVal: offerDiscount,
        branchId: offerBranchId,
        startDate: offerStartDate || undefined,
        endDate: offerEndDate || undefined
      });

      if (res.success && res.data) {
        setOffers(prev => [res.data, ...prev]);
        setOfferTitle("");
        setOfferDesc("");
        setOfferPromoCode("");
        setOfferDiscount("");
        setOfferBranchId("Global");
        setOfferStartDate("");
        setOfferEndDate("");
        setOfferSuccess(true);
        setTimeout(() => setOfferSuccess(false), 2000);
      } else {
        setOfferError(res.error || "Failed to deploy offer campaign");
      }
    });
  };

  const handleToggleOffer = async (id: string, currentStatus: boolean) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: !currentStatus } : o));
    const res = await toggleOfferStatus(id, !currentStatus);
    if (res.error) {
      setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: currentStatus } : o));
      alert(res.error);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (confirm("Are you sure you want to revoke this promotional offer?")) {
      const res = await deleteOffer(id);
      if (res.success) {
        setOffers(prev => prev.filter(o => o.id !== id));
      } else {
        alert(res.error || "Could not delete offer");
      }
    }
  };

  return (
    <div className="space-y-10 text-black">
      {/* Workspace Tabs Selector */}
      <div className="flex items-center gap-2 p-1 bg-brand-pearl rounded-2xl w-fit border border-black/5">
        <button
          onClick={() => setActiveTab("banners")}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
            activeTab === "banners" ? "bg-white text-brand-gold shadow-lg" : "text-brand-charcoal/40 hover:text-brand-charcoal"
          )}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Promotional Banners
        </button>
        <button
          onClick={() => setActiveTab("offers")}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
            activeTab === "offers" ? "bg-white text-brand-gold shadow-lg" : "text-brand-charcoal/40 hover:text-brand-charcoal"
          )}
        >
          <Tag className="w-3.5 h-3.5" />
          Scheduled Offers
        </button>
      </div>

      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PROMOTIONAL BANNERS */}
          {activeTab === "banners" && (
            <m.div
              key="banners"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Banners List */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-charcoal mb-4">Promotional Sequence</h3>
                {banners.length === 0 ? (
                  <div className="p-16 border border-dashed border-black/10 rounded-[2.5rem] bg-white text-center flex flex-col items-center justify-center text-brand-charcoal/30">
                    <ImageIcon className="w-8 h-8 font-light mb-3" />
                    <p className="text-xs uppercase tracking-widest font-bold">No campaign banners deployed</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {banners.map((b) => {
                      const branchName = b.branchId === "Global" ? "Global (All Branches)" : branches.find(br => br.id === b.branchId)?.name || b.branchId;
                      return (
                        <div key={b.id} className="bg-white p-6 border border-black/5 rounded-3xl flex flex-col sm:flex-row gap-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                          {/* Banner Image Preview */}
                          <div className="w-full sm:w-40 aspect-video rounded-2xl overflow-hidden shrink-0 border border-black/5 relative bg-brand-pearl">
                            <img src={b.imageUrl} className="w-full h-full object-cover" alt="Banner" />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={cn(
                                  "px-2.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest border",
                                  b.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-400 border-gray-100"
                                )}>
                                  {b.isActive ? "Active" : "Disabled"}
                                </span>
                                <span className="flex items-center gap-1 text-[8.5px] font-bold text-brand-gold uppercase tracking-widest">
                                  <MapPin className="w-3 h-3" />
                                  {branchName}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-tighter">{b.title}</h4>
                              {b.subtitle && <p className="text-[10px] text-brand-charcoal/40 font-light mt-1">{b.subtitle}</p>}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/5">
                              <button
                                onClick={() => handleToggleBanner(b.id, b.isActive)}
                                className={cn(
                                  "p-2.5 rounded-xl border transition-colors flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest",
                                  b.isActive 
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-500/10 hover:bg-emerald-100" 
                                    : "bg-gray-50 text-gray-400 border-black/5 hover:bg-brand-pearl"
                                )}
                              >
                                <Power className="w-3.5 h-3.5" />
                                {b.isActive ? "Deactivate" : "Activate"}
                              </button>

                              <button 
                                onClick={() => handleDeleteBanner(b.id)}
                                className="p-2.5 hover:bg-red-50 text-brand-charcoal/20 hover:text-red-500 rounded-xl border border-black/5 hover:border-red-500/10 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Banner Form */}
              <div className="lg:col-span-5 bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5">
                  <Plus className="w-4.5 h-4.5 text-brand-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Deploy Promo Banner</h3>
                </div>

                <form onSubmit={handleAddBanner} className="space-y-5">
                  {bannerError && (
                    <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{bannerError}</span>
                    </div>
                  )}

                  {bannerSuccess && (
                    <div className="p-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-emerald-100 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Banner Seeding Succeeded</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Banner Campaign Title</label>
                    <input 
                      type="text" 
                      required
                      value={bannerTitle}
                      onChange={(e) => setBannerTitle(e.target.value)}
                      placeholder="e.g. Designer Gold Havanas Collection"
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Subheading (Narrative)</label>
                    <input 
                      type="text" 
                      value={bannerSubtitle}
                      onChange={(e) => setBannerSubtitle(e.target.value)}
                      placeholder="e.g. Discover structural Italian acetate craftsmanship."
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Showroom Target Node</label>
                    <select
                      value={bannerBranchId}
                      onChange={(e) => setBannerBranchId(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    >
                      <option value="Global">Global (All branches)</option>
                      {branches.map(br => (
                        <option key={br.id} value={br.id}>{br.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Promotion Visual Asset URL</label>
                    <input 
                      type="text" 
                      required
                      value={bannerImageUrl}
                      onChange={(e) => setBannerImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />

                    {/* Pre-designed presets */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {sampleBanners.map((sb, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setBannerImageUrl(sb.url)}
                          className="px-3 py-1 bg-brand-pearl hover:bg-brand-gold/10 rounded-lg text-[8px] font-bold uppercase tracking-widest text-brand-charcoal border border-black/5 transition-all"
                        >
                          Preset: {sb.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Action Redirect Link URL (Optional)</label>
                    <input 
                      type="text" 
                      value={bannerLinkUrl}
                      onChange={(e) => setBannerLinkUrl(e.target.value)}
                      placeholder="e.g. /shop?category=sunglasses"
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Deploy Promo Banner</span>}
                  </button>
                </form>
              </div>
            </m.div>
          )}

          {/* TAB 2: SCHEDULED CAMPAIGNS */}
          {activeTab === "offers" && (
            <m.div
              key="offers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Offers List */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-charcoal mb-4">Active Campaigns</h3>
                {offers.length === 0 ? (
                  <div className="p-16 border border-dashed border-black/10 rounded-[2.5rem] bg-white text-center flex flex-col items-center justify-center text-brand-charcoal/30">
                    <Tag className="w-8 h-8 font-light mb-3" />
                    <p className="text-xs uppercase tracking-widest font-bold">No campaign offers launched</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {offers.map((o) => {
                      const branchName = o.branchId === "Global" ? "Global (All Branches)" : branches.find(br => br.id === o.branchId)?.name || o.branchId;
                      return (
                        <div key={o.id} className="bg-white p-8 border border-black/5 rounded-[2rem] relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                          {/* Discount Indicator Badge */}
                          <div className="absolute top-8 right-8 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/10">
                            <Percent className="w-5 h-5 stroke-[2.5]" />
                          </div>

                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-widest border",
                                o.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-gray-50 text-gray-400 border-gray-100"
                              )}>
                                {o.isActive ? "Live" : "Inactive"}
                              </span>
                              <span className="flex items-center gap-1 text-[8.5px] font-bold text-brand-gold uppercase tracking-widest">
                                <MapPin className="w-3 h-3" />
                                {branchName}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-brand-charcoal uppercase tracking-tighter">{o.title}</h4>
                              <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light mt-1.5">{o.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-brand-pearl/20 p-4 rounded-2xl border border-black/5">
                              <div>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-1">PROMO CODE</span>
                                <span className="text-xs font-mono font-bold text-brand-charcoal bg-white px-2.5 py-1 rounded border border-black/5">{o.promoCode}</span>
                              </div>
                              <div>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-1">VALUATION</span>
                                <span className="text-xs font-bold text-brand-gold">{o.discountVal}</span>
                              </div>
                            </div>

                            {/* Temporal Schedule dates */}
                            {(o.startDate || o.endDate) && (
                              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 pt-2">
                                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                                <span>
                                  {o.startDate ? new Date(o.startDate).toLocaleDateString() : "Immediate"} 
                                  {" — "} 
                                  {o.endDate ? new Date(o.endDate).toLocaleDateString() : "Ongoing"}
                                </span>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                              <button
                                onClick={() => handleToggleOffer(o.id, o.isActive)}
                                className={cn(
                                  "p-2.5 rounded-xl border transition-colors flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest",
                                  o.isActive 
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-500/10 hover:bg-emerald-100" 
                                    : "bg-gray-50 text-gray-400 border-black/5 hover:bg-brand-pearl"
                                )}
                              >
                                <Power className="w-3.5 h-3.5" />
                                {o.isActive ? "Pause Campaign" : "Launch Live"}
                              </button>

                              <button 
                                onClick={() => handleDeleteOffer(o.id)}
                                className="p-2.5 hover:bg-red-50 text-brand-charcoal/20 hover:text-red-500 rounded-xl border border-black/5 hover:border-red-500/10 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Offer Form */}
              <div className="lg:col-span-5 bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5">
                  <Plus className="w-4.5 h-4.5 text-brand-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Launch Campaign Offer</h3>
                </div>

                <form onSubmit={handleAddOffer} className="space-y-5">
                  {offerError && (
                    <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{offerError}</span>
                    </div>
                  )}

                  {offerSuccess && (
                    <div className="p-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-emerald-100 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Offer Registered Globally</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Campaign Title</label>
                    <input 
                      type="text" 
                      required
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      placeholder="e.g. Ramadan Special Eyewear Discount"
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Offer Details Description</label>
                    <textarea 
                      value={offerDesc}
                      onChange={(e) => setOfferDesc(e.target.value)}
                      placeholder="20% off all designer sunglasses collections on active boutique orders..."
                      rows={3}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Promo Code</label>
                      <input 
                        type="text" 
                        required
                        value={offerPromoCode}
                        onChange={(e) => setOfferPromoCode(e.target.value.toUpperCase())}
                        placeholder="RAMADAN20"
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Discount Worth</label>
                      <input 
                        type="text" 
                        required
                        value={offerDiscount}
                        onChange={(e) => setOfferDiscount(e.target.value)}
                        placeholder="e.g. 20% OFF or ₹2,000 off"
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Target Boutique Node</label>
                    <select
                      value={offerBranchId}
                      onChange={(e) => setOfferBranchId(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    >
                      <option value="Global">Global (All branches)</option>
                      {branches.map(br => (
                        <option key={br.id} value={br.id}>{br.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Temporal dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Launch Start Date</label>
                      <input 
                        type="date" 
                        value={offerStartDate}
                        onChange={(e) => setOfferStartDate(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Campaign End Date</label>
                      <input 
                        type="date" 
                        value={offerEndDate}
                        onChange={(e) => setOfferEndDate(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Deploy Special Campaign</span>}
                  </button>
                </form>
              </div>
            </m.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
