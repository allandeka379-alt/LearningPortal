import { hostname } from "node:os";

/**
 * Worker configuration from command-line flags (preferred) and environment variables. Pure (no I/O besides the
 * host name default), so it is unit-tested.
 *
 * | Flag                    | Env                     | Default                       |
 * |-------------------------|-------------------------|-------------------------------|
 * | `--concurrency=N` (1-4) | `WORKER_CONCURRENCY`    | 2                             |
 * | `--queues=a,b`          | `WORKER_QUEUES`         | every known queue             |
 * | `--poll-ms=N`           | `WORKER_POLL_MS`        | 2000                          |
 * | `--scheduler-ms=N`      |                         | 30000                         |
 * | `--worker-id=X`         |                         | `<hostname>:<pid>`            |
 * | `--no-scheduler`        |                         | scheduler on                  |
 * | `--no-listen`           |                         | LISTEN/NOTIFY wake-ups on     |
 * | `--drain`               |                         | off: run until stopped        |
 *
 * `--drain` processes due jobs until every queue is empty, then exits (cron-style runs, smoke tests).
 */

export interface WorkerOptions {
  workerId: string;
  queues: string[];
  /** Parallel job lanes (1-4). */
  concurrency: number;
  /** Idle poll interval; LISTEN/NOTIFY usually wakes the worker sooner. */
  pollIntervalMs: number;
  schedulerIntervalMs: number;
  /** Lease heartbeat for in-flight jobs (must be well under the 5-minute lease). */
  heartbeatIntervalMs: number;
  /** Graceful-shutdown wait for in-flight jobs before their AbortSignal fires. */
  shutdownTimeoutMs: number;
  scheduler: boolean;
  listen: boolean;
  drain: boolean;
}

export const DEFAULT_WORKER_QUEUES = ["payments", "notifications", "default", "rollups", "search", "imports", "ai"] as const;

const QUEUE_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;

function parseIntOption(name: string, raw: string | undefined, fallback: number, min: number, max: number): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`Invalid ${name}: "${raw}" (expected an integer between ${min} and ${max})`);
  }
  return value;
}

/**
 * Parses worker options.
 *
 * @throws Error naming the bad flag / variable.
 */
export function parseWorkerOptions(
  argv: readonly string[],
  env: Readonly<Record<string, string | undefined>> = {},
  defaults: { pid?: number; host?: string } = {},
): WorkerOptions {
  const flags = new Map<string, string | true>();
  for (const arg of argv) {
    const match = /^--([a-z][a-z-]*)(?:=(.*))?$/.exec(arg);
    if (!match?.[1]) throw new Error(`Unknown argument "${arg}"`);
    flags.set(match[1], match[2] ?? true);
  }
  const known = new Set(["concurrency", "queues", "poll-ms", "scheduler-ms", "worker-id", "no-scheduler", "no-listen", "drain"]);
  for (const name of flags.keys()) if (!known.has(name)) throw new Error(`Unknown flag "--${name}"`);

  const stringFlag = (name: string): string | undefined => {
    const value = flags.get(name);
    if (value === true) throw new Error(`Flag "--${name}" needs a value (--${name}=...)`);
    return value;
  };

  const queuesRaw = stringFlag("queues") ?? env.WORKER_QUEUES;
  const queues = queuesRaw
    ? [...new Set(queuesRaw.split(",").map((queue) => queue.trim()).filter((queue) => queue.length > 0))]
    : [...DEFAULT_WORKER_QUEUES];
  if (queues.length === 0) throw new Error("Invalid queues: at least one queue is required");
  for (const queue of queues) if (!QUEUE_PATTERN.test(queue)) throw new Error(`Invalid queue name "${queue}"`);

  const workerId = stringFlag("worker-id") ?? `${defaults.host ?? hostname()}:${defaults.pid ?? process.pid}`;
  if (workerId.length === 0 || workerId.length > 128) throw new Error("Invalid worker id (1-128 characters)");

  return {
    workerId,
    queues,
    concurrency: parseIntOption("concurrency", stringFlag("concurrency") ?? env.WORKER_CONCURRENCY, 2, 1, 4),
    pollIntervalMs: parseIntOption("poll interval", stringFlag("poll-ms") ?? env.WORKER_POLL_MS, 2_000, 50, 60_000),
    schedulerIntervalMs: parseIntOption("scheduler interval", stringFlag("scheduler-ms"), 30_000, 1_000, 600_000),
    heartbeatIntervalMs: 60_000,
    shutdownTimeoutMs: 30_000,
    scheduler: !flags.has("no-scheduler"),
    listen: !flags.has("no-listen"),
    drain: flags.has("drain"),
  };
}
