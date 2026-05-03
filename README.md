# Emirates Opticians 👓
A premium, multi-branch Next.js 15 (Turbopack) application built for the premier luxury optician in the UAE.

## Features
- **Modern Tech Stack**: Next.js 15 (App Router), React 19, TypeScript
- **Stunning UI**: Tailwind CSS v4, Framer Motion, GSAP, and Custom CSS shapes
- **Database Architecture**: Prisma ORM v7 with `@prisma/adapter-pg`
- **Robust Authentication**: Supabase SSR Auth with protected Middleware proxy routes
- **Secure Dashboard**: Full CRUD admin operations protected by Server Actions
- **Dynamic Storefront**: Live product discovery, interactive branch locators, and dynamic offers
- **Performance**: Optimized images, incremental static regeneration (ISR)

## Prerequisites
- Node.js 18.x or later
- Supabase account with active database

## Environment Setup
Create a `.env` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database Connections
# Prisma requires DIRECT_URL for migrations
DIRECT_URL="your-supabase-direct-postgres-url"
# Application connection uses the transaction pooler
DATABASE_URL="your-supabase-pooled-postgres-url"
```

## Getting Started

1. **Install Dependencies**:
```bash
npm install
```

2. **Database Migrations**:
Apply the Prisma schema to your database.
```bash
npx prisma migrate dev --name init
```

3. **Database Seeding**:
Populate the database with initial branches and products.
```bash
npx tsx prisma/seed.ts
```

4. **Create Admin User**:
Run the setup script to register the `SUPER_ADMIN` in Supabase Auth and Prisma.
```bash
node create-admin.js
```

5. **Start Development Server**:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the storefront, and `http://localhost:3000/login` to access the admin portal.

## Project Structure
- `/app/(public)`: All public-facing storefront routes (Home, Branches, Products, Static pages).
- `/app/(auth)`: Secure authentication layouts.
- `/app/dashboard`: Protected admin portal interfaces.
- `/app/actions`: Secure Next.js Server Actions handling all database mutations.
- `/components`: Reusable UI elements split between `home` and global utilities.
- `/lib`: Singleton instances for Prisma client and Supabase SSR utilities.
- `/prisma`: Database schema, migrations, and seed scripts.

## Styling System
This project utilizes **Tailwind CSS v4** alongside a predefined design system in `tailwind.config.ts`. The `globals.css` maps custom CSS properties (like `--bg`, `--surface`, `--gold`) to create the distinct luxury dark-mode theme.

## Deployment
This project is fully ready for deployment on Vercel or AWS Amplify. Ensure all environment variables are correctly mapped in your deployment provider's dashboard.
"# Emirates-Opticals" 
