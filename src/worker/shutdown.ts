import type { Logger } from "@/server/lib/logger";

/**
 * Signal handling for the worker process (src/worker/index.ts), separate so it is unit-tested.
 *
 * - The FIRST SIGTERM / SIGINT starts a graceful stop: lanes stop claiming, in-flight jobs get the worker's
 *   `shutdownTimeoutMs` (30 s) to finish, then their AbortSignal fires (see ./runner.ts). Container platforms send
 *   SIGTERM on every deploy and scale-in, so this is the normal path: give the container a stop grace period of at
 *   least 40 s (docker-compose `stop_grace_period`, ECS `stopTimeout`, Kubernetes `terminationGracePeriodSeconds`).
 * - A SECOND signal exits immediately with code 1 (an operator pressing Ctrl+C twice). Unfinished jobs stay RUNNING
 *   and are reclaimed by another worker when their lease expires; handlers are idempotent.
 */

export const SHUTDOWN_SIGNALS = ["SIGINT", "SIGTERM"] as const satisfies readonly NodeJS.Signals[];

/** The part of `process` used here (injectable for tests). */
export interface SignalSource {
  on(event: NodeJS.Signals, listener: (signal: NodeJS.Signals) => void): unknown;
  off(event: NodeJS.Signals, listener: (signal: NodeJS.Signals) => void): unknown;
}

export interface Stoppable {
  stop(reason?: string): Promise<void>;
}

/**
 * Installs the handlers. Returns a function that removes them.
 *
 * @param exit - called with 1 on the second signal (defaults to `process.exit`).
 */
export function installShutdownHandlers(
  worker: Stoppable,
  options: { logger: Logger; source?: SignalSource; exit?: (code: number) => void },
): () => void {
  const source = options.source ?? process;
  const exit = options.exit ?? ((code: number) => process.exit(code));
  let signals = 0;

  const onSignal = (signal: NodeJS.Signals): void => {
    signals += 1;
    if (signals > 1) {
      options.logger.warn("second signal received; exiting immediately", { signal });
      exit(1);
      return;
    }
    options.logger.info("shutdown signal received; finishing in-flight jobs", { signal });
    worker.stop(signal).catch((error: unknown) => {
      options.logger.error("graceful stop failed", { err: error });
    });
  };

  for (const signal of SHUTDOWN_SIGNALS) source.on(signal, onSignal);
  return () => {
    for (const signal of SHUTDOWN_SIGNALS) source.off(signal, onSignal);
  };
}
