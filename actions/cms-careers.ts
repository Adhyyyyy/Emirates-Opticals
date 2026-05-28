"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
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
 * PATH RESOLVERS FOR JOBS PROTOCOL
 */
const JOBS_FILE_PATH = path.join(process.cwd(), "lib/data/jobs.json");

function ensureJobsFileExists() {
  const dir = path.dirname(JOBS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(JOBS_FILE_PATH)) {
    fs.writeFileSync(JOBS_FILE_PATH, "[]", "utf-8");
  }
}

/**
 * JOBS CRUD ACTIONS
 */
export async function getJobs() {
  try {
    ensureJobsFileExists();
    const rawData = fs.readFileSync(JOBS_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
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
    ensureJobsFileExists();
    const jobs = await getJobs();
    const newJob = {
      id: Date.now().toString(),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    jobs.push(newJob);
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), "utf-8");

    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    return { success: true, data: newJob };
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
    const jobs = await getJobs();
    const updated = jobs.map((j: any) => 
      j.id === id ? { ...j, isActive } : j
    );
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");

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
    const jobs = await getJobs();
    const filtered = jobs.filter((j: any) => j.id !== id);
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");

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
        resumeUrl: data.resumeUrl || "https://emiratesopticians.com/resumes/mock-resume.pdf",
        coverLetter: `Position: ${data.position}\nExperience: ${data.experience}\nLocation: ${data.location}\n\n${data.coverLetter || ""}`,
        branchId: branchId,
        status: "PENDING"
      }
    });

    return { success: true, id: application.id };
  } catch (error) {
    console.warn("âŒ Prisma career application save failed, logging to static storage:", error);
    
    try {
      const applicationsFile = path.join(process.cwd(), "lib/data/applications.json");
      const dir = path.dirname(applicationsFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      
      let apps = [];
      if (fs.existsSync(applicationsFile)) {
        apps = JSON.parse(fs.readFileSync(applicationsFile, "utf-8"));
      }
      
      const newApp = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        status: "PENDING"
      };
      
      apps.push(newApp);
      fs.writeFileSync(applicationsFile, JSON.stringify(apps, null, 2), "utf-8");
      
      return { success: true, staticLogged: true };
    } catch (fsErr) {
      console.error("âŒ FS backup careers application save failed:", fsErr);
      return { error: "Application transmission offline. Please call or WhatsApp us." };
    }
  }
}
