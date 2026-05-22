import React from "react";
import { ShopFilters } from "@/components/sections/shop/ShopFilters";
import { ProductGrid } from "@/components/sections/shop/ProductGrid";
import { ShopFinalCTA } from "@/components/sections/shop/ShopFinalCTA";
import prisma from "@/lib/prisma";
import { Product, BranchStock } from "@/types/shop";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";

export const revalidate = 3600; // Cache on edge for 1 hour, auto ISR

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
      // Map inventory to BranchStock
      const branches: BranchStock[] = p.inventory.map(inv => ({
        branchName: inv.branch.name,
        branchSlug: inv.branch.slug,
        whatsapp: inv.branch.whatsapp,
        stockStatus: inv.status === "IN_STOCK" ? "In Stock" : inv.status === "LOW_STOCK" ? "Low Stock" : "Out of Stock"
      }));

      // Determine global stock status
      const totalQty = p.inventory.reduce((acc, inv) => acc + inv.quantity, 0);
      const globalStatus = totalQty > 5 ? "In Stock" : totalQty > 0 ? "Low Stock" : "Out of Stock";

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand?.name || "Independent",
        category: (p.category?.name || "Optical Frames") as Product["category"],
        description: p.description || "",
        price: p.price,
        images: p.images.map(img => img.url),
        stockStatus: globalStatus,
        branches,
        gender: p.gender === "MALE" ? "Men" : p.gender === "FEMALE" ? "Women" : p.gender === "KIDS" ? "Kids" : "Unisex",
        frameShape: p.frameShape || "Standard",
        frameMaterial: p.material || "Standard",
        lensType: p.lensType || "Standard",
        color: p.color || "Standard",
        collectionType: p.category?.name || "Standard",
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival
      };
    });
  } catch (error) {
    console.warn("Prisma failed to fetch products in ShopPage, falling back to static products:", error);
    products = STATIC_PRODUCTS;
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="bg-white pt-36 pb-20" id="shop-main">
        <div className="container-tight">
          <div className="flex flex-col lg:flex-row gap-12">
            <ShopFilters />
            <ProductGrid products={products} />
          </div>
        </div>
      </main>

      <ShopFinalCTA />
    </div>
  );
}
