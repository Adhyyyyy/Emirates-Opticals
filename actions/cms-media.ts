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
 * PATH RESOLVERS FOR CENTRAL MEDIA PROTOCOL
 */
const MEDIA_FILE_PATH = path.join(process.cwd(), "lib/data/media-library.json");

// Pre-seeded stunning luxury optical visual assets to guarantee immediate design richness
const INITIAL_PRE_SEEDED_MEDIA = [
  {
    id: "m_seed_101",
    name: "Summer Havana Eyewear banner.webp",
    url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    folder: "Banners",
    size: "142 KB",
    type: "image/webp",
    createdAt: new Date().toISOString()
  },
  {
    id: "m_seed_102",
    name: "Prada Black Acetate Frame.webp",
    url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    folder: "Products",
    size: "86 KB",
    type: "image/webp",
    createdAt: new Date().toISOString()
  },
  {
    id: "m_seed_103",
    name: "RayBan Classic Aviator gold.webp",
    url: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
    folder: "Products",
    size: "94 KB",
    type: "image/webp",
    createdAt: new Date().toISOString()
  },
  {
    id: "m_seed_104",
    name: "Thiruvalla Showroom Boutique Entrance.webp",
    url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    folder: "Branches",
    size: "210 KB",
    type: "image/webp",
    createdAt: new Date().toISOString()
  },
  {
    id: "m_seed_105",
    name: "Cinematic Sunglasses Seaside.webp",
    url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800",
    folder: "Marketing",
    size: "115 KB",
    type: "image/webp",
    createdAt: new Date().toISOString()
  }
];

function ensureMediaFileExists() {
  const dir = path.dirname(MEDIA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(MEDIA_FILE_PATH)) {
    fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(INITIAL_PRE_SEEDED_MEDIA, null, 2), "utf-8");
  }
}

/**
 * MEDIA LIBRARY ENDPOINTS
 */
export async function getMediaLibrary() {
  try {
    ensureMediaFileExists();
    const rawData = fs.readFileSync(MEDIA_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Failed to read media library registry:", error);
    return INITIAL_PRE_SEEDED_MEDIA;
  }
}

export async function registerMediaAsset(data: {
  name: string;
  url: string;
  folder: string;
  size: string;
  type: string;
}) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    ensureMediaFileExists();
    const media = await getMediaLibrary();
    const newAsset = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };

    media.unshift(newAsset); // Add to the front of list
    fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(media, null, 2), "utf-8");

    revalidatePath("/admin/media");
    return { success: true, data: newAsset };
  } catch (error) {
    console.error("Register media error:", error);
    return { error: "Failed to register media asset" };
  }
}

export async function deleteMediaAsset(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || !["SUPER_ADMIN", "BRANCH_ADMIN"].includes(user.app_metadata?.role)) {
    throw new Error("Unauthorized");
  }

  try {
    const media = await getMediaLibrary();
    const filtered = media.filter((m: any) => m.id !== id);
    fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");

    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    console.error("Delete media error:", error);
    return { error: "Failed to delete media asset" };
  }
}
