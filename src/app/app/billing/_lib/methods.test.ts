import { describe, expect, it } from "vitest";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/features";
import { paymentsTestEnv } from "@/server/billing/testing";
import { availableCheckoutMethods, methodDefinition, testMethodsAllowed } from "./methods";

describe("availableCheckoutMethods", () => {
  it("offers Paynow mobile methods (with a phone), the Paynow page and, outside production, the sandbox; never Stripe while it is off", () => {
    for (const methods of [
      availableCheckoutMethods(["USD"], { env: paymentsTestEnv() }),
      availableCheckoutMethods(["USD"], { env: paymentsTestEnv(), features: DEFAULT_FEATURE_FLAGS }),
    ]) {
      expect(methods.map((method) => [method.id, method.needsPhone, method.test])).toEqual([
        ["paynow_ecocash", true, false],
        ["paynow_onemoney", true, false],
        ["paynow_innbucks", true, false],
        ["paynow_web", false, false],
        ["sandbox_web", false, true],
        ["sandbox_ecocash", true, true],
      ]);
      expect(methods.every((method) => method.currencies.includes("USD"))).toBe(true);
    }
  });

  it("offers the dormant Stripe card method only while features.stripe is on", () => {
    const methods = availableCheckoutMethods(["USD"], { env: paymentsTestEnv(), features: { ...DEFAULT_FEATURE_FLAGS, stripe: true } });
    expect(methods.map((method) => method.id)).toContain("stripe_card");
  });

  it("only offers methods whose provider is enabled", () => {
    const methods = availableCheckoutMethods(["USD"], { env: paymentsTestEnv({ PAYMENTS_ENABLED_PROVIDERS: "sandbox" }) });
    expect(methods.map((method) => method.id)).toEqual(["sandbox_web", "sandbox_ecocash"]);
    expect(availableCheckoutMethods(["USD"], { env: paymentsTestEnv({ PAYMENTS_ENABLED_PROVIDERS: "" }) })).toEqual([]);
  });

  it("drops methods that cannot take any of the offered currencies", () => {
    const methods = availableCheckoutMethods(["XTS"], { env: paymentsTestEnv() });
    expect(methods.map((method) => method.id)).toEqual(["sandbox_web", "sandbox_ecocash"]);
  });
});

describe("methodDefinition / testMethodsAllowed", () => {
  it("maps method ids to providers and Paynow mobile methods; unknown ids are undefined", () => {
    expect(methodDefinition("paynow_onemoney")).toMatchObject({ provider: "paynow", paynowMethod: "onemoney", needsPhone: true });
    expect(methodDefinition("paynow_innbucks")).toMatchObject({ provider: "paynow", paynowMethod: "innbucks", needsPhone: true });
    expect(methodDefinition("stripe_card")).toMatchObject({ provider: "stripe", paynowMethod: null, needsPhone: false });
    expect(methodDefinition("sandbox_web")?.test).toBe(true);
    expect(methodDefinition("bitcoin")).toBeUndefined();
  });

  it("never allows test methods in production", () => {
    expect(testMethodsAllowed({ NODE_ENV: "production" })).toBe(false);
    expect(testMethodsAllowed({ NODE_ENV: "development" })).toBe(true);
    expect(testMethodsAllowed({ NODE_ENV: "test" })).toBe(true);
  });
});
