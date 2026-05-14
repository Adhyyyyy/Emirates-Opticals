"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * ENTERPRISE ENQUIRY LOGIC
 * Optimized for Multi-Channel Lead Routing
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
 * Public: Log a new enquiry (Product, Branch, or Contact)
 */
export async function createEnquiry(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: "PRODUCT" | "BRANCH" | "GENERAL" | "WHATSAPP";
  branchId: string;
  productId?: string;
  message: string;
}) {
  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        ...data,
        status: "NEW"
      },
    });

    revalidatePath("/admin/enquiries");
    return { success: true, id: enquiry.id };
  } catch (err) {
    return { error: "Lead synchronization failed" };
  }
}

/**
 * Admin: Get enquiries with role-based isolation
 */
export async function getEnquiries(branchId?: string) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  const role = user.app_metadata.role;
  const userBranchId = user.app_metadata.branchId;

  // Logic: Branch Admins only see local leads, Super Admins see global
  const targetBranchId = role === "SUPER_ADMIN" ? branchId : userBranchId;

  try {
    const enquiries = await prisma.enquiry.findMany({
      where: targetBranchId ? { branchId: targetBranchId } : {},
      include: {
        branch: { select: { name: true } },
        product: { select: { name: true, brand: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return { data: enquiries };
  } catch (error) {
    return { error: "Failed to retrieve lead protocol" };
  }
}

/**
 * Admin: Update lead status (e.g., RESPONDED, ARCHIVED)
 */
export async function updateEnquiryStatus(id: string, status: string) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  try {
    await prisma.enquiry.update({
      where: { id },
      data: { status: status as any }
    });

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (err) {
    return { error: "Lead status transition failed" };
  }
}
