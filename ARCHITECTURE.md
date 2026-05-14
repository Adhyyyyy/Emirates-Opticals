# Emirates Optician: Enterprise Architecture

This document outlines the production-grade scalable architecture designed for the Emirates Optician luxury multi-branch platform.

## 1. Domain-Driven Feature Structure
The project follows a **Feature-Based Domain Architecture**. Instead of flat `components/` and `hooks/` folders, logic is grouped by business domain:
- `features/inventory`: Branch-specific stock management.
- `features/appointments`: Localized booking engine.
- `features/auth`: Role-based access control (Super Admin vs. Branch Admin).
- `features/branches`: Multi-location boutique configuration.

## 2. Technical Stack & Scalability
- **Next.js App Router**: Optimized routing and Server Actions for low-latency operations.
- **Prisma + Supabase**: A high-performance relational database with a multi-tenant (multi-branch) schema.
- **Zustand**: Lightweight global state for real-time UI synchronization without the overhead of Redux.
- **Tailwind + Tokens**: A centralized design system enabling "Single Source of Truth" styling across the consumer site and admin panels.

## 3. Multi-Branch Scalability
The platform uses an **Inventory-to-Branch** mapping system. Every `Product` is linked to multiple `Branches` via an `Inventory` model, allowing for:
- Per-branch stock tracking.
- Dynamic WhatsApp routing based on current product availability.
- Localized admin dashboards for branch managers.

## 4. Security & Roles
Access is managed via `Role` enums:
- `SUPER_ADMIN`: Global visibility into all branches and performance.
- `BRANCH_ADMIN`: Management of specific branch inventory and appointments.
- `STAFF`: View-only or limited operational access.

## 5. Maintenance Guidelines
- **Validations**: All forms and API inputs MUST use Zod schemas defined in `validations/`.
- **UI System**: Use the atomic components in `components/ui/` to ensure design consistency.
- **Data Fetching**: Prefer Server Components for data fetching to minimize client-side bundle size.
