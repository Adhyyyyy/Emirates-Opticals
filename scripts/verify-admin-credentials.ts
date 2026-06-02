import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase URL or Anon Key in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const credentials = [
  { email: "super@emiratesoptician.in", password: "EmiratesSuperAdmin2026!" },
  { email: "changanassery@emiratesoptician.in", password: "ChanganasseryAdmin2026!" },
  { email: "thiruvalla@emiratesoptician.in", password: "ThiruvallaAdmin2026!" },
  { email: "kumbanad@emiratesoptician.in", password: "KumbanadAdmin2026!" },
  { email: "kothamangalam@emiratesoptician.in", password: "KothamangalamAdmin2026!" },
  { email: "pandalam@emiratesoptician.in", password: "PandalamAdmin2026!" },
  { email: "kottayam@emiratesoptician.in", password: "KottayamAdmin2026!" },
  { email: "ettumanur@emiratesoptician.in", password: "EttumanurAdmin2026!" },
  { email: "angamaly@emiratesoptician.in", password: "AngamalyAdmin2026!" },
  { email: "irumpanam@emiratesoptician.in", password: "IrumpanamAdmin2026!" }
];

async function runVerification() {
  console.log("🔍 Verifying 10 Admin Credentials against Supabase...\n");

  for (const cred of credentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cred.email,
        password: cred.password
      });

      if (error) {
        console.log(`❌ ${cred.email} -> FAIL: ${error.message}`);
      } else {
        const role = data.user?.app_metadata?.role || "UNKNOWN";
        console.log(`✅ ${cred.email} -> PASS (Role: ${role})`);
      }
    } catch (e: any) {
      console.log(`❌ ${cred.email} -> ERROR: ${e.message || e}`);
    }
  }
}

runVerification();
