import React from "react";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutWhyChoose } from "@/components/sections/about/AboutWhyChoose";
import { AboutFinalCTA } from "@/components/sections/about/AboutFinalCTA";

export const metadata = {
  title: "About Us | Emirates Optician",
  description: "Kerala's trusted destination for authentic branded eyewear, professional eye care, and expert styling.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <AboutStory />
      <AboutWhyChoose />
      <AboutFinalCTA />
    </div>
  );
}
