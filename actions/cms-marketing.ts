"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

/**
 * SECURE AUTH SERVICE UTILITY
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
 * BANNERS ENDPOINTS — FULLY DATABASE BACKED
 */
export async function getBanners() {
  try {
    return await prisma.banner.findMany({
      orderBy: { order: "asc" }
    });
  } catch (error) {
    console.error("Failed to read banners:", error);
    return [];
  }
}

export async function createBanner(data: {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  branchId?: string; // target branch or "Global"
}) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    const bannersCount = await prisma.banner.count();
    const newBanner = await prisma.banner.create({
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl || null,
        branchId: data.branchId || "Global",
        order: bannersCount,
        isActive: true
      }
    });
    
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true, data: newBanner };
  } catch (error) {
    console.error("Create banner error:", error);
    return { error: "Failed to deploy visual campaign banner" };
  }
}

export async function toggleBannerStatus(id: string, isActive: boolean) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.banner.update({
      where: { id },
      data: { isActive }
    });

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Toggle banner status error:", error);
    return { error: "Failed to transition banner state" };
  }
}

export async function deleteBanner(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.banner.delete({
      where: { id }
    });

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete banner error:", error);
    return { error: "Failed to delete banner protocol" };
  }
}

/**
 * OFFERS ENDPOINTS — FULLY DATABASE BACKED
 */
export async function getOffers() {
  try {
    const dbOffers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" }
    });
    
    return dbOffers.map(o => ({
      id: o.id,
      title: o.title,
      description: o.description,
      percentage: o.percentage,
      branchId: o.branchId,
      startDate: o.startDate || undefined,
      endDate: o.endDate || undefined,
      isActive: o.isActive,
      createdAt: o.createdAt.toISOString()
    }));
  } catch (error) {
    console.error("Failed to read offers:", error);
    return [];
  }
}

export async function createOffer(data: {
  title: string;
  description: string;
  percentage: string;
  branchId?: string; // target specific branch or "Global"
  startDate?: string;
  endDate?: string;
}) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    const newOffer = await prisma.offer.create({
      data: {
        title: data.title,
        description: data.description,
        percentage: data.percentage,
        branchId: data.branchId || "Global",
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        isActive: true
      }
    });

    revalidatePath("/");
    revalidatePath("/shop");
    return { 
      success: true, 
      data: {
        id: newOffer.id,
        title: newOffer.title,
        description: newOffer.description,
        percentage: newOffer.percentage,
        branchId: newOffer.branchId,
        startDate: newOffer.startDate || undefined,
        endDate: newOffer.endDate || undefined,
        isActive: newOffer.isActive,
        createdAt: newOffer.createdAt.toISOString()
      } 
    };
  } catch (error) {
    console.error("Create offer error:", error);
    return { error: "Failed to deploy promotional offer campaign" };
  }
}

export async function toggleOfferStatus(id: string, isActive: boolean) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.offer.update({
      where: { id },
      data: { isActive }
    });

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Toggle offer status error:", error);
    return { error: "Failed to transition campaign state" };
  }
}

export async function deleteOffer(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.offer.delete({
      where: { id }
    });

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete offer error:", error);
    return { error: "Failed to delete offer campaign" };
  }
}
