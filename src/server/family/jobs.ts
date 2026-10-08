import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { PARENT_DIGEST_EVERY_MINUTES, PARENT_DIGEST_JOB, PARENT_DIGEST_OFFSET_MINUTES, runParentDigest } from "./digest";

/**
 * Family background jobs. Register with ONE line in `registerAllJobs()` (src/worker/handlers.ts):
 *   registerFamilyJobs(); // family.parentDigest (weekly) + family.expireLinkInvites (hourly)
 */

export const EXPIRE_LINK_INVITES_JOB = "family.expireLinkInvites";
const EXPIRE_BATCH = 1_000;
const MAX_EXPIRE_BATCHES = 50;

/**
 * Ends PENDING episodes whose code or request has expired: status REVOKED (reason "expired", no human actor), invite
 * hash cleared (schema: "nulled when consumed or expired"). Batched, idempotent. Returns the number of rows ended.
 */
export async function expireLinkInvites(now: Date = new Date()): Promise<number> {
  let total = 0;
  for (let batch = 0; batch < MAX_EXPIRE_BATCHES; batch += 1) {
    const ended = await db.$executeRaw`
      UPDATE "ParentStudentLink"
         SET "status" = 'REVOKED', "revokedAt" = ${now}, "revokeReason" = 'expired', "inviteCodeHash" = NULL,
             "canViewAiConversations" = false, "updatedAt" = ${now}
       WHERE "id" IN (SELECT "id" FROM "ParentStudentLink"
                       WHERE "status" = 'PENDING' AND "inviteExpiresAt" < ${now}
                       LIMIT ${EXPIRE_BATCH})`;
    total += ended;
    if (ended < EXPIRE_BATCH) break;
  }
  return total;
}

const recurringPayload = z.looseObject({ periodStart: z.iso.datetime().optional() });

export function registerFamilyJobs(): void {
  registerJobHandler(
    PARENT_DIGEST_JOB,
    recurringPayload,
    async (payload, ctx) => runParentDigest({ ...(payload.periodStart ? { periodStart: new Date(payload.periodStart) } : {}), signal: ctx.signal }),
    { queue: "notifications", maxAttempts: 3 },
  );
  registerJobHandler(EXPIRE_LINK_INVITES_JOB, recurringPayload, async () => ({ expired: await expireLinkInvites() }), {
    queue: "default",
    maxAttempts: 3,
  });
  registerRecurringJob(PARENT_DIGEST_JOB, PARENT_DIGEST_EVERY_MINUTES, PARENT_DIGEST_JOB, {
    offsetMinutes: PARENT_DIGEST_OFFSET_MINUTES,
    queue: "notifications",
  });
  registerRecurringJob(EXPIRE_LINK_INVITES_JOB, 60, EXPIRE_LINK_INVITES_JOB, { offsetMinutes: 23 });
}
