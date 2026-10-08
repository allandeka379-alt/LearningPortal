/**
 * The path of the page being requested, forwarded by `src/proxy.ts` as a request header. A LAYOUT's guard is not told
 * which page it wraps, and layouts and pages render in parallel, so the layout's redirect usually answers first; with
 * this header it can still send the user back to that page afterwards (`?next=` through sign-in, a forced password
 * change or onboarding). Dependency-free: `src/proxy.ts` imports it.
 *
 * The value is as untrusted as any URL: guards pass it through `safeNextPath`. The proxy always overwrites a value the
 * client sent.
 */

export const REQUEST_PATH_HEADER = "x-dz-request-path";

/** Framework-internal search params that are never part of a page's address (RSC fetches add `_rsc`). */
const INTERNAL_SEARCH_PARAMS = ["_rsc"] as const;

/** App-relative path + query of `url`, without framework-internal params. */
export function requestPathOf(url: URL): string {
  const params = new URLSearchParams(url.search);
  for (const name of INTERNAL_SEARCH_PARAMS) params.delete(name);
  const query = params.toString();
  return query.length > 0 ? `${url.pathname}?${query}` : url.pathname;
}
