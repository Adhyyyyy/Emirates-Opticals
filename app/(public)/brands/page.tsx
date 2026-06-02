import React from "react";
import { BrandsHero } from "@/components/sections/brands/BrandsHero";
import { FullBrandGrid } from "@/components/sections/brands/FullBrandGrid";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

export const metadata = {
  title: "Luxury Sunglasses & Designer Glasses Brands | Emirates Optician",
  description: "Browse 100% authentic luxury designer sunglasses and premium spectacles frames from brands like Cartier, Prada, Gucci, and Ray-Ban at our premium Kerala showrooms.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <div className="flex flex-col w-full">
      <BrandsHero />
      <FullBrandGrid />
      <HelpChoosingCTA />
    </div>
  );
}
