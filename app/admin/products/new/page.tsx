import React from "react";
import { ProductForm } from "@/features/products/components/ProductForm";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/actions/products";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export default async function NewProductPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.app_metadata?.role;

  let categories: any[] = [];
  let brands: any[] = [];
  let branches: any[] = [];

  try {
    const [dbCategories, dbBrands, dbBranches] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.brand.findMany({ orderBy: { name: "asc" } }),
      prisma.branch.findMany({ 
        where: { 
          deletedAt: null,
          slug: {
            in: [
              "changanassery", "thiruvalla", "kumbanad", 
              "kothamangalam", "pandalam", "kakkanad", 
              "kottayam", "ettumanur", "angamaly", "irumpanam"
            ]
          }
        }, 
        orderBy: { name: "asc" } 
      })
    ]);
    categories = dbCategories;
    brands = dbBrands;
    branches = dbBranches;
  } catch (error) {
    console.warn("DB Connection pooler timed out on NewProductPage, deploying resilient offline fallback catalog metadata:", error);
    categories = [
      { id: "cat-optical", name: "Optical Frames" },
      { id: "cat-sun", name: "Sunglasses" },
      { id: "cat-contact", name: "Contact Lenses" },
      { id: "cat-sol", name: "Lens Solutions" },
      { id: "cat-lux", name: "Luxury Collections" },
      { id: "cat-new", name: "New Arrivals" }
    ];
    brands = [
      "Ray-Ban", "PRADA", "Oakley", "Cartier", "Tom Ford", 
      "Carrera", "Montblanc", "BVLGARI", "Police", "Lacoste", 
      "Dolce & Gabbana", "Calvin Klein", "Diesel", "Vogue Eyewear",
      "Acuvue", "Alcon", "Bausch & Lomb"
    ].map((b, idx) => ({ id: `brd-${idx}`, name: b }));
    branches = [
      "Changanassery", "Thiruvalla", "Kumbanad", "Kothamangalam", 
      "Pandalam", "Kakkanad", "Kottayam", "Ettumanur", 
      "Angamaly", "Irumpanam"
    ].map((br, idx) => ({ id: `br-${idx}`, name: br, slug: br.toLowerCase() }));
  }

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
          branches={branches}
          isBranchAdmin={role === "BRANCH_ADMIN"}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Reveal>
    </div>
  );
}
