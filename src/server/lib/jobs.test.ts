import { describe, expect, it } from "vitest";
import { z } from "zod";
import { db } from "@/server/db";
import { uniqueSuffix } from "../../../tests/factories/index";
import { AppError } from "./errors";
import {
  cancelJob,
  claimJobs,
  completeJob,
  decideJobFailure,
  describeJobError,
  enqueue,
  enqueueRecurring,
  extendLeases,
  failJob,
  isPermanentJobError,
  PermanentJobError,
  planLeaseReclaim,
  processJobs,
  purgeFinishedJobs,
  reclaimExpiredLeases,
  recurringPeriodStart,
  registerJobHandler,
  registerRecurringJob,
  retryDelayMs,
  retryJob,
  runSchedulerTick,
  type RecurringJobDefinition,
} from "./jobs";

const queue = () => `t${uniqueSuffix()}`;
const jobType = () => `test.h${uniqueSuffix()}`;
const worker = (name = "w") => `${name}-${uniqueSuffix()}`;

/** Time travel uses the database clock (the queue compares against `now()`), never JS Dates. */
async function makeDue(id: string) {
  await db.$executeRaw`UPDATE "Job" SET "runAt" = now() - interval '1 second' WHERE "id" = ${id}::uuid`;
}

async function isFuture(id: string): Promise<boolean> {
  const rows = await db.$queryRaw<{ future: boolean }[]>`SELECT "runAt" > now() AS "future" FROM "Job" WHERE "id" = ${id}::uuid`;
  return rows[0]?.future ?? false;
}

describe("retry policy (pure)", () => {
  it("backs off exponentially with jitter and a 1 h cap", () => {
    const mid = () => 0.5; // no jitter
    expect(retryDelayMs(1, mid)).toBe(20_000);
    expect(retryDelayMs(3, mid)).toBe(80_000);
    expect(retryDelayMs(20, mid)).toBe(3_600_000);
    expect(retryDelayMs(1, () => 0)).toBe(18_000);
    expect(retryDelayMs(1, () => 1)).toBe(22_000);
    expect(retryDelayMs(20, () => 1)).toBe(3_600_000);
  });

  it("decides PENDING, DEAD or FAILED", () => {
    const now = new Date("2026-10-05T00:00:00Z");
    expect(decideJobFailure({ attempts: 1, maxAttempts: 5, permanent: false, now, random: () => 0.5 })).toEqual({
      status: "PENDING",
      delayMs: 20_000,
      runAt: new Date("2026-10-05T00:00:20Z"),
    });
    expect(decideJobFailure({ attempts: 5, maxAttempts: 5, permanent: false, now }).status).toBe("DEAD");
    expect(decideJobFailure({ attempts: 1, maxAttempts: 5, permanent: true, now }).status).toBe("FAILED");
  });

  it("classifies and describes errors without leaking contact details", () => {
    expect(isPermanentJobError(new PermanentJobError("x"))).toBe(true);
    expect(isPermanentJobError(AppError.validation({ a: ["b"] }))).toBe(true);
    expect(isPermanentJobError(new Error("network"))).toBe(false);
    expect(describeJobError(new Error("failed for kid@example.com"))).toBe("Error: failed for [EMAIL]");
    expect(describeJobError(new Error("x".repeat(5000)))).toHaveLength(2000);
  });

  it("plans lease reclaims without creating two PENDING jobs per dedupe key", () => {
    const job = (id: string, dedupeKey: string | null, createdAtMs: number, attempts = 1) => ({
      id,
      dedupeKey,
      attempts,
      maxAttempts: 3,
      createdAtMs,
    });
    expect(
      planLeaseReclaim(
        [job("a", null, 1), job("b", "k1", 1), job("c", "k1", 2), job("d", "k2", 1), job("e", "k3", 1, 3)],
        new Set(["k2"]),
      ),
    ).toEqual({ requeue: ["c", "a"], dead: ["e"], superseded: ["d", "b"] });
  });

  it("aligns recurring periods", () => {
    const now = new Date("2026-10-05T10:07:30Z");
    expect(recurringPeriodStart(now, 5)).toEqual(new Date("2026-10-05T10:05:00Z"));
    expect(recurringPeriodStart(now, 1440)).toEqual(new Date("2026-10-05T00:00:00Z"));
    expect(recurringPeriodStart(now, 1440, 900)).toEqual(new Date("2026-10-04T15:00:00Z"));
  });
});

describe("enqueue / claim (database)", () => {
  it("claims a due job, then completes it", async () => {
    const q = queue();
    const w = worker();
    const { id, created } = await enqueue("test.simple", { thing: "abc" }, { queue: q });
    expect(created).toBe(true);
    const [job] = await claimJobs(w, q, 5);
    expect(job).toMatchObject({ id, type: "test.simple", payload: { thing: "abc" }, attempts: 1, lockedBy: w });
    expect(await claimJobs(worker(), q, 5)).toEqual([]);

    expect(await completeJob(id!, "someone-else", { ok: true })).toBe(false);
    expect(await completeJob(id!, w, { ok: true })).toBe(true);
    const row = await db.job.findUniqueOrThrow({ where: { id: id! } });
    expect(row.status).toBe("SUCCEEDED");
    expect(row.completedAt).not.toBeNull();
    expect(row.result).toEqual({ ok: true });
  });

  it("respects runAt, priority and the transaction client", async () => {
    const q = queue();
    await enqueue("test.later", {}, { queue: q, delayMs: 60_000 });
    const low = await enqueue("test.low", {}, { queue: q, priority: 5 });
    const high = await db.$transaction((tx) => enqueue("test.high", {}, { queue: q, priority: -5, client: tx }));
    const claimed = await claimJobs(worker(), q, 10);
    expect(claimed.map((j) => j.id)).toEqual([high.id, low.id]);
  });

  it("deduplicates while PENDING but allows a follow-up once the first is running", async () => {
    const q = queue();
    const key = `dedupe:${uniqueSuffix()}`;
    const first = await enqueue("test.dedupe", { n: 1 }, { queue: q, dedupeKey: key });
    const second = await enqueue("test.dedupe", { n: 2 }, { queue: q, dedupeKey: key });
    expect(second).toEqual({ id: first.id, created: false });

    await claimJobs(worker(), q, 1);
    const followUp = await enqueue("test.dedupe", { n: 3 }, { queue: q, dedupeKey: key });
    expect(followUp.created).toBe(true);
    expect(followUp.id).not.toBe(first.id);
  });

  it("never hands the same job to two concurrent claimers", async () => {
    const q = queue();
    const ids = new Set<string>();
    for (let i = 0; i < 30; i += 1) ids.add((await enqueue("test.concurrent", { i }, { queue: q })).id!);
    const claimedBy = new Map<string, string>();
    const claimers = ["a", "b", "c"].map((name) => worker(name));
    for (let round = 0; round < 10; round += 1) {
      const batches = await Promise.all(claimers.map((w) => claimJobs(w, q, 4)));
      batches.forEach((batch, index) => {
        for (const job of batch) {
          expect(claimedBy.has(job.id)).toBe(false);
          claimedBy.set(job.id, claimers[index]!);
        }
      });
    }
    expect(new Set(claimedBy.keys())).toEqual(ids);
  });
});

describe("failure handling (database)", () => {
  it("retries with backoff, then goes DEAD after maxAttempts", async () => {
    const q = queue();
    const w = worker();
    const { id } = await enqueue("test.flaky", {}, { queue: q, maxAttempts: 2 });

    await claimJobs(w, q);
    const first = await failJob(id!, w, new Error("timeout"));
    expect(first?.status).toBe("PENDING");
    let row = await db.job.findUniqueOrThrow({ where: { id: id! } });
    expect(row).toMatchObject({ status: "PENDING", attempts: 1, lockedBy: null, lastError: "Error: timeout" });
    expect(await isFuture(id!)).toBe(true);
    expect(await claimJobs(w, q)).toEqual([]); // not due yet

    await makeDue(id!);
    const [again] = await claimJobs(w, q);
    expect(again?.attempts).toBe(2);
    expect((await failJob(id!, w, new Error("timeout again")))?.status).toBe("DEAD");
    row = await db.job.findUniqueOrThrow({ where: { id: id! } });
    expect(row.status).toBe("DEAD");
    expect(row.completedAt).not.toBeNull();

    expect(await retryJob(id!)).toBe(true);
    row = await db.job.findUniqueOrThrow({ where: { id: id! } });
    expect(row).toMatchObject({ status: "PENDING", attempts: 0, completedAt: null });
  });

  it("fails permanently without retry", async () => {
    const q = queue();
    const w = worker();
    const { id } = await enqueue("test.bad", {}, { queue: q });
    await claimJobs(w, q);
    expect((await failJob(id!, w, new PermanentJobError("bad input")))?.status).toBe("FAILED");
    expect(await failJob(id!, w, new Error("again"))).toBeNull(); // no longer leased
  });

  it("reclaims expired leases and extends live ones", async () => {
    const q = queue();
    const w = worker();
    const a = await enqueue("test.lease", { n: 1 }, { queue: q });
    const b = await enqueue("test.lease", { n: 2 }, { queue: q, maxAttempts: 1 });
    await claimJobs(w, q, 2);
    expect(await extendLeases([a.id!, b.id!], w)).toBe(2);
    await db.$executeRaw`
      UPDATE "Job" SET "lockedAt" = now() - interval '10 minutes' WHERE "id" IN (${a.id!}::uuid, ${b.id!}::uuid)`;

    const reclaimed = await reclaimExpiredLeases();
    expect(reclaimed.requeued).toContain(a.id);
    expect(reclaimed.dead).toContain(b.id);
    expect(await completeJob(a.id!, w)).toBe(false); // the old worker lost its lease
  });

  it("does not re-queue a failed or expired job whose follow-up is already queued", async () => {
    const q = queue();
    const w = worker();
    const key = `twin:${uniqueSuffix()}`;
    const first = await enqueue("test.twin", {}, { queue: q, dedupeKey: key });
    await claimJobs(w, q);
    const followUp = await enqueue("test.twin", {}, { queue: q, dedupeKey: key, delayMs: 60_000 });
    expect(followUp.created).toBe(true);

    expect((await failJob(first.id!, w, new Error("boom")))?.status).toBe("CANCELLED");
    expect((await db.job.findUniqueOrThrow({ where: { id: first.id! } })).lastError).toMatch(/superseded/);

    // Same situation through the lease reclaim.
    const second = await enqueue("test.twin", {}, { queue: q, dedupeKey: `twin2:${uniqueSuffix()}` });
    await claimJobs(w, q); // the follow-up is not due yet, so this claims `second`
    await enqueue("test.twin", {}, { queue: q, dedupeKey: (await db.job.findUniqueOrThrow({ where: { id: second.id! } })).dedupeKey!, delayMs: 60_000 });
    await db.$executeRaw`UPDATE "Job" SET "lockedAt" = now() - interval '10 minutes' WHERE "id" = ${second.id!}::uuid`;
    const reclaimed = await reclaimExpiredLeases();
    expect(reclaimed.superseded).toContain(second.id);
    expect((await db.job.findUniqueOrThrow({ where: { id: second.id! } })).status).toBe("CANCELLED");
  });

  it("cancels pending jobs only", async () => {
    const q = queue();
    const { id } = await enqueue("test.cancel", {}, { queue: q });
    expect(await cancelJob(id!)).toBe(true);
    expect(await cancelJob(id!)).toBe(false);
    expect((await db.job.findUniqueOrThrow({ where: { id: id! } })).status).toBe("CANCELLED");
  });

  it("purges old finished jobs", async () => {
    const q = queue();
    const w = worker();
    const { id } = await enqueue("test.purge", {}, { queue: q });
    await claimJobs(w, q);
    await completeJob(id!, w);
    await db.$executeRaw`UPDATE "Job" SET "completedAt" = now() - interval '8 days' WHERE "id" = ${id!}::uuid`;
    expect(await purgeFinishedJobs()).toBeGreaterThanOrEqual(1);
    expect(await db.job.findUnique({ where: { id: id! } })).toBeNull();
  });
});

describe("handlers (database)", () => {
  it("runs registered handlers, validating payloads", async () => {
    const q = queue();
    const type = jobType();
    const seen: number[] = [];
    registerJobHandler(type, z.object({ n: z.number() }), async (payload, ctx) => {
      seen.push(payload.n);
      expect(ctx.attempt).toBe(1);
      return { doubled: payload.n * 2 };
    }, { queue: q });
    expect(() => registerJobHandler(type, z.object({}), async () => undefined)).toThrow(/already registered/);
    await expect(enqueue(type, { n: "nope" })).rejects.toThrow(/does not match/);

    const { id } = await enqueue(type, { n: 21 }); // default queue comes from the registration
    expect(await processJobs({ workerId: worker(), queue: q, batch: 5 })).toBe(1);
    expect(seen).toEqual([21]);
    const row = await db.job.findUniqueOrThrow({ where: { id: id! } });
    expect(row).toMatchObject({ status: "SUCCEEDED", result: { doubled: 42 } });

    // A malformed payload that slipped in (e.g. older code) fails permanently.
    const bad = await db.$queryRaw<{ id: string }[]>`
      INSERT INTO "Job" ("id", "queue", "type", "payload", "updatedAt") VALUES (uuidv7(), ${q}, ${type}, '{"n":"x"}', now())
      RETURNING "id"`;
    await processJobs({ workerId: worker(), queue: q });
    expect((await db.job.findUniqueOrThrow({ where: { id: bad[0]!.id } })).status).toBe("FAILED");
  });

  it("retries jobs whose type has no handler in this worker", async () => {
    const q = queue();
    const { id } = await enqueue("test.unknownType", {}, { queue: q });
    await processJobs({ workerId: worker(), queue: q });
    const row = await db.job.findUniqueOrThrow({ where: { id: id! } });
    expect(row.status).toBe("PENDING");
    expect(row.lastError).toMatch(/No handler registered/);
  });
});

describe("recurring jobs (database)", () => {
  it("enqueues once per period even after the period's job finished", async () => {
    const q = queue();
    const definition: RecurringJobDefinition = {
      name: `test-${uniqueSuffix()}`,
      everyMinutes: 60,
      type: "test.recurring",
      offsetMinutes: 0,
      queue: q,
      payload: { scope: "all" },
    };
    const now = new Date();
    const first = await enqueueRecurring(definition, now);
    expect(first).not.toBeNull();
    expect(await enqueueRecurring(definition, now)).toBeNull();

    const w = worker();
    const [job] = await claimJobs(w, q);
    expect(job?.payload).toEqual({ scope: "all", periodStart: recurringPeriodStart(now, 60).toISOString() });
    await completeJob(first!, w);
    expect(await enqueueRecurring(definition, now)).toBeNull();
  });

  it("runs a scheduler tick for the given definitions", async () => {
    const q = queue();
    const name = `tick-${uniqueSuffix()}`;
    const definition: RecurringJobDefinition = { name, everyMinutes: 5, type: "test.tick", offsetMinutes: 0, queue: q, payload: {} };
    const tick = await runSchedulerTick({ definitions: [definition] });
    if (tick.leader) {
      expect(tick.enqueued).toEqual([name]);
      expect((await runSchedulerTick({ definitions: [definition] })).enqueued).toEqual([]);
    }
    expect(() => registerRecurringJob("bad name!", 5, "test.tick")).toThrow();
    expect(() => registerRecurringJob(`ok-${uniqueSuffix()}`, 60, "test.tick", { offsetMinutes: 60 })).toThrow();
  });
});
