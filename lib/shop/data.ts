import { Product } from "@/types/shop";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Prada Linear Rossa",
    slug: "prada-linear-rossa",
    brand: "PRADA",
    category: "Luxury Collection",
    description: "Italian luxury with bold silhouettes and refined detailing. Fashion-forward frames with premium finishes.",
    price: 24500,
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"],
    stockStatus: "In Stock",
    gender: "Men",
    frameShape: "Rectangular",
    frameMaterial: "Acetate",
    lensType: "Demo Lens",
    color: "Matte Black",
    collectionType: "Luxury",
    isFeatured: true,
    isNewArrival: true,
    branches: [
      { branchName: "Changanassery", branchSlug: "changanassery", whatsapp: "919682929968", stockStatus: "In Stock" },
      { branchName: "Kakkanad", branchSlug: "kakkanad", whatsapp: "918000000006", stockStatus: "Low Stock" }
    ]
  },
  {
    id: "p2",
    name: "Ray-Ban Aviator Classic",
    slug: "ray-ban-aviator-classic",
    brand: "Ray-Ban",
    category: "Sunglasses",
    description: "Timeless eyewear defining generations with legendary designs like Aviator and Wayfarer.",
    price: 12800,
    images: ["https://images.unsplash.com/photo-1511499767350-a1590fdb7307?auto=format&fit=crop&q=80&w=800"],
    stockStatus: "In Stock",
    gender: "Unisex",
    frameShape: "Aviator",
    frameMaterial: "Metal",
    lensType: "Polarized",
    color: "Gold / G-15 Green",
    collectionType: "Classic",
    branches: [
      { branchName: "Thiruvalla", branchSlug: "thiruvalla", whatsapp: "918000000002", stockStatus: "In Stock" },
      { branchName: "Pandalam", branchSlug: "pandalam", whatsapp: "918000000005", stockStatus: "In Stock" }
    ]
  },
  {
    id: "p3",
    name: "Oakley Flak 2.0 XL",
    slug: "oakley-flak-2-0-xl",
    brand: "Oakley",
    category: "Sports Eyewear",
    description: "Performance-driven eyewear engineered for athletes and active lifestyles with advanced lens technology.",
    price: 18500,
    images: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800"],
    stockStatus: "In Stock",
    gender: "Men",
    frameShape: "Sport",
    frameMaterial: "O-Matter",
    lensType: "Prizm Road",
    color: "Polished Black",
    collectionType: "Performance",
    branches: [
      { branchName: "Kakkanad", branchSlug: "kakkanad", whatsapp: "918000000006", stockStatus: "In Stock" }
    ]
  },
  {
    id: "p4",
    name: "Cartier Santos Dumont",
    slug: "cartier-santos-dumont",
    brand: "Cartier",
    category: "Luxury Collection",
    description: "Exceptional craftsmanship and timeless elegance inspired by Parisian luxury heritage.",
    price: 85000,
    images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800"],
    stockStatus: "Low Stock",
    gender: "Men",
    frameShape: "Square",
    frameMaterial: "Gold Plated",
    lensType: "Premium Demo",
    color: "Brushed Gold",
    collectionType: "Haute Luxury",
    branches: [
      { branchName: "Changanassery", branchSlug: "changanassery", whatsapp: "919682929968", stockStatus: "Low Stock" }
    ]
  }
];
