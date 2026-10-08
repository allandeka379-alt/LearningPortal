import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { AUTO_SUBMIT_JOB } from "./policy";
import { autoSubmitExpired, closeAttemptIfDue } from "./submit";

/**
 * Worker registration for the attempt engine (ARCHITECTURE §3.7 `exams.autoSubmit`):
 * - per attempt: enqueued at start for `deadline + late-sync grace` (dedupe `autosubmit:{attemptId}`), payload
 *   `{ attemptId }`; closes the attempt if it is still open and due (idempotent: a submitted attempt is left alone);
 * - sweep: the same job type without `attemptId`, every 5 minutes (minute 1 of each period), closes every expired timed
 *   attempt and idle untimed attempt (missed jobs, per-paper mocks, abandoned practice).
 *
 * Wire it in src/worker/handlers.ts `registerAllJobs()` with one line: `registerAttemptJobs();`.
 */
export const autoSubmitPayloadSchema = z.looseObject({
  attemptId: z.uuid().optional(),
  periodStart: z.string().optional(),
});

/** Registers the `exams.autoSubmit` handler and its 5-minute sweep schedule. */
export function registerAttemptJobs(): void {
  registerJobHandler(
    AUTO_SUBMIT_JOB,
    autoSubmitPayloadSchema,
    async (payload) => {
      if (payload.attemptId) return { attemptId: payload.attemptId, status: await closeAttemptIfDue(payload.attemptId) };
      return autoSubmitExpired();
    },
    { queue: "default", maxAttempts: 5 },
  );
  registerRecurringJob("exams.autoSubmitSweep", 5, AUTO_SUBMIT_JOB, { offsetMinutes: 1 });
}
