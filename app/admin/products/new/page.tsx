import React from "react";
import { ProductForm } from "@/features/products/components/ProductForm";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/actions/products";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" }
  });

  async function handleSubmit(data: any) {
    "use server";
    const result = await createProduct(data);
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
          <h1 className="text-4xl font-bold text-brand-charcoal uppercase tracking-tighter">Establish New Product</h1>
          <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed mt-2">
            Configure a new luxury eyewear entity for the Emirates Optician global network.
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.2}>
        <ProductForm 
          categories={categories}
          brands={brands}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Reveal>
    </div>
  );
}
