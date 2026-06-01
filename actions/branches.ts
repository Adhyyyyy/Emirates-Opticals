"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function getBranches() {
  try {
    const branches = await prisma.branch.findMany({
      where: { 
        deletedAt: null,
        slug: {
          in: [
            "changanassery", "thiruvalla", "kumbanad", 
            "kothamangalam", "pandalam", 
            "kottayam", "ettumanur", "angamaly", "irumpanam"
          ]
        }
      },
      orderBy: { createdAt: "asc" }
    });
    return { data: branches };
  } catch (error) {
    return { error: "Failed to fetch branches" };
  }
}

export async function createBranch(formData: {
  name: string;
  slug?: string;
  address: string;
  location: string;
  phone: string;
  whatsapp: string;
  email?: string;
  timings?: string;
  coordinates?: string;
  images?: string[];
  isMain?: boolean;
  isActive?: boolean;
}) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  const role = user.app_metadata?.role;
  if (role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized: Super Admin access required");
  }

  try {
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
    const branch = await prisma.branch.create({
      data: {
        ...formData,
        slug,
        images: formData.images || ["https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=600"]
      }
    });

    revalidatePath("/admin/branches");
    revalidatePath("/branches");
    return { success: true, data: branch };
  } catch (error) {
    console.error("Create branch error:", error);
    return { error: "Failed to establish new boutique registry" };
  }
}

export async function updateBranch(id: string, formData: {
  name?: string;
  slug?: string;
  address?: string;
  location?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  timings?: string;
  coordinates?: string;
  images?: string[];
  isMain?: boolean;
  isActive?: boolean;
}) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  const role = user.app_metadata?.role;
  if (role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const branch = await prisma.branch.update({
      where: { id },
      data: formData
    });

    revalidatePath("/admin/branches");
    revalidatePath("/branches");
    return { success: true, data: branch };
  } catch (error) {
    console.error("Update branch error:", error);
    return { error: "Failed to update boutique record" };
  }
}

export async function deleteBranch(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  const role = user.app_metadata?.role;
  if (role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // Soft delete support
    await prisma.branch.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }
    });

    revalidatePath("/admin/branches");
    revalidatePath("/branches");
    return { success: true };
  } catch (error) {
    console.error("Delete branch error:", error);
    return { error: "Failed to decommission boutique registry" };
  }
}
