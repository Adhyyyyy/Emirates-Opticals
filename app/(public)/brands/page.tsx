import React from "react";
import { BrandsHero } from "@/components/sections/brands/BrandsHero";
import { FullBrandGrid } from "@/components/sections/brands/FullBrandGrid";
import { BrandAuthenticity } from "@/components/sections/brands/BrandAuthenticity";

export const metadata = {
  title: "Global Luxury Brands | Authentic Eyewear - Emirates Optician",
  description: "Discover a curated collection of authentic luxury eyewear brands at Emirates Optician, featuring Prada, Cartier, Gucci, Ray-Ban, and more.",
};

export default function BrandsPage() {
  return (
    <div className="flex flex-col w-full">
      <BrandsHero />
      <FullBrandGrid />
      <BrandAuthenticity />
    </div>
  );
}
