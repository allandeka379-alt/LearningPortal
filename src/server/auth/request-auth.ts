import "server-only";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { actorFromSession, type Actor } from "./actor";
import { isSecureOrigin, parseCookieHeader, sessionCookieName } from "./cookies";
import { validateSessionToken, type SessionInfo } from "./sessions";

/**
 * Authentication for Route Handlers (`/api/v1`, `/api/auth/*`), which receive a plain `Request` (ARCHITECTURE §3.3,
 * §5.4):
 *
 * - `Authorization: Bearer dz_…` → an API-kind session. Cookies are IGNORED when a bearer header is present, and a
 *   bad bearer token is always a 401 (never silently anonymous).
 * - Otherwise the web session cookie. Unsafe methods (POST/PUT/PATCH/DELETE) authenticated by cookie must be
 *   same-origin (`Origin` equals APP_URL's origin, or `Sec-Fetch-Site: same-origin` when no Origin is sent); anything
 *   else is refused with 403 (CSRF).
 */

export type RequestAuthVia = "bearer" | "cookie";

export interface RequestAuth {
  actor: Actor;
  session: SessionInfo;
  via: RequestAuthVia;
}

/** Minimal header reader (`Headers`, `ReadonlyHeaders`). */
export interface HeaderSource {
  get(name: string): string | null;
}

const UNSAFE_METHODS: ReadonlySet<string> = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/** True for methods that may change state (CSRF-relevant). */
export function isUnsafeMethod(method: string): boolean {
  return UNSAFE_METHODS.has(method.toUpperCase());
}

/**
 * Bearer token from `Authorization`: `undefined` when there is no Authorization header, `null` when the header is
 * present but not a well-formed `Bearer <token>`.
 */
export function bearerTokenFromHeaders(headers: HeaderSource): string | null | undefined {
  const header = headers.get("authorization");
  if (header === null) return undefined;
  const match = /^Bearer[ ]+([^\s]+)\s*$/i.exec(header.trim());
  return match?.[1] ?? null;
}

/**
 * Same-origin check for cookie-authenticated unsafe requests (pure). `Origin` must equal `appUrl`'s origin; when a
 * browser omits Origin, `Sec-Fetch-Site: same-origin` is accepted. Requests carrying neither are refused.
 */
export function isSameOriginRequest(headers: HeaderSource, appUrl: string): boolean {
  const origin = headers.get("origin");
  if (origin !== null) {
    if (origin === "null") return false;
    try {
      return new URL(origin).origin === new URL(appUrl).origin;
    } catch {
      return false;
    }
  }
  return headers.get("sec-fetch-site") === "same-origin";
}

/** Raw session token from a request's `Cookie` header for this deployment's cookie name. */
export function sessionTokenFromRequest(request: Request): string | null {
  const name = sessionCookieName(isSecureOrigin(getEnv().APP_URL));
  const value = parseCookieHeader(request.headers.get("cookie")).get(name);
  return value && value.length > 0 ? value : null;
}

/**
 * Resolves the caller of a Route Handler. Returns `null` for anonymous requests (no credentials, or an invalid /
 * expired cookie).
 *
 * @throws AppError UNAUTHENTICATED for a missing-or-invalid bearer token; FORBIDDEN for a cross-site unsafe request
 *   authenticated by cookie.
 */
export async function authenticateRequest(request: Request): Promise<RequestAuth | null> {
  const bearer = bearerTokenFromHeaders(request.headers);
  if (bearer !== undefined) {
    const validated = bearer === null ? null : await validateSessionToken(bearer, { kind: "API" });
    if (validated === null) throw AppError.unauthenticated("Your access token is invalid or has expired. Sign in again.");
    return { actor: actorFromSession(validated, "api"), session: validated.session, via: "bearer" };
  }

  const token = sessionTokenFromRequest(request);
  if (token === null) return null;
  const validated = await validateSessionToken(token, { kind: "WEB" });
  if (validated === null) return null;
  if (isUnsafeMethod(request.method) && !isSameOriginRequest(request.headers, getEnv().APP_URL)) {
    throw AppError.forbidden("This request was blocked because it did not come from this site.");
  }
  return { actor: actorFromSession(validated, "web"), session: validated.session, via: "cookie" };
}
