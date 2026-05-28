import "dotenv/config";
import prisma from "../lib/prisma";

function getPremiumPriceForBrand(brandSlug: string): number {
  switch (brandSlug.toLowerCase()) {
    case "cartier":
      return Math.floor(Math.random() * (120000 - 55000 + 1)) + 55000;
    case "chanel":
      return Math.floor(Math.random() * (52000 - 32000 + 1)) + 32000;
    case "gucci":
      return Math.floor(Math.random() * (45000 - 28000 + 1)) + 28000;
    case "prada":
      return Math.floor(Math.random() * (38000 - 24000 + 1)) + 24000;
    case "tom-ford":
      return Math.floor(Math.random() * (35000 - 22000 + 1)) + 22000;
    case "oakley":
      return Math.floor(Math.random() * (18000 - 11500 + 1)) + 11500;
    case "ray-ban":
      return Math.floor(Math.random() * (16500 - 9800 + 1)) + 9800;
    case "emirates-opticians":
      return Math.floor(Math.random() * (8500 - 4500 + 1)) + 4500;
    case "acuvue":
      return Math.floor(Math.random() * (2500 - 1800 + 1)) + 1800;
    case "alcon":
      return Math.floor(Math.random() * (2200 - 1500 + 1)) + 1500;
    case "bausch-lomb":
      return Math.floor(Math.random() * (1800 - 1200 + 1)) + 1200;
    default:
      return Math.floor(Math.random() * (20000 - 8000 + 1)) + 8000;
  }
}

async function main() {
  console.log("⏳ Fetching all catalog products to assign premium valuations...");
  const products = await prisma.product.findMany({
    include: { brand: true }
  });

  console.log(`Found ${products.length} products. Commencing updates...`);

  let updatedCount = 0;
  for (const product of products) {
    const brandSlug = product.brand?.slug || "generic";
    const price = getPremiumPriceForBrand(brandSlug);

    await prisma.product.update({
      where: { id: product.id },
      data: { price }
    });

    console.log(`✦ Updated: ${product.name} (${product.brand?.name || "Generic"}) -> ₹${price.toLocaleString("en-IN")}`);
    updatedCount++;
  }

  console.log(`\n✅ Successfully updated prices for ${updatedCount} products in the database!`);
}

main()
  .catch((e) => {
    console.error("Error updating prices:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
