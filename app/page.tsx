import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { TrustSection } from "@/components/sections/TrustSection";
import { BrandShowcase } from "@/components/sections/BrandShowcase";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <TrustSection />
      <BrandShowcase />
      
      {/* Subsequent sections will follow here */}
    </div>
  );
}
