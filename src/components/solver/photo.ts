/**
 * Client-side preparation of a question photo before upload (§29 low bandwidth): phone cameras produce 3-12 MB
 * images, the server keeps at most 1280 px on the long edge anyway (SOLVER_UPLOAD policy). Re-encoding in the browser
 * first cuts the upload to a few hundred KB and drops EXIF metadata (location) before the photo leaves the phone.
 *
 * Progressive: when the browser cannot decode or re-encode the image (old browser, unusual format), the original file
 * is sent and the server applies the same limits.
 */

/** Longest edge kept (matches the server's SOLVER_UPLOAD `maxEdge`). */
export const PHOTO_MAX_EDGE = 1280;
/** Smaller photos are sent as they are when they already fit `PHOTO_MAX_EDGE`. */
export const PHOTO_REENCODE_ABOVE_BYTES = 1_500_000;
const JPEG_QUALITY = 0.85;

/** The size to draw at: the long edge capped at `maxEdge`, aspect ratio kept, at least 1 px. Pure. */
export function targetSize(width: number, height: number, maxEdge: number = PHOTO_MAX_EDGE): { width: number; height: number } {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 };
  const scale = Math.min(1, maxEdge / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

/** Whether a photo of this size needs re-encoding before upload. Pure. */
export function needsDownscale(width: number, height: number, bytes: number): boolean {
  return Math.max(width, height) > PHOTO_MAX_EDGE || bytes > PHOTO_REENCODE_ABOVE_BYTES;
}

function jpegName(name: string): string {
  const base = name.replace(/\.[^./\\]+$/, "").slice(0, 100) || "question";
  return `${base}.jpg`;
}

/**
 * A smaller JPEG of `file` when it is large, else `file` itself. Never throws: any failure returns the original.
 * Uses `createImageBitmap` (honours EXIF orientation) and a canvas.
 */
export async function prepareQuestionPhoto(file: File): Promise<File> {
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") return file;
  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
    if (!needsDownscale(bitmap.width, bitmap.height, file.size)) return file;
    const size = targetSize(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;
    const context = canvas.getContext("2d");
    if (!context) return file;
    // White background: transparent PNG screenshots would otherwise turn black as JPEG.
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size.width, size.height);
    context.drawImage(bitmap, 0, 0, size.width, size.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
    if (!blob || blob.size === 0 || blob.size >= file.size) return file;
    return new File([blob], jpegName(file.name), { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  } finally {
    bitmap?.close();
  }
}
