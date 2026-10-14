import { Alert } from "@/components/ui/Alert";
import type { AdminFormAction } from "../form-state";
import { ConfirmAction } from "../ConfirmAction";
import { formatDateTime, formatLocalDate } from "../format";

const ANALYTICS_LIVE_FROM = "2026-10-13";

/**
 * Honest coverage notice for rollup-based analytics (§35, §50): says which days have no computed figures yet (they
 * are gaps, never zeros) after launch and offers to compute the missing past days (enqueues `analytics.backfillMetrics`).
 * Today is never rolled up until it ends, so it is not counted as missing.
 */
export function CoverageNotice({
  missingDates,
  today,
  daysInRange,
  daysWithData,
  lastComputedAt,
  backfillAction,
  canBackfill,
  liveFrom = ANALYTICS_LIVE_FROM,
}: {
  missingDates: readonly string[];
  today: string;
  daysInRange: number;
  daysWithData: number;
  lastComputedAt: Date | null;
  backfillAction: AdminFormAction<unknown>;
  canBackfill: boolean;
  /** First production day with meaningful analytics. Earlier gaps are pre-launch, not missing business data. */
  liveFrom?: string;
}) {
  const missingPast = missingDates.filter((date) => date >= liveFrom && date < today);
  if (missingPast.length === 0) {
    return lastComputedAt ? (
      <p className="text-sm text-muted">
        Figures are refreshed nightly from activity records. Last updated {formatDateTime(lastComputedAt)}.
      </p>
    ) : null;
  }
  const from = missingPast[0]!;
  const to = missingPast[missingPast.length - 1]!;
  return (
    <Alert
      tone="warning"
      title={`${missingPast.length} ${missingPast.length === 1 ? "day has" : "days have"} no computed figures yet`}
      action={
        canBackfill ? (
          <ConfirmAction
            action={backfillAction}
            fields={{ from, to }}
            triggerLabel="Compute missing days"
            triggerVariant="secondary"
            title="Compute missing days?"
            description={`This queues a background job that recomputes ${formatLocalDate(from)} to ${formatLocalDate(to)} from the activity records. It can take a few minutes; refresh this page afterwards.`}
            confirmLabel="Queue computation"
          />
        ) : undefined
      }
    >
      Totals below cover {daysWithData} of {daysInRange} days in this range; days without figures show as gaps, not zeros
      (missing: {formatLocalDate(from)}
      {from !== to ? ` to ${formatLocalDate(to)}` : ""}).
      {lastComputedAt ? ` Last computed ${formatDateTime(lastComputedAt)}.` : " Nothing has been computed for this range yet."}
    </Alert>
  );
}
