"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * SECURE AUTH RETRIEVER
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

/**
 * CATEGORIES MANAGEMENT
 */
export async function createCategory(data: { name: string; description?: string }) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description
      }
    });

    revalidatePath("/admin/collections");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true, data: category };
  } catch (error: any) {
    console.error("Create category error:", error);
    return { error: "Failed to create category. A duplicate slug may exist." };
  }
}

export async function deleteCategory(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // Check if category has dependent products
    const productCount = await prisma.product.count({
      where: { categoryId: id }
    });

    if (productCount > 0) {
      return { error: `Cannot delete category. It currently has ${productCount} assigned products.` };
    }

    await prisma.category.delete({
      where: { id }
    });

    revalidatePath("/admin/collections");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return { error: "Failed to remove category" };
  }
}

/**
 * BRANDS MANAGEMENT
 */
export async function createBrand(data: { name: string; description?: string; country?: string }) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    
    const brand = await prisma.brand.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        country: data.country
      }
    });

    revalidatePath("/admin/collections");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true, data: brand };
  } catch (error) {
    console.error("Create brand error:", error);
    return { error: "Failed to create brand. A duplicate slug may exist." };
  }
}

export async function deleteBrand(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // Check dependent products
    const productCount = await prisma.product.count({
      where: { brandId: id }
    });

    if (productCount > 0) {
      return { error: `Cannot delete brand. It currently has ${productCount} assigned products.` };
    }

    await prisma.brand.delete({
      where: { id }
    });

    revalidatePath("/admin/collections");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete brand error:", error);
    return { error: "Failed to remove brand" };
  }
}

/**
 * SMART BULK PRODUCT IMPORT ENGINE
 */
export async function bulkImportProducts(products: any[]) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  if (!Array.isArray(products) || products.length === 0) {
    return { error: "Provided input must be a non-empty array of products." };
  }

  try {
    let importedCount = 0;
    const defaultBranch = await prisma.branch.findFirst({
      where: { deletedAt: null }
    });

    // We run the imports in a strict transactional cycle
    const results = await prisma.$transaction(async (tx) => {
      const createdProducts = [];

      for (const item of products) {
        if (!item.name || !item.price || !item.brandName || !item.categoryName) {
          throw new Error(`Incomplete parameters on item: ${JSON.stringify(item)}`);
        }

        // 1. Resolve Brand
        let brandSlug = item.brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        let brand = await tx.brand.findUnique({
          where: { slug: brandSlug }
        });
        if (!brand) {
          brand = await tx.brand.create({
            data: { name: item.brandName, slug: brandSlug }
          });
        }

        // 2. Resolve Category
        let categorySlug = item.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        let category = await tx.category.findUnique({
          where: { slug: categorySlug }
        });
        if (!category) {
          category = await tx.category.create({
            data: { name: item.categoryName, slug: categorySlug }
          });
        }

        // 3. Generate unique product slug
        let baseSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        let productSlug = baseSlug;
        let suffix = 1;
        while (await tx.product.findUnique({ where: { slug: productSlug } })) {
          productSlug = `${baseSlug}-${suffix}`;
          suffix++;
        }

        // 4. Create Product image array
        const imagesToCreate = Array.isArray(item.images) && item.images.length > 0 
          ? item.images 
          : ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600"];

        // 5. Create Product
        const product = await tx.product.create({
          data: {
            name: item.name,
            slug: productSlug,
            description: item.description || "Crafted luxury eyewear.",
            price: Number(item.price),
            gender: item.gender || "UNISEX",
            frameShape: item.frameShape || "",
            material: item.material || "",
            lensType: item.lensType || "",
            color: item.color || "",
            size: item.size || "",
            brandId: brand.id,
            categoryId: category.id,
            isActive: true,
            images: {
              create: imagesToCreate.map((url: string, index: number) => ({
                url,
                order: index
              }))
            }
          }
        });

        // 6. Optionally provision stock
        const stockQty = item.initialStock !== undefined ? Number(item.initialStock) : 0;
        if (defaultBranch && stockQty > 0) {
          await tx.inventory.create({
            data: {
              productId: product.id,
              branchId: defaultBranch.id,
              quantity: stockQty,
              status: stockQty <= 5 ? "LOW_STOCK" : "IN_STOCK"
            }
          });
        }

        createdProducts.push(product);
      }

      return createdProducts;
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/inventory");
    revalidatePath("/shop");
    
    return { success: true, count: results.length };
  } catch (error: any) {
    console.error("Bulk import failed:", error);
    return { error: error.message || "Failed to parse and bulk-seed global catalog items" };
  }
}
