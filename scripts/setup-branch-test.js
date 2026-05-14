const { PrismaClient } = require("../prisma/generated-client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({ path: resolve(process.cwd(), '.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupBranchAdmin() {
  console.log("⏳ Initializing Boutique Context...");
  
  try {
    // 1. Create or Get Branch
    const branch = await prisma.branch.upsert({
      where: { slug: "cochin-test-hub" },
      update: {},
      create: {
        name: "Cochin Test Boutique",
        slug: "cochin-test-hub",
        address: "Test Street, Kochi",
        location: "Kochi",
        phone: "+91 00000 00000",
        whatsapp: "+91 00000 00000",
        timings: "9 AM - 9 PM",
      }
    });

    console.log(`✅ Branch Synchronized: ${branch.id}`);

    // 2. Create Branch Admin
    const email = "branch@emirates.com";
    const password = "password123";

    console.log(`⏳ Provisioning Branch Admin: ${email}...`);

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = (existingUsers && existingUsers.users) ? existingUsers.users.find(u => u.email === email) : null;

    let result;
    if (existingUser) {
      console.log(`ℹ️ User exists. Updating...`);
      result = await supabase.auth.admin.updateUserById(existingUser.id, {
        password,
        app_metadata: { role: "BRANCH_ADMIN", branchId: branch.id }
      });
    } else {
      console.log(`ℹ️ Creating new user...`);
      result = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        app_metadata: { role: "BRANCH_ADMIN", branchId: branch.id }
      });
    }

    if (result.error) {
      console.error("❌ Failed:", result.error.message);
      return;
    }

    console.log(`
✅ SUCCESS: Branch Admin Provisioned
------------------------------------
Email:    ${email}
Password: ${password}
Branch:   ${branch.name} (${branch.id})
Role:     BRANCH_ADMIN
------------------------------------
    `);
  } catch (error) {
    console.error("❌ Runtime Error:", error);
  }
}

setupBranchAdmin()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
