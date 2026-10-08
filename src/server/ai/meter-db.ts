import "server-only";
import { Prisma, type AiFeature } from "@/generated/prisma/client";
import type { LocalDate } from "@/lib/dates";
import { db, type DbClient } from "@/server/db";
import {
  assertValidRecord,
  assertValidReservation,
  quotaFeatures,
  spendShard,
  type QuotaReservation,
  type UsageMeter,
  type UsageRecord,
} from "./meter";

/**
 * Postgres-backed {@link UsageMeter} over `AiUsageDaily` and `AiSpendDaily` (no RLS on either; neither holds content).
 *
 * Every statement is a single parameterised `$queryRaw`/`$executeRaw` so the quota check and the increment are one
 * atomic step: concurrent requests for the same (user, day, feature) serialise on the row lock taken by
 * `INSERT ... ON CONFLICT DO UPDATE`, and the `WHERE` re-checks the limit against the latest row version, so a burst
 * can never overshoot the plan limit. Spend increments go to shard `spendShard(userId)` of the Harare day; the guard
 * sums at most 16 rows and caches the total for 30 s (own increments are added to the cached value immediately).
 */

export interface DbUsageMeterOptions {
  client?: DbClient;
  /** Spend-total cache lifetime (default 30 s, ARCHITECTURE §4.9). */
  spendCacheMs?: number;
  now?: () => number;
}

export class DbUsageMeter implements UsageMeter {
  private readonly client: DbClient;
  private readonly spendCacheMs: number;
  private readonly now: () => number;
  private readonly spendCache = new Map<LocalDate, { value: number; expiresAt: number }>();

  constructor(options: DbUsageMeterOptions = {}) {
    this.client = options.client ?? db;
    this.spendCacheMs = options.spendCacheMs ?? 30_000;
    this.now = options.now ?? Date.now;
  }

  async getDailySpendMicros(platformDate: LocalDate): Promise<number> {
    const cached = this.spendCache.get(platformDate);
    if (cached && cached.expiresAt > this.now()) return cached.value;
    const rows = await this.client.$queryRaw<{ total: bigint | null }[]>`
      SELECT SUM("costMicros")::bigint AS total FROM "AiSpendDaily" WHERE "date" = ${platformDate}::date`;
    const value = Number(rows[0]?.total ?? 0n);
    this.spendCache.set(platformDate, { value, expiresAt: this.now() + this.spendCacheMs });
    return value;
  }

  async reserve(reservation: QuotaReservation, dailyLimit: number | null): Promise<boolean> {
    assertValidReservation(reservation);
    if (dailyLimit !== null && (!Number.isInteger(dailyLimit) || dailyLimit < 0)) {
      throw new RangeError("dailyLimit must be a non-negative integer or null");
    }
    const shared = quotaFeatures(reservation.feature);
    if (dailyLimit !== null && shared.length > 1) {
      const limit = dailyLimit;
      const client = this.client;
      return "$transaction" in client
        ? client.$transaction((tx) => this.reserveShared(tx, reservation, limit, shared))
        : this.reserveShared(client, reservation, limit, shared); // already inside the caller's transaction
    }
    const { userId, date, feature, cost } = reservation;
    const rows = await this.client.$queryRaw<{ id: string }[]>`
      INSERT INTO "AiUsageDaily" ("id", "userId", "date", "feature", "reservedRequests", "updatedAt")
      SELECT uuidv7(), ${userId}::uuid, ${date}::date, ${feature}::"AiFeature", ${cost}::int, now()
       WHERE ${dailyLimit}::int IS NULL OR ${cost}::int <= ${dailyLimit}::int
      ON CONFLICT ("userId", "date", "feature") DO UPDATE
         SET "reservedRequests" = "AiUsageDaily"."reservedRequests" + EXCLUDED."reservedRequests",
             "updatedAt" = now()
       WHERE ${dailyLimit}::int IS NULL
          OR "AiUsageDaily"."requests" + "AiUsageDaily"."reservedRequests" + EXCLUDED."reservedRequests"
             <= ${dailyLimit}::int
      RETURNING "id"`;
    return rows.length === 1;
  }

  /**
   * Reservation against an allowance shared by several feature rows (PAY-5: `aiMessagesPerDay` = TUTOR + WHATSAPP).
   * One row's `ON CONFLICT ... WHERE` cannot see the other rows, so this runs in a transaction: a transaction-scoped
   * advisory lock per (user, day, bucket) serialises the bucket's reservations, then the bucket is summed with a fresh
   * statement (READ COMMITTED sees every earlier holder's commit) and the feature's row is incremented. Settlement and
   * release only ever lower the sum, so they need no lock.
   */
  private async reserveShared(tx: DbClient, reservation: QuotaReservation, dailyLimit: number, shared: readonly AiFeature[]): Promise<boolean> {
    const { userId, date, feature, cost } = reservation;
    const lockKey = `ai.quota:${userId}:${date}:${[...shared].sort().join("+")}`;
    await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))) l`;
    const used = await tx.$queryRaw<{ used: number }[]>`
      SELECT COALESCE(SUM("requests" + "reservedRequests"), 0)::int AS "used"
        FROM "AiUsageDaily"
       WHERE "userId" = ${userId}::uuid
         AND "date" = ${date}::date
         AND "feature" IN (${Prisma.join(shared.map((f) => Prisma.sql`${f}::"AiFeature"`))})`;
    if ((used[0]?.used ?? 0) + cost > dailyLimit) return false;
    const rows = await tx.$queryRaw<{ id: string }[]>`
      INSERT INTO "AiUsageDaily" ("id", "userId", "date", "feature", "reservedRequests", "updatedAt")
      VALUES (uuidv7(), ${userId}::uuid, ${date}::date, ${feature}::"AiFeature", ${cost}::int, now())
      ON CONFLICT ("userId", "date", "feature") DO UPDATE
         SET "reservedRequests" = "AiUsageDaily"."reservedRequests" + EXCLUDED."reservedRequests",
             "updatedAt" = now()
      RETURNING "id"`;
    return rows.length === 1;
  }

  async release(reservation: QuotaReservation): Promise<void> {
    const { userId, date, feature, cost } = reservation;
    await this.client.$executeRaw`
      UPDATE "AiUsageDaily"
         SET "reservedRequests" = GREATEST("reservedRequests" - ${cost}::int, 0), "updatedAt" = now()
       WHERE "userId" = ${userId}::uuid AND "date" = ${date}::date AND "feature" = ${feature}::"AiFeature"`;
  }

  async record(entry: UsageRecord): Promise<void> {
    assertValidRecord(entry);
    const { usage } = entry;
    const cacheHits = entry.cacheHit ? 1 : 0;
    const shard = spendShard(entry.userId);
    const settle = this.client.$executeRaw`
      INSERT INTO "AiUsageDaily" ("id", "userId", "date", "feature", "requests", "reservedRequests", "cacheHits",
                                  "deepRequests", "images", "inputTokens", "outputTokens", "cacheReadTokens",
                                  "cacheWriteTokens", "costMicros", "updatedAt")
      VALUES (uuidv7(), ${entry.userId}::uuid, ${entry.date}::date, ${entry.feature}::"AiFeature", ${entry.requests}::int,
              0, ${cacheHits}::int, ${entry.deepRequests}::int, ${entry.images}::int, ${usage.inputTokens}::int,
              ${usage.outputTokens}::int, ${usage.cacheReadTokens}::int, ${usage.cacheWriteTokens}::int,
              ${entry.costMicros}::int, now())
      ON CONFLICT ("userId", "date", "feature") DO UPDATE SET
        "requests"         = "AiUsageDaily"."requests" + EXCLUDED."requests",
        "reservedRequests" = GREATEST("AiUsageDaily"."reservedRequests" - ${entry.reservedCost}::int, 0),
        "cacheHits"        = "AiUsageDaily"."cacheHits" + EXCLUDED."cacheHits",
        "deepRequests"     = "AiUsageDaily"."deepRequests" + EXCLUDED."deepRequests",
        "images"           = "AiUsageDaily"."images" + EXCLUDED."images",
        "inputTokens"      = "AiUsageDaily"."inputTokens" + EXCLUDED."inputTokens",
        "outputTokens"     = "AiUsageDaily"."outputTokens" + EXCLUDED."outputTokens",
        "cacheReadTokens"  = "AiUsageDaily"."cacheReadTokens" + EXCLUDED."cacheReadTokens",
        "cacheWriteTokens" = "AiUsageDaily"."cacheWriteTokens" + EXCLUDED."cacheWriteTokens",
        "costMicros"       = "AiUsageDaily"."costMicros" + EXCLUDED."costMicros",
        "updatedAt"        = now()`;
    const spend = this.client.$executeRaw`
      INSERT INTO "AiSpendDaily" ("date", "shard", "costMicros", "requests", "updatedAt")
      VALUES (${entry.platformDate}::date, ${shard}::smallint, ${entry.costMicros}::bigint, 1, now())
      ON CONFLICT ("date", "shard") DO UPDATE SET
        "costMicros" = "AiSpendDaily"."costMicros" + EXCLUDED."costMicros",
        "requests"   = "AiSpendDaily"."requests" + EXCLUDED."requests",
        "updatedAt"  = now()`;
    if ("$transaction" in this.client) {
      await this.client.$transaction([settle, spend]);
    } else {
      // Already inside the caller's transaction.
      await settle;
      await spend;
    }
    const cached = this.spendCache.get(entry.platformDate);
    if (cached) cached.value += entry.costMicros;
  }
}
