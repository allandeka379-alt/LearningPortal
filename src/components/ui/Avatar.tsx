import { UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { getInitials } from "@/lib/format";
import { fixedImageAttributes, IMAGE_STYLE } from "@/lib/images";

const SIZES = {
  sm: { box: "size-8 text-xs", px: 32 },
  md: { box: "size-10 text-sm", px: 40 },
  lg: { box: "size-14 text-lg", px: 56 },
} as const;

export interface AvatarProps {
  /** Person's display name; used for initials and the accessible name. */
  name: string;
  /**
   * Image URL on our own origin, resized by the image optimizer (it must match `images.localPatterns` in
   * next.config.ts; the CSP allows no remote images). Without `src`, initials are shown — no image request on slow
   * connections.
   */
  src?: string | null;
  size?: keyof typeof SIZES;
  /** Set when the name is already shown next to the avatar, so screen readers don't hear it twice. */
  decorative?: boolean;
  className?: string;
}

/**
 * Round avatar with an initials fallback. Server-compatible, and deliberately not built on `next/image`: that Client
 * Component would add its JavaScript to every page with an account menu (see `src/lib/images.ts`).
 */
export function Avatar({ name, src, size = "md", decorative = false, className }: AvatarProps) {
  const { box, px } = SIZES[size];
  const initials = getInitials(name);
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img" as const, "aria-label": name };

  return (
    <span
      {...a11y}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft font-semibold text-on-primary-soft select-none",
        box,
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- next/image markup without its client JS (src/lib/images.ts)
        <img {...fixedImageAttributes(src, px)} alt="" style={IMAGE_STYLE} className="size-full object-cover" />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <UserRound aria-hidden="true" className="size-1/2" />
      )}
    </span>
  );
}
