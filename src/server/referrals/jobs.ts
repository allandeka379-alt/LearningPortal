import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { REFERRAL_QUALIFY_JOB, REFERRAL_SWEEP_JOB, qualifyReferral, sweepReferrals } from "./service";

/**
 * Referral jobs (§46). Register once from src/worker/handlers.ts: `registerReferralJobs();`.
 *
 * - `referrals.qualify` { referredUserId } (default queue): enqueued by `enqueueReferralCheck` after a successful
 *   payment or onboarding completion; dedupe key `referral:qualify:{userId}`.
 * - `referrals.sweep` (default queue): every 6 hours at :45, re-checks PENDING referrals (activity days accrue without
 *   any event) and retries QUALIFIED ones whose reward failed; also expires referrals past the qualifying window.
 */

const qualifyPayload = z.looseObject({ referredUserId: z.uuid() });
const sweepPayload = z.looseObject({ periodStart: z.iso.datetime().optional() });

export function registerReferralJobs(): void {
  registerJobHandler(REFERRAL_QUALIFY_JOB, qualifyPayload, async (payload) => qualifyReferral(payload.referredUserId), { queue: "default", maxAttempts: 5 });
  registerJobHandler(REFERRAL_SWEEP_JOB, sweepPayload, async () => sweepReferrals(), { queue: "default", maxAttempts: 3 });
  registerRecurringJob(REFERRAL_SWEEP_JOB, 360, REFERRAL_SWEEP_JOB, { offsetMinutes: 45 });
}
