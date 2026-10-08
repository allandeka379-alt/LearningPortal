import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLearner } from "../../../../tests/factories/index";

const getActor = vi.fn();
vi.mock("@/server/auth/actor", () => ({ getActor: () => getActor() }));

const { GET } = await import("./route");
const { getOrCreateReferralCode } = await import("@/server/referrals/service");

function landing(code: string) {
  const ip = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  return GET(new NextRequest(`http://localhost:3000/r/${encodeURIComponent(code)}`, { headers: { "x-forwarded-for": ip } }), { params: Promise.resolve({ code }) });
}

beforeEach(() => {
  getActor.mockReset();
  getActor.mockResolvedValue(null);
});

describe("GET /r/[code] (§46 referral landing)", () => {
  it("remembers an active code in a short-lived httpOnly cookie and goes to sign-up", async () => {
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const response = await landing(code.toLowerCase());
    expect(response.status).toBe(303);
    expect(new URL(response.headers.get("location")!).pathname).toBe("/register");
    expect(response.headers.get("cache-control")).toBe("no-store");
    const cookie = response.headers.get("set-cookie") ?? "";
    expect(cookie).toContain(`dz_ref=${code}`);
    expect(cookie.toLowerCase()).toContain("httponly");
    expect(cookie.toLowerCase()).toContain("samesite=lax");
    expect(cookie).toContain("Max-Age=604800");
  });

  it("sets nothing for unknown or malformed codes but still reaches sign-up", async () => {
    for (const code of ["ZZZZ2222ZZZZ", "no/../way", "x"]) {
      const response = await landing(code);
      expect(new URL(response.headers.get("location")!).pathname).toBe("/register");
      expect(response.headers.get("set-cookie")).toBeNull();
    }
  });

  it("sends signed-in users home without attaching a code", async () => {
    getActor.mockResolvedValue({ roles: ["STUDENT"], studentOnboardingCompleted: true });
    const response = await landing("ABCD2345");
    expect(new URL(response.headers.get("location")!).pathname).toBe("/app");
    expect(response.headers.get("set-cookie")).toBeNull();
  });
});
