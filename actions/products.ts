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
    console.error("❌ Catalog Retrieval Error:", error);
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

  // Safely intercept and map form data to match the strict Prisma schema
  const { 
    images, 
    shortDescription, 
    isBestseller, 
    status,
    initialStock, // Capture stock intelligence
    ...productData 
  } = validated.data;

  const branchId = user.app_metadata?.branchId;

  try {
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
        // Auto-provision branch inventory if initiated by a Branch Admin
        ...(branchId && initialStock !== undefined ? {
          inventory: {
            create: [{
              branchId: branchId,
              quantity: initialStock,
              status: initialStock === 0 ? "OUT_OF_STOCK" : initialStock <= 5 ? "LOW_STOCK" : "IN_STOCK",
            }]
          }
        } : {})
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    return { success: true, id: product.id };
  } catch (err: any) {
    return { error: "Failed to create luxury product protocol" };
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
    initialStock, // Capture stock intelligence from Edit form
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

    // If initiated by a Branch Admin, synchronize their boutique inventory
    if (branchId && initialStock !== undefined) {
      operations.push(
        prisma.inventory.upsert({
          where: { productId_branchId: { productId: id, branchId } },
          update: { 
            quantity: initialStock,
            status: initialStock === 0 ? "OUT_OF_STOCK" : initialStock <= 5 ? "LOW_STOCK" : "IN_STOCK",
          },
          create: {
            productId: id,
            branchId: branchId,
            quantity: initialStock,
            status: initialStock === 0 ? "OUT_OF_STOCK" : initialStock <= 5 ? "LOW_STOCK" : "IN_STOCK",
          }
        })
      );
    }

    await prisma.$transaction(operations);

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (err: any) {
    return { error: "Failed to update luxury product state" };
  }
}

export async function deleteProduct(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    // Soft delete if preferred, but here we do actual deletion as requested for CRUD
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    return { error: "Failed to remove product from catalog" };
  }
}
