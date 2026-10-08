import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import type { CachedResponse, ResponseCacheEntry, ResponseCacheStore } from "./response-cache";

/**
 * `ai.cache.purge` job body (daily): deletes entries that expired or were invalidated more than `graceHours` ago, in
 * bounded batches. Returns the number of rows removed.
 */
export async function purgeExpiredResponseCache(
  options: { now?: Date; graceHours?: number; batchSize?: number; maxBatches?: number; client?: DbClient } = {},
): Promise<number> {
  const client = options.client ?? db;
  const cutoff = new Date((options.now ?? new Date()).getTime() - (options.graceHours ?? 24) * 3_600_000);
  const batchSize = options.batchSize ?? 1_000;
  let removed = 0;
  for (let batch = 0; batch < (options.maxBatches ?? 100); batch += 1) {
    const deleted = await client.$executeRaw`
      DELETE FROM "AiResponseCache"
       WHERE "id" IN (SELECT "id" FROM "AiResponseCache"
                       WHERE "expiresAt" < ${cutoff} OR "invalidatedAt" < ${cutoff}
                       LIMIT ${batchSize})`;
    removed += deleted;
    if (deleted < batchSize) break;
  }
  return removed;
}

/** Content correction in a subject (§42): stop serving its cached answers immediately. Returns rows invalidated. */
export async function invalidateResponseCacheForSubject(
  subjectId: string,
  options: { now?: Date; client?: DbClient } = {},
): Promise<number> {
  const result = await (options.client ?? db).aiResponseCache.updateMany({
    where: { subjectId, invalidatedAt: null },
    data: { invalidatedAt: options.now ?? new Date() },
  });
  return result.count;
}

/** Postgres-backed {@link ResponseCacheStore} over `AiResponseCache`. */
export class DbResponseCache implements ResponseCacheStore {
  constructor(private readonly client: DbClient = db) {}

  async get(cacheKey: string, now: Date): Promise<CachedResponse | null> {
    // One statement: only a live entry is touched, and the hit is counted atomically.
    const rows = await this.client.$queryRaw<CachedResponse[]>`
      UPDATE "AiResponseCache"
         SET "hitCount" = "hitCount" + 1, "lastHitAt" = ${now}
       WHERE "cacheKey" = ${cacheKey} AND "invalidatedAt" IS NULL AND "expiresAt" > ${now}
      RETURNING "id", "response", "model"`;
    return rows[0] ?? null;
  }

  async put(entry: ResponseCacheEntry): Promise<void> {
    const values = {
      feature: entry.feature,
      model: entry.model,
      promptVersion: entry.promptVersion,
      subjectId: entry.subjectId,
      response: entry.response,
      inputTokens: entry.usage.inputTokens,
      outputTokens: entry.usage.outputTokens,
      costMicros: entry.costMicros,
      expiresAt: entry.expiresAt,
    };
    try {
      await this.client.aiResponseCache.upsert({
        where: { cacheKey: entry.cacheKey },
        create: { cacheKey: entry.cacheKey, ...values },
        // Refresh an expired/invalidated entry with the new answer.
        update: { ...values, invalidatedAt: null, hitCount: 0, lastHitAt: null },
      });
    } catch (error) {
      // A concurrent writer created the same key first: theirs is equally valid.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return;
      throw error;
    }
  }
}
