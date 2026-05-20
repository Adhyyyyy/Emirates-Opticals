import React from "react";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersCulture } from "@/components/sections/careers/CareersCulture";
import { CareersWhyJoin } from "@/components/sections/careers/CareersWhyJoin";
import { CareersOpenPositions } from "@/components/sections/careers/CareersOpenPositions";
import { CareersProcess } from "@/components/sections/careers/CareersProcess";
import { CareersFinalCTA } from "@/components/sections/careers/CareersFinalCTA";
import { getJobs } from "@/actions/cms-careers";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Careers | Join Kerala's Premium Optical Brand - Emirates Optician",
  description: "Explore rewarding career opportunities at Emirates Optician. Join a team dedicated to luxury eyewear, professional eye care, and exceptional retail experiences across Kerala.",
};

export default async function CareersPage() {
  const [positions, branches] = await Promise.all([
    getJobs(),
    prisma.branch.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    })
  ]);

  return (
    <div className="flex flex-col w-full text-black">
      <CareersHero />
      <CareersCulture />
      <CareersWhyJoin />
      <CareersOpenPositions positions={positions} branches={branches} />
      <CareersProcess />
      <CareersFinalCTA />
    </div>
  );
}
