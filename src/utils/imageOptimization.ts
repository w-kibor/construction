/**
 * Image optimization utilities for responsive display
 */

export interface ImageDimensions {
  mobile: string;
  tablet: string;
  desktop: string;
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export const getResponsiveImageSizes = (): string => {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
};

/**
 * Compress image file in browser (client-side)
 * Useful for optimizing images before upload
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 900,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to compress image"));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

/**
 * Get optimal image dimensions based on viewport
 */
export const getOptimalImageDimensions = (
  containerWidth: number
): { width: number; height: number } => {
  // Maintain 16:9 aspect ratio
  const aspectRatio = 16 / 9;
  
  const width = Math.min(containerWidth, 1200);
  const height = Math.round(width / aspectRatio);

  return { width, height };
};

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (
  imagePath: string
): Record<"srcSet" | "sizes", string> => {
  // This is a placeholder - you can enhance this with actual image CDN support
  return {
    srcSet: `${imagePath} 1x, ${imagePath} 2x`,
    sizes: getResponsiveImageSizes(),
  };
};

/**
 * Preload image for better performance
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};
