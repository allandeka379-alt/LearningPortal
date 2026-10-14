import { randomInt } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

// Stripe is dormant (owner decision 2026-10-07): `features.stripe` stays off, as by default.
const testSettings = vi.hoisted(() => ({
  features: { ai: false, whatsapp: false, email: false, sms: false, stripe: false },
  rateLimits: { webhookReceipt: { limit: 3, windowSeconds: 60 } },
}));
vi.mock("@/server/lib/settings", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/server/lib/settings")>();
  const base = (await import("../../../../../../tests/support/feature-flags")).settingsWithFeatureFlags(actual, testSettings.features);
  return {
    ...base,
    getKnownSetting: ((key) => (key === "rateLimits" ? Promise.resolve(testSettings.rateLimits) : base.getKnownSetting(key))) as typeof actual.getKnownSetting,
  };
});

function post(provider: string, body: string, ip?: string): [Request, { params: Promise<{ provider: string }> }] {
  const request = new Request(`http://localhost:3000/api/webhooks/payments/${provider}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", ...(ip ? { "x-forwarded-for": ip } : {}) },
    body,
  });
  return [request, { params: Promise.resolve({ provider }) }];
}

const randomIp = () => `10.${randomInt(0, 256)}.${randomInt(0, 256)}.${randomInt(1, 255)}`;

describe("POST /api/webhooks/payments/[provider]", () => {
  it("answers unknown providers with a bare 404 JSON body (no internals) and a request id", async () => {
    const response = await POST(...post("bitcoin", "status=Paid", randomIp()));
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ received: false, error: "not_found" });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBeTruthy();
  });

  it("limits deliveries per client IP before reading the body or checking any signature (429 + Retry-After)", async () => {
    const ip = randomIp();
    const limit = testSettings.rateLimits.webhookReceipt.limit;
    for (let i = 0; i < limit; i += 1) expect((await POST(...post("bitcoin", "status=Paid", ip))).status).toBe(404);
    for (const provider of ["bitcoin", "paynow", "sandbox"]) {
      const limited = await POST(...post(provider, "status=Paid", ip));
      expect(limited.status, provider).toBe(429);
      expect(Number(limited.headers.get("retry-after"))).toBeGreaterThan(0);
      expect(await limited.json()).toEqual({ received: false, error: "rate_limited" });
    }
    // Another IP is unaffected.
    expect((await POST(...post("bitcoin", "status=Paid", randomIp()))).status).toBe(404);
  });

  it("answers 404 to Stripe while features.stripe is off, exactly like an unknown provider", async () => {
    const [request, context] = post("stripe", JSON.stringify({ id: "evt_1", type: "checkout.session.completed" }), randomIp());
    request.headers.set("stripe-signature", "t=1,v1=deadbeef");
    const response = await POST(request, context);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ received: false, error: "not_found" });
  });
});
