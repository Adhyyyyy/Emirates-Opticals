import "dotenv/config";
import prisma from "../lib/prisma";

const BRANDS = [
  { name: "Prada", slug: "prada", description: "Italian luxury fashion house." },
  { name: "Cartier", slug: "cartier", description: "French luxury goods." },
  { name: "Ray-Ban", slug: "ray-ban", description: "American-Italian brand of luxury sunglasses." },
  { name: "Gucci", slug: "gucci", description: "Italian high-end luxury fashion house." },
  { name: "Tom Ford", slug: "tom-ford", description: "Luxury fashion brand founded by Tom Ford." }
];

const CATEGORIES = [
  { name: "Sunglasses", slug: "sunglasses", description: "Premium sun protection eyewear." },
  { name: "Eyeglasses", slug: "eyeglasses", description: "Luxury optical frames." },
  { name: "Contact Lenses", slug: "contact-lenses", description: "Medical grade contact lenses." },
  { name: "Accessories", slug: "accessories", description: "Luxury eyewear accessories." }
];

async function seedCatalog() {
  console.log("Starting Catalog Initialization Protocol...");

  try {
    console.log("Injecting Luxury Brands...");
    for (const brand of BRANDS) {
      await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: {},
        create: brand
      });
    }

    console.log("Injecting Collection Categories...");
    for (const category of CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }

    console.log("✅ Catalog successfully populated. Dropdowns will now function.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCatalog();
