import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";

/**
 * Auth housekeeping (ARCHITECTURE §5.13 retention): expired / revoked sessions are deleted 30 days after they ended,
 * one-time codes 24 hours after they expired. Register with {@link registerAuthJobs} from `registerAllJobs()`
 * (src/worker/handlers.ts).
 */

const DAY_MS = 24 * 60 * 60_000;
export const SESSION_RETENTION_MS = 30 * DAY_MS;
export const VERIFICATION_CODE_RETENTION_MS = DAY_MS;

const BATCH = 5_000;
const MAX_BATCHES = 100;

export interface PurgeOptions {
  now?: Date;
  /** Limit the purge to one user's rows (tests; targeted clean-up). */
  userId?: string;
}

/**
 * Deletes sessions that expired or were revoked more than 30 days ago. Batched by id so each statement stays short.
 * Comparisons use application-written timestamps (consistent regardless of the database session time zone).
 */
export async function purgeExpiredSessions(options: PurgeOptions = {}): Promise<number> {
  const cutoff = new Date((options.now ?? new Date()).getTime() - SESSION_RETENTION_MS);
  let total = 0;
  for (let i = 0; i < MAX_BATCHES; i += 1) {
    const rows = await db.session.findMany({
      where: {
        ...(options.userId ? { userId: options.userId } : {}),
        OR: [{ expiresAt: { lt: cutoff } }, { absoluteExpiresAt: { lt: cutoff } }, { revokedAt: { lt: cutoff } }],
      },
      select: { id: true },
      take: BATCH,
    });
    if (rows.length === 0) break;
    const { count } = await db.session.deleteMany({ where: { id: { in: rows.map((row) => row.id) } } });
    total += count;
    if (rows.length < BATCH) break;
  }
  return total;
}

/** Deletes one-time codes that expired more than 24 hours ago. */
export async function purgeExpiredVerificationCodes(options: PurgeOptions = {}): Promise<number> {
  const cutoff = new Date((options.now ?? new Date()).getTime() - VERIFICATION_CODE_RETENTION_MS);
  let total = 0;
  for (let i = 0; i < MAX_BATCHES; i += 1) {
    const rows = await db.verificationCode.findMany({
      where: { ...(options.userId ? { userId: options.userId } : {}), expiresAt: { lt: cutoff } },
      select: { id: true },
      take: BATCH,
    });
    if (rows.length === 0) break;
    const { count } = await db.verificationCode.deleteMany({ where: { id: { in: rows.map((row) => row.id) } } });
    total += count;
    if (rows.length < BATCH) break;
  }
  return total;
}

const recurringPayload = z.looseObject({ periodStart: z.iso.datetime().optional() });

/** Registers the auth maintenance jobs (daily, 03:30 / 03:35 CAT). */
export function registerAuthJobs(): void {
  registerJobHandler("auth.purgeSessions", recurringPayload, async () => ({ deleted: await purgeExpiredSessions() }), {
    queue: "default",
    maxAttempts: 3,
  });
  registerJobHandler(
    "auth.purgeVerificationCodes",
    recurringPayload,
    async () => ({ deleted: await purgeExpiredVerificationCodes() }),
    { queue: "default", maxAttempts: 3 },
  );
  registerRecurringJob("auth.purgeSessions", 1440, "auth.purgeSessions", { offsetMinutes: 90 });
  registerRecurringJob("auth.purgeVerificationCodes", 1440, "auth.purgeVerificationCodes", { offsetMinutes: 95 });
}
