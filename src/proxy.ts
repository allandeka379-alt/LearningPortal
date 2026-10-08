import { NextResponse, type NextRequest } from "next/server";
import { REQUEST_ID_HEADER, resolveRequestId } from "@/server/lib/request-id";
import { REQUEST_PATH_HEADER, requestPathOf } from "@/server/lib/request-path";

/**
 * Next 16 request interception (formerly middleware). Deliberately THIN (CLAUDE.md, ARCHITECTURE §3.1):
 * no database, no session validation, no imports of server-only modules.
 *
 * 1. Attaches an `x-request-id` (kept from a trusted upstream when well-formed, otherwise generated) to the request
 *    seen by the app and to the response, for log correlation.
 * 2. Optimistic auth redirect: a GET/HEAD to a protected area WITHOUT a session cookie goes to `/login?next=<path>`.
 *    Cookie PRESENCE is all that is checked; every layout, Server Action and service still validates the session
 *    against the database. Other methods (Server Actions are POSTs) pass through so their own guards answer with a
 *    proper `UNAUTHENTICATED` result instead of an HTML redirect.
 * 3. Forwards the requested page's path + query as `x-dz-request-path` (always overwriting a client-sent value), so a
 *    layout's guard can keep `?next=` when it redirects (see `src/server/lib/request-path.ts`).
 * 4. Never runs for static assets, `/_next/*`, `/api/webhooks/*` or the streamed `/api/v1/uploads` (see `config.matcher`).
 */

/**
 * Session cookie names. Production uses the `__Host-` prefix (Secure, Path=/, no Domain; ARCHITECTURE §5.1); plain
 * `dz_session` is accepted for local http development. Keep in sync with `src/server/auth`.
 */
const SESSION_COOKIE_NAMES = ["__Host-dz_session", "dz_session"] as const;

/** Areas that require a signed-in user. Matched on whole path segments: `/school` does not cover `/schools`. */
const PROTECTED_PREFIXES = ["/app", "/onboarding", "/parent", "/teacher", "/school", "/admin"] as const;

const LOGIN_PATH = "/login";

/** True when `pathname` is one of the protected areas or below it. */
function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function hasSessionCookie(request: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) => {
    const value = request.cookies.get(name)?.value;
    return value !== undefined && value.length > 0;
  });
}

export function proxy(request: NextRequest): NextResponse {
  const requestId = resolveRequestId(request.headers.get(REQUEST_ID_HEADER));
  const { pathname } = request.nextUrl;
  const isNavigation = request.method === "GET" || request.method === "HEAD";
  const requestPath = requestPathOf(request.nextUrl);

  if (isNavigation && isProtectedPath(pathname) && !hasSessionCookie(request)) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    // Always an app-relative path taken from this request; /login must still validate `next` before redirecting.
    loginUrl.searchParams.set("next", requestPath);
    const redirect = NextResponse.redirect(loginUrl);
    redirect.headers.set(REQUEST_ID_HEADER, requestId);
    return redirect;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(REQUEST_ID_HEADER, requestId);
  requestHeaders.set(REQUEST_PATH_HEADER, requestPath);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(REQUEST_ID_HEADER, requestId);
  return response;
}

export const config = {
  matcher: [
    /*
     * Everything except:
     * - /_next/* (static chunks, image optimizer, HMR, data)
     * - /api/webhooks/* (provider callbacks: signature-verified, no cookies, must never be redirected)
     * - /api/v1/uploads (streamed uploads up to 20 MB: a proxy would buffer the body and cut it at
     *   `proxyClientMaxBodySize`, 10 MB; the route authenticates itself and generates its own request id)
     * - metadata and public files (favicon, icons, manifest, robots, sitemap, /icons/*)
     * - any path ending in a static-asset extension
     */
    "/((?!_next/|api/webhooks(?:/|$)|api/v1/uploads(?:/|$)|icons/|favicon\\.ico$|icon\\.svg$|apple-icon\\.png$|manifest\\.webmanifest$|robots\\.txt$|sitemap\\.xml$|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|mjs|map|txt|xml|webmanifest|woff2?|ttf|otf)$).*)",
  ],
};
