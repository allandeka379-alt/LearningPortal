import "server-only";
import { cookies } from "next/headers";
import { authCookieOptions, cookieName, isSecureOrigin, type AuthCookieOptions } from "@/server/auth/cookies";
import { getAppUrl } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { normalizeReferralCode } from "./core";
import { recordReferralSignup, type SignupAttribution } from "./service";

/**
 * Referral landing cookie (§46). ROUTE-LAYER helpers only: services never read cookies (ARCHITECTURE §3.1).
 *
 * `/r/[code]` stores the normalised code in a short-lived, httpOnly, SameSite=Lax cookie (`__Host-dz_ref` over https)
 * and redirects to /register; the register flow reads it with {@link readReferralCookie}, passes the code to
 * `recordReferralSignup` and clears it with {@link clearReferralCookie}. The cookie holds only the public code.
 */

export const REFERRAL_COOKIE_BASE = "dz_ref";
/** Seven days: long enough to sign up later in the week, short enough to stay "this invite". */
export const REFERRAL_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 3600;

function secure(): boolean {
  return isSecureOrigin(getAppUrl());
}

export function referralCookieName(): string {
  return cookieName(REFERRAL_COOKIE_BASE, secure());
}

export function referralCookieOptions(maxAgeSeconds: number = REFERRAL_COOKIE_MAX_AGE_SECONDS): AuthCookieOptions {
  return authCookieOptions(secure(), maxAgeSeconds);
}

/** The referral code from the landing cookie, normalised; null when absent or malformed. */
export async function readReferralCookie(): Promise<string | null> {
  const store = await cookies();
  return normalizeReferralCode(store.get(referralCookieName())?.value ?? null);
}

/** Deletes the landing cookie (after sign-up). Only callable from Server Actions and Route Handlers. */
export async function clearReferralCookie(): Promise<void> {
  const store = await cookies();
  store.set(referralCookieName(), "", referralCookieOptions(0));
}

/**
 * Route-layer hook for sign-up code paths that know the NEW account's id (e.g. the Google OAuth callback creating an
 * account): attributes it to the code in the landing cookie, then clears the cookie. Never throws; returns null when
 * there was no cookie. Call it only right after creating an account, never on a plain sign-in.
 */
export async function attributeSignupFromCookie(referredUserId: string, ip: string | null): Promise<SignupAttribution | null> {
  try {
    const code = await readReferralCookie();
    if (!code) return null;
    const result = await recordReferralSignup({ referredUserId, code, ip });
    await clearReferralCookie();
    return result;
  } catch (error) {
    logger.warn("referrals: cookie attribution failed", { err: error });
    return null;
  }
}
