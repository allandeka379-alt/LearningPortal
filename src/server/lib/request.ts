import "server-only";
import { isIP } from "node:net";
import { headers } from "next/headers";
import { logger } from "./logger";
import { REQUEST_ID_HEADER, resolveRequestId } from "./request-id";

/**
 * Request metadata for Server Components, Server Actions and route handlers.
 *
 * The `get*` functions read the current request through `next/headers` (async in Next 16). Route handlers that
 * already hold a `Request` can call the pure `*FromHeaders` variants with `request.headers` instead.
 *
 * CLIENT IP (every IP rate limit depends on it): clients can send any `X-Forwarded-For`, and CDNs / load balancers
 * APPEND to it, so only the entries added by our own proxies are trustworthy. The client address is therefore the
 * entry `TRUSTED_PROXY_HOPS` places from the RIGHT (default 1: one appending proxy, e.g. a load balancer; Cloudflare
 * + ALB is 2), never the left-most one. When the edge instead SETS a dedicated header (e.g. `cf-connecting-ip`), name
 * it in `CLIENT_IP_HEADER` and only that header is read. A missing or malformed value gives `null` (one shared
 * "unknown" bucket), never a client-chosen address. `X-Real-IP` is only read when configured as `CLIENT_IP_HEADER`.
 * Production refuses to start without one of the two settings (env.ts); ./client-ip-safety.ts reports the policy and
 * risky values at boot, and {@link clientIpFromHeaders} logs ONE warning per process when real traffic contradicts the
 * setting (a chain shorter than `TRUSTED_PROXY_HOPS`, or the configured header missing).
 */

/** Minimal header reader satisfied by `Headers`, `ReadonlyHeaders` and `NextRequest["headers"]`. */
export interface HeaderReader {
  get(name: string): string | null;
}

export interface RequestContext {
  requestId: string;
  ip: string | null;
  userAgent: string | null;
}

const MAX_USER_AGENT_LENGTH = 512;

/** Normalises one address candidate: strips quotes, ports and brackets; returns `null` unless it is a valid IP. */
function normalizeIp(candidate: string): string | null {
  let value = candidate.trim().replace(/^"|"$/g, "");
  const bracketed = /^\[([^\]]+)\](?::\d+)?$/.exec(value);
  if (bracketed?.[1] !== undefined) {
    value = bracketed[1];
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(value)) {
    value = value.slice(0, value.lastIndexOf(":"));
  }
  value = value.toLowerCase().replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/, "");
  return isIP(value) === 0 ? null : value;
}

/** How the edge reports the client address (see the note at the top of this module). */
export interface ClientIpPolicy {
  /** Proxies in front of the app that append to X-Forwarded-For; the client is the entry this many from the right. */
  trustedProxyHops: number;
  /** Lower-case header the edge sets to the client address, used INSTEAD of X-Forwarded-For; `null` when unused. */
  clientIpHeader: string | null;
}

export const DEFAULT_CLIENT_IP_POLICY: ClientIpPolicy = Object.freeze({ trustedProxyHops: 1, clientIpHeader: null });

/**
 * Policy from `TRUSTED_PROXY_HOPS` / `CLIENT_IP_HEADER`. Reads the raw variables without throwing (env.ts validates
 * them at boot); anything malformed falls back to the default.
 */
export function clientIpPolicyFromEnv(source: Readonly<Record<string, string | undefined>> = process.env): ClientIpPolicy {
  const hopsRaw = source.TRUSTED_PROXY_HOPS?.trim();
  const hops = hopsRaw && /^\d{1,2}$/.test(hopsRaw) ? Number(hopsRaw) : DEFAULT_CLIENT_IP_POLICY.trustedProxyHops;
  const headerRaw = source.CLIENT_IP_HEADER?.trim().toLowerCase();
  return {
    trustedProxyHops: hops >= 1 && hops <= 10 ? hops : DEFAULT_CLIENT_IP_POLICY.trustedProxyHops,
    clientIpHeader: headerRaw && /^[a-z0-9-]{1,64}$/.test(headerRaw) ? headerRaw : null,
  };
}

let cachedPolicy: ClientIpPolicy | undefined;

function currentPolicy(): ClientIpPolicy {
  cachedPolicy ??= clientIpPolicyFromEnv();
  return cachedPolicy;
}

/** Misconfiguration signals already logged by this process (one line each, never per request). */
const reportedAnomalies = new Set<string>();

function reportAnomalyOnce(kind: "header_missing" | "chain_shorter_than_hops", message: string, fields: Record<string, unknown>): void {
  if (reportedAnomalies.has(kind)) return;
  reportedAnomalies.add(kind);
  logger.warn(message, { ...fields, anomaly: kind });
}

/** Test hook: forgets which anomalies this process already logged. */
export function resetClientIpAnomalyReports(): void {
  reportedAnomalies.clear();
}

/**
 * Client IP per `policy` (default: from the environment): the configured client-IP header, or the X-Forwarded-For
 * entry `trustedProxyHops` places from the right. `null` when that value is missing or not a valid address.
 *
 * A chain with FEWER entries than `trustedProxyHops` means the setting is larger than the real proxy chain (a request
 * that arrives without a client-sent header carries exactly one entry per appending proxy), so clients can forge their
 * address by sending X-Forwarded-For themselves: logged once per process (the address itself is never logged).
 */
export function clientIpFromHeaders(source: HeaderReader, policy: ClientIpPolicy = currentPolicy()): string | null {
  if (policy.clientIpHeader !== null) {
    const value = source.get(policy.clientIpHeader);
    if (value === null) {
      reportAnomalyOnce("header_missing", "client IP header is configured but missing on a request: those requests share one rate-limit bucket", {
        header: policy.clientIpHeader,
      });
      return null;
    }
    return normalizeIp(value);
  }
  const forwardedFor = source.get("x-forwarded-for");
  if (forwardedFor === null) return null;
  const hops = forwardedFor
    .split(",")
    .map((hop) => hop.trim())
    .filter((hop) => hop.length > 0);
  if (hops.length < policy.trustedProxyHops) {
    reportAnomalyOnce(
      "chain_shorter_than_hops",
      "X-Forwarded-For has fewer entries than TRUSTED_PROXY_HOPS: the setting is larger than the real proxy chain, so clients can forge their address. Lower TRUSTED_PROXY_HOPS (docs/DEPLOYMENT.md, Client IP)",
      { entries: hops.length, trustedProxyHops: policy.trustedProxyHops },
    );
  }
  const trusted = hops[hops.length - policy.trustedProxyHops];
  return trusted === undefined ? null : normalizeIp(trusted);
}

/** `User-Agent`, truncated to 512 characters; `null` when absent or blank. */
export function userAgentFromHeaders(source: HeaderReader): string | null {
  const value = source.get("user-agent")?.trim();
  return value ? value.slice(0, MAX_USER_AGENT_LENGTH) : null;
}

/**
 * Request id set by `src/proxy.ts` (or a trusted upstream). Routes excluded from the proxy (webhooks) get a fresh id
 * on every call, so read it once per request and pass it down.
 */
export function requestIdFromHeaders(source: HeaderReader): string {
  return resolveRequestId(source.get(REQUEST_ID_HEADER));
}

export function requestContextFromHeaders(source: HeaderReader): RequestContext {
  return {
    requestId: requestIdFromHeaders(source),
    ip: clientIpFromHeaders(source),
    userAgent: userAgentFromHeaders(source),
  };
}

/** Client IP of the current request. Only valid inside a request scope (RSC, Server Action, route handler). */
export async function getClientIp(): Promise<string | null> {
  return clientIpFromHeaders(await headers());
}

/** User agent of the current request. */
export async function getUserAgent(): Promise<string | null> {
  return userAgentFromHeaders(await headers());
}

/** Request id of the current request (see {@link requestIdFromHeaders}). */
export async function getRequestId(): Promise<string> {
  return requestIdFromHeaders(await headers());
}

/** Request id, IP and user agent of the current request in one `headers()` read. */
export async function getRequestContext(): Promise<RequestContext> {
  return requestContextFromHeaders(await headers());
}
