import { activityLabel, planItemHref as dashboardPlanItemHref } from "@/components/dashboard/links";
import { formatLocalDate } from "@/components/student/format";
import { formatCount, formatDuration, formatPercent } from "@/lib/format";
import { MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";
import type { PlanItemView, PlanSummary } from "@/server/studyplan/service";
import type { WeekdayKey } from "@/server/studyplan/generator";

/**
 * Words and links for the study plan UI (§16). Pure and isomorphic: the service decides WHAT is planned and WHY (codes
 * and facts); these helpers only turn them into sentences, labels and in-app links. No numbers are made up here.
 */

export const WEEKDAYS: readonly { key: WeekdayKey; short: string; long: string }[] = [
  { key: "mon", short: "Mon", long: "Monday" },
  { key: "tue", short: "Tue", long: "Tuesday" },
  { key: "wed", short: "Wed", long: "Wednesday" },
  { key: "thu", short: "Thu", long: "Thursday" },
  { key: "fri", short: "Fri", long: "Friday" },
  { key: "sat", short: "Sat", long: "Saturday" },
  { key: "sun", short: "Sun", long: "Sunday" },
];

/** The practice builder's largest session (`MAX_COUNT` in app/app/practice/_lib/params.ts). */
export const MAX_LINK_QUESTIONS = 60;

/** Fields of a plan item the copy helpers read. */
export type PlanItemCopy = Pick<
  PlanItemView,
  | "subjectId"
  | "subjectName"
  | "topicId"
  | "topicName"
  | "lessonId"
  | "lessonTitle"
  | "assessmentId"
  | "assessmentTitle"
  | "activityType"
  | "reason"
  | "plannerReason"
  | "masteryScore"
  | "daysToExam"
  | "targetMinutes"
  | "targetQuestions"
  | "completedQuestions"
  | "status"
>;

const ACTIVITY_TITLE: Readonly<Record<string, string>> = {
  DIAGNOSTIC: "Diagnostic test",
  MOCK_EXAM: "Mock exam",
  FLASHCARDS: "Flashcard review",
};

/** "Quadratic equations: lesson 1", "Algebra", "Mock exam" — the line that names the session. */
export function planItemTitle(item: PlanItemCopy): string {
  if (item.lessonTitle) return item.lessonTitle;
  if (item.assessmentTitle) return item.assessmentTitle;
  if (item.activityType === "DIAGNOSTIC" || item.activityType === "MOCK_EXAM" || item.activityType === "FLASHCARDS") {
    return ACTIVITY_TITLE[item.activityType] ?? activityLabel(item.activityType);
  }
  return item.topicName ?? item.subjectName;
}

/** "Practice · Mathematics". */
export function planItemEyebrow(item: PlanItemCopy): string {
  return `${activityLabel(item.activityType)} · ${item.subjectName}`;
}

/** "20 min · 10 questions". */
export function planItemSize(item: Pick<PlanItemCopy, "targetMinutes" | "targetQuestions">): string {
  const parts = [formatDuration(item.targetMinutes)];
  if (item.targetQuestions && item.targetQuestions > 0) parts.push(formatCount(item.targetQuestions, "question"));
  return parts.join(" · ");
}

/**
 * Where the item starts: the lesson, the practice builder with the item's topic, size and adaptive difficulty, the
 * exams list (mocks), the diagnostic or flashcard review for the subject.
 */
export function planItemHref(item: PlanItemCopy): string {
  const subject = encodeURIComponent(item.subjectId);
  switch (item.activityType) {
    case "DIAGNOSTIC":
      return `/app/diagnostic?subjectId=${subject}`;
    case "FLASHCARDS":
      return `/app/flashcards/review?subjectId=${subject}`;
    default:
      return dashboardPlanItemHref({
        subjectId: item.subjectId,
        topicId: item.topicId,
        lessonId: item.lessonId,
        assessmentId: item.assessmentId,
        activityType: item.activityType,
        targetQuestions: item.targetQuestions === null ? null : Math.min(MAX_LINK_QUESTIONS, item.targetQuestions),
      });
  }
}

const mastery = (score: number | null) => (score === null ? null : formatPercent(score));

/** "Why this?" for one item, from the planner's reason and the facts stored with it. */
export function planItemReason(item: PlanItemCopy): string {
  const topic = item.topicName ?? item.subjectName;
  const score = mastery(item.masteryScore);
  switch (item.plannerReason) {
    case "DIAGNOSTIC_BASELINE":
      return `No results in ${item.subjectName} yet: a short diagnostic sets your starting point.`;
    case "MOCK_EXAM_CADENCE":
      return item.daysToExam !== null
        ? `Timed practice under exam conditions, ${formatCount(item.daysToExam, "day")} before your exam.`
        : "Timed practice under exam conditions.";
    case "FLASHCARD_REVIEW":
      return "Short, frequent flashcard review.";
    case "SPACED_REVIEW":
      return `Spaced review: back to ${topic} a few days after practising it.`;
    case "WEAK_TOPIC_PRACTICE":
      return score ? `Weak topic: ${topic} (${score} mastery).` : `Weak topic: ${topic}.`;
    case "NEW_TOPIC_LESSON":
      return `New topic: ${topic}.`;
    case "NEXT_LESSON":
      return `Next lesson in ${topic}.`;
    case "CONTINUE_LESSON":
      return `Continues a longer lesson in ${topic}.`;
    case "PRACTICE_AFTER_LESSON":
      return `Practice after the lessons in ${topic}.`;
    case "UNASSESSED_TOPIC_PRACTICE":
      return `Not assessed yet: practise ${topic} to measure your mastery.`;
    case "MAINTENANCE_PRACTICE":
      return score ? `Keeps ${topic} fresh (${score} mastery).` : `Keeps ${topic} fresh.`;
    case "REVISION_PRACTICE":
      return `Final revision of ${topic} before your exam.`;
    case "EXTRA_PRACTICE":
      return score ? `Extra practice on ${topic} (${score} mastery).` : `Extra practice on ${topic}.`;
    default:
      return REASON_FALLBACK[item.reason] ?? "Suggested for your plan.";
  }
}

const REASON_FALLBACK: Readonly<Record<string, string>> = {
  WEAK_TOPIC: "A topic that needs more work.",
  NEW_TOPIC: "A topic you haven't covered yet.",
  SPACED_REVIEW: "Due for review.",
  EXAM_PREPARATION: "Preparation for your exam.",
  FLASHCARDS_DUE: "Flashcards are due.",
  CATCH_UP: "Catching up on a missed session.",
  DIAGNOSTIC: "Sets your starting point.",
  ASSIGNMENT_DUE: "Work set by your teacher.",
  MAINTENANCE: "Keeps a strong topic fresh.",
};

export type ItemStatusTone = "success" | "info" | "neutral";

/** Status badge, or null for an open item. PARTIAL practice shows the questions done. */
export function planItemStatus(item: Pick<PlanItemCopy, "status" | "completedQuestions" | "targetQuestions">): { label: string; tone: ItemStatusTone } | null {
  switch (item.status) {
    case "DONE":
      return { label: "Done", tone: "success" };
    case "PARTIAL":
      return {
        label: item.targetQuestions && item.completedQuestions > 0 ? `${item.completedQuestions} of ${formatCount(item.targetQuestions, "question")}` : "Started",
        tone: "info",
      };
    case "SKIPPED":
      return { label: "Skipped", tone: "neutral" };
    case "MISSED":
      return { label: "Not done", tone: "neutral" };
    default:
      return null;
  }
}

/** True when the student can still start or tick the item. */
export function isOpenItem(status: PlanItemView["status"]): boolean {
  return status === "PENDING" || status === "PARTIAL" || status === "MISSED";
}

export interface ReasonGroup {
  key: string;
  title: string;
  detail: string;
}

function nameList(names: readonly string[], max = 4): string {
  const unique = [...new Set(names)];
  if (unique.length <= max) return unique.join(", ");
  return `${unique.slice(0, max).join(", ")} and ${formatCount(unique.length - max, "more topic")}`;
}

/**
 * "Why this plan" (§16): the reasons behind the coming fortnight's items, grouped — weak topics first, then new
 * syllabus, reviews, exam practice and the diagnostic. Built only from the items themselves.
 */
export function planReasonGroups(items: readonly PlanItemCopy[]): ReasonGroup[] {
  const by = (reasons: readonly string[]) => items.filter((i) => i.plannerReason !== null && reasons.includes(i.plannerReason));
  const groups: ReasonGroup[] = [];

  const weak = by(["WEAK_TOPIC_PRACTICE", "EXTRA_PRACTICE"])
    .filter((i) => i.topicName && i.masteryScore !== null && i.masteryScore < MASTERY_BAND_MIN_SCORE.COMPETENT)
    .sort((a, b) => (a.masteryScore ?? 0) - (b.masteryScore ?? 0));
  if (weak.length > 0) {
    const named = new Map<string, string>();
    for (const item of weak) if (!named.has(item.topicName as string)) named.set(item.topicName as string, `${item.topicName} (${mastery(item.masteryScore)})`);
    groups.push({ key: "weak", title: "Weak topics first", detail: `Focused practice where your mastery is lowest: ${nameList([...named.values()])}.` });
  }

  const fresh = by(["NEW_TOPIC_LESSON", "NEXT_LESSON", "CONTINUE_LESSON", "PRACTICE_AFTER_LESSON"]).flatMap((i) => (i.topicName ? [i.topicName] : []));
  if (fresh.length > 0) groups.push({ key: "syllabus", title: "Syllabus still to cover", detail: `Lessons in syllabus order, then practice: ${nameList(fresh)}.` });

  const unassessed = by(["UNASSESSED_TOPIC_PRACTICE"]).flatMap((i) => (i.topicName ? [i.topicName] : []));
  if (unassessed.length > 0) groups.push({ key: "unassessed", title: "Topics not assessed yet", detail: `Practice to find out where you stand: ${nameList(unassessed)}.` });

  const reviews = by(["SPACED_REVIEW"]).flatMap((i) => (i.topicName ? [i.topicName] : []));
  if (reviews.length > 0) groups.push({ key: "review", title: "Spaced reviews", detail: `Short re-tests a few days after practice, so it sticks: ${nameList(reviews)}.` });

  const mocks = by(["MOCK_EXAM_CADENCE"]);
  if (mocks.length > 0) {
    groups.push({
      key: "mocks",
      title: "Exam practice",
      detail: `${formatCount(mocks.length, "timed mock exam")} in the next two weeks, more often as your exam gets closer.`,
    });
  }

  const revision = by(["REVISION_PRACTICE"]);
  if (revision.length > 0) groups.push({ key: "revision", title: "Final revision", detail: "Close to the exam, practice and review come before new lessons." });

  const maintenance = by(["MAINTENANCE_PRACTICE"]).flatMap((i) => (i.topicName ? [i.topicName] : []));
  if (maintenance.length > 0) groups.push({ key: "maintenance", title: "Strong topics kept fresh", detail: `Lighter, less frequent practice: ${nameList(maintenance)}.` });

  const diagnostics = by(["DIAGNOSTIC_BASELINE"]).map((i) => i.subjectName);
  if (diagnostics.length > 0) {
    groups.push({ key: "diagnostic", title: "A starting point", detail: `A diagnostic first for ${nameList(diagnostics)}, which has no results yet. Lessons and practice follow it.` });
  }
  return groups;
}

/** "2 November 2026 (provisional date)", "Demo date (development only)" labels for the plan's exam date. */
export function examDateText(plan: Pick<PlanSummary, "examDate" | "exam">): string | null {
  if (!plan.examDate) return null;
  const date = formatLocalDate(plan.examDate);
  if (plan.exam?.isDemo) return `${date} (demo date, development only)`;
  if (plan.exam?.isProvisional) return `${date} (provisional date)`;
  return date;
}

/** "Exam in 42 days", "Exam today", "Exam date passed". */
export function examCountdownText(daysUntilExam: number | null): string | null {
  if (daysUntilExam === null) return null;
  if (daysUntilExam > 0) return `${formatCount(daysUntilExam, "day")} until your exam`;
  if (daysUntilExam === 0) return "Your exam starts today";
  return "Your exam date has passed";
}

/** Sum of minutes across the week (availability object). */
export function weeklyMinutes(availability: Readonly<Record<WeekdayKey, number>>): number {
  return WEEKDAYS.reduce((sum, day) => sum + (Number.isFinite(availability[day.key]) ? Math.max(0, availability[day.key]) : 0), 0);
}

/** "Mon 6": the short label of a date for the day selector. */
export function shortDayLabel(date: string): { day: string; number: string } {
  const instant = new Date(`${date}T12:00:00.000Z`);
  const weekday = WEEKDAYS[(instant.getUTCDay() + 6) % 7];
  return { day: weekday?.short ?? "", number: String(instant.getUTCDate()) };
}
