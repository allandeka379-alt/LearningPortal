import { describe, expect, it } from "vitest";
import { z } from "zod";
import { db } from "@/server/db";
import { enqueue, registerJobHandler } from "@/server/lib/jobs";
import { createLogger } from "@/server/lib/logger";
import { uniqueSuffix } from "../../tests/factories/index";
import { parseWorkerOptions } from "./options";
import { startWorker } from "./runner";

const silent = createLogger({ level: "silent" });

function options(queue: string, extra: string[] = []) {
  return {
    ...parseWorkerOptions([`--queues=${queue}`, "--no-scheduler", "--no-listen", "--poll-ms=50", `--worker-id=test-${uniqueSuffix()}`, ...extra]),
    shutdownTimeoutMs: 5_000,
  };
}

async function statuses(ids: (string | null)[]): Promise<string[]> {
  const rows = await db.job.findMany({ where: { id: { in: ids.filter((id): id is string => id !== null) } }, select: { status: true } });
  return rows.map((row) => row.status).sort();
}

async function waitFor(predicate: () => Promise<boolean>, timeoutMs = 10_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("waitFor timed out");
}

describe("startWorker (database)", () => {
  it("processes queued jobs with several lanes and stops cleanly", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.worker${uniqueSuffix()}`;
    const seen: number[] = [];
    registerJobHandler(type, z.object({ n: z.number() }), async ({ n }) => {
      seen.push(n);
      return { n };
    }, { queue });
    const ids = await Promise.all([1, 2, 3, 4, 5].map(async (n) => (await enqueue(type, { n })).id));

    const worker = startWorker({ ...options(queue), concurrency: 2 }, { logger: silent, listen: null });
    await waitFor(async () => (await statuses(ids)).every((status) => status === "SUCCEEDED"));
    await worker.stop("test");
    await worker.done;
    expect(seen.sort()).toEqual([1, 2, 3, 4, 5]);
    expect(worker.stats()).toMatchObject({ processed: 5, inFlight: 0, loopErrors: 0 });
  });

  it("lets an in-flight job finish on graceful stop", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.slow${uniqueSuffix()}`;
    let started!: () => void;
    const startedPromise = new Promise<void>((resolve) => (started = resolve));
    registerJobHandler(type, z.object({}), async () => {
      started();
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { ok: true };
    }, { queue });
    const { id } = await enqueue(type, {});

    const worker = startWorker(options(queue), { logger: silent, listen: null });
    await startedPromise;
    await worker.stop("test");
    expect(await statuses([id])).toEqual(["SUCCEEDED"]);
  });

  it("drains every due job and exits on its own", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.drain${uniqueSuffix()}`;
    registerJobHandler(type, z.object({}), async () => undefined, { queue });
    const ids = [(await enqueue(type, {})).id, (await enqueue(type, {})).id];
    const worker = startWorker(options(queue, ["--drain"]), { logger: silent, listen: null });
    await worker.done;
    expect(await statuses(ids)).toEqual(["SUCCEEDED", "SUCCEEDED"]);
  });

  it("wakes idle lanes on notification", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.wake${uniqueSuffix()}`;
    registerJobHandler(type, z.object({}), async () => undefined, { queue });
    let notify!: (queue: string) => void;
    const worker = startWorker(
      { ...options(queue), pollIntervalMs: 60_000, listen: true },
      {
        logger: silent,
        listen: async (onNotify) => {
          notify = onNotify;
          return async () => undefined;
        },
      },
    );
    await new Promise((resolve) => setTimeout(resolve, 100)); // lane is now asleep for a minute
    const { id } = await enqueue(type, {});
    notify(queue);
    await waitFor(async () => (await statuses([id]))[0] === "SUCCEEDED", 5_000);
    await worker.stop("test");
  });
});
