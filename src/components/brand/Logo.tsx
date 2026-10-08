import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/cn";

/*
 * Mark geometry (32×32): a rounded tile carrying two nested chevron courses, after the chevron friezes of the
 * Great Zimbabwe walls. Each course is a 4-unit-thick zigzag with two peaks; the second is offset by 8 units so
 * stone and gap alternate at equal widths.
 */
const TILE = "M8 0H24A8 8 0 0 1 32 8V24A8 8 0 0 1 24 32H8A8 8 0 0 1 0 24V8A8 8 0 0 1 8 0Z";
const COURSE_TOP = "M6 12L11 7L16 12L21 7L26 12V16L21 11L16 16L11 11L6 16Z";
const COURSE_BOTTOM = "M6 20L11 15L16 20L21 15L26 20V24L21 19L16 24L11 19L6 24Z";

export interface LogoMarkProps {
  /**
   * `"brand"` (default): primary tile with an amber and a light course (theme-aware via tokens).
   * `"mono"`: single colour (`currentColor`) with the courses knocked out, for print, overlays and one-colour UI.
   */
  variant?: "brand" | "mono";
  className?: string;
}

/** The geometric brand mark. Decorative (`aria-hidden`); pair it with text or an accessible name. */
export function LogoMark({ variant = "brand", className }: LogoMarkProps) {
  if (variant === "mono") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
        <path fill="currentColor" fillRule="evenodd" d={`${TILE}${COURSE_TOP}${COURSE_BOTTOM}`} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <path d={TILE} className="fill-primary" />
      <path d={COURSE_TOP} className="fill-accent" />
      <path d={COURSE_BOTTOM} className="fill-on-primary" />
    </svg>
  );
}

export interface LogoProps {
  /** Hide the wordmark text visually (it stays available to screen readers). */
  wordmarkHidden?: boolean;
  markVariant?: LogoMarkProps["variant"];
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Extra classes for the wordmark, e.g. responsive visibility (`max-[400px]:sr-only` in the phone header). */
  wordmarkClassName?: string;
}

const SIZES = {
  sm: { mark: "size-7", text: "text-base" },
  md: { mark: "size-8", text: "text-lg" },
  lg: { mark: "size-10", text: "text-2xl" },
} as const;

/**
 * Mark + wordmark. The wordmark is live text from `APP_NAME` (the brand is configurable), so it is accessible,
 * crisp at any size and costs no image bytes. Wrap in a `Link` where it navigates home.
 */
export function Logo({ wordmarkHidden = false, markVariant = "brand", size = "md", className, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-text", className)}>
      <LogoMark variant={markVariant} className={SIZES[size].mark} />
      <span className={cn("font-bold tracking-tight", SIZES[size].text, wordmarkHidden && "sr-only", wordmarkClassName)}>{APP_NAME}</span>
    </span>
  );
}
