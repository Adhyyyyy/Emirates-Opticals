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
    const branches = await prisma.branch.findMany({
      where: { deletedAt: null }
    });
    console.log("Active Branches in Database:");
    console.log(JSON.stringify(branches, null, 2));
  } catch (err: any) {
    console.error("Failed to query branches:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
