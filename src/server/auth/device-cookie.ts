import "server-only";
import { cookies } from "next/headers";
import { getEnv } from "@/server/lib/env";
import { authCookieOptions, cookieName, DEVICE_TRUST_COOKIE_BASE, isSecureOrigin } from "./cookies";
import { DEVICE_TRUST_TTL_MS, rememberDevice } from "./device-trust";

/**
 * The remembered-device cookie (./device-trust) of the web channel. Not cleared on logout: it remembers the device,
 * not a session, and grants nothing by itself. Writes work only in Server Actions and Route Handlers.
 */

function secure(): boolean {
  return isSecureOrigin(getEnv().APP_URL);
}

/** The sealed device token of the current request, or `null`. */
export async function readDeviceTrustCookie(): Promise<string | null> {
  return (await cookies()).get(cookieName(DEVICE_TRUST_COOKIE_BASE, secure()))?.value ?? null;
}

/** Remembers `userId` on this browser after a successful sign-in. */
export async function rememberDeviceCookie(userId: string): Promise<void> {
  const isSecure = secure();
  const token = rememberDevice(await readDeviceTrustCookie(), userId);
  (await cookies()).set(cookieName(DEVICE_TRUST_COOKIE_BASE, isSecure), token, authCookieOptions(isSecure, DEVICE_TRUST_TTL_MS / 1000));
}
