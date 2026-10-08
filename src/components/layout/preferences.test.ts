import { describe, expect, it } from "vitest";
import {
  PREFERENCE_COOKIE_MAX_AGE_SECONDS,
  THEME_COOKIE,
  parseFontScale,
  parseThemePreference,
  serializePreferenceCookie,
} from "./preferences";

describe("parseThemePreference", () => {
  it("accepts known values", () => {
    expect(parseThemePreference("light")).toBe("light");
    expect(parseThemePreference("dark")).toBe("dark");
    expect(parseThemePreference("system")).toBe("system");
  });

  it("falls back to system for missing or tampered values", () => {
    expect(parseThemePreference(undefined)).toBe("system");
    expect(parseThemePreference(null)).toBe("system");
    expect(parseThemePreference("")).toBe("system");
    expect(parseThemePreference("DARK")).toBe("system");
    expect(parseThemePreference('dark" onload="x')).toBe("system");
  });
});

describe("parseFontScale", () => {
  it("accepts known values", () => {
    for (const scale of ["sm", "md", "lg", "xl"]) expect(parseFontScale(scale)).toBe(scale);
  });

  it("falls back to md for anything else", () => {
    expect(parseFontScale(undefined)).toBe("md");
    expect(parseFontScale("xxl")).toBe("md");
  });
});

describe("serializePreferenceCookie", () => {
  it("builds a lax, site-wide, long-lived cookie", () => {
    expect(serializePreferenceCookie(THEME_COOKIE, "dark", false)).toBe(
      `dz_theme=dark; Path=/; Max-Age=${PREFERENCE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`,
    );
  });

  it("adds Secure on https origins and encodes the value", () => {
    const cookie = serializePreferenceCookie(THEME_COOKIE, "a b", true);
    expect(cookie.startsWith("dz_theme=a%20b;")).toBe(true);
    expect(cookie.endsWith("; Secure")).toBe(true);
  });
});
