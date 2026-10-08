/**
 * Buyer-facing labels for plan entitlements (§31) and the plan comparison derived from them. THE one place that maps
 * entitlement keys (`src/lib/billing/entitlements.ts`) to words on /pricing, /schools and the home pricing teaser.
 *
 * What a plan includes is data (Plan.entitlements, admin-configured); this module only phrases it. The copy map is typed
 * `{ [K in keyof Entitlements]: … }`, so adding an entitlement key is a compile error until it is described here.
 *
 * It is also THE list of what may be advertised (§31, §50 "no fake prototype"): {@link UNBUILT_FEATURES} names the
 * entitlement keys that exist in the contract (plans may even switch them on) but gate no built feature. They are never
 * shown to buyers: /pricing, /schools, the home teaser, plan cards, the billing summary ("what you unlocked") and the
 * study-pack pages all go through {@link isAdvertisedFeature}. Remove a key from {@link UNBUILT_FEATURES} in the same
 * change that builds and enforces the feature.
 * Pure and isomorphic (unit tested).
 */
import type { BooleanFeature, Entitlements } from "@/lib/billing/entitlements";
import { formatNumber } from "@/lib/format";

export const FEATURE_GROUPS = ["Learning", "Tests and exams", "Study tools", "AI help", "Reports", "For schools"] as const;
export type FeatureGroup = (typeof FEATURE_GROUPS)[number];

/**
 * Groups buyers may see for the current AI switch: "AI help" only while AI features are on (`features.ai`; owner
 * decision 2026-10-07). The AI entitlement keys stay in every plan; they are simply not advertised while AI is off.
 */
export function advertisedGroups(aiEnabled: boolean, groups: readonly FeatureGroup[] = FEATURE_GROUPS): FeatureGroup[] {
  return groups.filter((group) => aiEnabled || group !== "AI help");
}

export type EntitlementKey = keyof Entitlements & string;

type FlagCopy = {
  kind: "flag";
  label: string;
  group: FeatureGroup;
  /** Shown through a limit row instead (e.g. `mockExams` is folded into "Mock exams: 4 a month"). */
  foldedInto?: EntitlementKey;
};
type LimitCopy = {
  kind: "limit";
  label: string;
  group: FeatureGroup;
  /** Unit after the number: "a day" → "20 a day". */
  unit: string;
  /** The limit only applies when this flag is on (off → "Not included"). */
  requires?: BooleanFeature;
};
type ChoiceCopy = {
  kind: "choice";
  label: string;
  group: FeatureGroup;
  options: Readonly<Record<string, string>>;
  /** The row only means something when this holds (e.g. an AI level without any AI feature). */
  relevantWhen?: (entitlements: Entitlements) => boolean;
};
export type FeatureCopy = FlagCopy | LimitCopy | ChoiceCopy;

/** Display copy per entitlement key, in display order within each group. UI copy, not product data. */
export const PLAN_FEATURE_COPY: { readonly [K in EntitlementKey]: FeatureCopy } = {
  lessonAccess: { kind: "choice", label: "Lessons", group: "Learning", options: { FREE_ONLY: "Free lessons", ALL: "Every lesson" } },
  practiceQuestionsPerDay: { kind: "limit", label: "Practice questions", group: "Learning", unit: "a day" },
  dailyQuestion: { kind: "flag", label: "Daily question", group: "Learning" },
  personalisedLearning: { kind: "flag", label: "Personalised question selection", group: "Learning" },
  diagnosticTest: { kind: "flag", label: "Diagnostic test", group: "Tests and exams" },
  topicTestsPerWeek: { kind: "limit", label: "Topic tests", group: "Tests and exams", unit: "a week" },
  mockExams: { kind: "flag", label: "Mock exams", group: "Tests and exams", foldedInto: "mockExamsPerMonth" },
  mockExamsPerMonth: { kind: "limit", label: "Mock exams", group: "Tests and exams", unit: "a month", requires: "mockExams" },
  studyPlan: { kind: "flag", label: "Personal study plan", group: "Study tools" },
  flashcards: { kind: "flag", label: "Flashcards with spaced repetition", group: "Study tools" },
  examCountdown: { kind: "flag", label: "Exam countdown", group: "Study tools" },
  leaderboards: { kind: "flag", label: "Leaderboards", group: "Study tools" },
  aiTutor: { kind: "flag", label: "AI tutor", group: "AI help", foldedInto: "aiMessagesPerDay" },
  aiMessagesPerDay: { kind: "limit", label: "AI tutor messages", group: "AI help", unit: "a day", requires: "aiTutor" },
  aiSolverPerDay: { kind: "limit", label: "AI question solver", group: "AI help", unit: "a day" },
  aiImageUploads: { kind: "flag", label: "Photograph a question", group: "AI help" },
  aiMaxModelTier: {
    kind: "choice",
    label: "AI reasoning level",
    group: "AI help",
    options: { FAST: "Fast", STANDARD: "Standard", DEEP: "Advanced" },
    relevantWhen: (e) => e.aiTutor || e.aiSolverPerDay !== 0,
  },
  // Enforced: the "Detailed analytics" section of /app/progress (src/server/progress/detailed-analytics.ts).
  advancedAnalytics: { kind: "flag", label: "Detailed progress analytics", group: "Reports" },
  // Enforced on the CHILD's entitlements: parent child-report sections and the weekly summary (src/server/family).
  parentReports: { kind: "flag", label: "Detailed progress reports for parents", group: "Reports" },
  pdfExport: { kind: "flag", label: "PDF downloads", group: "Reports" },
  teacherDashboard: { kind: "flag", label: "Teacher dashboard", group: "For schools" },
  studentManagement: { kind: "flag", label: "Classes and roster management", group: "For schools" },
  assignments: { kind: "flag", label: "Assignments", group: "For schools" },
  schoolAnalytics: { kind: "flag", label: "School analytics", group: "For schools" },
};

/**
 * Entitlement keys that gate NO built feature (yet), with the reason. Never advertised (module doc). Kept in the
 * contract so plans and packs that already set them stay valid and the feature can be switched on later without a
 * data migration.
 */
export const UNBUILT_FEATURES = {
  pdfExport: "PDF export is not built (§24): no download exists, so nothing checks the flag.",
  personalisedLearning:
    "Adaptive question selection, adaptive difficulty and study-plan adaptation are the core engine (§11, §16) for every " +
    "plan, FREE included (§52); no premium-only personalisation exists to gate.",
} as const satisfies Partial<Record<EntitlementKey, string>>;

export type UnbuiltFeature = keyof typeof UNBUILT_FEATURES;

/** True when `key` is an entitlement key buyers may see (it gates a built feature). Unknown keys are never advertised. */
export function isAdvertisedFeature(key: string): key is EntitlementKey {
  return Object.hasOwn(PLAN_FEATURE_COPY, key) && !Object.hasOwn(UNBUILT_FEATURES, key);
}

/** One plan's value for one feature. `text` is the visible (and screen-reader) wording. */
export interface FeatureCell {
  included: boolean;
  text: string;
}

export const INCLUDED_TEXT = "Included";
export const NOT_INCLUDED_TEXT = "Not included";
export const UNLIMITED_TEXT = "Unlimited";

const NOT_INCLUDED: FeatureCell = { included: false, text: NOT_INCLUDED_TEXT };

/** The value of one entitlement for one plan, worded for buyers. */
export function featureCell(key: EntitlementKey, entitlements: Entitlements): FeatureCell {
  const copy = PLAN_FEATURE_COPY[key];
  const value = entitlements[key];
  switch (copy.kind) {
    case "flag":
      return value === true ? { included: true, text: INCLUDED_TEXT } : NOT_INCLUDED;
    case "limit": {
      if (copy.requires && entitlements[copy.requires] !== true) return NOT_INCLUDED;
      if (value === null) return { included: true, text: UNLIMITED_TEXT };
      if (typeof value !== "number" || value <= 0) return NOT_INCLUDED;
      return { included: true, text: `${formatNumber(value)} ${copy.unit}` };
    }
    case "choice": {
      if (copy.relevantWhen && !copy.relevantWhen(entitlements)) return NOT_INCLUDED;
      const option = typeof value === "string" ? copy.options[value] : undefined;
      return { included: true, text: option ?? String(value) };
    }
  }
}

export interface ComparisonRow {
  key: EntitlementKey;
  label: string;
  /** One cell per plan, in the order the plans were given. */
  cells: FeatureCell[];
}

export interface ComparisonGroup {
  group: FeatureGroup;
  rows: ComparisonRow[];
}

/**
 * Keys shown as their own row, in display order: flags folded into a limit row and {@link UNBUILT_FEATURES} are
 * skipped (so the comparison, plan cards and teasers only ever list enforced features).
 */
export function comparisonKeys(): EntitlementKey[] {
  return (Object.keys(PLAN_FEATURE_COPY) as EntitlementKey[]).filter((key) => {
    const copy = PLAN_FEATURE_COPY[key];
    return isAdvertisedFeature(key) && !(copy.kind === "flag" && copy.foldedInto);
  });
}

/**
 * Feature comparison for plans (columns, in the given order), grouped as {@link FEATURE_GROUPS}. A row appears only
 * when at least one plan includes the feature; empty groups are dropped. With `groups`, only those groups are built
 * (e.g. the school features on /schools).
 */
export function buildComparison(plans: readonly { entitlements: Entitlements }[], options: { groups?: readonly FeatureGroup[] } = {}): ComparisonGroup[] {
  if (plans.length === 0) return [];
  const keys = comparisonKeys();
  const wanted = options.groups ?? FEATURE_GROUPS;
  return FEATURE_GROUPS.filter((group) => wanted.includes(group))
    .map((group) => ({
      group,
      rows: keys
        .filter((key) => PLAN_FEATURE_COPY[key].group === group)
        .map((key) => ({ key, label: PLAN_FEATURE_COPY[key].label, cells: plans.map((plan) => featureCell(key, plan.entitlements)) }))
        .filter((row) => row.cells.some((cell) => cell.included)),
    }))
    .filter((group) => group.rows.length > 0);
}

/**
 * Short list of what a plan includes, for plan cards and the home teaser: "Every lesson", "AI tutor messages: 30 a day".
 * Follows display order (or the order of `groups` when given); `max` caps the list (default 6).
 */
export function keyFeatures(entitlements: Entitlements, options: { max?: number; groups?: readonly FeatureGroup[] } = {}): string[] {
  const max = options.max ?? 6;
  const out: string[] = [];
  // With `groups`, their order wins (school plans lead with the school features).
  const keys = options.groups
    ? options.groups.flatMap((group) => comparisonKeys().filter((key) => PLAN_FEATURE_COPY[key].group === group))
    : comparisonKeys();
  for (const key of keys) {
    if (out.length >= max) break;
    const copy = PLAN_FEATURE_COPY[key];
    const cell = featureCell(key, entitlements);
    if (!cell.included) continue;
    if (copy.kind === "flag") out.push(copy.label);
    else if (copy.kind === "choice" && key === "lessonAccess") out.push(cell.text);
    else out.push(`${copy.label}: ${cell.text.charAt(0).toLowerCase()}${cell.text.slice(1)}`);
  }
  return out;
}
