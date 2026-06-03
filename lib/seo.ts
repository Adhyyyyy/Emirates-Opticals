import { Metadata } from "next";

/**
 * ENTERPRISE SEO CONFIGURATION
 * Optimized for Emirates Optician Global Search Presence
 */

const SITE_CONFIG = {
  name: "Emirates Optician",
  description: "Luxury Optical Boutique & Premium Eyewear in Kerala. Expert eye tests, designer frames, and personalized vision care.",
  url: "https://emiratesoptician.in",
  ogImage: "/og-main.jpg",
  twitterHandle: "@emiratesoptician",
};

/**
 * UTILITY: constructMetadata
 * Generates high-fidelity SEO tags for any page
 */
export function constructMetadata({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle,
    },
    icons: {
      icon: [
        { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
      ],
      shortcut: "/assets/favicon.ico",
      apple: "/assets/apple-touch-icon.png",
    },
    manifest: "/assets/site.webmanifest",
    metadataBase: new URL(SITE_CONFIG.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * SCHEMA.ORG HELPERS
 * Generates JSON-LD for rich search results
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9988674574",
      contactType: "customer service",
    },
  };
}

export function getProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.[0]?.url,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };
}
