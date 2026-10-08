import { describe, expect, it } from "vitest";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/features";
import { getEnv, type EnvSource } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import {
  availableProviderIds,
  enabledProviderIds,
  getProvider,
  isPaymentProviderId,
  listAvailableProviders,
  providersFor,
} from "./registry";

function devEnv(providers: string, extra: EnvSource = {}) {
  return getEnv({ ...process.env, NODE_ENV: "test", PAYMENTS_ENABLED_PROVIDERS: providers, ...extra });
}

const productionEnv = getEnv({
  NODE_ENV: "production",
  APP_URL: "https://learn.example",
  DATABASE_URL: "postgresql://app@db.example:5432/app",
  SESSION_SECRET: "p".repeat(48),
  EMAIL_PROVIDER: "resend",
  RESEND_API_KEY: "re_not_a_real_key",
  EMAIL_FROM: "no-reply@mail.learn.dzidza.test",
  SMS_PROVIDER: "africastalking",
  AFRICASTALKING_USERNAME: "dzidza",
  AFRICASTALKING_API_KEY: "not-a-real-key",
  TRUSTED_PROXY_HOPS: "1",
  PAYMENTS_ENABLED_PROVIDERS: "paynow",
  PAYNOW_INTEGRATION_ID: "1234",
  PAYNOW_INTEGRATION_KEY: "not-a-real-key",
});

function codeOf(fn: () => unknown): string | null {
  try {
    fn();
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : "THREW";
  }
}

describe("provider registry", () => {
  it("returns the sandbox adapter when enabled (name is case/space-insensitive)", () => {
    const env = devEnv("sandbox");
    expect(getProvider("sandbox", { env }).id).toBe("sandbox");
    expect(getProvider(" Sandbox ", { env }).id).toBe("sandbox");
    expect(enabledProviderIds(env)).toEqual(["sandbox"]);
    expect(availableProviderIds(env)).toEqual(["sandbox"]);
    expect(listAvailableProviders({ env }).map((p) => p.id)).toEqual(["sandbox"]);
    expect(providersFor("usd", undefined, { env }).map((p) => p.id)).toEqual(["sandbox"]);
  });

  it("refuses unknown and disabled providers with a client-safe error", () => {
    expect(codeOf(() => getProvider("bitcoin", { env: devEnv("sandbox") }))).toBe("BAD_REQUEST");
    expect(codeOf(() => getProvider("sandbox", { env: devEnv("") }))).toBe("BAD_REQUEST");
    expect(listAvailableProviders({ env: devEnv("") })).toEqual([]);
  });

  it("Paynow and Stripe adapters are available when enabled (and only then); Stripe also needs features.stripe", () => {
    const env = devEnv("sandbox,paynow,stripe", {
      PAYNOW_INTEGRATION_ID: "1",
      PAYNOW_INTEGRATION_KEY: "k",
      STRIPE_SECRET_KEY: "sk_test_x",
      STRIPE_WEBHOOK_SECRET: "whsec_x",
    });
    const stripeOn = { ...DEFAULT_FEATURE_FLAGS, stripe: true };
    expect(enabledProviderIds(env, stripeOn)).toEqual(["sandbox", "paynow", "stripe"]);
    expect(availableProviderIds(env, stripeOn)).toEqual(["sandbox", "paynow", "stripe"]);
    expect(getProvider("paynow", { env }).id).toBe("paynow");
    expect(getProvider("stripe", { env, features: stripeOn }).id).toBe("stripe");
    expect(providersFor("USD", "ecocash", { env, features: stripeOn }).map((p) => p.id)).toEqual(["sandbox", "paynow"]);
    expect(providersFor("ZAR", "card", { env, features: stripeOn }).map((p) => p.id)).toEqual(["sandbox", "stripe"]);
    expect(codeOf(() => getProvider("stripe", { env: devEnv("sandbox"), features: stripeOn }))).toBe("BAD_REQUEST");
  });

  it("never offers or calls Stripe while features.stripe is off (the default), even with its keys configured", () => {
    const env = devEnv("sandbox,paynow,stripe", {
      PAYNOW_INTEGRATION_ID: "1",
      PAYNOW_INTEGRATION_KEY: "k",
      STRIPE_SECRET_KEY: "sk_test_x",
      STRIPE_WEBHOOK_SECRET: "whsec_x",
    });
    for (const features of [undefined, DEFAULT_FEATURE_FLAGS]) {
      expect(enabledProviderIds(env, features)).toEqual(["sandbox", "paynow"]);
      expect(availableProviderIds(env, features)).toEqual(["sandbox", "paynow"]);
      expect(listAvailableProviders({ env, ...(features ? { features } : {}) }).map((p) => p.id)).toEqual(["sandbox", "paynow"]);
      expect(providersFor("ZAR", "card", { env, ...(features ? { features } : {}) }).map((p) => p.id)).toEqual(["sandbox"]);
      expect(codeOf(() => getProvider("stripe", { env, ...(features ? { features } : {}) }))).toBe("BAD_REQUEST");
    }
  });

  it("never offers the sandbox in production", () => {
    expect(() => getEnv({ ...process.env, NODE_ENV: "production", PAYMENTS_ENABLED_PROVIDERS: "sandbox" })).toThrow();
    expect(enabledProviderIds(productionEnv)).toEqual(["paynow"]);
    expect(codeOf(() => getProvider("sandbox", { env: productionEnv }))).toBe("BAD_REQUEST");
  });

  it("isPaymentProviderId", () => {
    expect(isPaymentProviderId("stripe")).toBe(true);
    expect(isPaymentProviderId("Stripe")).toBe(false);
  });
});
