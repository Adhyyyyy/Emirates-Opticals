"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

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
 * PATH RESOLVERS FOR MARKETING PROTOCOLS
 */
const BANNERS_FILE_PATH = path.join(process.cwd(), "lib/data/banners.json");
const OFFERS_FILE_PATH = path.join(process.cwd(), "lib/data/offers.json");

// Helper to ensure files exist
function ensureFileExists(filePath: string, defaultContent: string = "[]") {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, "utf-8");
  }
}

/**
 * BANNERS ENDPOINTS
 */
export async function getBanners() {
  try {
    ensureFileExists(BANNERS_FILE_PATH, "[]");
    const rawData = fs.readFileSync(BANNERS_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
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
    ensureFileExists(BANNERS_FILE_PATH, "[]");
    const banners = await getBanners();
    const newBanner = {
      id: Date.now().toString(),
      ...data,
      order: banners.length,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    banners.push(newBanner);
    fs.writeFileSync(BANNERS_FILE_PATH, JSON.stringify(banners, null, 2), "utf-8");

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
    const banners = await getBanners();
    const updated = banners.map((b: any) => 
      b.id === id ? { ...b, isActive } : b
    );
    fs.writeFileSync(BANNERS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");

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
    const banners = await getBanners();
    const filtered = banners.filter((b: any) => b.id !== id);
    fs.writeFileSync(BANNERS_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete banner error:", error);
    return { error: "Failed to delete banner protocol" };
  }
}

/**
 * OFFERS ENDPOINTS
 */
export async function getOffers() {
  try {
    ensureFileExists(OFFERS_FILE_PATH, "[]");
    const rawData = fs.readFileSync(OFFERS_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Failed to read offers:", error);
    return [];
  }
}

export async function createOffer(data: {
  title: string;
  description: string;
  promoCode: string;
  discountVal: string;
  branchId?: string; // target specific branch or "Global"
  startDate?: string;
  endDate?: string;
}) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    ensureFileExists(OFFERS_FILE_PATH, "[]");
    const offers = await getOffers();
    const newOffer = {
      id: Date.now().toString(),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    offers.push(newOffer);
    fs.writeFileSync(OFFERS_FILE_PATH, JSON.stringify(offers, null, 2), "utf-8");

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true, data: newOffer };
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
    const offers = await getOffers();
    const updated = offers.map((o: any) => 
      o.id === id ? { ...o, isActive } : o
    );
    fs.writeFileSync(OFFERS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");

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
    const offers = await getOffers();
    const filtered = offers.filter((o: any) => o.id !== id);
    fs.writeFileSync(OFFERS_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");

    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete offer error:", error);
    return { error: "Failed to delete offer campaign" };
  }
}
