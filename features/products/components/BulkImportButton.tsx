"use client";

import React, { useState, useTransition } from "react";
import { bulkImportProducts } from "@/actions/catalog-setup";
import { 
  Upload, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Check 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

export function BulkImportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleTemplate = `[
  {
    "name": "Prada Linear Rossa Luxe",
    "price": 24500,
    "brandName": "Prada",
    "categoryName": "Sunglasses",
    "description": "Crafted premium linear titanium eyewear frames.",
    "gender": "UNISEX",
    "frameShape": "Aviator",
    "material": "Titanium",
    "lensType": "Gradient Polarized",
    "color": "Gold Carbon",
    "size": "58-14-145",
    "initialStock": 12,
    "images": [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600"
    ]
  }
]`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(sampleTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!jsonText.trim()) {
      setError("Please paste a valid JSON array of product collections.");
      return;
    }

    let parsedData: any[];
    try {
      parsedData = JSON.parse(jsonText);
      if (!Array.isArray(parsedData)) {
        throw new Error("Pasted data must be a JSON array (wrapped in [ ... ])");
      }
    } catch (err: any) {
      setError(`JSON Parsing Failed: ${err.message}`);
      return;
    }

    startTransition(async () => {
      const res = await bulkImportProducts(parsedData);
      if (res.success && res.count) {
        setSuccess(res.count);
        setJsonText("");
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(null);
        }, 2000);
      } else {
        setError(res.error || "Failed to commit bulk import");
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => {
          setError(null);
          setSuccess(null);
          setIsOpen(true);
        }}
        className="px-8 py-5 border border-black/5 hover:border-brand-gold bg-white hover:bg-brand-pearl/20 text-brand-charcoal rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 transition-all duration-700 shadow-md"
      >
        <Upload className="w-3.5 h-3.5" />
        Bulk Import Catalog
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            />
            
            {/* Modal Container */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:w-[700px] bg-white z-50 rounded-[2.5rem] shadow-2xl p-10 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between self-center justify-self-center border border-black/5 text-black"
            >
              <div className="space-y-6">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center pb-5 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-brand-gold" />
                    <h2 className="text-xl font-bold uppercase tracking-tight text-brand-charcoal font-heading">
                      Bulk Registry Upload
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-brand-pearl rounded-full transition-colors text-brand-charcoal/50 hover:text-brand-charcoal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {success !== null ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 stroke-[1.5]" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-brand-charcoal">Import Committed</h3>
                    <p className="text-xs text-brand-charcoal/40 font-light leading-relaxed">
                      Successfully imported <strong className="text-brand-gold">{success}</strong> luxury collections into the database registry.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLaunchImport} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest leading-relaxed">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Template blueprint */}
                    <div className="bg-brand-pearl/30 p-6 rounded-2xl border border-black/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">Collection JSON Blueprint</span>
                        <button
                          type="button"
                          onClick={handleCopyTemplate}
                          className="flex items-center gap-2 text-[8px] font-extrabold uppercase tracking-widest text-brand-charcoal/50 hover:text-brand-gold transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              Blueprint Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Blueprint
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[9px] font-mono text-brand-charcoal/60 bg-white/40 p-4 rounded-xl overflow-x-auto max-h-[140px]">
                        {sampleTemplate}
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Paste product dataset</label>
                      <textarea 
                        required
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                        placeholder="Paste JSON array format dataset here..."
                        rows={8}
                        className="w-full bg-brand-pearl/10 border border-black/5 rounded-2xl p-6 text-xs font-mono focus:ring-1 focus:ring-brand-gold/20 outline-none resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4.5 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xl"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Parsing & Seeding Registry...</span>
                        </>
                      ) : (
                        <span>Validate & Launch Bulk Import</span>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
