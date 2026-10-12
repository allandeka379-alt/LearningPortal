import type { Entitlements } from "../../../src/lib/billing/entitlements";
import { NO_ENTITLEMENTS } from "../../../src/lib/billing/entitlements";

/**
 * Platform configuration seed: plans + their DEFAULT entitlements, achievement definitions and settings.
 *
 * Pricing model (owner decisions 2026-10-07 and 2026-10-12): ONE plan, FULL_ACCESS, bought with a single one-off
 * payment (USD 1.00, no renewal, "pay once, keep it"). There is NO free tier (2026-10-12): the FREE plan stays as the
 * default (fallback for users without a paid source) but grants nothing and is hidden from /pricing. That price is an owner decision for EVERY environment,
 * so it is seeded (`oneOffPrice`, create-only: admins change it in /admin/plans by adding a new price row). AI features
 * are switched off for now (cost), so no plan includes them; their keys stay in the contract for later.
 * STUDENT / PREMIUM / SCHOOL are retired: kept (inactive, not public) so history and running subscriptions stay valid.
 * Every value here is a starting default that admins can change.
 */

export type SeedPlan = {
  code: string;
  name: string;
  tagline?: string;
  description: string;
  /** Pricing-page bullet points (admin-managed copy afterwards). */
  highlights?: string[];
  audience: "INDIVIDUAL" | "SCHOOL";
  sortOrder: number;
  isPublic: boolean;
  /** Retired plans are created inactive (cannot be bought); default true. */
  isActive?: boolean;
  entitlements: Entitlements;
  /**
   * The plan's one-off price, seeded in EVERY environment (owner decision; a real price, not demo data). Created only
   * when the plan has no price row at all, so an admin's later price change is never undone by re-seeding.
   */
  /** periodDays: null = lifetime; 30 = a month of access per payment (owner decision 2026-10-12: US$1 a month). */
  oneOffPrice?: { currency: string; amountMinor: number; label: string | null; periodDays: number | null };
  /** DEV ONLY sample prices (minor units). Never seeded in production. */
  devSamplePrices: { currency: string; interval: "MONTH" | "TERM" | "YEAR"; amountMinor: number }[];
};

/** Code of the one-off "Full access" plan (seed data; the app finds the offer by its one-off price, not by this code). */
export const FULL_ACCESS_PLAN_CODE = "FULL_ACCESS";

/** Days of Full access one payment buys (owner decision 2026-10-12: US$1 a month, renewed through Paynow). */
export const MONTHLY_PASS_DAYS = 30;
/** Plans retired by the 2026-10-07 pricing decision (taken off sale and off /pricing on existing databases). */
export const RETIRED_PLAN_CODES: readonly string[] = ["STUDENT", "PREMIUM", "SCHOOL"];

/**
 * The default plan of users without a paid source. No free tier (owner decision 2026-10-12): it grants NOTHING in
 * the app (no lessons, not even free-preview ones, no practice, no daily question, no diagnostic). It stays the default
 * plan (fallback) and hidden from /pricing; the public marketing samples (/daily, SEO excerpts) need no plan.
 */
export const FREE: Entitlements = { ...NO_ENTITLEMENTS };

/** The free preview sold from 2026-10-07 to 2026-10-12: only the base of the retired plans below (history). */
const LEGACY_FREE_PREVIEW: Entitlements = {
  ...NO_ENTITLEMENTS,
  practiceQuestionsPerDay: 15,
  dailyQuestion: true,
  diagnosticTest: true,
  topicTestsPerWeek: 2,
  examCountdown: true,
  leaderboards: true,
};

/** Everything that is built and not AI: every lesson, unlimited practice and tests, mock exams, flashcards, … */
export const FULL_ACCESS: Entitlements = {
  ...NO_ENTITLEMENTS,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  dailyQuestion: true,
  diagnosticTest: true,
  topicTestsPerWeek: null,
  examCountdown: true,
  leaderboards: true,
  mockExams: true,
  mockExamsPerMonth: null,
  flashcards: true,
  studyPlan: true,
  advancedAnalytics: true,
  parentReports: true,
};

// Retired plans (history only). Their AI keys are what was sold; AI is off platform-wide by the feature flag anyway.
const STUDENT: Entitlements = {
  ...LEGACY_FREE_PREVIEW,
  aiTutor: true,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  topicTestsPerWeek: null,
  mockExams: true,
  mockExamsPerMonth: null,
  flashcards: true,
  studyPlan: true,
  aiMessagesPerDay: 30,
  aiSolverPerDay: 10,
  aiImageUploads: true,
  aiMaxModelTier: "STANDARD",
  parentReports: true,
};

const PREMIUM: Entitlements = {
  ...STUDENT,
  aiMessagesPerDay: 100,
  aiSolverPerDay: 40,
  aiMaxModelTier: "DEEP",
  // `personalisedLearning` and `pdfExport` gate no built feature (UNBUILT_FEATURES in
  // src/server/marketing/plan-features.ts): kept so the keys stay valid, never advertised, never in the description.
  personalisedLearning: true,
  advancedAnalytics: true,
  pdfExport: true,
};

const SCHOOL: Entitlements = {
  ...STUDENT,
  teacherDashboard: true,
  studentManagement: true,
  assignments: true,
  schoolAnalytics: true,
};

export const PLANS: SeedPlan[] = [
  {
    code: "FREE",
    name: "No access",
    tagline: "Default for accounts without Full access",
    description: "Default plan of accounts that have not bought Full access. It includes nothing; it is never sold or shown on /pricing.",
    audience: "INDIVIDUAL",
    sortOrder: 1,
    isPublic: false,
    entitlements: FREE,
    devSamplePrices: [],
  },
  {
    code: FULL_ACCESS_PLAN_CODE,
    name: "Full access",
    tagline: "Pay once, keep it",
    description:
      "Every lesson in every subject, unlimited practice and topic tests, mock exams, flashcards, a personal study plan, " +
      "detailed progress analytics and progress reports for parents. One payment, no renewals.",
    highlights: [
      "Every lesson in every subject",
      "Unlimited practice questions and topic tests",
      "Timed mock exams",
      "Flashcards with spaced repetition",
      "A personal study plan",
      "Detailed progress analytics and parent reports",
    ],
    audience: "INDIVIDUAL",
    sortOrder: 2,
    isPublic: true,
    entitlements: FULL_ACCESS,
    oneOffPrice: { currency: "USD", amountMinor: 100, label: "per month", periodDays: MONTHLY_PASS_DAYS },
    devSamplePrices: [],
  },
  {
    code: "STUDENT",
    name: "Student",
    description: "Retired 2026-10-07 (replaced by Full access). Kept for payment and subscription history.",
    audience: "INDIVIDUAL",
    sortOrder: 90,
    isPublic: false,
    isActive: false,
    entitlements: STUDENT,
    devSamplePrices: [],
  },
  {
    code: "PREMIUM",
    name: "Premium",
    description: "Retired 2026-10-07 (replaced by Full access). Kept for payment and subscription history.",
    audience: "INDIVIDUAL",
    sortOrder: 91,
    isPublic: false,
    isActive: false,
    entitlements: PREMIUM,
    devSamplePrices: [],
  },
  {
    code: "SCHOOL",
    name: "School",
    description: "Retired 2026-10-07 from sale. Teacher dashboards, student management, assignments and school analytics.",
    audience: "SCHOOL",
    sortOrder: 92,
    isPublic: false,
    isActive: false,
    entitlements: SCHOOL,
    devSamplePrices: [],
  },
];

export type SeedAchievement = {
  code: string;
  name: string;
  description: string;
  category: "STREAK" | "MASTERY" | "PRACTICE" | "EXAM" | "MILESTONE";
  /** Evaluated by the gamification service; shape documented in src/server/gamification. */
  criteria: { type: string; threshold: number };
  xpReward: number;
  iconKey: string;
};

export const ACHIEVEMENTS: SeedAchievement[] = [
  { code: "streak-3", name: "Three in a row", description: "Met your daily goal three days running.", category: "STREAK", criteria: { type: "streak_days", threshold: 3 }, xpReward: 30, iconKey: "flame" },
  { code: "streak-7", name: "A full week", description: "Met your daily goal seven days running.", category: "STREAK", criteria: { type: "streak_days", threshold: 7 }, xpReward: 70, iconKey: "flame" },
  { code: "streak-30", name: "Habit formed", description: "Met your daily goal thirty days running.", category: "STREAK", criteria: { type: "streak_days", threshold: 30 }, xpReward: 300, iconKey: "flame" },
  { code: "questions-100", name: "Century", description: "Answered 100 practice questions.", category: "PRACTICE", criteria: { type: "questions_answered", threshold: 100 }, xpReward: 50, iconKey: "target" },
  { code: "questions-1000", name: "Question bank regular", description: "Answered 1,000 practice questions.", category: "PRACTICE", criteria: { type: "questions_answered", threshold: 1000 }, xpReward: 250, iconKey: "target" },
  { code: "first-mock", name: "Exam conditions", description: "Completed your first timed mock exam.", category: "EXAM", criteria: { type: "mocks_completed", threshold: 1 }, xpReward: 50, iconKey: "timer" },
  { code: "topic-mastered", name: "Mastered", description: "Reached Mastered on a topic.", category: "MASTERY", criteria: { type: "topics_mastered", threshold: 1 }, xpReward: 60, iconKey: "award" },
  { code: "topics-mastered-10", name: "Ten topics deep", description: "Reached Mastered on ten topics.", category: "MASTERY", criteria: { type: "topics_mastered", threshold: 10 }, xpReward: 300, iconKey: "award" },
  { code: "diagnostic-done", name: "Starting point", description: "Completed a diagnostic test.", category: "MILESTONE", criteria: { type: "diagnostics_completed", threshold: 1 }, xpReward: 20, iconKey: "compass" },
];

/** Default Setting rows (key -> value). Admins edit these in /admin/settings. */
export const SETTINGS: { key: string; description: string; value: unknown }[] = [
  {
    key: "ai.enabled",
    description: "Global AI kill switch. When false, every AI feature returns 'AI is temporarily unavailable'.",
    value: true,
  },
  {
    key: "ai.routing",
    description: "Model per tier and per-route parameters. Model IDs must be exact API model IDs.",
    value: {
      tiers: {
        FAST: { model: "claude-haiku-4-5" },
        STANDARD: { model: "claude-sonnet-5-5", effort: "low" },
        DEEP: { model: "claude-opus-5-5", effort: "medium" },
      },
      routes: {
        intent: { tier: "FAST", maxTokens: 256 },
        tutor: { tier: "STANDARD", maxTokens: 2048 },
        solver: { tier: "STANDARD", maxTokens: 4096 },
        solverHard: { tier: "DEEP", maxTokens: 8192 },
        marking: { tier: "STANDARD", maxTokens: 1024 },
        whatsapp: { tier: "FAST", maxTokens: 512 },
        contentGeneration: { tier: "DEEP", maxTokens: 16000 },
      },
    },
  },
  {
    key: "ai.limits",
    description: "Hard per-conversation limits independent of plan quotas.",
    value: { maxTurnsPerConversation: 40, maxInputCharsPerMessage: 4000, maxImageBytes: 5_000_000, cacheTtlHours: 168 },
  },
  {
    key: "ai.budget",
    description: "Daily platform-wide AI spend ceiling in USD micro-dollars; AI pauses for non-admin users when reached.",
    value: { dailyCostCeilingMicros: 50_000_000 },
  },
  {
    key: "gamification.xp",
    description: "XP awarded per event. See src/server/gamification/xp.ts for keys.",
    value: null,
  },
  {
    key: "study.defaults",
    description: "Default daily study goal (minutes) and weekly availability for new students.",
    value: { dailyGoalMinutes: 45, availability: { mon: 60, tue: 60, wed: 60, thu: 60, fri: 45, sat: 90, sun: 45 } },
  },
];
