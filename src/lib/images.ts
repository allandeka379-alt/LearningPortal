/**
 * `<img>` attributes with next/image's output for the two shapes this app uses, WITHOUT importing `next/image`.
 *
 * Why: `next/image` is a Client Component. Any page whose module graph imports it ships its client code (~5.5 kB
 * gzip: the component, its config context and the default loader), even where it renders a fixed-size avatar or an
 * unoptimized SVG from a Server Component (§29 low bandwidth, ARCHITECTURE §9.9 bundle budgets). These helpers produce
 * the same markup next/image would (`srcset` 1x/2x through the built-in optimizer, lazy loading, async decoding) as
 * plain data, so the components stay server-renderable with no client JavaScript.
 *
 * The widths and quality below are Next's defaults; `src/lib/images.test.ts` checks them against next/image itself
 * and against next.config.ts, so changing `images.imageSizes` / `deviceSizes` / `qualities` fails a test.
 */

/** `images.imageSizes` + `images.deviceSizes` (Next 16 defaults), sorted: the widths the optimizer accepts. */
export const OPTIMIZER_WIDTHS = [32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;

/** The largest accepted width (requests above it are served at this width). */
const LARGEST_OPTIMIZER_WIDTH = 3840;

/** `images.qualities` default: the only quality the optimizer accepts. */
export const OPTIMIZER_QUALITY = 75;

/** Smallest accepted optimizer width ≥ `width` (the largest one when none is). */
function optimizerWidth(width: number): number {
  return OPTIMIZER_WIDTHS.find((candidate) => candidate >= width) ?? LARGEST_OPTIMIZER_WIDTH;
}

/** URL of `src` resized by the built-in image optimizer (`/_next/image`), as next/image's default loader builds it. */
export function optimizedImageUrl(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${optimizerWidth(width)}&q=${OPTIMIZER_QUALITY}`;
}

export interface FixedImageAttributes {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  loading: "lazy";
  decoding: "async";
}

/**
 * A fixed-size optimized image (avatar, testimonial photo): what `<Image src width height />` renders, i.e. 1x and 2x
 * candidates through the optimizer and the 2x URL as `src`. The optimizer only serves paths allowed by
 * `images.localPatterns` (next.config.ts); anything else answers 400, exactly as with next/image.
 */
export function fixedImageAttributes(src: string, width: number, height: number = width): FixedImageAttributes {
  const widths = [...new Set([width, width * 2].map(optimizerWidth))];
  const srcSet = widths.map((w, index) => `${optimizedImageUrl(src, w)} ${index + 1}x`).join(", ");
  const largest = widths[widths.length - 1] ?? width;
  return { src: optimizedImageUrl(src, largest), srcSet, width, height, loading: "lazy", decoding: "async" };
}

/**
 * next/image's inline style for every image: the alt text is not painted inside the reserved box while the image
 * loads (screen readers still announce it).
 */
export const IMAGE_STYLE = { color: "transparent" } as const;
