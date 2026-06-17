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
      console.log("✅ Kakkanad branch has already been removed or does not exist.");
      return;
    }

    console.log(`Starting cleanup transaction for branch: ${branch.name} (ID: ${branch.id})...`);

    await prisma.$transaction([
      // 1. Delete associated inventory stock records
      prisma.inventory.deleteMany({
        where: { branchId: branch.id }
      }),
      // 2. Delete associated users/staff
      prisma.user.deleteMany({
        where: { branchId: branch.id }
      }),
      // 3. Delete the branch record itself
      prisma.branch.delete({
        where: { id: branch.id }
      })
    ]);

    console.log("✅ Successfully decommissioned and removed Kakkanad showroom record and all associated dependencies.");

  } catch (err: any) {
    console.error("❌ Cleanup failed:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
