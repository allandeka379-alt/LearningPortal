import { Award, CalendarCheck, Flame, GraduationCap } from "lucide-react";
import type { ShareableResultKind } from "@/generated/prisma/client";
import { formatLocalDate } from "@/components/student/format";
import { shareKindLabel, shareValueLabel, type ShareSnapshot } from "@/server/sharing/core";

const ICONS = {
  MOCK_SCORE: GraduationCap,
  TEST_SCORE: GraduationCap,
  STREAK: Flame,
  MASTERY: Award,
  ACHIEVEMENT: Award,
} as const;

export interface PublicShareCardProps {
  kind: ShareableResultKind;
  snapshot: ShareSnapshot;
}

/**
 * The public share card (§46) on /s/[token]: the headline, the big number and the context the student chose to share
 * (board, level, subject, first name or username). Nothing else exists to show. Server component.
 */
export function PublicShareCard({ kind, snapshot }: PublicShareCardProps) {
  const Icon = ICONS[kind];
  const context = [snapshot.boardName, snapshot.qualificationName, snapshot.subjectName].filter(Boolean).join(" · ");
  return (
    <article aria-labelledby="share-headline" className="overflow-hidden rounded-card border border-border bg-surface shadow-sm">
      <div className="h-1.5 bg-accent" aria-hidden="true" />
      <div className="space-y-5 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Icon aria-hidden="true" className="size-4" />
          {shareKindLabel(kind)}
        </p>
        <p className="text-5xl font-bold tracking-tight text-text sm:text-6xl">{shareValueLabel(snapshot)}</p>
        <h1 id="share-headline" className="text-xl font-semibold text-text sm:text-2xl">
          {snapshot.headline}.
        </h1>
        {context && <p className="text-base text-muted">{context}</p>}
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {snapshot.displayName && <span className="font-medium text-text">— {snapshot.displayName}</span>}
          <span className="inline-flex items-center gap-1.5">
            <CalendarCheck aria-hidden="true" className="size-4" />
            {formatLocalDate(snapshot.achievedOn)}
          </span>
        </p>
      </div>
    </article>
  );
}
