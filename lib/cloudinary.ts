/**
 * CLOUDINARY ENTERPRISE UTILITIES
 * Optimized for Emirates Optician Free Tier
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type ImageTransformations = {
  width?: number;
  height?: number;
  crop?: "fill" | "scale" | "pad" | "thumb";
  quality?: "auto" | "best" | "good";
  format?: "auto" | "webp" | "avif";
};

/**
 * Generates an optimized Cloudinary URL with luxury presets
 */
export function getOptimizedUrl(
  publicId: string, 
  transforms: ImageTransformations = {}
) {
  if (!publicId) return "";
  if (publicId.startsWith("http")) return publicId; // Fallback for external URLs

  const {
    width = "auto",
    height = "auto",
    crop = "fill",
    quality = "auto",
    format = "auto"
  } = transforms;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_${crop},g_auto,w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
}

/**
 * Folder Presets for organization
 */
export const CLOUDINARY_FOLDERS = {
  PRODUCTS: "emirates-optician/products",
  BRANCHES: "emirates-optician/branches",
  BANNERS: "emirates-optician/banners",
  CAREERS: "emirates-optician/careers/resumes",
  CMS: "emirates-optician/cms"
};

/**
 * File Validation
 */
export const validateFile = (file: File, type: "image" | "pdf") => {
  const maxSize = type === "image" ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB image, 10MB PDF
  const allowedTypes = type === "image" 
    ? ["image/jpeg", "image/png", "image/webp"] 
    : ["application/pdf"];

  if (file.size > maxSize) return { error: `File too large (Max ${maxSize / (1024 * 1024)}MB)` };
  if (!allowedTypes.includes(file.type)) return { error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}` };
  
  return { success: true };
};
