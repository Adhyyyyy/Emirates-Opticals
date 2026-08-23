import React, { cache } from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Product, BranchStock } from "@/types/shop";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";

// Components
import { ProductHeroGallery } from "@/components/sections/product/ProductHeroGallery";

export const revalidate = 300; // Re-fetch at most every 5 minutes (product specs rarely change per-minute)

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

// React cache ensures generateMetadata and ProductDetailsPage reuse a single query per request
const getProductBySlugOrId = cache(async (id: string) => {
  try {
    const dbProduct = await prisma.product.findFirst({
      where: { 
        OR: [
          { id: id },
          { slug: id }
        ]
      },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { order: "asc" } },
        inventory: { include: { branch: true } }
      }
    });

    if (dbProduct) {
      const branches: BranchStock[] = dbProduct.inventory.map(inv => ({
        branchName: inv.branch.name,
        branchSlug: inv.branch.slug,
        whatsapp: inv.branch.whatsapp,
        stockStatus: inv.status === "IN_STOCK" ? "In Stock" : inv.status === "LOW_STOCK" ? "Low Stock" : "Out of Stock"
      }));

      const totalQty = dbProduct.inventory.reduce((acc, inv) => acc + inv.quantity, 0);
      const globalStatus = totalQty > 5 ? "In Stock" : totalQty > 0 ? "Low Stock" : "Out of Stock";

      const product: Product = {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        brand: dbProduct.brand?.name || "Independent",
        category: (dbProduct.category?.name || "Optical Frames") as Product["category"],
        description: dbProduct.description || "",
        price: dbProduct.price || 0,
        images: dbProduct.images.map(img => img.url),
        stockStatus: globalStatus,
        branches,
        gender: dbProduct.gender === "MALE" ? "Men" : dbProduct.gender === "FEMALE" ? "Women" : dbProduct.gender === "KIDS" ? "Kids" : "Unisex",
        frameShape: dbProduct.frameShape || "Standard",
        frameMaterial: dbProduct.material || "Standard",
        lensType: dbProduct.lensType || "Standard",
        color: dbProduct.color || "Standard",
        colors: dbProduct.colors || (dbProduct.color ? [dbProduct.color] : []),
        style: dbProduct.style || "Classic",
        collectionType: dbProduct.collectionType || "Designer Brands",
        isInHouseProduct: dbProduct.isInHouseProduct || false,
        signatureCollectionName: dbProduct.signatureCollectionName || undefined,
        craftsmanshipDetails: dbProduct.craftsmanshipDetails || undefined,
        recommendedUsage: dbProduct.recommendedUsage || undefined,
        frameWeightCategory: dbProduct.frameWeightCategory || undefined,
        isFeatured: dbProduct.isFeatured,
        isNewArrival: dbProduct.isNewArrival
      };
      return product;
    }
  } catch (error) {
    console.warn("Prisma failed to fetch product details, checking static array:", error);
  }

  const staticProd = STATIC_PRODUCTS.find(p => p.id === id || p.slug === id);
  return staticProd || null;
});

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProductBySlugOrId(id);

  if (!product) return { title: "Product Details | Emirates Optician" };

  return {
    title: `${product.brand} ${product.name} | Luxury ${product.category} - Emirates Optician`,
    description: `Explore authentic ${product.brand} ${product.name} ${product.category.toLowerCase()}. Enquire now and contact your nearest Emirates Optician branch for professional eye testing and custom fitting.`,
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProductBySlugOrId(id);

  if (!product) return notFound();

  return (
    <div className="flex flex-col w-full bg-white">
      <ProductHeroGallery product={product} />
    </div>
  );
}
