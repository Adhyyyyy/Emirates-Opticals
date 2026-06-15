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
  const role = user?.app_metadata?.role;

  let product: any = null;
  let categories: any[] = [];
  let brands: any[] = [];
  let branches: any[] = [];
  let existingColors: string[] = [];

  try {
    const [dbProduct, dbCategories, dbBrands, dbBranches, dbColors] = await Promise.all([
      prisma.product.findUnique({
        where: { id },
        include: { images: { orderBy: { order: "asc" } } }
      }),
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
    product = dbProduct;
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
    console.warn("DB Connection pooler timed out on EditProductPage, deploying resilient fallback:", error);
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
      "Pandalam", "Kottayam", "Ettumanur", 
      "Angamaly", "Irumpanam"
    ].map((br, idx) => ({ id: `br-${idx}`, name: br, slug: br.toLowerCase() }));
    existingColors = ["Black", "Gold", "Silver", "Tortoise", "Brown", "Grey", "Clear", "Blue"];
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-16 text-center bg-white border border-red-500/10 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold uppercase tracking-widest text-red-500">Database Connection Timeout</h2>
        <p className="text-sm text-brand-charcoal/60 leading-relaxed max-w-md mx-auto">
          The Supabase database connection pooler is currently experiencing transient latency or is temporarily asleep. This resolves automatically within a few seconds.
        </p>
        <Link 
          href="/admin/products"
          className="inline-block py-3.5 px-8 bg-brand-charcoal text-brand-gold text-xs uppercase font-bold tracking-widest rounded-[3px]"
        >
          Return to Global Catalog
        </Link>
      </div>
    );
  }

  let currentStock = 0;
  if (branchId) {
    const inventory = await prisma.inventory.findUnique({
      where: { productId_branchId: { productId: id, branchId } }
    });
    if (inventory) currentStock = inventory.quantity;
  } else {
    // If Super Admin, sum up total units across all branches to display a realistic initial value!
    const inventoryAgg = await prisma.inventory.aggregate({
      where: { productId: id },
      _sum: { quantity: true }
    });
    currentStock = inventoryAgg._sum.quantity || 0;
  }

  // Transform Prisma output back into Form expected format
  const initialData = {
    ...product,
    status: product.isActive ? "PUBLISHED" : "DRAFT",
    images: product.images.map((img: any) => img.url),
    initialStock: currentStock,
  };

  async function handleSubmit(data: any) {
    "use server";
    const result = await updateProduct(id, data);
    if (result.success) {
      redirect("/admin/products?success=updated");
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
