import Link from "next/link";
import { MASTERY_FILL_CLASS } from "@/components/ui/mastery-styles";
import { cn } from "@/lib/cn";
import { formatCount, formatNumber } from "@/lib/format";
import { MASTERY_BAND_LABELS, MASTERY_BANDS, type MasteryBand } from "@/lib/mastery-band";

type DistributionKey = "NOT_STARTED" | MasteryBand;

export interface MasteryDistributionSubject {
  subjectId: string;
  name: string;
  qualificationName: string;
  topicsTotal: number;
  assessed: number;
  counts: Record<DistributionKey, number>;
}

/** Strongest first in the legend and bar, so the eye reads progress from the left; "Not started" sits last. */
const ORDER: readonly DistributionKey[] = [...[...MASTERY_BANDS].reverse(), "NOT_STARTED"];

const FILL: Record<DistributionKey, string> = { ...MASTERY_FILL_CLASS, NOT_STARTED: "bg-track" };

const LABEL: Record<DistributionKey, string> = { ...MASTERY_BAND_LABELS, NOT_STARTED: "Not started" };

/** Segment widths in percent (pure; segments with zero topics are omitted). */
export function distributionSegments(counts: Record<DistributionKey, number>, total: number): { key: DistributionKey; count: number; percent: number }[] {
  if (total <= 0) return [];
  return ORDER.filter((key) => counts[key] > 0).map((key) => ({ key, count: counts[key], percent: (counts[key] / total) * 100 }));
}

/**
 * Topics per mastery band for each subject (§11 bands, §6 "topics completed / remaining"): a stacked bar (sequential
 * mastery ramp, 2px gaps, "not started" as the track) with the counts written out underneath, so nothing depends on
 * colour. One shared legend. Server component.
 */
export function MasteryDistribution({ subjects }: { subjects: readonly MasteryDistributionSubject[] }) {
  return (
    <div className="space-y-5">
      <ul aria-label="Legend" className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
        {ORDER.map((key) => (
          <li key={key} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("inline-block size-2.5 rounded-sm", FILL[key], key === "NOT_STARTED" && "border border-border-strong")} />
            {LABEL[key]}
          </li>
        ))}
      </ul>
      <ul className="space-y-5">
        {subjects.map((subject) => {
          const segments = distributionSegments(subject.counts, subject.topicsTotal);
          return (
            <li key={subject.subjectId}>
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3">
                <Link
                  href={`/app/subjects/${subject.subjectId}`}
                  className="-my-3 inline-flex min-h-11 items-center py-3 text-sm font-semibold text-text underline-offset-4 hover:underline"
                >
                  {subject.name}
                </Link>
                <span className="text-xs text-muted">
                  {subject.topicsTotal > 0
                    ? `${formatNumber(subject.assessed)} of ${formatCount(subject.topicsTotal, "topic")} assessed`
                    : "No topics published yet"}
                </span>
              </div>
              <div aria-hidden="true" className={cn("flex h-3 w-full gap-0.5 overflow-hidden rounded-full", segments.length === 0 && "bg-track")}>
                {segments.map((segment) => (
                  <div key={segment.key} className={cn("h-full first:rounded-l-full last:rounded-r-full", FILL[segment.key])} style={{ flex: `${segment.count} 1 0%` }} />
                ))}
              </div>
              {segments.length > 0 && (
                <p className="mt-1.5 text-xs text-muted">
                  {segments.map((segment, index) => (
                    <span key={segment.key}>
                      {index > 0 && " · "}
                      {LABEL[segment.key]} {formatNumber(segment.count)}
                    </span>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
