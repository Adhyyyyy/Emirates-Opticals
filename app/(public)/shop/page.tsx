import React, { Suspense } from "react";
import { ShopFilters } from "@/components/sections/shop/ShopFilters";
import { ProductGrid } from "@/components/sections/shop/ProductGrid";
import { ShopFinalCTA } from "@/components/sections/shop/ShopFinalCTA";
import prisma from "@/lib/prisma";
import { Product, BranchStock } from "@/types/shop";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";

export const revalidate = 3600;

export const metadata = {
  title: "Shop Luxury Eyewear | Authentic Collections - Emirates Optician",
  description: "Explore authentic luxury eyewear, premium sunglasses, and optical solutions. Enquire now and contact your nearest Emirates Optician branch.",
};

export default async function ShopPage() {
  let products: Product[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { order: "asc" } },
        inventory: { include: { branch: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    products = dbProducts.map(p => {
      const branches: BranchStock[] = p.inventory.map(inv => ({
        branchName: inv.branch.name,
        branchSlug: inv.branch.slug,
        whatsapp: inv.branch.whatsapp,
        stockStatus: inv.status === "IN_STOCK" ? "In Stock" : inv.status === "LOW_STOCK" ? "Low Stock" : "Out of Stock"
      }));

      const totalQty = p.inventory.reduce((acc, inv) => acc + inv.quantity, 0);
      const globalStatus = totalQty > 5 ? "In Stock" : totalQty > 0 ? "Low Stock" : "Out of Stock";

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand?.name || "Independent",
        category: (p.category?.name || "Optical Frames") as Product["category"],
        description: p.description || "",
        price: p.price || 0,
        images: p.images.map(img => img.url),
        stockStatus: globalStatus,
        branches,
        gender: p.gender === "MALE" ? "Men" : p.gender === "FEMALE" ? "Women" : p.gender === "KIDS" ? "Kids" : "Unisex",
        frameShape: p.frameShape || "Standard",
        frameMaterial: p.material || "Standard",
        lensType: p.lensType || "Standard",
        color: p.color || "Standard",
        style: p.style || "Classic",
        collectionType: p.collectionType || "Designer Brands",
        isInHouseProduct: p.isInHouseProduct || false,
        signatureCollectionName: p.signatureCollectionName || undefined,
        craftsmanshipDetails: p.craftsmanshipDetails || undefined,
        recommendedUsage: p.recommendedUsage || undefined,
        frameWeightCategory: p.frameWeightCategory || undefined,
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival
      };
    });
  } catch (error) {
    console.warn("Prisma failed, falling back to static products:", error);
    products = STATIC_PRODUCTS;
  }

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ── Catalog Body ── */}
      <main className="bg-white flex-1 pt-24 md:pt-32" id="shop-main">
        <div className="section-container py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

            {/* Filters Sidebar */}
            <Suspense fallback={
              <div className="w-full lg:w-64 shrink-0 animate-pulse bg-neutral-100 rounded-[3px] h-96" />
            }>
              <ShopFilters />
            </Suspense>

            {/* Product Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>

          </div>
        </div>
      </main>

      <ShopFinalCTA />
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/5">
        <div className="h-7 w-52 bg-neutral-100 animate-pulse rounded-full" />
        <div className="h-5 w-28 bg-neutral-100 animate-pulse rounded-full" />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full aspect-[3/4] bg-neutral-100 animate-pulse rounded-[3px]" />
            <div className="h-2.5 w-1/3 bg-neutral-100 animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-neutral-100 animate-pulse rounded" />
            <div className="h-2.5 w-1/4 bg-neutral-100 animate-pulse rounded" />
            <div className="h-10 w-full bg-neutral-100 animate-pulse rounded-[3px] mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
