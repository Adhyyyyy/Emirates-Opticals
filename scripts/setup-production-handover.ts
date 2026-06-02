import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve, join } from "path";
import * as fs from "fs";

// Load environment variables from workspace root
dotenv.config({ path: resolve(process.cwd(), ".env") });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const REAL_BRANCHES = [
  {
    name: "Emirates Optician, Changanassery",
    slug: "changanassery",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    location: "Changanassery",
    phone: "+91 87140 32601",
    whatsapp: "918714032601",
    timings: "9:30 AM - 8:30 PM",
    coordinates: "9.4447,76.5413"
  },
  {
    name: "Emirates Optician, Thiruvalla",
    slug: "thiruvalla",
    address: "Karappunnasseril Arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    location: "Thiruvalla",
    phone: "+91 87140 32602",
    whatsapp: "918714032602",
    timings: "9:30 AM - 8:30 PM",
    coordinates: "9.3835,76.5740"
  },
  {
    name: "Emirates Optician, Kumbanad",
    slug: "kumbanad",
    address: "Bethel Complex, Kumbanad, Kerala 689547, India",
    location: "Kumbanad",
    phone: "+91 87140 32603",
    whatsapp: "918714032603",
    timings: "9:30 AM - 8:00 PM",
    coordinates: "9.3892,76.6577"
  },
  {
    name: "Emirates Optician, Kothamangalam",
    slug: "kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Kothamangalam, Kerala 686691, India",
    location: "Kothamangalam",
    phone: "+91 87140 32607",
    whatsapp: "918714032607",
    timings: "9:30 AM - 8:00 PM",
    coordinates: "10.0531,76.6218"
  },
  {
    name: "Emirates Optician, Pandalam",
    slug: "pandalam",
    address: "Karandiyil Building, IV/558-2, Thonallor, Pandalam, Kerala 689501, India",
    location: "Pandalam",
    phone: "+91 87140 32606",
    whatsapp: "918714032606",
    timings: "9:30 AM - 8:00 PM",
    coordinates: "9.2312,76.6133"
  },
  {
    name: "Emirates Optician, Kottayam",
    slug: "kottayam",
    address: "M D Commercial Centre, Kottayam - Kumily Rd, opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    location: "Kottayam",
    phone: "+91 85478 66755",
    whatsapp: "918547866755",
    timings: "9:00 AM - 8:00 PM",
    coordinates: "9.5916,76.5222"
  },
  {
    name: "Emirates Optician, Ettumanur",
    slug: "ettumanur",
    address: "Adams 2 101, near HP petrol station, Kavala, Ettumanoor, Kerala 686562, India",
    location: "Ettumanur",
    phone: "+91 87140 32604",
    whatsapp: "918714032604",
    timings: "9:00 AM - 8:00 PM",
    coordinates: "9.6702,76.5621"
  },
  {
    name: "Emirates Optician, Angamaly",
    slug: "angamaly",
    address: "Kuruvila Square, Junction, M C Road, near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    location: "Angamaly",
    phone: "+91 87140 32605",
    whatsapp: "918714032605",
    timings: "9:00 AM - 8:00 PM",
    coordinates: "10.1983,76.3862"
  },
  {
    name: "Emirates Optician, Irumpanam",
    slug: "irumpanam",
    address: "MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    location: "Irumpanam",
    phone: "+91 88899 90533",
    whatsapp: "918889990533",
    timings: "10:00 AM - 8:00 PM",
    coordinates: "9.9576,76.3478"
  }
];

async function setupProductionHandover() {
  console.log("⏳ Starting High-Integrity Stakeholder Handover Provisioning...");

  try {
    // 1. Purge Supabase Auth users to ensure absolute security
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    console.log(`🧹 Wiping ${users.length} sandbox accounts from Supabase Auth registry...`);
    for (const u of users) {
      await supabase.auth.admin.deleteUser(u.id);
      console.log(`   - Deleted Supabase account: ${u.email}`);
    }

    // 2. Clear core dynamic transactional & catalog databases
    console.log("🧹 Purging local database records...");
    await prisma.appointment.deleteMany({});
    console.log("   - Cleared eye-test appointments.");
    await prisma.enquiry.deleteMany({});
    console.log("   - Cleared shop enquiries.");
    await prisma.careerApplication.deleteMany({});
    console.log("   - Cleared job applications.");
    await prisma.inventory.deleteMany({});
    console.log("   - Cleared catalog stock allocations.");
    await prisma.productImage.deleteMany({});
    console.log("   - Cleared product gallery assets.");
    await prisma.product.deleteMany({});
    console.log("   - Cleared product catalog entities.");
    await prisma.user.deleteMany({});
    console.log("   - Cleared User roles registry.");
    await prisma.branch.deleteMany({});
    console.log("   - Cleared physical showrooms registry.");
    await prisma.banner.deleteMany({});
    console.log("   - Cleared marketing banners/offers.");
    await prisma.job.deleteMany({});
    console.log("   - Cleared dynamic careers job openings.");
    await prisma.offer.deleteMany({});
    console.log("   - Cleared dynamic campaign offers.");
    await prisma.testimonial.deleteMany({});
    console.log("   - Cleared customer testimonials.");
    await prisma.campaign.deleteMany({});
    console.log("   - Cleared seasonal campaigns.");

    // Clear dynamic local dynamic JSON data files
    try {
      const dataFiles = [
        "jobs.json",
        "applications.json",
        "banners.json",
        "offers.json",
        "activity-logs.json"
      ];
      
      for (const file of dataFiles) {
        const filePath = join(process.cwd(), "lib", "data", file);
        fs.writeFileSync(filePath, "[]", "utf-8");
        console.log(`   - Cleared dynamic local JSON file: ${file}`);
      }

      // Delete instagram-cache.json so it auto-generates correctly on page load
      const instagramCachePath = join(process.cwd(), "lib", "data", "instagram-cache.json");
      if (fs.existsSync(instagramCachePath)) {
        fs.unlinkSync(instagramCachePath);
        console.log("   - Cleared Instagram cache registry for fresh dynamic sync.");
      }
    } catch (fsError) {
      console.warn("   - Warning: Could not clear local dynamic JSON files.", fsError);
    }

    // 3. Upsert the 10 real Strategic Kerala Showrooms
    console.log("🌱 Establishing registry for the 10 real Kerala boutiques...");
    for (const branchData of REAL_BRANCHES) {
      await prisma.branch.upsert({
        where: { slug: branchData.slug },
        update: {
          name: branchData.name,
          address: branchData.address,
          location: branchData.location,
          phone: branchData.phone,
          whatsapp: branchData.whatsapp,
          timings: branchData.timings,
          coordinates: branchData.coordinates,
          deletedAt: null,
          isActive: true
        },
        create: {
          name: branchData.name,
          slug: branchData.slug,
          address: branchData.address,
          location: branchData.location,
          phone: branchData.phone,
          whatsapp: branchData.whatsapp,
          timings: branchData.timings,
          coordinates: branchData.coordinates,
          isActive: true
        }
      });
      console.log(`   - Boutique Registered: ${branchData.name}`);
    }

    // Fetch the fresh database branch entries
    const dbBranches = await prisma.branch.findMany({
      where: { deletedAt: null }
    });

    // 4. Set up clean accounts to provision
    const adminsToProvision = [
      {
        email: "super@emiratesoptician.in",
        password: process.env.SUPER_ADMIN_PASSWORD || "EmiratesSuperAdmin2026!",
        name: "Master Coordinator",
        role: "SUPER_ADMIN" as const,
        branchSlug: null
      },
      ...REAL_BRANCHES.map(br => ({
        email: `${br.slug}@emiratesoptician.in`,
        password: process.env.BRANCH_ADMIN_PASSWORD_PREFIX
          ? `${process.env.BRANCH_ADMIN_PASSWORD_PREFIX}${br.slug.charAt(0).toUpperCase() + br.slug.slice(1)}!`
          : `${br.slug.charAt(0).toUpperCase() + br.slug.slice(1)}Admin2026!`,
        name: `${br.slug.charAt(0).toUpperCase() + br.slug.slice(1)} Showroom Admin`,
        role: "BRANCH_ADMIN" as const,
        branchSlug: br.slug
      }))
    ];

    console.log(`🔐 Provisioning ${adminsToProvision.length} administrative entities...`);
    for (const adm of adminsToProvision) {
      const branch = adm.branchSlug ? dbBranches.find(b => b.slug === adm.branchSlug) : null;

      // Create account in Supabase
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: adm.email,
        password: adm.password,
        email_confirm: true,
        user_metadata: { name: adm.name },
        app_metadata: {
          role: adm.role,
          branchId: branch ? branch.id : null
        }
      });

      if (authError) {
        console.error(`❌ Failed to seed account for ${adm.email}:`, authError.message);
        continue;
      }

      // Keep local public.User synced
      await prisma.user.upsert({
        where: { id: authUser.user.id },
        update: {
          email: adm.email,
          name: adm.name,
          role: adm.role,
          branchId: branch ? branch.id : null
        },
        create: {
          id: authUser.user.id,
          email: adm.email,
          name: adm.name,
          role: adm.role,
          branchId: branch ? branch.id : null
        }
      });

      console.log(`   - [SUCCESS] Credentials: ${adm.email} | Role: ${adm.role}${branch ? ` (Scoped: ${branch.name})` : ""}`);
    }

    console.log("\n✨ Enterprise Handover Protocol Execution Completed successfully!");

  } catch (error) {
    console.error("❌ Handover seed protocol aborted due to error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

setupProductionHandover();
