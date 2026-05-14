# Supabase Free Tier Optimization Guide: Emirates Optician

This guide outlines the specific configurations needed to run a production-grade multi-branch platform on the Supabase Free Tier without hitting resource limits.

## 1. Connection Strategy (The Pooler)
The Free Tier has a limit of **~60 direct PostgreSQL connections**. 
- **Rule**: NEVER use the default port 5432 in Server Actions or API routes.
- **Solution**: Use the **Supabase Connection Pooler** on port **6543** with `pgbouncer=true`. This allows hundreds of concurrent requests by reusing a small number of actual database connections.

## 2. Media Strategy (Cloudinary Offloading)
Supabase Free Tier provides only 1GB of storage. 
- **Decision**: We offload all `Product`, `Branch`, and `Resume` files to **Cloudinary**.
- **Benefit**: Zero impact on Supabase storage limits and automatic WebP/AVIF image optimization, which improves SEO and performance.

## 3. Row-Level Security (RLS) SQL
Run these policies in your Supabase SQL Editor to secure the multi-branch logic:

```sql
-- Enable RLS on all tables
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Inventory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;

-- 1. Products are visible to everyone
CREATE POLICY "Products are public" ON "Product" 
FOR SELECT USING (true);

-- 2. Branch Admins can only see/edit their own branch appointments
CREATE POLICY "Branch Admin isolation" ON "Appointment"
FOR ALL USING (
  auth.uid() IN (
    SELECT id FROM "User" WHERE "branchId" = "Appointment"."branchId"
  )
);

-- 3. Only Super Admins can delete branches
CREATE POLICY "Super Admin Branch Control" ON "Branch"
FOR DELETE USING (auth.jwt() ->> 'role' = 'SUPER_ADMIN');
```

## 4. Query Optimization
To stay within the Free Tier's CPU/RAM limits:
- **Pagination**: Always use `take` and `skip` in Prisma queries to avoid fetching huge datasets.
- **Selective Fetching**: Only select the fields you need using Prisma's `select`.
- **Indexing**: The Prisma schema already includes `@@index` on slugs and branch IDs—ensure these are deployed to PostgreSQL.

## 5. Security Best Practices
- **Middleware Guarding**: The `middleware.ts` handles the initial redirect, but always double-check user roles in **Server Actions** using `supabase.auth.getUser()`.
- **Environment Secrets**: Never prefix sensitive keys (like `SUPABASE_SERVICE_ROLE_KEY`) with `NEXT_PUBLIC_`.
