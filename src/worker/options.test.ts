import { describe, expect, it } from "vitest";
import { DEFAULT_WORKER_QUEUES, parseWorkerOptions } from "./options";

describe("parseWorkerOptions", () => {
  it("has sensible defaults", () => {
    expect(parseWorkerOptions([], {}, { host: "box", pid: 42 })).toEqual({
      workerId: "box:42",
      queues: [...DEFAULT_WORKER_QUEUES],
      concurrency: 2,
      pollIntervalMs: 2_000,
      schedulerIntervalMs: 30_000,
      heartbeatIntervalMs: 60_000,
      shutdownTimeoutMs: 30_000,
      scheduler: true,
      listen: true,
      drain: false,
    });
  });

  it("reads flags, which win over environment variables", () => {
    const options = parseWorkerOptions(
      ["--concurrency=4", "--queues=ai, payments,ai", "--no-scheduler", "--no-listen", "--drain", "--worker-id=w1"],
      { WORKER_CONCURRENCY: "1", WORKER_QUEUES: "default", WORKER_POLL_MS: "500" },
    );
    expect(options).toMatchObject({
      workerId: "w1",
      concurrency: 4,
      queues: ["ai", "payments"],
      pollIntervalMs: 500,
      scheduler: false,
      listen: false,
      drain: true,
    });
    expect(parseWorkerOptions([], { WORKER_CONCURRENCY: "3" }).concurrency).toBe(3);
  });

  it("rejects invalid input with a clear message", () => {
    expect(() => parseWorkerOptions(["--concurrency=9"])).toThrow(/concurrency/);
    expect(() => parseWorkerOptions(["--concurrency"])).toThrow(/needs a value/);
    expect(() => parseWorkerOptions(["--queues=Bad Queue"])).toThrow(/queue name/);
    expect(() => parseWorkerOptions(["--frobnicate"])).toThrow(/Unknown flag/);
    expect(() => parseWorkerOptions(["positional"])).toThrow(/Unknown argument/);
    expect(() => parseWorkerOptions([], { WORKER_POLL_MS: "10" })).toThrow(/poll interval/);
  });
});
