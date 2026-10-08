import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLearner } from "../../../tests/factories/index";

type Stored = { value: string; options?: { maxAge?: number; httpOnly?: boolean } };
const jar = new Map<string, Stored>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)!.value } : undefined),
    set: (name: string, value: string, options?: Stored["options"]) => {
      jar.set(name, { value, ...(options ? { options } : {}) });
    },
  }),
}));

const { attributeSignupFromCookie, clearReferralCookie, readReferralCookie, referralCookieName } = await import("./cookie");
const { getOrCreateReferralCode } = await import("./service");

beforeEach(() => jar.clear());

describe("referral cookie (route layer)", () => {
  it("reads a normalised code and clears it", async () => {
    expect(await readReferralCookie()).toBeNull();
    jar.set(referralCookieName(), { value: "abcd-2345" });
    expect(await readReferralCookie()).toBe("ABCD2345");
    jar.set(referralCookieName(), { value: "../etc" });
    expect(await readReferralCookie()).toBeNull();
    await clearReferralCookie();
    expect(jar.get(referralCookieName())).toEqual({ value: "", options: expect.objectContaining({ maxAge: 0, httpOnly: true }) });
  });

  it("attributes a new account from the cookie once, then forgets the code", async () => {
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const referred = await createLearner();
    expect(await attributeSignupFromCookie(referred.userId, null)).toBeNull();
    jar.set(referralCookieName(), { value: code });
    expect(await attributeSignupFromCookie(referred.userId, "196.4.1.20")).toEqual({ status: "ATTRIBUTED" });
    expect(jar.get(referralCookieName())?.value).toBe("");
  });
});
