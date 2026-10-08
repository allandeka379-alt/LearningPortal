import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { isWeekKey, previousWeekKey } from "./core";
import { computeLeaderboards, currentWeekKey } from "./snapshot";

/**
 * Leaderboard jobs (§20; ARCHITECTURE §3.7 `gamification.leaderboardSnapshot`). Register once from
 * src/worker/handlers.ts: `registerLeaderboardJobs();`.
 *
 * - `leaderboards.snapshot` (rollups queue): hourly at :20 for the current ISO week (Africa/Harare calendar). An
 *   explicit `weekKey` in the payload recomputes that week (admin backfill).
 * - `leaderboards.weeklyClose` (rollups queue): Mondays 04:00 CAT (02:00 UTC), after every student time zone from UTC-2
 *   eastwards has finished Sunday: final scores and dense ranks of the week that just ended.
 */

export const LEADERBOARD_SNAPSHOT_JOB = "leaderboards.snapshot";
export const LEADERBOARD_WEEKLY_CLOSE_JOB = "leaderboards.weeklyClose";

/** Weekly period aligned to the UTC epoch (a Thursday): + 4 days 2 h = Monday 02:00 UTC = 04:00 CAT. */
export const WEEKLY_CLOSE_OFFSET_MINUTES = 4 * 1440 + 120;

const payloadSchema = z.looseObject({
  periodStart: z.iso.datetime().optional(),
  weekKey: z.string().refine(isWeekKey, "weekKey must be an ISO week key like 2026-W41").optional(),
});

/** The week a weekly-close run finalises: the explicit one, else the week before the scheduled period. */
export function weekToClose(payload: { periodStart?: string | undefined; weekKey?: string | undefined }, now: Date): string {
  if (payload.weekKey) return payload.weekKey;
  const reference = payload.periodStart ? new Date(payload.periodStart) : now;
  return previousWeekKey(currentWeekKey(reference));
}

export function registerLeaderboardJobs(): void {
  registerJobHandler(
    LEADERBOARD_SNAPSHOT_JOB,
    payloadSchema,
    async (payload) => {
      const now = new Date();
      return computeLeaderboards(payload.weekKey ?? currentWeekKey(now), { now });
    },
    { queue: "rollups", maxAttempts: 3 },
  );
  registerJobHandler(
    LEADERBOARD_WEEKLY_CLOSE_JOB,
    payloadSchema,
    async (payload) => {
      const now = new Date();
      return computeLeaderboards(weekToClose(payload, now), { now, final: true });
    },
    { queue: "rollups", maxAttempts: 5 },
  );
  registerRecurringJob(LEADERBOARD_SNAPSHOT_JOB, 60, LEADERBOARD_SNAPSHOT_JOB, { offsetMinutes: 20, queue: "rollups" });
  registerRecurringJob(LEADERBOARD_WEEKLY_CLOSE_JOB, 7 * 1440, LEADERBOARD_WEEKLY_CLOSE_JOB, { offsetMinutes: WEEKLY_CLOSE_OFFSET_MINUTES, queue: "rollups" });
}
