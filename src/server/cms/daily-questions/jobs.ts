import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { fillDailyQuestions } from "./service";

/**
 * Daily-question jobs (§46; ARCHITECTURE §3.7). Register once from src/worker/handlers.ts: `registerDailyQuestionJobs();`.
 *
 * - `dailyQuestion.fill` (default queue, 3 attempts): nightly at 22:30 CAT (20:30 UTC). Fills tomorrow's daily question
 *   for every active subject with an eligible pool, and today's if it is still missing (catch-up after a failed run or
 *   a first deploy). Uses the real clock (not the period start), so a run retried after midnight still covers the new
 *   "tomorrow". Idempotent: existing days (an editor's choice or an earlier run) are never replaced.
 */

export const DAILY_QUESTION_FILL_JOB = "dailyQuestion.fill";

/** 22:30 CAT = 20:30 UTC, as minutes after the UTC day start. */
export const DAILY_QUESTION_FILL_OFFSET_MINUTES = 20 * 60 + 30;

export function registerDailyQuestionJobs(): void {
  registerJobHandler(
    DAILY_QUESTION_FILL_JOB,
    z.looseObject({ periodStart: z.iso.datetime().optional() }),
    async () => {
      const result = await fillDailyQuestions();
      return { dates: result.dates, scopes: result.scopes, created: result.created, alreadyScheduled: result.alreadyScheduled, exhausted: result.exhausted };
    },
    { queue: "default", maxAttempts: 3 },
  );
  registerRecurringJob(DAILY_QUESTION_FILL_JOB, 1440, DAILY_QUESTION_FILL_JOB, { offsetMinutes: DAILY_QUESTION_FILL_OFFSET_MINUTES });
}
