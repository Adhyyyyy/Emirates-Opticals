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


import prisma from "@/lib/prisma";
import { getBanners, getOffers } from "@/actions/cms-marketing";
import { getJobs } from "@/actions/cms-careers";
import { getInstagramFeed } from "@/actions/cms-instagram";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable static caching to allow real-time offer and banner synchronization

export default async function HomePage() {
  // ── 1. ASYNCHRONOUS DATA FEEDS ──
  const [banners, offers, jobs, instagramFeed, dbLatestProducts] = await Promise.all([
    getBanners().catch(() => []),
    getOffers().catch(() => []),
    getJobs().catch(() => []),
    getInstagramFeed().catch(() => ({ posts: [] })),
    prisma.product.findMany({
      where: { isActive: true },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { order: "asc" } }
      },
      orderBy: { createdAt: "desc" },
      take: 8
    }).catch(() => [])
  ]);

  const latestProducts = dbLatestProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    brandName: p.brand?.name || "Luxury Brand",
    categoryName: p.category?.name || "Eyewear",
    image: p.images[0]?.url || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    color: p.color || undefined,
    gender: p.gender || undefined,
    isNewArrival: p.isNewArrival
  }));

  const activeJobsCount = jobs.filter((j: any) => j.isActive).length;



  return (
    <div className="flex flex-col w-full">
      {/* Visually Hidden Semantic Heading for Search Engines */}
      <h1 className="sr-only">Emirates Optician | Authorized Luxury Eyewear Showrooms & Certified Eye Testing in Kerala</h1>

      {/* ── Structured Data: Organization + LocalBusiness + FAQPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://emiratesoptician.in",
            "name": "Emirates Optician",
            "description": "Luxury optical boutique offering authentic international eyewear brands, professional eye testing, and expert frame styling across 9 showrooms in Kerala, India.",
            "url": "https://emiratesoptician.in",
            "logo": "https://emiratesoptician.in/assets/emirates_logo.png",
            "image": "https://emiratesoptician.in/og-image.jpg",
            "telephone": "+91-9988674574",
            "email": "emiratesofficial1969@gmail.com",
            "priceRange": "$$$$",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, Credit Card, UPI",
            "areaServed": [
              "Changanassery",
              "Thiruvalla",
              "Kumbanad",
              "Kothamangalam",
              "Pandalam",
              "Kottayam",
              "Ettumanur",
              "Angamaly",
              "Irumpanam",
              "Kochi",
              "Ernakulam",
              "Kerala"
            ],
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
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Where can I get a professional computerized eye test in Kerala?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can get a comprehensive computerized eye test at any Emirates Optician showroom across Kerala, including Changanassery, Thiruvalla, Kumbanad, Kothamangalam, Pandalam, Kottayam, Ettumanur, Angamaly, and Irumpanam (Kochi/Ernakulam). All clinics are equipped with state-of-the-art diagnostic equipment operated by qualified optometrists."
                }
              },
              {
                "@type": "Question",
                "name": "Which luxury glasses and sunglasses brands does Emirates Optician sell?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Emirates Optician offers a certified portfolio of 100% authentic international eyewear brands including Cartier, Prada, Gucci, Ray-Ban, Oakley, Porsche Design, and more. Each frame comes with original brand certificates and official warranties."
                }
              },
              {
                "@type": "Question",
                "name": "How can I book an eye test appointment online for Kochi, Kottayam, or other branches?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can easily schedule a computerized eye test or luxury frame styling consultation online by visiting the 'Book Eye Test' page on our website or calling your nearest showroom branch directly."
                }
              }
            ]
          }
        ])}}
      />

      {/* 1. HERO — Cinematic, with dynamic visual slides & active offer marquee */}
      <Hero banners={banners} offers={offers} />

      {/* 2. LATEST SHOWROOM ARRIVALS CAROUSEL */}
      <NewArrivals products={latestProducts} />

      {/* 3. THE FEATURED COLLECTIONS */}
      <FeaturedCollections />

      {/* 6. THE OFFERS */}
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
