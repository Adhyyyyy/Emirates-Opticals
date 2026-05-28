"use client";

import React, { useState, useTransition, useRef } from "react";
import { registerMediaAsset, deleteMediaAsset } from "@/actions/cms-media";
import { createClient } from "@supabase/supabase-js";
import { 
  FolderOpen, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Search, 
  Loader2, 
  Plus, 
  Sparkles, 
  Percent, 
  Database,
  Globe,
  HardDriveDownload,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  folder: string;
  size: string;
  type: string;
  createdAt: string;
}

interface MediaLibraryProps {
  initialAssets: MediaAsset[];
}

const FOLDERS = ["All Assets", "Products", "Banners", "Branches", "Marketing"];

export function MediaLibrary({ initialAssets }: MediaLibraryProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [activeFolder, setActiveFolder] = useState("All Assets");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Upload States
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressionMetrics, setCompressionMetrics] = useState<{ original: string; compressed: string; saved: string } | null>(null);
  const [uploadFolder, setUploadFolder] = useState("Products");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  // Helper to format bytes
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Perform client-side canvas compression for "optimized media delivery" and "image compression"
  const compressImageClient = (file: File): Promise<{ blob: Blob; sizeStr: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set premium web layout width max limits (1200px max bounds)
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          if (ctx) {
            // Draw visual asset
            ctx.drawImage(img, 0, 0, width, height);
            
            // Output to WebP with premium 0.8 quality compression ratio
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const sizeStr = formatBytes(blob.size);
                  resolve({ blob, sizeStr });
                } else {
                  reject(new Error("Canvas blob conversion failed"));
                }
              },
              "image/webp",
              0.8
            );
          } else {
            reject(new Error("Canvas context is unavailable"));
          }
        };
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setCompressionMetrics(null);
    setUploadProgress(10);

    try {
      // 1. Check if the file is an image
      if (!file.type.startsWith("image/")) {
        throw new Error("Only image formats are supported for optimized compression delivery.");
      }

      setUploadProgress(25);
      
      // 2. Perform Client-Side Canvas WebP Compression
      const originalSize = file.size;
      const originalSizeStr = formatBytes(originalSize);
      
      const { blob, sizeStr: compressedSizeStr } = await compressImageClient(file);
      setUploadProgress(50);

      const savedPercent = Math.round(((originalSize - blob.size) / originalSize) * 100);
      setCompressionMetrics({
        original: originalSizeStr,
        compressed: compressedSizeStr,
        saved: `${savedPercent}%`
      });

      // 3. Connect to Supabase Cloud Storage Client
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      setUploadProgress(70);

      // Generate a clean slug for storage filename
      const fileExt = "webp";
      const cleanFileName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      const storagePath = `${uploadFolder.toLowerCase()}/${Date.now()}-${cleanFileName}.${fileExt}`;

      // Upload file directly to "media" bucket
      const { data, error: uploadErr } = await supabase.storage
        .from("media")
        .upload(storagePath, blob, {
          contentType: "image/webp",
          cacheControl: "3600"
        });

      if (uploadErr) {
        throw new Error(uploadErr.message || "Failed to upload to Supabase cloud storage bucket. Make sure the 'media' bucket exists.");
      }

      setUploadProgress(90);

      // 4. Retrieve Optimized Cloud CDN url
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(storagePath);

      // 5. Register in our media library descriptor catalog
      const registerRes = await registerMediaAsset({
        name: `${cleanFileName}.webp`,
        url: publicUrl,
        folder: uploadFolder,
        size: compressedSizeStr,
        type: "image/webp"
      });

      if (registerRes.success && registerRes.data) {
        setAssets(prev => [registerRes.data as MediaAsset, ...prev]);
        setUploadProgress(100);
        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
        }, 1000);
      } else {
        throw new Error(registerRes.error || "Failed to register asset URL");
      }

    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "An unexpected error occurred during compression or upload.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this media asset?")) {
      const res = await deleteMediaAsset(id);
      if (res.success) {
        setAssets(prev => prev.filter(a => a.id !== id));
      } else {
        alert(res.error || "Could not delete asset");
      }
    }
  };

  // Filter and search assets
  const filteredAssets = assets.filter(asset => {
    const matchesFolder = activeFolder === "All Assets" || asset.folder === activeFolder;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.folder.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-black">
      
      {/* LEFT COLUMN: Folders Navigation drawer */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white p-6 border border-black/5 rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5">
            <FolderOpen className="w-4.5 h-4.5 text-brand-gold" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Media Folders</h3>
          </div>

          <div className="space-y-1.5">
            {FOLDERS.map((fol) => {
              const count = fol === "All Assets" 
                ? assets.length 
                : assets.filter(a => a.folder === fol).length;

              return (
                <button
                  key={fol}
                  onClick={() => setActiveFolder(fol)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                    activeFolder === fol 
                      ? "bg-brand-charcoal text-white shadow-sm" 
                      : "text-brand-charcoal/50 hover:bg-brand-pearl hover:text-brand-charcoal"
                  )}
                >
                  <span>{fol}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[8.5px] font-extrabold",
                    activeFolder === fol ? "bg-brand-gold text-white" : "bg-brand-pearl text-brand-charcoal/40"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Drag-Drop Uploader panel */}
        <div className="bg-white p-6 border border-black/5 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-black/5">
            <Upload className="w-4.5 h-4.5 text-brand-gold" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Cloud Uploader</h3>
          </div>

          {uploadError && (
            <div className="p-3 bg-red-50 text-red-700 text-[9px] font-bold rounded-xl flex items-start gap-2 border border-red-100 uppercase tracking-wider leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/40 mb-1.5 block">Target Folder</label>
              <select
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                disabled={uploading}
                className="w-full bg-brand-pearl/40 border-none p-3 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
              >
                {FOLDERS.slice(1).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Hidden native input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={handleUploadClick}
              disabled={uploading}
              className={cn(
                "w-full aspect-video border border-dashed rounded-[2rem] flex flex-col items-center justify-center gap-2.5 transition-all text-center p-4",
                uploading 
                  ? "bg-brand-pearl border-brand-gold/20" 
                  : "bg-brand-pearl/10 border-black/10 hover:border-brand-gold hover:bg-brand-pearl/20"
              )}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-brand-gold" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                    Compressing & Syncing... {uploadProgress}%
                  </span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-gold">
                    <Plus className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-charcoal block">Upload Visual</span>
                    <span className="text-[8px] font-light text-brand-charcoal/40 uppercase tracking-widest mt-1 block">WebP Auto-Compression</span>
                  </div>
                </>
              )}
            </button>

            {/* Display compression gains */}
            <AnimatePresence>
              {compressionMetrics && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col gap-2"
                >
                  <div className="flex items-center gap-1.5 text-emerald-800 text-[9px] font-extrabold uppercase tracking-widest">
                    <Percent className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Media Compressed</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-emerald-500/5">
                    <div>
                      <span className="text-[7.5px] uppercase tracking-widest text-emerald-800/40 block">BEFORE</span>
                      <span className="text-[10px] font-bold text-emerald-800">{compressionMetrics.original}</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] uppercase tracking-widest text-emerald-800/40 block">AFTER</span>
                      <span className="text-[10px] font-bold text-emerald-700">{compressionMetrics.compressed}</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] uppercase tracking-widest text-emerald-800/40 block">SAVED</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-white px-1.5 py-0.5 rounded border border-emerald-200">{compressionMetrics.saved}</span>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Search Filters and Assets Grid */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* Search header bar */}
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-charcoal/20" />
          <input 
            type="text"
            placeholder="Search media files by name, tags, or folder classifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/5 py-4 pl-14 pr-6 rounded-[2rem] text-xs focus:ring-1 focus:ring-brand-gold/20 outline-none shadow-sm transition-all"
          />
        </div>

        {/* Dynamic media assets list */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                className="bg-white border border-black/5 rounded-[2rem] overflow-hidden group hover:border-brand-gold/20 hover:shadow-md transition-all duration-700 flex flex-col justify-between"
              >
                {/* Thumbnail visual preview */}
                <div className="aspect-video bg-brand-pearl/30 relative overflow-hidden flex items-center justify-center shrink-0 border-b border-black/5">
                  <img 
                    src={asset.url} 
                    alt={asset.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-0.5 bg-black/60 text-white rounded-full text-[8px] font-extrabold uppercase tracking-widest backdrop-blur-sm">
                      {asset.folder}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold text-brand-charcoal uppercase tracking-tight truncate" title={asset.name}>
                      {asset.name}
                    </h4>
                    
                    <div className="flex items-center gap-3 mt-1.5 text-[8.5px] font-bold uppercase tracking-widest text-brand-charcoal/30">
                      <span className="flex items-center gap-1">
                        <Database className="w-3 h-3 text-brand-gold" />
                        {asset.size}
                      </span>
                      <span>â€¢</span>
                      <span>{asset.type}</span>
                    </div>
                  </div>

                  {/* Actions copy CDN URLs and deleting assets */}
                  <div className="flex items-center gap-2.5 pt-4 border-t border-black/5">
                    <button
                      onClick={() => handleCopy(asset.id, asset.url)}
                      className={cn(
                        "flex-1 py-2.5 px-3 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                        copiedId === asset.id 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-500/10" 
                          : "bg-brand-pearl hover:bg-brand-gold hover:text-white text-brand-charcoal/60 border-black/5 hover:border-transparent"
                      )}
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy CDN link
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="p-2.5 bg-brand-pearl/40 hover:bg-red-50 text-brand-charcoal/20 hover:text-red-500 rounded-xl border border-black/5 hover:border-red-500/10 transition-all shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white border border-dashed border-black/10 rounded-[3rem]">
              <div className="flex flex-col items-center gap-4 text-brand-charcoal/30">
                <ImageIcon className="w-12 h-12 font-light" />
                <p className="text-xs uppercase tracking-widest font-bold">No assets found</p>
                <p className="text-[11px] font-light">Try selecting a different folder or widening your search tags.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
