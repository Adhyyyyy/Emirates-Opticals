import React from "react";
import { DataTable } from "@/components/ui/admin/DataTable";
import { columns, ProductColumn } from "@/features/products/components/columns";
import { Reveal } from "@/components/motion/Reveal";
import { Plus } from "lucide-react";
import Link from "next/link";



import { getProducts } from "@/actions/products";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const { data: products, error } = await getProducts();
  
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  const isSuperAdmin = user?.app_metadata?.role === "SUPER_ADMIN";
  const isBranchAdmin = user?.app_metadata?.role === "BRANCH_ADMIN";
  const branchId = user?.app_metadata?.branchId;
  
  const formattedProducts: ProductColumn[] = (products || []).map((item: any) => {
    const userInventory = branchId ? item.inventory?.find((inv: any) => inv.branchId === branchId) : null;
    return {
      id: item.id,
      name: item.name,
      brand: item.brand?.name || "Independent",
      price: item.price,
      status: item.status,
      image: item.images[0]?.url || "",
      stock: item.inventory?.reduce((acc: number, inv: any) => acc + inv.quantity, 0) || 0,
      branchStock: userInventory ? userInventory.quantity : 0,
      inventoryId: userInventory ? userInventory.id : null,
      isBranchAdmin: isBranchAdmin,
    };
  });

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2">Global Catalog</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Management and synchronization protocol for luxury optical eyewear collections.
            </p>
          </Reveal>
        </div>
        
        {(isSuperAdmin || isBranchAdmin) && (
          <Reveal delay={0.4}>
            <Link 
              href="/admin/products/new"
              className="px-10 py-5 bg-brand-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-gold transition-all duration-700 shadow-2xl group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500" />
              Establish New Product
            </Link>
          </Reveal>
        )}
      </header>

      {/* Main Table Feature */}
      <DataTable columns={columns} data={formattedProducts} searchKey="name" />

    </div>
  );
}

