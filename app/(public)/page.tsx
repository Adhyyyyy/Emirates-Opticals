import { Hero } from "@/components/sections/Hero";

import { CategoryNavigation } from "@/components/sections/CategoryNavigation";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { PromotionsShowcase } from "@/components/sections/PromotionsShowcase";
import { CinematicMission } from "@/components/sections/CinematicMission";
import { Testimonials } from "@/components/sections/Testimonials";
import { BranchShowcase } from "@/components/sections/BranchShowcase";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { SocialGallery } from "@/components/sections/SocialGallery";
import prisma from "@/lib/prisma";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";

export const revalidate = 3600; // Cache on edge for 1 hour, auto ISR

export default async function HomePage() {
  let formattedNewArrivals = [];

  try {
    const newArrivalsDb = await prisma.product.findMany({
      where: { isNewArrival: true, deletedAt: null },
      include: { brand: true, images: { orderBy: { order: "asc" } } },
      take: 4,
    });

    formattedNewArrivals = newArrivalsDb.map((p) => ({
      id: p.id,
      brand: p.brand.name,
      name: p.name,
      price: p.price,
      colorsCount: 3,
      primaryImage: p.images[0]?.url || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      secondaryImage: p.images[1]?.url || p.images[0]?.url || "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
      isNew: p.isNewArrival,
    }));
  } catch (error) {
    console.warn("Prisma failed on home new arrivals, falling back to static:", error);
    formattedNewArrivals = STATIC_PRODUCTS.slice(0, 4).map((p) => ({
      id: p.id,
      brand: p.brand,
      name: p.name,
      price: p.price,
      colorsCount: 3,
      primaryImage: p.images[0],
      secondaryImage: p.images[0],
      isNew: p.isNewArrival,
    }));
  }

  return (
    <div className="flex flex-col w-full">

      {/* 1. HERO — Full viewport, cinematic */}
      <Hero />


      {/* 3. CURATED DISCOVERY — 3 editorial lifestyle tiles */}
      <CategoryNavigation />

      {/* 4. FEATURED COLLECTIONS — Large editorial imagery, dark */}
      <FeaturedCollections />

      {/* 5. SHOP BY BRAND — Most interactive & animated section */}
      <BrandShowcase />

      {/* 6. NEW ARRIVALS — 4-card grid, H-scroll mobile */}
      <NewArrivals products={formattedNewArrivals} />

      {/* 6. EXCLUSIVE PROMOTIONS — 3 promo cards, dark */}
      <PromotionsShowcase />

      {/* 7. CINEMATIC MISSION — Manifesto + animated stat counters, dark */}
      <CinematicMission />

      {/* 8. PATRON TESTIMONIALS — Social proof, trust signal */}
      <Testimonials />


      {/* 10. OUR ATELIERS — Interactive branch map & details */}
      <BranchShowcase />

      {/* 10. NEED HELP CHOOSING — CTA banner */}
      <HelpChoosingCTA />

      {/* 11. INSTAGRAM GALLERY — Social feed mosaic (placed just above footer) */}
      <SocialGallery />


    </div>
  );
}
