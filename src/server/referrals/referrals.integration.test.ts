import { describe, expect, it } from "vitest";
import { dateColumnFromLocalDate, localDateString, addDays } from "@/lib/dates";
import { createPaidPlan, createPendingPayment } from "@/server/billing/testing";
import { db } from "@/server/db";
import { createLearner, createLearningSetup, uniquePhone, uniqueSuffix } from "../../../tests/factories/index";
import { DEFAULT_REFERRAL_RULES, type ReferralRules } from "./core";
import { getInviteView, getOrCreateReferralCode, isActiveReferralCode, qualifyReferral, recordReferralSignup, sweepReferrals } from "./service";

/** Rules rewarding with a test-only plan (the shared test database may not have a STUDENT plan). */
async function testRules(overrides: Partial<ReferralRules> = {}): Promise<{ rules: ReferralRules; planId: string }> {
  const { plan } = await createPaidPlan();
  // Both qualifying events (the default is PAYMENT only), so the activity rule and its PAY-4 checks are exercised too.
  return { rules: { ...DEFAULT_REFERRAL_RULES, qualifyOn: "ACTIVITY_OR_PAYMENT", reward: { planCode: plan.code, days: 7 }, ...overrides }, planId: plan.id };
}

/**
 * A referred student who finished onboarding and verified their email and (unless `phone: false`) a phone number.
 * `email` replaces the generated address (abuse scenarios).
 */
async function onboardedStudent(options: { email?: string; phone?: boolean } = {}) {
  const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, lessonsPerTopic: 0, gradeScheme: false });
  const learner = await createLearner();
  const now = new Date();
  await db.user.update({
    where: { id: learner.userId },
    data: {
      emailVerifiedAt: now,
      ...(options.email ? { emailNormalized: options.email } : {}),
      ...(options.phone === false ? {} : { phoneE164: uniquePhone(), phoneVerifiedAt: now }),
    },
  });
  await db.student.update({
    where: { userId: learner.userId },
    data: {
      countryId: setup.chain.country.id,
      examBoardId: setup.chain.examBoard.id,
      qualificationId: setup.chain.qualification.id,
      onboardingStep: "COMPLETED",
      onboardingCompletedAt: now,
    },
  });
  return learner;
}

/** Pretends the referral was made `days` days ago (activity only counts from the sign-up day). */
async function backdateReferral(referredUserId: string, days: number) {
  await db.referral.update({ where: { referredUserId }, data: { createdAt: new Date(Date.now() - days * 86_400_000) } });
}

async function activeDay(userId: string, daysAgo: number) {
  const date = addDays(localDateString(new Date(), "Africa/Harare"), -daysAgo);
  await db.dailyActivity.create({ data: { userId, date: dateColumnFromLocalDate(date), questionsAttempted: 3, firstActivityAt: new Date() } });
}

async function successfulPayment(payerUserId: string, beneficiaryUserId: string, fingerprint: string | null) {
  const { plan, price } = await createPaidPlan();
  const { payment } = await createPendingPayment({ provider: "sandbox", payerUserId, beneficiaryUserId, planId: plan.id, planPriceId: price.id });
  await db.payment.update({ where: { id: payment.id }, data: { status: "SUCCESSFUL", paidAt: new Date(), payerFingerprint: fingerprint } });
  return payment.id;
}

describe("referral codes (§46)", () => {
  it("creates one code per student, even under concurrent first use", async () => {
    const { actor } = await createLearner();
    // Viewing the invite page never writes: no code until the student asks for one.
    expect(await getInviteView(actor)).toMatchObject({ code: null, message: null, whatsappHref: null, counts: { joined: 0, pending: 0, rewarded: 0 } });
    const [first, second] = await Promise.all([getOrCreateReferralCode(actor), getOrCreateReferralCode(actor)]);
    expect(first.code).toBe(second.code);
    expect(first.code).toMatch(/^[A-Z2-9]{8}$/);
    expect(first.displayCode).toBe(`${first.code.slice(0, 4)}-${first.code.slice(4)}`);
    expect(first.link.endsWith(`/r/${first.code}`)).toBe(true);
    expect((await getOrCreateReferralCode(actor)).code).toBe(first.code);
    expect(await isActiveReferralCode(first.code.toLowerCase())).toBe(true);
    expect(await isActiveReferralCode("ZZZZ9999ZZZZ")).toBe(false);
    await expect(getOrCreateReferralCode({ userId: actor.userId, roles: ["TEACHER"] })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("recordReferralSignup", () => {
  it("attributes a new account once and ignores self-referrals, unknown codes and old accounts", async () => {
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const referred = await createLearner();

    expect(await recordReferralSignup({ referredUserId: referred.userId, code: `${code.slice(0, 4).toLowerCase()}-${code.slice(4)}`, ip: "196.4.1.20" })).toEqual({
      status: "ATTRIBUTED",
    });
    const row = await db.referral.findUniqueOrThrow({ where: { referredUserId: referred.userId } });
    expect(row).toMatchObject({ referrerUserId: referrer.userId, status: "PENDING" });
    expect(row.signupIpHash).toMatch(/^[0-9a-f]{64}$/);
    expect(row.signupIpHash).not.toContain("196");

    expect(await recordReferralSignup({ referredUserId: referred.userId, code })).toEqual({ status: "IGNORED", reason: "already_referred" });
    expect(await recordReferralSignup({ referredUserId: referrer.userId, code })).toEqual({ status: "IGNORED", reason: "self_referral" });
    expect(await recordReferralSignup({ referredUserId: referred.userId, code: "x" })).toEqual({ status: "IGNORED", reason: "invalid_code" });
    expect(await recordReferralSignup({ referredUserId: referred.userId, code: null })).toEqual({ status: "IGNORED", reason: "invalid_code" });

    const old = await createLearner();
    await db.user.update({ where: { id: old.userId }, data: { createdAt: new Date(Date.now() - 30 * 86_400_000) } });
    expect(await recordReferralSignup({ referredUserId: old.userId, code })).toEqual({ status: "IGNORED", reason: "account_too_old" });
  });

  it("is called by self-registration with the landing cookie's code (never blocking sign-up)", async () => {
    const { register } = await import("@/server/auth/flows");
    const { testMeta, TEST_PASSWORD } = await import("@/server/auth/testing");
    const { uniqueEmail } = await import("../../../tests/factories/index");
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const email = uniqueEmail("referred");
    await register({ role: "STUDENT", firstName: "Rufaro", identifier: email, password: TEST_PASSWORD, acceptTerms: true, referralCode: code }, testMeta());
    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, select: { id: true } });
    expect(await db.referral.findUnique({ where: { referredUserId: user.id }, select: { referrerUserId: true, status: true } })).toEqual({
      referrerUserId: referrer.userId,
      status: "PENDING",
    });
    // An unknown code is ignored; the account is still created.
    const other = uniqueEmail("unreferred");
    await register({ role: "STUDENT", firstName: "Tino", identifier: other, password: TEST_PASSWORD, acceptTerms: true, referralCode: "NOPE-NOPE" }, testMeta());
    const otherUser = await db.user.findUniqueOrThrow({ where: { emailNormalized: other }, select: { id: true } });
    expect(await db.referral.count({ where: { referredUserId: otherUser.id } })).toBe(0);
  });

  it("rejects sign-up bursts from one network for one referrer", async () => {
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const ip = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.7`;
    const results = [];
    for (let i = 0; i < 4; i += 1) {
      const referred = await createLearner();
      results.push(await recordReferralSignup({ referredUserId: referred.userId, code, ip }));
    }
    expect(results.map((r) => r.status)).toEqual(["ATTRIBUTED", "ATTRIBUTED", "ATTRIBUTED", "REJECTED"]);
    expect(results[3]).toEqual({ status: "REJECTED", reason: "signup_burst" });
  });
});

describe("qualifyReferral", () => {
  it("qualifies after onboarding + 3 active days and rewards the referrer exactly once", async () => {
    const { rules, planId } = await testRules();
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const referred = await onboardedStudent();
    await recordReferralSignup({ referredUserId: referred.userId, code });
    await backdateReferral(referred.userId, 5);

    await activeDay(referred.userId, 0);
    await activeDay(referred.userId, 1);
    expect(await qualifyReferral(referred.userId, { rules })).toEqual({ status: "PENDING", changed: false });

    await activeDay(referred.userId, 2);
    const now = new Date();
    const [one, two] = await Promise.all([qualifyReferral(referred.userId, { rules, now }), qualifyReferral(referred.userId, { rules, now })]);
    expect([one.status, two.status]).toContain("REWARDED");
    expect(await qualifyReferral(referred.userId, { rules })).toEqual({ status: "REWARDED", changed: false });

    const referral = await db.referral.findUniqueOrThrow({ where: { referredUserId: referred.userId } });
    expect(referral).toMatchObject({ status: "REWARDED", qualifyingPaymentId: null });
    expect(referral.qualifiedAt).not.toBeNull();
    const grants = await db.entitlementGrant.findMany({ where: { userId: referrer.userId, source: "REFERRAL" } });
    expect(grants).toHaveLength(1);
    expect(grants[0]).toMatchObject({ id: referral.rewardGrantId, planId, revokedAt: null });
    expect(grants[0]!.endsAt!.getTime() - grants[0]!.startsAt.getTime()).toBe(7 * 86_400_000);
    expect(await db.entitlementGrant.count({ where: { userId: referred.userId, source: "REFERRAL" } })).toBe(0);
    expect(await db.auditLog.count({ where: { action: "entitlement.grant", entityId: grants[0]!.id } })).toBe(1);
    const notification = await db.notification.findFirst({ where: { userId: referrer.userId, dedupeKey: `referral:${referral.id}` } });
    expect(notification?.body).not.toContain(referred.userId);

    // The invite page shows statuses only.
    const view = await getInviteView(referrer.actor);
    expect(view.counts).toEqual({ joined: 1, pending: 0, rewarded: 1 });
    expect(view.referrals).toEqual([{ id: referral.id, joinedOn: referral.createdAt, status: "REWARDED", statusLabel: "Reward added" }]);
    expect(JSON.stringify(view)).not.toContain(referred.userId);
    expect(view.code?.code).toBe(code);
    expect(view.whatsappHref?.startsWith("https://wa.me/?text=")).toBe(true);
  });

  it("qualifies on a first successful payment, rewards both sides when configured, and rejects referrer-paid ones", async () => {
    const { rules } = await testRules();
    const withReferee = { ...rules, refereeReward: { planCode: rules.reward.planCode, days: 3 } };
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);

    const paying = await createLearner();
    await recordReferralSignup({ referredUserId: paying.userId, code });
    const paymentId = await successfulPayment(paying.userId, paying.userId, "f".repeat(64));
    expect(await qualifyReferral(paying.userId, { rules: withReferee })).toEqual({ status: "REWARDED", changed: true });
    const paid = await db.referral.findUniqueOrThrow({ where: { referredUserId: paying.userId } });
    expect(paid.qualifyingPaymentId).toBe(paymentId);
    expect(paid.refereeRewardGrantId).not.toBeNull();
    expect(await db.entitlementGrant.count({ where: { userId: paying.userId, source: "REFERRAL" } })).toBe(1);

    const sponsored = await createLearner();
    await recordReferralSignup({ referredUserId: sponsored.userId, code });
    await successfulPayment(referrer.userId, sponsored.userId, null);
    expect(await qualifyReferral(sponsored.userId, { rules })).toEqual({ status: "REJECTED", changed: true, reason: "duplicate_payer" });
    expect(await db.entitlementGrant.count({ where: { userId: referrer.userId, source: "REFERRAL" } })).toBe(1);
  });

  it("expires referrals that never qualify, caps rewards per referrer, and leaves unknown users alone", async () => {
    const { rules } = await testRules({ maxRewardsPer30Days: 0 });
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);

    const capped = await onboardedStudent();
    await recordReferralSignup({ referredUserId: capped.userId, code });
    await backdateReferral(capped.userId, 5);
    for (const day of [0, 1, 2]) await activeDay(capped.userId, day);
    expect(await qualifyReferral(capped.userId, { rules })).toMatchObject({ status: "REJECTED", reason: "cap_reached" });

    const idle = await createLearner();
    await recordReferralSignup({ referredUserId: idle.userId, code });
    await db.referral.update({ where: { referredUserId: idle.userId }, data: { createdAt: new Date(Date.now() - 120 * 86_400_000) } });
    expect(await qualifyReferral(idle.userId, { rules })).toMatchObject({ status: "REJECTED", reason: "expired" });
    expect((await db.referral.findUniqueOrThrow({ where: { referredUserId: idle.userId } })).rejectedAt).not.toBeNull();

    const nobody = await createLearner();
    expect(await qualifyReferral(nobody.userId, { rules })).toEqual({ status: "NONE", changed: false });

    // A sweep scoped to this test's referrals: both are settled, so nothing is left to check.
    const sweep = await sweepReferrals({ rules, referredUserIds: [capped.userId, idle.userId, nobody.userId] });
    expect(sweep).toEqual({ checked: 0, changed: 0 });
  });

  it("leaves PENDING referrals untouched while the programme is off, and qualifies them once it is back on", async () => {
    const { rules } = await testRules();
    const paused = { ...rules, enabled: false };
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const ready = await onboardedStudent();
    await recordReferralSignup({ referredUserId: ready.userId, code });
    await backdateReferral(ready.userId, 5);
    for (const day of [0, 1, 2]) await activeDay(ready.userId, day);
    // Old enough to expire under the normal rules: pausing must not expire it either.
    const old = await createLearner();
    await recordReferralSignup({ referredUserId: old.userId, code });
    await backdateReferral(old.userId, 120);
    const scope = [ready.userId, old.userId];

    expect(await qualifyReferral(ready.userId, { rules: paused })).toEqual({ status: "PENDING", changed: false });
    expect(await sweepReferrals({ rules: paused, referredUserIds: scope })).toEqual({ checked: 0, changed: 0 });
    const rows = await db.referral.findMany({ where: { referredUserId: { in: scope } }, select: { status: true, rejectedAt: true, rejectReason: true } });
    expect(rows).toEqual([
      { status: "PENDING", rejectedAt: null, rejectReason: null },
      { status: "PENDING", rejectedAt: null, rejectReason: null },
    ]);

    // Back on: the normal rules apply (the qualified one is rewarded, the stale one expires).
    expect(await sweepReferrals({ rules, referredUserIds: scope })).toEqual({ checked: 2, changed: 2 });
    expect((await db.referral.findUniqueOrThrow({ where: { referredUserId: ready.userId } })).status).toBe("REWARDED");
    expect(await db.referral.findUniqueOrThrow({ where: { referredUserId: old.userId } })).toMatchObject({ status: "REJECTED", rejectReason: "expired" });
  });

  it("PAY-4: plus-addressed sock puppets earn nothing; activity needs a verified phone and a mailbox of its own", async () => {
    const { rules } = await testRules();
    const suffix = uniqueSuffix();
    const referrer = await createLearner();
    await db.user.update({ where: { id: referrer.userId }, data: { emailNormalized: `farm.${suffix}@gmail.com` } });
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const enrol = async (invitee: { userId: string }) => {
      await recordReferralSignup({ referredUserId: invitee.userId, code });
      await backdateReferral(invitee.userId, 5);
      for (const day of [0, 1, 2]) await activeDay(invitee.userId, day);
    };

    // The referrer's own inbox (+tag / dots), even with a verified phone: rejected as the same person.
    const self = await onboardedStudent({ email: `f.a.r.m.${suffix}+1@gmail.com` });
    await enrol(self);
    expect(await qualifyReferral(self.userId, { rules })).toEqual({ status: "REJECTED", changed: true, reason: "duplicate_identity" });

    // Another inbox with only a verified email: never qualifies on activity.
    const emailOnly = await onboardedStudent({ email: `pup.${suffix}+1@gmail.com`, phone: false });
    await enrol(emailOnly);
    expect(await qualifyReferral(emailOnly.userId, { rules })).toEqual({ status: "PENDING", changed: false });

    // A second account on that inbox with a verified phone qualifies once; the first one can then never qualify.
    const withPhone = await onboardedStudent({ email: `pup.${suffix}+2@gmail.com` });
    await enrol(withPhone);
    expect(await qualifyReferral(withPhone.userId, { rules })).toEqual({ status: "REWARDED", changed: true });
    await db.user.update({ where: { id: emailOnly.userId }, data: { phoneE164: uniquePhone(), phoneVerifiedAt: new Date() } });
    expect(await qualifyReferral(emailOnly.userId, { rules })).toEqual({ status: "REJECTED", changed: true, reason: "duplicate_identity" });

    expect(await db.entitlementGrant.count({ where: { userId: referrer.userId, source: "REFERRAL" } })).toBe(1);
  });

  it("never overshoots the per-referrer cap when several invitees qualify at the same time", async () => {
    const { rules } = await testRules({ maxRewardsPer30Days: 1 });
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const invitees = await Promise.all([onboardedStudent(), onboardedStudent(), onboardedStudent()]);
    for (const invitee of invitees) {
      await recordReferralSignup({ referredUserId: invitee.userId, code });
      await backdateReferral(invitee.userId, 5);
      for (const day of [0, 1, 2]) await activeDay(invitee.userId, day);
    }

    const now = new Date();
    const results = await Promise.all(invitees.map((invitee) => qualifyReferral(invitee.userId, { rules, now })));
    expect(results.filter((r) => r.status === "REWARDED")).toHaveLength(1);
    expect(results.filter((r) => r.status === "REJECTED").every((r) => r.reason === "cap_reached")).toBe(true);
    expect(await db.entitlementGrant.count({ where: { userId: referrer.userId, source: "REFERRAL" } })).toBe(1);
    const rows = await db.referral.findMany({ where: { referrerUserId: referrer.userId }, select: { status: true, rejectReason: true } });
    expect(rows.filter((row) => row.status === "REWARDED")).toHaveLength(1);
    expect(rows.filter((row) => row.status === "REJECTED").map((row) => row.rejectReason)).toEqual(["cap_reached", "cap_reached"]);
  });
});
