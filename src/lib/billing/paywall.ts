/**
 * The student-area paywall (owner decision 2026-10-12: there is NO free tier). A student without full access (a paid
 * plan, a school seat or any other live grant, see `hasStudentAppAccess` in src/server/billing/entitlements.ts) may
 * only use the pages listed in {@link PAYWALL_OPEN_PATHS}; every other /app page sends them to {@link UNLOCK_PATH}.
 *
 * Pure and isomorphic: the /app layout checks it on the server (with the path forwarded by src/proxy.ts) and a tiny
 * client guard re-checks it on client-side navigations, which do not re-render the layout.
 */

/** The in-app unlock page: what Full access includes and the Paynow checkout. */
export const UNLOCK_PATH = "/app/unlock";

/**
 * Pages an unpaid student still needs (whole path segments, sub-pages included): the unlock page itself, Plan & billing
 * (checkout, the Paynow return / result page and receipts), settings, notifications, the family links (a parent can pay
 * for the student) and the class-invite acceptance (a school seat may come with the class).
 */
export const PAYWALL_OPEN_PATHS: readonly string[] = [
  UNLOCK_PATH,
  "/app/billing",
  "/app/settings",
  "/app/notifications",
  "/app/family",
  "/app/classes/invite",
];

/** App path without query, hash or trailing slash ("/app/billing/?x=1" → "/app/billing"). */
function normalisePath(path: string): string {
  const cut = path.search(/[?#]/);
  const bare = cut === -1 ? path : path.slice(0, cut);
  return bare.length > 1 ? bare.replace(/\/+$/, "") : bare;
}

/** True when `path` (path, optionally with a query) is one of {@link PAYWALL_OPEN_PATHS} or below one. */
export function isPaywallOpenPath(path: string): boolean {
  const pathname = normalisePath(path);
  return PAYWALL_OPEN_PATHS.some((open) => pathname === open || pathname.startsWith(`${open}/`));
}

/**
 * Where an unpaid student requesting `path` must go instead, or `null` when the page stays open. An unknown path
 * (`null`: the proxy header was missing, which src/proxy.ts never allows for /app) is NOT redirected, because the
 * layout cannot tell it from the unlock page itself and must never loop; the learning services still refuse unpaid
 * use (ENTITLEMENT_REQUIRED) and the client guard redirects once the page is known.
 */
export function paywallRedirect(path: string | null, hasAccess: boolean): string | null {
  if (hasAccess || path === null) return null;
  return isPaywallOpenPath(path) ? null : UNLOCK_PATH;
}
