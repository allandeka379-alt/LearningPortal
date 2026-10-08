import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { db } from "@/server/db";
import { enqueue, registerJobHandler } from "@/server/lib/jobs";
import { createLogger } from "@/server/lib/logger";
import { uniqueSuffix } from "../../tests/factories/index";
import { parseWorkerOptions } from "./options";
import { startWorker } from "./runner";
import { installShutdownHandlers, type SignalSource } from "./shutdown";

const silent = createLogger({ level: "silent" });

/** A stand-in for `process` that only knows signals. */
function fakeProcess(): SignalSource & { emit(signal: NodeJS.Signals): void; listenerCount(signal: NodeJS.Signals): number } {
  const emitter = new EventEmitter();
  return {
    on: (signal, listener) => emitter.on(signal, listener),
    off: (signal, listener) => emitter.off(signal, listener),
    emit: (signal) => emitter.emit(signal, signal),
    listenerCount: (signal) => emitter.listenerCount(signal),
  };
}

function workerOptions(queue: string, shutdownTimeoutMs: number) {
  return {
    ...parseWorkerOptions([`--queues=${queue}`, "--no-scheduler", "--no-listen", "--poll-ms=50", `--worker-id=test-${uniqueSuffix()}`]),
    shutdownTimeoutMs,
  };
}

async function jobRow(id: string) {
  return db.job.findUniqueOrThrow({ where: { id }, select: { status: true, attempts: true, lockedBy: true } });
}

describe("installShutdownHandlers", () => {
  it("stops gracefully on the first SIGTERM and exits on the second signal", async () => {
    const source = fakeProcess();
    const stop = vi.fn(async () => undefined);
    const exit = vi.fn();
    const uninstall = installShutdownHandlers({ stop }, { logger: silent, source, exit });

    source.emit("SIGTERM");
    expect(stop).toHaveBeenCalledExactlyOnceWith("SIGTERM");
    expect(exit).not.toHaveBeenCalled();

    source.emit("SIGINT");
    expect(stop).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledExactlyOnceWith(1);

    uninstall();
    expect(source.listenerCount("SIGTERM")).toBe(0);
    expect(source.listenerCount("SIGINT")).toBe(0);
  });

  it("logs instead of crashing when the graceful stop rejects", async () => {
    const source = fakeProcess();
    const errors: string[] = [];
    const logger = createLogger({ level: "error", format: "json", write: (line) => errors.push(line) });
    installShutdownHandlers({ stop: async () => Promise.reject(new Error("boom")) }, { logger, source, exit: vi.fn() });
    source.emit("SIGTERM");
    await vi.waitFor(() => expect(errors.join("\n")).toContain("graceful stop failed"));
  });
});

describe("worker graceful shutdown on SIGTERM (database)", () => {
  it("finishes the in-flight job, then the worker exits", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.sigterm${uniqueSuffix()}`;
    let started!: () => void;
    const running = new Promise<void>((resolve) => (started = resolve));
    registerJobHandler(type, z.object({}), async () => {
      started();
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { ok: true };
    }, { queue });
    const id = (await enqueue(type, {})).id!;

    const source = fakeProcess();
    const worker = startWorker(workerOptions(queue, 5_000), { logger: silent, listen: null });
    installShutdownHandlers(worker, { logger: silent, source, exit: vi.fn() });
    await running;
    source.emit("SIGTERM");
    await worker.done;
    expect(await jobRow(id)).toMatchObject({ status: "SUCCEEDED", attempts: 1 });
    expect(worker.stats()).toMatchObject({ inFlight: 0, processed: 1 });
  });

  it("aborts a job that outlives the shutdown timeout; the job is retried later, not lost", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.overrun${uniqueSuffix()}`;
    let started!: () => void;
    const running = new Promise<void>((resolve) => (started = resolve));
    registerJobHandler(type, z.object({}), async (_payload, context) => {
      started();
      // A well-behaved long job: stops at the next checkpoint once the worker aborts it.
      await new Promise<void>((_, reject) => {
        context.signal.addEventListener("abort", () => reject(new Error("aborted by shutdown")), { once: true });
      });
    }, { queue });
    const id = (await enqueue(type, {})).id!;

    const worker = startWorker(workerOptions(queue, 300), { logger: silent, listen: null });
    await running;
    const stopStarted = Date.now();
    await worker.stop("SIGTERM");
    await worker.done;
    const elapsed = Date.now() - stopStarted;
    expect(elapsed).toBeGreaterThanOrEqual(250);
    expect(elapsed).toBeLessThan(5_000); // the abort ended the job; no wait for the 5 s post-abort grace
    // Back in the queue with its attempt counted (retry with backoff), lock released.
    expect(await jobRow(id)).toMatchObject({ status: "PENDING", attempts: 1, lockedBy: null });
  });

  it("leaves a job that ignores the abort RUNNING for lease reclaim, and stops waiting after the grace period", async () => {
    const queue = `w${uniqueSuffix()}`;
    const type = `test.stubborn${uniqueSuffix()}`;
    let started!: () => void;
    const running = new Promise<void>((resolve) => (started = resolve));
    let release!: () => void;
    const released = new Promise<void>((resolve) => (release = resolve));
    registerJobHandler(type, z.object({}), async () => {
      started();
      await released; // ignores context.signal
    }, { queue });
    const id = (await enqueue(type, {})).id!;

    const options = workerOptions(queue, 200);
    const worker = startWorker(options, { logger: silent, listen: null });
    await running;
    const stopStarted = Date.now();
    await worker.stop("SIGTERM");
    // stop() resolves after the timeout plus the fixed 5 s post-abort grace, so index.ts can exit.
    expect(Date.now() - stopStarted).toBeGreaterThanOrEqual(5_000);
    expect(await jobRow(id)).toMatchObject({ status: "RUNNING", lockedBy: options.workerId });

    release();
    await worker.done;
  }, 15_000);
});
