import { cn } from "@/lib/cn";
import { formatPercent } from "@/lib/format";
import { MASTERY_BAND_LABELS, masteryBandFromScore, type MasteryBand } from "@/lib/mastery-band";
import { MASTERY_CHIP_CLASS } from "./mastery-styles";

export interface MasteryBadgeProps {
  /** 0–100 mastery score. `null`/`undefined` (and no `band`) renders "Not started". */
  score?: number | null;
  /** Explicit band (e.g. straight from the DB). Takes precedence over `score` for the label/colour. */
  band?: MasteryBand;
  /** Append the score ("Strong · 82%"). Requires `score`. */
  showScore?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Mastery band chip (§11). The band LABEL is always rendered — colour is reinforcement only (§43). Weak topics get
 * an amber marker so they stand out in long topic lists.
 */
export function MasteryBadge({ score, band, showScore = false, size = "md", className }: MasteryBadgeProps) {
  const hasScore = typeof score === "number" && Number.isFinite(score);
  const resolved = band ?? (hasScore ? masteryBandFromScore(score) : null);
  const sizeClass = size === "sm" ? "px-2 py-px text-xs" : "px-2.5 py-0.5 text-xs";

  if (!resolved) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border border-border bg-transparent font-semibold whitespace-nowrap text-muted",
          sizeClass,
          className,
        )}
      >
        Not started
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap",
        MASTERY_CHIP_CLASS[resolved],
        sizeClass,
        className,
      )}
    >
      {resolved === "WEAK" && (
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-mastery-marker ring-2 ring-surface/70" />
      )}
      {MASTERY_BAND_LABELS[resolved]}
      {showScore && hasScore && (
        <>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{formatPercent(score)}</span>
        </>
      )}
    </span>
  );
}
