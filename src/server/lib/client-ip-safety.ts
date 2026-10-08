import { clientIpPolicyFromEnv, type ClientIpPolicy } from "./request";

/**
 * Production boot checks of the client-IP configuration (SECURITY.md AUTH-05; docs/DEPLOYMENT.md "Client IP"), in the
 * style of ./db-safety.ts: run once by `src/instrumentation-node.ts` in production, each finding logged as a warning
 * that names the fix. Every IP rate limit (sign-in, codes and SMS cost, registration, search, webhooks) depends on the
 * address these settings produce, and a wrong value fails silently: either clients can forge their address (limits
 * bypassed) or every user shares the CDN's address (one bucket, everyone locked out together).
 *
 * `env.ts` already refuses to start production without `TRUSTED_PROXY_HOPS` or `CLIENT_IP_HEADER`; this report also
 * covers the cases env validation cannot judge (both set, a client-controlled header, an implausible hop count) and
 * prints the policy in force so operators can check it against the real proxy chain. The runtime counterpart (one
 * warning per process when a request's X-Forwarded-For chain is shorter than the hop count, or the configured header
 * is missing) lives in ./request.ts.
 *
 * Exact values (verify against your provider's current documentation before go-live):
 * - Cloudflare -> AWS ALB (default `routing.http.xff_header_processing.mode = append`) -> app: `TRUSTED_PROXY_HOPS=2`
 *   (Cloudflare appends the visitor address, the ALB appends the Cloudflare edge address). The ALB must accept traffic
 *   from Cloudflare's published address ranges only, otherwise a client can reach it directly and forge the entry.
 * - Same chain, alternative: `CLIENT_IP_HEADER=cf-connecting-ip` (Cloudflare overwrites it), under the same condition.
 * - ALB only: `TRUSTED_PROXY_HOPS=1`. Cloudflare only (no load balancer): `TRUSTED_PROXY_HOPS=1` or
 *   `CLIENT_IP_HEADER=cf-connecting-ip`.
 */

/** Headers that carry a client-supplied LIST (or nothing an edge overwrites), never a single trusted address. */
const CLIENT_CONTROLLED_HEADERS: ReadonlySet<string> = new Set(["x-forwarded-for", "forwarded", "x-forwarded", "forwarded-for"]);

/** Headers that are safe only when the edge OVERWRITES them on every request. */
const OVERWRITE_DEPENDENT_HEADERS: ReadonlySet<string> = new Set(["x-real-ip", "true-client-ip", "x-client-ip", "x-cluster-client-ip", "fastly-client-ip"]);

/** More appending proxies than this is unusual for this platform's topology (CDN + load balancer = 2). */
const PLAUSIBLE_MAX_HOPS = 3;

export interface ClientIpBootReport {
  /** The policy in force, in words (logged at boot). */
  policy: string;
  /** Each a sentence naming the fix. */
  warnings: string[];
}

/** The policy in words, e.g. "X-Forwarded-For entry 2 from the right". */
export function describeClientIpPolicy(policy: ClientIpPolicy): string {
  if (policy.clientIpHeader !== null) return `header ${policy.clientIpHeader}`;
  return `X-Forwarded-For entry ${policy.trustedProxyHops} from the right`;
}

/** Pure: the boot report for an environment (see module docs). */
export function clientIpBootReport(source: Readonly<Record<string, string | undefined>>): ClientIpBootReport {
  const hopsRaw = source.TRUSTED_PROXY_HOPS?.trim() || undefined;
  const headerRaw = source.CLIENT_IP_HEADER?.trim().toLowerCase() || undefined;
  const policy = clientIpPolicyFromEnv(source);
  const warnings: string[] = [];

  if (hopsRaw === undefined && headerRaw === undefined) {
    warnings.push(
      "Neither TRUSTED_PROXY_HOPS nor CLIENT_IP_HEADER is set, so the client IP is guessed as the last X-Forwarded-For entry " +
        "(one appending proxy). Behind Cloudflare and an AWS load balancer set TRUSTED_PROXY_HOPS=2, or CLIENT_IP_HEADER=cf-connecting-ip " +
        "when the load balancer accepts Cloudflare's address ranges only (docs/DEPLOYMENT.md, Client IP).",
    );
  }
  if (hopsRaw !== undefined && headerRaw !== undefined) {
    warnings.push(`Both TRUSTED_PROXY_HOPS and CLIENT_IP_HEADER are set: only the header (${headerRaw}) is used and TRUSTED_PROXY_HOPS is ignored. Unset the one you do not mean.`);
  }
  if (headerRaw !== undefined && CLIENT_CONTROLLED_HEADERS.has(headerRaw)) {
    warnings.push(
      `CLIENT_IP_HEADER=${headerRaw} names a header clients can write and proxies append to, not one address set by your edge. ` +
        "Use TRUSTED_PROXY_HOPS for X-Forwarded-For, or a header your CDN overwrites (cf-connecting-ip on Cloudflare).",
    );
  }
  if (headerRaw !== undefined && OVERWRITE_DEPENDENT_HEADERS.has(headerRaw)) {
    warnings.push(
      `CLIENT_IP_HEADER=${headerRaw} is safe only if your edge overwrites it on every request and the origin accepts traffic from that edge alone; ` +
        "otherwise any client can set it. Check both before launch.",
    );
  }
  if (headerRaw === undefined && hopsRaw !== undefined && policy.trustedProxyHops > PLAUSIBLE_MAX_HOPS) {
    warnings.push(
      `TRUSTED_PROXY_HOPS=${policy.trustedProxyHops} is more appending proxies than usual (Cloudflare + load balancer = 2). ` +
        "If it is larger than the real chain, clients can forge their address: verify with a forged X-Forwarded-For from outside.",
    );
  }
  return { policy: describeClientIpPolicy(policy), warnings };
}
