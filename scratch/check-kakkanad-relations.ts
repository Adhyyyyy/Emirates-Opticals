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
      console.log("Kakkanad branch not found in the database.");
      return;
    }

    console.log(`Checking relations for Kakkanad branch (ID: ${branch.id}):`);

    const appointmentCount = await prisma.appointment.count({
      where: { branchId: branch.id }
    });
    console.log(`- Appointments: ${appointmentCount}`);

    const applicationCount = await prisma.careerApplication.count({
      where: { branchId: branch.id }
    });
    console.log(`- Career Applications: ${applicationCount}`);

    const enquiryCount = await prisma.enquiry.count({
      where: { branchId: branch.id }
    });
    console.log(`- Enquiries: ${enquiryCount}`);

    const stockCount = await prisma.inventory.count({
      where: { branchId: branch.id }
    });
    console.log(`- Inventory Stock Entries: ${stockCount}`);

    const userCount = await prisma.user.count({
      where: { branchId: branch.id }
    });
    console.log(`- Users/Staff: ${userCount}`);
  } catch (err: any) {
    console.error("Error checking relations:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => console.error(e));
