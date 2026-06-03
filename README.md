# Emirates Optician — Premium Multi-Tenant Optical Portal

Emirates Optician is an enterprise-grade, branch-isolated luxury optical retail catalog, computerized vision consultation router, and local SEO ranking engine built for Kerala showrooms. 

The portal uses **Next.js 16 (App Router)** and **Supabase** for secure authentication and client routing, paired with **Prisma** on PostgreSQL for high-speed catalog lookups and showroom inventories.

---

## 🛠️ Technology Stack & Architecture

### Core Architecture
*   **Next.js 16 (App Router + Turbopack)**: High-speed server-rendered layouts and server actions.
*   **Custom Proxy Middleware (`proxy.ts`)**: Built-in edge routing that enforces Content Security Policy (CSP), clickjacking defenses, and role-based redirects.
*   **Feature-Based Domain Architecture**: Separated namespaces for public visitors, career applications, and branch administrators.

### Data & State Layer
*   **Prisma ORM with pg-pool**: Interfaced with a PostgreSQL connection pooler (PgBouncer on port `6543`) to prevent connection exhaustion under serverless scaling.
*   **Zustand**: Fast client-side global state store.
*   **Cloudinary Integration**: Offloaded media hosting for brand assets and resumes, maintaining a zero-footprint storage impact on Supabase.

---

## 🔑 Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Connection (Use Port 6543 for PgBouncer connection pooling)
DATABASE_URL="postgresql://postgres:[password]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase Configurations
NEXT_PUBLIC_SUPABASE_URL="https://[project-id].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# Administrator Passwords (Used for Seeding & Handover)
SUPER_ADMIN_PASSWORD="YourSuperSecureAdminPassword!"
BRANCH_ADMIN_PASSWORD_PREFIX="EmiratesAdminPassPrefix"
```

---

## 🚀 Operational Scripts Directory

All scripts are located in the `/scripts` directory and can be executed via `npx tsx scripts/[filename].ts` or `npx ts-node scripts/[filename].ts`:

| Script File | Purpose | Usage |
|---|---|---|
| **`setup-production-handover.ts`** | Wipes sandbox testing profiles; registers the 10 real Kerala showrooms; provisions active branch admins for each location. | `npx tsx scripts/setup-production-handover.ts` |
| **`seed-catalog.ts`** | Seeds master luxury brands, dynamic product categories, frames, material attributes, and maps initial stock units. | `npx tsx scripts/seed-catalog.ts` |
| **`create-admin.ts`** | CLI tool to manually create and provision custom administrative profiles. | `npx tsx scripts/create-admin.ts` |
| **`seed-admins.ts`** | Bulk-seeds default testing branch administrators. | `npx tsx scripts/seed-admins.ts` |
| **`test-connections.ts`** | Verifies database pool sockets and Supabase service role handshakes. | `npx tsx scripts/test-connections.ts` |
| **`update-prices.ts`** | Applies randomized luxury-market price configurations across the database catalog. | `npx tsx scripts/update-prices.ts` |
| **`verify-admin-credentials.ts`** | Verifies user credentials and role claims within Supabase Auth app metadata. | `npx tsx scripts/verify-admin-credentials.ts` |
| **`setup-branch-test.ts`** | Provisions a sandbox `Cochin Test Boutique` and credentials for developer dry-runs. | `npx tsx scripts/setup-branch-test.ts` |

---

## 💻 Local Development Workflow

### 1. Installation
Clone the repository and install all packages:
```bash
npm install
```

### 2. Generate Prisma Client
Build the type-safe Prisma client:
```bash
npx prisma generate
```

### 3. Setup database schema
Push the Prisma migrations/schema to your PostgreSQL instance:
```bash
npx prisma db push
```

### 4. Run Handover & Seed Data
Initialize the database structure and create the 10 real showrooms and catalog data:
```bash
npx tsx scripts/setup-production-handover.ts
npx tsx scripts/seed-catalog.ts
npx tsx scripts/update-prices.ts
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Compile Production Build
Ensure that the Next.js compiler is running cleanly:
```bash
npm run build
```

---

## 🔒 Security Practices

1.  **Server Action Guards**: Every administrative server action validates session roles using `validateSessionRole` and `enforceBranchIsolation` to protect against cross-tenant data leaks.
2.  **No Public Secrets**: Sensitive variables (like `SUPABASE_SERVICE_ROLE_KEY`) are never prefixed with `NEXT_PUBLIC_` to prevent leakage into client-side bundles.
3.  **CSP Headers**: Managed inside `proxy.ts`, allowing secure scripts, stylesheets, and maps while blocking frame-ancestors.
