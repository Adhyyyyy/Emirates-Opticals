"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

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
 * JOBS PROTOCOL (JSON DATA DESCRIPTOR)
 */
const JOBS_FILE_PATH = path.join(process.cwd(), "lib/data/jobs.json");

export async function getJobs() {
  try {
    if (!fs.existsSync(JOBS_FILE_PATH)) {
      return [];
    }
    const rawData = fs.readFileSync(JOBS_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to read jobs", err);
    return [];
  }
}

export async function createJob(data: { title: string; desc: string; requirements: string[] }) {
  const { data: { user } } = await getAuthSession();
  if (!user || (user.app_metadata.role !== "SUPER_ADMIN" && user.app_metadata.role !== "BRANCH_ADMIN")) {
    throw new Error("Unauthorized");
  }

  try {
    const jobs = await getJobs();
    const newJob = {
      id: Date.now().toString(),
      ...data
    };
    jobs.push(newJob);
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), "utf-8");
    
    revalidatePath("/careers");
    return { success: true, id: newJob.id };
  } catch (err) {
    return { error: "Failed to deploy new job description" };
  }
}

export async function deleteJob(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || (user.app_metadata.role !== "SUPER_ADMIN" && user.app_metadata.role !== "BRANCH_ADMIN")) {
    throw new Error("Unauthorized");
  }

  try {
    const jobs = await getJobs();
    const filtered = jobs.filter((job: any) => job.id !== id);
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
    
    revalidatePath("/careers");
    return { success: true };
  } catch (err) {
    return { error: "Failed to delete job protocol" };
  }
}

/**
 * OFFERS PROTOCOL (JSON DATA DESCRIPTOR)
 */
const OFFERS_FILE_PATH = path.join(process.cwd(), "lib/data/offers.json");

export async function getOffers() {
  try {
    if (!fs.existsSync(OFFERS_FILE_PATH)) {
      return [];
    }
    const rawData = fs.readFileSync(OFFERS_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to read offers", err);
    return [];
  }
}

export async function createOffer(data: { title: string; description: string; promoCode: string; discountVal: string }) {
  const { data: { user } } = await getAuthSession();
  if (!user || (user.app_metadata.role !== "SUPER_ADMIN" && user.app_metadata.role !== "BRANCH_ADMIN")) {
    throw new Error("Unauthorized");
  }

  try {
    const offers = await getOffers();
    const newOffer = {
      id: Date.now().toString(),
      ...data,
      isActive: true
    };
    offers.push(newOffer);
    fs.writeFileSync(OFFERS_FILE_PATH, JSON.stringify(offers, null, 2), "utf-8");
    
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true, id: newOffer.id };
  } catch (err) {
    return { error: "Failed to deploy new offer Campaign" };
  }
}

export async function deleteOffer(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || (user.app_metadata.role !== "SUPER_ADMIN" && user.app_metadata.role !== "BRANCH_ADMIN")) {
    throw new Error("Unauthorized");
  }

  try {
    const offers = await getOffers();
    const filtered = offers.filter((offer: any) => offer.id !== id);
    fs.writeFileSync(OFFERS_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
    
    revalidatePath("/");
    revalidatePath("/shop");
    return { success: true };
  } catch (err) {
    return { error: "Failed to delete offer Campaign" };
  }
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
