import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  var prisma: PrismaClient | undefined;
  var pgPool: pg.Pool | undefined;
}

const pool = global.pgPool || new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 15, // Support concurrent visitors without connection queuing
  idleTimeoutMillis: 10000, // Prune idle sockets (prevents stale Neon/Supabase proxy connections)
  connectionTimeoutMillis: 30000, // Allow up to 30s for serverless databases to wake from sleep
});

pool.on("error", (err) => {
  // Capture closed socket and handshake errors on idle clients gracefully
  console.warn("Recovered from idle pg-pool socket event:", err.message);
});

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

const adapter = new PrismaPg(pool);

const prisma = global.prisma || new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;


