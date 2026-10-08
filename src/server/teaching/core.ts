import type { AssignmentProgressStatus, AssignmentStatus, AssignmentType, AttemptMode, MasteryBand } from "@/generated/prisma/enums";
import { QUESTION_TYPES, type QuestionType } from "@/lib/questions/constants";

/**
 * Pure rules of the teacher experience (§22) and the student-side class features (CLAUDE.md rule 2): join codes,
 * the class subject scope, assignment windows and late flags, progress summaries, weak-topic selection and practice
 * configuration. No I/O, no `server-only`: unit tested in core.test.ts and safe to import from UI code.
 */

// =====================================================================================================================
// Join codes
// =====================================================================================================================

/** Join-code alphabet: upper-case letters and digits without the look-alikes I, O, 0 and 1 (read aloud in class). */
export const JOIN_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
/** Length of generated codes (the database accepts `[A-Z0-9]{6,10}`). */
export const JOIN_CODE_LENGTH = 7;

/** A random integer in `[0, max)`. */
export type RandomInt = (max: number) => number;

/** A new join code drawn from {@link JOIN_CODE_ALPHABET}. */
export function generateJoinCode(random: RandomInt, length: number = JOIN_CODE_LENGTH): string {
  if (!Number.isInteger(length) || length < 6 || length > 10) throw new RangeError("Join codes are 6 to 10 characters long.");
  let code = "";
  for (let i = 0; i < length; i += 1) code += JOIN_CODE_ALPHABET[random(JOIN_CODE_ALPHABET.length)] ?? "A";
  return code;
}

/**
 * What a student typed as a join code, normalised to the stored form (upper case, spaces and dashes removed), or
 * `null` when it cannot be a code (`[A-Z0-9]{6,10}`, the database CHECK).
 */
export function normalizeJoinCode(input: string): string | null {
  const code = input.replace(/[\s-]+/g, "").toUpperCase();
  return /^[A-Z0-9]{6,10}$/.test(code) ? code : null;
}

/** Displays a code in two groups for reading aloud ("ABC DEFG"). */
export function formatJoinCode(code: string): string {
  if (code.length < 6) return code;
  const split = Math.floor(code.length / 2);
  return `${code.slice(0, split)} ${code.slice(split)}`;
}

// =====================================================================================================================
// Class subject scope (ARCHITECTURE §5.3: a teacher sees data only for the class's subject(s))
// =====================================================================================================================

export interface ClassSubjectScope {
  subjectIds: string[];
  /** True for a subject-less class: the subjects come from the class's (published) assignments. */
  derived: boolean;
}

/**
 * The subjects whose learning data a class's teachers may see: the class subject, or — for a subject-less class
 * (tutor groups, form classes) — the distinct subjects of the work actually set to the class. A subject-less class
 * with no published work exposes no subject data at all.
 */
export function deriveClassSubjectScope(classSubjectId: string | null, assignmentSubjectIds: readonly string[]): ClassSubjectScope {
  if (classSubjectId !== null) return { subjectIds: [classSubjectId], derived: false };
  return { subjectIds: [...new Set(assignmentSubjectIds)].sort(), derived: true };
}

/** Assignment statuses whose subject counts towards a subject-less class's scope (work the students were given). */
export const SCOPE_ASSIGNMENT_STATUSES: readonly AssignmentStatus[] = ["PUBLISHED", "CLOSED", "ARCHIVED"];

// =====================================================================================================================
// Assignment windows and per-student state
// =====================================================================================================================

export interface AssignmentTiming {
  status: AssignmentStatus;
  publishedAt: Date | null;
  dueAt: Date | null;
  closesAt: Date | null;
  allowLateSubmission: boolean;
}

/** Where an assignment is in its life, as students experience it. */
export type AssignmentWindow = "DRAFT" | "SCHEDULED" | "OPEN" | "PAST_DUE" | "CLOSED" | "ARCHIVED";

/**
 * The assignment's window at `now`: DRAFT / ARCHIVED from the status; SCHEDULED before `publishedAt`; CLOSED when the
 * status says so, after `closesAt`, or after the due date when late work is not allowed; PAST_DUE after `dueAt` while
 * late submissions are still accepted; otherwise OPEN.
 */
export function assignmentWindow(a: AssignmentTiming, now: Date): AssignmentWindow {
  if (a.status === "DRAFT") return "DRAFT";
  if (a.status === "ARCHIVED") return "ARCHIVED";
  if (a.publishedAt === null || a.publishedAt.getTime() > now.getTime()) return a.status === "CLOSED" ? "CLOSED" : "SCHEDULED";
  if (a.status === "CLOSED") return "CLOSED";
  if (a.closesAt !== null && a.closesAt.getTime() <= now.getTime()) return "CLOSED";
  if (a.dueAt !== null && a.dueAt.getTime() < now.getTime()) return a.allowLateSubmission ? "PAST_DUE" : "CLOSED";
  return "OPEN";
}

/** True when students can see the assignment (published and live at `now`, or closed after being live). */
export function isVisibleToStudents(a: AssignmentTiming, now: Date): boolean {
  const window = assignmentWindow(a, now);
  return window === "OPEN" || window === "PAST_DUE" || window === "CLOSED";
}

/** A student's state on one assignment, with the flags the lists show. */
export type StudentAssignmentState = "TO_DO" | "IN_PROGRESS" | "OVERDUE" | "SUBMITTED" | "LATE" | "MISSED" | "EXCUSED";

export interface StudentAssignmentView {
  state: StudentAssignmentState;
  /** Handed in after the due date. */
  late: boolean;
  /** Not handed in and the due date has passed. */
  overdue: boolean;
  /** Due within the next 48 hours and not handed in. */
  dueSoon: boolean;
  /** The student may start / continue work now. */
  canWork: boolean;
}

export const DUE_SOON_MS = 48 * 3_600_000;

/**
 * Combines the stored AssignmentProgress status with the assignment's window at `now` (statuses only change when
 * students act or the teacher closes the work, so "overdue" and "missed" are derived on read).
 */
export function studentAssignmentView(
  progress: { status: AssignmentProgressStatus } | null,
  a: AssignmentTiming,
  now: Date,
): StudentAssignmentView {
  const window = assignmentWindow(a, now);
  const status = progress?.status ?? "NOT_STARTED";
  const pastDue = a.dueAt !== null && a.dueAt.getTime() < now.getTime();
  const open = window === "OPEN" || window === "PAST_DUE";
  const dueSoon = a.dueAt !== null && !pastDue && a.dueAt.getTime() - now.getTime() <= DUE_SOON_MS;
  switch (status) {
    case "SUBMITTED":
      return { state: "SUBMITTED", late: false, overdue: false, dueSoon: false, canWork: open };
    case "LATE":
      return { state: "LATE", late: true, overdue: false, dueSoon: false, canWork: open };
    case "EXCUSED":
      return { state: "EXCUSED", late: false, overdue: false, dueSoon: false, canWork: false };
    case "MISSED":
      return { state: "MISSED", late: false, overdue: true, dueSoon: false, canWork: false };
    default: {
      if (window === "CLOSED") return { state: "MISSED", late: false, overdue: true, dueSoon: false, canWork: false };
      if (pastDue) return { state: "OVERDUE", late: false, overdue: true, dueSoon: false, canWork: open };
      return { state: status === "IN_PROGRESS" ? "IN_PROGRESS" : "TO_DO", late: false, overdue: false, dueSoon, canWork: open };
    }
  }
}

// =====================================================================================================================
// Progress summaries (Assignment cached counters, teacher lists)
// =====================================================================================================================

export interface ProgressRowLike {
  status: AssignmentProgressStatus;
  scorePercent: number | null;
}

export interface ProgressSummary {
  /** Students the work is assigned to (excused students excluded). */
  assigned: number;
  started: number;
  /** Handed in (on time or late). */
  submitted: number;
  late: number;
  missed: number;
  excused: number;
  /** Mean counted score of handed-in work that has a score; null without evidence. */
  averageScorePercent: number | null;
}

/** Summary of an assignment's progress rows (pure; the teacher list and the cached counters use it). */
export function summariseProgress(rows: readonly ProgressRowLike[]): ProgressSummary {
  let assigned = 0;
  let started = 0;
  let submitted = 0;
  let late = 0;
  let missed = 0;
  let excused = 0;
  let scoreSum = 0;
  let scored = 0;
  for (const row of rows) {
    if (row.status === "EXCUSED") {
      excused += 1;
      continue;
    }
    assigned += 1;
    if (row.status !== "NOT_STARTED" && row.status !== "MISSED") started += 1;
    if (row.status === "SUBMITTED" || row.status === "LATE") {
      submitted += 1;
      if (row.status === "LATE") late += 1;
      if (row.scorePercent !== null && Number.isFinite(row.scorePercent)) {
        scoreSum += row.scorePercent;
        scored += 1;
      }
    }
    if (row.status === "MISSED") missed += 1;
  }
  return {
    assigned,
    started,
    submitted,
    late,
    missed,
    excused,
    averageScorePercent: scored > 0 ? Math.round((scoreSum / scored) * 10) / 10 : null,
  };
}

/** The share of assigned students who handed the work in (0-100, one decimal), or null when nobody is assigned. */
export function completionPercent(summary: Pick<ProgressSummary, "assigned" | "submitted">): number | null {
  return summary.assigned > 0 ? Math.round((summary.submitted / summary.assigned) * 1000) / 10 : null;
}

// =====================================================================================================================
// Weak topics (§22 "identify weak topics")
// =====================================================================================================================

export interface TopicPerformanceLike {
  topicId: string;
  topicName: string;
  studentsStarted: number;
  averageMastery: number;
  weakStudents: number;
}

export interface WeakTopic extends TopicPerformanceLike {
  /** Share of the students who started the topic that sit in WEAK / DEVELOPING (0-100). */
  weakSharePercent: number;
}

/** Mastery below this (the COMPETENT threshold) flags a topic for the class. */
export const WEAK_TOPIC_MASTERY_THRESHOLD = 60;
/** ...or at least this share of the students who started it are weak. */
export const WEAK_TOPIC_SHARE_THRESHOLD = 40;

/**
 * Topics the class finds hard: average mastery below {@link WEAK_TOPIC_MASTERY_THRESHOLD}, or at least
 * {@link WEAK_TOPIC_SHARE_THRESHOLD}% of the students who started it in a weak band, and at least `minStudents`
 * students with evidence (one student's bad day is not a class weakness). Weakest first.
 */
export function selectWeakTopics(topics: readonly TopicPerformanceLike[], options: { minStudents?: number; limit?: number } = {}): WeakTopic[] {
  const minStudents = Math.max(1, options.minStudents ?? 2);
  const limit = Math.max(1, options.limit ?? 5);
  return topics
    .filter((t) => t.studentsStarted >= minStudents)
    .map((t) => ({ ...t, weakSharePercent: Math.round((t.weakStudents / t.studentsStarted) * 1000) / 10 }))
    .filter((t) => t.averageMastery < WEAK_TOPIC_MASTERY_THRESHOLD || t.weakSharePercent >= WEAK_TOPIC_SHARE_THRESHOLD)
    .sort((a, b) => a.averageMastery - b.averageMastery || b.weakSharePercent - a.weakSharePercent || a.topicName.localeCompare(b.topicName))
    .slice(0, limit);
}

/** Bands that count as "weak" for a student on a topic. */
export const WEAK_BANDS: readonly MasteryBand[] = ["WEAK", "DEVELOPING"];

// =====================================================================================================================
// Practice assignments
// =====================================================================================================================

export const PRACTICE_DIFFICULTIES = ["EASY", "MEDIUM", "HARD", "ADAPTIVE"] as const;
export type PracticeDifficulty = (typeof PRACTICE_DIFFICULTIES)[number];

/** Who a PRACTICE assignment targets: the whole class (and later joiners) or a fixed list chosen at creation. */
export type PracticeAudience = "CLASS" | "SELECTED";

/** Assignment.practiceConfig as stored (the attempt engine reads questionCount, difficulty, topicIds, timeLimitSeconds). */
export interface PracticeConfig {
  questionCount: number;
  difficulty: PracticeDifficulty;
  topicIds: string[];
  timeLimitSeconds?: number;
  feedback: "IMMEDIATE" | "ON_SUBMIT";
  audience: PracticeAudience;
}

export const MAX_PRACTICE_QUESTIONS = 60;

/** Builds the stored practice configuration (a time limit turns the work into a timed paper with feedback on submit). */
export function buildPracticeConfig(input: {
  questionCount: number;
  difficulty: PracticeDifficulty;
  topicIds: readonly string[];
  timeLimitMinutes?: number | null;
  audience?: PracticeAudience;
}): PracticeConfig {
  const questionCount = Math.min(MAX_PRACTICE_QUESTIONS, Math.max(1, Math.floor(input.questionCount)));
  const timed = input.timeLimitMinutes !== null && input.timeLimitMinutes !== undefined && input.timeLimitMinutes > 0;
  return {
    questionCount,
    difficulty: input.difficulty,
    topicIds: [...new Set(input.topicIds)],
    ...(timed ? { timeLimitSeconds: Math.round((input.timeLimitMinutes as number) * 60) } : {}),
    feedback: timed ? "ON_SUBMIT" : "IMMEDIATE",
    audience: input.audience ?? "CLASS",
  };
}

/** Reads the audience of a stored practice configuration (anything unexpected counts as the whole class). */
export function practiceAudience(config: unknown): PracticeAudience {
  return typeof config === "object" && config !== null && (config as { audience?: unknown }).audience === "SELECTED" ? "SELECTED" : "CLASS";
}

/**
 * Whether a student who joins the class later gets this assignment: class-wide work does, targeted practice (set for
 * chosen students, e.g. "the students weak on this topic") does not.
 */
export function assignsToNewMembers(a: { type: AssignmentType; practiceConfig: unknown }): boolean {
  return a.type !== "PRACTICE" || practiceAudience(a.practiceConfig) === "CLASS";
}

// =====================================================================================================================
// Teacher-written questions
// =====================================================================================================================

/** Question types a teacher can write in the class-test builder (diagram labelling needs the media library). */
export const TEACHER_QUESTION_TYPES = QUESTION_TYPES.filter((type) => type !== "DIAGRAM_LABELLING") as Exclude<QuestionType, "DIAGRAM_LABELLING">[];

// =====================================================================================================================
// Dates
// =====================================================================================================================

/** Validates the publication / due / close instants against each other and `now` (field errors, empty = valid). */
export function assignmentDateProblems(input: { publishedAt: Date | null; dueAt: Date | null; closesAt: Date | null }, now: Date): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  const reference = input.publishedAt ?? now;
  if (input.dueAt !== null && input.dueAt.getTime() <= now.getTime()) errors.dueAt = ["Choose a due date in the future."];
  else if (input.dueAt !== null && input.dueAt.getTime() < reference.getTime()) errors.dueAt = ["The due date must be after the work is published."];
  if (input.closesAt !== null) {
    if (input.closesAt.getTime() <= now.getTime()) errors.closesAt = ["Choose a closing time in the future."];
    else if (input.dueAt !== null && input.closesAt.getTime() < input.dueAt.getTime()) errors.closesAt = ["Close the work on or after the due date."];
  }
  return errors;
}

// =====================================================================================================================
// Student routing
// =====================================================================================================================

const PRACTICE_LIKE: readonly AttemptMode[] = ["PRACTICE", "RETEST", "LESSON_CHECK", "DAILY_QUESTION"];

/** Where a started attempt is worked on: practice-style modes in the practice player, tests in the exam room. */
export function attemptWorkHref(mode: AttemptMode, attemptId: string): string {
  return PRACTICE_LIKE.includes(mode) ? `/app/practice/${attemptId}` : `/app/exams/attempt/${attemptId}`;
}

// =====================================================================================================================
// Announcements
// =====================================================================================================================

/** True when a published announcement is live at `now` (not scheduled for later, not expired, not archived). */
export function isAnnouncementLive(a: { publishedAt: Date | null; expiresAt: Date | null; archivedAt: Date | null }, now: Date): boolean {
  if (a.archivedAt !== null || a.publishedAt === null) return false;
  if (a.publishedAt.getTime() > now.getTime()) return false;
  return a.expiresAt === null || a.expiresAt.getTime() > now.getTime();
}

// =====================================================================================================================
// People
// =====================================================================================================================

/** A person's name for class rosters: display name, else first + last, else a neutral label (never contact details). */
export function rosterName(profile: { displayName: string | null; firstName: string | null; lastName: string | null } | null | undefined): string {
  if (!profile) return "Student";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || "Student";
}

/** Academic year labels: "2026" or "2026/27". */
export const ACADEMIC_YEAR_PATTERN = /^\d{4}(\/\d{2})?$/;

/** Default due date for new work: a week from `now`, to the minute. */
export function defaultDueDate(now: Date = new Date(), days = 7): Date {
  const due = new Date(now.getTime() + days * 86_400_000);
  due.setUTCSeconds(0, 0);
  return due;
}

/** The default academic year for a new class: the calendar year (Zimbabwe's school year runs January to December). */
export function defaultAcademicYear(now: Date): string {
  return String(now.getUTCFullYear());
}
