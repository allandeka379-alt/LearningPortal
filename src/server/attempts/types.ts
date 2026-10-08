/**
 * Public contracts of the attempt engine (§10, §12, §13, §52). Type-only module: safe to import from route handlers,
 * Server Actions, the REST API and the WhatsApp channel. Nothing here carries answer data for a question that has not
 * been marked yet: {@link AttemptView} only ever holds `StudentQuestionView` projections plus the student's OWN saved
 * responses until the attempt's feedback rules allow a reveal.
 */
import type {
  AttemptMode,
  AttemptStatus,
  AttemptSubmitReason,
  ContentAccessTier,
  MarkingStatus,
  MasteryBand,
  Role,
} from "@/generated/prisma/client";
import type { AnswerReveal, StudentQuestionView } from "@/lib/questions";
import type { AttemptFeedbackJson } from "@/server/marking";
import type { TimerSnapshot } from "@/server/exams/timer";
import type { AttemptAnalysisJson, DifficultyChoice, FeedbackMode } from "./policy";

/**
 * The acting learner. Structurally satisfied by the auth `Actor` (src/server/auth/actor.ts), so routes pass their
 * actor straight through; tests and the worker may build the minimal shape. Learning actions require the
 * `learn.study` permission at scope "all" (the STUDENT role).
 */
export interface LearnerActor {
  userId: string;
  roles: readonly Role[];
  /** Transport (§30): recorded on AssessmentAttempt.channel. Default "web". */
  channel?: "web" | "api" | "whatsapp";
  /** IANA time zone for day boundaries; loaded from Profile.timezone when absent. */
  timeZone?: string;
}

/** Input of {@link startAttempt}. Exactly the fields the mode needs (validated per mode). */
export interface StartAttemptInput {
  mode: AttemptMode;
  subjectId: string;
  /** Topic scope (practice, re-test, diagnostic, generated timed paper); subtrees are expanded. */
  topicIds?: string[];
  /** Questions requested (generated modes). Defaults per mode. */
  count?: number;
  /** Difficulty of a generated session (§10 "20 questions, medium"). Default ADAPTIVE. */
  difficulty?: DifficultyChoice;
  /** Assessment definition (QUIZ … MOCK_EXAM; optional for TIMED_EXAM and DIAGNOSTIC). */
  assessmentId?: string;
  /** Teacher assignment this attempt is work for (§22). */
  assignmentId?: string;
  /** LESSON_CHECK: the lesson whose practice questions are attempted. */
  lessonId?: string;
  /** DAILY_QUESTION: a specific daily question (default: today's for the subject's qualification). */
  dailyQuestionId?: string;
  /** Generated TIMED_EXAM: time limit in minutes (default: estimated from the questions). */
  timeLimitMinutes?: number;
  /** Client idempotency key (offline replay / double tap): the same key returns the same attempt. */
  idempotencyKey?: string;
  /** Where the session was started from (analytics), e.g. "BUILDER", "PLAN_ITEM", "RECOMMENDATION". */
  origin?: "BUILDER" | "PLAN_ITEM" | "RECOMMENDATION" | "RETEST" | "MISTAKES" | "ASSIGNMENT" | "ONBOARDING" | "WHATSAPP";
}

/** Marking state of one slot, shown only when the attempt's feedback rules allow it. */
export interface SlotResult {
  status: MarkingStatus;
  /** Provisional while NEEDS_REVIEW; null while PENDING (AI marking). */
  marksAwarded: number | null;
  isCorrect: boolean | null;
  /** Per-part / per-point detail (QuestionAttempt.feedback). */
  feedback: AttemptFeedbackJson | null;
  /** Correct answer, explanation, rationale, mark scheme (§10). */
  reveal: AnswerReveal | null;
  /** The student may mark this answer against the mark scheme (AI marking not configured; see `recordSelfAssessment`). */
  selfAssessable: boolean;
}

/** One question slot of an attempt as the student sees it. */
export interface AttemptSlotView {
  /** 1-based question number (§13 numbering). */
  position: number;
  sectionNumber: number | null;
  /** Marks allocated in this attempt (§13 "mark allocation"). */
  marksAvailable: number;
  flagged: boolean;
  answered: boolean;
  /** The student's own last saved response (never anyone else's, never the answer key). */
  response: unknown;
  /** Save counter of `response` (offline replays send a version; older ones are ignored). */
  responseVersion: number;
  /** Hints revealed so far (practice-style modes; always 0 in exam mode). */
  hintsUsed: number;
  /**
   * Sanitised HTML of the hints already revealed, in order (the student has seen them, so a reload shows them again).
   * Never contains a hint that was not revealed.
   */
  revealedHints: string[];
  /** Client-safe projection; null when the question can no longer be loaded (archived after the attempt). */
  question: StudentQuestionView | null;
  /** Null until the slot is marked AND feedback may be shown. */
  result: SlotResult | null;
}

export interface AttemptSectionView {
  sectionNumber: number;
  title: string;
  /** "Answer any N" (null = answer all). */
  answerCount: number | null;
  maxMarks: number | null;
  timeLimitSeconds: number | null;
  startedAt: Date | null;
  deadlineAt: Date | null;
  /** When the paper was finished (early by the student, or when the attempt closed). */
  submittedAt: Date | null;
  marksAwarded: number | null;
}

/** Score summary of a closed attempt (§12 "score, percentage, grade estimate"). */
export interface AttemptScore {
  marksAwarded: number;
  totalMarks: number;
  /** 0–100, one decimal; practice modes: of the answered questions' marks. Null when nothing was marked. */
  percentage: number | null;
  /** True while answers wait for AI or human review (provisional marks). */
  isProvisional: boolean;
  pendingReviewCount: number;
  answeredCount: number;
  correctCount: number;
  questionCount: number;
}

/** Grade ESTIMATE (never an official grade, CLAUDE.md rule 6): always show `disclaimer` next to it. */
export interface GradeEstimateView {
  grade: string;
  isPass: boolean;
  isEstimate: true;
  schemeId: string;
  schemeName: string;
  disclaimer: string | null;
}

/** Per-topic line of the results analysis, with display names resolved. */
export interface TopicResultView {
  topicId: string;
  topicName: string | null;
  marksAwarded: number;
  marksAvailable: number;
  percent: number | null;
  band: MasteryBand | null;
}

/** A recommendation with display names and an in-app link (§12 "Probability → Lesson 4"). */
export interface RecommendationView {
  kind: "LESSON" | "PRACTICE" | "TOPIC_TEST" | "FLASHCARDS";
  topicId: string;
  topicName: string | null;
  lessonId: string | null;
  lessonTitle: string | null;
  questionCount: number | null;
  reason: string;
  href: string | null;
}

/** Results of a closed attempt (§12 "detailed analysis", §52 "performance report"). */
export interface AttemptResult {
  attemptId: string;
  mode: AttemptMode;
  status: AttemptStatus;
  submittedAt: Date | null;
  submitReason: AttemptSubmitReason | null;
  score: AttemptScore;
  grade: GradeEstimateView | null;
  topics: TopicResultView[];
  strongTopicIds: string[];
  weakTopicIds: string[];
  recommendations: RecommendationView[];
  /** Raw stored analysis (version 1), for API clients. */
  analysis: AttemptAnalysisJson | null;
}

/** Everything the exam / practice UI needs to render an attempt (§13). */
export interface AttemptView {
  id: string;
  mode: AttemptMode;
  status: AttemptStatus;
  subject: { id: string; name: string };
  assessment: { id: string; title: string; kind: string; instructions: string | null; allowNavigation: boolean } | null;
  topicId: string | null;
  lessonId: string | null;
  assignmentId: string | null;
  feedback: FeedbackMode;
  startedAt: Date;
  deadlineAt: Date | null;
  submittedAt: Date | null;
  /** Server-authoritative timer (null for untimed attempts). */
  timer: TimerSnapshot | null;
  /** Extra-time accommodation applied to this attempt's timer (percent; null = none). */
  extraTimePercent: number | null;
  sections: AttemptSectionView[];
  questionCount: number;
  answeredCount: number;
  flaggedPositions: number[];
  /** §13 "review unanswered questions". */
  unansweredPositions: number[];
  lastPosition: number | null;
  allowNavigation: boolean;
  lateSync: boolean;
  questions: AttemptSlotView[];
  /** Present once the attempt is closed. */
  result: AttemptResult | null;
}

/** Returned by {@link startAttempt}. */
export interface StartedAttempt {
  attempt: AttemptView;
  /** True when an open attempt (or the idempotency key's attempt) was returned instead of a new one. */
  resumed: boolean;
  /** Requested minus selected questions (> 0 when the bank is too small for the request). */
  shortfall: number;
}

/** A lesson to "Study this topic" (§10), when one is available to the student. */
export interface StudyLessonLink {
  lessonId: string;
  title: string;
  accessTier: ContentAccessTier;
  href: string;
}

/** Immediate feedback after answering (§10: correct/incorrect, answer, explanation, concept, study link). */
export interface AnswerFeedback {
  attemptId: string;
  position: number;
  status: MarkingStatus;
  marksAwarded: number | null;
  marksAvailable: number;
  isCorrect: boolean | null;
  /** True when the slot had already been marked (idempotent replay: nothing changed). */
  alreadyAnswered: boolean;
  /** Stored per-part / per-point marking detail (QuestionAttempt.feedback: STRUCTURED parts, marker comment). */
  feedback: AttemptFeedbackJson | null;
  /** Short student-facing notes from the marker ("Check your units"). */
  notes: string[];
  correctAnswerDisplay: string | null;
  /** Sanitised HTML of the explanation ("why the answer is correct"). */
  explanationHtml: string | null;
  workedSolutionHtml: string | null;
  /** The relevant concept (§10), sanitised HTML. */
  conceptHtml: string | null;
  reveal: AnswerReveal | null;
  topic: { id: string; name: string } | null;
  studyLesson: StudyLessonLink | null;
  /**
   * Topic mastery after this answer, with the state just before it (`before` null = no evidence in the topic yet).
   * Null when the mark is not final yet (or on a replay).
   */
  mastery: { score: number; band: MasteryBand; before: { score: number; band: MasteryBand } | null } | null;
  /** The attempt was completed by this answer (practice sessions close after the last question). */
  attemptCompleted: boolean;
  nextPosition: number | null;
  result: AttemptResult | null;
  /** The student may mark this answer against the mark scheme (AI marking not configured; see `recordSelfAssessment`). */
  selfAssessable: boolean;
}

/** Returned by {@link saveResponse}. */
export interface SaveResponseResult {
  attemptId: string;
  position: number;
  saved: boolean;
  /** The save was older than the stored one (offline replay) and was ignored. */
  stale: boolean;
  lateSync: boolean;
  flagged: boolean;
  answered: boolean;
  responseVersion: number;
  timer: TimerSnapshot | null;
}

/** Summary of an auto-submit sweep (`exams.autoSubmit`). */
export interface AutoSubmitSummary {
  scanned: number;
  submitted: number;
  expired: number;
  abandoned: number;
  failed: number;
}
