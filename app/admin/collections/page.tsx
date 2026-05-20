import React from "react";
import prisma from "@/lib/prisma";
import { CollectionWorkspace } from "@/components/sections/admin/CollectionWorkspace";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CollectionsPage() {
  // Concurrent retrieval of products, categories, and brands
  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        brand: true,
        category: true,
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      }
    }),
    prisma.brand.findMany({
      orderBy: {
        name: "asc",
      }
    })
  ]);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 font-heading">Global Collections</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Curate homepage edits, define catalog categories (like contact lenses and accessories), and deploy luxury designer brands globally.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Unified Curations Workspace */}
      <Reveal delay={0.2}>
        <CollectionWorkspace 
          products={products as any} 
          categories={categories}
          brands={brands}
        />
      </Reveal>
    </div>
  );
}
