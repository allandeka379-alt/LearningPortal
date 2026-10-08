import { formatPercent } from "@/lib/format";

/**
 * Wording and links for the topic and lesson pages. Pure and isomorphic (UI copy only; every name, title and number
 * comes from the database).
 */

const LESSON_KIND_LABELS: Readonly<Record<string, string>> = {
  LESSON: "Lesson",
  REVISION_NOTES: "Revision notes",
  WORKED_EXAMPLES: "Worked examples",
  EXAM_TIPS: "Exam tips",
  STUDY_GUIDE: "Study guide",
  ARTICLE: "Article",
};

/** "Worked examples" for WORKED_EXAMPLES; unknown kinds read "Lesson". */
export function lessonKindLabel(kind: string): string {
  return LESSON_KIND_LABELS[kind] ?? "Lesson";
}

const LESSON_STATE_LABELS: Readonly<Record<string, string>> = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In progress",
  NOT_STARTED: "Not started",
};

export function lessonStateLabel(state: string): string {
  return LESSON_STATE_LABELS[state] ?? "Not started";
}

const TOPIC_KIND_LABELS: Readonly<Record<string, string>> = {
  SECTION: "Section",
  TOPIC: "Topic",
  SUBTOPIC: "Subtopic",
};

export function topicKindLabel(kind: string): string {
  return TOPIC_KIND_LABELS[kind] ?? "Topic";
}

/** "2.1 Quadratic equations" when the syllabus gives a reference number. */
export function codedName(name: string, code: string | null | undefined): string {
  return code ? `${code} ${name}` : name;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface LessonHrefOptions {
  /** Read the lesson in this topic (`?topic=`) when it is tagged to several. */
  topicId?: string | null;
  /** Extra query parameters, e.g. `{ practice: "done" }`. */
  params?: Readonly<Record<string, string>>;
  hash?: string;
}

/** The lesson reader URL. */
export function lessonHref(lessonId: string, options: LessonHrefOptions = {}): string {
  const params = new URLSearchParams();
  if (options.topicId && UUID.test(options.topicId)) params.set("topic", options.topicId);
  for (const [key, value] of Object.entries(options.params ?? {})) params.set(key, value);
  const query = params.toString();
  return `/app/lessons/${lessonId}${query ? `?${query}` : ""}${options.hash ? `#${options.hash}` : ""}`;
}

/** A topic page in the student's subject. */
export function topicHref(subjectId: string, topicId: string): string {
  return `/app/subjects/${subjectId}/topics/${topicId}`;
}

/** Topic tests for a topic (the exams area filters by subject and topic). */
export function topicTestHref(subjectId: string, topicId: string): string {
  return `/app/exams?${new URLSearchParams({ subjectId, topicId }).toString()}`;
}

/** Element id of the lesson's practice questions section (links and redirects jump to it). */
export const LESSON_PRACTICE_ANCHOR = "lesson-practice";

/** "75% · 3 of 4 marks" for a finished lesson check; marks alone when there is no percentage. */
export function checkScoreText(percentage: number | null, marksAwarded: number | null, totalMarks: number | null): string {
  const marks = marksAwarded !== null && totalMarks !== null ? `${marksAwarded} of ${totalMarks} ${totalMarks === 1 ? "mark" : "marks"}` : null;
  if (percentage === null) return marks ?? "Not marked yet";
  return marks ? `${formatPercent(percentage)} · ${marks}` : formatPercent(percentage);
}

/** Accuracy over answered questions, or null without answers (never a made-up value). */
export function accuracyPercent(correct: number, attempted: number): number | null {
  return attempted > 0 ? Math.round((correct * 1000) / attempted) / 10 : null;
}
