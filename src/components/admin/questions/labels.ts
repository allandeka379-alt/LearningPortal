import type {
  AssessmentAssembly,
  AssessmentFeedbackTiming,
  AssessmentKind,
  CognitiveSkill,
  ContentAccessTier,
  CopyrightStatus,
} from "@/generated/prisma/enums";
import type { Entitlements } from "@/lib/billing/entitlements";
import type { MarkingMode, QuestionType } from "@/lib/questions/constants";

/**
 * UI copy for the question bank, assessment builder and study-pack screens (labels only — never content, rule 5).
 * Isomorphic: shared by Server and Client Components.
 */

export const QUESTION_TYPE_LABELS: Readonly<Record<QuestionType, string>> = {
  MULTIPLE_CHOICE: "Multiple choice",
  TRUE_FALSE: "True / false",
  SHORT_ANSWER: "Short answer",
  NUMERICAL: "Numerical answer",
  STRUCTURED: "Structured (parts)",
  ESSAY: "Essay",
  CALCULATION: "Calculation",
  MATCHING: "Matching",
  FILL_IN_THE_BLANK: "Fill in the blank",
  DIAGRAM_LABELLING: "Diagram labelling",
  EXTENDED_RESPONSE: "Extended response",
};

export const QUESTION_TYPE_HINTS: Readonly<Record<QuestionType, string>> = {
  MULTIPLE_CHOICE: "One or several correct options, each with its own feedback. Multi-select can award partial marks.",
  TRUE_FALSE: "A statement students mark true or false (or yes / no).",
  SHORT_ANSWER: "A word or phrase: accepted answers, normalisation and keyword rubric points.",
  NUMERICAL: "A number with tolerance, significant figures and units.",
  STRUCTURED: "Shared context with parts (a), (b), (c), each with its own type and marks.",
  ESSAY: "Free writing marked against your own mark-scheme points (AI-assisted or manual).",
  CALCULATION: "A numerical final answer plus method marks for the working.",
  MATCHING: "Pair items from two columns.",
  FILL_IN_THE_BLANK: "A sentence or paragraph with blanks, each with accepted answers.",
  DIAGRAM_LABELLING: "Students label hotspots on an image from your media library.",
  EXTENDED_RESPONSE: "A longer explanation marked against mark-scheme points.",
};

export const MARKING_MODE_LABELS: Readonly<Record<MarkingMode, string>> = {
  AUTO: "Automatic",
  AI_ASSISTED: "AI-assisted (mark scheme)",
  MANUAL: "Manual (teacher / self)",
};

export const DIFFICULTY_LABELS: Readonly<Record<number, string>> = {
  1: "1 · Very easy",
  2: "2 · Easy",
  3: "3 · Medium",
  4: "4 · Hard",
  5: "5 · Very hard",
};

export const SKILL_LABELS: Readonly<Record<CognitiveSkill, string>> = {
  RECALL: "Recall",
  UNDERSTANDING: "Understanding",
  APPLICATION: "Application",
  ANALYSIS: "Analysis",
  EVALUATION: "Evaluation",
  CREATION: "Creation",
};

export const ACCESS_TIER_LABELS: Readonly<Record<ContentAccessTier, string>> = {
  PUBLIC: "Public (anyone, SEO pages)",
  FREE: "Free (signed-in students)",
  PREMIUM: "Premium (plans and packs)",
};

export const COPYRIGHT_LABELS: Readonly<Record<CopyrightStatus, string>> = {
  OWNED: "Original (owned by the platform)",
  LICENSED: "Licensed (agreement on the source)",
  PUBLIC_DOMAIN: "Public domain",
  OPEN_LICENSE: "Open licence (e.g. CC BY)",
  UNVERIFIED: "Not yet verified",
};

export const ASSESSMENT_KIND_LABELS: Readonly<Record<AssessmentKind, string>> = {
  QUIZ: "Quiz",
  TOPIC_TEST: "Topic test",
  CHAPTER_TEST: "Chapter test",
  SUBJECT_TEST: "Subject test",
  MOCK_EXAM: "Mock exam",
  DIAGNOSTIC: "Diagnostic",
  TIMED_EXAM: "Timed exam",
};

export const ASSEMBLY_LABELS: Readonly<Record<AssessmentAssembly, string>> = {
  FIXED: "Fixed questions (same paper for everyone)",
  BLUEPRINT: "Blueprint (drawn per attempt from rules)",
  ADAPTIVE: "Adaptive (one at a time, within the rules)",
};

export const FEEDBACK_TIMING_LABELS: Readonly<Record<AssessmentFeedbackTiming, string>> = {
  IMMEDIATE: "After every question",
  AFTER_SUBMIT: "After the whole attempt is submitted",
  AFTER_CLOSE: "After the assignment window closes",
};

export const FLAG_REASON_LABELS: Readonly<Record<string, string>> = {
  INCORRECT_ANSWER: "Incorrect answer",
  AMBIGUOUS: "Ambiguous question",
  INCORRECT_MARKING: "Incorrect marking",
  WRONG_TOPIC: "Wrong topic",
  WRONG_DIFFICULTY: "Wrong difficulty",
  TYPO_OR_FORMATTING: "Typo or formatting",
  COPYRIGHT_CONCERN: "Copyright concern",
  OTHER: "Other",
};

export const FLAG_SOURCE_LABELS: Readonly<Record<string, string>> = {
  EDITOR: "Editor",
  STUDENT: "Student",
  TEACHER: "Teacher",
  SYSTEM: "Automatic check",
};

/** Feature switches of an entitlements document, in the order the pack editor lists them. */
export const ENTITLEMENT_FLAG_LABELS: readonly { key: keyof Entitlements; label: string }[] = [
  { key: "dailyQuestion", label: "Daily question" },
  { key: "diagnosticTest", label: "Diagnostic test" },
  { key: "mockExams", label: "Mock exams" },
  { key: "flashcards", label: "Flashcards" },
  { key: "studyPlan", label: "Personal study plan" },
  { key: "examCountdown", label: "Exam countdown" },
  { key: "aiTutor", label: "AI tutor" },
  { key: "aiImageUploads", label: "AI photo uploads" },
  { key: "personalisedLearning", label: "Personalised learning (not built: gates nothing)" },
  { key: "advancedAnalytics", label: "Detailed analytics" },
  { key: "leaderboards", label: "Leaderboards" },
  { key: "parentReports", label: "Parent reports" },
  { key: "pdfExport", label: "PDF export (not built: gates nothing)" },
  { key: "teacherDashboard", label: "Teacher dashboard" },
  { key: "studentManagement", label: "Student management" },
  { key: "assignments", label: "Assignments" },
  { key: "schoolAnalytics", label: "School analytics" },
];

/** Numeric allowances (null = unlimited, 0 = not included). */
export const ENTITLEMENT_LIMIT_LABELS: readonly { key: keyof Entitlements; label: string; unit: string }[] = [
  { key: "practiceQuestionsPerDay", label: "Practice questions", unit: "per day" },
  { key: "topicTestsPerWeek", label: "Topic tests", unit: "per week" },
  { key: "mockExamsPerMonth", label: "Mock exams", unit: "per month" },
  { key: "aiMessagesPerDay", label: "AI tutor messages", unit: "per day" },
  { key: "aiSolverPerDay", label: "AI solver questions", unit: "per day" },
];

export const PDF_TYPE_LABELS: Readonly<Record<string, string>> = {
  LESSON: "Lessons",
  QUESTION: "Questions",
  FLASHCARD: "Flashcards",
  ASSESSMENT: "Tests and mocks",
};

/** "Marked automatically", "Provisional mark"… for the engine's outcome codes. */
export const MARKING_OUTCOME_LABELS: Readonly<Record<string, string>> = {
  MARKED: "Marked automatically",
  NEEDS_REVIEW: "Needs a person to confirm",
  PENDING_AI: "Waiting for AI marking",
  UNANSWERED: "Not answered",
};

export function optionsOf<T extends string>(labels: Readonly<Record<T, string>>): { value: T; label: string }[] {
  return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));
}
