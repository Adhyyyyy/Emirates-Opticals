import React from "react";
import { SlidersHorizontal, Search, ChevronDown, LayoutGrid, List } from "lucide-react";

export default function ShopLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      
      {/* 1. Shop Hero Skeleton */}
      <section className="relative w-full h-[35vh] min-h-[250px] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/60 animate-pulse" />
        <div className="relative z-10 text-center space-y-6 max-w-xl px-6">
          <div className="h-3 w-32 bg-brand-gold/20 mx-auto rounded animate-pulse" />
          <div className="h-10 md:h-12 w-64 md:w-80 bg-white/10 mx-auto rounded animate-pulse" />
          <div className="h-4 w-48 bg-white/5 mx-auto rounded animate-pulse" />
        </div>
      </section>

      {/* 2. Brand strip skeleton */}
      <div className="w-full bg-brand-pearl/40 border-b border-black/5 py-4">
        <div className="container-tight flex items-center justify-center gap-12 md:gap-24 overflow-hidden">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-5 w-20 bg-neutral-200/50 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* 3. Main Body Split Columns */}
      <main className="section-padding bg-white">
        <div className="container-tight">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Sidebar Filter Skeleton */}
            <aside className="hidden lg:block w-72 flex-shrink-0 self-start pr-6 space-y-10">
              <div className="flex items-center gap-3 pb-6 border-b border-black/5">
                <SlidersHorizontal className="w-4 h-4 text-brand-gold/40 animate-pulse" />
                <div className="h-4 w-32 bg-neutral-200/60 rounded animate-pulse" />
              </div>
              
              {/* Filter Group Skeletons */}
              {Array.from({ length: 4 }).map((_, groupIdx) => (
                <div key={groupIdx} className="border-b border-black/5 pb-8 last:border-0 space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-neutral-200/60 rounded animate-pulse" />
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-200" />
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-3">
                        <div className="w-4 h-4 border border-black/5 bg-neutral-100/50 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-neutral-200/40 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Right Products Catalog Grid Skeleton */}
            <div className="flex-1 space-y-12">
              
              {/* Top Bar Skeleton */}
              <div className="hidden lg:flex items-center justify-between pb-6 border-b border-black/5">
                <div className="flex items-center gap-10">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-neutral-200 absolute left-0" />
                    <div className="h-8 w-64 bg-neutral-100 rounded-lg animate-pulse ml-8" />
                  </div>
                  <div className="h-3.5 w-36 bg-neutral-100 rounded animate-pulse" />
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="h-3.5 w-24 bg-neutral-100 rounded animate-pulse" />
                  <div className="w-[1px] h-4 bg-black/5" />
                  <div className="flex items-center gap-4 text-neutral-200">
                    <LayoutGrid className="w-4 h-4" />
                    <List className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Products 6-Card Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
                {Array.from({ length: 6 }).map((_, cardIdx) => (
                  <div key={cardIdx} className="flex flex-col space-y-6">
                    {/* Glassmorphic Aspect Ratio Image Box */}
                    <div className="aspect-[4/5] w-full bg-brand-pearl/50 border border-black/[0.02] rounded-3xl relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                      <div className="h-10 w-24 bg-neutral-200/40 rounded animate-pulse" />
                    </div>

                    {/* Metadata Box */}
                    <div className="space-y-3 px-2">
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-16 bg-neutral-200/60 rounded animate-pulse" />
                        <div className="h-3 w-12 bg-neutral-200/40 rounded animate-pulse" />
                      </div>
                      <div className="h-4 w-4/5 bg-neutral-200/70 rounded animate-pulse" />
                      <div className="h-3.5 w-1/3 bg-neutral-200/50 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Stats HUD */}
              <div className="mt-20 pt-10 border-t border-black/5 flex justify-between items-center">
                <div className="h-3.5 w-40 bg-neutral-100 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-neutral-100 rounded-xl animate-pulse" />
                  <div className="h-10 w-10 bg-neutral-100 rounded-xl animate-pulse" />
                  <div className="h-10 w-10 bg-neutral-100 rounded-xl animate-pulse" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
