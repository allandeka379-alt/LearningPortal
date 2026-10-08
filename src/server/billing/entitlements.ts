import "server-only";
import { cache } from "react";
import { z } from "zod";
import { Prisma, type EntitlementSource, type SchoolMemberRole, type SubscriptionStatus } from "@/generated/prisma/client";
import {
  NO_ENTITLEMENTS,
  entitlementsSchema,
  mergeEntitlements,
  remainingAllowance,
  type AiModelTier,
  type BooleanFeature,
  type Entitlements,
  type LimitFeature,
} from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { createCache, memoizeAsync } from "@/server/lib/cache";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { getSetting } from "@/server/lib/settings";

/**
 * Entitlement resolution (§31 plans, §24 study packs, §53 B2C / B2B / B2B2C; ARCHITECTURE §7.6, CLAUDE.md rule 9).
 *
 * Gate features with {@link assertEntitlement} / {@link assertWithinLimit}, never with plan names. Every value comes from
 * the database (Plan.entitlements, StudyPack.entitlements, EntitlementGrant.features); nothing here hard-codes a plan.
 *
 * Sources, merged with `mergeEntitlements` (features = union, limits = maximum, `null` = unlimited):
 *   (a) the user's own live subscriptions (TRIALING / ACTIVE / PAST_DUE within grace), including ones a parent pays for;
 *   (b) live SCHOOL subscriptions of schools where the user is an ACTIVE member: staff (TEACHER / SCHOOL_ADMIN) always,
 *       students only while they hold a seat (an active SCHOOL_SEAT grant on that subscription; a free seat is claimed
 *       automatically on first resolution, first come first served, see {@link allocateSchoolSeat});
 *   (c) live EntitlementGrants (study packs, promos, referral rewards, staff grants, compensation). A grant with a
 *       content scope (study packs always) applies only inside that scope: see {@link getSubjectEntitlements};
 *   (d) the default plan (`Plan.isDefault`, i.e. FREE; falls back to code "FREE"), loaded from the database.
 *
 * Caching: memoised per request (React `cache`) and per instance for {@link ENTITLEMENT_CACHE_TTL_MS} (bounded by the
 * earliest source expiry). Writers call {@link invalidateEntitlements} on the writing instance; other instances catch
 * up within the TTL.
 *
 * Stored documents may use the flat shape of `src/lib/billing/entitlements.ts` (dev seed) or the nested
 * `{ version, features: { "mock_exams": true }, limits: { "ai.messagesPerDay": 30 } }` shape documented on Plan /
 * StudyPack / EntitlementGrant: {@link normalizeEntitlementDocument} accepts both and fails closed per key.
 */

/** Per-instance cache lifetime of a user's resolved entitlements (ARCHITECTURE §3.8: 60 s, busted on billing writes). */
export const ENTITLEMENT_CACHE_TTL_MS = 60_000;
/** Grace period after `currentPeriodEnd` when Setting `billing.graceDays` is unset (ARCHITECTURE §7.5). */
export const DEFAULT_GRACE_DAYS = 3;
/** Setting key holding the grace period in days (0-60). */
export const GRACE_DAYS_SETTING_KEY = "billing.graceDays";
/** Fallback plan code when no plan is flagged `isDefault`. */
export const FREE_PLAN_CODE = "FREE";
/** Where individual users upgrade / where schools learn about school plans (UI routes, ARCHITECTURE §3.3). */
export const UPGRADE_PATH = "/pricing";
export const SCHOOL_UPGRADE_PATH = "/schools";

/** Subscription statuses that may grant access (subject to the period/grace check). */
export const LIVE_SUBSCRIPTION_STATUSES = ["TRIALING", "ACTIVE", "PAST_DUE"] as const satisfies readonly SubscriptionStatus[];

const DAY_MS = 86_400_000;

// =====================================================================================================================
// Entitlement documents (pure)
// =====================================================================================================================

type FeatureAlias =
  | { kind: "flag"; key: BooleanFeature }
  | { kind: "lessons" }
  | { kind: "unlimited"; key: LimitFeature }
  | { kind: "tier"; tier: AiModelTier }
  /** Check-only alias: "has a non-zero allowance" (no boolean flag exists for it). */
  | { kind: "allowance"; key: LimitFeature };

/**
 * Registry feature keys (Plan doc / ARCHITECTURE §7.6 naming) mapped onto the entitlement contract. Accepted in stored
 * documents and by {@link assertEntitlement}, e.g. `assertEntitlement(actor, "mock_exams")`.
 */
export const FEATURE_ALIASES = {
  "lessons.full": { kind: "lessons" },
  "practice.unlimited": { kind: "unlimited", key: "practiceQuestionsPerDay" },
  daily_quiz: { kind: "flag", key: "dailyQuestion" },
  daily_question: { kind: "flag", key: "dailyQuestion" },
  diagnostic_test: { kind: "flag", key: "diagnosticTest" },
  mock_exams: { kind: "flag", key: "mockExams" },
  flashcards: { kind: "flag", key: "flashcards" },
  study_plan: { kind: "flag", key: "studyPlan" },
  exam_countdown: { kind: "flag", key: "examCountdown" },
  ai_tutor: { kind: "flag", key: "aiTutor" },
  ai_solver: { kind: "allowance", key: "aiSolverPerDay" },
  ai_images: { kind: "flag", key: "aiImageUploads" },
  ai_deep: { kind: "tier", tier: "DEEP" },
  "analytics.advanced": { kind: "flag", key: "advancedAnalytics" },
  personalised_learning: { kind: "flag", key: "personalisedLearning" },
  leaderboards: { kind: "flag", key: "leaderboards" },
  parent_reports: { kind: "flag", key: "parentReports" },
  pdf_export: { kind: "flag", key: "pdfExport" },
  teacher_dashboard: { kind: "flag", key: "teacherDashboard" },
  student_management: { kind: "flag", key: "studentManagement" },
  assignments: { kind: "flag", key: "assignments" },
  school_analytics: { kind: "flag", key: "schoolAnalytics" },
} as const satisfies Record<string, FeatureAlias>;

export type FeatureAliasKey = keyof typeof FEATURE_ALIASES;
/** Anything {@link assertEntitlement} accepts: a boolean contract key (`"mockExams"`) or a registry alias (`"mock_exams"`). */
export type EntitlementFeature = BooleanFeature | FeatureAliasKey;

/** Registry limit keys mapped onto the contract's numeric limits. */
export const LIMIT_ALIASES = {
  "practice.questionsPerDay": "practiceQuestionsPerDay",
  "topic_tests.perWeek": "topicTestsPerWeek",
  "mock_exams.perMonth": "mockExamsPerMonth",
  "ai.messagesPerDay": "aiMessagesPerDay",
  "ai.solverPerDay": "aiSolverPerDay",
  "ai.solverImagesPerDay": "aiSolverPerDay",
} as const satisfies Record<string, LimitFeature>;

const SHAPE = entitlementsSchema.shape;
const ENTITLEMENT_KEYS = Object.keys(NO_ENTITLEMENTS) as (keyof Entitlements)[];
const BOOLEAN_KEYS: ReadonlySet<string> = new Set(ENTITLEMENT_KEYS.filter((key) => typeof NO_ENTITLEMENTS[key] === "boolean"));
const LIMIT_KEYS: ReadonlySet<string> = new Set(
  ENTITLEMENT_KEYS.filter((key) => {
    const value = NO_ENTITLEMENTS[key];
    return value === null || typeof value === "number";
  }),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBooleanFeature(key: string): key is BooleanFeature {
  return BOOLEAN_KEYS.has(key);
}

function isFeatureAlias(key: string): key is FeatureAliasKey {
  return Object.hasOwn(FEATURE_ALIASES, key);
}

/** Result of {@link normalizeEntitlementDocument}: the parsed entitlements and any per-key problems (for logs). */
export interface NormalizedEntitlements {
  entitlements: Entitlements;
  issues: string[];
}

/**
 * Parses a stored entitlements document (flat contract shape or nested `{ features, limits }` registry shape) into
 * {@link Entitlements}. Never throws: unknown keys are ignored and invalid values fall back to `NO_ENTITLEMENTS` for
 * that key only (fail closed per key), so an admin typo cannot take the platform down or grant a feature.
 */
export function normalizeEntitlementDocument(raw: unknown): NormalizedEntitlements {
  const issues: string[] = [];
  if (!isRecord(raw)) {
    if (raw !== null && raw !== undefined) issues.push("document is not an object");
    return { entitlements: { ...NO_ENTITLEMENTS }, issues };
  }

  const flat: Partial<Record<keyof Entitlements, unknown>> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (Object.hasOwn(SHAPE, key)) flat[key as keyof Entitlements] = value;
    else if (key === "aiModelTier") flat.aiMaxModelTier = value;
  }

  const limits = raw.limits;
  if (isRecord(limits)) {
    for (const [key, value] of Object.entries(limits)) {
      const target = LIMIT_KEYS.has(key)
        ? (key as LimitFeature)
        : Object.hasOwn(LIMIT_ALIASES, key)
          ? LIMIT_ALIASES[key as keyof typeof LIMIT_ALIASES]
          : undefined;
      if (target) flat[target] = value;
    }
  }

  // Features after limits so an explicit "practice.unlimited": true wins over a numeric practice limit.
  const features = raw.features;
  if (isRecord(features)) {
    for (const [key, value] of Object.entries(features)) {
      if (isBooleanFeature(key)) {
        flat[key] = value;
        continue;
      }
      if (!isFeatureAlias(key)) continue;
      if (typeof value !== "boolean") {
        issues.push(`features.${key}: expected a boolean`);
        continue;
      }
      const alias: FeatureAlias = FEATURE_ALIASES[key];
      switch (alias.kind) {
        case "flag":
          flat[alias.key] = value;
          break;
        case "lessons":
          flat.lessonAccess = value ? "ALL" : "FREE_ONLY";
          break;
        case "unlimited":
          if (value) flat[alias.key] = null;
          break;
        case "tier":
          if (value) flat.aiMaxModelTier = alias.tier;
          break;
        case "allowance":
          break; // the numeric limit decides
      }
    }
  }

  const out: Record<string, unknown> = { ...NO_ENTITLEMENTS };
  for (const key of ENTITLEMENT_KEYS) {
    if (!(key in flat)) continue;
    const parsed = SHAPE[key].safeParse(flat[key]);
    if (parsed.success) out[key] = parsed.data;
    else issues.push(`${key}: invalid value`);
  }
  return { entitlements: entitlementsSchema.parse(out), issues };
}

/** Content a scoped grant (study pack, scoped promo) applies to. A study pack scope row names exactly one of these. */
export interface ContentScope {
  subjectIds: string[];
  qualificationIds: string[];
  /** Syllabus-version scopes, with the syllabus's subject when known. */
  syllabi: { syllabusId: string; subjectId: string | null }[];
}

const MAX_SCOPE_IDS = 500;
const scopeIds = z.array(z.uuid()).max(MAX_SCOPE_IDS).optional();
const grantScopeSchema = z.object({ subjectIds: scopeIds, qualificationIds: scopeIds, syllabusIds: scopeIds });

function emptyScope(): ContentScope {
  return { subjectIds: [], qualificationIds: [], syllabi: [] };
}

function scopeSize(scope: ContentScope): number {
  return scope.subjectIds.length + scope.qualificationIds.length + scope.syllabi.length;
}

/**
 * Reads `scope` from an EntitlementGrant.features document. `null` = unscoped (applies everywhere). A malformed scope
 * fails closed (an empty scope that matches nothing); a scope listing no ids at all is treated as unscoped.
 */
export function parseGrantScope(raw: unknown): { scope: ContentScope | null; issues: string[] } {
  if (!isRecord(raw) || raw.scope === undefined || raw.scope === null) return { scope: null, issues: [] };
  const parsed = grantScopeSchema.safeParse(raw.scope);
  if (!parsed.success) return { scope: emptyScope(), issues: ["scope: invalid; grant applies to nothing"] };
  const scope: ContentScope = {
    subjectIds: parsed.data.subjectIds ?? [],
    qualificationIds: parsed.data.qualificationIds ?? [],
    syllabi: (parsed.data.syllabusIds ?? []).map((syllabusId) => ({ syllabusId, subjectId: null })),
  };
  return { scope: scopeSize(scope) === 0 ? null : scope, issues: [] };
}

/** A subject being accessed (qualification for qualification-wide packs, syllabus for version-scoped packs). */
export interface SubjectRef {
  subjectId: string;
  qualificationId: string | null;
  /** The syllabus version being viewed, when known. */
  syllabusId?: string | null;
}

/**
 * True when `scope` covers `subject`: by subject (any syllabus version), by qualification, or by syllabus version. A
 * version-scoped pack matches the exact `syllabusId` when the caller provides one, else any version of its subject.
 */
export function scopeCoversSubject(scope: ContentScope, subject: SubjectRef): boolean {
  if (scope.subjectIds.includes(subject.subjectId)) return true;
  if (subject.qualificationId !== null && scope.qualificationIds.includes(subject.qualificationId)) return true;
  return scope.syllabi.some((s) =>
    subject.syllabusId ? s.syllabusId === subject.syllabusId : s.subjectId === subject.subjectId,
  );
}

// =====================================================================================================================
// Subscription liveness (pure)
// =====================================================================================================================

/** The timing fields of a Subscription that decide whether it grants access. */
export interface SubscriptionTiming {
  status: SubscriptionStatus;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  cancelAtPeriodEnd: boolean;
}

/**
 * When access from this subscription ends: trial end for TRIALING; `currentPeriodEnd + grace` for ACTIVE / PAST_DUE
 * (no grace when cancelled at period end); `null` (no access) for PENDING / CANCELLED / EXPIRED.
 */
export function subscriptionAccessEndsAt(sub: SubscriptionTiming, graceDays: number): Date | null {
  switch (sub.status) {
    case "TRIALING":
      return sub.trialEndsAt ?? sub.currentPeriodEnd;
    case "ACTIVE":
    case "PAST_DUE":
      if (sub.currentPeriodEnd === null) return null;
      if (sub.cancelAtPeriodEnd) return sub.currentPeriodEnd;
      return new Date(sub.currentPeriodEnd.getTime() + Math.max(0, graceDays) * DAY_MS);
    default:
      return null;
  }
}

/** True when the subscription grants access at `now` (status AND time: never relies on the lifecycle job). */
export function isSubscriptionLive(sub: SubscriptionTiming, now: Date, graceDays: number): boolean {
  const end = subscriptionAccessEndsAt(sub, graceDays);
  return end !== null && now.getTime() < end.getTime();
}

// =====================================================================================================================
// Resolver (pure)
// =====================================================================================================================

export interface PlanDocument {
  code: string;
  entitlements: unknown;
}

export interface SubscriptionSource extends SubscriptionTiming {
  id: string;
  plan: PlanDocument;
}

export interface SchoolSubscriptionSource extends SubscriptionSource {
  schoolId: string;
  seats: number | null;
}

export interface SchoolMembershipSource {
  schoolId: string;
  role: SchoolMemberRole;
}

export interface StudyPackScopeSource {
  subjectId: string | null;
  qualificationId: string | null;
  syllabusId: string | null;
  /** Subject of `syllabusId` (joined), so version-scoped packs can be matched by subject. */
  syllabusSubjectId: string | null;
}

export interface GrantSource {
  id: string;
  source: EntitlementSource;
  subscriptionId: string | null;
  startsAt: Date;
  endsAt: Date | null;
  revokedAt: Date | null;
  plan: PlanDocument | null;
  studyPack: { id: string; entitlements: unknown; scopes: StudyPackScopeSource[] } | null;
  features: unknown;
}

/** Everything the pure resolver needs, loaded by {@link getEntitlements}. */
export interface EntitlementInputs {
  now: Date;
  graceDays: number;
  freePlan: PlanDocument | null;
  /** The user's own subscriptions (any status; liveness is checked here). */
  subscriptions: SubscriptionSource[];
  /** ACTIVE school memberships. */
  memberships: SchoolMembershipSource[];
  /** Subscriptions of those schools. */
  schoolSubscriptions: SchoolSubscriptionSource[];
  /** User-held grants, including SCHOOL_SEAT grants. */
  grants: GrantSource[];
  /** School-held grants (applied to the school's ACTIVE staff). */
  schoolGrants: GrantSource[];
}

export type EntitlementSourceKind = "FREE_PLAN" | "SUBSCRIPTION" | "SCHOOL_SUBSCRIPTION" | "GRANT" | "SCHOOL_GRANT";

/** One source that contributed to the result (for "why do I have this?" UIs and support). */
export interface AppliedEntitlementSource {
  kind: EntitlementSourceKind;
  /** Subscription / grant id; `null` for the free plan. */
  id: string | null;
  planCode: string | null;
  grantSource: EntitlementSource | null;
  /** When this source stops applying (`null` = open-ended). */
  endsAt: Date | null;
  /** True for content-scoped grants (they only apply inside their scope). */
  scoped: boolean;
}

/** A content-scoped grant (study pack, scoped promo/staff grant). */
export interface ScopedEntitlement {
  grantId: string;
  source: EntitlementSource;
  studyPackId: string | null;
  scope: ContentScope;
  entitlements: Entitlements;
  endsAt: Date | null;
}

export interface EntitlementResolution {
  /** Merged entitlements of every UNSCOPED source (use {@link entitlementsForSubject} inside a subject). */
  entitlements: Entitlements;
  scoped: ScopedEntitlement[];
  sources: AppliedEntitlementSource[];
  /** Plan to show as "your plan": own subscription, else school, else plan grant, else the free plan. */
  planCode: string | null;
  /** Earliest instant at which a contributing source ends (the result may change then); `null` = none. */
  validUntil: Date | null;
  /** Document problems found while parsing (logged by the loader; never shown to users). */
  issues: string[];
}

function isGrantLive(grant: Pick<GrantSource, "revokedAt" | "startsAt" | "endsAt">, now: Date): boolean {
  return (
    grant.revokedAt === null &&
    grant.startsAt.getTime() <= now.getTime() &&
    (grant.endsAt === null || now.getTime() < grant.endsAt.getTime())
  );
}

function packScope(scopes: StudyPackScopeSource[]): ContentScope {
  const scope = emptyScope();
  for (const row of scopes) {
    if (row.subjectId) scope.subjectIds.push(row.subjectId);
    else if (row.qualificationId) scope.qualificationIds.push(row.qualificationId);
    else if (row.syllabusId) scope.syllabi.push({ syllabusId: row.syllabusId, subjectId: row.syllabusSubjectId });
  }
  return scope;
}

function unionScopes(a: ContentScope, b: ContentScope | null): ContentScope {
  if (b === null) return a;
  const syllabi = [...a.syllabi];
  for (const s of b.syllabi) if (!syllabi.some((x) => x.syllabusId === s.syllabusId)) syllabi.push(s);
  return {
    subjectIds: [...new Set([...a.subjectIds, ...b.subjectIds])],
    qualificationIds: [...new Set([...a.qualificationIds, ...b.qualificationIds])],
    syllabi,
  };
}

/** Entitlements and scope granted by one grant (plan + study pack + explicit features). */
export function grantEntitlements(grant: GrantSource): {
  entitlements: Entitlements;
  scope: ContentScope | null;
  issues: string[];
} {
  const issues: string[] = [];
  const parts: Entitlements[] = [];
  const add = (label: string, raw: unknown): void => {
    const normalized = normalizeEntitlementDocument(raw);
    parts.push(normalized.entitlements);
    for (const issue of normalized.issues) issues.push(`${label}: ${issue}`);
  };
  if (grant.plan) add(`plan ${grant.plan.code}`, grant.plan.entitlements);
  if (grant.studyPack) add(`study pack ${grant.studyPack.id}`, grant.studyPack.entitlements);
  if (grant.features !== null && grant.features !== undefined) add(`grant ${grant.id}`, grant.features);

  let entitlements = mergeEntitlements(...parts);
  const explicit = parseGrantScope(grant.features);
  for (const issue of explicit.issues) issues.push(`grant ${grant.id}: ${issue}`);
  let scope = explicit.scope;

  if (grant.source === "STUDY_PACK" || grant.studyPack !== null) {
    // A study pack always unlocks the full content of its scope (§24); its document adds features and limits.
    // A pack with no scope at all applies to nothing (fail closed), never to everything.
    scope = unionScopes(packScope(grant.studyPack?.scopes ?? []), explicit.scope);
    entitlements = { ...entitlements, lessonAccess: "ALL" };
    if (scopeSize(scope) === 0) issues.push(`grant ${grant.id}: study pack has no scope; it unlocks nothing`);
  }
  return { entitlements, scope, issues };
}

const ROLE_IS_STAFF: Readonly<Record<SchoolMemberRole, boolean>> = { SCHOOL_ADMIN: true, TEACHER: true, STUDENT: false };

function earliest(a: Date | null, b: Date | null): Date | null {
  if (a === null) return b;
  if (b === null) return a;
  return a.getTime() <= b.getTime() ? a : b;
}

/**
 * Pure entitlement resolver (ARCHITECTURE §7.6). Applies every live source, merges unscoped ones and keeps scoped
 * grants apart. Liveness is checked by time here (status alone is never trusted), so a missed lifecycle job never
 * extends access.
 */
export function resolveEntitlements(inputs: EntitlementInputs): EntitlementResolution {
  const { now, graceDays } = inputs;
  const global: Entitlements[] = [];
  const scoped: ScopedEntitlement[] = [];
  const sources: AppliedEntitlementSource[] = [];
  const issues: string[] = [];
  let validUntil: Date | null = null;
  let ownPlan: string | null = null;
  let schoolPlan: string | null = null;
  let grantPlan: string | null = null;

  const addPlan = (plan: PlanDocument): void => {
    const normalized = normalizeEntitlementDocument(plan.entitlements);
    global.push(normalized.entitlements);
    for (const issue of normalized.issues) issues.push(`plan ${plan.code}: ${issue}`);
  };
  const bound = (end: Date | null): void => {
    if (end !== null && end.getTime() > now.getTime()) validUntil = earliest(validUntil, end);
  };

  if (inputs.freePlan) {
    addPlan(inputs.freePlan);
    sources.push({ kind: "FREE_PLAN", id: null, planCode: inputs.freePlan.code, grantSource: null, endsAt: null, scoped: false });
  }

  for (const sub of inputs.subscriptions) {
    if (!isSubscriptionLive(sub, now, graceDays)) continue;
    const endsAt = subscriptionAccessEndsAt(sub, graceDays);
    addPlan(sub.plan);
    bound(endsAt);
    ownPlan ??= sub.plan.code;
    sources.push({ kind: "SUBSCRIPTION", id: sub.id, planCode: sub.plan.code, grantSource: null, endsAt, scoped: false });
  }

  // (b) School subscriptions: staff always; students only with a live seat on that subscription.
  const staffSchools = new Set(inputs.memberships.filter((m) => ROLE_IS_STAFF[m.role]).map((m) => m.schoolId));
  const studentSchools = new Set(inputs.memberships.filter((m) => !ROLE_IS_STAFF[m.role]).map((m) => m.schoolId));
  const liveSeatSubscriptions = new Set(
    inputs.grants
      .filter((g) => g.source === "SCHOOL_SEAT" && g.subscriptionId !== null && isGrantLive(g, now))
      .map((g) => g.subscriptionId as string),
  );
  for (const sub of inputs.schoolSubscriptions) {
    if (!isSubscriptionLive(sub, now, graceDays)) continue;
    const viaStaff = staffSchools.has(sub.schoolId);
    const viaSeat = studentSchools.has(sub.schoolId) && liveSeatSubscriptions.has(sub.id);
    if (!viaStaff && !viaSeat) continue;
    const endsAt = subscriptionAccessEndsAt(sub, graceDays);
    addPlan(sub.plan);
    bound(endsAt);
    schoolPlan ??= sub.plan.code;
    sources.push({ kind: "SCHOOL_SUBSCRIPTION", id: sub.id, planCode: sub.plan.code, grantSource: null, endsAt, scoped: false });
  }

  // (c) Grants. SCHOOL_SEAT grants were consumed above (they unlock the funding subscription's plan).
  const applyGrant = (grant: GrantSource, kind: "GRANT" | "SCHOOL_GRANT"): void => {
    if (grant.source === "SCHOOL_SEAT" || !isGrantLive(grant, now)) return;
    const resolved = grantEntitlements(grant);
    issues.push(...resolved.issues);
    bound(grant.endsAt);
    if (resolved.scope === null) {
      global.push(resolved.entitlements);
      if (grant.plan) grantPlan ??= grant.plan.code;
    } else {
      scoped.push({
        grantId: grant.id,
        source: grant.source,
        studyPackId: grant.studyPack?.id ?? null,
        scope: resolved.scope,
        entitlements: resolved.entitlements,
        endsAt: grant.endsAt,
      });
    }
    sources.push({
      kind,
      id: grant.id,
      planCode: grant.plan?.code ?? null,
      grantSource: grant.source,
      endsAt: grant.endsAt,
      scoped: resolved.scope !== null,
    });
  };
  for (const grant of inputs.grants) applyGrant(grant, "GRANT");
  if (staffSchools.size > 0) for (const grant of inputs.schoolGrants) applyGrant(grant, "SCHOOL_GRANT");

  return {
    entitlements: mergeEntitlements(...global),
    scoped,
    sources,
    planCode: ownPlan ?? schoolPlan ?? grantPlan ?? inputs.freePlan?.code ?? null,
    validUntil,
    issues,
  };
}

/** Entitlements inside one subject: the global result merged with every scoped grant covering that subject. */
export function entitlementsForSubject(resolution: Pick<EntitlementResolution, "entitlements" | "scoped">, subject: SubjectRef): Entitlements {
  const matching = resolution.scoped.filter((s) => scopeCoversSubject(s.scope, subject)).map((s) => s.entitlements);
  return matching.length === 0 ? resolution.entitlements : mergeEntitlements(resolution.entitlements, ...matching);
}

/**
 * Live school subscriptions where the user is an ACTIVE student without a live seat: candidates for automatic seat
 * allocation (pure).
 */
export function seatClaimCandidates(inputs: EntitlementInputs): SchoolSubscriptionSource[] {
  const studentSchools = new Set(inputs.memberships.filter((m) => m.role === "STUDENT").map((m) => m.schoolId));
  const seated = new Set(
    inputs.grants
      .filter((g) => g.source === "SCHOOL_SEAT" && g.subscriptionId !== null && isGrantLive(g, inputs.now))
      .map((g) => g.subscriptionId as string),
  );
  return inputs.schoolSubscriptions.filter(
    (sub) =>
      studentSchools.has(sub.schoolId) &&
      !seated.has(sub.id) &&
      sub.seats !== null &&
      isSubscriptionLive(sub, inputs.now, inputs.graceDays),
  );
}

// =====================================================================================================================
// Feature and limit checks (pure)
// =====================================================================================================================

/** True when `entitlements` include `feature` (contract key or registry alias). */
export function hasFeature(entitlements: Entitlements, feature: EntitlementFeature): boolean {
  if (isBooleanFeature(feature)) return entitlements[feature];
  const alias: FeatureAlias = FEATURE_ALIASES[feature];
  switch (alias.kind) {
    case "flag":
      return entitlements[alias.key];
    case "lessons":
      return entitlements.lessonAccess === "ALL";
    case "unlimited":
      return entitlements[alias.key] === null;
    case "tier":
      return entitlements.aiMaxModelTier === alias.tier;
    case "allowance": {
      const value = entitlements[alias.key];
      return value === null || value > 0;
    }
  }
}

/** Outcome of a numeric limit check. `limit`/`remaining` are `null` when unlimited. */
export interface LimitCheck {
  feature: LimitFeature;
  limit: number | null;
  used: number;
  remaining: number | null;
  /** True when `used + increment <= limit` (or unlimited). */
  allowed: boolean;
}

/** Pure limit arithmetic: may an action consuming `increment` units proceed after `used` units? */
export function evaluateLimit(feature: LimitFeature, limit: number | null, used: number, increment = 1): LimitCheck {
  const safeUsed = Math.max(0, Math.floor(used));
  const allowed = limit === null || safeUsed + Math.max(0, increment) <= limit;
  return { feature, limit, used: safeUsed, remaining: remainingAllowance(limit, safeUsed), allowed };
}

const FEATURE_LABELS: Readonly<Record<BooleanFeature, string>> = {
  dailyQuestion: "the daily question",
  diagnosticTest: "diagnostic tests",
  mockExams: "mock exams",
  flashcards: "flashcards",
  studyPlan: "study plans",
  examCountdown: "the exam countdown",
  aiTutor: "the AI tutor",
  aiImageUploads: "photo uploads to the AI tutor",
  personalisedLearning: "personalised learning",
  advancedAnalytics: "advanced analytics",
  leaderboards: "leaderboards",
  parentReports: "parent reports",
  pdfExport: "PDF export",
  teacherDashboard: "the teacher dashboard",
  studentManagement: "student management",
  assignments: "assignments",
  schoolAnalytics: "school analytics",
};

const ALIAS_LABELS: Readonly<Partial<Record<FeatureAliasKey, string>>> = {
  "lessons.full": "full lessons",
  "practice.unlimited": "unlimited practice",
  ai_solver: "the AI solver",
  ai_deep: "advanced AI",
};

const SCHOOL_FEATURES: ReadonlySet<BooleanFeature> = new Set<BooleanFeature>([
  "teacherDashboard",
  "studentManagement",
  "assignments",
  "schoolAnalytics",
]);

const LIMIT_COPY: Readonly<Record<LimitFeature, { one: string; many: string; period: string; reset: string }>> = {
  practiceQuestionsPerDay: { one: "practice question", many: "practice questions", period: "today", reset: "tomorrow" },
  topicTestsPerWeek: { one: "topic test", many: "topic tests", period: "this week", reset: "next week" },
  mockExamsPerMonth: { one: "mock exam", many: "mock exams", period: "this month", reset: "next month" },
  aiMessagesPerDay: { one: "AI tutor message", many: "AI tutor messages", period: "today", reset: "tomorrow" },
  aiSolverPerDay: { one: "AI solver request", many: "AI solver requests", period: "today", reset: "tomorrow" },
};

/** User-facing name of a feature, e.g. "mock exams". */
export function featureLabel(feature: EntitlementFeature | LimitFeature): string {
  if (Object.hasOwn(LIMIT_COPY, feature)) return LIMIT_COPY[feature as LimitFeature].many;
  if (isBooleanFeature(feature)) return FEATURE_LABELS[feature];
  const alias: FeatureAlias = FEATURE_ALIASES[feature as FeatureAliasKey];
  return ALIAS_LABELS[feature as FeatureAliasKey] ?? (alias.kind === "flag" ? FEATURE_LABELS[alias.key] : "this feature");
}

function upgradePathFor(feature: EntitlementFeature | LimitFeature): string {
  const key = isFeatureAlias(feature) ? FEATURE_ALIASES[feature] : null;
  const canonical = key && key.kind === "flag" ? key.key : feature;
  return SCHOOL_FEATURES.has(canonical as BooleanFeature) ? SCHOOL_UPGRADE_PATH : UPGRADE_PATH;
}

/**
 * Thrown when the user's plan does not include a feature (`ENTITLEMENT_REQUIRED`, HTTP 403: clients show an upgrade
 * prompt). `feature` and `upgradePath` are available to server code that catches it; clients get code + message.
 */
export class EntitlementRequiredError extends AppError {
  readonly feature: EntitlementFeature | LimitFeature;
  readonly upgradePath: string;

  constructor(feature: EntitlementFeature | LimitFeature) {
    const upgradePath = upgradePathFor(feature);
    const label = featureLabel(feature);
    const message =
      upgradePath === SCHOOL_UPGRADE_PATH
        ? `Your current plan doesn't include ${label}. It comes with a school subscription.`
        : `Your current plan doesn't include ${label}. Unlock full access to get it.`;
    super("ENTITLEMENT_REQUIRED", message, { details: { feature, upgradePath } });
    this.name = "EntitlementRequiredError";
    this.feature = feature;
    this.upgradePath = upgradePath;
  }
}

/** Thrown when a plan limit is used up (`QUOTA_EXCEEDED`, HTTP 429 with `Retry-After` when the reset time is known). */
export class LimitReachedError extends AppError {
  readonly feature: LimitFeature;
  readonly limit: number;
  readonly used: number;
  readonly upgradePath: string;

  constructor(check: LimitCheck & { limit: number }, resetsAt?: Date, now: Date = new Date()) {
    const copy = LIMIT_COPY[check.feature];
    const noun = check.limit === 1 ? copy.one : copy.many;
    const message =
      `You've reached your plan's limit of ${check.limit} ${noun} ${copy.period}. ` +
      `Unlock full access for more, or come back ${copy.reset}.`;
    const retryAfterSeconds =
      resetsAt === undefined ? undefined : Math.max(1, Math.ceil((resetsAt.getTime() - now.getTime()) / 1000));
    super("QUOTA_EXCEEDED", message, {
      details: { feature: check.feature, limit: check.limit, used: check.used },
      ...(retryAfterSeconds === undefined ? {} : { retryAfterSeconds }),
    });
    this.name = "LimitReachedError";
    this.feature = check.feature;
    this.limit = check.limit;
    this.used = check.used;
    this.upgradePath = UPGRADE_PATH;
  }
}

// =====================================================================================================================
// Database loading and caching
// =====================================================================================================================

const uuidSchema = z.uuid();

function assertUuid(value: string, field: string): void {
  if (!uuidSchema.safeParse(value).success) throw AppError.validation({ [field]: ["Invalid id."] });
}

const graceDaysSchema = z.number().int().min(0).max(60);

/** Grace period in days after `currentPeriodEnd` (Setting `billing.graceDays`, default {@link DEFAULT_GRACE_DAYS}). */
export function getBillingGraceDays(): Promise<number> {
  return getSetting(GRACE_DAYS_SETTING_KEY, graceDaysSchema, DEFAULT_GRACE_DAYS);
}

const loadDefaultPlan = memoizeAsync(
  async (): Promise<PlanDocument | null> => {
    const select = { code: true, entitlements: true } as const;
    const plan =
      (await db.plan.findFirst({ where: { isDefault: true, isActive: true }, select })) ??
      (await db.plan.findFirst({ where: { code: FREE_PLAN_CODE, isActive: true }, select }));
    if (!plan) logger.warn("billing: no default (FREE) plan configured; users without a paid source get no entitlements");
    return plan;
  },
  { ttlMs: ENTITLEMENT_CACHE_TTL_MS, maxEntries: 1 },
);

const PLAN_SELECT = { select: { code: true, entitlements: true } } as const;

const SUBSCRIPTION_SELECT = {
  id: true,
  status: true,
  currentPeriodEnd: true,
  trialEndsAt: true,
  cancelAtPeriodEnd: true,
  plan: PLAN_SELECT,
} as const satisfies Prisma.SubscriptionSelect;

const GRANT_SELECT = {
  id: true,
  source: true,
  subscriptionId: true,
  startsAt: true,
  endsAt: true,
  revokedAt: true,
  features: true,
  plan: PLAN_SELECT,
  studyPack: {
    select: {
      id: true,
      entitlements: true,
      scopes: { select: { subjectId: true, qualificationId: true, syllabusId: true, syllabus: { select: { subjectId: true } } } },
    },
  },
} as const satisfies Prisma.EntitlementGrantSelect;

type GrantRow = Prisma.EntitlementGrantGetPayload<{ select: typeof GRANT_SELECT }>;

function toGrantSource(row: GrantRow): GrantSource {
  return {
    id: row.id,
    source: row.source,
    subscriptionId: row.subscriptionId,
    startsAt: row.startsAt,
    endsAt: row.endsAt,
    revokedAt: row.revokedAt,
    plan: row.plan,
    features: row.features,
    studyPack: row.studyPack
      ? {
          id: row.studyPack.id,
          entitlements: row.studyPack.entitlements,
          scopes: row.studyPack.scopes.map((s) => ({
            subjectId: s.subjectId,
            qualificationId: s.qualificationId,
            syllabusId: s.syllabusId,
            syllabusSubjectId: s.syllabus?.subjectId ?? null,
          })),
        }
      : null,
  };
}

function liveGrantWhere(holder: Prisma.EntitlementGrantWhereInput, now: Date): Prisma.EntitlementGrantWhereInput {
  return { ...holder, revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] };
}

async function loadUserGrants(userId: string, now: Date): Promise<GrantSource[]> {
  // EntitlementGrant(userId, endsAt) index.
  const rows = await db.entitlementGrant.findMany({ where: liveGrantWhere({ userId }, now), select: GRANT_SELECT });
  return rows.map(toGrantSource);
}

async function loadInputs(userId: string, now: Date): Promise<EntitlementInputs> {
  const liveStatuses = [...LIVE_SUBSCRIPTION_STATUSES];
  const [freePlan, graceDays, subscriptions, memberships, grants] = await Promise.all([
    loadDefaultPlan(),
    getBillingGraceDays(),
    // Subscription(holderUserId, status) index.
    db.subscription.findMany({ where: { holderUserId: userId, status: { in: liveStatuses } }, select: SUBSCRIPTION_SELECT }),
    // SchoolMember(userId, status) index.
    db.schoolMember.findMany({ where: { userId, status: "ACTIVE" }, select: { schoolId: true, role: true } }),
    loadUserGrants(userId, now),
  ]);

  const schoolIds = [...new Set(memberships.map((m) => m.schoolId))];
  const staffSchoolIds = [...new Set(memberships.filter((m) => ROLE_IS_STAFF[m.role]).map((m) => m.schoolId))];
  const [schoolSubscriptions, schoolGrantRows] =
    schoolIds.length === 0
      ? [[], []]
      : await Promise.all([
          // Subscription(schoolId, status) index; only verified, operating schools grant access.
          db.subscription.findMany({
            where: { schoolId: { in: schoolIds }, status: { in: liveStatuses }, school: { status: "ACTIVE" } },
            select: { ...SUBSCRIPTION_SELECT, schoolId: true, seats: true },
          }),
          staffSchoolIds.length === 0
            ? Promise.resolve([] as GrantRow[])
            : // EntitlementGrant(schoolId, endsAt) index.
              db.entitlementGrant.findMany({
                where: liveGrantWhere({ schoolId: { in: staffSchoolIds } }, now),
                select: GRANT_SELECT,
              }),
        ]);

  return {
    now,
    graceDays,
    freePlan,
    subscriptions,
    memberships,
    schoolSubscriptions: schoolSubscriptions.flatMap((s) => (s.schoolId === null ? [] : [{ ...s, schoolId: s.schoolId }])),
    grants,
    schoolGrants: schoolGrantRows.map(toGrantSource),
  };
}

/** A user's resolved entitlements (see {@link getEntitlements}). */
export interface ResolvedEntitlements extends EntitlementResolution {
  userId: string;
  computedAt: Date;
}

async function loadEntitlements(userId: string): Promise<ResolvedEntitlements> {
  const now = new Date();
  let inputs = await loadInputs(userId, now);

  // B2B2C: an ACTIVE student of a school with a live subscription claims a free seat on first resolution.
  const candidates = seatClaimCandidates(inputs);
  if (candidates.length > 0) {
    let claimed = false;
    for (const sub of candidates) {
      const result = await allocateSchoolSeat(sub.id, userId, { now, onlyIfAvailable: true });
      if (result.status === "ALLOCATED") claimed = true;
    }
    if (claimed) inputs = { ...inputs, grants: await loadUserGrants(userId, now) };
  }

  const resolution = resolveEntitlements(inputs);
  if (resolution.issues.length > 0) {
    logger.warn("billing: entitlement documents have problems (failing closed per key)", { issues: resolution.issues.slice(0, 20) });
  }
  return { ...resolution, userId, computedAt: now };
}

const instanceCache = createCache<string, ResolvedEntitlements>({ maxEntries: 5_000, ttlMs: ENTITLEMENT_CACHE_TTL_MS });

/** Teaching tenants' own entitlements (assignment sponsorship, see {@link getTenantEntitlements}). */
interface TenantEntitlements {
  entitlements: Entitlements;
  validUntil: Date | null;
}

const tenantCache = createCache<string, TenantEntitlements>({ maxEntries: 2_000, ttlMs: ENTITLEMENT_CACHE_TTL_MS });

function tenantKey(tenant: ClassTenantRef): string {
  return tenant.schoolId !== null ? `school:${tenant.schoolId}` : `tutor:${tenant.createdById}`;
}

async function getInstanceCached(userId: string): Promise<ResolvedEntitlements> {
  const hit = instanceCache.get(userId);
  if (hit && (hit.validUntil === null || Date.now() < hit.validUntil.getTime())) return hit;
  if (hit) instanceCache.delete(userId);
  return instanceCache.getOrLoad(userId, () => loadEntitlements(userId));
}

const getPerRequest = cache(getInstanceCached);

/**
 * Resolves a user's entitlements from every source (module doc). Memoised per request and cached per instance for up
 * to {@link ENTITLEMENT_CACHE_TTL_MS} (never past the earliest source expiry).
 *
 * @throws AppError VALIDATION for a malformed user id.
 */
export async function getEntitlements(userId: string): Promise<ResolvedEntitlements> {
  assertUuid(userId, "userId");
  return getPerRequest(userId);
}

/**
 * Drops cached entitlements on THIS instance: one user's, or everyone's when `userId` is omitted (school subscription
 * and seat changes affect many users). Call after payments, subscription changes and grant writes.
 */
export function invalidateEntitlements(userId?: string): void {
  if (userId === undefined) {
    instanceCache.clear();
    tenantCache.clear();
  } else {
    instanceCache.delete(userId);
    tenantCache.delete(tenantKey({ schoolId: null, createdById: userId }));
  }
}

/** Clears every billing cache on this instance (entitlements, default plan, subject lookups). Tests and admin tools. */
export function clearEntitlementCaches(): void {
  instanceCache.clear();
  tenantCache.clear();
  loadDefaultPlan.clear();
  loadSubjectRef.clear();
}

// =====================================================================================================================
// Assignment sponsorship (§22 assignments are a SCHOOL-plan feature, §31): who pays for a class's assigned work
// =====================================================================================================================

/** A class's tenant: its school, or (school-less class) the independent tutor who created it. */
export interface ClassTenantRef {
  /** Class.schoolId. */
  schoolId: string | null;
  /** Class.createdById: the tutor of a school-less class (ignored for school classes). */
  createdById: string;
}

async function loadTenantEntitlements(tenant: ClassTenantRef): Promise<TenantEntitlements> {
  const now = new Date();
  const liveStatuses = [...LIVE_SUBSCRIPTION_STATUSES];
  let inputs: EntitlementInputs;
  if (tenant.schoolId !== null) {
    const schoolId = tenant.schoolId;
    const [graceDays, subscriptions, grants] = await Promise.all([
      getBillingGraceDays(),
      // Subscription(schoolId, status) index; only verified, operating schools grant access (as in loadInputs).
      db.subscription.findMany({
        where: { schoolId, status: { in: liveStatuses }, school: { status: "ACTIVE" } },
        select: { ...SUBSCRIPTION_SELECT, schoolId: true, seats: true },
      }),
      // EntitlementGrant(schoolId, endsAt) index.
      db.entitlementGrant.findMany({ where: liveGrantWhere({ schoolId }, now), select: GRANT_SELECT }),
    ]);
    // Resolved as the school's own staff would be: its live school subscriptions and school-held grants only.
    inputs = {
      now,
      graceDays,
      freePlan: null,
      subscriptions: [],
      memberships: [{ schoolId, role: "SCHOOL_ADMIN" }],
      schoolSubscriptions: subscriptions.flatMap((s) => (s.schoolId === null ? [] : [{ ...s, schoolId: s.schoolId }])),
      grants: [],
      schoolGrants: grants.map(toGrantSource),
    };
  } else {
    const userId = tenant.createdById;
    const [freePlan, graceDays, subscriptions, grants] = await Promise.all([
      loadDefaultPlan(),
      getBillingGraceDays(),
      // Subscription(holderUserId, status) index.
      db.subscription.findMany({ where: { holderUserId: userId, status: { in: liveStatuses } }, select: SUBSCRIPTION_SELECT }),
      loadUserGrants(userId, now),
    ]);
    // The tutor's OWN sources only: school memberships are left out on purpose, so a school's plan never pays for its
    // teachers' private classes.
    inputs = { now, graceDays, freePlan, subscriptions, memberships: [], schoolSubscriptions: [], grants, schoolGrants: [] };
  }
  const resolution = resolveEntitlements(inputs);
  return { entitlements: resolution.entitlements, validUntil: resolution.validUntil };
}

/**
 * Entitlements a teaching tenant holds itself: a school's live school subscriptions and school-held grants, or an
 * independent tutor's own subscriptions, grants and the default plan (never a school's plan). Cached per instance like
 * {@link getEntitlements}.
 */
export async function getTenantEntitlements(tenant: ClassTenantRef): Promise<Entitlements> {
  if (tenant.schoolId !== null) assertUuid(tenant.schoolId, "schoolId");
  else assertUuid(tenant.createdById, "createdById");
  const key = tenantKey(tenant);
  const hit = tenantCache.get(key);
  if (hit && (hit.validUntil === null || Date.now() < hit.validUntil.getTime())) return hit.entitlements;
  if (hit) tenantCache.delete(key);
  return (await tenantCache.getOrLoad(key, () => loadTenantEntitlements(tenant))).entitlements;
}

/**
 * True when a class's tenant pays for its students' assignment work (§22 under the §31 SCHOOL plan): the tenant holds
 * the `assignments` entitlement ({@link getTenantEntitlements}). Only then is assigned work exempt from the student's
 * own plan gates and allowances (premium lessons, tests and practice pools, mock exams, daily / weekly / monthly
 * limits). Unsponsored assignment work (e.g. a free self-registered tutor's class) is gated and counted exactly like
 * the student's own work, so assigning paid content can never unlock it for free.
 */
export async function assignmentWorkSponsored(tenant: ClassTenantRef): Promise<boolean> {
  return hasFeature(await getTenantEntitlements(tenant), "assignments");
}

const loadSubjectRef = memoizeAsync(
  async (subjectId: string): Promise<SubjectRef | null> => {
    const subject = await db.subject.findUnique({ where: { id: subjectId }, select: { id: true, qualificationId: true } });
    return subject ? { subjectId: subject.id, qualificationId: subject.qualificationId } : null;
  },
  { ttlMs: 5 * 60_000, maxEntries: 2_000 },
);

/** Optional subject context: scoped grants (study packs) apply only inside their subjects. */
export interface SubjectContext {
  subjectId?: string;
  /** Syllabus version being viewed (exact match for version-scoped packs). */
  syllabusId?: string | null;
}

/**
 * Effective entitlements of `userId` inside a subject: global sources plus scoped grants (study packs) covering it.
 * Unknown subjects get the global entitlements only.
 */
export async function getSubjectEntitlements(userId: string, subjectId: string, options: { syllabusId?: string | null } = {}): Promise<Entitlements> {
  assertUuid(subjectId, "subjectId");
  if (options.syllabusId) assertUuid(options.syllabusId, "syllabusId");
  const resolved = await getEntitlements(userId);
  if (resolved.scoped.length === 0) return resolved.entitlements;
  const subject = await loadSubjectRef(subjectId);
  if (!subject) return resolved.entitlements;
  return entitlementsForSubject(resolved, { ...subject, syllabusId: options.syllabusId ?? null });
}

async function effectiveEntitlements(userId: string, context: SubjectContext | undefined): Promise<Entitlements> {
  if (context?.subjectId) {
    return getSubjectEntitlements(userId, context.subjectId, { syllabusId: context.syllabusId ?? null });
  }
  return (await getEntitlements(userId)).entitlements;
}

/**
 * True when `userId` may open the full (premium) content of a subject: an unscoped source with full lesson access, or
 * a study pack / scoped grant covering the subject. Free-preview lessons are always open and do not need this check.
 */
export async function canAccessSubjectContent(
  userId: string,
  subjectId: string,
  options: { syllabusId?: string | null } = {},
): Promise<boolean> {
  return (await getSubjectEntitlements(userId, subjectId, options)).lessonAccess === "ALL";
}

/**
 * Gate a feature (CLAUDE.md rule 9). Pass `subjectId` when acting inside a subject so study packs count.
 *
 * @returns the effective entitlements (handy for follow-up limit checks)
 * @throws EntitlementRequiredError (`ENTITLEMENT_REQUIRED`) with a friendly message and `upgradePath`
 * @example await assertEntitlement(actor, "mock_exams", { subjectId });
 */
export async function assertEntitlement(
  actor: { userId: string },
  feature: EntitlementFeature,
  context?: SubjectContext,
): Promise<Entitlements> {
  const entitlements = await effectiveEntitlements(actor.userId, context);
  if (!hasFeature(entitlements, feature)) throw new EntitlementRequiredError(feature);
  return entitlements;
}

/** Non-throwing variant of {@link assertEntitlement}. */
export async function hasEntitlement(actor: { userId: string }, feature: EntitlementFeature, context?: SubjectContext): Promise<boolean> {
  return hasFeature(await effectiveEntitlements(actor.userId, context), feature);
}

export interface LimitOptions extends SubjectContext {
  /** Units the pending action consumes (default 1; e.g. "Think harder" counts 2). */
  increment?: number;
}

/**
 * Checks a numeric plan limit against the caller-supplied usage (see `src/server/billing/usage.ts` for counters).
 * Does not throw; use {@link assertWithinLimit} to gate.
 */
export async function checkLimit(
  actor: { userId: string },
  feature: LimitFeature,
  usedCount: number,
  options: LimitOptions = {},
): Promise<LimitCheck> {
  const entitlements = await effectiveEntitlements(actor.userId, options);
  return evaluateLimit(feature, entitlements[feature], usedCount, options.increment ?? 1);
}

/**
 * Gates an action against a numeric plan limit.
 *
 * @throws EntitlementRequiredError when the plan allows none at all (limit 0)
 * @throws LimitReachedError (`QUOTA_EXCEEDED`) when the allowance is used up; pass `resetsAt` (from `limitWindow()` in
 *         ./usage) to send `Retry-After`
 */
export async function assertWithinLimit(
  actor: { userId: string },
  feature: LimitFeature,
  usedCount: number,
  options: LimitOptions & { resetsAt?: Date } = {},
): Promise<LimitCheck> {
  const check = await checkLimit(actor, feature, usedCount, options);
  if (check.allowed) return check;
  if (check.limit === 0) throw new EntitlementRequiredError(feature);
  throw new LimitReachedError({ ...check, limit: check.limit ?? 0 }, options.resetsAt);
}

// =====================================================================================================================
// School seats (B2B2C, §53): EntitlementGrant(SCHOOL_SEAT) rows <= Subscription.seats, under a row lock
// =====================================================================================================================

export type SeatAllocation =
  | { status: "ALLOCATED"; grantId: string }
  | { status: "EXISTING"; grantId: string }
  | { status: "FULL"; seats: number; used: number }
  | { status: "NOT_ELIGIBLE"; reason: "NOT_A_SCHOOL_SUBSCRIPTION" | "SUBSCRIPTION_NOT_LIVE" | "NOT_AN_ACTIVE_STUDENT" };

/**
 * Gives `userId` (an ACTIVE student member of the subscription's school) a seat on a live school subscription.
 * Idempotent (returns the existing seat). The seat cap is enforced under `SELECT ... FOR UPDATE` on the subscription;
 * the database additionally allows one active seat per (subscription, user) and checks membership (trigger).
 *
 * `onlyIfAvailable` (used by automatic allocation) first does a lock-free count and returns FULL without locking.
 */
export async function allocateSchoolSeat(
  subscriptionId: string,
  userId: string,
  options: { now?: Date; onlyIfAvailable?: boolean } = {},
): Promise<SeatAllocation> {
  assertUuid(subscriptionId, "subscriptionId");
  assertUuid(userId, "userId");
  const now = options.now ?? new Date();
  const seatWhere = { subscriptionId, source: "SCHOOL_SEAT", revokedAt: null } as const;

  if (options.onlyIfAvailable) {
    const [sub, used] = await Promise.all([
      db.subscription.findUnique({ where: { id: subscriptionId }, select: { seats: true } }),
      db.entitlementGrant.count({ where: seatWhere }), // EntitlementGrant(subscriptionId, revokedAt) index
    ]);
    if (sub?.seats === null || sub?.seats === undefined) return { status: "NOT_ELIGIBLE", reason: "NOT_A_SCHOOL_SUBSCRIPTION" };
    if (used >= sub.seats) return { status: "FULL", seats: sub.seats, used };
  }

  const graceDays = await getBillingGraceDays();
  let result: SeatAllocation;
  try {
    result = await db.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Subscription" WHERE "id" = ${subscriptionId}::uuid FOR UPDATE`;
      const sub = await tx.subscription.findUnique({
        where: { id: subscriptionId },
        select: { schoolId: true, seats: true, planId: true, status: true, currentPeriodEnd: true, trialEndsAt: true, cancelAtPeriodEnd: true },
      });
      if (!sub || sub.schoolId === null || sub.seats === null) {
        return { status: "NOT_ELIGIBLE", reason: "NOT_A_SCHOOL_SUBSCRIPTION" } as const;
      }
      if (!isSubscriptionLive(sub, now, graceDays)) return { status: "NOT_ELIGIBLE", reason: "SUBSCRIPTION_NOT_LIVE" } as const;
      const member = await tx.schoolMember.findUnique({
        where: { schoolId_userId_role: { schoolId: sub.schoolId, userId, role: "STUDENT" } },
        select: { status: true },
      });
      if (member?.status !== "ACTIVE") return { status: "NOT_ELIGIBLE", reason: "NOT_AN_ACTIVE_STUDENT" } as const;
      const existing = await tx.entitlementGrant.findFirst({ where: { ...seatWhere, userId }, select: { id: true } });
      if (existing) return { status: "EXISTING", grantId: existing.id } as const;
      const used = await tx.entitlementGrant.count({ where: seatWhere });
      if (used >= sub.seats) return { status: "FULL", seats: sub.seats, used } as const;
      const grant = await tx.entitlementGrant.create({
        data: { userId, source: "SCHOOL_SEAT", subscriptionId, planId: sub.planId, startsAt: now },
        select: { id: true },
      });
      return { status: "ALLOCATED", grantId: grant.id } as const;
    });
  } catch (error) {
    // A concurrent allocation for the same student won the partial unique index: return that seat.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const existing = await db.entitlementGrant.findFirst({ where: { ...seatWhere, userId }, select: { id: true } });
      if (existing) return { status: "EXISTING", grantId: existing.id };
    }
    throw error;
  }
  if (result.status === "ALLOCATED") invalidateEntitlements(userId);
  return result;
}

/**
 * Revokes a student's seat on a school subscription (student left, or the school reassigns seats).
 *
 * @returns true when an active seat was revoked
 */
export async function releaseSchoolSeat(subscriptionId: string, userId: string, reason: string, now: Date = new Date()): Promise<boolean> {
  assertUuid(subscriptionId, "subscriptionId");
  assertUuid(userId, "userId");
  const updated = await db.entitlementGrant.updateMany({
    where: { subscriptionId, userId, source: "SCHOOL_SEAT", revokedAt: null },
    data: { revokedAt: now, revokeReason: reason.trim().slice(0, 500) || "released" },
  });
  if (updated.count > 0) invalidateEntitlements(userId);
  return updated.count > 0;
}

/**
 * Lifecycle sweep (billing.lifecycle job): revokes seats whose holder is no longer an ACTIVE student of the school or
 * whose funding subscription has ended, so seats return to the pool. Idempotent.
 *
 * @param options.subscriptionIds - limit the sweep to these subscriptions (targeted runs and tests)
 * @returns the number of seats released
 */
export async function releaseStaleSchoolSeats(options: { now?: Date; subscriptionIds?: readonly string[] } = {}): Promise<number> {
  const now = options.now ?? new Date();
  const ids = options.subscriptionIds;
  if (ids !== undefined) {
    if (ids.length === 0) return 0;
    for (const id of ids) assertUuid(id, "subscriptionId");
  }
  const only = ids === undefined ? Prisma.empty : Prisma.sql`AND s."id" IN (${Prisma.join(ids.map((id) => Prisma.sql`${id}::uuid`))})`;
  // Driven from the (few) school subscriptions; seat rows are reached through EntitlementGrant(subscriptionId, revokedAt).
  const released = await db.$queryRaw<{ userId: string }[]>`
    UPDATE "EntitlementGrant" g
       SET "revokedAt" = ${now}, "revokeReason" = 'seat_released: membership or subscription ended', "updatedAt" = ${now}
      FROM "Subscription" s
     WHERE g."subscriptionId" = s."id"
       AND s."schoolId" IS NOT NULL
       ${only}
       AND g."source" = 'SCHOOL_SEAT'
       AND g."revokedAt" IS NULL
       AND (s."status" IN ('CANCELLED', 'EXPIRED')
            OR NOT EXISTS (SELECT 1 FROM "SchoolMember" m
                            WHERE m."schoolId" = s."schoolId" AND m."userId" = g."userId"
                              AND m."role" = 'STUDENT' AND m."status" = 'ACTIVE'))
    RETURNING g."userId"`;
  for (const row of released) invalidateEntitlements(row.userId);
  return released.length;
}
