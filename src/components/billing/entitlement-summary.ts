import type { BooleanFeature, Entitlements } from "@/lib/billing/entitlements";
import { formatCount } from "@/lib/format";
import { isAdvertisedFeature } from "@/server/marketing/plan-features";

/**
 * Entitlements in plain words (§31) for the billing page, "what you unlocked" and the study-pack pages. Pure and
 * isomorphic. Every line is derived from the resolved entitlement document (database data), never from a plan name.
 * School-only capabilities (teacher dashboard, assignments…) are not student features and are left out, and so are
 * entitlement keys that gate no built feature (`UNBUILT_FEATURES` in the one mapping module,
 * `src/server/marketing/plan-features.ts`): a student is never told they unlocked something that does not exist. The AI
 * lines appear only with `{ ai: true }` (AI features switched on, `features.ai`; owner decision 2026-10-07): while AI
 * is off the AI entitlement keys stay in the plans but are never shown.
 */

export interface SummaryOptions {
  /** AI features are switched on (`features.ai`, read on the server). Default false: no AI lines. */
  ai?: boolean;
}

export interface EntitlementLine {
  key: string;
  label: string;
  included: boolean;
}

function limitLine(
  key: string,
  value: number | null,
  words: { unlimited: string; limited: (n: number) => string; none: string },
): EntitlementLine {
  if (value === null) return { key, label: words.unlimited, included: true };
  if (value > 0) return { key, label: words.limited(value), included: true };
  return { key, label: words.none, included: false };
}

export function summariseEntitlements(e: Entitlements, options: SummaryOptions = {}): EntitlementLine[] {
  const lines: EntitlementLine[] = [];
  lines.push(
    e.lessonAccess === "ALL"
      ? { key: "lessons", label: "Full lessons for every topic", included: true }
      : { key: "lessons", label: "Every lesson in every subject", included: false },
  );
  lines.push(
    limitLine("practice", e.practiceQuestionsPerDay, {
      unlimited: "Unlimited practice questions",
      limited: (n) => `Up to ${formatCount(n, "practice question")} a day`,
      none: "Practice questions",
    }),
  );
  lines.push({ key: "daily", label: "The daily question", included: e.dailyQuestion });
  lines.push(
    limitLine("topicTests", e.topicTestsPerWeek, {
      unlimited: "Unlimited topic tests",
      limited: (n) => `${formatCount(n, "topic test")} a week`,
      none: "Topic tests",
    }),
  );
  if (!e.mockExams) lines.push({ key: "mocks", label: "Mock exams", included: false });
  else
    lines.push(
      limitLine("mocks", e.mockExamsPerMonth, {
        unlimited: "Unlimited mock exams",
        limited: (n) => `${formatCount(n, "mock exam")} a month`,
        none: "Mock exams",
      }),
    );
  lines.push({ key: "flashcards", label: "Flashcards with spaced repetition", included: e.flashcards });
  lines.push({ key: "studyPlan", label: "A personal study plan", included: e.studyPlan });
  lines.push({ key: "diagnostic", label: "Diagnostic tests", included: e.diagnosticTest });
  lines.push({ key: "countdown", label: "Exam countdown", included: e.examCountdown });
  if (options.ai === true) pushAiLines(lines, e);
  const flag = (key: string, label: string, feature: BooleanFeature) => {
    if (isAdvertisedFeature(feature)) lines.push({ key, label, included: e[feature] });
  };
  flag("personalised", "Personalised learning", "personalisedLearning");
  flag("analytics", "Detailed progress analytics", "advancedAnalytics");
  flag("parentReports", "Detailed progress reports for your parent or guardian", "parentReports");
  flag("pdf", "PDF export", "pdfExport");
  return lines;
}

/** The AI tutor / solver lines (only while AI features are switched on). */
function pushAiLines(lines: EntitlementLine[], e: Entitlements): void {
  if (!e.aiTutor) lines.push({ key: "aiTutor", label: "AI tutor", included: false });
  else
    lines.push(
      limitLine("aiTutor", e.aiMessagesPerDay, {
        unlimited: "AI tutor with unlimited messages",
        limited: (n) => `AI tutor, ${formatCount(n, "message")} a day`,
        none: "AI tutor",
      }),
    );
  lines.push(
    limitLine("aiSolver", e.aiSolverPerDay, {
      unlimited: "Unlimited AI question solving",
      limited: (n) => `AI question solver, ${formatCount(n, "question")} a day`,
      none: "AI question solver",
    }),
  );
  lines.push({ key: "aiImages", label: "Photograph questions for the AI tutor", included: e.aiImageUploads });
  lines.push({ key: "aiDeep", label: "Advanced AI explanations", included: e.aiMaxModelTier === "DEEP" });
}

/** Only what is included (for "what you unlocked"). */
export function includedLines(e: Entitlements, options: SummaryOptions = {}): EntitlementLine[] {
  return summariseEntitlements(e, options).filter((line) => line.included);
}
