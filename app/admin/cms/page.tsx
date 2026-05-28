import React from "react";
import prisma from "@/lib/prisma";
import { getBanners, getOffers } from "@/actions/cms-marketing";
import { CmsWorkspace } from "@/components/sections/admin/CmsWorkspace";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CMSPage() {
  // Concurrently load banners, campaigns, and branch targets
  const [banners, offers, branches] = await Promise.all([
    getBanners(),
    getOffers(),
    prisma.branch.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    })
  ]);

  return (
    <div className="space-y-12 pb-12 text-black">
      {/* Cinematic CMS Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold font-heading">Marketing Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal uppercase tracking-tighter leading-none mb-4 font-heading">
              Narrative & <br /><em className="italic font-light text-brand-gold/60">Campaigns</em>
            </h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Orchestrate the promotional sequences of Emirates Optician. Manage high-fidelity marketing banners and target special campaign offers to specific boutiques or across all showrooms with custom date-range schedules.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Dynamic Cms Workspace panel */}
      <Reveal delay={0.2}>
        <CmsWorkspace 
          initialBanners={banners}
          initialOffers={offers}
          branches={branches}
        />
      </Reveal>
    </div>
  );
}
