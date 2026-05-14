import * as z from "zod";

// --- AUTH VALIDATIONS ---
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- PRODUCT & INVENTORY ---
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be detailed"),
  shortDescription: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  brandId: z.string().min(1, "Please select a brand"),
  categoryId: z.string().min(1, "Please select a category"),
  
  // Specifications
  gender: z.string().optional(),
  frameShape: z.string().optional(),
  material: z.string().optional(),
  lensType: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  
  // Status & Flags
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  
  // Media
  images: z.array(z.string()).min(1, "At least one product image is required"),
  
  // SEO
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  
  // Stock Initialization
  initialStock: z.number().min(0).default(0),
});

// --- APPOINTMENT BOOKING ---
export const appointmentSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Invalid phone number"),
  branchId: z.string().min(1, "Please select a branch"),
  date: z.string().min(1, "Please select a date"), // Stored as string for simplified ISO handling
  time: z.string().min(1, "Please select a preferred time slot"),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).default("PENDING"),
  notes: z.string().optional(),
});
