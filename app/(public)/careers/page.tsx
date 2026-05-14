import React from "react";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersCulture } from "@/components/sections/careers/CareersCulture";
import { CareersWhyJoin } from "@/components/sections/careers/CareersWhyJoin";
import { CareersOpenPositions } from "@/components/sections/careers/CareersOpenPositions";
import { CareersProcess } from "@/components/sections/careers/CareersProcess";
import { CareersFinalCTA } from "@/components/sections/careers/CareersFinalCTA";

export const metadata = {
  title: "Careers | Join Kerala's Premium Optical Brand - Emirates Optician",
  description: "Explore rewarding career opportunities at Emirates Optician. Join a team dedicated to luxury eyewear, professional eye care, and exceptional retail experiences across Kerala.",
};

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full">
      <CareersHero />
      <CareersCulture />
      <CareersWhyJoin />
      <CareersOpenPositions />
      <CareersProcess />
      <CareersFinalCTA />
    </div>
  );
}
