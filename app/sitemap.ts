import { MetadataRoute } from "next";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/shop/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://emiratesopticians.com";

  // Core Static Pages
  const routes = ["", "/shop", "/brands", "/services", "/branches", "/about", "/careers", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  // Dynamic Product Pages
  const productRoutes = STATIC_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.slug || product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
