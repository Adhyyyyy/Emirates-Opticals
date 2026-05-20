import React from "react";
import { getJobs } from "@/actions/cms-careers";
import prisma from "@/lib/prisma";
import { JobList } from "@/components/sections/admin/JobList";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsAdminPage() {
  // Concurrent loading of active job opportunities and physical branches
  const [jobs, branches] = await Promise.all([
    getJobs(),
    prisma.branch.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    })
  ]);

  return (
    <div className="space-y-12 text-black">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold font-heading">Recruitment Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 font-heading">Job Openings</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Post new professional clinical positions, associate them with physical boutique showrooms, set temporal expiry schedules, or configure direct Google Form application routing links instantly.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Interactive Jobs Curation Grid */}
      <Reveal delay={0.2}>
        <JobList 
          initialJobs={jobs} 
          branches={branches}
        />
      </Reveal>
    </div>
  );
}
