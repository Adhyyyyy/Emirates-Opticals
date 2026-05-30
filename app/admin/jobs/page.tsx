import React from "react";
import { getJobs } from "@/actions/cms-careers";
import prisma from "@/lib/prisma";
import { JobList } from "@/components/sections/admin/JobList";
import { Reveal } from "@/components/motion/Reveal";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsAdminPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: { user } } = await supabase.auth.getUser();
  
  let currentAdminBranchId: string | null = null;
  let isBranchAdmin = false;
  let branchName = "";

  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { branch: true }
    });
    
    isBranchAdmin = dbUser?.role === "BRANCH_ADMIN" || dbUser?.role === "STAFF";
    currentAdminBranchId = isBranchAdmin ? (dbUser?.branchId || null) : null;
    branchName = isBranchAdmin ? (dbUser?.branch?.name || "") : "";
  }

  // Concurrent loading of active job opportunities and physical branches
  const [allJobs, branches] = await Promise.all([
    getJobs(),
    prisma.branch.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    })
  ]);

  // Scope jobs based on role constraints
  const jobs = isBranchAdmin && currentAdminBranchId
    ? allJobs.filter((j: any) => j.branchId === "Global" || j.branchId === currentAdminBranchId)
    : allJobs;

  return (
    <div className="space-y-12 text-black">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold font-heading">
                {isBranchAdmin ? "Boutique Careers Console" : "Recruitment Command Hub"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 font-heading">Job Openings</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              {isBranchAdmin 
                ? `Publish and manage targeted professional postings specifically for the ${branchName} showroom.`
                : "Post new professional clinical positions, associate them with physical boutique showrooms, set temporal expiry schedules, or configure direct Google Form application routing links instantly."
              }
            </p>
          </Reveal>
        </div>

        {isBranchAdmin && (
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3 bg-brand-gold/5 px-6 py-4 rounded-2xl border border-brand-gold/10">
              <ShieldAlert className="w-4 h-4 text-brand-gold shrink-0 animate-pulse" />
              <span className="text-[9.5px] font-bold uppercase tracking-widest text-brand-gold">
                Scoped Showroom Recruitment Active
              </span>
            </div>
          </Reveal>
        )}
      </header>

      {/* Interactive Jobs Curation Grid */}
      <Reveal delay={0.2}>
        <JobList 
          initialJobs={jobs} 
          branches={branches}
          currentAdminBranchId={currentAdminBranchId}
        />
      </Reveal>
    </div>
  );
}

