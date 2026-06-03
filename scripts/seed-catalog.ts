import "dotenv/config";
import prisma from "../lib/prisma";

const BRANDS = [
  { name: "Prada", slug: "prada", description: "Italian luxury fashion house." },
  { name: "Cartier", slug: "cartier", description: "French luxury goods." },
  { name: "Ray-Ban", slug: "ray-ban", description: "American-Italian brand of luxury sunglasses." },
  { name: "Gucci", slug: "gucci", description: "Italian high-end luxury fashion house." },
  { name: "Tom Ford", slug: "tom-ford", description: "Luxury fashion brand founded by Tom Ford." },
  { name: "Oakley", slug: "oakley", description: "High-performance sunglasses and sports eyewear." },
  { name: "Chanel", slug: "chanel", description: "High-end French luxury fashion house." },
  { name: "Acuvue", slug: "acuvue", description: "World leader in contact lenses by Johnson & Johnson." },
  { name: "Alcon", slug: "alcon", description: "Global leader in eye care and contact lenses." },
  { name: "Bausch & Lomb", slug: "bausch-lomb", description: "Premium vision care product brand." },
  { name: "Emirates Optician", slug: "emirates-optician", description: "Our bespoke house brand for exquisite eyewear care." }
];

const CATEGORIES = [
  { name: "Sunglasses", slug: "sunglasses", description: "Premium sun protection eyewear." },
  { name: "Eyeglasses", slug: "eyeglasses", description: "Luxury optical frames." },
  { name: "Contact Lenses", slug: "contact-lenses", description: "Medical grade contact lenses." },
  { name: "Accessories", slug: "accessories", description: "Luxury eyewear accessories." }
];

const BRANCHES = [
  { name: "Emirates Optician, Changanassery", slug: "changanassery", address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103", location: "Changanassery", phone: "+91 96829 29968", whatsapp: "919682929968", timings: "9:30 AM - 8:30 PM", coordinates: "9.4443,76.5414" },
  { name: "Emirates Optician, Thiruvalla", slug: "thiruvalla", address: "MC Road, Thiruvalla, Kerala 689101", location: "Thiruvalla", phone: "+91 80000 00002", whatsapp: "918000000002", timings: "9:30 AM - 8:30 PM", coordinates: "9.3837,76.5786" },
  { name: "Emirates Optician, Kumbanad", slug: "kumbanad", address: "Kumbanad Junction, Kumbanad, Kerala 689547", location: "Kumbanad", phone: "+91 80000 00003", whatsapp: "918000000003", timings: "9:30 AM - 8:30 PM", coordinates: "9.3879,76.6575" },
  { name: "Emirates Optician, Kothamangalam", slug: "kothamangalam", address: "High Range Road, Kothamangalam, Kerala 686691", location: "Kothamangalam", phone: "+91 80000 00004", whatsapp: "918000000004", timings: "9:30 AM - 8:30 PM", coordinates: "10.0631,76.6219" },
  { name: "Emirates Optician, Pandalam", slug: "pandalam", address: "Near KSRTC, Pandalam, Kerala 689501", location: "Pandalam", phone: "+91 80000 00005", whatsapp: "918000000005", timings: "9:30 AM - 8:30 PM", coordinates: "9.2272,76.6806" },
  { name: "Emirates Optician, Kakkanad", slug: "kakkanad", address: "Infopark Road, Kakkanad, Kochi, Kerala 682030", location: "Kakkanad", phone: "+91 80000 00006", whatsapp: "918000000006", timings: "9:30 AM - 8:30 PM", coordinates: "10.0159,76.3419" }
];

const RAW_PRODUCTS = [
  {
    name: "Prada Cinema Shield",
    slug: "prada-cinema-shield",
    description: "Italian luxury with a bold shield silhouette and refined metallic detailing. These fashion-forward frames feature premium gradient lenses for unparalleled class.",
    brandSlug: "prada",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Shield",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Rose Gold / Pink Gradient",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Linea Rossa Active",
    slug: "prada-linea-rossa-active",
    description: "Designed for the active lifestyle, combining technical excellence with contemporary aesthetics. Features robust rubberized hinges and high-contrast polarized sport lenses.",
    brandSlug: "prada",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Rectangular",
    material: "Nylon",
    lensType: "Polarized",
    color: "Matte Black / Red Logo",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier Santos de Cartier",
    slug: "cartier-santos-de-cartier",
    description: "Exceptional craftsmanship inspired by the legendary Santos watch. Embellished with the signature gold-plated Santos screws on the bridge and temple arms.",
    brandSlug: "cartier",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Aviator",
    material: "Metal",
    lensType: "Polarized",
    color: "Brushed Platinum / Black Leather",
    size: "55-17-145",
    isFeatured: true,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Cartier C Décor Rimless",
    slug: "cartier-c-decor-rimless",
    description: "The pinnacle of minimalism and prestige. Features exquisite solid wood temples, rimless design, and the instantly recognizable gold-finished Cartier C monogram.",
    brandSlug: "cartier",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Rectangular",
    material: "Gold Plated",
    lensType: "Transitions",
    color: "18k Gold Plated / Brown",
    size: "50-21-140",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1505682614136-0a12f9f7beea?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Wayfarer Ease",
    slug: "ray-ban-wayfarer-ease",
    description: "A modern, slightly more comfortable spin on the iconic 1952 original. The distinct trapezoidal shape provides immediate retro appeal and long-term wearability.",
    brandSlug: "ray-ban",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Wayfarer",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Gloss Black / Crystal Green",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1517498327491-f903e1e281cd?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Clubmaster Classic",
    slug: "ray-ban-clubmaster-classic",
    description: "Retro and timeless. The Clubmaster was inspired by the counterculture of the 1960s. Combines an acetate browline with sleek metal under-rims.",
    brandSlug: "ray-ban",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Black Gold / G-15 Green",
    size: "Standard",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Gucci Double G Round",
    slug: "gucci-double-g-round",
    description: "Vintage bohemian vibe with contemporary oversized dimensions. Accented with the iconic interlocking GG logo cast in antiqued gold-toned metal on the temples.",
    brandSlug: "gucci",
    categorySlug: "sunglasses",
    gender: "FEMALE",
    frameShape: "Round",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Glossy Black / Grey",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford Henry Classic",
    slug: "tom-ford-henry-classic",
    description: "A premium browline style with a sleek metal bridge and Tom Ford's signature elegant gold 'T' temple embellishment.",
    brandSlug: "tom-ford",
    categorySlug: "sunglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Acetate",
    lensType: "UV400 Protected",
    color: "Dark Havana / Gold",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1462146449396-2d7d4ba877d7?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Oakley Holbrook Prizm",
    slug: "oakley-holbrook-prizm",
    description: "Classic design meets modern performance. Inspired by screen heroes from the 1940s, 50s, and 60s, outfitted with patented high-definition Prizm optics.",
    brandSlug: "oakley",
    categorySlug: "sunglasses",
    gender: "MALE",
    frameShape: "Square",
    material: "O-Matter",
    lensType: "Polarized",
    color: "Matte Black / Prizm Sapphire",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Prada Heritage Optical",
    slug: "prada-heritage-optical",
    description: "Refined and intellectual. Made from thick, high-density acetate in custom matte navy blue. Fitted with premium blue-light blocking lenses.",
    brandSlug: "prada",
    categorySlug: "eyeglasses",
    gender: "MALE",
    frameShape: "Rectangular",
    material: "Acetate",
    lensType: "Blue Cut",
    color: "Matte Navy Blue",
    size: "54-18-145",
    isFeatured: false,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Ray-Ban Round Metal Optics",
    slug: "ray-ban-round-metal-optics",
    description: "An absolute retro classic. Round metal prescription frames inspired by the counterculture of the 1960s, finished in timeless matte gold.",
    brandSlug: "ray-ban",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Round",
    material: "Metal",
    lensType: "Blue Cut",
    color: "Matte Gold",
    size: "Standard",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Tom Ford FT5634 Blue Block",
    slug: "tom-ford-ft5634-blue-block",
    description: "Thick, bold statement eyeglasses pre-fitted with blue-light filtering technology. Handcrafted in Italy with iconic shiny gold T-logos.",
    brandSlug: "tom-ford",
    categorySlug: "eyeglasses",
    gender: "UNISEX",
    frameShape: "Square",
    material: "Acetate",
    lensType: "Blue Cut",
    color: "Dark Havana",
    size: "54-18-145",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1512099053734-e6767b535838?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Acuvue Oasys 1-Day",
    slug: "acuvue-oasys-1-day",
    description: "Unmatched moisture and breathability. Hydraluxe technology mimics natural tears to keep eyes comfortable even through intensive digital screen work.",
    brandSlug: "acuvue",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Daily Disposable",
    color: "Clear",
    size: "Pack of 30",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Alcon Air Optix Colors",
    slug: "alcon-air-optix-colors",
    description: "Stunning color enhancement with high breathability. SmartShield technology prevents deposit build-up, ensuring pristine clarity all month long.",
    brandSlug: "alcon",
    categorySlug: "contact-lenses",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "Monthly Disposable",
    color: "Pure Hazel",
    size: "Pack of 2",
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1588768897961-332c50c55d18?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Emirates Optician Premium Kit",
    slug: "emirates-optician-premium-kit",
    description: "Includes an eco-friendly anti-static lens cleaning fluid, a high-density micro-fiber cloth in luxury forest emerald green, and a travel case.",
    brandSlug: "emirates-optician",
    categorySlug: "accessories",
    gender: "UNISEX",
    frameShape: "None",
    material: "None",
    lensType: "None",
    color: "Emerald Green / Gold",
    size: "Standard",
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1542641760-7a412c60ae1e?auto=format&fit=crop&q=80&w=800"]
  }
];

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
    case "emirates-optician":
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

async function seedCatalog() {
  console.log("⏳ Starting Catalog Initialization Protocol...");

  try {
    console.log("⏳ Injecting Luxury Brands...");
    const brandMap: Record<string, string> = {};
    for (const brand of BRANDS) {
      const b = await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: { name: brand.name, description: brand.description },
        create: brand
      });
      brandMap[brand.slug] = b.id;
    }

    console.log("⏳ Injecting Collection Categories...");
    const categoryMap: Record<string, string> = {};
    for (const category of CATEGORIES) {
      const c = await prisma.category.upsert({
        where: { slug: category.slug },
        update: { name: category.name, description: category.description },
        create: category
      });
      categoryMap[category.slug] = c.id;
    }

    console.log("⏳ Injecting Malayalam Boutique Branches...");
    const branchIds: string[] = [];
    for (const branch of BRANCHES) {
      const br = await prisma.branch.upsert({
        where: { slug: branch.slug },
        update: {
          name: branch.name,
          address: branch.address,
          location: branch.location,
          phone: branch.phone,
          whatsapp: branch.whatsapp,
          timings: branch.timings,
          coordinates: branch.coordinates
        },
        create: branch
      });
      branchIds.push(br.id);
    }

    console.log("⏳ Cleaning old Catalog and Inventories to prevent collisions...");
    await prisma.$transaction([
      prisma.enquiry.updateMany({
        where: { productId: { not: null } },
        data: { productId: null }
      }),
      prisma.inventory.deleteMany({}),
      prisma.productImage.deleteMany({}),
      prisma.product.deleteMany({})
    ]);

    console.log(`⏳ Injecting 15 Premium Products and mapping branch inventories...`);
    let count = 0;
    for (const rawProduct of RAW_PRODUCTS) {
      const brandId = brandMap[rawProduct.brandSlug];
      const categoryId = categoryMap[rawProduct.categorySlug];

      if (!brandId || !categoryId) {
        console.error(`❌ Skipping product ${rawProduct.name}: Brand/Category slug mismatch.`);
        continue;
      }

      const product = await prisma.product.create({
        data: {
          name: rawProduct.name,
          slug: rawProduct.slug,
          description: rawProduct.description,
          price: getPremiumPriceForBrand(rawProduct.brandSlug),
          gender: rawProduct.gender,
          frameShape: rawProduct.frameShape,
          material: rawProduct.material,
          lensType: rawProduct.lensType,
          color: rawProduct.color,
          size: rawProduct.size,
          brandId,
          categoryId,
          isFeatured: rawProduct.isFeatured,
          isNewArrival: rawProduct.isNewArrival,
          isActive: true,
          metaTitle: `${rawProduct.name} - Authentic Luxury | Emirates Optician`,
          metaDesc: rawProduct.description.substring(0, 155),
        }
      });

      for (let i = 0; i < rawProduct.images.length; i++) {
        await prisma.productImage.create({
          data: {
            url: rawProduct.images[i],
            order: i,
            productId: product.id
          }
        });
      }

      for (const branchId of branchIds) {
        const quantity = Math.floor(Math.random() * 16);
        let status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
        if (quantity === 0) status = "OUT_OF_STOCK";
        else if (quantity <= 3) status = "LOW_STOCK";

        await prisma.inventory.create({
          data: {
            productId: product.id,
            branchId,
            quantity,
            status
          }
        });
      }

      count++;
    }

    console.log(`✅ Success! Successfully populated database with ${count} luxury products, mapped across all 6 branches!`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCatalog();
