"use client";

import React, { useState, useTransition } from "react";
import { CollectionList } from "./CollectionList";
import { 
  createCategory, 
  deleteCategory, 
  createBrand, 
  deleteBrand 
} from "@/actions/catalog-setup";
import { 
  Sparkles, 
  Layers, 
  Bookmark, 
  Plus, 
  Trash2, 
  Loader2, 
  Building2, 
  Tags,
  AlertCircle,
  CheckCircle2,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

interface CollectionWorkspaceProps {
  products: any[];
  categories: any[];
  brands: any[];
}

export function CollectionWorkspace({ products, categories: initialCategories, brands: initialBrands }: CollectionWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"curations" | "categories" | "brands">("curations");
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [brands, setBrands] = useState<any[]>(initialBrands);
  const [isPending, startTransition] = useTransition();

  // Categories Form States
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catError, setCatError] = useState<string | null>(null);
  const [catSuccess, setCatSuccess] = useState(false);

  // Brands Form States
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [brandCountry, setBrandCountry] = useState("");
  const [brandError, setBrandError] = useState<string | null>(null);
  const [brandSuccess, setBrandSuccess] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatError(null);
    setCatSuccess(false);

    if (!catName) return;

    startTransition(async () => {
      const res = await createCategory({ name: catName, description: catDesc });
      if (res.success && res.data) {
        setCategories(prev => [...prev, res.data]);
        setCatName("");
        setCatDesc("");
        setCatSuccess(true);
        setTimeout(() => setCatSuccess(false), 2000);
      } else {
        setCatError(res.error || "Failed to create category");
      }
    });
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to remove this category? Depended products will block removal.")) {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories(prev => prev.filter(c => c.id !== id));
      } else {
        alert(res.error || "Could not delete category");
      }
    }
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrandError(null);
    setBrandSuccess(false);

    if (!brandName) return;

    startTransition(async () => {
      const res = await createBrand({ name: brandName, description: brandDesc, country: brandCountry });
      if (res.success && res.data) {
        setBrands(prev => [...prev, res.data]);
        setBrandName("");
        setBrandDesc("");
        setBrandCountry("");
        setBrandSuccess(true);
        setTimeout(() => setBrandSuccess(false), 2000);
      } else {
        setBrandError(res.error || "Failed to create brand");
      }
    });
  };

  const handleDeleteBrand = async (id: string) => {
    if (confirm("Are you sure you want to decommission this luxury brand? Depended products will block removal.")) {
      const res = await deleteBrand(id);
      if (res.success) {
        setBrands(prev => prev.filter(b => b.id !== id));
      } else {
        alert(res.error || "Could not delete brand");
      }
    }
  };

  const tabs = [
    { id: "curations", label: "Homepage Edits", icon: Sparkles },
    { id: "categories", label: "Store Categories", icon: Layers },
    { id: "brands", label: "Eyewear Brands", icon: Bookmark },
  ];

  return (
    <div className="space-y-10 text-black">
      {/* Animated Tab Bar */}
      <div className="flex items-center gap-2 p-1 bg-brand-pearl rounded-2xl w-fit border border-black/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-3 px-6 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest relative transition-all duration-500",
              activeTab === tab.id 
                ? "bg-white text-brand-gold shadow-lg" 
                : "text-brand-charcoal/40 hover:text-brand-charcoal"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workspace Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PRODUCT LIST FLAGS CURATIONS */}
          {activeTab === "curations" && (
            <m.div
              key="curations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CollectionList initialProducts={products} />
            </m.div>
          )}

          {/* TAB 2: STORE CATEGORIES */}
          {activeTab === "categories" && (
            <m.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Categories list */}
              <div className="lg:col-span-8 bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5">
                  <Tags className="w-5 h-5 text-brand-gold" />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal">Available Categories</h3>
                    <p className="text-[9px] text-brand-charcoal/30 uppercase tracking-widest mt-1">Manage global collections schemas</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/5 text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                        <th className="py-4 px-4">Category Name</th>
                        <th className="py-4 px-4">SEO URL Path</th>
                        <th className="py-4 px-4">Linked Products</th>
                        <th className="py-4 px-4 text-right">Decommission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {categories.map((c) => {
                        const linkedCount = products.filter(p => p.categoryId === c.id).length;
                        return (
                          <tr key={c.id} className="hover:bg-brand-pearl/10 transition-colors">
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-brand-charcoal uppercase tracking-tight">{c.name}</span>
                              {c.description && <p className="text-[10px] text-brand-charcoal/40 font-light mt-0.5">{c.description}</p>}
                            </td>
                            <td className="py-4 px-4 font-mono text-[10px] text-brand-charcoal/50">
                              /{c.slug}
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 bg-brand-pearl text-[9px] font-bold uppercase tracking-widest rounded-lg text-brand-gold">
                                {linkedCount} Item(s)
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button 
                                onClick={() => handleDeleteCategory(c.id)}
                                className="p-2 hover:bg-red-50 text-brand-charcoal/20 hover:text-red-500 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Category Form */}
              <div className="lg:col-span-4 bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5">
                  <Plus className="w-4.5 h-4.5 text-brand-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Define Category</h3>
                </div>

                <form onSubmit={handleAddCategory} className="space-y-5">
                  {catError && (
                    <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{catError}</span>
                    </div>
                  )}

                  {catSuccess && (
                    <div className="p-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-emerald-100 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Category Registered</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Category Name</label>
                    <input 
                      type="text" 
                      required
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      placeholder="e.g. Contact Lenses"
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Short Description</label>
                    <textarea 
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      placeholder="Premium accessories description..."
                      rows={3}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Deploy Schema</span>}
                  </button>
                </form>
              </div>

            </m.div>
          )}

          {/* TAB 3: EYEWEAR BRANDS */}
          {activeTab === "brands" && (
            <m.div
              key="brands"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Brands List */}
              <div className="lg:col-span-8 bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5">
                  <Building2 className="w-5 h-5 text-brand-gold" />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal">Global Labels</h3>
                    <p className="text-[9px] text-brand-charcoal/30 uppercase tracking-widest mt-1">Manage designer brand indices</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/5 text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                        <th className="py-4 px-4">Brand Label</th>
                        <th className="py-4 px-4">Origin Country</th>
                        <th className="py-4 px-4">Linked Products</th>
                        <th className="py-4 px-4 text-right">Decommission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {brands.map((b) => {
                        const linkedCount = products.filter(p => p.brandId === b.id).length;
                        return (
                          <tr key={b.id} className="hover:bg-brand-pearl/10 transition-colors">
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-brand-charcoal uppercase tracking-tight">{b.name}</span>
                              {b.description && <p className="text-[10px] text-brand-charcoal/40 font-light mt-0.5">{b.description}</p>}
                            </td>
                            <td className="py-4 px-4 font-bold text-[10px] text-brand-gold uppercase tracking-widest">
                              {b.country || "GLOBAL ORIGIN"}
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 bg-brand-pearl text-[9px] font-bold uppercase tracking-widest rounded-lg text-brand-gold">
                                {linkedCount} Item(s)
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button 
                                onClick={() => handleDeleteBrand(b.id)}
                                className="p-2 hover:bg-red-50 text-brand-charcoal/20 hover:text-red-500 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Brand Form */}
              <div className="lg:col-span-4 bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5">
                  <Plus className="w-4.5 h-4.5 text-brand-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Deploy Brand</h3>
                </div>

                <form onSubmit={handleAddBrand} className="space-y-5">
                  {brandError && (
                    <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{brandError}</span>
                    </div>
                  )}

                  {brandSuccess && (
                    <div className="p-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-emerald-100 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Brand Deployed</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Brand Name</label>
                    <input 
                      type="text" 
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Ray-Ban"
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Country Origin (Optional)</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20" />
                      <input 
                        type="text" 
                        value={brandCountry}
                        onChange={(e) => setBrandCountry(e.target.value)}
                        placeholder="e.g. Italy"
                        className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 pl-12 pr-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Brand Description</label>
                    <textarea 
                      value={brandDesc}
                      onChange={(e) => setBrandDesc(e.target.value)}
                      placeholder="Luxury labels history details..."
                      rows={3}
                      className="w-full bg-brand-pearl/20 border-none rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Deploy Brand</span>}
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
