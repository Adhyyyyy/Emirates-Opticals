import { Hero } from "@/components/sections/Hero";
import { CategoryNavigation } from "@/components/sections/CategoryNavigation";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { PromotionsShowcase } from "@/components/sections/PromotionsShowcase";
import { CinematicMission } from "@/components/sections/CinematicMission";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { BranchShowcase } from "@/components/sections/BranchShowcase";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";
import { HiringBanner } from "@/components/sections/HiringBanner";
import { SocialGallery } from "@/components/sections/SocialGallery";

import prisma from "@/lib/prisma";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";
import { getBanners, getOffers } from "@/actions/cms-marketing";
import { getJobs } from "@/actions/cms-careers";
import { getInstagramFeed } from "@/actions/cms-instagram";

export const revalidate = 3600; // Cache on edge for 1 hour, auto ISR

export default async function HomePage() {
  // ── 1. ASYNCHRONOUS DATA FEEDS ──
  const [banners, offers, jobs, instagramFeed] = await Promise.all([
    getBanners().catch(() => []),
    getOffers().catch(() => []),
    getJobs().catch(() => []),
    getInstagramFeed().catch(() => ({ posts: [] }))
  ]);

  const activeJobsCount = jobs.filter((j: any) => j.isActive).length;

  // ── 2. DYNAMIC CATALOGUE RESOLUTION ──
  let allProducts = [];
  try {
    const productsDb = await prisma.product.findMany({
      where: { deletedAt: null },
      include: { 
        brand: true, 
        category: true, 
        images: { orderBy: { order: "asc" } },
        inventory: { include: { branch: true } }
      },
    });

    allProducts = productsDb.map((p) => {
      const totalQty = p.inventory.reduce((acc, inv) => acc + inv.quantity, 0);
      const globalStatus = totalQty > 5 ? "In Stock" : totalQty > 0 ? "Low Stock" : "Out of Stock";

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand?.name || "Independent",
        category: (p.category?.name || "Optical Frames") as any,
        description: p.description || "",
        price: Number(p.price),
        images: p.images.map((img) => img.url),
        stockStatus: globalStatus as any,
        gender: (p.gender === "MALE" ? "Men" : p.gender === "FEMALE" ? "Women" : p.gender === "KIDS" ? "Kids" : "Unisex") as any,
        frameShape: p.frameShape || "Standard",
        frameMaterial: p.material || "Standard",
        lensType: p.lensType || "Standard",
        color: p.color || "Standard",
        collectionType: p.category?.name || "Standard",
        isFeatured: p.isFeatured || false,
        isNewArrival: p.isNewArrival || false,
        branches: [],
      };
    });
  } catch (error) {
    console.warn("Prisma failed on home page allProducts, falling back to static:", error);
    allProducts = STATIC_PRODUCTS;
  }

  // ── 3. CURATE NEW ARRIVALS ──
  const formattedNewArrivals = allProducts
    .filter((p: any) => p.isNewArrival)
    .slice(0, 6)
    .map((p: any) => ({
      id: p.id,
      brand: p.brand,
      name: p.name,
      price: p.price || 0,
      colorsCount: 3,
      primaryImage: p.images[0] || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      secondaryImage: p.images[1] || p.images[0] || "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
      isNew: p.isNewArrival,
    }));

  const newArrivalsList = formattedNewArrivals.length > 0
    ? formattedNewArrivals
    : allProducts.slice(0, 4).map((p: any) => ({
        id: p.id,
        brand: p.brand,
        name: p.name,
        price: p.price || 0,
        colorsCount: 3,
        primaryImage: p.images[0] || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        secondaryImage: p.images[1] || p.images[0] || "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
        isNew: true,
      }));

  return (
    <div className="flex flex-col w-full">

      {/* 1. HERO — Cinematic, with dynamic visual slides & active offer marquee */}
      <Hero banners={banners} offers={offers} />

      {/* 2. CURATED DISCOVERY — Three luxury lifestyle visual tiles */}
      <CategoryNavigation />

      {/* 3. FEATURED COLLECTIONS — Sleek horizontal editorial blocks */}
      <FeaturedCollections />

      {/* 4. SHOP BY BRAND — Interactive and animated luxury brand grid */}
      <BrandShowcase />

      {/* 5. NEW ARRIVALS — Original horizontal carousel showcasing new designer models */}
      <NewArrivals products={newArrivalsList} />

      {/* 6. INTEGRATED SHOWCASE — Search bar, brand selectors, category tabs & smart WhatsApp branch coordinators */}
      <ProductShowcase initialProducts={allProducts} />

      {/* 7. EXCLUSIVE PROMOTIONS — Dynamic promotions touch carousel */}
      <PromotionsShowcase />

      {/* 8. CINEMATIC MISSION — Luxury vision manifesto and animated stats */}
      <CinematicMission />

      {/* 9. PATRON TESTIMONIALS — Customer visual cards */}
      <Testimonials />

      {/* 10. SERVICE EXPERIENCES — Clinic Eye testing, lens consults, after-care */}
      <ServiceShowcase />

      {/* 11. BOUTIQUE ATELIERS — Interactive Kerala map, coordinates & Google Maps walking directions */}
      <BranchShowcase />

      {/* 12. RECRUITMENT BANNER — Dynamic open positions listing */}
      <HiringBanner jobsCount={activeJobsCount} />

      {/* 13. HELP CHOOSING — Global contact lead banner */}
      <HelpChoosingCTA />

      {/* 14. INSTAGRAM FEED — Real sync dynamic grid posts */}
      <SocialGallery initialPosts={instagramFeed?.posts || []} />

    </div>
  );
}
