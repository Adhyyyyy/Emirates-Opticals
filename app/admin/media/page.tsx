import React from "react";
import { getMediaLibrary } from "@/actions/cms-media";
import { MediaLibrary } from "@/components/sections/admin/MediaLibrary";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MediaAdminPage() {
  const assets = await getMediaLibrary();

  return (
    <div className="space-y-12 pb-12 text-black">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold font-heading">Asset Command</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 font-heading">Central Media Library</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Upload, sort, and compress visual eyewear assets directly to cloud storage. Drag-and-drop uploads automatically compress images client-side into WebP, generating optimized CDN links you can reuse globally.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Media Library Workspace */}
      <Reveal delay={0.2}>
        <MediaLibrary initialAssets={assets} />
      </Reveal>
    </div>
  );
}
