import type { FontScale, ThemePreference } from "@/components/layout/preferences";

/**
 * Display preferences live in two places: cookies (`dz_theme`, `dz_font_scale`, read by the root layout so the first
 * paint is right) and the student's Profile (so the choice follows the account). These maps translate between the
 * cookie values and the Profile enums. Pure and isomorphic.
 */

export type ProfileTheme = "SYSTEM" | "LIGHT" | "DARK";
export type ProfileFontScale = "SMALL" | "DEFAULT" | "LARGE" | "EXTRA_LARGE";

const THEME_TO_PROFILE: Readonly<Record<ThemePreference, ProfileTheme>> = { system: "SYSTEM", light: "LIGHT", dark: "DARK" };
const FONT_TO_PROFILE: Readonly<Record<FontScale, ProfileFontScale>> = { sm: "SMALL", md: "DEFAULT", lg: "LARGE", xl: "EXTRA_LARGE" };

/** Cookie theme value → Profile.theme; `undefined` for anything unknown. */
export function profileThemeFromCookie(value: unknown): ProfileTheme | undefined {
  return typeof value === "string" && Object.hasOwn(THEME_TO_PROFILE, value) ? THEME_TO_PROFILE[value as ThemePreference] : undefined;
}

/** Cookie font-scale value → Profile.fontScale; `undefined` for anything unknown. */
export function profileFontScaleFromCookie(value: unknown): ProfileFontScale | undefined {
  return typeof value === "string" && Object.hasOwn(FONT_TO_PROFILE, value) ? FONT_TO_PROFILE[value as FontScale] : undefined;
}
