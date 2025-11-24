/**
 * Canvas utility functions for drawing and image processing
 */

/**
 * Convert base64 data URL to Blob
 */
export function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

/**
 * Compress image to reduce file size
 */
export async function compressImage(
  dataURL: string,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      
      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', quality));
      } else {
        resolve(dataURL);
      }
    };
    img.src = dataURL;
  });
}

/**
 * Validate image data URL
 */
export function isValidImageDataURL(dataURL: string): boolean {
  return /^data:image\/(png|jpeg|jpg|gif);base64,/.test(dataURL);
}

/**
 * Get image dimensions from data URL
 */
export async function getImageDimensions(dataURL: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = dataURL;
  });
}

/**
 * Calculate file size from base64 string
 */
export function getBase64FileSize(base64: string): number {
  const base64Length = base64.split(',')[1]?.length || 0;
  return Math.round((base64Length * 3) / 4);
}

/**
 * Format bytes to human-readable size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Preset color palette for quick selection
 */
export const PRESET_COLORS = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
  '#FFC0CB', // Pink
  '#A52A2A', // Brown
  '#808080', // Gray
  '#FFD700', // Gold
  '#4B0082', // Indigo
  '#00CED1', // Dark Turquoise
];

/**
 * Brush size presets
 */
export const BRUSH_SIZES = {
  SMALL: 2,
  MEDIUM: 5,
  LARGE: 10,
  XLARGE: 20,
  XXLARGE: 40,
};
