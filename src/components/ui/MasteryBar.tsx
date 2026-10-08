import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { formatPercent } from "@/lib/format";
import { MASTERY_BAND_LABELS, masteryBandFromScore } from "@/lib/mastery-band";
import { MasteryBadge } from "./MasteryBadge";
import { MASTERY_FILL_CLASS } from "./mastery-styles";

export interface MasteryBarProps {
  /** Topic (or subject) name. */
  label: string;
  /** 0–100 mastery score, or `null` when the student hasn't attempted the topic yet. */
  score: number | null;
  /** Optional link for the topic name (e.g. to the topic page or a targeted practice session). */
  href?: string;
  className?: string;
}

/**
 * Topic mastery row: name, band label, percentage and a bar coloured by band (§7, §11). Weak topics get an amber
 * marker before the name. Every visual cue is duplicated in text.
 */
export function MasteryBar({ label, score, href, className }: MasteryBarProps) {
  const labelId = useId();
  const known = score !== null && Number.isFinite(score);
  const clamped = known ? Math.min(100, Math.max(0, score)) : 0;
  const band = known ? masteryBandFromScore(clamped) : null;
  const valueText = band ? `${formatPercent(clamped)}, ${MASTERY_BAND_LABELS[band]}` : "Not started";

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <span id={labelId} className="flex min-w-0 items-start gap-2 text-sm font-medium text-text">
          {band === "WEAK" && <span aria-hidden="true" className="mt-0.5 h-4 w-1 shrink-0 rounded-full bg-mastery-marker" />}
          {href ? (
            <Link href={href} className="-my-3 min-w-0 py-3 break-words underline-offset-4 hover:underline">
              {label}
            </Link>
          ) : (
            <span className="min-w-0 break-words">{label}</span>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <MasteryBadge score={known ? clamped : null} size="sm" />
          <span aria-hidden="true" className="w-10 text-right text-sm text-muted tabular-nums">
            {known ? formatPercent(clamped) : "—"}
          </span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={known ? clamped : undefined}
        aria-valuetext={valueText}
        className="h-2 w-full overflow-hidden rounded-full bg-track"
      >
        {band && (
          <div className={cn("h-full rounded-full", MASTERY_FILL_CLASS[band])} style={{ width: `${clamped}%` }} />
        )}
      </div>
    </div>
  );
}
