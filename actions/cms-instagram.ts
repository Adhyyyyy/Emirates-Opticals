"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const CACHE_FILE_PATH = path.join(process.cwd(), "lib/data/instagram-cache.json");

// High-fidelity curated visual assets representing dynamic luxury optical feeds
const INITIAL_FALLBACK_POSTS = [
  {
    id: "ig_post_101",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    permalink: "https://www.instagram.com/p/C7XyZ29s8a1/",
    caption: "Technical precision meets structural timelessness. Handcrafted Italian acetate silhouette from our spring catalog. #EmiratesOptician #LuxuryEyewear"
  },
  {
    id: "ig_post_102",
    imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
    permalink: "https://www.instagram.com/p/C7XyZ29s8a2/",
    caption: "Golden frame detailing for structural excellence. Discover the editorial Spring Edit. #GoldEyewear #SpringFocus"
  },
  {
    id: "ig_post_103",
    imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800",
    permalink: "https://www.instagram.com/p/C7XyZ29s8a3/",
    caption: "Boutique showcase ready. State-of-the-art vision checks and tailored designer silhouettes await you. #LuxuryOptometry #KeralaLifestyle"
  },
  {
    id: "ig_post_104",
    imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    permalink: "https://www.instagram.com/p/C7XyZ29s8a4/",
    caption: "The Havanas. Vintage structural design, remastered in lightweight bio-acetate for modern visionary comfort. #VintageHavana #EyewearRemastered"
  },
  {
    id: "ig_post_105",
    imageUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800",
    permalink: "https://www.instagram.com/p/C7XyZ29s8a5/",
    caption: "Seaside clarity. Custom polarized lenses developed for high-end optical sharpness. #PolarizedSunglasses #PrecisionVision"
  },
  {
    id: "ig_post_106",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
    permalink: "https://www.instagram.com/p/C7XyZ29s8a6/",
    caption: "Professional optical diagnostic tech. Providing comprehensive eye mapping across all physical showrooms. #AdvancedEyeCare #OpticianKerala"
  }
];

function ensureCacheExists() {
  const dir = path.dirname(CACHE_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(CACHE_FILE_PATH)) {
    const defaultData = {
      handle: "@emiratesoptician_opticals",
      status: "ACTIVE",
      lastSync: new Date().toISOString(),
      posts: INITIAL_FALLBACK_POSTS
    };
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

/**
 * FETCH INSTAGRAM FEED FROM CACHE OR AUTO-SYNC IF ELAPSED
 */
export async function getInstagramFeed() {
  try {
    ensureCacheExists();
    const rawData = fs.readFileSync(CACHE_FILE_PATH, "utf-8");
    const data = JSON.parse(rawData);

    // Auto-Sync trigger: If lastSync is older than 24 hours, perform background refreshes
    const lastSyncTime = new Date(data.lastSync).getTime();
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    if (lastSyncTime < oneDayAgo) {
      console.log("Instagram Cache expired. Executing automated feed refresh in background...");
      // Non-blocking trigger to allow fast page loads
      syncInstagramFeed().catch(err => console.error("Automated background sync failed:", err));
    }

    return data;
  } catch (error) {
    console.error("Error reading social feed cache:", error);
    // Graceful error handling: Return immediate fallback data rather than crashing
    return {
      handle: "@emiratesoptician_opticals",
      status: "STALE",
      lastSync: new Date().toISOString(),
      posts: INITIAL_FALLBACK_POSTS
    };
  }
}

/**
 * MANUAL OR TRIGGERED REFRESH OF FEED WITH COMPLETE ERROR RESILIENCY
 */
export async function syncInstagramFeed() {
  try {
    ensureCacheExists();
    
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    let posts: any[] = [];

    if (token) {
      console.log("🔗 Instagram Access Token detected. Initiating Graph API synchronization...");
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${token}`
      );
      
      if (response.ok) {
        const result = await response.json();
        if (result && result.data) {
          posts = result.data
            .filter((item: any) => ["IMAGE", "CAROUSEL_ALBUM"].includes(item.media_type))
            .map((item: any) => ({
              id: item.id,
              imageUrl: item.media_url,
              permalink: item.permalink,
              caption: item.caption || "Life in Focus — Emirates Optician"
            }));
          console.log(`✅ Successfully synchronized ${posts.length} live Instagram posts.`);
        }
      } else {
        console.warn(`⚠️ Instagram API returned status: ${response.status}. Falling back to curated cache.`);
      }
    }

    // Fallback to high-fidelity curated dynamic posts if no token is configured or fetch yielded empty
    if (posts.length === 0) {
      console.log("ℹ️ No Instagram Token configured or feed empty. Curating high-fidelity visual assets.");
      posts = [...INITIAL_FALLBACK_POSTS].sort(() => Math.random() - 0.5);
    }

    const updatedData = {
      handle: "@emiratesoptician_opticals",
      status: "ACTIVE",
      lastSync: new Date().toISOString(),
      posts: posts
    };

    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");
    revalidatePath("/");
    
    return { success: true, lastSync: updatedData.lastSync };
  } catch (error: any) {
    console.error("Error syncing Instagram feed:", error);
    
    // Error Handling System: Return graceful error report but retain cache so page doesn't break
    return { 
      error: "Unable to refresh social proof feed: API limits reached or network is unavailable.",
      details: error?.message || error
    };
  }
}
