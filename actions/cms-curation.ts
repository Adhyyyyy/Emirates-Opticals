"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * AUTH SERVICE UTILITY
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
 * COLLECTION & CONTENT CURATION (POSTGRES DB DIALECT)
 */
export async function toggleCollectionStatus(id: string, field: "isFeatured" | "isNewArrival", value: boolean) {
  const { data: { user } } = await getAuthSession();
  if (!user || (user.app_metadata.role !== "SUPER_ADMIN" && user.app_metadata.role !== "BRANCH_ADMIN")) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.product.update({
      where: { id },
      data: { [field]: value }
    });
    
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (err) {
    console.error("Collection toggle failure", err);
    return { error: "Failed to curate collection toggle" };
  }
}
