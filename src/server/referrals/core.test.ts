import { describe, expect, it } from "vitest";
import {
  DEFAULT_REFERRAL_RULES,
  REFERRAL_CODE_ALPHABET,
  decideAttribution,
  decideQualification,
  formatReferralCode,
  generateReferralCode,
  normalizeReferralCode,
  referralLink,
  referralRulesSchema,
  referralStatusLabel,
  rewardWindow,
  type QualificationFacts,
} from "./core";

describe("codes", () => {
  it("generates unambiguous upper-case codes from the injected random source", () => {
    let i = 0;
    const code = generateReferralCode(() => i++ % REFERRAL_CODE_ALPHABET.length);
    expect(code).toBe("ABCDEFGH");
    expect(code).toMatch(/^[A-Z0-9]{8}$/);
    expect(generateReferralCode(() => REFERRAL_CODE_ALPHABET.length - 1, 4)).toBe("9999");
    expect(() => generateReferralCode(() => 99)).toThrow(RangeError);
    expect(() => generateReferralCode(() => 0, 3)).toThrow(RangeError);
    expect(REFERRAL_CODE_ALPHABET).not.toMatch(/[01ILO]/);
  });

  it("normalises typed codes and rejects junk", () => {
    expect(normalizeReferralCode(" abcd-efgh ")).toBe("ABCDEFGH");
    expect(normalizeReferralCode("ab cd ef")).toBe("ABCDEF");
    expect(normalizeReferralCode("abc")).toBeNull();
    expect(normalizeReferralCode("abcd/../x")).toBeNull();
    expect(normalizeReferralCode(42)).toBeNull();
    expect(normalizeReferralCode("A".repeat(33))).toBeNull();
  });

  it("formats codes and links", () => {
    expect(formatReferralCode("ABCDEFGH")).toBe("ABCD-EFGH");
    expect(formatReferralCode("ABCDEF")).toBe("ABCD-EF");
    expect(referralLink("https://example.test/", "ABCDEFGH")).toBe("https://example.test/r/ABCDEFGH");
  });
});

describe("rules", () => {
  it("fills missing keys with defaults and validates bounds", () => {
    expect(DEFAULT_REFERRAL_RULES).toMatchObject({
      enabled: true,
      qualifyOn: "PAYMENT",
      activeDaysRequired: 3,
      reward: { planCode: "FULL_ACCESS", days: 7 },
      refereeReward: null,
    });
    expect(referralRulesSchema.parse({ activeDaysRequired: 5 }).activeDaysRequired).toBe(5);
    expect(referralRulesSchema.safeParse({ reward: { planCode: "student", days: 7 } }).success).toBe(false);
    expect(referralRulesSchema.safeParse({ reward: { planCode: "STUDENT", days: 0 } }).success).toBe(false);
  });
});

describe("decideAttribution", () => {
  const base = {
    rules: DEFAULT_REFERRAL_RULES,
    referrerUserId: "a",
    referredUserId: "b",
    codeActive: true,
    accountCreatedAt: new Date("2026-10-05T10:00:00Z"),
    alreadyReferred: false,
    now: new Date("2026-10-05T10:05:00Z"),
  };

  it("attributes a fresh account to an active code", () => {
    expect(decideAttribution(base)).toEqual({ attribute: true });
  });

  it("refuses self-referral, inactive codes, repeats and old accounts", () => {
    expect(decideAttribution({ ...base, referredUserId: "a" })).toEqual({ attribute: false, reason: "self_referral" });
    expect(decideAttribution({ ...base, codeActive: false })).toEqual({ attribute: false, reason: "code_inactive" });
    expect(decideAttribution({ ...base, alreadyReferred: true })).toEqual({ attribute: false, reason: "already_referred" });
    expect(decideAttribution({ ...base, now: new Date("2026-10-13T10:00:00Z") })).toEqual({ attribute: false, reason: "account_too_old" });
    expect(decideAttribution({ ...base, rules: { ...DEFAULT_REFERRAL_RULES, enabled: false } })).toEqual({ attribute: false, reason: "disabled" });
  });
});

describe("decideQualification", () => {
  const facts: QualificationFacts = {
    phoneVerified: true,
    sharedIdentity: false,
    onboardingCompleted: true,
    activeDays: 1,
    payment: null,
    referrerPayerFingerprints: [],
    referralAgeDays: 2,
    referrerRewardsLast30Days: 0,
  };
  // Both qualifying events, so the activity rule is exercised (the default is PAYMENT only).
  const BOTH = { ...DEFAULT_REFERRAL_RULES, qualifyOn: "ACTIVITY_OR_PAYMENT" as const };

  it("by default qualifies only on a payment: activity needs a verified phone, which email sign-in never gives", () => {
    expect(decideQualification(DEFAULT_REFERRAL_RULES, "ref", { ...facts, activeDays: 30, phoneVerified: false })).toEqual({ outcome: "WAIT" });
    const payment = { id: "pay1", payerUserId: "friend", payerFingerprint: null };
    expect(decideQualification(DEFAULT_REFERRAL_RULES, "ref", { ...facts, phoneVerified: false, payment })).toMatchObject({ outcome: "QUALIFY", via: "PAYMENT" });
  });

  it("waits until the activity rule is met", () => {
    expect(decideQualification(BOTH, "ref", facts)).toEqual({ outcome: "WAIT" });
    expect(decideQualification(BOTH, "ref", { ...facts, activeDays: 3 })).toEqual({ outcome: "QUALIFY", via: "ACTIVITY", paymentId: null });
  });

  it("needs onboarding and a verified phone for the activity rule", () => {
    expect(decideQualification(BOTH, "ref", { ...facts, activeDays: 5, onboardingCompleted: false })).toEqual({ outcome: "WAIT" });
    expect(decideQualification(BOTH, "ref", { ...facts, activeDays: 5, phoneVerified: false })).toEqual({ outcome: "WAIT" });
  });

  it("PAY-4: a verified email alone never qualifies on activity (one inbox makes unlimited +tag accounts)", () => {
    // Email-only sock puppets: onboarding done, 3+ active days, no verified phone -> no reward via activity.
    expect(decideQualification(BOTH, "ref", { ...facts, activeDays: 30, phoneVerified: false })).toEqual({ outcome: "WAIT" });
    // A real payment still qualifies without a phone.
    const payment = { id: "pay1", payerUserId: "parent", payerFingerprint: null };
    expect(decideQualification(BOTH, "ref", { ...facts, phoneVerified: false, payment })).toMatchObject({ outcome: "QUALIFY", via: "PAYMENT" });
  });

  it("PAY-4: rejects an invitee sharing the referrer's or an earlier rewarded invitee's mailbox", () => {
    for (const variant of [{ ...facts, activeDays: 3 }, { ...facts, payment: { id: "p", payerUserId: "x", payerFingerprint: null } }, facts]) {
      expect(decideQualification(BOTH, "ref", { ...variant, sharedIdentity: true })).toEqual({ outcome: "REJECT", reason: "duplicate_identity" });
    }
  });

  it("qualifies on a first successful payment unless the referrer paid", () => {
    const payment = { id: "pay1", payerUserId: "parent", payerFingerprint: "f1" };
    expect(decideQualification(BOTH, "ref", { ...facts, payment })).toEqual({ outcome: "QUALIFY", via: "PAYMENT", paymentId: "pay1" });
    expect(decideQualification(BOTH, "ref", { ...facts, payment: { ...payment, payerUserId: "ref" } })).toEqual({
      outcome: "REJECT",
      reason: "duplicate_payer",
    });
    expect(decideQualification(BOTH, "ref", { ...facts, payment, referrerPayerFingerprints: ["f1"] })).toEqual({
      outcome: "REJECT",
      reason: "duplicate_payer",
    });
  });

  it("follows the configured qualifying event", () => {
    const payment = { id: "pay1", payerUserId: "b", payerFingerprint: null };
    const paymentOnly = { ...DEFAULT_REFERRAL_RULES, qualifyOn: "PAYMENT" as const };
    expect(decideQualification(paymentOnly, "ref", { ...facts, activeDays: 10 })).toEqual({ outcome: "WAIT" });
    expect(decideQualification(paymentOnly, "ref", { ...facts, payment })).toMatchObject({ outcome: "QUALIFY", via: "PAYMENT" });
    const activityOnly = { ...DEFAULT_REFERRAL_RULES, qualifyOn: "ACTIVITY" as const };
    expect(decideQualification(activityOnly, "ref", { ...facts, payment })).toEqual({ outcome: "WAIT" });
  });

  it("applies the per-referrer cap and expires stale referrals", () => {
    expect(decideQualification(BOTH, "ref", { ...facts, activeDays: 3, referrerRewardsLast30Days: 10 })).toEqual({
      outcome: "REJECT",
      reason: "cap_reached",
    });
    expect(decideQualification(BOTH, "ref", { ...facts, referralAgeDays: 91 })).toEqual({ outcome: "REJECT", reason: "expired" });
  });

  it("waits (never rejects) while the programme is switched off, whatever the facts", () => {
    const off = { ...DEFAULT_REFERRAL_RULES, enabled: false };
    const payment = { id: "pay", payerUserId: "ref", payerFingerprint: null };
    for (const variant of [facts, { ...facts, activeDays: 3 }, { ...facts, referralAgeDays: 500 }, { ...facts, payment }, { ...facts, activeDays: 3, referrerRewardsLast30Days: 99 }]) {
      expect(decideQualification(off, "ref", variant)).toEqual({ outcome: "WAIT" });
    }
  });
});

describe("helpers", () => {
  it("computes reward windows and status labels without private data", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    expect(rewardWindow(now, 7)).toEqual({ startsAt: now, endsAt: new Date("2026-10-12T10:00:00Z") });
    expect(referralStatusLabel("PENDING", null)).toBe("Joined — not qualified yet");
    expect(referralStatusLabel("REWARDED", null)).toBe("Reward added");
    expect(referralStatusLabel("REJECTED", "expired")).toBe("Didn't qualify in time");
    expect(referralStatusLabel("REJECTED", "duplicate_payer")).toBe("Not eligible");
  });
});
