import { describe, expect, it } from "vitest";
import { DEFAULT_FEATURE_FLAGS, FEATURE_LABELS, FEATURE_NAMES, toFeatureFlags } from "./features";

describe("feature flags (owner decision 2026-10-07)", () => {
  it("names exactly the five switchable services, all off by default", () => {
    expect([...FEATURE_NAMES]).toEqual(["ai", "whatsapp", "email", "sms", "stripe"]);
    expect(DEFAULT_FEATURE_FLAGS).toEqual({ ai: false, whatsapp: false, email: false, sms: false, stripe: false });
    expect(Object.isFrozen(DEFAULT_FEATURE_FLAGS)).toBe(true);
  });

  it("labels and describes every flag for the admin editor", () => {
    for (const name of FEATURE_NAMES) {
      expect(FEATURE_LABELS[name].label, name).toMatch(/\S/);
      expect(FEATURE_LABELS[name].description, name).toMatch(/\S/);
    }
  });

  it("describes email as optional email only, and never says accounts use SMS", () => {
    expect(FEATURE_LABELS.email.description).toMatch(/Account email .* is always sent/);
    for (const name of FEATURE_NAMES) expect(FEATURE_LABELS[name].description, name).not.toMatch(/accounts use SMS/i);
    expect(FEATURE_LABELS.sms.description).toMatch(/sign-in and password resets use email/);
  });

  it("fails closed: only a literal true switches a flag on", () => {
    expect(toFeatureFlags({ ai: true, whatsapp: true, email: true, sms: true, stripe: true })).toEqual({
      ai: true,
      whatsapp: true,
      email: true,
      sms: true,
      stripe: true,
    });
    expect(toFeatureFlags({ ai: "true", whatsapp: 1, email: "yes", sms: "on", stripe: {} })).toEqual(DEFAULT_FEATURE_FLAGS);
    expect(toFeatureFlags({ ai: true })).toEqual({ ...DEFAULT_FEATURE_FLAGS, ai: true });
    for (const value of [null, undefined, true, "on", 42, []]) expect(toFeatureFlags(value), String(value)).toEqual(DEFAULT_FEATURE_FLAGS);
  });

  it("reads a stored row written before the sms flag existed as sms off", () => {
    expect(toFeatureFlags({ ai: false, whatsapp: false, email: false, stripe: false })).toEqual(DEFAULT_FEATURE_FLAGS);
    expect(toFeatureFlags({ ai: false, whatsapp: false, email: true, stripe: false }).sms).toBe(false);
  });

  it("drops unknown keys", () => {
    expect(Object.keys(toFeatureFlags({ ai: true, fax: true }))).toEqual(["ai", "whatsapp", "email", "sms", "stripe"]);
  });
});
