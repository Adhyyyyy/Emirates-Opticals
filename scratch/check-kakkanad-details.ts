import "dotenv/config";
import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DIRECT_URL
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const branch = await prisma.branch.findUnique({
      where: { slug: "kakkanad" }
    });

    if (!branch) {
      console.log("Kakkanad branch not found.");
      return;
    }

    const users = await prisma.user.findMany({
      where: { branchId: branch.id }
    });
    console.log("Users linked to Kakkanad:");
    console.log(JSON.stringify(users, null, 2));

    const inventory = await prisma.inventory.findMany({
      where: { branchId: branch.id },
      include: { product: { select: { name: true } } }
    });
    console.log("Inventory entries linked to Kakkanad:");
    console.log(JSON.stringify(inventory.map(i => ({ id: i.id, productName: i.product.name, quantity: i.quantity })), null, 2));

  } catch (err: any) {
    console.error("Error checking details:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
