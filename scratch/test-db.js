const fs = require("fs");
const path = require("path");

// Manually load .env variables
try {
  const envPath = path.join(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
        if (key && !key.startsWith("#")) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (e) {
  console.error("Error loading .env", e);
}

const { PrismaClient } = require("../prisma/generated-client");
const pg = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Connecting to database: ", process.env.DATABASE_URL ? "URL Configured" : "URL Missing");
  const count = await prisma.product.count();
  console.log("Total products in database:", count);
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, colors: true, color: true, createdAt: true, isActive: true }
  });
  console.log("Latest 5 products in database:", JSON.stringify(products, null, 2));
  await prisma.$disconnect();
  await pool.end();
}

main().catch(err => {
  console.error("Database query failed:", err);
  process.exit(1);
});
