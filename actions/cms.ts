"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * ENTERPRISE CMS ARCHITECTURE
 * Dynamic Content Synchronization Protocol
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
 * BANNERS & HERO SECTIONS
 */
export async function updateBanner(id: string, data: any) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata.role !== "SUPER_ADMIN") throw new Error("Unauthorized");

  try {
    await prisma.banner.update({
      where: { id },
      data: { ...data }
    });
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { error: "Failed to update visual hero protocol" };
  }
}

/**
 * CAMPAIGNS & OFFERS
 */
export async function createCampaign(data: any) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata.role !== "SUPER_ADMIN") throw new Error("Unauthorized");

  try {
    const campaign = await prisma.campaign.create({
      data: { ...data, status: "ACTIVE" }
    });
    revalidatePath("/");
    return { success: true, id: campaign.id };
  } catch (err) {
    return { error: "Campaign deployment failed" };
  }
}

/**
 * TESTIMONIALS & TRUST CMS
 */
export async function toggleContentStatus(type: "banner" | "campaign" | "testimonial", id: string, status: boolean) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata.role !== "SUPER_ADMIN") throw new Error("Unauthorized");

  try {
    const model = (prisma as any)[type];
    await model.update({
      where: { id },
      data: { isActive: status }
    });
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { error: "Dynamic state transition failed" };
  }
}
