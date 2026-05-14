import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Product, BranchStock } from "@/types/shop";
import { getWhatsAppUrl } from "@/lib/shop/whatsapp";

// Components
import { ProductHeroGallery } from "@/components/sections/product/ProductHeroGallery";
import { ProductBranchStock } from "@/components/sections/product/ProductBranchStock";
import { ProductSpecs } from "@/components/sections/product/ProductSpecs";
import { ProductLensSolutions } from "@/components/sections/product/ProductLensSolutions";
import { ProductSizeGuide } from "@/components/sections/product/ProductSizeGuide";
import { ProductConsultation } from "@/components/sections/product/ProductConsultation";
import { ProductRelated } from "@/components/sections/product/ProductRelated";
import { ProductAuthenticity } from "@/components/sections/product/ProductAuthenticity";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;

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

  if (!dbProduct) return notFound();

  // Map inventory to BranchStock
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
    price: dbProduct.price,
    images: dbProduct.images.map(img => img.url),
    stockStatus: globalStatus,
    branches,
    gender: dbProduct.gender === "MALE" ? "Men" : dbProduct.gender === "FEMALE" ? "Women" : dbProduct.gender === "KIDS" ? "Kids" : "Unisex",
    frameShape: dbProduct.frameShape || "Standard",
    frameMaterial: dbProduct.material || "Standard",
    lensType: dbProduct.lensType || "Standard",
    color: dbProduct.color || "Standard",
    collectionType: dbProduct.category?.name || "Standard",
    isFeatured: dbProduct.isFeatured,
    isNewArrival: dbProduct.isNewArrival
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Cinematic Hero Gallery */}
      <ProductHeroGallery product={product} />

      {/* 2. Product Specifications */}
      <ProductSpecs product={product} />

      {/* 4. Branch Availability & Stock */}
      <ProductBranchStock product={product} />

      {/* 5. Lens Solutions Technology */}
      <ProductLensSolutions />

      {/* 6. Perfect Fit Size Guide */}
      <ProductSizeGuide />

      {/* 7. Expert Consultation & Conversion */}
      <ProductConsultation />

      {/* 8. Authenticity & Trust Pillars */}
      <ProductAuthenticity />

      {/* 9. Related Collections */}
      <ProductRelated />
    </div>
  );
}
