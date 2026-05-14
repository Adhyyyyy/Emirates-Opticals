"use client";

import Image, { ImageProps } from "next/image";
import { getOptimizedUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  isCloudinary?: boolean;
  aspectRatio?: "square" | "portrait" | "video" | "wide";
}

/**
 * LUXURY OPTIMIZED IMAGE COMPONENT
 * Automatically handles Cloudinary transformations and lazy loading
 */
export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  isCloudinary = true,
  aspectRatio,
  width,
  height,
  fill,
  ...props 
}: OptimizedImageProps & { fill?: boolean }) {
  
  const finalSrc = isCloudinary ? getOptimizedUrl(src, { 
    width: Number(width) || (fill ? 800 : 1200), 
    height: Number(height) || (fill ? 800 : 1200) 
  }) : src;

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    video: "aspect-video",
    wide: "aspect-[21/9]"
  };

  return (
    <div className={cn(
      "relative overflow-hidden bg-brand-pearl/50",
      aspectRatio && aspectRatioClasses[aspectRatio],
      className
    )}>
      <Image
        src={finalSrc}
        alt={alt}
        width={!fill ? (width || 1200) : undefined}
        height={!fill ? (height || 1200) : undefined}
        fill={fill}
        loading="lazy"
        className={cn(
          "object-cover transition-all duration-1000",
          "hover:scale-105"
        )}
        {...props}
      />
    </div>
  );
}
