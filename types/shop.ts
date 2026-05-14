export type BranchStock = {
  branchName: string;
  branchSlug: string;
  whatsapp: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: "Optical Frames" | "Sunglasses" | "Blue Light Glasses" | "Sports Eyewear" | "Luxury Collection" | "Kids Collection";
  description: string;
  price: number;
  images: string[];
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  branches: BranchStock[];
  gender: "Men" | "Women" | "Unisex" | "Kids";
  frameShape: string;
  frameMaterial: string;
  lensType: string;
  color: string;
  collectionType: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
};

export type FilterState = {
  gender: string[];
  brand: string[];
  category: string[];
  frameShape: string[];
  frameMaterial: string[];
  priceRange: [number, number];
  availability: string[];
};
