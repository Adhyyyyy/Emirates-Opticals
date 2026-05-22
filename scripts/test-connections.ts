import pg from "pg";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

async function testConnection(name: string, connectionString: string | undefined) {
  if (!connectionString) {
    console.error(`❌ ${name}: Connection string is undefined`);
    return;
  }

  console.log(`⏳ Testing ${name}...`);
  const pool = new pg.Pool({ connectionString, connectionTimeoutMillis: 5000 });
  
  try {
    const client = await pool.connect();
    const res = await client.query("SELECT NOW()");
    console.log(`✅ ${name} Success! Server Time: ${res.rows[0].now}`);
    client.release();
  } catch (err: any) {
    console.error(`❌ ${name} Failed: ${err.message}`);
  } finally {
    await pool.end();
  }
}

async function run() {
  await testConnection("DATABASE_URL (Pooler)", process.env.DATABASE_URL);
  await testConnection("DIRECT_URL (Direct)", process.env.DIRECT_URL);
}

run();
