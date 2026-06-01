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
 * JOBS CRUD ACTIONS — FULLY DATABASE BACKED
 */
export async function getJobs() {
  try {
    const dbJobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" }
    });
    
    return dbJobs.map(j => ({
      id: j.id,
      title: j.title,
      desc: j.desc,
      requirements: j.requirements,
      branchId: j.branchId,
      googleFormUrl: j.googleFormUrl || undefined,
      expiryDate: j.expiryDate || undefined,
      isActive: j.isActive,
      createdAt: j.createdAt.toISOString()
    }));
  } catch (error) {
    console.error("Failed to read jobs registry:", error);
    return [];
  }
}

export async function createJob(data: {
  title: string;
  desc: string;
  requirements: string[];
  branchId?: string;       // target specific branch or "Global"
  googleFormUrl?: string;  // application link
  expiryDate?: string;     // job expiration scheduling
}) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    const newJob = await prisma.job.create({
      data: {
        title: data.title,
        desc: data.desc,
        requirements: data.requirements,
        branchId: data.branchId || "Global",
        googleFormUrl: data.googleFormUrl || null,
        expiryDate: data.expiryDate || null,
        isActive: true
      }
    });

    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    
    return { 
      success: true, 
      data: {
        id: newJob.id,
        title: newJob.title,
        desc: newJob.desc,
        requirements: newJob.requirements,
        branchId: newJob.branchId,
        googleFormUrl: newJob.googleFormUrl || undefined,
        expiryDate: newJob.expiryDate || undefined,
        isActive: newJob.isActive,
        createdAt: newJob.createdAt.toISOString()
      } 
    };
  } catch (error) {
    console.error("Create job error:", error);
    return { error: "Failed to publish job opening" };
  }
}

export async function toggleJobStatus(id: string, isActive: boolean) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.job.update({
      where: { id },
      data: { isActive }
    });

    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    return { success: true };
  } catch (error) {
    console.error("Toggle job status error:", error);
    return { error: "Failed to transition job opening status" };
  }
}

export async function deleteJob(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.job.delete({
      where: { id }
    });

    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    return { success: true };
  } catch (error) {
    console.error("Delete job error:", error);
    return { error: "Failed to remove job opening" };
  }
}

export async function applyForJob(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  preferredBranch?: string;
  resumeUrl?: string;
  coverLetter?: string;
}) {
  try {
    let branchId = null;
    if (data.preferredBranch && data.preferredBranch !== "Any branch / No preference") {
      const branchObj = await prisma.branch.findFirst({
        where: { name: { contains: data.preferredBranch, mode: "insensitive" } }
      });
      if (branchObj) branchId = branchObj.id;
    }

    const application = await prisma.careerApplication.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        resumeUrl: data.resumeUrl || "https://emiratesoptician.in/resumes/mock-resume.pdf",
        coverLetter: `Position: ${data.position}\nExperience: ${data.experience}\nLocation: ${data.location}\n\n${data.coverLetter || ""}`,
        branchId: branchId,
        status: "PENDING"
      }
    });

    return { success: true, id: application.id };
  } catch (error) {
    console.error("❌ Prisma career application save failed:", error);
    return { error: "Application transmission offline. Please call or WhatsApp us." };
  }
}
