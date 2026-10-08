import { formatCount } from "@/lib/format";

/**
 * Deep links and labels for dashboard cards (§6 "Recommended: Mathematics / Quadratic Equations / 20 questions").
 * Pure and isomorphic. Recommendations themselves come from the progress service; these helpers only turn them
 * into links and words.
 */

export type DifficultyParam = "EASY" | "MEDIUM" | "HARD" | "ADAPTIVE";

/** Where a practice session was started from (the builder records it on the attempt). */
export type PracticeOriginParam = "PLAN_ITEM" | "RECOMMENDATION";

export interface PracticeLinkInput {
  subjectId: string;
  topicId?: string | null;
  count?: number | null;
  difficulty?: DifficultyParam;
  /** `RETEST` for spaced review (§11 "re-test later"). */
  mode?: "RETEST";
  origin?: PracticeOriginParam;
}

/** `/app/practice?subjectId=…&topicId=…&count=…&difficulty=…` (the practice builder's query contract). */
export function practiceHref({ subjectId, topicId, count, difficulty = "ADAPTIVE", mode, origin }: PracticeLinkInput): string {
  const params = new URLSearchParams({ subjectId });
  if (topicId) params.set("topicId", topicId);
  if (count && Number.isInteger(count) && count > 0) params.set("count", String(count));
  params.set("difficulty", difficulty);
  if (mode) params.set("mode", mode);
  if (origin) params.set("origin", origin);
  return `/app/practice?${params.toString()}`;
}

export type RecommendationKind = "LESSON" | "PRACTICE" | "TOPIC_TEST" | "FLASHCARDS" | "REVIEW";

/** A recommendation as its link needs it (progress recommendations and attempt-result recommendations). */
export interface RecommendationLinkInput {
  kind: RecommendationKind;
  topicId: string;
  lessonId?: string | null;
  questionCount?: number | null;
}

/**
 * Where a recommendation starts (§6 dashboard, §12 results "Probability → Lesson 4"): the lesson (or practice in the
 * topic when there is no lesson), a topic test, a flashcard review, or practice. Practice links let the adaptive
 * engine pick the level (`difficulty=ADAPTIVE`, §11 "reduce difficulty initially … increase difficulty") and record
 * `origin=RECOMMENDATION`; re-tests (REVIEW) open in RETEST mode, whose origin the builder sets itself.
 */
export function recommendationHref(rec: RecommendationLinkInput, subjectId: string): string {
  const topic = { subjectId, topicId: rec.topicId };
  switch (rec.kind) {
    case "LESSON":
      return rec.lessonId ? `/app/lessons/${rec.lessonId}` : practiceHref({ ...topic, origin: "RECOMMENDATION" });
    case "TOPIC_TEST":
      return `/app/exams?${new URLSearchParams(topic).toString()}`;
    case "FLASHCARDS":
      return `/app/flashcards/review?${new URLSearchParams(topic).toString()}`;
    case "REVIEW":
      return practiceHref({ ...topic, count: rec.questionCount ?? null, mode: "RETEST" });
    case "PRACTICE":
      return practiceHref({ ...topic, count: rec.questionCount ?? null, origin: "RECOMMENDATION" });
  }
}

const RECOMMENDATION_ACTIVITY: Readonly<Record<RecommendationKind, string>> = {
  LESSON: "Lesson",
  PRACTICE: "Practice",
  TOPIC_TEST: "Topic test",
  FLASHCARDS: "Flashcards",
  REVIEW: "Review",
};

/** The activity word for a recommendation kind. */
export function recommendationActivity(kind: string): string {
  return RECOMMENDATION_ACTIVITY[kind as RecommendationKind] ?? "Study";
}

/** The session size: "20 questions", the lesson's title, or the activity itself when there is no count. */
export function recommendationSize(rec: { kind: string; questionCount?: number; minutes?: number; lessonTitle: string | null }): string {
  if (rec.kind === "LESSON") return rec.lessonTitle ?? "Lesson";
  if (rec.questionCount && rec.questionCount > 0) return formatCount(rec.questionCount, "question");
  if (rec.minutes && rec.minutes > 0) return `${rec.minutes} min`;
  return recommendationActivity(rec.kind);
}

const REASON_LABELS: Readonly<Record<string, string>> = {
  WEAK_TOPIC: "Needs work",
  NEW_TOPIC: "Not started yet",
  SPACED_REVIEW: "Due for review",
  EXAM_PREPARATION: "Exam preparation",
  FLASHCARDS_DUE: "Cards due",
  CATCH_UP: "Catch up",
  DIAGNOSTIC: "Diagnostic",
  ASSIGNMENT_DUE: "Assignment due",
  MAINTENANCE: "Keep it fresh",
};

/** "Why this?" wording for plan items and recommendations (StudyPlanItemReason). */
export function reasonLabel(reason: string): string {
  return REASON_LABELS[reason] ?? "Suggested";
}

const ACTIVITY_LABELS: Readonly<Record<string, string>> = {
  LESSON: "Lesson",
  PRACTICE: "Practice",
  TEST: "Test",
  MOCK_EXAM: "Mock exam",
  DIAGNOSTIC: "Diagnostic",
  FLASHCARDS: "Flashcards",
  REVIEW: "Review",
  DAILY_QUESTION: "Daily question",
  AI_TUTOR: "Tutor",
};

/** Plan item activity (StudyActivityType). */
export function activityLabel(activityType: string): string {
  return ACTIVITY_LABELS[activityType] ?? "Study";
}

export interface PlanItemLinkInput {
  subjectId: string;
  topicId: string | null;
  lessonId: string | null;
  assessmentId: string | null;
  activityType: string;
  targetQuestions: number | null;
}

/** Where a plan item starts. Anything without a dedicated destination opens the plan itself. */
export function planItemHref(item: PlanItemLinkInput): string {
  switch (item.activityType) {
    case "LESSON":
      return item.lessonId ? `/app/lessons/${item.lessonId}` : "/app/plan";
    case "PRACTICE":
      return practiceHref({ subjectId: item.subjectId, topicId: item.topicId, count: item.targetQuestions, origin: "PLAN_ITEM" });
    case "REVIEW":
      return practiceHref({ subjectId: item.subjectId, topicId: item.topicId, count: item.targetQuestions, mode: "RETEST", origin: "PLAN_ITEM" });
    case "TEST":
    case "MOCK_EXAM":
      return item.assessmentId ? `/app/exams/${item.assessmentId}` : `/app/exams?subjectId=${encodeURIComponent(item.subjectId)}`;
    default:
      return "/app/plan";
  }
}

export type PartOfDay = "MORNING" | "AFTERNOON" | "EVENING";

/** "Good morning, Tariro" (part of day in the student's time zone, computed on the server). */
export function greetingText(partOfDay: PartOfDay, name: string | null): string {
  const greeting = partOfDay === "MORNING" ? "Good morning" : partOfDay === "AFTERNOON" ? "Good afternoon" : "Good evening";
  const trimmed = name?.trim();
  return trimmed ? `${greeting}, ${trimmed}` : greeting;
}

const ATTEMPT_MODE_LABELS: Readonly<Record<string, string>> = {
  PRACTICE: "Practice",
  RETEST: "Re-test",
  QUIZ: "Quiz",
  TOPIC_TEST: "Topic test",
  CHAPTER_TEST: "Chapter test",
  SUBJECT_TEST: "Subject test",
  TIMED_EXAM: "Timed exam",
  MOCK_EXAM: "Mock exam",
  DIAGNOSTIC: "Diagnostic",
};

/** Human label for an AttemptMode. */
export function attemptModeLabel(mode: string): string {
  return ATTEMPT_MODE_LABELS[mode] ?? "Test";
}
