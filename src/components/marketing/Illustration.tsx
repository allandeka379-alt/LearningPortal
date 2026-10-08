import { preload } from "react-dom";
import { cn } from "@/lib/cn";
import { IMAGE_STYLE } from "@/lib/images";

/**
 * The original marketing illustrations in `public/images/marketing` (inline-free SVG files, a few KB each, cached
 * immutably by the browser). They carry their own dark panel, so they read the same in light and dark themes.
 * Not optimized: SVG is already resolution-independent; the image optimiser would only re-encode it. Rendered as a
 * plain `<img>` with next/image's markup, so marketing pages do not ship next/image's client code (`src/lib/images.ts`).
 */
export const ILLUSTRATIONS = {
  hero: { src: "/images/marketing/hero-study.svg", width: 560, height: 440 },
  tutor: { src: "/images/marketing/ai-tutor.svg", width: 480, height: 380 },
  exam: { src: "/images/marketing/mock-exam.svg", width: 480, height: 380 },
  schools: { src: "/images/marketing/schools.svg", width: 480, height: 380 },
} as const;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

export interface IllustrationProps {
  name: IllustrationName;
  /** Describes what the picture shows (it is decorative-informative, not text). Pass "" for purely decorative use. */
  alt: string;
  /** Responsive `sizes` hint for the layout slot (unused without a `srcset`; kept for callers and future rasters). */
  sizes: string;
  /** Above the fold (the hero): preloaded from the document head and loaded eagerly. */
  priority?: boolean;
  className?: string;
}

export function Illustration({ name, alt, priority = false, className }: IllustrationProps) {
  const image = ILLUSTRATIONS[name];
  // React hoists this into <head> as <link rel="preload" as="image">, as next/image's `preload` prop does.
  if (priority) preload(image.src, { as: "image" });
  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image markup without its client JS (src/lib/images.ts)
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={IMAGE_STYLE}
      className={cn("h-auto w-full rounded-[1.75rem] shadow-lg", className)}
    />
  );
}
