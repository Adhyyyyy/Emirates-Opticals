"use client";

import { useState } from "react";
import { CLOUDINARY_FOLDERS, validateFile } from "@/lib/cloudinary";

interface UploadOptions {
  folder?: keyof typeof CLOUDINARY_FOLDERS;
  onSuccess?: (url: string, publicId: string) => void;
  onError?: (error: string) => void;
}

/**
 * HOOK: useCloudinaryUpload
 * Handles secure client-side uploads with progress tracking
 */
export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File, options: UploadOptions = {}) => {
    const { folder = "PRODUCTS", onSuccess, onError } = options;

    // 1. Validate File
    const validation = validateFile(file, file.type === "application/pdf" ? "pdf" : "image");
    if (validation.error) {
      onError?.(validation.error);
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Note: In production, use "Signed Uploads" via a Server Action to get a signature
      // For this implementation, we assume an unsigned preset "emirates_unsigned" is configured in Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "emirates_unsigned");
      formData.append("folder", CLOUDINARY_FOLDERS[folder]);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      onSuccess?.(data.secure_url, data.public_id);
    } catch (err: any) {
      onError?.(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
      setProgress(100);
    }
  };

  return { upload, isUploading, progress };
}
