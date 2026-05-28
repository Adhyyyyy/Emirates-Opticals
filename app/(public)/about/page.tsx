import React from "react";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutWhyChoose } from "@/components/sections/about/AboutWhyChoose";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

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
      <HelpChoosingCTA />
    </div>
  );
}
