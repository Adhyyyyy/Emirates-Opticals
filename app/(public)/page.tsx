import { Hero } from "@/components/sections/Hero";
import { CategoryNavigation } from "@/components/sections/CategoryNavigation";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { BestSellers } from "@/components/sections/BestSellers";
import { EyewearShowcase } from "@/components/sections/EyewearShowcase";
import { EditorialServices } from "@/components/sections/EditorialServices";

import { PromotionsShowcase } from "@/components/sections/PromotionsShowcase";
import { CinematicMission } from "@/components/sections/CinematicMission";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { BranchShowcase } from "@/components/sections/BranchShowcase";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";
import { HiringBanner } from "@/components/sections/HiringBanner";
import { SocialGallery } from "@/components/sections/SocialGallery";


import { getBanners, getOffers } from "@/actions/cms-marketing";
import { getJobs } from "@/actions/cms-careers";
import { getInstagramFeed } from "@/actions/cms-instagram";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable static caching to allow real-time offer and banner synchronization

export default async function HomePage() {
  // â”€â”€ 1. ASYNCHRONOUS DATA FEEDS â”€â”€
  const [banners, offers, jobs, instagramFeed] = await Promise.all([
    getBanners().catch(() => []),
    getOffers().catch(() => []),
    getJobs().catch(() => []),
    getInstagramFeed().catch(() => ({ posts: [] }))
  ]);

  const activeJobsCount = jobs.filter((j: any) => j.isActive).length;



  return (
    <div className="flex flex-col w-full">

      {/* ── Structured Data: Organization + LocalBusiness ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://emiratesoptician.in",
          "name": "Emirates Optician",
          "description": "Luxury optical boutique offering authentic international eyewear brands, professional eye testing, and expert frame styling across 9 showrooms in Kerala, India.",
          "url": "https://emiratesoptician.in",
          "logo": "https://emiratesoptician.in/assets/emirates_logo.png",
          "image": "https://emiratesoptician.in/og-image.jpg",
          "telephone": "+91-9988674574",
          "email": "info@emiratesoptician.in",
          "priceRange": "$$$$",
          "currenciesAccepted": "INR",
          "paymentAccepted": "Cash, Credit Card, UPI",
          "areaServed": "Kerala, India",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.instagram.com/emiratesoptician"
          ],
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              "opens": "09:00",
              "closes": "20:00"
            }
          ]
        })}}
      />

      {/* 1. HERO â€” Cinematic, with dynamic visual slides & active offer marquee */}
      <Hero banners={banners} offers={offers} />

      {/* 2. THE PRODUCTS â€” Sleek horizontal editorial blocks */}
      <FeaturedCollections />
      {/* 6. THE OFFERS â€” Dynamic promotions touch carousel */}
      <PromotionsShowcase />

      {/* 3. THE PARTNERS â€” Interactive and animated luxury brand grid */}
      <BrandShowcase />

      {/* 8. THE EXPERTISE â€” Premium Editorial Luxury Services */}
      <EditorialServices />

       {/* 12. THE PUSH â€” Global contact lead banner */}
      <HelpChoosingCTA />

       {/* 7. THE EXPERIENCE â€” Clinic Eye testing, lens consults, after-care */}
      <ServiceShowcase />

       {/* 5. THE VISION â€” Luxury manifesto and animated stats */}
      <CinematicMission />

       {/* 13. THE FOOTNOTE â€” Dynamic open positions listing */}
      <HiringBanner jobsCount={activeJobsCount} />

     
     

      

     

      

      {/* 9. THE PROOF â€” Customer visual cards */}
      <Testimonials />
     

      {/* 10. THE LOCATIONS â€” Interactive Kerala map, coordinates */}
      <BranchShowcase />

      {/* 11. THE LIFESTYLE â€” Real sync dynamic grid posts */}
      <SocialGallery initialPosts={instagramFeed?.posts || []} />

     

      

    </div>
  );
}
