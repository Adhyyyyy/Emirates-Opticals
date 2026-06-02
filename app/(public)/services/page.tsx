import React from "react";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServiceEyeTesting } from "@/components/sections/services/ServiceEyeTesting";
import { ServiceLensSolutions } from "@/components/sections/services/ServiceLensSolutions";
import { ServiceStyling } from "@/components/sections/services/ServiceStyling";
import { ServiceSunglasses } from "@/components/sections/services/ServiceSunglasses";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

export const metadata = {
  title: "Computerized Eye Testing & Prescription Glasses Services | Emirates Optician",
  description: "Experience state-of-the-art computerized eye testing, personalized luxury frame styling, and advanced prescription lens solutions at Emirates Optician showrooms across Kerala.",
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
