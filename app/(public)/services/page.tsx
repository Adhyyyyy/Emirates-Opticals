import React from "react";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesIntro } from "@/components/sections/services/ServicesIntro";
import { ServiceEyeTesting } from "@/components/sections/services/ServiceEyeTesting";
import { ServiceLensSolutions } from "@/components/sections/services/ServiceLensSolutions";
import { ServiceStyling } from "@/components/sections/services/ServiceStyling";
import { ServiceSunglasses } from "@/components/sections/services/ServiceSunglasses";
import { ServiceSupport } from "@/components/sections/services/ServiceSupport";
import { ServiceFinalCTA } from "@/components/sections/services/ServiceFinalCTA";

export const metadata = {
  title: "Professional Optical Services | Eye Care - Emirates Optician",
  description: "Experience expert eye care, advanced lens technology, luxury sunglasses, and personalized styling consultation at Emirates Optician.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <ServicesHero />
      <ServicesIntro />
      <ServiceEyeTesting />
      <ServiceLensSolutions />
      <ServiceStyling />
      <ServiceSunglasses />
      <ServiceSupport />
      <ServiceFinalCTA />
    </div>
  );
}
