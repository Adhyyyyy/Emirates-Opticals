import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://emiratesoptician.in'; // Official live production domain

  const branches = [
    'kottayam', 'changanassery', 'thiruvalla', 
    'kumbanad', 'kothamangalam', 'pandalam', 'ettumanur', 
    'angamaly', 'irumpanam'
  ];

  const mainRoutes = [
    '', '/shop', '/services', '/about', '/careers', '/contact', '/book-eye-test'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...mainRoutes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })),
    ...branches.map(branch => ({
      url: `${baseUrl}/branches/${branch}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];

  return sitemapEntries;
}
