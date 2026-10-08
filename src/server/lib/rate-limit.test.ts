import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { uniqueSuffix } from "../../../tests/factories/index";
import { isAppError } from "./errors";
import {
  adminContactSendLimits,
  assertRateLimit,
  evaluateRateLimit,
  evaluateUncountedHit,
  peekRateLimit,
  purgeExpiredRateLimitBuckets,
  RATE_LIMIT_PRESETS,
  rateLimit,
  rateLimitHeaders,
  rateLimits,
  rateLimitSubject,
  reserveRateLimits,
} from "./rate-limit";

const T0 = new Date("2026-10-05T10:00:00.000Z");
const at = (seconds: number) => new Date(T0.getTime() + seconds * 1000);
const key = () => `test:${uniqueSuffix()}`;
/** A week-long window makes a window boundary during a test practically impossible. */
const LONG_WINDOW = 7 * 24 * 3600;

describe("evaluateRateLimit (pure)", () => {
  const rule = { limit: 10, windowSeconds: 60 };

  it("allows up to the limit within a fresh window", () => {
    const result = evaluateRateLimit({ count: 10, prevCount: 0, windowStart: T0, now: at(5) }, rule);
    expect(result).toMatchObject({ allowed: true, remaining: 0, retryAfterSeconds: 0 });
    expect(result.resetAt).toEqual(at(60));
    const fresh = evaluateRateLimit({ count: 1, prevCount: 0, windowStart: T0, now: at(5) }, rule);
    expect(fresh.remaining).toBe(9);
  });

  it("denies over the limit and waits for the next window when this window is full", () => {
    const result = evaluateRateLimit({ count: 11, prevCount: 0, windowStart: T0, now: at(15) }, rule);
    expect(result.allowed).toBe(false);
    // 45 s to the boundary, then (1 − 9/11)·60 s ≈ 10.9 s for this window's 11 hits to decay to 9.
    expect(result.retryAfterSeconds).toBe(56);
    expect(result.resetAt).toEqual(at(15 + 56));
  });

  it("weights the previous window (sliding approximation)", () => {
    // Half-way through: 10·0.5 + 6 = 11 > 10 → denied; previous weight must fall to 3/10 → at 42 s, i.e. 12 s from now.
    const denied = evaluateRateLimit({ count: 6, prevCount: 10, windowStart: T0, now: at(30) }, rule);
    expect(denied.allowed).toBe(false);
    expect(denied.retryAfterSeconds).toBe(12);
    const allowed = evaluateRateLimit({ count: 5, prevCount: 10, windowStart: T0, now: at(30) }, rule);
    expect(allowed).toMatchObject({ allowed: true, remaining: 0 });
  });

  it("computes the retry time of an uncounted hit without that hit", () => {
    const limitOne = { limit: 1, windowSeconds: 60 };
    // One real send at the start of this window; a refused second hit must not push the retry into a further window.
    const uncounted = evaluateUncountedHit({ count: 2, prevCount: 0, windowStart: T0, now: at(10) }, limitOne);
    const counted = evaluateRateLimit({ count: 2, prevCount: 0, windowStart: T0, now: at(10) }, limitOne);
    expect(uncounted.allowed).toBe(false);
    expect(uncounted.retryAfterSeconds).toBe(110); // 50 s to the boundary + the whole next window (the send's weight)
    expect(counted.retryAfterSeconds).toBeGreaterThanOrEqual(uncounted.retryAfterSeconds);
    expect(evaluateUncountedHit({ count: 1, prevCount: 0, windowStart: T0, now: at(10) }, limitOne).allowed).toBe(true);
  });

  it("builds response headers", () => {
    const denied = evaluateRateLimit({ count: 11, prevCount: 0, windowStart: T0, now: at(15) }, rule);
    expect(rateLimitHeaders(denied, at(15))).toEqual({
      "ratelimit-limit": "10",
      "ratelimit-remaining": "0",
      "ratelimit-reset": "56",
      "retry-after": "56",
    });
  });
});

describe("presets", () => {
  it("hash personal subjects and keep ids", () => {
    const login = rateLimits.login("196.4.1.2", "Kid@Example.com ");
    expect(login.key).toMatch(/^login:[0-9a-f]{32}:[0-9a-f]{32}$/);
    expect(login.key).not.toContain("196.4");
    expect(login.key).toBe(rateLimits.login("196.4.1.2", "kid@example.com").key);
    expect(login).toMatchObject({ ...RATE_LIMIT_PRESETS.login, preset: "login" });
    expect(rateLimits.aiMessage("u-1").key).toBe("aiMessage:u-1");
    expect(rateLimitSubject(null)).toBe("none");
  });

  it("keep the module key shapes of the family / school / class / engagement limiters under tunable presets", () => {
    expect(rateLimits.familyCodeRedeem("u-1")).toEqual({ limit: 10, windowSeconds: 900, key: "family.codeRedeem:u-1", preset: "familyCodeRedeem" });
    expect(rateLimits.familyPaymentPoll("u-1").key).toBe("family.paymentPoll:u-1");
    expect(rateLimits.schoolPlanRequest("s-1")).toEqual({ limit: 3, windowSeconds: 86_400, key: "school.planRequest:s-1", preset: "schoolPlanRequest" });
    expect(rateLimits.schoolRosterCommit("a-1").key).toBe("school.rosterCommit:a-1");
    expect(rateLimits.classJoin("u-1")).toEqual({ limit: 10, windowSeconds: 900, key: "classJoin:u-1", preset: "classJoin" });
    const invite = rateLimits.classInviteTarget("Kid@Example.com");
    expect(invite.key).toMatch(/^classInviteTarget:[0-9a-f]{32}$/);
    expect(invite.key).not.toContain("example");
    expect(rateLimits.classInviteSender("t-1").key).toBe("classInviteSender:t-1");
    expect(rateLimits.flashcardWrite("u-1")).toEqual({ limit: 120, windowSeconds: 3600, key: "flashcardWrite:u-1", preset: "flashcardWrite" });
    expect(rateLimits.shareCreate("u-1").key).toBe("shareCreate:u-1");
    expect(rateLimits.referralLanding("196.4.1.2").key).toMatch(/^referralLanding:[0-9a-f]{32}$/);
    expect(rateLimits.aiConversationCreate("u-1")).toMatchObject({ limit: 30, windowSeconds: 3600, preset: "aiConversationCreate" });
  });

  it("has one helper per preset, each naming its own preset", () => {
    expect(Object.keys(rateLimits).sort()).toEqual(Object.keys(RATE_LIMIT_PRESETS).sort());
    for (const [name, helper] of Object.entries(rateLimits) as [string, (...args: string[]) => { preset?: string; limit: number }][]) {
      const input = helper("subject-1", "subject-2");
      expect(input.preset).toBe(name);
      expect(input.limit).toBe(RATE_LIMIT_PRESETS[name as keyof typeof RATE_LIMIT_PRESETS].limit);
    }
  });

  it("key student write limiters by user id under their preset", () => {
    expect(rateLimits.lessonProgress("u-1")).toEqual({ limit: 30, windowSeconds: 60, key: "lessonProgress:u-1", preset: "lessonProgress" });
    expect(rateLimits.studyPlanGenerate("u-1")).toEqual({ limit: 30, windowSeconds: 3600, key: "studyPlanGenerate:u-1", preset: "studyPlanGenerate" });
  });

  it("limit staff-triggered messages per hashed recipient (burst + daily) and content flags per user", () => {
    const [burst, daily] = adminContactSendLimits(" Parent@Example.com");
    expect(burst).toMatchObject({ limit: 3, windowSeconds: 900, preset: "adminContactSend" });
    expect(daily).toMatchObject({ limit: 10, windowSeconds: 86_400, preset: "adminContactSendDaily" });
    expect(burst?.key).toMatch(/^adminContactSend:[0-9a-f]{32}$/);
    expect(burst?.key).not.toContain("example");
    expect(burst?.key).toBe(rateLimits.adminContactSend("parent@example.com").key);
    // Separate buckets from the user's own OTP sends.
    expect(burst?.key).not.toBe(rateLimits.otpSendTarget("parent@example.com").key);
    expect(rateLimits.contentFlag("u-1")).toEqual({ limit: 20, windowSeconds: 3600, key: "contentFlag:u-1", preset: "contentFlag" });
  });
});

describe("rateLimit (database)", () => {
  it("counts hits atomically and denies past the limit", async () => {
    const input = { key: key(), limit: 3, windowSeconds: LONG_WINDOW };
    const results = [];
    for (let i = 0; i < 4; i += 1) results.push(await rateLimit(input));
    expect(results.map((r) => r.allowed)).toEqual([true, true, true, false]);
    expect(results.map((r) => r.remaining)).toEqual([2, 1, 0, 0]);
    expect(results[3]?.retryAfterSeconds).toBeGreaterThan(0);
    // resetAt is a real instant (database clock), whatever the session time zone.
    const end = results[0]!.resetAt.getTime();
    expect(end).toBeGreaterThan(Date.now() - 60_000);
    expect(end).toBeLessThanOrEqual(Date.now() + LONG_WINDOW * 1000 + 60_000);
  });

  it("admits exactly `limit` of many concurrent hits", async () => {
    const input = { key: key(), limit: 10, windowSeconds: LONG_WINDOW };
    const results = await Promise.all(Array.from({ length: 25 }, () => rateLimit(input)));
    expect(results.filter((r) => r.allowed)).toHaveLength(10);
  });

  it("isolates keys", async () => {
    const a = { key: key(), limit: 1, windowSeconds: LONG_WINDOW };
    const b = { key: key(), limit: 1, windowSeconds: LONG_WINDOW };
    expect((await rateLimit(a)).allowed).toBe(true);
    expect((await rateLimit(a)).allowed).toBe(false);
    expect((await rateLimit(b)).allowed).toBe(true);
  });

  it("rolls the window, carrying the previous count", async () => {
    const input = { key: key(), limit: 5, windowSeconds: 60 };
    await rateLimit(input);
    await rateLimit(input);
    // Pretend the bucket's window was the previous one.
    await db.$executeRaw`
      UPDATE "RateLimitBucket"
         SET "windowStart" = date_bin(interval '60 seconds', now(), TIMESTAMPTZ '2000-01-01') - interval '60 seconds',
             "expiresAt" = date_bin(interval '60 seconds', now(), TIMESTAMPTZ '2000-01-01') + interval '60 seconds'
       WHERE "key" = ${input.key}`;
    await rateLimit(input);
    const bucket = await db.rateLimitBucket.findUniqueOrThrow({ where: { key: input.key } });
    expect(bucket.count).toBe(1);
    expect(bucket.prevCount).toBe(2);
  });

  it("assertRateLimit throws RATE_LIMITED with a retry time", async () => {
    const input = { key: key(), limit: 1, windowSeconds: LONG_WINDOW };
    await assertRateLimit(input);
    const error = await assertRateLimit(input, "Slow down.").catch((e: unknown) => e);
    expect(isAppError(error)).toBe(true);
    if (!isAppError(error)) return;
    expect(error.code).toBe("RATE_LIMITED");
    expect(error.message).toBe("Slow down.");
    expect(error.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("peekRateLimit reports the next hit's outcome without recording it", async () => {
    const input = { key: key(), limit: 2, windowSeconds: LONG_WINDOW };
    expect((await peekRateLimit(input)).allowed).toBe(true);
    expect(await db.rateLimitBucket.findUnique({ where: { key: input.key } })).toBeNull();
    await rateLimit(input);
    await rateLimit(input);
    const peeked = await peekRateLimit(input);
    expect(peeked.allowed).toBe(false);
    expect(peeked.retryAfterSeconds).toBeGreaterThan(0);
    expect((await db.rateLimitBucket.findUniqueOrThrow({ where: { key: input.key } })).count).toBe(2);
  });

  it("reserveRateLimits counts in every bucket only when all allow, and a refusal leaves no trace", async () => {
    const a = { key: key(), limit: 5, windowSeconds: LONG_WINDOW };
    const b = { key: key(), limit: 1, windowSeconds: LONG_WINDOW };
    await reserveRateLimits([{ input: a }, { input: b }]);
    for (let i = 0; i < 3; i += 1) {
      const error = await reserveRateLimits([{ input: a }, { input: b, message: (seconds) => `wait ${seconds}` }]).catch((e: unknown) => e);
      expect(isAppError(error) && error.code === "RATE_LIMITED" && error.message.startsWith("wait ")).toBe(true);
    }
    // The refused reservations rolled back the hit already counted in `a`.
    expect((await db.rateLimitBucket.findUniqueOrThrow({ where: { key: a.key } })).count).toBe(1);
    expect((await db.rateLimitBucket.findUniqueOrThrow({ where: { key: b.key } })).count).toBe(1);
  });

  it("reserveRateLimits stays exact under concurrency", async () => {
    const input = { key: key(), limit: 4, windowSeconds: LONG_WINDOW };
    const outcomes = await Promise.allSettled(Array.from({ length: 12 }, () => reserveRateLimits([{ input }])));
    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(4);
    expect((await db.rateLimitBucket.findUniqueOrThrow({ where: { key: input.key } })).count).toBe(4);
  });

  it("purges expired buckets only", async () => {
    const expired = key();
    const live = key();
    await rateLimit({ key: expired, limit: 5, windowSeconds: 60 });
    await rateLimit({ key: live, limit: 5, windowSeconds: LONG_WINDOW });
    await db.$executeRaw`
      UPDATE "RateLimitBucket" SET "windowStart" = now() - interval '3 hours', "expiresAt" = now() - interval '1 hour'
       WHERE "key" = ${expired}`;
    expect(await purgeExpiredRateLimitBuckets()).toBeGreaterThanOrEqual(1);
    expect(await db.rateLimitBucket.findUnique({ where: { key: expired } })).toBeNull();
    expect(await db.rateLimitBucket.findUnique({ where: { key: live } })).not.toBeNull();
  });
});
