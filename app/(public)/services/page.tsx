import React from "react";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServiceEyeTesting } from "@/components/sections/services/ServiceEyeTesting";
import { ServiceLensSolutions } from "@/components/sections/services/ServiceLensSolutions";
import { ServiceStyling } from "@/components/sections/services/ServiceStyling";
import { ServiceSunglasses } from "@/components/sections/services/ServiceSunglasses";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

export const metadata = {
  title: "Professional Optical Services | Eye Care - Emirates Optician",
  description: "Experience expert eye care, advanced lens technology, luxury sunglasses, and personalized styling consultation at Emirates Optician.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <ServicesHero />
      <ServiceEyeTesting />
      <ServiceLensSolutions />
      <ServiceStyling />
      <ServiceSunglasses />
      <HelpChoosingCTA />
    </div>
  );
}
