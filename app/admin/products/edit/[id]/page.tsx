import React from "react";
import { ProductForm } from "@/features/products/components/ProductForm";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updateProduct } from "@/actions/products";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  const branchId = user?.app_metadata?.branchId;

  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } }
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } })
  ]);

  if (!product) return notFound();

  let currentStock = 0;
  if (branchId) {
    const inventory = await prisma.inventory.findUnique({
      where: { productId_branchId: { productId: id, branchId } }
    });
    if (inventory) currentStock = inventory.quantity;
  }

  // Transform Prisma output back into Form expected format
  const initialData = {
    ...product,
    status: product.isActive ? "PUBLISHED" : "DRAFT",
    images: product.images.map(img => img.url),
    initialStock: currentStock,
  };

  async function handleSubmit(data: any) {
    "use server";
    const result = await updateProduct(id, data);
    if (result.success) {
      redirect("/admin/products");
    }
  }

  async function handleCancel() {
    "use server";
    redirect("/admin/products");
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col gap-6">
        <Link 
          href="/admin/products"
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 hover:text-brand-gold transition-colors w-fit group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Global Catalog
        </Link>
        
        <Reveal>
          <h1 className="text-4xl font-bold text-brand-charcoal uppercase tracking-tighter">Update Product Entity</h1>
          <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed mt-2">
            Modify luxury asset intelligence for {product.name}.
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.2}>
        <ProductForm 
          initialData={initialData}
          categories={categories}
          brands={brands}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Reveal>
    </div>
  );
}
