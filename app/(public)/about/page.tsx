import React from "react";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutPhilosophy } from "@/components/sections/about/AboutPhilosophy";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutExpertTeam } from "@/components/sections/about/AboutExpertTeam";
import { AboutFinalCTA } from "@/components/sections/about/AboutFinalCTA";

export const metadata = {
  title: "About Us | Emirates Optician - Kerala's Trusted Luxury Eyewear",
  description: "Learn about the journey, values, and expert eye care philosophy of Emirates Optician, Kerala's premier destination for authentic luxury eyewear.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <AboutValues />
      <AboutExpertTeam />
      <AboutFinalCTA />
    </div>
  );
}
