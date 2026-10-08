import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { isFeatureEnabled } from "@/server/features";
import { registerJobHandler, registerRecurringJob, type JobContext } from "@/server/lib/jobs";
import { WHATSAPP_PROCESS_JOB } from "./inbound";
import { SEND_MAX_ATTEMPTS, sendPayloadSchema, sendQueuedMessage, WHATSAPP_QUEUE, WHATSAPP_SEND_JOB } from "./outbound";
import { processInboundMessage, type ProcessOutcome } from "./router";

/**
 * Worker registration for the WhatsApp channel (ARCHITECTURE §3.7, §8). Wire it in `src/worker/handlers.ts`
 * `registerAllJobs()` with one line: `registerWhatsAppJobs();`.
 *
 * - `whatsapp.process` (notifications queue, 3 attempts): one inbound message, enqueued by the webhook in the same
 *   transaction as the message row (dedupe `whatsapp.process:{channelMessageId}`).
 * - `whatsapp.send` (notifications queue, 5 attempts, backoff): one outbound message (dedupe
 *   `whatsapp.send:{channelMessageId}`).
 * - `whatsapp.purge` (daily 03:45 CAT): retention (ARCHITECTURE §5.13): STANDARD bodies / payloads older than 90 days
 *   are nulled (`bodyPurgedAt`, metadata kept for billing and dedupe); UNLINKED identities idle for 90 days are deleted
 *   (their messages keep metadata with `identityId` NULL).
 *
 * Switched off (`features.whatsapp`, the default; docs/ARCHITECTURE.md §3.14): the handlers stay registered, so
 * leftover jobs finish cleanly, but they do nothing: `whatsapp.process` returns `noop` without reading or answering the
 * message, `whatsapp.send` closes the row without reaching a transport (./outbound). No Graph API call is made. The
 * retention purge keeps running (it only deletes data).
 */

/** Handler of `whatsapp.process`: a no-op while the channel is switched off. */
export async function runWhatsAppProcessJob(
  payload: { messageId: string },
  context: Pick<JobContext, "attempt" | "maxAttempts" | "logger">,
): Promise<ProcessOutcome> {
  if (!(await isFeatureEnabled("whatsapp"))) {
    context.logger.info("whatsapp.process skipped: the channel is switched off");
    return { status: "noop", command: null, replies: 0 };
  }
  return processInboundMessage(payload.messageId, { attempt: context.attempt, maxAttempts: context.maxAttempts, logger: context.logger });
}

export const WHATSAPP_PURGE_JOB = "whatsapp.purge";
export const PROCESS_MAX_ATTEMPTS = 3;
export const RETENTION_DAYS = 90;

const processPayloadSchema = z.object({ messageId: z.uuid() });
const purgePayloadSchema = z.looseObject({ periodStart: z.string().optional() });

/** Retention purge (batched). Returns what was removed. */
export async function purgeWhatsAppData(options: { retentionDays?: number; batchSize?: number; maxBatches?: number } = {}): Promise<{
  bodiesPurged: number;
  identitiesDeleted: number;
}> {
  const days = options.retentionDays ?? RETENTION_DAYS;
  const batchSize = options.batchSize ?? 5_000;
  const maxBatches = options.maxBatches ?? 50;
  let bodiesPurged = 0;
  for (let i = 0; i < maxBatches; i += 1) {
    const purged = await db.$executeRaw`
      UPDATE "ChannelMessage"
         SET "body" = NULL, "payload" = NULL, "bodyPurgedAt" = now(), "updatedAt" = now()
       WHERE "id" IN (
         SELECT "id" FROM "ChannelMessage"
          WHERE "contentClass" = 'STANDARD' AND ("body" IS NOT NULL OR "payload" IS NOT NULL)
            AND "status" <> 'QUEUED' AND "createdAt" < now() - make_interval(days => ${days}::int)
          LIMIT ${batchSize})`;
    bodiesPurged += purged;
    if (purged < batchSize) break;
  }
  let identitiesDeleted = 0;
  for (let i = 0; i < maxBatches; i += 1) {
    const deleted = await db.$executeRaw`
      DELETE FROM "ChannelIdentity"
       WHERE "id" IN (
         SELECT "id" FROM "ChannelIdentity"
          WHERE "userId" IS NULL AND COALESCE("lastInboundAt", "createdAt") < now() - make_interval(days => ${days}::int)
          LIMIT ${batchSize})`;
    identitiesDeleted += deleted;
    if (deleted < batchSize) break;
  }
  return { bodiesPurged, identitiesDeleted };
}

/** Registers `whatsapp.process`, `whatsapp.send` and the daily `whatsapp.purge`. */
export function registerWhatsAppJobs(): void {
  registerJobHandler(WHATSAPP_PROCESS_JOB, processPayloadSchema, runWhatsAppProcessJob, { queue: WHATSAPP_QUEUE, maxAttempts: PROCESS_MAX_ATTEMPTS });
  registerJobHandler(
    WHATSAPP_SEND_JOB,
    sendPayloadSchema,
    async (payload, context) => sendQueuedMessage(payload.messageId, { attempt: context.attempt, maxAttempts: context.maxAttempts, logger: context.logger }),
    { queue: WHATSAPP_QUEUE, maxAttempts: SEND_MAX_ATTEMPTS },
  );
  registerJobHandler(WHATSAPP_PURGE_JOB, purgePayloadSchema, async () => purgeWhatsAppData(), { queue: "default", maxAttempts: 3 });
  // Daily at 03:45 CAT (01:45 UTC), after the nightly rollups and the job purge.
  registerRecurringJob(WHATSAPP_PURGE_JOB, 1440, WHATSAPP_PURGE_JOB, { offsetMinutes: 105 });
}
