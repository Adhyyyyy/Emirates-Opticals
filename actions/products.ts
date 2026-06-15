"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { productSchema } from "@/validations/schemas";
import { redirect } from "next/navigation";

/**
 * ENTERPRISE PRODUCT MANAGEMENT ACTIONS
 * Handles high-fidelity CRUD with role validation
 */

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        images: {
          orderBy: { order: "asc" },
        },
        inventory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { data: products };
  } catch (error) {
    console.error("âŒ Catalog Retrieval Error:", error);
    return { error: "Failed to synchronize global collections" };
  }
}

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

export async function createProduct(data: any) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized Access");
  }

  const validated = productSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const { 
    images, 
    shortDescription, 
    isBestseller, 
    status,
    initialStock = 0,
    selectedBranches = [],
    ...productData 
  } = validated.data;

  const branchId = user.app_metadata?.branchId;

  try {
    // 1. Fetch all active branches dynamically — no hardcoded slug list needed
    const branches = await prisma.branch.findMany({
      where: { deletedAt: null }
    });

    const product = await prisma.product.create({
      data: {
        ...productData,
        isActive: status === "PUBLISHED",
        images: {
          create: images.map((url, index) => ({
            url,
            order: index,
          })),
        },
        inventory: {
          create: branchId
            ? [{
                branchId: branchId,
                quantity: initialStock,
                status: initialStock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
              }]
            : branches.map(b => {
                const isSelected = selectedBranches.length === 0 || selectedBranches.includes(b.id);
                const qty = isSelected ? initialStock : 0;
                return {
                  branchId: b.id,
                  quantity: qty,
                  status: qty > 0 ? "IN_STOCK" : (qty <= 3 ? "LOW_STOCK" : "IN_STOCK"),
                };
              })
        }
      },
    });

    // Sync colors to the master Color registry sequentially to avoid race conditions
    if (productData.colors && productData.colors.length > 0) {
      try {
        for (const c of productData.colors) {
          if (!c) continue;
          const formatted = c.trim().split(/\s+/).map((word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(" ");
          await prisma.color.upsert({
            where: { name: formatted },
            update: {},
            create: { name: formatted }
          });
        }
      } catch (colorSyncErr) {
        console.warn("Failed to sync colors to Color registry:", colorSyncErr);
      }
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/product/[id]", "page");
    return { success: true, id: product.id };
  } catch (err: any) {
    console.error("Create product failed:", err);
    // Provide an actionable error for slug collisions (Prisma unique constraint)
    if (err?.code === "P2002" && err?.meta?.target?.includes("slug")) {
      return { error: "A product with this slug already exists. Please use a unique product name or edit the slug manually." };
    }
    return { error: err?.message || "Failed to save product. Please try again." };
  }
}

export async function updateProduct(id: string, data: any) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  const validated = productSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const { 
    images, 
    shortDescription, 
    isBestseller, 
    status, 
    ...productData 
  } = validated.data;

  const branchId = user.app_metadata?.branchId;

  try {
    const operations: any[] = [
      // Clean old images
      prisma.productImage.deleteMany({ where: { productId: id } }),
      // Update product & Add new images
      prisma.product.update({
        where: { id },
        data: {
          ...productData,
          isActive: status === "PUBLISHED",
          images: {
            create: images.map((url, index) => ({
              url,
              order: index,
            })),
          },
        },
      }),
    ];

    // If initiated by a Branch Admin, synchronize their specific boutique inventory
    if (branchId) {
      operations.push(
        prisma.inventory.upsert({
          where: { productId_branchId: { productId: id, branchId } },
          update: { },
          create: {
            productId: id,
            branchId: branchId,
            quantity: 0,
            status: "IN_STOCK",
          }
        })
      );
    } else if (!branchId) {
      // Super Admin: ensure all active branches have an inventory record
      const branches = await prisma.branch.findMany({ where: { deletedAt: null } });
      for (const b of branches) {
        operations.push(
          prisma.inventory.upsert({
            where: { productId_branchId: { productId: id, branchId: b.id } },
            update: {},
            create: {
              productId: id,
              branchId: b.id,
              quantity: 0,
              status: "OUT_OF_STOCK",
            }
          })
        );
      }
    }

    await prisma.$transaction(operations);

    // Sync colors sequentially to avoid race conditions
    if (productData.colors && productData.colors.length > 0) {
      try {
        for (const c of productData.colors) {
          if (!c) continue;
          const formatted = c.trim().split(/\s+/).map((word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(" ");
          await prisma.color.upsert({
            where: { name: formatted },
            update: {},
            create: { name: formatted }
          });
        }
      } catch (colorSyncErr) {
        console.warn("Failed to sync colors to Color registry:", colorSyncErr);
      }
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/product/[id]", "page");
    return { success: true };
  } catch (err: any) {
    console.error("Update product failed:", err);
    if (err?.code === "P2002" && err?.meta?.target?.includes("slug")) {
      return { error: "A product with this slug already exists. Please use a unique slug." };
    }
    return { error: err?.message || "Failed to update product. Please try again." };
  }
}

export async function deleteProduct(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.$transaction([
      // 1. Delete all product images associated with this asset
      prisma.productImage.deleteMany({ where: { productId: id } }),
      // 2. Delete all boutique inventory instances of this product
      prisma.inventory.deleteMany({ where: { productId: id } }),
      // 3. Gracefully nullify the references in client enquiries rather than breaking history
      prisma.enquiry.updateMany({
        where: { productId: id },
        data: { productId: null }
      }),
      // 4. Safely delete the core product asset
      prisma.product.delete({ where: { id } })
    ]);

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/product", "layout");
    return { success: true };
  } catch (err) {
    console.error("âŒ Single Deletion Failure:", err);
    return { error: "Failed to remove product from catalog" };
  }
}

export async function deleteProducts(ids: string[]) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.$transaction([
      // 1. Delete all product images associated with these assets
      prisma.productImage.deleteMany({ where: { productId: { in: ids } } }),
      // 2. Delete all boutique inventory instances of these products
      prisma.inventory.deleteMany({ where: { productId: { in: ids } } }),
      // 3. Gracefully nullify references in client enquiries
      prisma.enquiry.updateMany({
        where: { productId: { in: ids } },
        data: { productId: null }
      }),
      // 4. Safely delete core product assets in bulk
      prisma.product.deleteMany({ where: { id: { in: ids } } })
    ]);

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/product", "layout");
    return { success: true };
  } catch (err) {
    console.error("âŒ Bulk Deletion Failure:", err);
    return { error: "Failed to remove selected products from catalog" };
  }
}
