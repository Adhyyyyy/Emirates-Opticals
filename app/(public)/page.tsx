import { Hero } from "@/components/sections/Hero";
import { CategoryNavigation } from "@/components/sections/CategoryNavigation";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { TrustSection } from "@/components/sections/TrustSection";
import { BestSellers } from "@/components/sections/BestSellers";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { EditorialServices } from "@/components/sections/EditorialServices";
import { BranchShowcase } from "@/components/sections/BranchShowcase";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { HiringBanner } from "@/components/sections/HiringBanner";
import { SocialGallery } from "@/components/sections/SocialGallery";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryNavigation />
      <FeaturedCollections />
      <NewArrivals />
      <TrustSection />
      <BestSellers />
      <BrandShowcase />
      <EditorialServices />
      <BranchShowcase />
      <ServiceShowcase />
      <Testimonials />
      <HiringBanner />
      <SocialGallery />
      
      {/* Subsequent sections will follow here */}
    </div>
  );
}
