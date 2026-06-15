import "dotenv/config";
import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const INDUSTRY_COLORS = [
  // Classic Frames
  "Glossy Black",
  "Matte Black",
  "Tortoise Shell",
  "Dark Havana",
  "Light Havana",
  "Clear Crystal",
  "Champagne",
  
  // Metallic Frames
  "Shiny Gold",
  "Matte Gold",
  "Shiny Silver",
  "Matte Silver",
  "Rose Gold",
  "Gunmetal",
  "Brushed Platinum",
  "Bronze",

  // Colorful Frames
  "Navy Blue",
  "Forest Green",
  "Emerald Green",
  "Burgundy",
  "Amber",
  "Honey",
  
  // Sunglasses Lenses
  "G-15 Green",
  "Grey Gradient",
  "Brown Gradient",
  "Blue Mirror",
  "Silver Mirror",
  "Gold Mirror",
  "Pink Gradient",
  
  // Contact Lenses
  "Clear",
  "Pure Hazel",
  "Gemstone Green",
  "Brilliant Blue",
  "Sterling Gray",
  "True Sapphire",
  "Turquoise",
  "Amethyst"
];

async function main() {
  console.log("Populating database with industry-standard colors...");
  const pool = new pg.Pool({
    connectionString: process.env.DIRECT_URL
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    let count = 0;
    for (const color of INDUSTRY_COLORS) {
      // Capitalize properly
      const formatted = color.trim().split(/\s+/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(" ");

      await prisma.color.upsert({
        where: { name: formatted },
        update: {},
        create: { name: formatted }
      });
      count++;
    }
    console.log(`\u2705 Successfully populated registry with ${count} industry-standard colors!`);
  } catch (err: any) {
    console.error("\u274c Populating registry failed:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
