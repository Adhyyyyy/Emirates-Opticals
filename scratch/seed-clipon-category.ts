import "dotenv/config";
import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

async function main() {
  console.log("Seeding Clip-On Glasses category into database...");
  const pool = new pg.Pool({
    connectionString: process.env.DIRECT_URL
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const category = await prisma.category.upsert({
      where: { slug: "clip-on-glasses" },
      update: {
        name: "Clip-On Glasses",
        description: "Versatile eyewear with magnetic or clip-on shade additions."
      },
      create: {
        name: "Clip-On Glasses",
        slug: "clip-on-glasses",
        description: "Versatile eyewear with magnetic or clip-on shade additions."
      }
    });
    console.log(`✅ Successfully seeded category: ${category.name}`);
  } catch (err: any) {
    console.error("❌ Seeding category failed:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
