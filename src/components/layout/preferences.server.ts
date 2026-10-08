import "server-only";
import { cookies } from "next/headers";
import { FONT_SCALE_COOKIE, THEME_COOKIE, parseFontScale, parseThemePreference, type FontScale, type ThemePreference } from "./preferences";

export interface DisplayPreferences {
  theme: ThemePreference;
  fontScale: FontScale;
}

/**
 * Reads the display preferences from request cookies (validated; unknown values fall back to defaults).
 * Note: calling this opts the route into dynamic rendering, like any `cookies()` access.
 */
export async function getDisplayPreferences(): Promise<DisplayPreferences> {
  const store = await cookies();
  return {
    theme: parseThemePreference(store.get(THEME_COOKIE)?.value),
    fontScale: parseFontScale(store.get(FONT_SCALE_COOKIE)?.value),
  };
}
