/**
 * Request-id helpers shared by `src/proxy.ts` (which must stay dependency-free and cannot import `next/headers`)
 * and `src/server/lib/request.ts`.
 */

export const REQUEST_ID_HEADER = "x-request-id";

/** Accepts ids from upstream proxies / load balancers only when they are short and log-safe (no spaces, quotes or
 * control characters that could forge log lines). */
const SAFE_REQUEST_ID = /^[A-Za-z0-9._:-]{8,128}$/;

/** True when an incoming request id can be trusted as-is for log correlation. */
export function isValidRequestId(value: string | null | undefined): value is string {
  return typeof value === "string" && SAFE_REQUEST_ID.test(value);
}

/** Returns `incoming` when it is a safe request id, otherwise a fresh random UUID. */
export function resolveRequestId(incoming: string | null | undefined): string {
  return isValidRequestId(incoming) ? incoming : crypto.randomUUID();
}
