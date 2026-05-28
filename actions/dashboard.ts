"use server";

import prisma from "@/lib/prisma";
import { getOffers } from "./cms-marketing";
import { getJobs } from "./cms-careers";
import { getInstagramFeed } from "@/actions/cms-instagram";
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

export async function getDashboardMetrics() {
  const { data: { user } } = await getAuthSession();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Load database profile to resolve user role and branch mapping
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { branch: true }
    });

    const isBranchAdmin = dbUser?.role === "BRANCH_ADMIN" || dbUser?.role === "STAFF";
    const userBranchId = dbUser?.branchId;

    // Load active marketing offers and careers
    const [offers, jobs, cachedFeed] = await Promise.all([
      getOffers(),
      getJobs(),
      getInstagramFeed()
    ]);

    // ----------------------------------------------------
    // SCOPE A: BRANCH ADMIN / STAFF DATA ISOLATION
    // ----------------------------------------------------
    if (isBranchAdmin && userBranchId) {
      const [
        stockCount, 
        appointmentsCount, 
        pendingAppointmentsCount, 
        enquiriesCount,
        branchDetails
      ] = await Promise.all([
        prisma.inventory.count({
          where: { branchId: userBranchId, quantity: { gt: 0 } }
        }),
        prisma.appointment.count({
          where: { branchId: userBranchId }
        }),
        prisma.appointment.count({
          where: { branchId: userBranchId, status: "PENDING" }
        }),
        prisma.enquiry.count({
          where: { branchId: userBranchId }
        }),
        prisma.branch.findUnique({
          where: { id: userBranchId }
        })
      ]);

      // Fetch dynamic local inventory entries
      const localStock = await prisma.inventory.findMany({
        where: { branchId: userBranchId },
        orderBy: { updatedAt: "desc" },
        take: 4,
        include: {
          product: {
            include: {
              brand: true,
              images: { orderBy: { order: "asc" }, take: 1 }
            }
          }
        }
      });

      // Fetch dynamic branch appointments
      const localAppointments = await prisma.appointment.findMany({
        where: { branchId: userBranchId },
        orderBy: { date: "desc" },
        take: 4,
        include: {
          user: true
        }
      });

      // Fetch dynamic branch customer leads
      const localEnquiries = await prisma.enquiry.findMany({
        where: { branchId: userBranchId },
        orderBy: { createdAt: "desc" },
        take: 4,
        include: {
          product: true
        }
      });

      // Fetch featured products that have inventory at this branch
      const branchFeatured = await prisma.inventory.findMany({
        where: { branchId: userBranchId, product: { isFeatured: true, deletedAt: null } },
        take: 4,
        include: {
          product: {
            include: {
              brand: true,
              images: { orderBy: { order: "asc" }, take: 1 }
            }
          }
        }
      });

      return {
        success: true,
        isBranchAdmin: true,
        branchName: branchDetails?.name || "Your Showroom",
        metrics: {
          totalBranches: 1,
          totalProducts: stockCount,
          totalOffers: offers.filter((o: any) => o.branchId === "Global" || o.branchId === userBranchId).length,
          activeJobs: jobs.filter((j: any) => j.branchId === "Global" || j.branchId === userBranchId).length,
          totalAppointments: appointmentsCount,
          pendingAppointments: pendingAppointmentsCount,
          totalEnquiries: enquiriesCount
        },
        recentProducts: localStock.map(s => ({
          id: s.product.id,
          name: s.product.name,
          brand: s.product.brand.name,
          image: s.product.images?.[0]?.url || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200",
          quantity: s.quantity,
          status: s.status,
          createdAt: s.updatedAt.toISOString()
        })),
        branchActivity: branchDetails ? [{
          id: branchDetails.id,
          name: branchDetails.name,
          location: branchDetails.location,
          phone: branchDetails.phone,
          timings: branchDetails.timings || "10:00 AM - 08:30 PM",
          isActive: branchDetails.isActive
        }] : [],
        topProducts: branchFeatured.map(s => ({
          id: s.product.id,
          name: s.product.name,
          brand: s.product.brand.name,
          image: s.product.images?.[0]?.url || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=200",
        })),
        appointments: localAppointments.map(a => ({
          id: a.id,
          customerName: a.customerName,
          customerEmail: a.customerEmail,
          customerPhone: a.customerPhone,
          date: a.date.toISOString(),
          status: a.status,
          notes: a.notes
        })),
        enquiries: localEnquiries.map(e => ({
          id: e.id,
          type: e.type,
          message: e.message,
          isWhatsApp: e.isWhatsApp,
          productName: e.product?.name || null,
          createdAt: e.createdAt.toISOString()
        })),
        instagramSync: {
          status: cachedFeed.status,
          handle: cachedFeed.handle,
          lastSync: cachedFeed.lastSync
        }
      };
    }

    // ----------------------------------------------------
    // SCOPE B: SUPER ADMIN GLOBAL METRICS (DEFAULT)
    // ----------------------------------------------------
    const [branchCount, productCount] = await Promise.all([
      prisma.branch.count({ where: { deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null } }),
    ]);

    // Fetch recently added products globally
    const recentProducts = await prisma.product.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 4,
      include: {
        brand: true,
        images: { orderBy: { order: "asc" }, take: 1 }
      }
    });

    // Fetch dynamic branch activities
    const branchActivity = await prisma.branch.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 4
    });

    // Fetch global featured products
    const topProducts = await prisma.product.findMany({
      where: { deletedAt: null, isFeatured: true },
      take: 4,
      include: {
        brand: true,
        images: { orderBy: { order: "asc" }, take: 1 }
      }
    });

    // Fetch global appointments for quick summary
    const globalAppointments = await prisma.appointment.findMany({
      orderBy: { date: "desc" },
      take: 4
    });

    // Fetch global enquiries
    const globalEnquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 4
    });

    return {
      success: true,
      isBranchAdmin: false,
      branchName: "Global Network",
      metrics: {
        totalBranches: branchCount,
        totalProducts: productCount,
        totalOffers: offers.length,
        activeJobs: jobs.length,
        totalAppointments: globalAppointments.length,
        pendingAppointments: globalAppointments.filter(a => a.status === "PENDING").length,
        totalEnquiries: globalEnquiries.length
      },
      recentProducts: recentProducts.map(p => ({
        id: p.id,
        name: p.name,

        brand: p.brand.name,
        image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200",
        createdAt: p.createdAt
      })),
      branchActivity: branchActivity.map(b => ({
        id: b.id,
        name: b.name,
        location: b.location,
        phone: b.phone,
        timings: b.timings || "10:00 AM - 08:30 PM",
        isActive: b.isActive
      })),
      topProducts: topProducts.map(p => ({
        id: p.id,
        name: p.name,

        brand: p.brand.name,
        image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=200",
      })),
      appointments: globalAppointments.map(a => ({
        id: a.id,
        customerName: a.customerName,
        customerEmail: a.customerEmail,
        customerPhone: a.customerPhone,
        date: a.date.toISOString(),
        status: a.status,
        notes: a.notes
      })),
      enquiries: globalEnquiries.map(e => ({
        id: e.id,
        type: e.type,
        message: e.message,
        isWhatsApp: e.isWhatsApp,
        productName: null,
        createdAt: e.createdAt.toISOString()
      })),
      instagramSync: {
        status: cachedFeed.status,
        handle: cachedFeed.handle,
        lastSync: cachedFeed.lastSync
      }
    };
  } catch (err) {
    console.error("Dashboard metrics load failure:", err);
    return { error: "Failed to compile command center metrics" };
  }
}
