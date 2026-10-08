import "server-only";
import { RATE_LIMIT_PRESETS, rateLimits, type RateLimitInput } from "@/server/lib/rate-limit";

/**
 * Search rate limit (§39, ARCHITECTURE §5.5 "Public search: 60 / min"). Signed-in students are counted per account
 * (a whole school behind one NAT address must not share a single bucket); anonymous callers per IP. Both use the
 * `publicSearch` preset, so the `rateLimits` setting tunes them together.
 */
export function searchRateLimit(userId: string | null, ip: string | null): RateLimitInput {
  if (userId === null) return rateLimits.publicSearch(ip);
  return { ...RATE_LIMIT_PRESETS.publicSearch, key: `publicSearch:user:${userId}`, preset: "publicSearch" };
}

export const SEARCH_RATE_LIMITED_MESSAGE = "You're searching very quickly. Please wait a moment and try again.";
