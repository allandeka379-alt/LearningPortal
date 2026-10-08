import { describe, expect, it } from "vitest";
import {
  authCookieOptions,
  cookieName,
  isSecureOrigin,
  parseCookieHeader,
  serializeCookie,
  SESSION_COOKIE_NAMES,
  sessionCookieName,
  sessionCookieOptions,
} from "./cookies";

describe("auth cookies", () => {
  it("uses the __Host- prefix only over https", () => {
    expect(isSecureOrigin("https://dzidza.example")).toBe(true);
    expect(isSecureOrigin("http://localhost:3000")).toBe(false);
    expect(sessionCookieName(true)).toBe("__Host-dz_session");
    expect(sessionCookieName(false)).toBe("dz_session");
    expect(cookieName("dz_oauth", true)).toBe("__Host-dz_oauth");
    // Kept in sync with src/proxy.ts.
    expect(SESSION_COOKIE_NAMES).toEqual(["__Host-dz_session", "dz_session"]);
  });

  it("session cookies are HttpOnly, SameSite=Lax, Path=/ and live until the session's expiry", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    const expires = new Date("2026-11-04T10:00:00Z");
    expect(sessionCookieOptions(true, expires, now)).toEqual({
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 3600,
    });
    expect(sessionCookieOptions(false, new Date(now.getTime() - 1000), now).maxAge).toBe(0);
  });

  it("serialises Set-Cookie headers with all attributes", () => {
    expect(serializeCookie("__Host-dz_session", "abc", authCookieOptions(true, 60))).toBe(
      "__Host-dz_session=abc; Path=/; Max-Age=60; HttpOnly; SameSite=Lax; Secure",
    );
    expect(serializeCookie("dz_session", "", authCookieOptions(false, 0))).toBe(
      "dz_session=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax",
    );
  });

  it("parses Cookie headers", () => {
    const cookies = parseCookieHeader('a=1; dz_session=tok%2Den; quoted="x"; broken; =nope');
    expect(cookies.get("a")).toBe("1");
    expect(cookies.get("dz_session")).toBe("tok-en");
    expect(cookies.get("quoted")).toBe("x");
    expect(cookies.has("broken")).toBe(false);
    expect(parseCookieHeader(null).size).toBe(0);
  });
});
