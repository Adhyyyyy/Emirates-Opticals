import "dotenv/config";
import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const NEW_BRANDS = [
  { name: "Ray-Ban", slug: "ray-ban", description: "Iconic eyewear brand." },
  { name: "Maui Jim", slug: "maui-jim", description: "Premium polarized sunglasses." },
  { name: "Stepper", slug: "stepper", description: "Comfort & Fit Innovation German eyewear." },
  { name: "Emporio Armani", slug: "emporio-armani", description: "Youthful Italian luxury brand." },
  { name: "Tommy Hilfiger", slug: "tom-hilfiger", description: "Classic American cool prep style eyewear." },
  { name: "Nike", slug: "nike", description: "Athletic performance eyewear." },
  { name: "Armani Exchange", slug: "armani-exchange", description: "Streetwear-inspired Italian designer brand." }
];

async function main() {
  console.log("Seeding new designer brands into database...");
  const pool = new pg.Pool({
    connectionString: process.env.DIRECT_URL
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    let count = 0;
    for (const brand of NEW_BRANDS) {
      await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: {
          name: brand.name,
          description: brand.description
        },
        create: {
          name: brand.name,
          slug: brand.slug,
          description: brand.description,
          isSignature: false
        }
      });
      console.log(`Upserted brand: ${brand.name}`);
      count++;
    }
    console.log(`✅ Successfully seeded ${count} designer brands!`);
  } catch (err: any) {
    console.error("❌ Seeding brands failed:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
