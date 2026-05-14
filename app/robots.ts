import { MetadataRoute } from 'next';

/**
 * ROBOTS.TXT CONFIGURATION
 * Enforces SEO crawling boundaries and protects admin interfaces
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/auth',
          '/*?*', // Block search parameters to prevent duplicate content
        ],
      },
    ],
    sitemap: 'https://emiratesoptician.com/sitemap.xml',
  };
}
