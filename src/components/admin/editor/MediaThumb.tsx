import { cn } from "@/lib/cn";

/**
 * Thumbnail of an uploaded content image. A plain lazy `<img>` on purpose: AUTHENTICATED (premium) media is served
 * only to signed-in browsers (`/api/media/…` with the session cookie), which the `next/image` optimiser — fetching
 * server-side without cookies — cannot do. Dimensions are always set, so there is no layout shift.
 */
export function MediaThumb({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see the component comment (authenticated media)
    <img
      src={src}
      alt={alt}
      width={width ?? 160}
      height={height ?? 120}
      loading="lazy"
      decoding="async"
      className={cn("h-full w-full object-contain", className)}
    />
  );
}
