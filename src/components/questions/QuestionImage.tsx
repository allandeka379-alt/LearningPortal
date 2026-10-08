import { cn } from "@/lib/cn";
import { IMAGE_STYLE } from "@/lib/images";
import type { PresentedImage } from "./types";

export interface QuestionImageProps {
  image: PresentedImage;
  className?: string;
  /** Responsive `sizes` hint. Unused while content images are served unoptimized (no `srcset`); kept for callers. */
  sizes?: string;
  /** Load immediately (the diagram a question is about) instead of lazily. */
  eager?: boolean;
}

/**
 * A content image (diagram, option picture) served from `/api/media/...`. Not optimized: the optimizer fetches without
 * the student's session, so AUTHENTICATED (premium) media must be loaded by the browser itself. Intrinsic dimensions,
 * when known, reserve space (no layout shift). A plain `<img>` with next/image's unoptimized markup, so the question
 * renderers do not ship next/image's client code (see `src/lib/images.ts`).
 */
export function QuestionImage({ image, className, eager = false }: QuestionImageProps) {
  const dimensions = image.width && image.height ? { width: image.width, height: image.height } : {};
  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image markup without its client JS (src/lib/images.ts)
    <img
      src={image.src}
      alt={image.alt}
      {...dimensions}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={IMAGE_STYLE}
      className={cn("block h-auto max-w-full", className)}
    />
  );
}
