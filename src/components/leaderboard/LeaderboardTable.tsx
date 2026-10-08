import { ArrowDown, ArrowUp, Minus, Trophy } from "lucide-react";
import type { LeaderboardMetric } from "@/generated/prisma/client";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { formatBoardValue } from "./labels";

export interface LeaderboardTableProps {
  metric: LeaderboardMetric;
  rows: readonly { rank: number; name: string; value: number; isMe: boolean }[];
  /** The student's own standing (shown under the list when outside the top). */
  me: { rank: number; value: number; inTop: boolean; lastWeekRank: number | null } | null;
  myName: string;
  total: number;
  emptyTitle: string;
  emptyDescription: string;
}

function Movement({ rank, lastWeekRank }: { rank: number; lastWeekRank: number | null }) {
  if (lastWeekRank === null) return null;
  const delta = lastWeekRank - rank;
  const Icon = delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : Minus;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <Icon aria-hidden="true" className="size-3.5" />
      Last week #{formatNumber(lastWeekRank)}
    </span>
  );
}

function Row({ metric, rank, name, value, isMe }: { metric: LeaderboardMetric; rank: number; name: string; value: number; isMe: boolean }) {
  return (
    <li
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-control px-3 py-2",
        isMe ? "border border-primary bg-primary-soft text-on-primary-soft" : "border border-transparent",
      )}
      aria-current={isMe ? "true" : undefined}
    >
      <span className={cn("w-10 shrink-0 text-right text-base font-bold tabular-nums", rank <= 3 ? "text-accent-text" : "text-muted")}>#{formatNumber(rank)}</span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-text">
        {name}
        {isMe && <span className="ml-2 text-xs font-semibold text-primary">(you)</span>}
      </span>
      <span className="shrink-0 text-sm font-semibold text-text tabular-nums">{formatBoardValue(metric, value)}</span>
    </li>
  );
}

/**
 * The top of a board with dense ranks (ties share a rank) and the student highlighted; when they are outside the top,
 * their own row follows the list with their real rank (§20). Server component.
 */
export function LeaderboardTable({ metric, rows, me, myName, total, emptyTitle, emptyDescription }: LeaderboardTableProps) {
  if (rows.length === 0) {
    return <EmptyState appearance="plain" titleAs="p" icon={<Trophy aria-hidden="true" />} title={emptyTitle} description={emptyDescription} />;
  }
  return (
    <div className="space-y-3">
      <ol className="space-y-1" aria-label={`Top ${rows.length} of ${formatNumber(total)}`}>
        {rows.map((row, index) => (
          <Row key={`${row.rank}-${index}`} metric={metric} {...row} />
        ))}
      </ol>
      {me && !me.inTop && (
        <div className="space-y-1 border-t border-border pt-3">
          <p className="px-3 text-xs font-medium text-muted">Your position</p>
          <ol aria-label="Your position">
            <Row metric={metric} rank={me.rank} name={myName} value={me.value} isMe />
          </ol>
        </div>
      )}
      {me && me.lastWeekRank !== null && (
        <p className="px-3">
          <Movement rank={me.rank} lastWeekRank={me.lastWeekRank} />
        </p>
      )}
    </div>
  );
}
