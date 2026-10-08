import type { MetadataRoute } from "next";
import { absoluteUrl } from "./routing";

/**
 * robots.txt rules (§44). Public pages are crawlable; signed-in areas, APIs, private share links and one-off flows are
 * not. robots.txt rules are PREFIX matches, so each private area is listed as `/area/` plus the exact `/area$` (Google
 * and Bing honour `$`): a bare `/school` would also block the public `/schools` page, and `/app` would block
 * `/apple-icon.png`. Pure.
 */

/** Private areas: each blocks the exact path and everything below it. */
export const PRIVATE_AREAS = ["/app", "/admin", "/parent", "/teacher", "/school", "/onboarding", "/billing", "/dev", "/invite"] as const;

/** Prefixes blocked below a slash only (the bare path is not a page). */
export const PRIVATE_PREFIXES = ["/api/", "/s/", "/share/", "/r/"] as const;

export function robotsDisallowList(): string[] {
  return [...PRIVATE_AREAS.flatMap((area) => [`${area}$`, `${area}/`]), ...PRIVATE_PREFIXES];
}

/** Builds robots.txt for `appUrl` with one `Sitemap:` line per sitemap chunk (`/sitemap/<id>.xml`). */
export function buildRobots(appUrl: string, sitemapChunks: number): MetadataRoute.Robots {
  const count = Math.max(1, Math.floor(sitemapChunks));
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: robotsDisallowList() }],
    sitemap: Array.from({ length: count }, (_, id) => absoluteUrl(appUrl, `/sitemap/${id}.xml`)),
  };
}
