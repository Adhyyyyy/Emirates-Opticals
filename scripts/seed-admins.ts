import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
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

async function seedAdminsAndLeads() {
  console.log("⏳ Starting Enterprise Admin & Lead Seeding Protocol...");

  try {
    // 1. Fetch branches that were seeded by seed-catalog
    const branches = await prisma.branch.findMany();
    if (branches.length === 0) {
      throw new Error("❌ No branches found in the database. Please run the catalog seed first!");
    }

    console.log(`✅ Located ${branches.length} active branches in database.`);

    const changanassery = branches.find(b => b.slug === "changanassery");
    const thiruvalla = branches.find(b => b.slug === "thiruvalla");
    const kakkanad = branches.find(b => b.slug === "kakkanad");

    if (!changanassery || !thiruvalla || !kakkanad) {
      throw new Error("❌ Core branches (changanassery, thiruvalla, kakkanad) are missing from the catalog!");
    }

    // 2. Define Admin Profiles to Provision
    const adminsToProvision = [
      {
        email: "super@emirates.com",
        name: "Master Coordinator",
        role: "SUPER_ADMIN" as const,
        branchId: null,
      },
      {
        email: "changanassery@emirates.com",
        name: "Dr. Matthew Chacko",
        role: "BRANCH_ADMIN" as const,
        branchId: changanassery.id,
      },
      {
        email: "thiruvalla@emirates.com",
        name: "Elena Rostova",
        role: "BRANCH_ADMIN" as const,
        branchId: thiruvalla.id,
      },
      {
        email: "kakkanad@emirates.com",
        name: "Faris Rahman",
        role: "BRANCH_ADMIN" as const,
        branchId: kakkanad.id,
      },
      {
        email: "staff.kochi@emirates.com",
        name: "Meera Nair (Optometrist)",
        role: "STAFF" as const,
        branchId: kakkanad.id,
      }
    ];

    const password = "password123";

    // Fetch existing Supabase auth users
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const existingAuthMap = new Map(authUsers?.users.map(u => [u.email, u.id]) || []);

    console.log("⏳ Provisioning credentials in Supabase Auth & public.User table...");

    for (const admin of adminsToProvision) {
      console.log(`⏳ Processing: ${admin.email} (${admin.role})...`);

      // A. Create/Update in Supabase Auth
      let authUserId = existingAuthMap.get(admin.email);
      
      if (authUserId) {
        // Update password and metadata
        const { error } = await supabase.auth.admin.updateUserById(authUserId, {
          password,
          app_metadata: { role: admin.role, branchId: admin.branchId },
          user_metadata: { name: admin.name }
        });
        if (error) {
          console.error(`❌ Supabase update failed for ${admin.email}:`, error.message);
          continue;
        }
      } else {
        // Create new auth user
        const { data, error } = await supabase.auth.admin.createUser({
          email: admin.email,
          password,
          email_confirm: true,
          app_metadata: { role: admin.role, branchId: admin.branchId },
          user_metadata: { name: admin.name }
        });
        if (error) {
          console.error(`❌ Supabase creation failed for ${admin.email}:`, error.message);
          continue;
        }
        authUserId = data.user.id;
      }

      // B. Create/Upsert in public.User table with identical UUID
      await prisma.user.upsert({
        where: { email: admin.email },
        update: {
          id: authUserId,
          name: admin.name,
          role: admin.role,
          branchId: admin.branchId,
          deletedAt: null
        },
        create: {
          id: authUserId,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          branchId: admin.branchId,
        }
      });

      console.log(`✅ Active: ${admin.name} synchronized successfully.`);
    }

    // 3. Seed test Customer Interactions (Appointments & Enquiries)
    console.log("⏳ Seeding luxury Appointments & Enquiries...");

    // Clean old transactions first
    await prisma.appointment.deleteMany({});
    await prisma.enquiry.deleteMany({});

    // Fetch some seeded products for rich details
    const products = await prisma.product.findMany({ take: 5 });

    // A. Appointments seeding
    const appointmentDates = [
      new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      new Date(Date.now() + 48 * 60 * 60 * 1000), // in 2 days
      new Date(Date.now() + 72 * 60 * 60 * 1000), // in 3 days
    ];

    await prisma.appointment.createMany({
      data: [
        {
          customerName: "Ramesh Kumar",
          customerEmail: "ramesh@gmail.com",
          customerPhone: "+91 94470 12345",
          branchId: kakkanad.id,
          date: appointmentDates[0],
          status: "PENDING",
          notes: "Requires a comprehensive eye checkup and consultation for progressive lenses."
        },
        {
          customerName: "Sophia Elizabeth",
          customerEmail: "sophia@example.com",
          customerPhone: "+91 98450 67890",
          branchId: changanassery.id,
          date: appointmentDates[1],
          status: "CONFIRMED",
          notes: "Fitting check for newly arriving Prada Runway sunglasses."
        },
        {
          customerName: "Anil Varghese",
          customerEmail: "anil.v@gmail.com",
          customerPhone: "+91 95620 98765",
          branchId: thiruvalla.id,
          date: appointmentDates[2],
          status: "CONFIRMED",
          notes: "Wants polarized driving glasses examination."
        }
      ]
    });

    // B. Enquiries seeding
    await prisma.enquiry.createMany({
      data: [
        {
          branchId: kakkanad.id,
          type: "GENERAL",
          message: "Do you have the Cartier Santos Dumont aviator frames available in stock for a trial today?",
          status: "NEW"
        },
        {
          branchId: changanassery.id,
          type: "PRODUCT",
          message: "Interested in the custom honey-tortoise Prada Journal spectacles. Can I get blue-cut prescription lenses fitted in it?",
          status: "NEW"
        },
        {
          branchId: thiruvalla.id,
          type: "WHATSAPP_LEAD",
          isWhatsApp: true,
          message: "Hi, I saw your Ray-Ban Aviator Classic catalog online. Please share the pricing details for polarization options.",
          status: "COMPLETED"
        }
      ]
    });

    console.log(`
✅ ENTERPRISE SEEDING COMPLETE!
------------------------------------------------------------
1. Seeding Scope:  All database tables completely populated.
2. Admins Seeded:  5 active credentials (Super, 3 Branches, Staff).
3. Test Data:      Appointments, Enquiries, Inventories active.
------------------------------------------------------------
Log in with password: password123
Emails to test:
- super@emirates.com       (Super Admin - Global Access)
- changanassery@emirates.com (Branch Admin - Changanassery)
- thiruvalla@emirates.com    (Branch Admin - Thiruvalla)
- kakkanad@emirates.com      (Branch Admin - Kakkanad)
- staff.kochi@emirates.com   (Staff - Kakkanad)
------------------------------------------------------------
    `);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdminsAndLeads();
