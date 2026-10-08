import "server-only";
import { randomInt } from "node:crypto";
import { Prisma, type ReferralStatus, type Role } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { DEFAULT_TIMEZONE, dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { canonicalEmailMailbox } from "@/server/auth/identifiers";
import { hasPermission } from "@/server/auth/permissions";
import { invalidateEntitlements } from "@/server/billing/entitlements";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { hashIp } from "@/server/lib/crypto";
import { getAppUrl } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getSetting } from "@/server/lib/settings";
import { createNotification } from "@/server/notifications/service";
import { whatsappShareHref } from "@/server/sharing/core";
import {
  DEFAULT_REFERRAL_RULES,
  REFERRAL_RULES_SETTING_KEY,
  decideAttribution,
  decideQualification,
  formatReferralCode,
  generateReferralCode,
  normalizeReferralCode,
  referralLink,
  referralRulesSchema,
  referralStatusLabel,
  rewardWindow,
  type ReferralRules,
} from "./core";

/**
 * Referrals (§46): codes, sign-up attribution, qualification and rewards.
 *
 * - {@link getOrCreateReferralCode}: one code per user (ReferralCode.userId unique), created on request (a POST from
 *   /app/invite; page views only read).
 * - {@link recordReferralSignup}: called by the auth register flow with the code from the landing cookie (/r/[code]).
 *   Never throws (registration must not fail because of a referral); self-referrals and old accounts are ignored.
 * - {@link qualifyReferral}: evaluates a PENDING referral against Setting `referrals.rules` (default: verified phone +
 *   onboarding done + 3 active days, OR a first successful payment; accounts on the referrer's own or an earlier
 *   qualified invitee's mailbox are rejected, PAY-4) and issues the reward — an EntitlementGrant (source REFERRAL) of a
 *   plan for N days — exactly once (row lock + status guard + unique grant links). Called by the `referrals.qualify`
 *   job (after a payment or onboarding) and the `referrals.sweep` job.
 * - What a referrer sees ({@link getInviteView}): their code, link and the STATUS of each referral — never the
 *   referred student's name, contact details or activity.
 */

/** The acting user. Structurally satisfied by the auth `Actor`. */
export interface ReferralActor {
  userId: string;
  roles: readonly Role[];
}

export const REFERRAL_QUALIFY_JOB = "referrals.qualify";
export const REFERRAL_SWEEP_JOB = "referrals.sweep";
const PLATFORM_TIMEZONE = DEFAULT_TIMEZONE;
const DAY_MS = 86_400_000;

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function assertCanRefer(actor: ReferralActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Invites are for students.");
}

/** Rules from Setting `referrals.rules` (validated; invalid or missing values fall back to the defaults). */
export function getReferralRules(): Promise<ReferralRules> {
  return getSetting(REFERRAL_RULES_SETTING_KEY, referralRulesSchema, DEFAULT_REFERRAL_RULES);
}

// =====================================================================================================================
// Codes
// =====================================================================================================================

export interface ReferralCodeInfo {
  code: string;
  /** "ABCD-EFGH" for reading aloud. */
  displayCode: string;
  isActive: boolean;
  link: string;
}

function codeInfo(row: { code: string; isActive: boolean }): ReferralCodeInfo {
  return { code: row.code, displayCode: formatReferralCode(row.code), isActive: row.isActive, link: referralLink(getAppUrl(), row.code) };
}

/** The student's referral code, created on first use (collision-safe; concurrent first calls return the same row). */
export async function getOrCreateReferralCode(actor: ReferralActor): Promise<ReferralCodeInfo> {
  assertCanRefer(actor);
  const existing = await db.referralCode.findUnique({ where: { userId: actor.userId }, select: { code: true, isActive: true } });
  if (existing) return codeInfo(existing);
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      const created = await db.referralCode.create({
        data: { userId: actor.userId, code: generateReferralCode(randomInt) },
        select: { code: true, isActive: true },
      });
      return codeInfo(created);
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      // Either another request created this user's code, or the random code was taken: re-read, then retry.
      const raced = await db.referralCode.findUnique({ where: { userId: actor.userId }, select: { code: true, isActive: true } });
      if (raced) return codeInfo(raced);
    }
  }
  throw new Error("referrals: could not allocate a unique referral code");
}

// =====================================================================================================================
// Attribution (register hook)
// =====================================================================================================================

export interface SignupAttribution {
  status: "ATTRIBUTED" | "REJECTED" | "IGNORED";
  reason?: string;
}

/**
 * Records that `referredUserId` signed up with `code` (from the /r/[code] cookie). Creates a PENDING Referral, or a
 * REJECTED one ("signup_burst") when one network keeps creating accounts for the same referrer. Ignores invalid or
 * inactive codes, self-referrals, users already referred and accounts older than the attribution window.
 * NEVER throws: failures are logged and reported as IGNORED.
 */
export async function recordReferralSignup(
  input: { referredUserId: string; code: string | null | undefined; ip?: string | null },
  now: Date = new Date(),
): Promise<SignupAttribution> {
  try {
    const code = normalizeReferralCode(input.code);
    if (!code) return { status: "IGNORED", reason: "invalid_code" };
    const [rules, codeRow, referred, already] = await Promise.all([
      getReferralRules(),
      db.referralCode.findUnique({ where: { code }, select: { id: true, userId: true, isActive: true } }),
      db.user.findUnique({ where: { id: input.referredUserId }, select: { createdAt: true } }),
      db.referral.findUnique({ where: { referredUserId: input.referredUserId }, select: { id: true } }),
    ]);
    if (!codeRow || !referred) return { status: "IGNORED", reason: codeRow ? "unknown_user" : "unknown_code" };
    const decision = decideAttribution({
      rules,
      referrerUserId: codeRow.userId,
      referredUserId: input.referredUserId,
      codeActive: codeRow.isActive,
      accountCreatedAt: referred.createdAt,
      alreadyReferred: already !== null,
      now,
    });
    if (!decision.attribute) return { status: "IGNORED", reason: decision.reason };

    const signupIpHash = input.ip ? hashIp(input.ip) : null;
    const burst =
      signupIpHash !== null &&
      (await db.referral.count({
        where: { referrerUserId: codeRow.userId, signupIpHash, createdAt: { gte: new Date(now.getTime() - DAY_MS) } },
      })) >= rules.maxSignupsPerIpPerDay;
    await db.referral.create({
      data: {
        referralCodeId: codeRow.id,
        referrerUserId: codeRow.userId,
        referredUserId: input.referredUserId,
        signupIpHash,
        createdAt: now,
        ...(burst ? { status: "REJECTED" as const, rejectedAt: now, rejectReason: "signup_burst" } : {}),
      },
      select: { id: true },
    });
    return burst ? { status: "REJECTED", reason: "signup_burst" } : { status: "ATTRIBUTED" };
  } catch (error) {
    if (isUniqueViolation(error)) return { status: "IGNORED", reason: "already_referred" };
    logger.error("referrals: sign-up attribution failed", { err: error });
    return { status: "IGNORED", reason: "error" };
  }
}

// =====================================================================================================================
// Qualification and rewards
// =====================================================================================================================

export interface QualifyResult {
  status: ReferralStatus | "NONE";
  /** True when this call changed the referral (qualified, rewarded or rejected). */
  changed: boolean;
  reason?: string;
}

/** Earlier invitees compared for a shared mailbox (newest first; the per-referrer cap keeps this small). */
const IDENTITY_CHECK_LIMIT = 500;

function mailboxOf(email: string | null | undefined): string | null {
  return email ? canonicalEmailMailbox(email) : null;
}

async function loadQualificationFacts(referral: { id: string; referrerUserId: string; referredUserId: string; createdAt: Date }, now: Date) {
  const since = dateColumnFromLocalDate(localDateString(referral.createdAt, PLATFORM_TIMEZONE));
  const [user, referrer, earlierInvitees, activeDays, payment, referrerPayments, rewardsLast30Days] = await Promise.all([
    db.user.findUnique({
      where: { id: referral.referredUserId },
      select: { emailNormalized: true, phoneE164: true, phoneVerifiedAt: true, student: { select: { onboardingCompletedAt: true } } },
    }),
    db.user.findUnique({ where: { id: referral.referrerUserId }, select: { emailNormalized: true } }),
    // Referral(referrerUserId, status, createdAt) index: invitees of this referrer who already qualified.
    db.referral.findMany({
      where: { referrerUserId: referral.referrerUserId, status: { in: ["QUALIFIED", "REWARDED"] }, id: { not: referral.id } },
      orderBy: { createdAt: "desc" },
      take: IDENTITY_CHECK_LIMIT,
      select: { referred: { select: { emailNormalized: true } } },
    }),
    // A day counts when activity was recorded (bridged streak-freeze rows have no firstActivityAt).
    db.dailyActivity.count({ where: { userId: referral.referredUserId, date: { gte: since }, firstActivityAt: { not: null } } }),
    db.payment.findFirst({
      where: { status: "SUCCESSFUL", OR: [{ payerUserId: referral.referredUserId }, { beneficiaryUserId: referral.referredUserId }] },
      orderBy: [{ paidAt: "asc" }, { createdAt: "asc" }],
      select: { id: true, payerUserId: true, payerFingerprint: true },
    }),
    db.payment.findMany({
      where: { payerUserId: referral.referrerUserId, status: "SUCCESSFUL", payerFingerprint: { not: null } },
      select: { payerFingerprint: true },
      distinct: ["payerFingerprint"],
      take: 50,
    }),
    db.referral.count({ where: { referrerUserId: referral.referrerUserId, status: "REWARDED", rewardedAt: { gte: new Date(now.getTime() - 30 * DAY_MS) } } }),
  ]);
  // PAY-4: sub-addressed (+tag) and Gmail dot variants of one inbox are one person, however many accounts they make.
  const mailbox = mailboxOf(user?.emailNormalized);
  const takenMailboxes = new Set([mailboxOf(referrer?.emailNormalized), ...earlierInvitees.map((r) => mailboxOf(r.referred.emailNormalized))]);
  return {
    phoneVerified: Boolean(user?.phoneE164 && user.phoneVerifiedAt),
    sharedIdentity: mailbox !== null && takenMailboxes.has(mailbox),
    onboardingCompleted: Boolean(user?.student?.onboardingCompletedAt),
    activeDays,
    payment,
    referrerPayerFingerprints: referrerPayments.flatMap((p) => (p.payerFingerprint ? [p.payerFingerprint] : [])),
    referralAgeDays: Math.floor((now.getTime() - referral.createdAt.getTime()) / DAY_MS),
    referrerRewardsLast30Days: rewardsLast30Days,
  };
}

async function grantReward(tx: DbClient, input: { userId: string; planId: string; days: number; now: Date; referralId: string; role: "REFERRER" | "REFEREE" }) {
  const window = rewardWindow(input.now, input.days);
  const grant = await tx.entitlementGrant.create({
    data: { userId: input.userId, source: "REFERRAL", planId: input.planId, startsAt: window.startsAt, endsAt: window.endsAt, reason: "Referral reward" },
    select: { id: true, endsAt: true },
  });
  await auditInTx(tx, {
    actorUserId: null,
    action: AUDIT_ACTIONS.ENTITLEMENT_GRANT,
    entityType: "EntitlementGrant",
    entityId: grant.id,
    targetUserId: input.userId,
    metadata: { source: "REFERRAL", referralId: input.referralId, role: input.role, days: input.days },
  });
  return grant;
}

type RewardOutcome = "REWARDED" | "CAPPED" | "UNCHANGED";

/**
 * Issues the reward of a QUALIFIED referral exactly once: row lock, status re-check, per-referrer cap re-check, grant(s),
 * REWARDED. Leaves the referral QUALIFIED (retried by the sweep) when the reward plan is missing.
 *
 * The cap (`maxRewardsPer30Days`) is checked again INSIDE the transaction under a per-referrer lock (the referrer's
 * ReferralCode row, FOR NO KEY UPDATE so sign-up inserts referencing it are not blocked): concurrent `referrals.qualify`
 * jobs for several invitees of one referrer are serialised and cannot overshoot the cap. Over the cap: REJECTED
 * "cap_reached".
 */
async function rewardReferral(referralId: string, rules: ReferralRules, now: Date): Promise<RewardOutcome> {
  const plans = await db.plan.findMany({
    where: { code: { in: [rules.reward.planCode, ...(rules.refereeReward ? [rules.refereeReward.planCode] : [])] } },
    select: { id: true, code: true, name: true },
  });
  const planByCode = new Map(plans.map((p) => [p.code, p]));
  const referrerPlan = planByCode.get(rules.reward.planCode);
  const refereePlan = rules.refereeReward ? planByCode.get(rules.refereeReward.planCode) : undefined;
  if (!referrerPlan || (rules.refereeReward && !refereePlan)) {
    logger.error("referrals: reward plan not found; referral stays QUALIFIED", { referralId, planCode: rules.reward.planCode });
    return "UNCHANGED";
  }
  const outcome = await db.$transaction(
    async (tx): Promise<{ kind: "CAPPED" } | { kind: "REWARDED"; referrerUserId: string; referredUserId: string } | null> => {
      await tx.$queryRaw`SELECT 1 FROM "Referral" WHERE "id" = ${referralId}::uuid FOR UPDATE`;
      const referral = await tx.referral.findUnique({ where: { id: referralId }, select: { status: true, referrerUserId: true, referredUserId: true } });
      if (!referral || referral.status !== "QUALIFIED") return null;
      await tx.$queryRaw`SELECT 1 FROM "ReferralCode" WHERE "userId" = ${referral.referrerUserId}::uuid FOR NO KEY UPDATE`;
      const rewardsLast30Days = await tx.referral.count({
        where: { referrerUserId: referral.referrerUserId, status: "REWARDED", rewardedAt: { gte: new Date(now.getTime() - 30 * DAY_MS) } },
      });
      if (rewardsLast30Days >= rules.maxRewardsPer30Days) {
        await tx.referral.update({ where: { id: referralId }, data: { status: "REJECTED", rejectedAt: now, rejectReason: "cap_reached" } });
        return { kind: "CAPPED" };
      }
      const grant = await grantReward(tx, { userId: referral.referrerUserId, planId: referrerPlan.id, days: rules.reward.days, now, referralId, role: "REFERRER" });
      const refereeGrant =
        rules.refereeReward && refereePlan
          ? await grantReward(tx, { userId: referral.referredUserId, planId: refereePlan.id, days: rules.refereeReward.days, now, referralId, role: "REFEREE" })
          : null;
      await tx.referral.update({
        where: { id: referralId },
        data: { status: "REWARDED", rewardedAt: now, rewardGrantId: grant.id, refereeRewardGrantId: refereeGrant?.id ?? null },
      });
      await createNotification(
        referral.referrerUserId,
        {
          type: "referral.rewarded",
          category: "BILLING",
          title: "Your invite earned a reward",
          body: `Someone you invited is studying with ${APP_NAME}. You have ${rules.reward.days} days of ${referrerPlan.name} access.`,
          data: { href: "/app/invite" },
          dedupeKey: `referral:${referralId}`,
        },
        { client: tx },
      );
      return { kind: "REWARDED", referrerUserId: referral.referrerUserId, referredUserId: referral.referredUserId };
    },
    { maxWait: 10_000, timeout: 20_000 },
  );
  if (!outcome) return "UNCHANGED";
  if (outcome.kind === "CAPPED") return "CAPPED";
  invalidateEntitlements(outcome.referrerUserId);
  if (rules.refereeReward) invalidateEntitlements(outcome.referredUserId);
  return "REWARDED";
}

/**
 * Evaluates the referral of `referredUserId` (if any) and moves it on: PENDING → QUALIFIED → REWARDED, or REJECTED.
 * Idempotent and safe to run concurrently (status-guarded updates; the reward step locks the row).
 */
export async function qualifyReferral(referredUserId: string, options: { now?: Date; rules?: ReferralRules } = {}): Promise<QualifyResult> {
  const now = options.now ?? new Date();
  const referral = await db.referral.findUnique({
    where: { referredUserId },
    select: { id: true, status: true, referrerUserId: true, referredUserId: true, createdAt: true },
  });
  if (!referral) return { status: "NONE", changed: false };
  if (referral.status === "REWARDED" || referral.status === "REJECTED") return { status: referral.status, changed: false };
  const rules = options.rules ?? (await getReferralRules());
  // Programme paused: PENDING referrals wait untouched (decideQualification would say WAIT; skip loading the facts).
  if (referral.status === "PENDING" && !rules.enabled) return { status: "PENDING", changed: false };

  if (referral.status === "PENDING") {
    const facts = await loadQualificationFacts(referral, now);
    const decision = decideQualification(rules, referral.referrerUserId, facts);
    if (decision.outcome === "WAIT") return { status: "PENDING", changed: false };
    if (decision.outcome === "REJECT") {
      const { count } = await db.referral.updateMany({
        where: { id: referral.id, status: "PENDING" },
        data: { status: "REJECTED", rejectedAt: now, rejectReason: decision.reason },
      });
      return { status: "REJECTED", changed: count > 0, reason: decision.reason };
    }
    const { count } = await db.referral.updateMany({
      where: { id: referral.id, status: "PENDING" },
      data: { status: "QUALIFIED", qualifiedAt: now, qualifyingPaymentId: decision.paymentId },
    });
    if (count === 0) return { status: "PENDING", changed: false }; // another worker got there first
  }

  const outcome = await rewardReferral(referral.id, rules, now);
  if (outcome === "CAPPED") return { status: "REJECTED", changed: true, reason: "cap_reached" };
  return { status: outcome === "REWARDED" ? "REWARDED" : "QUALIFIED", changed: true };
}

/**
 * Hook for other modules (billing after a SUCCESSFUL payment, onboarding completion): queues a qualification check
 * for the user's referral. Cheap and idempotent (dedupe key per user while pending); pass `client` to enqueue inside
 * the caller's transaction.
 */
export async function enqueueReferralCheck(referredUserId: string, options: { client?: DbClient; delayMs?: number } = {}): Promise<void> {
  await enqueue(
    REFERRAL_QUALIFY_JOB,
    { referredUserId },
    { dedupeKey: `referral:qualify:${referredUserId}`, ...(options.client ? { client: options.client } : {}), ...(options.delayMs ? { delayMs: options.delayMs } : {}) },
  );
}

/**
 * Sweep job body: re-evaluates PENDING referrals (activity can qualify them on any day) and retries QUALIFIED ones
 * whose reward failed. While the programme is switched off, PENDING referrals are left untouched (not even read) and
 * qualify normally once it is back on. Cursor-paginated; each referral is one unit of work. `rules` and
 * `referredUserIds` (a scope) are for tests.
 */
export async function sweepReferrals(
  options: { now?: Date; batchSize?: number; maxBatches?: number; rules?: ReferralRules; referredUserIds?: readonly string[] } = {},
): Promise<{ checked: number; changed: number }> {
  const now = options.now ?? new Date();
  const rules = options.rules ?? (await getReferralRules());
  const statuses: ReferralStatus[] = rules.enabled ? ["PENDING", "QUALIFIED"] : ["QUALIFIED"];
  const scope = options.referredUserIds ? { referredUserId: { in: [...options.referredUserIds] } } : {};
  const batchSize = Math.max(1, Math.min(1_000, options.batchSize ?? 200));
  const maxBatches = Math.max(1, options.maxBatches ?? 50);
  let cursor: string | null = null;
  let checked = 0;
  let changed = 0;
  for (let batch = 0; batch < maxBatches; batch += 1) {
    const rows: { id: string; referredUserId: string }[] = await db.referral.findMany({
      where: { status: { in: statuses }, ...scope, ...(cursor ? { id: { gt: cursor } } : {}) },
      orderBy: { id: "asc" },
      take: batchSize,
      select: { id: true, referredUserId: true },
    });
    if (rows.length === 0) break;
    cursor = rows[rows.length - 1]!.id;
    for (const row of rows) {
      checked += 1;
      try {
        const result = await qualifyReferral(row.referredUserId, { now, rules });
        if (result.changed) changed += 1;
      } catch (error) {
        logger.error("referrals: qualification failed", { referralId: row.id, err: error });
      }
    }
    if (rows.length < batchSize) break;
  }
  return { checked, changed };
}

// =====================================================================================================================
// Invite page
// =====================================================================================================================

export interface InviteReferralItem {
  /** Opaque row id (for React keys); never the referred user's id. */
  id: string;
  joinedOn: Date;
  status: ReferralStatus;
  statusLabel: string;
}

export interface InviteView {
  /** Null until the student creates their code (a POST; page views never write). */
  code: ReferralCodeInfo | null;
  /** Prefilled invite message and WhatsApp link (null without a code). */
  message: string | null;
  whatsappHref: string | null;
  rules: {
    enabled: boolean;
    qualifyOn: ReferralRules["qualifyOn"];
    activeDaysRequired: number;
    rewardDays: number;
    rewardPlanName: string | null;
    refereeRewardDays: number | null;
  };
  counts: { joined: number; pending: number; rewarded: number };
  referrals: InviteReferralItem[];
}

/** Everything /app/invite shows: code + link, how rewards work (from the rules), and referral statuses only. Read-only. */
export async function getInviteView(actor: ReferralActor, options: { limit?: number } = {}): Promise<InviteView> {
  assertCanRefer(actor);
  const [codeRow, rules] = await Promise.all([
    db.referralCode.findUnique({ where: { userId: actor.userId }, select: { code: true, isActive: true } }),
    getReferralRules(),
  ]);
  const code = codeRow ? codeInfo(codeRow) : null;
  const [groups, recent, plan] = await Promise.all([
    db.referral.groupBy({ by: ["status"], where: { referrerUserId: actor.userId }, _count: { _all: true } }),
    db.referral.findMany({
      where: { referrerUserId: actor.userId },
      orderBy: [{ createdAt: "desc" }],
      take: Math.max(1, Math.min(50, options.limit ?? 20)),
      select: { id: true, createdAt: true, status: true, rejectReason: true },
    }),
    db.plan.findUnique({ where: { code: rules.reward.planCode }, select: { name: true } }),
  ]);
  const count = (status: ReferralStatus) => groups.find((g) => g.status === status)?._count._all ?? 0;
  const message = code ? `Study with me on ${APP_NAME}. My invite code is ${code.displayCode}:` : null;
  return {
    code,
    message,
    whatsappHref: code && message ? whatsappShareHref(message, code.link) : null,
    rules: {
      enabled: rules.enabled,
      qualifyOn: rules.qualifyOn,
      activeDaysRequired: rules.activeDaysRequired,
      rewardDays: rules.reward.days,
      rewardPlanName: plan?.name ?? null,
      refereeRewardDays: rules.refereeReward?.days ?? null,
    },
    counts: {
      joined: groups.reduce((sum, g) => sum + g._count._all, 0),
      pending: count("PENDING") + count("QUALIFIED"),
      rewarded: count("REWARDED"),
    },
    referrals: recent.map((r) => ({ id: r.id, joinedOn: r.createdAt, status: r.status, statusLabel: referralStatusLabel(r.status, r.rejectReason) })),
  };
}

/** True when `code` belongs to an active referral code (the /r/[code] landing sets the cookie only then). */
export async function isActiveReferralCode(code: string): Promise<boolean> {
  const normalized = normalizeReferralCode(code);
  if (!normalized) return false;
  const row = await db.referralCode.findUnique({ where: { code: normalized }, select: { isActive: true } });
  return row?.isActive ?? false;
}
