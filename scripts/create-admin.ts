import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase environment variables.');
  process.exit(1);
}

// Initialize Supabase Admin Client (Service Role Key is REQUIRED for app_metadata updates)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  const args = process.argv.slice(2);
  const email = args[0];
  const password = args[1];
  const role = args[2] as 'SUPER_ADMIN' | 'BRANCH_ADMIN';
  const branchId = args[3]; // Optional, required for BRANCH_ADMIN

  if (!email || !password || !role) {
    console.log(`
🚀 Emirates Admin Provisioning Utility
Usage: npx tsx scripts/create-admin.ts <email> <password> <role> [branchId]

Roles: SUPER_ADMIN, BRANCH_ADMIN
    `);
    process.exit(1);
  }

  console.log(`⏳ Provisioning ${role} for ${email}...`);

  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existingUser = existingUsers.users.find(u => u.email === email);

  let result;
  if (existingUser) {
    console.log(`ℹ️ User already exists. Synchronizing role and resetting password...`);
    result = await supabase.auth.admin.updateUserById(existingUser.id, {
      password,
      app_metadata: { 
        role: role,
        branchId: branchId || undefined
      }
    });
  } else {
    result = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { 
        role: role,
        branchId: branchId || undefined
      }
    });
  }

  if (result.error) {
    console.error('❌ Provisioning Failed:', result.error.message);
    process.exit(1);
  }

  const user = result.data.user;

  console.log(`
✅ Success: Administrative account created.
------------------------------------------
User ID: ${user.id}
Email:   ${user.email}
Role:    ${user.app_metadata.role}
${branchId ? `Branch:  ${branchId}` : ''}
------------------------------------------
    `);
}

createAdmin();
