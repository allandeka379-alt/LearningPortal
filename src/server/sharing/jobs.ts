import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { purgeExpiredShares } from "./service";

/**
 * Sharing jobs (§46; ARCHITECTURE §3.7 maintenance.purge "expired share cards"). Register once from
 * src/worker/handlers.ts: `registerSharingJobs();`.
 *
 * - `sharing.purgeExpired` (default queue): daily 03:30 CAT (01:30 UTC) — deletes shares expired or revoked more than
 *   30 days ago (the public page already 404s them).
 */

export const SHARING_PURGE_JOB = "sharing.purgeExpired";

export function registerSharingJobs(): void {
  registerJobHandler(SHARING_PURGE_JOB, z.looseObject({ periodStart: z.iso.datetime().optional() }), async () => ({ deleted: await purgeExpiredShares() }), {
    queue: "default",
    maxAttempts: 3,
  });
  registerRecurringJob(SHARING_PURGE_JOB, 1440, SHARING_PURGE_JOB, { offsetMinutes: 90 });
}
