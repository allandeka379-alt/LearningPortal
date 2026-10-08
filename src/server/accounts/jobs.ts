import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { EXPORT_JOB, PRIVACY_SWEEP_JOB, processDuePrivacyRequests, runDataExport } from "./privacy";
import { purgeExpiredAiMessageContent, purgeExpiredSolverPhotos } from "./retention";

/**
 * Privacy and retention jobs (ARCHITECTURE §3.7 `accounts.exportData`, `accounts.deleteUser`, `maintenance.purge`):
 *
 * - `accounts.exportData` (on request): builds one data export (./privacy.ts).
 * - `accounts.privacySweep` (hourly, :37): deletions whose 14-day grace period is over; expired export files.
 * - `accounts.retentionPurge` (daily 04:10 CAT = 02:10 UTC): solver photos over 30 days, AI message text over
 *   12 months (./retention.ts).
 *
 * Every handler is idempotent.
 */

export const RETENTION_PURGE_JOB = "accounts.retentionPurge";

const exportPayloadSchema = z.object({ requestId: z.uuid() });

export function registerAccountsJobs(): void {
  registerJobHandler(
    EXPORT_JOB,
    exportPayloadSchema,
    async (payload, context) => runDataExport(payload.requestId, { finalAttempt: context.attempt >= context.maxAttempts }),
    { queue: "default", maxAttempts: 3 },
  );
  registerJobHandler(PRIVACY_SWEEP_JOB, z.unknown(), async () => processDuePrivacyRequests(), { queue: "default", maxAttempts: 3 });
  registerJobHandler(
    RETENTION_PURGE_JOB,
    z.unknown(),
    async () => {
      const photos = await purgeExpiredSolverPhotos();
      const aiText = await purgeExpiredAiMessageContent();
      return { solverPhotos: photos.assets, objects: photos.objects, aiMessages: aiText.messages, aiConversations: aiText.conversations };
    },
    { queue: "default", maxAttempts: 3 },
  );

  registerRecurringJob(PRIVACY_SWEEP_JOB, 60, PRIVACY_SWEEP_JOB, { offsetMinutes: 37 });
  registerRecurringJob(RETENTION_PURGE_JOB, 1440, RETENTION_PURGE_JOB, { offsetMinutes: 130 });
}
