import { SW_MESSAGES, SW_SCOPE, SW_URL } from "./constants";

/**
 * Service worker registration and update helpers for the page side (docs/OFFLINE.md). Framework-free and written
 * against small structural interfaces, so they are unit-tested with fakes; `ServiceWorkerRegistrar` wires them up.
 */

/** Registration options: module worker, whole-origin scope, and update checks that bypass the HTTP cache for both
 * `sw.js` and its imported `sw-routing.mjs`. */
export const REGISTRATION_OPTIONS = { type: "module", scope: SW_SCOPE, updateViaCache: "none" } as const;

/** Re-check for a new worker at most this often when a long-lived tab becomes visible again. */
export const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;

/**
 * Register only in production builds and where the API exists (it is missing on insecure http origins). In
 * development, cache-first `/_next/static` would serve stale dev chunks and break HMR.
 */
export function shouldRegisterServiceWorker(env: { nodeEnv: string | undefined; hasServiceWorker: boolean }): boolean {
  return env.nodeEnv === "production" && env.hasServiceWorker;
}

/** True when a visible-again tab should ask the browser to look for a new worker. */
export function shouldCheckForUpdate(lastCheckedAt: number, now: number, intervalMs: number = UPDATE_CHECK_INTERVAL_MS): boolean {
  return now - lastCheckedAt >= intervalMs;
}

interface WorkerLike extends EventTarget {
  readonly state: string;
  readonly scriptURL: string;
  postMessage(message: unknown): void;
}

export interface RegistrationLike extends EventTarget {
  readonly waiting: WorkerLike | null;
  readonly installing: WorkerLike | null;
  readonly active: WorkerLike | null;
}

/**
 * Calls `onWaiting` when a NEW version of the worker has installed and is waiting to take over: immediately if one is
 * already waiting, or after an `updatefound` → `installed` transition. A first install (page not yet controlled) is not
 * an update and is ignored. Returns a cleanup function.
 */
export function watchForWaitingWorker<W extends WorkerLike>(
  registration: RegistrationLike & { readonly waiting: W | null; readonly installing: W | null },
  isControlled: () => boolean,
  onWaiting: (worker: W) => void,
): () => void {
  const cleanups: (() => void)[] = [];

  if (registration.waiting && isControlled()) onWaiting(registration.waiting);

  const onUpdateFound = () => {
    const installing = registration.installing;
    if (!installing) return;
    const onStateChange = () => {
      if (installing.state === "installed" && isControlled()) onWaiting(installing);
    };
    installing.addEventListener("statechange", onStateChange);
    cleanups.push(() => installing.removeEventListener("statechange", onStateChange));
  };
  registration.addEventListener("updatefound", onUpdateFound);
  cleanups.push(() => registration.removeEventListener("updatefound", onUpdateFound));

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

/** Asks a waiting worker to activate (the user chose "Refresh"). */
export function requestSkipWaiting(worker: { postMessage(message: unknown): void }): void {
  worker.postMessage({ type: SW_MESSAGES.skipWaiting });
}

/** True for a registration whose worker is ours (`/sw.js`), whichever state it is in. */
export function isAppWorkerRegistration(registration: Pick<RegistrationLike, "active" | "waiting" | "installing">): boolean {
  const worker = registration.active ?? registration.waiting ?? registration.installing;
  if (!worker) return false;
  try {
    return new URL(worker.scriptURL).pathname === SW_URL;
  } catch {
    return false;
  }
}

/**
 * Development safety net: removes a production worker left on this origin (e.g. after testing `next start` on
 * localhost), which would otherwise keep serving cached assets to `next dev`. Returns how many were removed.
 */
export async function unregisterAppWorkers(container: {
  getRegistrations(): Promise<readonly (Pick<RegistrationLike, "active" | "waiting" | "installing"> & {
    unregister(): Promise<boolean>;
  })[]>;
}): Promise<number> {
  const registrations = await container.getRegistrations();
  const ours = registrations.filter(isAppWorkerRegistration);
  const results = await Promise.all(ours.map((registration) => registration.unregister()));
  return results.filter(Boolean).length;
}
