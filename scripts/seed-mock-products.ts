import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env") });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedMockProducts() {
  console.log("⏳ Starting Luxury Product Catalog Seeding...");

  try {
    // 1. Fetch physical branches
    const dbBranches = await prisma.branch.findMany({
      where: { deletedAt: null }
    });

    if (dbBranches.length === 0) {
      console.error("❌ No physical boutique branches found. Please run scripts/setup-production-handover.ts first!");
      return;
    }

    console.log(`📍 Found ${dbBranches.length} boutique branch lounges in registry.`);

    // 2. Clear existing product elements
    console.log("🧹 Purging stale products, gallery images, and inventories...");
    await prisma.inventory.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.brand.deleteMany({});
    await prisma.category.deleteMany({});

    // 3. Seed Premium Brands
    console.log("🌱 Provisioning luxury brands registry...");
    const brandsData = [
      { name: "PRADA", slug: "prada", country: "Italy", isFeatured: true },
      { name: "Ray-Ban", slug: "ray-ban", country: "United States", isFeatured: true },
      { name: "Oakley", slug: "oakley", country: "United States", isFeatured: false },
      { name: "Cartier", slug: "cartier", country: "France", isFeatured: true }
    ];

    const seededBrands: Record<string, any> = {};
    for (const b of brandsData) {
      const brand = await prisma.brand.create({
        data: b
      });
      seededBrands[b.name.toLowerCase()] = brand;
      console.log(`   - Seeded Brand: ${brand.name}`);
    }

    // 4. Seed Categories
    console.log("🌱 Provisioning dynamic categories...");
    const categoriesData = [
      { name: "Luxury Collection", slug: "luxury-collection", description: "Elite haute couture eyewear collections" },
      { name: "Sunglasses", slug: "sunglasses", description: "Premium solar protection silhouettes" },
      { name: "Sports Eyewear", slug: "sports-eyewear", description: "Performance-driven sports vision assets" },
      { name: "Optical Frames", slug: "optical-frames", description: "Precision frames for daily vision corrective use" }
    ];

    const seededCategories: Record<string, any> = {};
    for (const c of categoriesData) {
      const cat = await prisma.category.create({
        data: c
      });
      seededCategories[c.name.toLowerCase()] = cat;
      console.log(`   - Seeded Category: ${cat.name}`);
    }

    // 5. Seed Premium Products
    console.log("🌱 Creating luxury product catalog assets...");
    const productsToSeed = [
      {
        name: "Prada Linear Rossa",
        slug: "prada-linear-rossa",
        brandName: "prada",
        categoryName: "luxury-collection",
        description: "Italian luxury with bold silhouettes and refined detailing. Fashion-forward frames with premium finishes.",
        price: 24500,
        images: [
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"
        ],
        gender: "MALE",
        style: "Classic",
        frameShape: "Rectangular",
        material: "Acetate",
        lensType: "Demo Lens",
        color: "Matte Black",
        size: "54-18-145",
        isFeatured: true,
        isNewArrival: true,
        collectionType: "Designer Brands",
        isInHouseProduct: false
      },
      {
        name: "Ray-Ban Aviator Classic",
        slug: "ray-ban-aviator-classic",
        brandName: "ray-ban",
        categoryName: "sunglasses",
        description: "Timeless eyewear defining generations with legendary designs like Aviator and Wayfarer.",
        price: 12800,
        images: [
          "https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"
        ],
        gender: "UNISEX",
        style: "Vintage",
        frameShape: "Aviator",
        material: "Metal",
        lensType: "Polarized",
        color: "Gold / G-15 Green",
        size: "58-14-135",
        isFeatured: false,
        isNewArrival: false,
        collectionType: "Designer Brands",
        isInHouseProduct: false
      },
      {
        name: "Oakley Flak 2.0 XL",
        slug: "oakley-flak-2-0-xl",
        brandName: "oakley",
        categoryName: "sports-eyewear",
        description: "Performance-driven eyewear engineered for athletes and active lifestyles with advanced lens technology.",
        price: 18500,
        images: [
          "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"
        ],
        gender: "MALE",
        style: "Sport",
        frameShape: "Sport",
        material: "O-Matter",
        lensType: "Prizm Road",
        color: "Polished Black",
        size: "59-12-133",
        isFeatured: false,
        isNewArrival: false,
        collectionType: "Designer Brands",
        isInHouseProduct: false
      },
      {
        name: "Cartier Santos Dumont",
        slug: "cartier-santos-dumont",
        brandName: "cartier",
        categoryName: "luxury-collection",
        description: "Exceptional craftsmanship and timeless elegance inspired by Parisian luxury heritage.",
        price: 85000,
        images: [
          "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"
        ],
        gender: "MALE",
        style: "Classic",
        frameShape: "Square",
        material: "Gold Plated",
        lensType: "Premium Demo",
        color: "Brushed Gold",
        size: "56-16-140",
        isFeatured: true,
        isNewArrival: false,
        collectionType: "Designer Brands",
        isInHouseProduct: false
      }
    ];

    for (const p of productsToSeed) {
      const brand = seededBrands[p.brandName];
      const category = seededCategories[p.categoryName === "luxury-collection" ? "luxury collection" : p.categoryName === "sports-eyewear" ? "sports eyewear" : p.categoryName];

      const product = await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          gender: p.gender,
          style: p.style,
          frameShape: p.frameShape,
          material: p.material,
          lensType: p.lensType,
          color: p.color,
          size: p.size,
          isFeatured: p.isFeatured,
          isNewArrival: p.isNewArrival,
          collectionType: p.collectionType,
          isInHouseProduct: p.isInHouseProduct,
          isActive: true,
          brandId: brand.id,
          categoryId: category.id,
          images: {
            create: p.images.map((url, order) => ({
              url,
              order
            }))
          },
          inventory: {
            create: dbBranches.map((br, index) => ({
              branchId: br.id,
              quantity: index % 2 === 0 ? 8 : 4, // Seed nice positive stock
              status: "IN_STOCK"
            }))
          }
        }
      });

      console.log(`   - Product Seeded: ${product.name} with ${p.images.length} photos.`);
    }

    console.log("\n🎉 Luxury Product Seed Protocol completed successfully!");

  } catch (error) {
    console.error("❌ Seeding aborted due to error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seedMockProducts();
