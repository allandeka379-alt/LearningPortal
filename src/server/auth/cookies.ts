/**
 * Cookie names and attributes for authentication (ARCHITECTURE §5.1, §5.4). Pure: callers pass `secure`, derived from
 * `APP_URL` (see {@link isSecureOrigin}), so this module has no environment or request dependency.
 *
 * - Production (https): `__Host-` prefixed names. The browser then guarantees `Secure`, `Path=/` and no `Domain`, so a
 *   sibling subdomain can never plant or overwrite our cookies (session fixation / login CSRF).
 * - Local http development: the same names without the prefix (browsers reject `__Host-` cookies over http).
 *
 * All auth cookies are `HttpOnly` and `SameSite=Lax` (Lax so the Google OAuth redirect back to us still carries the
 * state cookie; mutations are POST-only and Origin-checked, so Lax is sufficient against CSRF).
 */

export const SESSION_COOKIE_BASE = "dz_session";
/** Pending one-time-code flow (which target / purpose is being verified). Sealed, 15 minutes. */
export const AUTH_FLOW_COOKIE_BASE = "dz_auth_flow";
/** Google OAuth state + PKCE verifier + nonce. Sealed, 10 minutes. */
export const OAUTH_COOKIE_BASE = "dz_oauth";
/** Accounts this browser has signed in to (exempts their correct passwords from lockouts, ./device-trust). Sealed, 180 days. */
export const DEVICE_TRUST_COOKIE_BASE = "dz_device";

/** Both possible session cookie names (kept in sync with `src/proxy.ts`). */
export const SESSION_COOKIE_NAMES = [`__Host-${SESSION_COOKIE_BASE}`, SESSION_COOKIE_BASE] as const;

/** True when the app is served over https (cookies must then be `Secure` and `__Host-` prefixed). */
export function isSecureOrigin(appUrl: string): boolean {
  return appUrl.toLowerCase().startsWith("https://");
}

/** Prefixed cookie name for the current transport: `__Host-<base>` over https, `<base>` over http. */
export function cookieName(base: string, secure: boolean): string {
  return secure ? `__Host-${base}` : base;
}

export function sessionCookieName(secure: boolean): string {
  return cookieName(SESSION_COOKIE_BASE, secure);
}

/** Attributes for `cookies().set()` / `Set-Cookie`. */
export interface AuthCookieOptions {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  /** Seconds; 0 deletes the cookie. */
  maxAge: number;
}

/** Cookie attributes for an auth cookie living `maxAgeSeconds` (rounded down, never negative). */
export function authCookieOptions(secure: boolean, maxAgeSeconds: number): AuthCookieOptions {
  return { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: Math.max(0, Math.floor(maxAgeSeconds)) };
}

/**
 * Session cookie attributes. The cookie lives until the session's ABSOLUTE expiry: the sliding idle expiry is enforced
 * in the database on every request (a Server Component cannot re-issue cookies), so an idle-expired cookie simply
 * fails validation.
 */
export function sessionCookieOptions(secure: boolean, expiresAt: Date, now: Date = new Date()): AuthCookieOptions {
  return authCookieOptions(secure, (expiresAt.getTime() - now.getTime()) / 1000);
}

/**
 * `Set-Cookie` header value for route handlers that build their own `Response` (OAuth redirects). Max-Age 0 also
 * sets an Expires in the past for old clients.
 */
export function serializeCookie(name: string, value: string, options: AuthCookieOptions): string {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${options.path}`, `Max-Age=${options.maxAge}`];
  if (options.maxAge === 0) parts.push("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  parts.push("HttpOnly", "SameSite=Lax");
  if (options.secure) parts.push("Secure");
  return parts.join("; ");
}

/** Minimal `Cookie` request-header parser (route handlers receive a plain `Request`). Last duplicate wins. */
export function parseCookieHeader(header: string | null | undefined): Map<string, string> {
  const cookies = new Map<string, string>();
  if (!header) return cookies;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const name = part.slice(0, eq).trim();
    let value = part.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') && value.length >= 2) value = value.slice(1, -1);
    try {
      cookies.set(name, decodeURIComponent(value));
    } catch {
      cookies.set(name, value);
    }
  }
  return cookies;
}
