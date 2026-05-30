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
  branches?: any[];
  isBranchAdmin?: boolean;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({ initialData, categories, brands, branches = [], isBranchAdmin = false, onSubmit, onCancel }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "specs" | "collection" | "media" | "seo">("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    shouldUnregister: false,
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: 0,
      categoryId: "",
      brandId: "",
      gender: "UNISEX",
      style: "Classic",
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
      initialStock: 0,
      selectedBranches: [],
      metaTitle: "",
      metaDesc: "",
      // Hybrid Ecosystem Fields
      collectionType: "Designer Brands",
      isInHouseProduct: false,
      signatureCollectionName: "",
      craftsmanshipDetails: "",
      recommendedUsage: "",
      frameWeightCategory: "",
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
    { id: "collection", label: "Collection Type", icon: Eye },
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

                <div className={cn("grid gap-8", !initialData ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2")}>
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Base Valuation (INR)</label>
                    <input 
                      type="number"
                      {...form.register("price", { valueAsNumber: true })}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-bold focus:outline-none focus:border-brand-gold transition-colors duration-500"
                    />
                    {form.formState.errors.price && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.price.message as string}</p>}
                  </div>

                  {!initialData && (
                    <div className="group relative">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Initial Stock Quantity (Units)</label>
                      <input 
                        type="number"
                        {...form.register("initialStock", { valueAsNumber: true })}
                        className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-bold focus:outline-none focus:border-brand-gold transition-colors duration-500"
                        placeholder="0"
                      />
                      {form.formState.errors.initialStock && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold">{form.formState.errors.initialStock.message as string}</p>}
                    </div>
                  )}

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

              {!initialData && !isBranchAdmin && branches.length > 0 && (
                <div className="md:col-span-2 border-t border-black/5 pt-10 mt-6">
                  <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-gold mb-6 block">
                    Boutique Stock Assignment
                  </label>
                  <p className="text-[11px] text-brand-charcoal/40 font-light mb-8">
                    Specify which physical showrooms currently have this initial stock allocation. If none are selected, stock will default to all showrooms automatically.
                  </p>
                  
                  {/* Select All Toggle Button */}
                  <div className="mb-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue("selectedBranches", branches.map(b => b.id));
                      }}
                      className="py-2.5 px-4 rounded-[3px] border border-black/5 hover:border-brand-gold text-[8px] font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold transition-all duration-300 bg-brand-pearl/20"
                    >
                      Select All Boutique Lounges
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue("selectedBranches", []);
                      }}
                      className="py-2.5 px-4 rounded-[3px] border border-black/5 hover:border-brand-gold text-[8px] font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold transition-all duration-300 bg-brand-pearl/20"
                    >
                      Clear Selection
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {branches.map((b) => {
                      const selectedList: string[] = form.watch("selectedBranches") || [];
                      const isChecked = selectedList.includes(b.id);
                      
                      return (
                        <label 
                          key={b.id} 
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-[3px] border cursor-pointer select-none transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-pearl/5",
                            isChecked 
                              ? "bg-brand-charcoal border-brand-gold text-brand-gold font-bold shadow-md shadow-brand-charcoal/5" 
                              : "bg-transparent border-black/[0.04] text-brand-charcoal/60"
                          )}
                        >
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                form.setValue("selectedBranches", selectedList.filter(id => id !== b.id));
                              } else {
                                form.setValue("selectedBranches", [...selectedList, b.id]);
                              }
                            }}
                          />
                          <span className="text-[9px] uppercase tracking-wider">{b.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </m.div>
          )}

          {activeTab === "specs" && (() => {
            const watchedCategoryId = form.watch("categoryId");
            const selectedCategory = categories.find(c => c.id === watchedCategoryId)?.name || "";
            const isSunglasses = selectedCategory.toLowerCase().includes("sunglass");
            const isContactLenses = selectedCategory.toLowerCase().includes("contact");
            const isPrecisionLenses = selectedCategory.toLowerCase().includes("lens") && !isContactLenses && !selectedCategory.toLowerCase().includes("solution");
            const isSolutionsAccessories = selectedCategory.toLowerCase().includes("solution") || selectedCategory.toLowerCase().includes("accessor");

            return (
              <m.div
                key="specs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {/* Brand & Category Select Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-10 border-b border-black/5">
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
                </div>

                {/* Sub-form Adaptations */}
                {!watchedCategoryId ? (
                  <div className="text-center py-20 bg-brand-pearl/10 border border-dashed border-black/5 rounded-3xl flex flex-col items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-brand-gold/60 mb-3 animate-pulse" />
                    <p className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold mb-1">Awaiting Category Designation</p>
                    <p className="text-[10px] font-light text-brand-charcoal/30">Please assign a collection category above to establish tailored features.</p>
                  </div>
                ) : (
                  <div>
                    {/* Category Title Header */}
                    <div className="mb-8 flex items-center gap-3 bg-brand-pearl/30 px-6 py-3.5 rounded-2xl w-fit border border-black/5">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">
                        Tailoring Features: {selectedCategory}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* 1. SUNGLASSES SPECIFICATIONS */}
                      {isSunglasses && (
                        <>
                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Frame Silhouette</label>
                              <select {...form.register("frameShape")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Shape</option>
                                <option value="Aviator">Aviator</option>
                                <option value="Wayfarer">Wayfarer</option>
                                <option value="Rectangular">Rectangular</option>
                                <option value="Square">Square</option>
                                <option value="Round">Round</option>
                                <option value="Cat Eye">Cat Eye</option>
                                <option value="Oval">Oval</option>
                                <option value="Geometric">Geometric</option>
                                <option value="Hexagonal">Hexagonal</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Frame Material</label>
                              <select {...form.register("material")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Material</option>
                                <option value="Acetate">Acetate (Premium)</option>
                                <option value="Metal">Noble Metal</option>
                                <option value="Titanium">Pure Titanium</option>
                                <option value="Gold Plated">Gold Plated</option>
                                <option value="Carbon Fiber">Carbon Fiber</option>
                                <option value="TR90">TR90 Flexible</option>
                                <option value="Mixed">Mixed Materials</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Type & Protection</label>
                              <select {...form.register("lensType")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Protection</option>
                                <option value="Polarized">Polarized Technology</option>
                                <option value="100% UV Protection">100% UV Protection</option>
                                <option value="Gradient">Gradient Tint</option>
                                <option value="Mirrored">Mirrored Finish</option>
                                <option value="Anti-Reflective">Anti-Reflective</option>
                                <option value="Transitions">Transitions/Adaptive</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-10">
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
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Style Direction</label>
                                <select {...form.register("style")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                  <option value="Classic">Classic</option>
                                  <option value="Modern">Modern</option>
                                  <option value="Vintage">Vintage</option>
                                  <option value="Sport">Sport</option>
                                  <option value="Avant-Garde">Avant-Garde</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Sizing (Standard)</label>
                                <input {...form.register("size")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono" placeholder="e.g. 54-18-145" />
                              </div>
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Primary Color</label>
                                <input {...form.register("color")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. Tortoise Shell" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* 2. CONTACT LENSES SPECIFICATIONS */}
                      {isContactLenses && (
                        <>
                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Usage Frequency</label>
                              <select {...form.register("style")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Frequency</option>
                                <option value="Daily Disposable">Daily Disposable</option>
                                <option value="Weekly Disposable">Weekly Disposable</option>
                                <option value="Monthly Disposable">Monthly Disposable</option>
                                <option value="Yearly Disposable">Yearly Disposable</option>
                                <option value="Extended Wear">Extended Wear</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Material</label>
                              <select {...form.register("material")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Material</option>
                                <option value="Silicone Hydrogel">Silicone Hydrogel (High Oxygen)</option>
                                <option value="Hydrogel">Hydrogel (Standard Comfort)</option>
                                <option value="Rigid Gas Permeable">Rigid Gas Permeable (RGP)</option>
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Water Content</label>
                                <input {...form.register("frameWeightCategory")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono" placeholder="e.g. 58%" />
                              </div>
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Base Curve</label>
                                <input {...form.register("size")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono" placeholder="e.g. 8.6 mm" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-10">
                            <div className="grid grid-cols-2 gap-8">
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Diameter</label>
                                <input {...form.register("recommendedUsage")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono" placeholder="e.g. 14.2 mm" />
                              </div>
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Power Range Options</label>
                                <input {...form.register("craftsmanshipDetails")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. -0.50 to -10.00" />
                              </div>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Color / Tint</label>
                              <input {...form.register("color")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. Clear, Pure Hazel, Amber (or select None)" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* 3. PRECISION LENSES SPECIFICATIONS */}
                      {isPrecisionLenses && (
                        <>
                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Option Design Type</label>
                              <select {...form.register("lensType")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Type</option>
                                <option value="Single Vision">Single Vision</option>
                                <option value="Progressive">Progressive (Multi-Focal)</option>
                                <option value="Bifocal">Bifocal</option>
                                <option value="Anti-Glare / AR">Anti-Reflective / Anti-Glare</option>
                                <option value="Blue Cut Protection">Blue Cut Protection</option>
                                <option value="Photochromic / Transitions">Photochromic / Transitions</option>
                                <option value="Polarized Lens">Polarized Lens</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Lens Material Index</label>
                              <select {...form.register("material")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Material Index</option>
                                <option value="CR-39 Standard (1.50)">CR-39 Standard (1.50 Index)</option>
                                <option value="Mid-Index Lightweight (1.56)">Mid-Index (1.56 Index)</option>
                                <option value="Polycarbonate Impact-Resistant (1.59)">Polycarbonate (1.59 Index)</option>
                                <option value="High-Index Thin (1.61)">High-Index Thin (1.61 Index)</option>
                                <option value="High-Index Ultra Thin (1.67)">High-Index Ultra Thin (1.67 Index)</option>
                                <option value="High-Index Maximum Thin (1.74)">High-Index Maximum (1.74 Index)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Protective Coatings Included</label>
                              <input {...form.register("craftsmanshipDetails")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. Anti-Scratch, Hydrophobic, Blue Block" />
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Recommended Vision Usage</label>
                              <input {...form.register("recommendedUsage")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. Driving, Screen Work, Outdoor Sports" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* 4. SOLUTIONS & ACCESSORIES SPECIFICATIONS */}
                      {isSolutionsAccessories && (
                        <>
                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Accessory Category Type</label>
                              <select {...form.register("frameShape")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Accessory Type</option>
                                <option value="Cleaning Spray">Cleaning Spray / Lens Cleaner</option>
                                <option value="Microfiber Cloth">Microfiber Cloth</option>
                                <option value="Premium Case">Premium Frame Case</option>
                                <option value="Contact Lens Solution">Contact Lens Solution</option>
                                <option value="Eyewear Cord / Chain">Eyewear Cord / Chain</option>
                                <option value="Repair Tool Kit">Repair Tool Kit</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Volume / Sizing Capacity</label>
                              <input {...form.register("size")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono" placeholder="e.g. 120 ml, Universal Case Size" />
                            </div>
                          </div>

                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Material Craft / Color Design</label>
                              <input {...form.register("color")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. Tan Calfskin Leather, Microfine Fiber" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* 5. DEFAULT OPTICAL FRAMES SPECIFICATIONS */}
                      {!isSunglasses && !isContactLenses && !isPrecisionLenses && !isSolutionsAccessories && (
                        <>
                          <div className="space-y-10">
                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Frame Silhouette</label>
                              <select {...form.register("frameShape")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Shape</option>
                                <option value="Aviator">Aviator</option>
                                <option value="Wayfarer">Wayfarer</option>
                                <option value="Rectangular">Rectangular</option>
                                <option value="Square">Square</option>
                                <option value="Round">Round</option>
                                <option value="Cat Eye">Cat Eye</option>
                                <option value="Oval">Oval</option>
                                <option value="Geometric">Geometric</option>
                                <option value="Hexagonal">Hexagonal</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Frame Material</label>
                              <select {...form.register("material")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Material</option>
                                <option value="Acetate">Acetate (Premium)</option>
                                <option value="Metal">Noble Metal</option>
                                <option value="Titanium">Pure Titanium</option>
                                <option value="Gold Plated">Gold Plated</option>
                                <option value="Carbon Fiber">Carbon Fiber</option>
                                <option value="TR90">TR90 Flexible</option>
                                <option value="Mixed">Mixed Materials</option>
                              </select>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Frame Weight Class</label>
                              <select {...form.register("frameWeightCategory")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                <option value="">Select Weight</option>
                                <option value="Ultra-Light">Ultra-Light</option>
                                <option value="Light">Light</option>
                                <option value="Medium">Medium</option>
                                <option value="Heavy">Heavy</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-10">
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
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Style Direction</label>
                                <select {...form.register("style")} className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-bold uppercase tracking-widest">
                                  <option value="Classic">Classic</option>
                                  <option value="Modern">Modern</option>
                                  <option value="Vintage">Vintage</option>
                                  <option value="Sport">Sport</option>
                                  <option value="Avant-Garde">Avant-Garde</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Sizing (Standard)</label>
                                <input {...form.register("size")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 font-mono" placeholder="e.g. 54-18-145" />
                              </div>
                              <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Primary Color</label>
                                <input {...form.register("color")} className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500" placeholder="e.g. Matte Black" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </m.div>
            );
          })()}

          {/* ── COLLECTION TYPE TAB ── */}
          {activeTab === "collection" && (
            <m.div
              key="collection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* Collection Type Toggle */}
              <div className="p-8 bg-brand-pearl/40 border border-brand-gold/10 rounded-3xl">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal mb-6">Product Ecosystem</h3>
                <div className="flex gap-4">
                  {(["Designer Brands", "Emirates Signature"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        form.setValue("collectionType", type);
                        form.setValue("isInHouseProduct", type === "Emirates Signature");
                      }}
                      className={cn(
                        "flex-1 py-5 border text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all duration-500",
                        form.watch("collectionType") === type
                          ? "bg-brand-charcoal text-brand-gold border-brand-charcoal shadow-xl"
                          : "border-black/10 text-brand-charcoal/50 hover:border-brand-gold/30"
                      )}
                    >
                      {type === "Emirates Signature" ? "✦ Emirates Signature" : "◈ Designer Brand"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-10">
                  {/* Signature Collection Name — shown for in-house products */}
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">
                      Signature Collection Name
                      {form.watch("collectionType") !== "Emirates Signature" && (
                        <span className="ml-3 text-brand-charcoal/20 normal-case font-normal">(Emirates Signature only)</span>
                      )}
                    </label>
                    <select
                      {...form.register("signatureCollectionName")}
                      disabled={form.watch("collectionType") !== "Emirates Signature"}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 disabled:opacity-30"
                    >
                      <option value="">Select Collection</option>
                      <option value="Emirates Contemporary">Emirates Contemporary</option>
                      <option value="Emirates Atelier">Emirates Atelier</option>
                      <option value="Emirates Everyday">Emirates Everyday</option>
                      <option value="Emirates Minimal">Emirates Minimal</option>
                      <option value="Emirates Studio">Emirates Studio</option>
                      <option value="Emirates Essential">Emirates Essential</option>
                    </select>
                  </div>

                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Recommended Usage</label>
                    <input
                      {...form.register("recommendedUsage")}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                      placeholder="e.g. Daily Wear, Office, Outdoor"
                    />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="group relative">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-4 block">Craftsmanship Details</label>
                    <textarea
                      {...form.register("craftsmanshipDetails")}
                      rows={5}
                      className="w-full bg-brand-pearl/20 border border-black/5 p-6 text-sm font-light leading-relaxed focus:outline-none focus:border-brand-gold transition-all duration-500 rounded-3xl"
                      placeholder="Describe the materials, manufacturing process, and quality details..."
                    />
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
