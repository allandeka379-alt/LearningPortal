/**
 * Display preferences (theme + font scale, §43) shared by the root layout (server) and the preference switchers
 * (client). Stored in plain, non-httpOnly cookies: they are not sensitive, and the client must be able to update
 * them without a round trip. The root layout reads them to render `data-theme` / `data-font-scale` on <html>
 * server-side, which avoids a flash of the wrong theme or text size.
 */

export const THEME_COOKIE = "dz_theme";
export const FONT_SCALE_COOKIE = "dz_font_scale";

/** One year: preferences should outlive sessions. */
export const PREFERENCE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const THEME_PREFERENCES = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export const DEFAULT_THEME: ThemePreference = "system";

export const FONT_SCALES = ["sm", "md", "lg", "xl"] as const;
export type FontScale = (typeof FONT_SCALES)[number];
export const DEFAULT_FONT_SCALE: FontScale = "md";

export const THEME_LABELS: Readonly<Record<ThemePreference, string>> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export const FONT_SCALE_LABELS: Readonly<Record<FontScale, string>> = {
  sm: "Small",
  md: "Default",
  lg: "Large",
  xl: "Extra large",
};

/**
 * Browser chrome colours for `<meta name="theme-color">`. Must match `--color-bg` in globals.css
 * (granite-50 / granite-950).
 */
export const THEME_COLORS = { light: "#f8f6f3", dark: "#1c1a17" } as const;

/** Parses an untrusted cookie value; anything unknown falls back to the default ("system"). */
export function parseThemePreference(value: string | null | undefined): ThemePreference {
  return (THEME_PREFERENCES as readonly string[]).includes(value ?? "") ? (value as ThemePreference) : DEFAULT_THEME;
}

/** Parses an untrusted cookie value; anything unknown falls back to the default ("md"). */
export function parseFontScale(value: string | null | undefined): FontScale {
  return (FONT_SCALES as readonly string[]).includes(value ?? "") ? (value as FontScale) : DEFAULT_FONT_SCALE;
}

/**
 * Serialises a preference cookie for `document.cookie`. `SameSite=Lax` and path `/` so every area sees it;
 * `Secure` is added on HTTPS origins only, so the cookie still works on http://localhost during development.
 */
export function serializePreferenceCookie(name: string, value: string, secure: boolean): string {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${PREFERENCE_COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}
