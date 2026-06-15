import React from "react";
import { DataTable } from "@/components/ui/admin/DataTable";
import { columns, ProductColumn } from "@/features/products/components/columns";
import { Reveal } from "@/components/motion/Reveal";
import { Plus, Check } from "lucide-react";
import Link from "next/link";
import { BulkImportButton } from "@/features/products/components/BulkImportButton";
import { getProducts, deleteProducts } from "@/actions/products";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const success = params?.success;
  
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
      price: item.price || 0,
      status: item.isActive ? "PUBLISHED" : "DRAFT",
      image: item.images[0]?.url || "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600",
      stock: item.inventory?.reduce((acc: number, inv: any) => acc + inv.quantity, 0) || 0,
      branchStock: userInventory ? userInventory.quantity : 0,
      inventoryId: userInventory ? userInventory.id : null,
      isBranchAdmin: isBranchAdmin,
    };
  });

  async function handleDeleteMultiple(ids: string[]) {
    "use server";
    await deleteProducts(ids);
  }

  return (
    <div className="space-y-12 text-black">
      {success && (
        <Reveal>
          <div className="bg-emerald-50/40 border border-emerald-500/20 text-emerald-800 p-6 rounded-2xl flex items-center justify-between gap-4 shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700">System Protocol Completed</p>
                <p className="text-xs font-light text-brand-charcoal/60 mt-1">
                  {success === "created" 
                    ? "The luxury product has been successfully established and populated to the global catalog." 
                    : "The product specifications have been successfully updated and synchronized."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold text-brand-charcoal uppercase tracking-tighter mb-2 font-heading">Global Catalog</h1>
            <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
              Management and synchronization protocol for luxury optical eyewear collections.
            </p>
          </Reveal>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          {isSuperAdmin && (
            <Reveal delay={0.3}>
              <BulkImportButton />
            </Reveal>
          )}
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
        </div>
      </header>

      {/* Main Table Feature */}
      <DataTable columns={columns} data={formattedProducts} searchKey="name" onDeleteSelected={handleDeleteMultiple} />

    </div>
  );
}
