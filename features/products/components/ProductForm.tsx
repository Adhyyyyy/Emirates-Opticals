"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/schemas";
import { ProductMediaUpload } from "./ProductMediaUpload";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  Settings, 
  Globe, 
  Eye,
  CheckCircle2,
  Info,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  brands: any[];
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({ initialData, categories, brands, onSubmit, onCancel }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "specs" | "media" | "seo">("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: 0,
      categoryId: "",
      brandId: "",
      gender: "UNISEX",
      frameShape: "",
      material: "",
      lensType: "",
      color: "",
      size: "",
      isFeatured: false,
      isNewArrival: false,
      isBestseller: false,
      status: "PUBLISHED",
      images: [],
      metaTitle: "",
      metaDesc: "",
      initialStock: 0,
    },
  });

  // Track if slug has been manually edited so auto-generation stops after user touches it
  const slugManuallyEdited = useRef(!!initialData);

  // Watch name field and auto-derive slug for NEW products only
  const watchedName = form.watch("name");
  useEffect(() => {
    if (slugManuallyEdited.current) return;
    if (!watchedName) return;
    const autoSlug = watchedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    form.setValue("slug", autoSlug, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  }, [watchedName]);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "specs", label: "Specifications", icon: Settings },
    { id: "media", label: "Media Gallery", icon: ImageIcon },
    { id: "seo", label: "SEO Protocol", icon: Globe },
  ];

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-12">
      {/* Premium Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-brand-pearl rounded-2xl w-fit border border-black/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
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

      {/* Form Content Area */}
      <div className="bg-white p-10 md:p-16 border border-black/5 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === "basic" && (
            <m.div
              key="basic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="space-y-10">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Product Name</label>
                  <input 
                    {...form.register("name")}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-2xl font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                    placeholder="e.g. Prada Linear Rossa"
                  />
                  {form.formState.errors.name && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.name.message as string}</p>}
                </div>

                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">
                    URL Slug
                    <span className="ml-3 text-brand-gold/60 normal-case font-normal">— auto-generated</span>
                  </label>
                  <input 
                    {...form.register("slug", {
                      onChange: (e) => {
                        // Once user manually types in slug, stop auto-generating
                        slugManuallyEdited.current = true;
                        const sanitized = e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                        e.target.value = sanitized;
                        form.setValue("slug", sanitized, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                      }
                    })}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono"
                    placeholder="prada-linear-rossa"
                  />
                  {form.formState.errors.slug && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.slug.message as string}</p>}
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Base Valuation (INR)</label>
                    <input 
                      type="number"
                      {...form.register("price", { valueAsNumber: true })}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-bold focus:outline-none focus:border-brand-gold transition-colors duration-500"
                    />
                    {form.formState.errors.price && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.price.message as string}</p>}
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Availability Status</label>
                    <select 
                      {...form.register("status")}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 appearance-none cursor-pointer"
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft Protocol</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Boutique Stock Allocation</label>
                    <input 
                      type="number"
                      {...form.register("initialStock", { valueAsNumber: true })}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-bold focus:outline-none focus:border-brand-gold transition-colors duration-500"
                    />
                    {form.formState.errors.initialStock && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.initialStock.message as string}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Editorial Description</label>
                  <textarea 
                    {...form.register("description")}
                    rows={6}
                    className="w-full bg-brand-pearl/20 border border-black/5 p-8 text-sm font-light leading-relaxed focus:outline-none focus:border-brand-gold transition-all duration-500 rounded-3xl"
                    placeholder="Describe the luxury craftsmanship..."
                  />
                  {form.formState.errors.description && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.description.message as string}</p>}
                </div>

                <div className="flex flex-wrap gap-8">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className={cn(
                      "w-6 h-6 rounded-md border-2 border-brand-gold/20 flex items-center justify-center transition-all duration-500",
                      form.watch("isFeatured") ? "bg-brand-gold border-brand-gold" : "group-hover:border-brand-gold"
                    )}>
                      {form.watch("isFeatured") && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" {...form.register("isFeatured")} className="hidden" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">Featured Piece</span>
                  </label>

                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className={cn(
                      "w-6 h-6 rounded-md border-2 border-blue-500/20 flex items-center justify-center transition-all duration-500",
                      form.watch("isNewArrival") ? "bg-blue-500 border-blue-500" : "group-hover:border-blue-500"
                    )}>
                      {form.watch("isNewArrival") && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" {...form.register("isNewArrival")} className="hidden" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">New Arrival</span>
                  </label>
                </div>
              </div>
            </m.div>
          )}

          {activeTab === "specs" && (
            <m.div
              key="specs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="space-y-10">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Boutique Brand</label>
                  <select 
                    {...form.register("brandId")}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  >
                    <option value="">Select Global Brand</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  {form.formState.errors.brandId && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.brandId.message as string}</p>}
                </div>

                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Collection Category</label>
                  <select 
                    {...form.register("categoryId")}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {form.formState.errors.categoryId && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.categoryId.message as string}</p>}
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Gender Profile</label>
                    <select {...form.register("gender")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                      <option value="UNISEX">Unisex</option>
                      <option value="MEN">Gentlemen</option>
                      <option value="WOMEN">Ladies</option>
                      <option value="KIDS">Juniors</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Frame Silhouette</label>
                    <input {...form.register("frameShape")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light" placeholder="e.g. Aviator, Square" />
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Material Craft</label>
                    <input {...form.register("material")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light" placeholder="e.g. Acetate, Titanium" />
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Tier</label>
                    <input {...form.register("lensType")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light" placeholder="e.g. Polarized, Gradient" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Primary Color</label>
                    <input {...form.register("color")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light" placeholder="e.g. Gold Havana" />
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Sizing (Standard)</label>
                    <input {...form.register("size")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light" placeholder="e.g. 54-18-145" />
                  </div>
                </div>
              </div>
            </m.div>
          )}

          {activeTab === "media" && (
            <m.div
              key="media"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-charcoal mb-4">Gallery Orchestration</h3>
                <p className="text-[11px] text-brand-charcoal/40 font-light mb-12">The first image will serve as the master hero shot across all boutique catalogs.</p>
              </div>
              <ProductMediaUpload 
                value={form.watch("images")}
                onChange={(urls) => form.setValue("images", urls, { shouldValidate: true })}
              />
              {form.formState.errors.images && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.images.message as string}</p>}
            </m.div>
          )}

          {activeTab === "seo" && (
            <m.div
              key="seo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl space-y-12"
            >
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Search Performance Title</label>
                <input 
                  {...form.register("metaTitle")}
                  className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="The page title as seen in search results"
                />
              </div>

              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Strategic Meta Description</label>
                <textarea 
                  {...form.register("metaDesc")}
                  rows={4}
                  className="w-full bg-brand-pearl/20 border border-black/5 p-8 text-sm font-light leading-relaxed focus:outline-none focus:border-brand-gold transition-all duration-500 rounded-3xl"
                  placeholder="A compelling summary for global search visibility..."
                />
              </div>

              <div className="p-8 bg-brand-pearl/40 rounded-3xl border border-brand-gold/10">
                <div className="flex gap-4 mb-4">
                  <Globe className="w-5 h-5 text-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">Global Visibility Tip</span>
                </div>
                <p className="text-[11px] text-brand-charcoal/60 leading-relaxed italic">
                  "Maintain high-fidelity metadata to ensure Emirates Optician remains the premium destination for luxury eyewear in Kerala."
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Actions */}
      <div className="flex items-center justify-between pt-8 border-t border-black/5">
        <button 
          type="button"
          onClick={onCancel}
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30 hover:text-red-500 transition-colors"
        >
          Discard Changes
        </button>

        <div className="flex items-center gap-6">
          {Object.keys(form.formState.errors).length > 0 && (
            <div className="flex items-center gap-3 mr-4 text-red-500 bg-red-50/50 px-6 py-3 rounded-2xl border border-red-500/10">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">Incomplete Protocol</span>
                <span className="text-[9px] font-bold text-red-500/70 uppercase tracking-widest mt-0.5">
                  Check: {Object.keys(form.formState.errors).join(", ")}
                </span>
              </div>
            </div>
          )}
          <LuxuryButton 
            type="submit"
            disabled={isSubmitting}
            className="px-16 py-6 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center gap-4 group"
          >
            <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
            {isSubmitting ? "Executing Protocol..." : "Finalize Product"}
          </LuxuryButton>
        </div>
      </div>
    </form>
  );
}
