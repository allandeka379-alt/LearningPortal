import { createHash, randomInt, randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { addDays, dateColumnFromLocalDate, type LocalDate } from "@/lib/dates";
import { db } from "@/server/db";
import { DEFAULT_AI_CONFIG } from "./config";
import { createAiGateway } from "./gateway";
import { spendShard, type UsageRecord } from "./meter";
import { DbUsageMeter } from "./meter-db";
import { ZERO_USAGE } from "./pricing";
import { DbResponseCache, invalidateResponseCacheForSubject, purgeExpiredResponseCache } from "./response-cache-db";
import { fakeMessage, FakeTransport } from "./testing/fake-transport";

/**
 * Integration tests against the test database (app_rw role). Every fixture is unique to this file: fresh users, and
 * spend counters on far-future platform days no real traffic or other test uses. Nothing is truncated.
 */

const createdUsers: string[] = [];
const spendDates: LocalDate[] = [];
const cacheKeys: string[] = [];

async function createUser(): Promise<string> {
  const user = await db.user.create({ data: { emailNormalized: `ai-meter-${randomUUID()}@test.invalid` } });
  createdUsers.push(user.id);
  return user.id;
}

/** A unique far-future day so spend sums only see this test's increments. */
function uniqueDay(): LocalDate {
  const day = addDays("2300-01-01", randomInt(0, 300_000));
  spendDates.push(day);
  return day;
}

function uniqueCacheKey(): string {
  const key = createHash("sha256").update(randomUUID()).digest("hex");
  cacheKeys.push(key);
  return key;
}

async function usageRow(userId: string, date: LocalDate) {
  return db.aiUsageDaily.findUnique({
    where: { userId_date_feature: { userId, date: dateColumnFromLocalDate(date), feature: "TUTOR" } },
  });
}

afterAll(async () => {
  // Remove only what this file created; users (and their ledger rows) stay, like other integration tests.
  if (spendDates.length > 0) {
    await db.aiSpendDaily.deleteMany({ where: { date: { in: spendDates.map(dateColumnFromLocalDate) } } });
  }
  if (cacheKeys.length > 0) await db.aiResponseCache.deleteMany({ where: { cacheKey: { in: cacheKeys } } });
  if (createdUsers.length > 0) {
    await db.aiUsageDaily.deleteMany({ where: { userId: { in: createdUsers } } });
  }
});

describe("DbUsageMeter quota reservation", () => {
  it("reserves up to the daily limit and refuses beyond it", async () => {
    const meter = new DbUsageMeter();
    const userId = await createUser();
    const reservation = { userId, date: "2026-10-05", feature: "TUTOR" as const, cost: 1 };
    expect(await meter.reserve(reservation, 2)).toBe(true);
    expect(await meter.reserve(reservation, 2)).toBe(true);
    expect(await meter.reserve(reservation, 2)).toBe(false);
    expect(await usageRow(userId, "2026-10-05")).toMatchObject({ reservedRequests: 2, requests: 0 });

    await meter.release(reservation);
    expect(await usageRow(userId, "2026-10-05")).toMatchObject({ reservedRequests: 1 });
  });

  it("never overshoots the limit under concurrent bursts", async () => {
    const meter = new DbUsageMeter();
    const userId = await createUser();
    const reservation = { userId, date: "2026-10-05", feature: "TUTOR" as const, cost: 1 };
    const results = await Promise.all(Array.from({ length: 8 }, () => meter.reserve(reservation, 3)));
    expect(results.filter(Boolean)).toHaveLength(3);
    expect(await usageRow(userId, "2026-10-05")).toMatchObject({ reservedRequests: 3 });
  });

  it("refuses a first reservation larger than the limit and allows unlimited plans", async () => {
    const meter = new DbUsageMeter();
    const userId = await createUser();
    expect(await meter.reserve({ userId, date: "2026-10-05", feature: "TUTOR", cost: 2 }, 1)).toBe(false);
    expect(await usageRow(userId, "2026-10-05")).toBeNull();
    expect(await meter.reserve({ userId, date: "2026-10-05", feature: "TUTOR", cost: 2 }, null)).toBe(true);
  });

  it("PAY-5: TUTOR and WHATSAPP share ONE aiMessagesPerDay bucket; the solver keeps its own", async () => {
    const meter = new DbUsageMeter();
    const userId = await createUser();
    const tutor = { userId, date: "2026-10-05", feature: "TUTOR" as const, cost: 1 };
    const whatsapp = { userId, date: "2026-10-05", feature: "WHATSAPP" as const, cost: 1 };
    expect(await meter.reserve(tutor, 3)).toBe(true);
    expect(await meter.reserve(tutor, 3)).toBe(true);
    expect(await meter.reserve(whatsapp, 3)).toBe(true);
    // Three messages used across both channels: neither channel gets a fourth.
    expect(await meter.reserve(whatsapp, 3)).toBe(false);
    expect(await meter.reserve(tutor, 3)).toBe(false);
    // Settled requests count too (a settled WhatsApp message frees nothing for the tutor).
    await meter.record({
      userId,
      date: "2026-10-05",
      platformDate: uniqueDay(),
      feature: "WHATSAPP",
      reservedCost: 1,
      requests: 1,
      cacheHit: false,
      deepRequests: 0,
      images: 0,
      usage: ZERO_USAGE,
      costMicros: 1,
    });
    expect(await meter.reserve(tutor, 3)).toBe(false);
    expect(await meter.reserve({ userId, date: "2026-10-05", feature: "SOLVER", cost: 1 }, 1)).toBe(true);
  });

  it("PAY-5: a cross-channel burst never overshoots the shared allowance", async () => {
    const meter = new DbUsageMeter();
    const userId = await createUser();
    const results = await Promise.all(
      Array.from({ length: 8 }, (_, i) => meter.reserve({ userId, date: "2026-10-05", feature: i % 2 === 0 ? "TUTOR" : "WHATSAPP", cost: 1 }, 3)),
    );
    expect(results.filter(Boolean)).toHaveLength(3);
    const rows = await db.aiUsageDaily.findMany({ where: { userId, date: dateColumnFromLocalDate("2026-10-05") }, select: { reservedRequests: true } });
    expect(rows.reduce((sum, row) => sum + row.reservedRequests, 0)).toBe(3);
  });
});

describe("DbUsageMeter metering", () => {
  it("settles the reservation and adds tokens, cost and the global spend shard", async () => {
    const meter = new DbUsageMeter({ spendCacheMs: 0 });
    const userId = await createUser();
    const platformDate = uniqueDay();
    await meter.reserve({ userId, date: "2026-10-05", feature: "TUTOR", cost: 1 }, 5);
    const record: UsageRecord = {
      userId,
      date: "2026-10-05",
      platformDate,
      feature: "TUTOR",
      reservedCost: 1,
      requests: 1,
      cacheHit: false,
      deepRequests: 0,
      images: 1,
      usage: { inputTokens: 1000, outputTokens: 500, cacheReadTokens: 2000, cacheWriteTokens: 400 },
      costMicros: 8400,
    };
    await meter.record(record);
    expect(await usageRow(userId, "2026-10-05")).toMatchObject({
      requests: 1,
      reservedRequests: 0,
      images: 1,
      inputTokens: 1000,
      outputTokens: 500,
      cacheReadTokens: 2000,
      cacheWriteTokens: 400,
      costMicros: 8400,
    });
    const shard = await db.aiSpendDaily.findUnique({
      where: { date_shard: { date: dateColumnFromLocalDate(platformDate), shard: spendShard(userId) } },
    });
    expect(shard).toMatchObject({ costMicros: 8400n, requests: 1 });
    expect(await meter.getDailySpendMicros(platformDate)).toBe(8400);
  });

  it("creates the ledger row for un-reserved sub-calls and sums spend across shards", async () => {
    const meter = new DbUsageMeter({ spendCacheMs: 0 });
    const platformDate = uniqueDay();
    const users = [await createUser(), await createUser(), await createUser()];
    for (const userId of users) {
      await meter.record({
        userId,
        date: "2026-10-06",
        platformDate,
        feature: "TUTOR",
        reservedCost: 0,
        requests: 0,
        cacheHit: false,
        deepRequests: 0,
        images: 0,
        usage: { ...ZERO_USAGE, inputTokens: 10 },
        costMicros: 100,
      });
    }
    expect(await usageRow(users[0]!, "2026-10-06")).toMatchObject({ requests: 0, costMicros: 100, inputTokens: 10 });
    expect(await meter.getDailySpendMicros(platformDate)).toBe(300);
    expect(await meter.getDailySpendMicros(uniqueDay())).toBe(0);
  });

  it("caches the spend total and adds its own increments to the cached value", async () => {
    let now = 0;
    const meter = new DbUsageMeter({ spendCacheMs: 30_000, now: () => now });
    const platformDate = uniqueDay();
    const userId = await createUser();
    expect(await meter.getDailySpendMicros(platformDate)).toBe(0);
    await meter.record({
      userId,
      date: "2026-10-05",
      platformDate,
      feature: "TUTOR",
      reservedCost: 0,
      requests: 0,
      cacheHit: false,
      deepRequests: 0,
      images: 0,
      usage: ZERO_USAGE,
      costMicros: 250,
    });
    expect(await meter.getDailySpendMicros(platformDate)).toBe(250);
    now += 31_000;
    expect(await meter.getDailySpendMicros(platformDate)).toBe(250);
  });
});

describe("DbResponseCache", () => {
  const entry = (cacheKey: string, expiresAt: Date) => ({
    cacheKey,
    feature: "WHATSAPP" as const,
    model: "claude-haiku-4-5",
    promptVersion: "test-v1",
    subjectId: null,
    response: "Photosynthesis is how plants make food using light.",
    usage: { ...ZERO_USAGE, inputTokens: 100, outputTokens: 40 },
    costMicros: 300,
    expiresAt,
  });

  it("returns live entries, counts hits, and ignores expired ones", async () => {
    const cache = new DbResponseCache();
    const now = new Date();
    const live = uniqueCacheKey();
    await cache.put(entry(live, new Date(now.getTime() + 3_600_000)));
    const hit = await cache.get(live, now);
    expect(hit).toMatchObject({ response: expect.stringContaining("Photosynthesis"), model: "claude-haiku-4-5" });
    await cache.get(live, now);
    expect((await db.aiResponseCache.findUnique({ where: { cacheKey: live } }))?.hitCount).toBe(2);

    const expired = uniqueCacheKey();
    await cache.put(entry(expired, new Date(now.getTime() - 1)));
    expect(await cache.get(expired, now)).toBeNull();
    // Re-putting refreshes an expired entry.
    await cache.put(entry(expired, new Date(now.getTime() + 3_600_000)));
    expect(await cache.get(expired, now)).not.toBeNull();
  });

  it("purges entries expired more than the grace period ago and keeps live ones", async () => {
    const cache = new DbResponseCache();
    const now = new Date();
    const old = uniqueCacheKey();
    const live = uniqueCacheKey();
    await cache.put(entry(old, new Date(now.getTime() - 3 * 86_400_000)));
    await cache.put(entry(live, new Date(now.getTime() + 3_600_000)));
    const removed = await purgeExpiredResponseCache({ now, graceHours: 24 });
    expect(removed).toBeGreaterThanOrEqual(1);
    expect(await db.aiResponseCache.findUnique({ where: { cacheKey: old } })).toBeNull();
    expect(await db.aiResponseCache.findUnique({ where: { cacheKey: live } })).not.toBeNull();
    expect(await invalidateResponseCacheForSubject(randomUUID())).toBe(0);
  });

  it("does not serve invalidated entries and tolerates concurrent writers", async () => {
    const cache = new DbResponseCache();
    const now = new Date();
    const key = uniqueCacheKey();
    await Promise.all([
      cache.put(entry(key, new Date(now.getTime() + 3_600_000))),
      cache.put(entry(key, new Date(now.getTime() + 3_600_000))),
    ]);
    await db.aiResponseCache.update({ where: { cacheKey: key }, data: { invalidatedAt: now } });
    expect(await cache.get(key, now)).toBeNull();
  });
});

describe("gateway + Postgres metering end to end", () => {
  it("reserves, calls, settles and serves a cache hit, all recorded in AiUsageDaily / AiSpendDaily", async () => {
    const userId = await createUser();
    const platformDate = uniqueDay();
    const clock = () => new Date(`${platformDate}T09:00:00Z`);
    const config = structuredClone(DEFAULT_AI_CONFIG);
    config.routing.routes.whatsapp = { tier: "FAST", maxTokens: 512, cacheable: true };
    const transport = new FakeTransport().enqueue({
      message: fakeMessage({
        model: "claude-haiku-4-5",
        text: `Answer ${randomUUID()}`,
        usage: { input_tokens: 600, output_tokens: 250 },
      }),
    });
    const gateway = createAiGateway({
      transport,
      config,
      meter: new DbUsageMeter({ spendCacheMs: 0 }),
      responseCache: new DbResponseCache(),
      clock,
    });
    const question = `What is diffusion ${randomUUID()}?`;
    const call = {
      route: "whatsapp",
      feature: "WHATSAPP" as const,
      userId,
      maxTier: "STANDARD" as const,
      quota: { dailyLimit: 5 },
      system: { stable: ["POLICY"] },
      messages: [{ role: "user" as const, content: question }],
      cacheKey: { level: "zimsec:o-level" },
      promptVersion: "test-v1",
    };
    const first = await gateway.complete(call);
    expect(first.costMicros).toBe(600 * 1 + 250 * 5);
    const second = await gateway.complete(call);
    expect(second.cached).toBe(true);
    expect(transport.calls).toHaveLength(1);
    if (second.cacheEntryId) {
      const row = await db.aiResponseCache.findUnique({ where: { id: second.cacheEntryId } });
      if (row) cacheKeys.push(row.cacheKey);
    }

    const usage = await db.aiUsageDaily.findUnique({
      where: { userId_date_feature: { userId, date: dateColumnFromLocalDate(platformDate), feature: "WHATSAPP" } },
    });
    expect(usage).toMatchObject({ requests: 2, reservedRequests: 0, cacheHits: 1, costMicros: 1850, inputTokens: 600 });
    const spend = await new DbUsageMeter({ spendCacheMs: 0 }).getDailySpendMicros(platformDate);
    expect(spend).toBe(1850);
  });
});
