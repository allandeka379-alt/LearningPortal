import { z } from "zod";
import { entitlementsSchema, type Entitlements } from "@/lib/billing/entitlements";

/**
 * Form descriptors for a plan's entitlements, GENERATED from `entitlementsSchema` (src/lib/billing/entitlements.ts) so
 * the admin editor can never drift from the contract: booleans become switches, nullable limits become a number with
 * an "unlimited" toggle (`null` = unlimited, 0 = none) and enums become selects. Pure and isomorphic; the descriptors
 * are plain data passed to the client editor as props.
 *
 * The copy below is UI text (labels / help), not product data. `Record<keyof Entitlements, …>` makes a new contract key
 * a compile error until it is described here.
 */

export const ENTITLEMENT_GROUPS = ["Lessons and practice", "Exams", "Study tools", "AI", "Reports", "Schools"] as const;
export type EntitlementGroup = (typeof ENTITLEMENT_GROUPS)[number];

interface FieldCopy {
  label: string;
  description: string;
  group: EntitlementGroup;
  /** Unit shown next to a limit ("per day"). */
  unit?: string;
  /** Labels for enum options. */
  options?: Readonly<Record<string, string>>;
}

const COPY: Readonly<Record<keyof Entitlements, FieldCopy>> = {
  lessonAccess: {
    label: "Lesson access",
    description: "Which lessons a subscriber can open.",
    group: "Lessons and practice",
    options: { FREE_ONLY: "Free preview lessons only", ALL: "All published lessons" },
  },
  practiceQuestionsPerDay: { label: "Practice questions", description: "Questions a student may answer per day.", group: "Lessons and practice", unit: "per day" },
  dailyQuestion: { label: "Daily question", description: "The daily question on the dashboard.", group: "Lessons and practice" },
  diagnosticTest: { label: "Diagnostic test", description: "Starting-point test that seeds topic mastery.", group: "Exams" },
  topicTestsPerWeek: { label: "Topic tests", description: "Topic tests a student may start per week.", group: "Exams", unit: "per week" },
  mockExams: { label: "Mock exams", description: "Timed mock exams in examination mode.", group: "Exams" },
  mockExamsPerMonth: { label: "Mock exams", description: "Mock exams a student may start per month.", group: "Exams", unit: "per month" },
  flashcards: { label: "Flashcards", description: "Spaced-repetition flashcards.", group: "Study tools" },
  studyPlan: { label: "Study plan", description: "Personal study plan generated from exam dates and mastery.", group: "Study tools" },
  examCountdown: { label: "Exam countdown", description: "Countdown to the student's exam sessions.", group: "Study tools" },
  personalisedLearning: {
    label: "Personalised learning (not built)",
    description: "Gates nothing yet: adaptive selection and plan adaptation are core for every plan. Never shown to buyers.",
    group: "Study tools",
  },
  leaderboards: { label: "Leaderboards", description: "Class and school leaderboards (opt-in).", group: "Study tools" },
  aiTutor: { label: "AI tutor", description: "Conversational AI tutor.", group: "AI" },
  aiMessagesPerDay: { label: "AI tutor messages", description: "Tutor messages per day (also limited by the global AI budget).", group: "AI", unit: "per day" },
  aiSolverPerDay: { label: "AI solver questions", description: "Typed or photographed questions solved per day.", group: "AI", unit: "per day" },
  aiImageUploads: { label: "Photo uploads to AI", description: "Students may photograph a question for the solver.", group: "AI" },
  aiMaxModelTier: {
    label: "Highest AI model tier",
    description: "Routing may still choose a cheaper tier; this is the ceiling.",
    group: "AI",
    options: { FAST: "Fast", STANDARD: "Standard", DEEP: "Deep (advanced reasoning)" },
  },
  advancedAnalytics: { label: "Detailed analytics", description: "The Detailed analytics section of the student's Progress page.", group: "Reports" },
  parentReports: {
    label: "Parent reports",
    description: "Linked parents see this student's progress, weak topics, results and activity calendar, and get the weekly summary.",
    group: "Reports",
  },
  pdfExport: { label: "PDF export (not built)", description: "Gates nothing yet: PDF export is not built. Never shown to buyers.", group: "Reports" },
  teacherDashboard: { label: "Teacher dashboard", description: "Class overview for the school's teachers.", group: "Schools" },
  studentManagement: { label: "Student management", description: "Rosters, classes and seats.", group: "Schools" },
  assignments: { label: "Assignments", description: "Teachers set work and tests for classes.", group: "Schools" },
  schoolAnalytics: { label: "School analytics", description: "School-wide performance analytics.", group: "Schools" },
};

interface FieldBase {
  key: keyof Entitlements & string;
  label: string;
  description: string;
  group: EntitlementGroup;
}

export type EntitlementField =
  | (FieldBase & { kind: "boolean" })
  | (FieldBase & { kind: "limit"; min: number; unit: string | null })
  | (FieldBase & { kind: "choice"; options: { value: string; label: string }[] });

function describeOne(key: keyof Entitlements & string, schema: z.ZodType): EntitlementField {
  const copy = COPY[key];
  const base: FieldBase = { key, label: copy.label, description: copy.description, group: copy.group };
  if (schema instanceof z.ZodBoolean) return { ...base, kind: "boolean" };
  if (schema instanceof z.ZodNullable) {
    const inner = schema.unwrap();
    if (inner instanceof z.ZodNumber) {
      const min = typeof inner.minValue === "number" && Number.isFinite(inner.minValue) ? inner.minValue : 0;
      return { ...base, kind: "limit", min, unit: copy.unit ?? null };
    }
  }
  if (schema instanceof z.ZodEnum) {
    const values = schema.options.map(String);
    return { ...base, kind: "choice", options: values.map((value) => ({ value, label: copy.options?.[value] ?? value })) };
  }
  throw new Error(`entitlement-fields: unsupported schema for "${key}"`);
}

/** Every entitlement key as a form descriptor, in schema order (grouped by the UI). */
export function describeEntitlementFields(): EntitlementField[] {
  const shape = entitlementsSchema.shape as Record<keyof Entitlements & string, z.ZodType>;
  return (Object.keys(shape) as (keyof Entitlements & string)[]).map((key) => describeOne(key, shape[key]));
}

/** Keys whose value differs between two entitlement documents (schema order). */
export function changedEntitlementKeys(before: Entitlements, after: Entitlements): (keyof Entitlements & string)[] {
  return (Object.keys(entitlementsSchema.shape) as (keyof Entitlements & string)[]).filter((key) => before[key] !== after[key]);
}
