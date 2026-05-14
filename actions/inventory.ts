"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { canAccessRoute } from "@/lib/auth/rbac";

/**
 * ENTERPRISE INVENTORY LOGIC
 * Optimized for Multi-Branch Isolation & Super Admin Visibility
 */

async function getAuthSession() {
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
  return await supabase.auth.getUser();
}

export async function getInventory(branchId?: string) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  const role = user.app_metadata.role;
  const userBranchId = user.app_metadata.branchId;

  // Logic: Branch Admins can only see their branch. Super Admins can see all or filter by branch.
  const targetBranchId = role === "SUPER_ADMIN" ? branchId : userBranchId;

  try {
    const inventory = await prisma.inventory.findMany({
      where: targetBranchId ? { branchId: targetBranchId } : {},
      include: {
        product: {
          select: {
            name: true,
            brand: true,
            sku: true, // Assuming SKU exists or is added
            price: true,
            images: { take: 1 }
          }
        },
        branch: {
          select: { name: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return { data: inventory };
  } catch (error) {
    return { error: "Failed to sync inventory state" };
  }
}

export async function updateStockLevel(id: string, newQuantity: number) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  try {
    // Determine status based on quantity
    let status = "IN_STOCK";
    if (newQuantity === 0) status = "OUT_OF_STOCK";
    else if (newQuantity <= 5) status = "LOW_STOCK";

    await prisma.inventory.update({
      where: { id },
      data: { 
        quantity: newQuantity,
        status: status as any
      }
    });

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error) {
    return { error: "Adjustment protocol failed" };
  }
}

export async function initializeBranchStock(productId: string, quantity: number) {
  const { data: { user } } = await getAuthSession();
  if (!user || !user.app_metadata.branchId) {
    throw new Error("Boutique Authentication Required");
  }

  const branchId = user.app_metadata.branchId;

  try {
    const inventory = await prisma.inventory.upsert({
      where: {
        productId_branchId: {
          productId,
          branchId,
        },
      },
      update: {
        quantity,
        status: quantity === 0 ? "OUT_OF_STOCK" : quantity <= 5 ? "LOW_STOCK" : "IN_STOCK",
      },
      create: {
        productId,
        branchId,
        quantity,
        status: quantity === 0 ? "OUT_OF_STOCK" : quantity <= 5 ? "LOW_STOCK" : "IN_STOCK",
      },
    });

    revalidatePath("/admin/inventory");
    return { success: true, id: inventory.id };
  } catch (err) {
    return { error: "Failed to initialize boutique stock node" };
  }
}
