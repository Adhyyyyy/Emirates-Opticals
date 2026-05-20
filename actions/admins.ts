"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

// Activity log file path
const LOGS_FILE_PATH = path.join(process.cwd(), "lib/data/activity-logs.json");

/**
 * AUTH SYSTEM SECURE DESTRUCTOR
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
 * ACTIVITY LOGGER PROTOCOL
 */
export async function logActivity(action: string, details: string) {
  try {
    const dirPath = path.dirname(LOGS_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let logs = [];
    if (fs.existsSync(LOGS_FILE_PATH)) {
      const rawData = fs.readFileSync(LOGS_FILE_PATH, "utf-8");
      logs = JSON.parse(rawData);
    }

    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      details
    };

    logs.push(newLog);
    // Keep a maximum of 200 logs
    if (logs.length > 200) {
      logs.shift();
    }

    fs.writeFileSync(LOGS_FILE_PATH, JSON.stringify(logs, null, 2), "utf-8");
    return { success: true };
  } catch (err) {
    console.error("Activity logging failed:", err);
    return { error: "Failed to write audit logs" };
  }
}

export async function getActivityLogs() {
  try {
    if (!fs.existsSync(LOGS_FILE_PATH)) {
      return [];
    }
    const rawData = fs.readFileSync(LOGS_FILE_PATH, "utf-8");
    const logs = JSON.parse(rawData);
    // Return sorted newest first
    return logs.reverse();
  } catch (err) {
    console.error("Activity logs read failed:", err);
    return [];
  }
}

/**
 * BRANCH ADMIN REGISTRY MANAGEMENT
 */
export async function getAdmins() {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const admins = await prisma.user.findMany({
      where: {
        role: {
          in: ["SUPER_ADMIN", "BRANCH_ADMIN", "STAFF"]
        },
        deletedAt: null
      },
      include: {
        branch: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return { data: admins };
  } catch (error) {
    console.error("Fetch admins failed:", error);
    return { error: "Failed to retrieve administrator directory" };
  }
}

export async function createBranchAdmin(data: {
  email: string;
  name: string;
  role: "BRANCH_ADMIN" | "STAFF";
  branchId: string;
}) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Verify branch exists
    const branch = await prisma.branch.findUnique({
      where: { id: data.branchId }
    });
    if (!branch) {
      return { error: "Target branch not found in registry" };
    }

    // 2. Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });

    let adminRecord;
    if (existing) {
      // Elevate existing user
      adminRecord = await prisma.user.update({
        where: { email: data.email },
        data: {
          name: data.name,
          role: data.role,
          branchId: data.branchId,
          deletedAt: null
        }
      });
    } else {
      // Create new database record
      adminRecord = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role,
          branchId: data.branchId
        }
      });
    }

    // 3. Log the creation event
    await logActivity(
      "ADMIN_CREATED",
      `Super Admin created account for ${data.name} (${data.email}) assigned to branch: ${branch.name}`
    );

    revalidatePath("/admin/admins");
    return { success: true, data: adminRecord };
  } catch (error) {
    console.error("Create branch admin failed:", error);
    return { error: "Failed to establish new admin record" };
  }
}

export async function toggleAdminStatus(id: string, active: boolean, previousRole: "BRANCH_ADMIN" | "STAFF") {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!targetUser) {
      return { error: "Target user not found" };
    }

    // Disable access by resetting their role to CUSTOMER (RBAC blocks them)
    const targetRole = active ? previousRole : "CUSTOMER";

    await prisma.user.update({
      where: { id },
      data: { role: targetRole }
    });

    // Log status change
    await logActivity(
      "ADMIN_STATUS_CHANGED",
      `Super Admin toggled access status for ${targetUser.name} (${targetUser.email}) to: ${active ? "ENABLED" : "DISABLED"}`
    );

    revalidatePath("/admin/admins");
    return { success: true };
  } catch (error) {
    console.error("Toggle admin status failed:", error);
    return { error: "Failed to modify administrator privileges" };
  }
}

export async function deleteAdmin(id: string) {
  const { data: { user } } = await getAuthSession();
  if (!user || user.app_metadata?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!targetUser) {
      return { error: "Target user not found" };
    }

    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), role: "CUSTOMER" }
    });

    await logActivity(
      "ADMIN_DELETED",
      `Super Admin deleted account and revoked credentials for ${targetUser.name} (${targetUser.email})`
    );

    revalidatePath("/admin/admins");
    return { success: true };
  } catch (error) {
    console.error("Delete admin failed:", error);
    return { error: "Failed to remove administrator account" };
  }
}
