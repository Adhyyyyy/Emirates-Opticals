import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

/**
 * AUTONOMOUS SITEMAP GENERATOR
 * Dynamically crawls products and branches for search engines
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://emiratesoptician.com';

  // 1. Fetch Dynamic Data
  const products = await prisma.product.findMany({
    select: { id: true, updatedAt: true },
    where: { status: 'PUBLISHED' }
  });

  const branches = await prisma.branch.findMany({
    select: { slug: true, updatedAt: true }
  });

  // 2. Map Products
  const productEntries = products.map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Map Branches
  const branchEntries = branches.map((b) => ({
    url: `${baseUrl}/branches/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Static Routes
  const staticRoutes = [
    '',
    '/shop',
    '/brands',
    '/about',
    '/contact',
    '/careers',
    '/appointments',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  return [...staticRoutes, ...productEntries, ...branchEntries];
}
