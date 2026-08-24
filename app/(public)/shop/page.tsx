import React, { Suspense } from "react";
import { ShopFilters } from "@/components/sections/shop/ShopFilters";
import { ProductGrid } from "@/components/sections/shop/ProductGrid";
import prisma from "@/lib/prisma";
import { Product, BranchStock } from "@/types/shop";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop Luxury Eyewear | Authentic Collections - Emirates Optician",
  description: "Explore authentic luxury eyewear, premium sunglasses, and optical solutions. Enquire now and contact your nearest Emirates Optician branch.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  let products: Product[] = [];
  let dbColors: any[] = [];
  let dbBranches: any[] = [];

  try {
    // Fix 10: Await searchParams (Next.js 15 — searchParams is a Promise)
    const params = await searchParams;

    // ── Build server-side WHERE conditions from URL filter params ──
    // Each active filter becomes an AND entry; multi-value selections use nested OR.
    const andConditions: any[] = [{ isActive: true }];

    // Gender: case-insensitive multi-value enum matching
    if (params.gender) {
      const genders = params.gender.split(";").filter(Boolean);
      const genderConditions: any[] = [];
      if (genders.includes("Men"))    genderConditions.push({ gender: { in: ["MALE", "MEN", "Men", "male", "men"] } });
      if (genders.includes("Women"))  genderConditions.push({ gender: { in: ["FEMALE", "WOMEN", "Women", "female", "women"] } });
      if (genders.includes("Kids"))   genderConditions.push({ gender: { in: ["KIDS", "Kids", "kids", "CHILDREN", "Children"] } });
      if (genders.includes("Unisex")) {
        genderConditions.push({ gender: { in: ["UNISEX", "Unisex", "unisex"] } });
        genderConditions.push({ gender: { notIn: ["MALE", "FEMALE", "MEN", "WOMEN", "KIDS", "Children", "male", "female", "kids"] } });
        genderConditions.push({ gender: null });
      }
      if (genderConditions.length > 0) andConditions.push({ OR: genderConditions });
    }

    // Collection Type: "Emirates Signature" (isInHouseProduct:true) vs "Designer Brands" (false or null)
    if (params.collection_type) {
      const types = params.collection_type.split(";").filter(Boolean);
      const hasSig = types.includes("Emirates Signature");
      const hasDesigner = types.includes("Designer Brands");
      if (hasSig && !hasDesigner) andConditions.push({ isInHouseProduct: true });
      if (hasDesigner && !hasSig)  andConditions.push({ OR: [{ isInHouseProduct: false }, { isInHouseProduct: null }] });
    }

    // Category: filter by category name (handles alias mapping: Optical Frames <-> Eyeglasses)
    if (params.category) {
      const categories = params.category.split(";").filter(Boolean);
      const expandedCategories = new Set<string>();

      categories.forEach((cat) => {
        expandedCategories.add(cat);
        const lower = cat.toLowerCase();
        if (lower === "optical frames" || lower === "optical" || lower === "eyeglasses" || lower === "reading glasses") {
          expandedCategories.add("Optical Frames");
          expandedCategories.add("Eyeglasses");
          expandedCategories.add("Optical");
          expandedCategories.add("Reading Glasses");
        }
        if (lower === "sunglasses" || lower === "sunwear") {
          expandedCategories.add("Sunglasses");
          expandedCategories.add("Sunwear");
        }
        if (lower === "accessories" || lower === "eyewear accessories") {
          expandedCategories.add("Accessories");
          expandedCategories.add("Eyewear Accessories");
        }
        if (lower === "lens care solutions" || lower === "contact lenses") {
          expandedCategories.add("Contact Lenses");
          expandedCategories.add("Lens Care Solutions");
        }
      });

      andConditions.push({
        category: {
          name: {
            in: Array.from(expandedCategories),
            mode: "insensitive"
          }
        }
      });
    }

    // Brand: filter by brand name (case-insensitive)
    if (params.brand) {
      const brands = params.brand.split(";").filter(Boolean);
      andConditions.push({ brand: { name: { in: brands, mode: "insensitive" } } });
    }

    // Frame Shape: case-insensitive
    if (params.frame_shape) {
      const shapes = params.frame_shape.split(";").filter(Boolean);
      andConditions.push({ frameShape: { in: shapes, mode: "insensitive" } });
    }

    // Frame Material: case-insensitive
    if (params.frame_material) {
      const materials = params.frame_material.split(";").filter(Boolean);
      andConditions.push({ material: { in: materials, mode: "insensitive" } });
    }

    // Color Way / Color: case-insensitive array or string match
    if (params.color_way || params.color) {
      const colorParam = params.color_way || params.color;
      const colors = colorParam.split(";").filter(Boolean);
      const colorConditions: any[] = colors.flatMap(c => [
        { color: { contains: c, mode: "insensitive" } },
        { colors: { hasSome: [c] } }
      ]);
      if (colorConditions.length > 0) andConditions.push({ OR: colorConditions });
    }

    // Price Range: each range is a separate OR condition
    if (params.price_range) {
      const ranges = params.price_range.split(";").filter(Boolean);
      const priceConditions: any[] = [];
      if (ranges.includes("Under ₹3,000"))             priceConditions.push({ price: { lt: 3000 } });
      if (ranges.includes("₹3,000 - ₹15,000"))         priceConditions.push({ price: { gte: 3000,  lte: 15000 } });
      if (ranges.includes("₹15,000 - ₹30,000"))        priceConditions.push({ price: { gte: 15000, lte: 30000 } });
      if (ranges.includes("Luxury (Above ₹30,000)"))   priceConditions.push({ price: { gt: 30000 } });
      if (priceConditions.length > 0) andConditions.push({ OR: priceConditions });
    }

    // Branches: product must have inventory in at least one matching branch
    if (params.branches) {
      const branches = params.branches.split(";").filter(Boolean);
      andConditions.push({
        inventory: { some: { branch: { name: { in: branches, mode: "insensitive" } } } }
      });
    }

    const where = { AND: andConditions };

    // ── Run queries concurrently ──
    const [dbProducts, fetchedColors, fetchedBranches] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          images: { orderBy: { order: "asc" } },
          inventory: { include: { branch: true } }
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.color.findMany({ orderBy: { name: "asc" } }),
      prisma.branch.findMany({ orderBy: { name: "asc" } })
    ]);

    dbColors = fetchedColors;
    dbBranches = fetchedBranches;

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
        gender: (p.gender === "MALE" || p.gender === "MEN") ? "Men" : (p.gender === "FEMALE" || p.gender === "WOMEN") ? "Women" : p.gender === "KIDS" ? "Kids" : "Unisex",
        frameShape: p.frameShape || "Standard",
        frameMaterial: p.material || "Standard",
        lensType: p.lensType || "Standard",
        color: p.color || "Standard",
        colors: p.colors || (p.color ? [p.color] : []),
        size: p.size || "",
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

  const defaultColors = [
    "Glossy Black", "Matte Black", "Tortoise Shell", "Dark Havana", "Light Havana",
    "Clear Crystal", "Champagne", "Shiny Gold", "Matte Gold", "Shiny Silver",
    "Matte Silver", "Rose Gold", "Gunmetal", "Brushed Platinum", "Bronze",
    "Navy Blue", "Forest Green", "Emerald Green", "Burgundy", "Amber",
    "Honey", "G-15 Green", "Grey Gradient", "Brown Gradient", "Blue Mirror",
    "Silver Mirror", "Gold Mirror", "Pink Gradient", "Clear", "Pure Hazel",
    "Gemstone Green", "Brilliant Blue", "Sterling Gray", "True Sapphire",
    "Turquoise", "Amethyst"
  ];
  const colorsSet = new Set([...defaultColors, ...dbColors.map(c => c.name)]);

  products.forEach(p => {
    const list = p.colors && p.colors.length > 0 ? p.colors : (p.color ? [p.color] : []);
    list.forEach(c => {
      if (!c) return;
      // Split by "/" to break down compound legacy color strings (e.g. "Emerald Green / Gold" into individual options)
      c.split("/").forEach(part => {
        const trimmed = part.trim();
        if (!trimmed) return;
        const formatted = trimmed.split(/\s+/).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(" ");
        colorsSet.add(formatted);
      });
    });
  });
  const allUniqueColors = Array.from(colorsSet).sort();

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ── Catalog Body ── */}
      <main className="bg-white flex-1 pt-20 md:pt-32" id="shop-main">
        <div className="section-container pt-4 md:pt-16 pb-16 md:pb-20">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

            {/* Filters Sidebar */}
            <Suspense fallback={
              <div className="w-full lg:w-64 shrink-0 animate-pulse bg-neutral-100 rounded-[3px] h-96" />
            }>
              <ShopFilters availableColors={allUniqueColors} availableBranches={dbBranches.map(b => b.name)} />
            </Suspense>

            {/* Product Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>

          </div>
        </div>
      </main>
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
