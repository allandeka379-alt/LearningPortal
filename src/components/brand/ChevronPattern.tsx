import { useId } from "react";
import { cn } from "@/lib/cn";

export type ChevronPatternVariant = "band" | "field";
export type ChevronPatternTone = "muted" | "primary" | "accent" | "inverse";

const TONE: Record<ChevronPatternTone, string> = {
  muted: "text-border-strong",
  primary: "text-primary",
  accent: "text-accent",
  inverse: "text-on-primary",
};

export interface ChevronPatternProps {
  /**
   * `"band"`: a thin frieze (zigzag between two broken stone courses) for dividers, hero edges and empty states.
   * `"field"`: stacked chevron courses filling the box, for low-contrast hero/section backgrounds. Give the parent
   * `relative` and use `className="absolute inset-0"`.
   */
  variant?: ChevronPatternVariant;
  tone?: ChevronPatternTone;
  /** 0–1. Keep the motif quiet: defaults to 0.5 for bands and 0.12 for fields. */
  opacity?: number;
  className?: string;
}

/**
 * The chevron coursing motif of the Great Zimbabwe walls as an inline SVG pattern (a few hundred bytes, no image
 * request, themeable via `currentColor`). Purely decorative and hidden from assistive technology. Use sparingly:
 * at most one band or field per view.
 */
export function ChevronPattern({ variant = "band", tone = "muted", opacity, className }: ChevronPatternProps) {
  // Pattern ids must be unique per document; useId works in Server Components. Strip characters some React
  // versions include (":" / "«»") so the url(#id) reference is always valid.
  const id = `dz-chevron-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const isBand = variant === "band";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none block w-full", isBand && "h-3", TONE[tone], className)}
      style={{ opacity: opacity ?? (isBand ? 0.5 : 0.12) }}
    >
      <defs>
        {isBand ? (
          <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
              {/* Upper stone course: blocks with a gap at the tile edge. */}
              <path d="M1 0.75H11" />
              {/* The chevron course. */}
              <path d="M0 9L6 3L12 9" strokeLinecap="butt" strokeLinejoin="miter" />
              {/* Lower course, offset half a block like bonded masonry. */}
              <path d="M-5 11.25H5M7 11.25H17" />
            </g>
          </pattern>
        ) : (
          <pattern id={id} width="16" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 8L8 2L16 8" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
