import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function setupBranchAdmin() {
  console.log("⏳ Initializing Boutique Context...");
  
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
  const existingUser = existingUsers.users.find(u => u.email === email);

  let result;
  if (existingUser) {
    result = await supabase.auth.admin.updateUserById(existingUser.id, {
      password,
      app_metadata: { role: "BRANCH_ADMIN", branchId: branch.id }
    });
  } else {
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
}

setupBranchAdmin()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
