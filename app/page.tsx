import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCollections />
      
      {/* Subsequent sections will follow here */}
    </div>
  );
}
