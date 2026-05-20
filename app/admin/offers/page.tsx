import React from "react";
import { getOffers } from "@/actions/cms-marketing";
import { OfferList } from "@/components/sections/admin/OfferList";
import { Reveal } from "@/components/motion/Reveal";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Tag, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OffersAdminPage() {
  // 1. Resolve auth session
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
    currentAdminBranchId = dbUser?.branchId || null;
    branchName = dbUser?.branch?.name || "";
  }

  // 2. Fetch all physical showrooms
  const branches = await prisma.branch.findMany({
    where: { deletedAt: null },
    select: { id: true, name: true }
  });

  // 3. Load all promotional campaign records from date-bound registry
  const allOffers = await getOffers();
  
  // 4. Scopes data based on role constraints
  const offers = isBranchAdmin && currentAdminBranchId
    ? allOffers.filter((o: any) => o.branchId === "Global" || o.branchId === currentAdminBranchId)
    : allOffers;

  return (
    <div className="space-y-12 pb-12 text-black">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <Tag className="w-4 h-4 text-brand-gold animate-bounce" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                {isBranchAdmin ? "Boutique Promotions Console" : "Campaign Command Control"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 leading-none font-heading">
              Promotional Campaigns
            </h1>
            <p className="text-sm text-brand-charcoal/40 font-light max-w-xl leading-relaxed">
              {isBranchAdmin 
                ? `Deploy targeted campaigns, voucher discount codes, and online visual banners specifically for the ${branchName} showroom.`
                : "Configure global network vouchers, boutique-targeted campaigns, date schedules, and aesthetic storefront discount sliders."
              }
            </p>
          </Reveal>
        </div>

        {isBranchAdmin && (
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3 bg-brand-gold/5 px-6 py-4 rounded-2xl border border-brand-gold/10">
              <ShieldAlert className="w-4 h-4 text-brand-gold shrink-0 animate-pulse" />
              <span className="text-[9.5px] font-bold uppercase tracking-widest text-brand-gold">
                Scoped Showroom Privileges Enabled
              </span>
            </div>
          </Reveal>
        )}
      </header>

      {/* Interactive Offers Cockpit Grid */}
      <Reveal delay={0.2}>
        <OfferList 
          initialOffers={offers} 
          branches={branches}
          currentAdminBranchId={currentAdminBranchId}
        />
      </Reveal>
    </div>
  );
}
