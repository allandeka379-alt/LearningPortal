import "server-only";

import { after } from "next/server";

/**
 * Keeps an already-started task alive after the response is sent. On serverless hosts (Vercel) the function may be
 * frozen as soon as the response is returned, so un-awaited work such as an email send must be registered with Next's
 * `after()`. Outside a request (worker, scripts, tests) `after()` throws; the task simply keeps running in this process.
 * The caller attaches its own error handling: this never awaits or rethrows.
 */
export function keepAliveAfterResponse(task: Promise<unknown>): void {
  try {
    after(task);
  } catch {
    // Not inside a request scope: a long-running process finishes the task on its own.
  }
}
