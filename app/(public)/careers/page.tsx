import React from "react";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersOpenPositions } from "@/components/sections/careers/CareersOpenPositions";
import { CareersWhyJoin } from "@/components/sections/careers/CareersWhyJoin";
import { CareersCTA } from "@/components/sections/careers/CareersCTA";
import { getJobs } from "@/actions/cms-careers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Careers | Join Kerala's Premium Optical Brand - Emirates Optician",
  description: "Explore rewarding career opportunities at Emirates Optician. Join a team dedicated to luxury eyewear, professional eye care, and exceptional retail experiences across Kerala.",
};

const STATIC_BRANCHES = [
  { id: "changanassery", name: "Changanassery" },
  { id: "thiruvalla", name: "Thiruvalla" },
  { id: "kumbanad", name: "Kumbanad" },
  { id: "kothamangalam", name: "Kothamangalam" },
  { id: "pandalam", name: "Pandalam" },
  { id: "kakkanad", name: "Kakkanad" },
  { id: "kottayam", name: "Kottayam" },
  { id: "ettumanur", name: "Ettumanur" },
  { id: "angamaly", name: "Angamaly" },
  { id: "irumpanam", name: "Irumpanam" },
];

export default async function CareersPage() {
  const positions = await getJobs();

  return (
    <div className="flex flex-col w-full text-black">
      <CareersHero />
      <CareersOpenPositions positions={positions} branches={STATIC_BRANCHES} />
      <CareersWhyJoin />
      <CareersCTA />
    </div>
  );
}
