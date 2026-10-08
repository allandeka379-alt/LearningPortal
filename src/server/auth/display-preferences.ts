import "server-only";
import type { FontScale as ProfileFontScale, ThemePreference as ProfileTheme } from "@/generated/prisma/client";
import {
  FONT_SCALE_COOKIE,
  PREFERENCE_COOKIE_MAX_AGE_SECONDS,
  THEME_COOKIE,
  serializePreferenceCookie,
  type FontScale,
  type ThemePreference,
} from "@/components/layout/preferences";
import { db } from "@/server/db";
import { logger } from "@/server/lib/logger";

/**
 * Display preferences on a new device (§43). The theme and text size live in plain cookies (`dz_theme`,
 * `dz_font_scale`: the root layout reads them for a correct first paint) and in the Profile (so they follow the
 * account). When a session is started — password or code login, registration, Google — the Profile's choices are written
 * to this browser's cookies, with the same flags the preference switchers use (non-httpOnly, `Path=/`,
 * `SameSite=Lax`, one year, `Secure` on https).
 *
 * Profile values equal to the defaults (SYSTEM / DEFAULT) are not written: no cookie already means the default, and a
 * choice made on this device before signing in is then kept. Best effort: a failed lookup never fails the sign-in.
 */

const THEME_FROM_PROFILE: Readonly<Record<ProfileTheme, ThemePreference>> = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
const FONT_SCALE_FROM_PROFILE: Readonly<Record<ProfileFontScale, FontScale>> = { SMALL: "sm", DEFAULT: "md", LARGE: "lg", EXTRA_LARGE: "xl" };

export interface PreferenceCookie {
  name: typeof THEME_COOKIE | typeof FONT_SCALE_COOKIE;
  value: string;
}

/** The preference cookies for a profile's saved (non-default) choices. Pure. */
export function preferenceCookiesFor(profile: { theme: ProfileTheme; fontScale: ProfileFontScale } | null): PreferenceCookie[] {
  if (!profile) return [];
  const cookies: PreferenceCookie[] = [];
  if (profile.theme !== "SYSTEM") cookies.push({ name: THEME_COOKIE, value: THEME_FROM_PROFILE[profile.theme] });
  if (profile.fontScale !== "DEFAULT") cookies.push({ name: FONT_SCALE_COOKIE, value: FONT_SCALE_FROM_PROFILE[profile.fontScale] });
  return cookies;
}

/** The user's saved display preferences as cookies to set; [] when there are none or the lookup fails. */
export async function loadPreferenceCookies(userId: string): Promise<PreferenceCookie[]> {
  try {
    const profile = await db.profile.findUnique({ where: { userId }, select: { theme: true, fontScale: true } });
    return preferenceCookiesFor(profile);
  } catch (error) {
    logger.warn("display preferences unavailable at sign-in", { err: error });
    return [];
  }
}

/** Attributes for `cookies().set()` (the switchers' flags). */
export function preferenceCookieOptions(secure: boolean) {
  return { httpOnly: false, secure, sameSite: "lax" as const, path: "/", maxAge: PREFERENCE_COOKIE_MAX_AGE_SECONDS };
}

/** `Set-Cookie` header values for route handlers that build their own response (the Google callback). */
export async function preferenceSetCookieHeaders(userId: string, secure: boolean): Promise<string[]> {
  return (await loadPreferenceCookies(userId)).map((cookie) => serializePreferenceCookie(cookie.name, cookie.value, secure));
}
