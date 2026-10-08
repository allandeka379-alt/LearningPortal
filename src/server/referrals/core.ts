/**
 * Referral codes and rewards (§46 "referral codes, referral rewards"; ARCHITECTURE §7.6). Pure core: no DB, no I/O.
 *
 * Lifecycle (Referral.status): PENDING at sign-up with a code → QUALIFIED when the referred user does something real
 * (default: verified a phone number, finished onboarding and studied on 3 different days, OR made a first successful
 * payment) → REWARDED once the reward grant(s) are issued. REJECTED for abuse (duplicate payer, the referrer's own or an
 * earlier invitee's mailbox, per-referrer cap, sign-up bursts from one network) or when nothing happened within the
 * qualifying window. Self-referrals never create a row at all.
 *
 * Every rule is configurable in Setting `referrals.rules` ({@link referralRulesSchema}); missing keys use
 * {@link DEFAULT_REFERRAL_RULES}. Rewards are EntitlementGrants (source REFERRAL) of a plan for N days — never cash.
 */
import { z } from "zod";

/** Setting key holding the rules (admin-editable JSON). */
export const REFERRAL_RULES_SETTING_KEY = "referrals.rules";

/** Unambiguous upper-case alphabet (no 0/O, 1/I/L) so codes survive being read aloud or typed from a screenshot. */
export const REFERRAL_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const REFERRAL_CODE_LENGTH = 8;
/** ReferralCode_code_chk. */
const CODE_PATTERN = /^[A-Z0-9]{4,32}$/;

/** Generates a code from an injected uniform random integer source (`crypto.randomInt` in the service). */
export function generateReferralCode(randomInt: (maxExclusive: number) => number, length: number = REFERRAL_CODE_LENGTH): string {
  if (!Number.isInteger(length) || length < 4 || length > 32) throw new RangeError("referral code length must be 4-32");
  let code = "";
  for (let i = 0; i < length; i += 1) {
    const index = randomInt(REFERRAL_CODE_ALPHABET.length);
    const char = REFERRAL_CODE_ALPHABET[index];
    if (char === undefined) throw new RangeError("randomInt returned an index outside the alphabet");
    code += char;
  }
  return code;
}

/** Upper-cases and strips spaces / dashes; null when the result is not a possible code. */
export function normalizeReferralCode(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const code = input.trim().toUpperCase().replace(/[\s-]+/g, "");
  return CODE_PATTERN.test(code) ? code : null;
}

/** "ABCD-EFGH" for display (groups of four). */
export function formatReferralCode(code: string): string {
  return code.match(/.{1,4}/g)?.join("-") ?? code;
}

/** Invite link shared by the student. */
export function referralLink(appUrl: string, code: string): string {
  return `${appUrl.replace(/\/+$/, "")}/r/${encodeURIComponent(code)}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------------------------------------------------

const planCode = z.string().regex(/^[A-Z][A-Z0-9_]{1,31}$/);
const rewardSchema = z.object({ planCode, days: z.number().int().min(1).max(90) });

export const referralRulesSchema = z.object({
  enabled: z.boolean().default(true),
  /**
   * What qualifies a referral. PAYMENT by default: the ACTIVITY rule needs a verified phone (PAY-4), and no phone is
   * verified while sign-in is email-based and SMS is off (owner decision 2026-10-07), so the friend buying Full access is
   * the only check that holds.
   */
  qualifyOn: z.enum(["ACTIVITY_OR_PAYMENT", "ACTIVITY", "PAYMENT"]).default("PAYMENT"),
  /** Distinct days with recorded study activity after sign-up (ACTIVITY rule; onboarding must be complete too). */
  activeDaysRequired: z.number().int().min(1).max(60).default(3),
  /** A code only attributes accounts created at most this many days earlier (the landing cookie lives 7 days). */
  attributionWindowDays: z.number().int().min(1).max(30).default(7),
  /** PENDING referrals that never qualify are closed (REJECTED "expired") after this many days. */
  qualifyWithinDays: z.number().int().min(7).max(365).default(90),
  /** Reward for the referrer (and optionally the new student): a week of Full access (the one paid plan since 2026-10-07). */
  reward: rewardSchema.default({ planCode: "FULL_ACCESS", days: 7 }),
  refereeReward: rewardSchema.nullable().default(null),
  /** Rewards one referrer may earn per rolling 30 days; further qualifying referrals are REJECTED "cap_reached". */
  maxRewardsPer30Days: z.number().int().min(0).max(1000).default(10),
  /** Sign-ups from one network for one referrer per day before further ones are REJECTED "signup_burst". */
  maxSignupsPerIpPerDay: z.number().int().min(1).max(100).default(3),
});

export type ReferralRules = z.output<typeof referralRulesSchema>;

export const DEFAULT_REFERRAL_RULES: ReferralRules = Object.freeze(referralRulesSchema.parse({})) as ReferralRules;

// ---------------------------------------------------------------------------------------------------------------------
// Decisions
// ---------------------------------------------------------------------------------------------------------------------

export type AttributionDecision = { attribute: true } | { attribute: false; reason: "disabled" | "self_referral" | "code_inactive" | "account_too_old" | "already_referred" };

/** Whether a sign-up with a code should create a Referral row (pure). */
export function decideAttribution(input: {
  rules: Pick<ReferralRules, "enabled" | "attributionWindowDays">;
  referrerUserId: string;
  referredUserId: string;
  codeActive: boolean;
  accountCreatedAt: Date;
  alreadyReferred: boolean;
  now: Date;
}): AttributionDecision {
  if (!input.rules.enabled) return { attribute: false, reason: "disabled" };
  if (input.referrerUserId === input.referredUserId) return { attribute: false, reason: "self_referral" };
  if (!input.codeActive) return { attribute: false, reason: "code_inactive" };
  if (input.alreadyReferred) return { attribute: false, reason: "already_referred" };
  const ageMs = input.now.getTime() - input.accountCreatedAt.getTime();
  if (ageMs > input.rules.attributionWindowDays * 86_400_000) return { attribute: false, reason: "account_too_old" };
  return { attribute: true };
}

export interface QualificationFacts {
  /**
   * The referred user has a verified phone number (ACTIVITY rule). Phone numbers are unique per account and confirmed
   * by an SMS code, so every extra account needs its own SIM; a verified EMAIL is not enough, because one inbox yields
   * unlimited verifiable `name+N@` addresses (PAY-4).
   */
  phoneVerified: boolean;
  /**
   * The referred user's mailbox (email with `+tag` / Gmail dots removed) is the referrer's own, or that of an invitee of
   * this referrer who already qualified: the same person behind several accounts (PAY-4).
   */
  sharedIdentity: boolean;
  onboardingCompleted: boolean;
  /** Distinct local days with recorded activity since sign-up. */
  activeDays: number;
  /** First SUCCESSFUL payment by or for the referred user, if any. */
  payment: { id: string; payerUserId: string; payerFingerprint: string | null } | null;
  /** Payer fingerprints of the referrer's own successful payments (duplicate-payer check). */
  referrerPayerFingerprints: readonly string[];
  /** Days since the referral was created. */
  referralAgeDays: number;
  /** REWARDED referrals of this referrer in the last 30 days. */
  referrerRewardsLast30Days: number;
}

export type QualificationDecision =
  | { outcome: "WAIT" }
  | { outcome: "QUALIFY"; via: "ACTIVITY" | "PAYMENT"; paymentId: string | null }
  | { outcome: "REJECT"; reason: "duplicate_payer" | "duplicate_identity" | "cap_reached" | "expired" };

/**
 * Decides what to do with a PENDING referral (pure). While the programme is switched off (`rules.enabled` false) the
 * answer is always WAIT: pausing the programme never rejects anyone for good, and the referral qualifies under the
 * normal rules once it is switched back on (product decision). Otherwise, in order: a payment by the referrer
 * themself or from one of the referrer's own wallets, and an account on the referrer's own (or an already qualified
 * invitee's) mailbox, are rejected outright (reward farming); then the configured qualifying event — activity needs a
 * verified PHONE, not just an email (PAY-4); then the per-referrer cap; finally referrals with nothing after
 * `qualifyWithinDays` expire.
 */
export function decideQualification(rules: ReferralRules, referrerUserId: string, facts: QualificationFacts): QualificationDecision {
  if (!rules.enabled) return { outcome: "WAIT" };
  const payment = facts.payment;
  const paymentAllowed = rules.qualifyOn !== "ACTIVITY";
  const activityAllowed = rules.qualifyOn !== "PAYMENT";

  if (payment && paymentAllowed) {
    const fingerprint = payment.payerFingerprint;
    if (payment.payerUserId === referrerUserId || (fingerprint !== null && facts.referrerPayerFingerprints.includes(fingerprint))) {
      return { outcome: "REJECT", reason: "duplicate_payer" };
    }
  }
  if (facts.sharedIdentity) return { outcome: "REJECT", reason: "duplicate_identity" };

  let qualified: Extract<QualificationDecision, { outcome: "QUALIFY" }> | null = null;
  if (payment && paymentAllowed) qualified = { outcome: "QUALIFY", via: "PAYMENT", paymentId: payment.id };
  else if (activityAllowed && facts.phoneVerified && facts.onboardingCompleted && facts.activeDays >= rules.activeDaysRequired) {
    qualified = { outcome: "QUALIFY", via: "ACTIVITY", paymentId: null };
  }

  if (qualified) {
    if (facts.referrerRewardsLast30Days >= rules.maxRewardsPer30Days) return { outcome: "REJECT", reason: "cap_reached" };
    return qualified;
  }
  if (facts.referralAgeDays > rules.qualifyWithinDays) return { outcome: "REJECT", reason: "expired" };
  return { outcome: "WAIT" };
}

/** Grant window of a reward: from `now` for `days` days. */
export function rewardWindow(now: Date, days: number): { startsAt: Date; endsAt: Date } {
  return { startsAt: now, endsAt: new Date(now.getTime() + days * 86_400_000) };
}

/** What the referrer sees about one referral: a status only — never the referred student's name or activity. */
export function referralStatusLabel(status: "PENDING" | "QUALIFIED" | "REWARDED" | "REJECTED", rejectReason: string | null): string {
  switch (status) {
    case "PENDING":
      return "Joined — not qualified yet";
    case "QUALIFIED":
      return "Qualified — reward on its way";
    case "REWARDED":
      return "Reward added";
    case "REJECTED":
      return rejectReason === "expired" ? "Didn't qualify in time" : "Not eligible";
  }
}
