"use client";

import React, { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Plus, 
  GripVertical,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  url: string;
  publicId: string;
  isUploading: boolean;
  error?: string;
}

interface ProductMediaUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ProductMediaUpload({ value, onChange }: ProductMediaUploadProps) {
  const [files, setFiles] = useState<MediaFile[]>(
    value.map((url, i) => ({ id: `existing-${i}`, url, publicId: "", isUploading: false }))
  );
  
  const { upload } = useCloudinaryUpload();

  // Pure synchronization: notify parent only after internal state resolves
  React.useEffect(() => {
    const validUrls = files.filter(f => !f.isUploading && f.url && !f.url.startsWith("blob:")).map(f => f.url);
    // Only trigger onChange if we have valid cloud URLs to prevent infinite loops
    // But since we need to send the URLs back, we map them directly.
    onChange(files.filter(f => !f.isUploading).map(f => f.url));
  }, [files]); // We intentionally omit onChange to prevent deep re-renders

  const onDrop = useCallback(async (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    let rawFiles: File[] = [];
    
    if ("target" in e && e.target.files) {
      rawFiles = Array.from(e.target.files);
    } else if ("dataTransfer" in e) {
      e.preventDefault();
      rawFiles = Array.from(e.dataTransfer.files);
    }

    const newFiles = rawFiles.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(f),
      publicId: "",
      isUploading: true
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Perform uploads
    rawFiles.forEach((file, index) => {
      upload(file, {
        folder: "PRODUCTS",
        onSuccess: (url, publicId) => {
          setFiles(prev => prev.map(f => f.id === newFiles[index].id ? { ...f, url, publicId, isUploading: false } : f));
        },
        onError: (error) => {
          setFiles(prev => prev.map(f => f.id === newFiles[index].id ? { ...f, isUploading: false, error } : f));
        }
      });
    });
  }, [upload]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };


  return (
    <div className="space-y-8">
      {/* Premium Dropzone */}
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="relative group cursor-pointer"
      >
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={onDrop}
          className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
        />
        <div className="border-2 border-dashed border-black/5 bg-brand-pearl/30 rounded-[2rem] p-12 text-center group-hover:border-brand-gold group-hover:bg-brand-pearl/50 transition-all duration-700">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-700">
            <Upload className="w-6 h-6 text-brand-gold" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-charcoal mb-2">Drop Luxury Assets</h3>
          <p className="text-[10px] text-brand-charcoal/40 font-medium uppercase tracking-widest">JPG, PNG, WebP • Max 5MB per file</p>
        </div>
      </div>

      {/* Dynamic Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <AnimatePresence mode="popLayout">
          {files.map((file, index) => (
            <m.div
              key={file.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-black/5 shadow-xl group"
            >
              <img 
                src={file.url} 
                className={cn(
                  "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110",
                  file.isUploading && "blur-sm opacity-50"
                )} 
                alt="Product View"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => removeFile(file.id)}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Indicators */}
              <div className="absolute top-3 left-3">
                {index === 0 && !file.isUploading && (
                  <span className="bg-brand-gold text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">Primary</span>
                )}
              </div>

              {file.isUploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 text-brand-gold animate-spin" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">Uploading...</span>
                </div>
              )}

              {file.error && (
                <div className="absolute inset-0 bg-red-500/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-white mb-2" />
                  <p className="text-[8px] font-bold text-white uppercase tracking-tighter leading-tight">{file.error}</p>
                </div>
              )}
            </m.div>
          ))}
        </AnimatePresence>

        {/* Add More Trigger (Small) */}
        {files.length > 0 && (
          <div className="relative group aspect-[3/4]">
            <input 
              type="file" 
              multiple 
              onChange={onDrop}
              className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            />
            <div className="w-full h-full border-2 border-dashed border-black/5 rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-brand-gold group-hover:bg-brand-pearl/20 transition-all duration-700">
               <Plus className="w-5 h-5 text-brand-gold" />
               <span className="text-[8px] font-bold uppercase tracking-widest text-brand-charcoal/30">Add View</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

