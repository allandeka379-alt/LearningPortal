import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createUser } from "../../../tests/factories/index";
import { preferenceCookiesFor, preferenceCookieOptions, preferenceSetCookieHeaders } from "./display-preferences";

describe("display preferences at sign-in (§43)", () => {
  it("maps saved Profile choices to the preference cookies and leaves defaults to the device", () => {
    expect(preferenceCookiesFor({ theme: "DARK", fontScale: "LARGE" })).toEqual([
      { name: "dz_theme", value: "dark" },
      { name: "dz_font_scale", value: "lg" },
    ]);
    expect(preferenceCookiesFor({ theme: "LIGHT", fontScale: "DEFAULT" })).toEqual([{ name: "dz_theme", value: "light" }]);
    expect(preferenceCookiesFor({ theme: "SYSTEM", fontScale: "EXTRA_LARGE" })).toEqual([{ name: "dz_font_scale", value: "xl" }]);
    expect(preferenceCookiesFor({ theme: "SYSTEM", fontScale: "DEFAULT" })).toEqual([]);
    expect(preferenceCookiesFor(null)).toEqual([]);
  });

  it("uses the switchers' cookie flags (readable by the page, lax, one year, secure on https)", () => {
    expect(preferenceCookieOptions(true)).toEqual({ httpOnly: false, secure: true, sameSite: "lax", path: "/", maxAge: 31_536_000 });
    expect(preferenceCookieOptions(false).secure).toBe(false);
  });

  it("builds Set-Cookie headers from the account's profile", async () => {
    const { user } = await createUser({ roles: ["STUDENT"] });
    await db.profile.upsert({ where: { userId: user.id }, create: { userId: user.id, theme: "DARK", fontScale: "SMALL" }, update: { theme: "DARK", fontScale: "SMALL" } });
    const headers = await preferenceSetCookieHeaders(user.id, true);
    expect(headers).toEqual([
      "dz_theme=dark; Path=/; Max-Age=31536000; SameSite=Lax; Secure",
      "dz_font_scale=sm; Path=/; Max-Age=31536000; SameSite=Lax; Secure",
    ]);
    expect(headers.join(";")).not.toMatch(/HttpOnly/i);
  });
});
