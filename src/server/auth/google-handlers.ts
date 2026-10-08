import "server-only";
import { timingSafeEqualStr } from "@/server/lib/crypto";
import { absoluteUrl, getEnv } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { rateLimit, rateLimitSubject } from "@/server/lib/rate-limit";
import { requestContextFromHeaders } from "@/server/lib/request";
import {
  authCookieOptions,
  cookieName,
  DEVICE_TRUST_COOKIE_BASE,
  isSecureOrigin,
  OAUTH_COOKIE_BASE,
  parseCookieHeader,
  serializeCookie,
  sessionCookieName,
  sessionCookieOptions,
} from "./cookies";
import {
  buildGoogleAuthorizationUrl,
  completeGoogleLogin,
  createOAuthState,
  getGoogleConfig,
  oauthStateSchema,
  resolveGoogleProfile,
  type FetchLike,
} from "./google";
import { DEVICE_TRUST_TTL_MS, rememberDevice } from "./device-trust";
import { sessionTokenFromRequest } from "./request-auth";
import type { SelfServiceRole } from "./schemas";
import { seal, unseal } from "./sealed";
import { preferenceSetCookieHeaders } from "./display-preferences";
import { revokeSessionByToken } from "./sessions";
import { normalizeReferralCode } from "@/server/referrals/core";
import { referralCookieName, referralCookieOptions } from "@/server/referrals/cookie";
import { recordReferralSignup } from "@/server/referrals/service";

/**
 * Route-handler bodies for `GET /api/auth/google/start` and `GET /api/auth/google/callback` (the route files only
 * delegate here, so the whole OAuth round trip is testable with plain `Request`s and an injected `fetch`).
 *
 * Every outcome is a redirect: to Google, to the post-login destination, or back to `/login?error=<code>` (codes in
 * `AUTH_PAGE_ERRORS`, src/components/auth/form-state.ts). The OAuth cookie (sealed state, PKCE verifier, nonce; 10
 * minutes) is single use: the callback always clears it.
 */

const OAUTH_TTL_MS = 10 * 60_000;
/** Google round trips per IP (start + callback each count). */
const OAUTH_IP_LIMIT = { limit: 30, windowSeconds: 15 * 60 } as const;

function secure(): boolean {
  return isSecureOrigin(getEnv().APP_URL);
}

function redirectResponse(location: string, cookies: readonly string[] = []): Response {
  const headers = new Headers({ location, "cache-control": "no-store" });
  for (const cookie of cookies) headers.append("set-cookie", cookie);
  return new Response(null, { status: 303, headers });
}

function loginError(code: string, cookies: readonly string[] = []): Response {
  return redirectResponse(absoluteUrl(`/login?error=${encodeURIComponent(code)}`), cookies);
}

async function ipAllowed(ip: string | null, phase: "start" | "callback"): Promise<boolean> {
  const result = await rateLimit({ key: `oauth:${phase}:${rateLimitSubject(ip)}`, ...OAUTH_IP_LIMIT });
  return result.allowed;
}

function roleFrom(value: string | null): SelfServiceRole {
  const upper = value?.toUpperCase();
  return upper === "PARENT" || upper === "TEACHER" ? upper : "STUDENT";
}

/** `GET /api/auth/google/start?next=&role=`: stores sealed state + PKCE verifier + nonce and redirects to Google. */
export async function handleGoogleStart(request: Request): Promise<Response> {
  const meta = requestContextFromHeaders(request.headers);
  try {
    const config = getGoogleConfig();
    if (config === null) return loginError("google_unavailable");
    if (!(await ipAllowed(meta.ip, "start"))) return loginError("rate_limited");
    const url = new URL(request.url);
    const state = createOAuthState(url.searchParams.get("next"), roleFrom(url.searchParams.get("role")));
    const isSecure = secure();
    const cookie = serializeCookie(
      cookieName(OAUTH_COOKIE_BASE, isSecure),
      seal("oauth", { ...state }, OAUTH_TTL_MS),
      authCookieOptions(isSecure, OAUTH_TTL_MS / 1000),
    );
    return redirectResponse(buildGoogleAuthorizationUrl(config, state), [cookie]);
  } catch (error) {
    logger.error("google start failed", { requestId: meta.requestId, err: error });
    return loginError("google_failed");
  }
}

/**
 * `GET /api/auth/google/callback?code=&state=`: checks state (constant time) against the sealed cookie, exchanges the
 * code with the PKCE verifier, validates the ID token and userinfo, resolves the account, starts a session.
 */
export async function handleGoogleCallback(request: Request, deps: { fetch?: FetchLike } = {}): Promise<Response> {
  const meta = requestContextFromHeaders(request.headers);
  const isSecure = secure();
  const oauthCookieName = cookieName(OAUTH_COOKIE_BASE, isSecure);
  const clearOAuth = serializeCookie(oauthCookieName, "", authCookieOptions(isSecure, 0));
  try {
    const config = getGoogleConfig();
    if (config === null) return loginError("google_unavailable", [clearOAuth]);
    if (!(await ipAllowed(meta.ip, "callback"))) return loginError("rate_limited", [clearOAuth]);

    const url = new URL(request.url);
    if (url.searchParams.has("error")) return loginError("google_cancelled", [clearOAuth]);
    const state = unseal("oauth", parseCookieHeader(request.headers.get("cookie")).get(oauthCookieName), oauthStateSchema);
    const returnedState = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    if (state === null || !returnedState || !code || code.length > 2048 || !timingSafeEqualStr(state.state, returnedState)) {
      return loginError("google_failed", [clearOAuth]);
    }

    const profile = await resolveGoogleProfile(config, state, code, deps.fetch);
    const result = await completeGoogleLogin(profile, {
      next: state.next,
      role: state.role,
      meta: { ip: meta.ip, userAgent: meta.userAgent, requestId: meta.requestId },
    });
    if (result.kind === "error") return loginError(`google_${result.reason}`, [clearOAuth]);

    const previous = sessionTokenFromRequest(request);
    if (previous !== null && previous !== result.token) await revokeSessionByToken(previous, "rotated");
    const sessionCookie = serializeCookie(
      sessionCookieName(isSecure),
      result.token,
      sessionCookieOptions(isSecure, result.session.absoluteExpiresAt ?? result.session.expiresAt),
    );
    // This browser is now remembered for the account (./device-trust: its correct passwords skip lockouts).
    const deviceName = cookieName(DEVICE_TRUST_COOKIE_BASE, isSecure);
    const deviceCookie = serializeCookie(
      deviceName,
      rememberDevice(parseCookieHeader(request.headers.get("cookie")).get(deviceName), result.userId),
      authCookieOptions(isSecure, DEVICE_TRUST_TTL_MS / 1000),
    );
    // The account's saved theme / text size come with it to this device (§43).
    const preferences = await preferenceSetCookieHeaders(result.session.userId, isSecure);
    // A Google sign-UP after a referral landing (/r/[code]) is attributed like a password registration (§46).
    const referral: string[] = [];
    if (result.newAccount) {
      const code = normalizeReferralCode(parseCookieHeader(request.headers.get("cookie")).get(referralCookieName()) ?? null);
      if (code) {
        await recordReferralSignup({ referredUserId: result.userId, code, ip: meta.ip });
        referral.push(serializeCookie(referralCookieName(), "", referralCookieOptions(0)));
      }
    }
    return redirectResponse(absoluteUrl(result.redirectTo), [clearOAuth, sessionCookie, deviceCookie, ...preferences, ...referral]);
  } catch (error) {
    logger.warn("google callback failed", { requestId: meta.requestId, err: error });
    return loginError("google_failed", [clearOAuth]);
  }
}
