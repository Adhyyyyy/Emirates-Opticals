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
  let existingColors: string[] = [];

  try {
    const [dbCategories, dbBrands, dbBranches, dbColors] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.brand.findMany({ orderBy: { name: "asc" } }),
      prisma.branch.findMany({ 
        where: { 
          deletedAt: null,
          slug: {
            in: [
              "changanassery", "thiruvalla", "kumbanad", 
              "kothamangalam", "pandalam", 
              "kottayam", "ettumanur", "angamaly", "irumpanam"
            ]
          }
        }, 
        orderBy: { name: "asc" } 
      }),
      prisma.color.findMany({
        orderBy: { name: "asc" }
      })
    ]);
    categories = dbCategories;
    brands = dbBrands;
    branches = dbBranches;

    const defaultColors = [
      "Glossy Black", "Matte Black", "Tortoise Shell", "Dark Havana", "Light Havana",
      "Clear Crystal", "Champagne", "Shiny Gold", "Matte Gold", "Shiny Silver",
      "Matte Silver", "Rose Gold", "Gunmetal", "Brushed Platinum", "Bronze",
      "Navy Blue", "Forest Green", "Emerald Green", "Burgundy", "Amber",
      "Honey", "G-15 Green", "Grey Gradient", "Brown Gradient", "Blue Mirror",
      "Silver Mirror", "Gold Mirror", "Pink Gradient", "Clear", "Pure Hazel",
      "Gemstone Green", "Brilliant Blue", "Sterling Gray", "True Sapphire",
      "Turquoise", "Amethyst"
    ];
    const colorsSet = new Set([...defaultColors, ...dbColors.map(c => c.name)]);
    existingColors = Array.from(colorsSet).sort();
  } catch (error) {
    console.warn("DB Connection pooler timed out on NewProductPage, deploying resilient offline fallback catalog metadata:", error);
    categories = [
      { id: "cat-optical", name: "Optical Frames" },
      { id: "cat-sun", name: "Sunglasses" },
      { id: "cat-contact", name: "Contact Lenses" },
      { id: "cat-sol", name: "Lens Solutions" },
      { id: "cat-lux", name: "Luxury Collections" },
      { id: "cat-new", name: "New Arrivals" },
      { id: "cat-clipon", name: "Clip-On Glasses" }
    ];
    brands = [
      "Ray-Ban", "PRADA", "Oakley", "Cartier", "Tom Ford", 
      "Carrera", "Montblanc", "BVLGARI", "Police", "Lacoste", 
      "Dolce & Gabbana", "Calvin Klein", "Diesel", "Vogue Eyewear",
      "Maui Jim", "Tommy Hilfiger", "Emporio Armani", "Armani Exchange", "Stepper",
      "Acuvue", "Alcon", "Bausch & Lomb"
    ].map((b, idx) => ({ id: `brd-${idx}`, name: b }));
    branches = [
      "Changanassery", "Thiruvalla", "Kumbanad", "Kothamangalam", 
      "Pandalam", "Kottayam", "Ettumanur", 
      "Angamaly", "Irumpanam"
    ].map((br, idx) => ({ id: `br-${idx}`, name: br, slug: br.toLowerCase() }));
    existingColors = ["Black", "Gold", "Silver", "Tortoise", "Brown", "Grey", "Clear", "Blue"];
  }

  async function handleSubmit(data: any) {
    "use server";
    const result = await createProduct(data);
    if (result.success) {
      redirect("/admin/products?success=created");
    }
    return result; // Return error back to form so it can be displayed
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
          existingColors={existingColors}
          isBranchAdmin={role === "BRANCH_ADMIN"}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Reveal>
    </div>
  );
}
