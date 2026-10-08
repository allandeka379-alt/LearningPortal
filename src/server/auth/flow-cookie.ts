import "server-only";
import { cookies } from "next/headers";
import { getEnv } from "@/server/lib/env";
import { AUTH_FLOW_COOKIE_BASE, authCookieOptions, cookieName, isSecureOrigin } from "./cookies";
import { authFlowSchema, type AuthFlow } from "./schemas";
import { seal, unseal } from "./sealed";

/**
 * The pending one-time-code step of the web flows (register → /verify, OTP login → /verify, forgot password →
 * /reset-password) lives in a sealed, HttpOnly cookie for 15 minutes, so the email / phone being verified never
 * appears in a URL, a log or page HTML (only its masked form is rendered).
 *
 * Writes work only in Server Actions and Route Handlers; Server Components may read.
 */

export const AUTH_FLOW_TTL_MS = 15 * 60_000;

function secure(): boolean {
  return isSecureOrigin(getEnv().APP_URL);
}

/** Seals a flow into a cookie value (exported for tests and route handlers). */
export function sealAuthFlow(flow: AuthFlow, now: Date = new Date()): string {
  return seal("auth-flow", { ...flow }, AUTH_FLOW_TTL_MS, { now });
}

/** Opens a sealed flow; `null` when missing, tampered or expired. */
export function unsealAuthFlow(value: string | null | undefined, now: Date = new Date()): AuthFlow | null {
  return unseal("auth-flow", value, authFlowSchema, { now });
}

/** Stores the pending flow (Server Actions / Route Handlers). */
export async function setAuthFlowCookie(flow: AuthFlow): Promise<void> {
  const isSecure = secure();
  (await cookies()).set(
    cookieName(AUTH_FLOW_COOKIE_BASE, isSecure),
    sealAuthFlow(flow),
    authCookieOptions(isSecure, AUTH_FLOW_TTL_MS / 1000),
  );
}

/** The pending flow of the current request, or `null`. */
export async function readAuthFlowCookie(): Promise<AuthFlow | null> {
  const value = (await cookies()).get(cookieName(AUTH_FLOW_COOKIE_BASE, secure()))?.value;
  return unsealAuthFlow(value);
}

/** Deletes the pending flow (after success). */
export async function clearAuthFlowCookie(): Promise<void> {
  const isSecure = secure();
  (await cookies()).set(cookieName(AUTH_FLOW_COOKIE_BASE, isSecure), "", authCookieOptions(isSecure, 0));
}
