"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { appointmentSchema } from "@/validations/schemas";

/**
 * ENTERPRISE APPOINTMENT LOGIC
 * Optimized for Branch Isolation & Super Admin Visibility
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
 * Public: Book an eye test
 */
export async function createAppointment(data: any) {
  const validated = appointmentSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  try {
    const appointment = await prisma.appointment.create({
      data: validated.data,
    });

    revalidatePath("/admin/appointments");
    return { success: true, id: appointment.id };
  } catch (err) {
    return { error: "Booking synchronization failed" };
  }
}

/**
 * Admin: Get appointments with role-based isolation
 */
export async function getAppointments(branchId?: string) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  const role = user.app_metadata.role;
  const userBranchId = user.app_metadata.branchId;

  // Logic: Branch Admins restricted, Super Admins have global view
  const targetBranchId = role === "SUPER_ADMIN" ? branchId : userBranchId;

  try {
    const appointments = await prisma.appointment.findMany({
      where: targetBranchId ? { branchId: targetBranchId } : {},
      include: {
        branch: { select: { name: true } }
      },
      orderBy: { date: "desc" }
    });

    return { data: appointments };
  } catch (error) {
    return { error: "Failed to retrieve consultation requests" };
  }
}

/**
 * Admin: Update appointment status
 */
export async function updateAppointmentStatus(id: string, status: string) {
  const { data: { user } } = await getAuthSession();
  if (!user) throw new Error("Unauthorized");

  try {
    await prisma.appointment.update({
      where: { id },
      data: { status: status as any }
    });

    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (err) {
    return { error: "Status update protocol failed" };
  }
}
