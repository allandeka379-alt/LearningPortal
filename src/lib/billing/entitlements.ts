import { z } from "zod";
import { AI_MODEL_TIERS, type AiModelTier } from "./ai-tiers";

/**
 * Entitlements contract (§31 subscriptions, §40 AI cost control, §46 free acquisition features).
 *
 * A Plan stores an `entitlements` JSON document validated by `entitlementsSchema`. Prices and limits live in the DB
 * and are edited from the admin panel — this file only defines the SHAPE, the merge rules and the feature keys.
 *
 * Conventions:
 * - Boolean flags gate a feature on/off.
 * - Numeric limits: `null` means unlimited; `0` means none.
 * - When a user has several sources (own subscription, school subscription, grants), `mergeEntitlements` takes the
 *   most generous value per key.
 */

export { AI_MODEL_TIERS, type AiModelTier };

const limit = z.number().int().min(0).nullable();

export const entitlementsSchema = z.object({
  /** Lesson access: FREE_ONLY = lessons flagged as free previews only. */
  lessonAccess: z.enum(["FREE_ONLY", "ALL"]),
  practiceQuestionsPerDay: limit,
  dailyQuestion: z.boolean(),
  diagnosticTest: z.boolean(),
  topicTestsPerWeek: limit,
  mockExams: z.boolean(),
  mockExamsPerMonth: limit,
  flashcards: z.boolean(),
  studyPlan: z.boolean(),
  examCountdown: z.boolean(),
  aiTutor: z.boolean(),
  aiMessagesPerDay: limit,
  aiSolverPerDay: limit,
  aiImageUploads: z.boolean(),
  /** Highest model tier this plan may be routed to (routing may still pick a cheaper tier). */
  aiMaxModelTier: z.enum(AI_MODEL_TIERS),
  personalisedLearning: z.boolean(),
  advancedAnalytics: z.boolean(),
  leaderboards: z.boolean(),
  parentReports: z.boolean(),
  pdfExport: z.boolean(),
  // School (B2B) capabilities
  teacherDashboard: z.boolean(),
  studentManagement: z.boolean(),
  assignments: z.boolean(),
  schoolAnalytics: z.boolean(),
});

export type Entitlements = z.infer<typeof entitlementsSchema>;
export type BooleanFeature = {
  [K in keyof Entitlements]: Entitlements[K] extends boolean ? K : never;
}[keyof Entitlements];
export type LimitFeature = {
  [K in keyof Entitlements]: Entitlements[K] extends number | null ? K : never;
}[keyof Entitlements];

/** Entitlements of an anonymous visitor / user with no plan at all (most restrictive). */
export const NO_ENTITLEMENTS: Entitlements = {
  lessonAccess: "FREE_ONLY",
  practiceQuestionsPerDay: 0,
  dailyQuestion: false,
  diagnosticTest: false,
  topicTestsPerWeek: 0,
  mockExams: false,
  mockExamsPerMonth: 0,
  flashcards: false,
  studyPlan: false,
  examCountdown: false,
  aiTutor: false,
  aiMessagesPerDay: 0,
  aiSolverPerDay: 0,
  aiImageUploads: false,
  aiMaxModelTier: "FAST",
  personalisedLearning: false,
  advancedAnalytics: false,
  leaderboards: false,
  parentReports: false,
  pdfExport: false,
  teacherDashboard: false,
  studentManagement: false,
  assignments: false,
  schoolAnalytics: false,
};

const TIER_RANK: Record<AiModelTier, number> = { FAST: 0, STANDARD: 1, DEEP: 2 };

function moreGenerousLimit(a: number | null, b: number | null): number | null {
  if (a === null || b === null) return null;
  return Math.max(a, b);
}

/**
 * Combine entitlement documents from several sources, taking the most generous value per key.
 * Unknown/invalid documents must be validated with `parseEntitlements` before merging.
 */
export function mergeEntitlements(...sources: Entitlements[]): Entitlements {
  return sources.reduce<Entitlements>((acc, e) => {
    const out = { ...acc };
    for (const key of Object.keys(e) as (keyof Entitlements)[]) {
      const a = acc[key];
      const b = e[key];
      if (typeof a === "boolean" && typeof b === "boolean") {
        (out as Record<string, unknown>)[key] = a || b;
      } else if (key === "lessonAccess") {
        out.lessonAccess = acc.lessonAccess === "ALL" || e.lessonAccess === "ALL" ? "ALL" : "FREE_ONLY";
      } else if (key === "aiMaxModelTier") {
        out.aiMaxModelTier = TIER_RANK[e.aiMaxModelTier] > TIER_RANK[acc.aiMaxModelTier] ? e.aiMaxModelTier : acc.aiMaxModelTier;
      } else {
        (out as Record<string, unknown>)[key] = moreGenerousLimit(a as number | null, b as number | null);
      }
    }
    return out;
  }, NO_ENTITLEMENTS);
}

/**
 * Parse a stored entitlements document. Missing keys fall back to NO_ENTITLEMENTS (fail closed), so adding a new
 * feature key never accidentally grants it to existing plans.
 */
export function parseEntitlements(raw: unknown): Entitlements {
  const base = typeof raw === "object" && raw !== null ? raw : {};
  return entitlementsSchema.parse({ ...NO_ENTITLEMENTS, ...base });
}

/** Remaining allowance for a numeric limit given current usage; `null` = unlimited. */
export function remainingAllowance(limitValue: number | null, used: number): number | null {
  if (limitValue === null) return null;
  return Math.max(0, limitValue - used);
}

export function tierAllowed(maxTier: AiModelTier, requested: AiModelTier): boolean {
  return TIER_RANK[requested] <= TIER_RANK[maxTier];
}
