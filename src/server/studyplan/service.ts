import "server-only";
import { z } from "zod";
import {
  Prisma,
  type AttemptMode,
  type Role,
  type StudyActivityType,
  type StudyPlanItemReason,
  type StudyPlanItemStatus,
  type TopicKind,
} from "@/generated/prisma/client";
import type { Entitlements } from "@/lib/billing/entitlements";
import {
  DEFAULT_TIMEZONE,
  addDays,
  dateColumnFromLocalDate,
  daysBetween,
  eachLocalDate,
  isLocalDate,
  isValidTimeZone,
  localDateFromDateColumn,
  localDateString,
  startOfLocalDay,
  startOfWeek,
  type LocalDate,
} from "@/lib/dates";
import { MASTERY_BAND_MIN_SCORE, masteryBandFromScore, type MasteryBand } from "@/lib/mastery-band";
import { roundHalfUp } from "@/lib/math";
import { hasPermission } from "@/server/auth/permissions";
import { assertEntitlement, getSubjectEntitlements, hasEntitlement } from "@/server/billing/entitlements";
import { ancestorIdsFromPath, buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { getGradeScheme, type GradeSchemeView } from "@/server/curriculum/grades";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { enqueue, registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";
import { getStudyDefaults } from "@/server/lib/settings";
import { inScopeLeafTopicIds, type ScopeRules, type ScopeTopic } from "@/server/progress/service";
import {
  WEEKDAY_KEYS,
  adaptPlan as adaptPlanCore,
  generatePlan,
  weekdayKey,
  type ExistingPlanItem,
  type PlanActivityType,
  type PlanInput,
  type PlanItem,
  type PlanReason,
  type PlanSubject,
  type PlannerConfig,
  type RecentSession,
  type WeeklyAvailability,
  type WeekdayKey,
} from "./generator";

/**
 * Personal study plan service (§16 "weekly schedule that adapts", §6 "daily target / current study plan", §52 step 7
 * "get a personalised study plan"; ARCHITECTURE §3.7 `studyplan.adapt`). Wires the pure planner (./generator) to
 * StudyPlan / StudyPlanItem:
 *
 * - {@link createPlan}: gathers the planner inputs from the database (ACTIVE enrolments, the PINNED syllabus version's
 *   in-scope topics, TopicMastery, unfinished published lessons, target grades → target scores, the last week of
 *   study history) and persists the plan. At most ONE ACTIVE plan per user (partial unique index): creating a plan
 *   with new settings marks the previous one SUPERSEDED and carries over work already done from today on.
 * - {@link adaptPlan} / {@link adaptPlanForUser}: re-plans from today, keeping completed (and partly done) items;
 *   pending items from today on are replaced. Run nightly and after diagnostics, practice and mocks through the
 *   `studyplan.adapt` job ({@link requestPlanAdaptation}, {@link registerStudyPlanJobs}).
 * - {@link recordPlanActivity} / {@link syncPlanProgress}: automatic completion matching. Practice answered on the
 *   item's day in the item's topic, a completed lesson, a submitted mock or diagnostic of the subject, or flashcards
 *   reviewed that day mark the matching item DONE (or PARTIAL). Idempotent: it recomputes from the evidence rows.
 * - {@link markItemDone}, {@link skipItem}, {@link reopenItem}: the student's own ticks.
 * - Read models for /app/plan and the REST API: {@link getPlanPage}, {@link getTodayPlan}, {@link getWeekPlan},
 *   {@link getPlanSetup}.
 *
 * Granularity: the planner works on TOPIC-kind nodes of the pinned version (§7 "Algebra 82%"), not on every leaf, so
 * a plan reads "Mathematics / Quadratic Equations / 20 questions". A topic is in the plan when at least one in-scope
 * leaf is under it (route papers, optional-topic choices, exam-year window — the same rules as the progress
 * dashboards). Practice is only planned where published questions exist, lessons only when the student's plan can
 * open them, mocks only when a published mock exists and the plan includes mocks: anything else stays unplanned
 * rather than inventing work (§50).
 *
 * Dates are student-local calendar dates (Profile time zone, default Africa/Harare).
 */

// =====================================================================================================================
// Constants and contracts
// =====================================================================================================================

/** Planner algorithm version recorded on each plan (reproducibility). */
export const GENERATOR_VERSION = "planner-1";
/** Days planned ahead (re-extended by every adaptation). */
export const PLAN_HORIZON_DAYS = 28;
/** Upper bound for one weekday's study time (10 hours). */
export const MAX_DAILY_STUDY_MINUTES = 600;
/** How far ahead a student-entered exam date may be. */
export const MAX_EXAM_DATE_DAYS_AHEAD = 3 * 366;
/** Job type (ARCHITECTURE §3.7): per user with `userId`, or the nightly sweep without it. */
export const STUDYPLAN_ADAPT_JOB = "studyplan.adapt";
/** Questions a plan link may request (the practice builder's maximum session size). */
export const MAX_PLAN_PRACTICE_QUESTIONS = 60;

const HISTORY_DAYS = 8;
const LONG_HISTORY_DAYS = 31;
const TX_OPTIONS = { maxWait: 10_000, timeout: 30_000 } as const;
const CLOSED_ATTEMPT_STATUSES = ["SUBMITTED", "AWAITING_MARKING", "MARKED"] as const;

/** The acting student. Structurally satisfied by the auth `Actor`. */
export interface PlanActor {
  userId: string;
  roles: readonly Role[];
  /** IANA zone; falls back to the profile, then Africa/Harare. */
  timeZone?: string;
}

/** Where the plan's exam date came from. `NONE` = no exam date: a rolling plan that keeps topics moving. */
export type ExamDateSource = "INPUT" | "TARGET_SESSION" | "STUDENT_TARGET" | "NONE";

const uuid = z.uuid();

const minutesSchema = z
  .number({ error: "Enter the minutes as a number." })
  .int("Use whole minutes.")
  .min(0, "Minutes can't be negative.")
  .max(MAX_DAILY_STUDY_MINUTES, `At most ${MAX_DAILY_STUDY_MINUTES} minutes a day.`);

/** Minutes available on each weekday (§16 "time available"). At least one day must have time. */
export const availabilitySchema = z
  .strictObject({
    mon: minutesSchema,
    tue: minutesSchema,
    wed: minutesSchema,
    thu: minutesSchema,
    fri: minutesSchema,
    sat: minutesSchema,
    sun: minutesSchema,
  })
  .refine((value) => Object.values(value).some((minutes) => minutes > 0), { message: "Choose at least one day with study time." });

const localDateSchema = z.string().trim().refine(isLocalDate, "Enter a valid date.");

/** Input of {@link createPlan}. */
export const createPlanSchema = z.strictObject({
  /** Subjects to plan (default: every ACTIVE enrolment). */
  subjectIds: z.array(uuid).min(1, "Choose at least one subject.").max(20).optional(),
  availability: availabilitySchema,
  /** Exam date (student-local). Omitted → the target examination session; null → no exam date. */
  examDate: localDateSchema.nullable().optional(),
});
export type CreatePlanInput = z.input<typeof createPlanSchema>;

const reasonDataSchema = z.looseObject({
  plannerReason: z.string().optional(),
  masteryScore: z.number().optional(),
  band: z.string().optional(),
  daysToExam: z.number().optional(),
});

const planInputsSchema = z.looseObject({
  subjects: z.array(z.looseObject({ subjectId: z.string() })).catch([]),
  timezone: z.string().optional().catch(undefined),
  examDate: z.string().nullable().optional().catch(null),
  examDateSource: z.enum(["INPUT", "TARGET_SESSION", "STUDENT_TARGET", "NONE"]).optional().catch(undefined),
  examSessionId: z.string().nullable().optional().catch(null),
});

type PlanInputs = z.output<typeof planInputsSchema>;

/** Stored plan inputs (StudyPlan.inputs) read defensively: anything unreadable counts as empty. */
function readPlanInputs(raw: unknown): PlanInputs {
  const parsed = planInputsSchema.safeParse(raw ?? {});
  return parsed.success ? parsed.data : { subjects: [] };
}

// =====================================================================================================================
// Small helpers
// =====================================================================================================================

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

function assertStudent(actor: PlanActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("Only students have a study plan.");
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

async function zoneOf(userId: string, actorZone?: string): Promise<string> {
  if (actorZone && isValidTimeZone(actorZone)) return actorZone;
  const profile = await db.profile.findUnique({ where: { userId }, select: { timezone: true } });
  return safeZone(profile?.timezone);
}

const weeklyTotal = (availability: WeeklyAvailability) => WEEKDAY_KEYS.reduce((sum, key) => sum + availability[key], 0);

/** Stored availability JSON → a valid weekly availability (zeros for anything unreadable). */
export function readAvailability(raw: unknown): WeeklyAvailability {
  const source = raw !== null && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const minutesOf = (value: unknown) =>
    typeof value === "number" && Number.isFinite(value) ? Math.min(MAX_DAILY_STUDY_MINUTES, Math.max(0, Math.round(value))) : 0;
  return Object.fromEntries(WEEKDAY_KEYS.map((key) => [key, minutesOf(source[key])])) as Record<WeekdayKey, number>;
}

async function lockUserPlans(tx: DbClient, userId: string): Promise<void> {
  await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${`studyplan:${userId}`}, 0))) l`;
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

const compareIds = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// =====================================================================================================================
// Pure core: planning units, lessons, reasons (unit tested in service.test.ts)
// =====================================================================================================================

/** A topic node as the unit computation needs it (tree order expected). */
export interface UnitTopic {
  id: string;
  parentId: string | null;
  kind: TopicKind;
  path: string;
}

export interface PlanningUnits {
  /** Planning units (topics the plan schedules) in tree order. */
  unitIds: string[];
  /** Topic id → its planning unit (the topic itself, the nearest TOPIC-kind ancestor, …). Absent above unit level. */
  unitOf: Map<string, string>;
}

/**
 * Planning units of one enrolment (pure): the TOPIC-kind nodes that hold at least one in-scope leaf (§7 topic level).
 * A tree without TOPIC nodes plans its roots; a leaf that sits under no TOPIC node in a tree that has them is its own
 * unit. Nodes above unit level (sections) map to no unit.
 */
export function planningUnits(topics: readonly UnitTopic[], inScopeLeafIds: ReadonlySet<string>): PlanningUnits {
  const byId = new Map(topics.map((t) => [t.id, t]));
  const hasChildren = new Set(topics.map((t) => t.parentId).filter((id): id is string => id !== null));
  const hasTopicKind = topics.some((t) => t.kind === "TOPIC");
  const unitOf = new Map<string, string>();
  for (const topic of topics) {
    const chain = [...ancestorIdsFromPath(topic.path), topic.id];
    const nearestTopic = [...chain].reverse().find((id) => byId.get(id)?.kind === "TOPIC");
    if (nearestTopic) unitOf.set(topic.id, nearestTopic);
    else if (!hasTopicKind) unitOf.set(topic.id, chain[0] ?? topic.id);
    else if (!hasChildren.has(topic.id)) unitOf.set(topic.id, topic.id);
  }
  const unitIds: string[] = [];
  const seen = new Set<string>();
  for (const topic of topics) {
    if (!inScopeLeafIds.has(topic.id)) continue;
    const unit = unitOf.get(topic.id);
    if (unit && !seen.has(unit)) {
      seen.add(unit);
      unitIds.push(unit);
    }
  }
  return { unitIds, unitOf };
}

export interface LessonLinkInput {
  topicId: string;
  lessonId: string;
  sortOrder: number;
  minutes: number;
}

/**
 * Unfinished lessons per planning unit, in syllabus order (pure). A lesson tagged inside a unit belongs to it; one
 * tagged above unit level (a section) goes to the first unit under that node. Each lesson is planned once (its first
 * unit wins).
 */
export function assignLessonsToUnits(
  topics: readonly UnitTopic[],
  units: PlanningUnits,
  links: readonly LessonLinkInput[],
): Map<string, { lessonId: string; minutes: number }[]> {
  const order = new Map(topics.map((t, index) => [t.id, index]));
  const unitIndex = new Map(units.unitIds.map((id, index) => [id, index]));
  const pathOf = new Map(topics.map((t) => [t.id, t.path]));
  const unitFor = (topicId: string): string | undefined => {
    const direct = units.unitOf.get(topicId);
    if (direct !== undefined && unitIndex.has(direct)) return direct;
    const prefix = `${pathOf.get(topicId) ?? topicId}/`;
    return units.unitIds.find((unitId) => (pathOf.get(unitId) ?? "").startsWith(prefix));
  };
  const placed = links
    .map((link) => ({ link, unit: unitFor(link.topicId) }))
    .filter((entry): entry is { link: LessonLinkInput; unit: string } => entry.unit !== undefined)
    .sort(
      (a, b) =>
        (unitIndex.get(a.unit) ?? 0) - (unitIndex.get(b.unit) ?? 0) ||
        (order.get(a.link.topicId) ?? 0) - (order.get(b.link.topicId) ?? 0) ||
        a.link.sortOrder - b.link.sortOrder ||
        compareIds(a.link.lessonId, b.link.lessonId),
    );
  const out = new Map<string, { lessonId: string; minutes: number }[]>();
  const used = new Set<string>();
  for (const { link, unit } of placed) {
    if (used.has(link.lessonId)) continue;
    used.add(link.lessonId);
    out.set(unit, [...(out.get(unit) ?? []), { lessonId: link.lessonId, minutes: link.minutes }]);
  }
  return out;
}

const PLANNER_REASON_TO_DB: Readonly<Record<PlanReason, StudyPlanItemReason>> = {
  DIAGNOSTIC_BASELINE: "DIAGNOSTIC",
  MOCK_EXAM_CADENCE: "EXAM_PREPARATION",
  FLASHCARD_REVIEW: "FLASHCARDS_DUE",
  SPACED_REVIEW: "SPACED_REVIEW",
  WEAK_TOPIC_PRACTICE: "WEAK_TOPIC",
  NEW_TOPIC_LESSON: "NEW_TOPIC",
  NEXT_LESSON: "NEW_TOPIC",
  CONTINUE_LESSON: "NEW_TOPIC",
  PRACTICE_AFTER_LESSON: "NEW_TOPIC",
  UNASSESSED_TOPIC_PRACTICE: "NEW_TOPIC",
  MAINTENANCE_PRACTICE: "MAINTENANCE",
  REVISION_PRACTICE: "EXAM_PREPARATION",
  EXTRA_PRACTICE: "MAINTENANCE",
};

const PLANNER_REASONS = new Set<string>(Object.keys(PLANNER_REASON_TO_DB));

/** True for a planner reason code (`WEAK_TOPIC_PRACTICE`, …). */
export function isPlannerReason(value: unknown): value is PlanReason {
  return typeof value === "string" && PLANNER_REASONS.has(value);
}

/**
 * The stored "why this?" of a planned item (pure): the coarse StudyPlanItemReason plus the facts behind it
 * (StudyPlanItem.reasonData: planner reason, topic mastery at planning time, days to the exam).
 */
export function itemReason(
  item: Pick<PlanItem, "reason" | "date">,
  mastery: number | null,
  examDate: LocalDate | null,
): { reason: StudyPlanItemReason; reasonData: { plannerReason: PlanReason; masteryScore?: number; band?: MasteryBand; daysToExam?: number } } {
  let reason = PLANNER_REASON_TO_DB[item.reason];
  if (item.reason === "EXTRA_PRACTICE" && mastery !== null && roundHalfUp(mastery) < MASTERY_BAND_MIN_SCORE.COMPETENT) reason = "WEAK_TOPIC";
  const daysToExam = examDate !== null ? daysBetween(item.date, examDate) : null;
  return {
    reason,
    reasonData: {
      plannerReason: item.reason,
      ...(mastery !== null ? { masteryScore: roundHalfUp(mastery, 1), band: masteryBandFromScore(mastery) } : {}),
      ...(daysToExam !== null && daysToExam > 0 ? { daysToExam } : {}),
    },
  };
}

/** Planner activity for a stored activity type (TEST is planned like practice). */
function plannerActivity(type: StudyActivityType): PlanActivityType {
  switch (type) {
    case "LESSON":
    case "PRACTICE":
    case "FLASHCARDS":
    case "REVIEW":
    case "MOCK_EXAM":
    case "DIAGNOSTIC":
      return type;
    default:
      return "PRACTICE";
  }
}

// =====================================================================================================================
// Pure core: completion matching (unit tested)
// =====================================================================================================================

/** A plan item as completion matching needs it. */
export interface MatchableItem {
  id: string;
  date: LocalDate;
  sortOrder: number;
  subjectId: string;
  topicId: string | null;
  lessonId: string | null;
  activityType: StudyActivityType;
  status: StudyPlanItemStatus;
  targetQuestions: number | null;
  completedQuestions: number;
  /** Evidence before the item was planned never completes it. */
  createdAt: Date;
}

/** One answered practice question. `topicIds` = the question's topic and all its ancestors. */
export interface QuestionEvidence {
  subjectId: string;
  date: LocalDate;
  at: Date;
  kind: "PRACTICE" | "REVIEW";
  topicIds: readonly string[];
}

/** A mock exam or diagnostic attempt of the student. */
export interface AttemptEvidence {
  id: string;
  subjectId: string;
  mode: "MOCK_EXAM" | "DIAGNOSTIC";
  /** Submitted (closed) or still open. */
  closed: boolean;
  /** submittedAt for closed attempts, startedAt for open ones. */
  at: Date;
  date: LocalDate;
}

/** The student's progress in a planned lesson. */
export interface LessonEvidence {
  lessonId: string;
  completedAt: Date | null;
  /** Local date the lesson was last opened (null when unknown). */
  viewedOn: LocalDate | null;
}

export interface ProgressEvidence {
  questions: readonly QuestionEvidence[];
  attempts: readonly AttemptEvidence[];
  lessons: readonly LessonEvidence[];
  /** Local dates with flashcard reviews. */
  flashcardDates: ReadonlySet<LocalDate>;
}

export interface ItemProgressUpdate {
  id: string;
  status: "DONE" | "PARTIAL";
  completedQuestions: number;
  completedAt: Date | null;
}

const SMALLINT_MAX = 32_767;

/**
 * Matches the student's actual work to plan items (pure, idempotent: the same evidence always gives the same result).
 *
 * - PRACTICE / REVIEW (and TEST) items on a date in `questionDates` take questions answered that day, after the item
 *   was planned, in the item's topic (or a subtopic) of the same subject — REVIEW items take re-test answers first,
 *   PRACTICE items practice answers first, then either. Each answer counts once; an item takes at most its target.
 *   DONE at the target (or one answer when it has none), PARTIAL below it.
 * - LESSON items are DONE once the lesson is completed (whenever that happened); PARTIAL when the lesson was opened on
 *   the item's day.
 * - MOCK_EXAM / DIAGNOSTIC items take the first unused attempt of that mode and subject submitted after the item was
 *   planned and no later than its day (so working ahead counts); PARTIAL while such an attempt is open on its day.
 *   Items already DONE consume an attempt first, so one attempt never completes two items.
 * - FLASHCARDS items are DONE on a day with flashcard reviews.
 *
 * Statuses only move forward (PENDING / MISSED → PARTIAL → DONE); SKIPPED items are the student's choice and are never
 * touched; question counts never decrease. Returns only the items that change.
 */
export function matchPlanProgress(
  items: readonly MatchableItem[],
  evidence: ProgressEvidence,
  options: { questionDates: ReadonlySet<LocalDate>; now: Date },
): ItemProgressUpdate[] {
  const sorted = [...items].sort((a, b) => daysBetween(b.date, a.date) || a.sortOrder - b.sortOrder || compareIds(a.id, b.id));
  const results = new Map<string, { status: StudyPlanItemStatus; questions: number; completedAt: Date | null }>();
  const result = (item: MatchableItem) => {
    let entry = results.get(item.id);
    if (!entry) {
      entry = { status: item.status, questions: item.completedQuestions, completedAt: null };
      results.set(item.id, entry);
    }
    return entry;
  };
  const advance = (item: MatchableItem, status: "DONE" | "PARTIAL", at: Date | null) => {
    const entry = result(item);
    if (entry.status === "DONE" || entry.status === "SKIPPED") return;
    if (status === "PARTIAL" && entry.status === "PARTIAL") return;
    entry.status = status;
    entry.completedAt = status === "DONE" ? at : null;
  };

  // --- Practice and review: answers on the item's day ---
  const questionItems = sorted.filter(
    (i) => (i.activityType === "PRACTICE" || i.activityType === "REVIEW" || i.activityType === "TEST") && i.status !== "SKIPPED" && options.questionDates.has(i.date),
  );
  const used = new Set<number>();
  const credited = new Map<string, { count: number; last: Date | null }>();
  const fits = (item: MatchableItem, q: QuestionEvidence) =>
    q.subjectId === item.subjectId && q.date === item.date && q.at.getTime() >= item.createdAt.getTime() && (item.topicId === null || q.topicIds.includes(item.topicId));
  const take = (item: MatchableItem, kind: QuestionEvidence["kind"] | null) => {
    const capacity = item.targetQuestions && item.targetQuestions > 0 ? item.targetQuestions : 1;
    const entry = credited.get(item.id) ?? { count: 0, last: null };
    evidence.questions.forEach((q, index) => {
      if (entry.count >= capacity || used.has(index) || (kind !== null && q.kind !== kind) || !fits(item, q)) return;
      used.add(index);
      entry.count += 1;
      if (entry.last === null || q.at.getTime() > entry.last.getTime()) entry.last = q.at;
    });
    credited.set(item.id, entry);
  };
  for (const item of questionItems) take(item, item.activityType === "REVIEW" ? "REVIEW" : "PRACTICE");
  for (const item of questionItems) take(item, null);
  for (const item of questionItems) {
    const entry = credited.get(item.id);
    if (!entry || entry.count === 0) continue;
    const target = item.targetQuestions && item.targetQuestions > 0 ? item.targetQuestions : 1;
    const record = result(item);
    record.questions = Math.min(SMALLINT_MAX, Math.max(record.questions, entry.count));
    advance(item, entry.count >= target ? "DONE" : "PARTIAL", entry.last ?? options.now);
  }

  // --- Lessons ---
  const lessons = new Map(evidence.lessons.map((l) => [l.lessonId, l]));
  for (const item of sorted) {
    if (item.activityType !== "LESSON" || item.lessonId === null || item.status === "SKIPPED") continue;
    const progress = lessons.get(item.lessonId);
    if (!progress) continue;
    if (progress.completedAt) advance(item, "DONE", progress.completedAt);
    else if (progress.viewedOn === item.date) advance(item, "PARTIAL", null);
  }

  // --- Mock exams and diagnostics ---
  const consumed = new Set<string>();
  for (const item of sorted) {
    if ((item.activityType !== "MOCK_EXAM" && item.activityType !== "DIAGNOSTIC") || item.status === "SKIPPED") continue;
    const match = evidence.attempts.find(
      (a) =>
        a.closed &&
        !consumed.has(a.id) &&
        a.mode === item.activityType &&
        a.subjectId === item.subjectId &&
        a.at.getTime() >= item.createdAt.getTime() &&
        daysBetween(a.date, item.date) >= 0,
    );
    if (match) {
      consumed.add(match.id);
      advance(item, "DONE", match.at);
      continue;
    }
    const open = evidence.attempts.some(
      (a) => !a.closed && a.mode === item.activityType && a.subjectId === item.subjectId && a.date === item.date && a.at.getTime() >= item.createdAt.getTime(),
    );
    if (open) advance(item, "PARTIAL", null);
  }

  // --- Flashcards ---
  for (const item of sorted) {
    if (item.activityType === "FLASHCARDS" && item.status !== "SKIPPED" && evidence.flashcardDates.has(item.date)) advance(item, "DONE", options.now);
  }

  const updates: ItemProgressUpdate[] = [];
  for (const item of sorted) {
    const entry = results.get(item.id);
    if (!entry) continue;
    const statusChanged = entry.status !== item.status;
    if (!statusChanged && entry.questions === item.completedQuestions) continue;
    // `advance` only ever moves to DONE / PARTIAL; a count-only change happens on items already DONE / PARTIAL.
    const status = statusChanged ? entry.status : item.status;
    if (status !== "DONE" && status !== "PARTIAL") continue;
    updates.push({
      id: item.id,
      status,
      completedQuestions: entry.questions,
      // null = leave completedAt as stored.
      completedAt: statusChanged && status === "DONE" ? (entry.completedAt ?? options.now) : null,
    });
  }
  return updates;
}

// =====================================================================================================================
// Planner inputs from the database
// =====================================================================================================================

const SESSION_SELECT = { id: true, name: true, startsOn: true, isProvisional: true, isDemo: true } as const;

const ENROLLMENT_SELECT = {
  id: true,
  subjectId: true,
  syllabusId: true,
  routeId: true,
  targetGrade: true,
  diagnosticCompletedAt: true,
  createdAt: true,
  subject: { select: { name: true, sortOrder: true, qualificationId: true, qualification: { select: { name: true } } } },
  targetExamSession: { select: { ...SESSION_SELECT, year: true } },
  topicChoices: { select: { topicId: true } },
} as const satisfies Prisma.SubjectEnrollmentSelect;

type EnrollmentRow = Prisma.SubjectEnrollmentGetPayload<{ select: typeof ENROLLMENT_SELECT }>;

async function activeEnrollments(client: DbClient, userId: string): Promise<EnrollmentRow[]> {
  return client.subjectEnrollment.findMany({
    where: { userId, status: "ACTIVE" },
    select: ENROLLMENT_SELECT,
    orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
  });
}

interface SyllabusStructure {
  topics: ScopeTopic[];
  byId: Map<string, ScopeTopic>;
  topicComponents: Map<string, string[]>;
  defaultRouteId: string | null;
  routeComponents: Map<string, Set<string>>;
}

async function loadStructures(client: DbClient, syllabusIds: readonly string[]): Promise<Map<string, SyllabusStructure>> {
  const out = new Map<string, SyllabusStructure>();
  if (syllabusIds.length === 0) return out;
  const ids = [...new Set(syllabusIds)];
  const [rows, links, routes] = await Promise.all([
    client.topic.findMany({
      where: { syllabusId: { in: ids } },
      select: {
        id: true,
        syllabusId: true,
        parentId: true,
        kind: true,
        depth: true,
        path: true,
        sortOrder: true,
        code: true,
        name: true,
        isOptional: true,
        examYearFrom: true,
        examYearTo: true,
      },
    }),
    client.topicComponent.findMany({ where: { topic: { syllabusId: { in: ids } } }, select: { topicId: true, componentId: true } }),
    client.syllabusRoute.findMany({
      where: { syllabusId: { in: ids } },
      select: { id: true, syllabusId: true, isDefault: true, componentLinks: { select: { componentId: true } } },
    }),
  ]);
  const topicComponents = new Map<string, string[]>();
  for (const link of links) topicComponents.set(link.topicId, [...(topicComponents.get(link.topicId) ?? []), link.componentId]);
  for (const syllabusId of ids) {
    const own = rows.filter((r) => r.syllabusId === syllabusId);
    const ordered: ScopeTopic[] = flattenTopicTree(buildTopicTree(own)).map((node) => ({
      id: node.id,
      parentId: node.parentId,
      kind: node.kind,
      depth: node.depth,
      path: node.path,
      sortOrder: node.sortOrder,
      code: node.code,
      name: node.name,
      isOptional: node.isOptional,
      examYearFrom: node.examYearFrom,
      examYearTo: node.examYearTo,
    }));
    const ownRoutes = routes.filter((r) => r.syllabusId === syllabusId);
    out.set(syllabusId, {
      topics: ordered,
      byId: new Map(ordered.map((t) => [t.id, t])),
      topicComponents,
      defaultRouteId: ownRoutes.find((r) => r.isDefault)?.id ?? null,
      routeComponents: new Map(ownRoutes.map((r) => [r.id, new Set(r.componentLinks.map((l) => l.componentId))])),
    });
  }
  return out;
}

function scopeRulesFor(structure: SyllabusStructure, enrollment: EnrollmentRow): ScopeRules {
  const routeId = enrollment.routeId ?? structure.defaultRouteId;
  const routeComponents = routeId ? structure.routeComponents.get(routeId) : undefined;
  return {
    routeComponentIds: routeComponents && routeComponents.size > 0 ? routeComponents : null,
    topicComponents: structure.topicComponents,
    chosenTopicIds: new Set(enrollment.topicChoices.map((c) => c.topicId)),
    examYear: enrollment.targetExamSession?.year ?? null,
  };
}

/** Everything the planner and the post-filters need, per subject. */
interface SubjectContext {
  enrollment: EnrollmentRow;
  structure: SyllabusStructure;
  units: PlanningUnits;
  /** Unit → current mastery (null = not assessed). */
  mastery: Map<string, number | null>;
  unitsWithQuestions: Set<string>;
  entitlements: Entitlements;
  mockCapable: boolean;
  planSubject: PlanSubject;
  weakUnitIds: string[];
}

interface PlannerContext {
  subjects: SubjectContext[];
  recentSessions: RecentSession[];
}

/**
 * Loads the planner inputs for `enrollments` (a handful of indexed reads whatever the number of topics; no N+1):
 * pinned topic trees and scope, TopicMastery, unfinished published lessons the student can open, questions per topic,
 * published platform flashcards, published mocks, entitlements, target grades and the last week of study history.
 */
async function loadPlannerContext(userId: string, enrollments: readonly EnrollmentRow[], now: Date): Promise<PlannerContext> {
  const syllabusIds = [...new Set(enrollments.map((e) => e.syllabusId))];
  const subjectIds = enrollments.map((e) => e.subjectId);
  const [structures, masteryRows, lessonLinks, questionTopics, flashcardTopics, mocks, schemes, entitlements] = await Promise.all([
    loadStructures(db, syllabusIds),
    db.topicMastery.findMany({
      where: { userId, questionsAttempted: { gt: 0 }, OR: enrollments.map((e) => ({ subjectId: e.subjectId, syllabusId: e.syllabusId })) },
      select: { topicId: true, score: true },
    }),
    db.lessonTopic.findMany({
      where: { topic: { syllabusId: { in: syllabusIds } }, lesson: { status: "PUBLISHED", draftOfId: null } },
      select: { topicId: true, sortOrder: true, lesson: { select: { id: true, estimatedMinutes: true, accessTier: true } } },
      orderBy: [{ sortOrder: "asc" }, { lessonId: "asc" }],
    }),
    db.questionTopic.groupBy({ by: ["topicId"], where: { syllabusId: { in: syllabusIds }, question: { status: "PUBLISHED" } } }),
    db.flashcardTopic.groupBy({ by: ["topicId"], where: { topic: { syllabusId: { in: syllabusIds } }, flashcard: { status: "PUBLISHED", ownerUserId: null } } }),
    db.assessment.groupBy({
      by: ["subjectId"],
      where: {
        subjectId: { in: subjectIds },
        kind: "MOCK_EXAM",
        status: "PUBLISHED",
        ownerUserId: null,
        OR: [{ syllabusId: null }, { syllabusId: { in: syllabusIds } }],
      },
    }),
    Promise.all([...new Set(enrollments.map((e) => e.subject.qualificationId))].map(async (id) => [id, await getGradeScheme(id)] as const)),
    Promise.all(enrollments.map(async (e) => [e.subjectId, await getSubjectEntitlements(userId, e.subjectId, { syllabusId: e.syllabusId })] as const)),
  ]);
  const schemeByQualification = new Map<string, GradeSchemeView | null>(schemes);
  const entitlementsBySubject = new Map(entitlements);
  const masteryByTopic = new Map(masteryRows.map((r) => [r.topicId, r.score]));
  const questionTopicIds = new Set(questionTopics.map((q) => q.topicId));
  const flashcardTopicIds = new Set(flashcardTopics.map((f) => f.topicId));
  const mockSubjects = new Set(mocks.map((m) => m.subjectId));

  const allLessonIds = [...new Set(lessonLinks.map((l) => l.lesson.id))];
  const completedLessons = allLessonIds.length
    ? new Set(
        (await db.lessonProgress.findMany({ where: { userId, lessonId: { in: allLessonIds }, status: "COMPLETED" }, select: { lessonId: true } })).map(
          (r) => r.lessonId,
        ),
      )
    : new Set<string>();

  const subjects: SubjectContext[] = [];
  for (const enrollment of enrollments) {
    const structure = structures.get(enrollment.syllabusId);
    const subjectEntitlements = entitlementsBySubject.get(enrollment.subjectId);
    if (!structure || !subjectEntitlements) continue;
    const inScope = new Set(inScopeLeafTopicIds(structure.topics, scopeRulesFor(structure, enrollment)));
    const units = planningUnits(structure.topics, inScope);

    const unitsWithQuestions = new Set<string>();
    for (const topic of structure.topics) {
      const unit = units.unitOf.get(topic.id);
      if (unit && questionTopicIds.has(topic.id)) unitsWithQuestions.add(unit);
    }
    const fullLessons = subjectEntitlements.lessonAccess === "ALL";
    const lessonsByUnit = assignLessonsToUnits(
      structure.topics,
      units,
      lessonLinks
        .filter((l) => structure.byId.has(l.topicId) && !completedLessons.has(l.lesson.id) && (fullLessons || l.lesson.accessTier !== "PREMIUM"))
        .map((l) => ({ topicId: l.topicId, lessonId: l.lesson.id, sortOrder: l.sortOrder, minutes: l.lesson.estimatedMinutes })),
    );

    const mastery = new Map<string, number | null>();
    for (const unitId of units.unitIds) {
      const own = masteryByTopic.get(unitId);
      if (own !== undefined) {
        mastery.set(unitId, own);
        continue;
      }
      // Rollup not computed yet: mean of the unit's assessed in-scope leaves.
      const leafScores = [...inScope].filter((leafId) => units.unitOf.get(leafId) === unitId).flatMap((leafId) => {
        const score = masteryByTopic.get(leafId);
        return score === undefined ? [] : [score];
      });
      mastery.set(unitId, leafScores.length > 0 ? leafScores.reduce((sum, s) => sum + s, 0) / leafScores.length : null);
    }

    const scheme = schemeByQualification.get(enrollment.subject.qualificationId) ?? null;
    const band = enrollment.targetGrade ? scheme?.bands.find((b) => b.grade === enrollment.targetGrade) : undefined;
    const planTopics = units.unitIds
      .filter((unitId) => unitsWithQuestions.has(unitId) || (lessonsByUnit.get(unitId)?.length ?? 0) > 0)
      .map((unitId) => ({
        topicId: unitId,
        mastery: mastery.get(unitId) ?? null,
        lessonsRemaining: lessonsByUnit.get(unitId) ?? [],
        estimatedPracticeMinutes: 0,
      }));
    const hasFlashcards = subjectEntitlements.flashcards && structure.topics.some((t) => flashcardTopicIds.has(t.id));
    subjects.push({
      enrollment,
      structure,
      units,
      mastery,
      unitsWithQuestions,
      entitlements: subjectEntitlements,
      mockCapable: subjectEntitlements.mockExams && mockSubjects.has(enrollment.subjectId),
      weakUnitIds: planTopics.filter((t) => t.mastery !== null && roundHalfUp(t.mastery) < MASTERY_BAND_MIN_SCORE.COMPETENT).map((t) => t.topicId),
      planSubject: {
        subjectId: enrollment.subjectId,
        targetGrade: enrollment.targetGrade,
        targetScore: band ? Math.min(100, Math.max(MASTERY_BAND_MIN_SCORE.DEVELOPING, band.minPercent)) : null,
        hasFlashcards,
        topics: planTopics,
      },
    });
  }

  return { subjects, recentSessions: await loadRecentSessions(userId, subjects, now) };
}

const ATTEMPT_ACTIVITY: Readonly<Partial<Record<AttemptMode, PlanActivityType>>> = {
  PRACTICE: "PRACTICE",
  RETEST: "REVIEW",
  LESSON_CHECK: "PRACTICE",
  QUIZ: "PRACTICE",
  TOPIC_TEST: "PRACTICE",
  CHAPTER_TEST: "PRACTICE",
  SUBJECT_TEST: "PRACTICE",
  TIMED_EXAM: "PRACTICE",
  MOCK_EXAM: "MOCK_EXAM",
  DIAGNOSTIC: "DIAGNOSTIC",
};

/**
 * §16 "previous study sessions": the last week of StudySessions, closed attempts (per planning topic of their
 * questions) and completed lessons; mocks and diagnostics over the last month (mock cadence). Subjects whose
 * diagnostic is done, or that cannot take one (no questions / not in the plan), get a marker so none is planned.
 */
async function loadRecentSessions(userId: string, subjects: readonly SubjectContext[], now: Date): Promise<RecentSession[]> {
  const since = new Date(now.getTime() - HISTORY_DAYS * 86_400_000);
  const longSince = new Date(now.getTime() - LONG_HISTORY_DAYS * 86_400_000);
  const bySubject = new Map(subjects.map((s) => [s.enrollment.subjectId, s]));
  const subjectIds = [...bySubject.keys()];
  if (subjectIds.length === 0) return [];
  const [sessions, attempts, lessons] = await Promise.all([
    db.studySession.findMany({
      where: { userId, subjectId: { in: subjectIds }, startedAt: { gte: since } },
      select: { subjectId: true, topicId: true, attemptId: true, activityType: true, startedAt: true, durationSeconds: true },
    }),
    db.assessmentAttempt.findMany({
      where: {
        userId,
        subjectId: { in: subjectIds },
        status: { in: [...CLOSED_ATTEMPT_STATUSES] },
        startedAt: { gte: longSince },
        OR: [{ mode: { in: ["MOCK_EXAM", "DIAGNOSTIC"] } }, { startedAt: { gte: since } }],
      },
      select: { id: true, subjectId: true, mode: true, startedAt: true, timeSpentSeconds: true },
    }),
    db.lessonProgress.findMany({
      where: { userId, status: "COMPLETED", completedAt: { gte: since } },
      select: { completedAt: true, timeSpentSeconds: true, lesson: { select: { estimatedMinutes: true, topics: { select: { topicId: true }, orderBy: { sortOrder: "asc" } } } } },
    }),
  ]);
  const unitFor = (subjectId: string, topicId: string | null): string | null => {
    if (!topicId) return null;
    return bySubject.get(subjectId)?.units.unitOf.get(topicId) ?? null;
  };
  const out: RecentSession[] = [];
  const sessionAttempts = new Set<string>();
  for (const s of sessions) {
    if (!s.subjectId) continue;
    const activity = s.activityType === "TEST" ? "PRACTICE" : s.activityType;
    if (activity === "DAILY_QUESTION" || activity === "AI_TUTOR") continue;
    if (s.attemptId) sessionAttempts.add(s.attemptId);
    out.push({ subjectId: s.subjectId, topicId: unitFor(s.subjectId, s.topicId), activityType: activity, startedAt: s.startedAt, minutes: s.durationSeconds / 60 });
  }

  const remaining = attempts.filter((a) => !sessionAttempts.has(a.id) && ATTEMPT_ACTIVITY[a.mode] !== undefined);
  const practiceIds = remaining.filter((a) => a.mode !== "MOCK_EXAM" && a.mode !== "DIAGNOSTIC").map((a) => a.id);
  const slotTopics = practiceIds.length
    ? await db.questionAttempt.findMany({ where: { attemptId: { in: practiceIds } }, select: { attemptId: true, topicId: true } })
    : [];
  const topicsByAttempt = new Map<string, Set<string>>();
  for (const slot of slotTopics) topicsByAttempt.set(slot.attemptId, (topicsByAttempt.get(slot.attemptId) ?? new Set()).add(slot.topicId));
  for (const attempt of remaining) {
    const activity = ATTEMPT_ACTIVITY[attempt.mode] as PlanActivityType;
    const minutes = attempt.timeSpentSeconds / 60;
    const units = [...new Set([...(topicsByAttempt.get(attempt.id) ?? [])].flatMap((t) => unitFor(attempt.subjectId, t) ?? []))];
    if (units.length === 0) {
      out.push({ subjectId: attempt.subjectId, topicId: null, activityType: activity, startedAt: attempt.startedAt, minutes });
      continue;
    }
    for (const unit of units) out.push({ subjectId: attempt.subjectId, topicId: unit, activityType: activity, startedAt: attempt.startedAt, minutes: minutes / units.length });
  }

  for (const lesson of lessons) {
    if (!lesson.completedAt) continue;
    for (const subject of subjects) {
      const topicId = lesson.lesson.topics.map((t) => t.topicId).find((id) => subject.structure.byId.has(id));
      if (!topicId) continue;
      out.push({
        subjectId: subject.enrollment.subjectId,
        topicId: subject.units.unitOf.get(topicId) ?? null,
        activityType: "LESSON",
        startedAt: lesson.completedAt,
        minutes: lesson.timeSpentSeconds > 0 ? lesson.timeSpentSeconds / 60 : lesson.lesson.estimatedMinutes,
      });
      break;
    }
  }

  // Diagnostic markers: done already, not in the plan, or impossible (no questions).
  for (const subject of subjects) {
    const done = subject.enrollment.diagnosticCompletedAt;
    const impossible = !subject.entitlements.diagnosticTest || subject.unitsWithQuestions.size === 0;
    if (done) out.push({ subjectId: subject.enrollment.subjectId, activityType: "DIAGNOSTIC", startedAt: done, minutes: 0 });
    else if (impossible) out.push({ subjectId: subject.enrollment.subjectId, activityType: "DIAGNOSTIC", startedAt: longSince, minutes: 0 });
  }
  return out;
}

/** Planner configuration for these subjects (no mock cadence when no subject can take a mock). */
function plannerConfigFor(subjects: readonly SubjectContext[]): Partial<PlannerConfig> {
  return subjects.some((s) => s.mockCapable) ? {} : { mockCadence: [] };
}

/**
 * Drops planned items the student could not act on (pure post-filter): practice / review in a topic without published
 * questions, and mocks for a subject without an available mock. Their minutes stay unplanned (§50).
 */
function actionableItems(items: readonly PlanItem[], subjects: readonly SubjectContext[]): PlanItem[] {
  const bySubject = new Map(subjects.map((s) => [s.enrollment.subjectId, s]));
  return items.filter((item) => {
    const subject = bySubject.get(item.subjectId);
    if (!subject) return false;
    if ((item.activityType === "PRACTICE" || item.activityType === "REVIEW") && item.topicId && !subject.unitsWithQuestions.has(item.topicId)) return false;
    if (item.activityType === "MOCK_EXAM" && !subject.mockCapable) return false;
    return true;
  });
}

function itemCreateRows(
  items: readonly PlanItem[],
  context: { planId: string; userId: string; generation: number; examDate: LocalDate | null; subjects: readonly SubjectContext[] },
): Prisma.StudyPlanItemCreateManyInput[] {
  const mastery = new Map<string, number | null>();
  for (const s of context.subjects) for (const [unit, score] of s.mastery) mastery.set(unit, score);
  return items.map((item) => {
    const { reason, reasonData } = itemReason(item, item.topicId ? (mastery.get(item.topicId) ?? null) : null, context.examDate);
    return {
      planId: context.planId,
      userId: context.userId,
      subjectId: item.subjectId,
      topicId: item.topicId ?? null,
      lessonId: item.lessonId ?? null,
      date: dateColumnFromLocalDate(item.date),
      activityType: item.activityType,
      reason,
      reasonData,
      status: "PENDING",
      sortOrder: item.order,
      targetMinutes: Math.min(1440, Math.max(0, Math.round(item.targetMinutes))),
      targetQuestions: item.targetQuestions && item.targetQuestions > 0 ? Math.min(SMALLINT_MAX, item.targetQuestions) : null,
      generation: Math.min(SMALLINT_MAX, context.generation),
    };
  });
}

// =====================================================================================================================
// Exam date
// =====================================================================================================================

interface ExamDateChoice {
  date: LocalDate | null;
  source: ExamDateSource;
  sessionId: string | null;
}

type SessionRow = { id: string; name: string; startsOn: Date; isProvisional: boolean; isDemo: boolean };

/** Earliest upcoming target session of the chosen enrolments, else the onboarding target (pure). */
export function defaultExamDate(
  enrollmentSessions: readonly (SessionRow | null)[],
  studentSession: SessionRow | null,
  today: LocalDate,
): { date: LocalDate; source: "TARGET_SESSION" | "STUDENT_TARGET"; session: SessionRow } | null {
  const upcoming = (session: SessionRow | null) => session !== null && daysBetween(today, localDateFromDateColumn(session.startsOn)) >= 1;
  const sessions = enrollmentSessions
    .filter((s): s is SessionRow => upcoming(s))
    .sort((a, b) => a.startsOn.getTime() - b.startsOn.getTime() || compareIds(a.id, b.id));
  const first = sessions[0];
  if (first) return { date: localDateFromDateColumn(first.startsOn), source: "TARGET_SESSION", session: first };
  if (studentSession && upcoming(studentSession)) {
    return { date: localDateFromDateColumn(studentSession.startsOn), source: "STUDENT_TARGET", session: studentSession };
  }
  return null;
}

async function studentTargetSession(userId: string): Promise<SessionRow | null> {
  const student = await db.student.findUnique({ where: { userId }, select: { targetExamSession: { select: SESSION_SELECT } } });
  return student?.targetExamSession ?? null;
}

// =====================================================================================================================
// Create
// =====================================================================================================================

export interface PlanWriteResult {
  planId: string;
  /** Items written by this call (generated + carried over). */
  itemCount: number;
  /** Plan replaced by this one, if any. */
  supersededPlanId: string | null;
}

/**
 * Creates the student's study plan (§16): exam date (default: the earliest upcoming target examination of the chosen
 * subjects, else the onboarding target; `null` → no exam date), subjects (default: every ACTIVE enrolment) and
 * minutes per weekday. Replaces an existing ACTIVE plan (marked SUPERSEDED): work already done from today on is carried
 * into the new plan and counts against its days. Each day's planned minutes never exceed that day's availability.
 *
 * @throws AppError FORBIDDEN (not a student) | ENTITLEMENT_REQUIRED (plan without study plans) | VALIDATION |
 *         RATE_LIMITED | CONFLICT (another plan was created at the same moment)
 */
export async function createPlan(actor: PlanActor, input: CreatePlanInput, now: Date = new Date()): Promise<PlanWriteResult> {
  assertStudent(actor);
  await assertEntitlement(actor, "study_plan");
  const parsed = parse(createPlanSchema, input);
  await assertRateLimit(rateLimits.studyPlanGenerate(actor.userId), "You've rebuilt your plan many times in the last hour. Please try again later.");
  const userId = actor.userId;
  const timeZone = await zoneOf(userId, actor.timeZone);
  const today = localDateString(now, timeZone);

  const enrollments = await activeEnrollments(db, userId);
  if (enrollments.length === 0) throw AppError.validation({ subjectIds: ["Add a subject before creating a study plan."] }, "Add a subject first.");
  const wanted = parsed.subjectIds ? new Set(parsed.subjectIds) : null;
  const chosen = wanted ? enrollments.filter((e) => wanted.has(e.subjectId)) : enrollments;
  if (wanted && chosen.length !== wanted.size) throw AppError.validation({ subjectIds: ["Choose subjects you are studying."] });

  const fallback = defaultExamDate(
    chosen.map((e) => e.targetExamSession),
    await studentTargetSession(userId),
    today,
  );
  let exam: ExamDateChoice;
  if (parsed.examDate === undefined) {
    exam = fallback ? { date: fallback.date, source: fallback.source, sessionId: fallback.session.id } : { date: null, source: "NONE", sessionId: null };
  } else if (parsed.examDate === null) {
    exam = { date: null, source: "NONE", sessionId: null };
  } else {
    const ahead = daysBetween(today, parsed.examDate);
    if (ahead < 1) throw AppError.validation({ examDate: ["Choose a date after today."] });
    if (ahead > MAX_EXAM_DATE_DAYS_AHEAD) throw AppError.validation({ examDate: ["Choose a date within the next three years."] });
    exam =
      fallback && fallback.date === parsed.examDate
        ? { date: fallback.date, source: fallback.source, sessionId: fallback.session.id }
        : { date: parsed.examDate, source: "INPUT", sessionId: null };
  }

  const availability: WeeklyAvailability = parsed.availability;
  const context = await loadPlannerContext(userId, chosen, now);
  if (context.subjects.every((s) => s.planSubject.topics.length === 0)) {
    throw AppError.validation(
      { subjectIds: ["There is no published content to plan for these subjects yet."] },
      "There is nothing to plan for these subjects yet.",
    );
  }

  // Credit today's work on the plan being replaced before carrying it over.
  const previous = await db.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true } });
  if (previous) await syncPlanProgress(db, userId, { now, timeZone });

  try {
    return await db.$transaction(async (tx) => {
      await lockUserPlans(tx, userId);
      const old = await tx.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true } });
      const carried = old
        ? await tx.studyPlanItem.findMany({
            where: { planId: old.id, date: { gte: dateColumnFromLocalDate(today) }, status: { in: ["DONE", "PARTIAL"] } },
            orderBy: [{ date: "asc" }, { sortOrder: "asc" }],
          })
        : [];
      if (old) await tx.studyPlan.update({ where: { id: old.id }, data: { status: "SUPERSEDED" } });

      const plannerInput = buildPlannerInput({ userId, today, timeZone, availability, examDate: exam.date, context, generation: 0 });
      const existing: ExistingPlanItem[] = carried.map((item) => toExistingItem(item, { keepLesson: item.status === "DONE" }));
      const plan = existing.length > 0 ? adaptPlanCore(existing, plannerInput).plan : generatePlan(plannerInput);
      const items = actionableItems(plan.items, context.subjects);
      const weekly = weeklyTotal(availability);
      const created = await tx.studyPlan.create({
        data: {
          userId,
          startsOn: dateColumnFromLocalDate(today),
          examDate: dateColumnFromLocalDate(exam.date ?? plan.endDate),
          status: "ACTIVE",
          dailyTargetMinutes: Math.round(weekly / 7),
          weeklyTargetMinutes: weekly,
          generatorVersion: GENERATOR_VERSION,
          availability: { ...availability },
          inputs: inputsSnapshot({ availability, timeZone, exam, context }),
        },
        select: { id: true },
      });
      if (carried.length > 0) {
        await tx.studyPlanItem.createMany({
          data: carried.map((item) => ({
            planId: created.id,
            userId,
            subjectId: item.subjectId,
            topicId: item.topicId,
            lessonId: item.lessonId,
            assessmentId: item.assessmentId,
            assignmentId: item.assignmentId,
            date: item.date,
            completedAt: item.completedAt,
            completedSeconds: item.completedSeconds,
            completedQuestions: item.completedQuestions,
            activityType: item.activityType,
            reason: item.reason,
            reasonData: (item.reasonData as Prisma.InputJsonValue | null) ?? Prisma.DbNull,
            status: item.status,
            sortOrder: item.sortOrder,
            targetMinutes: item.targetMinutes,
            targetQuestions: item.targetQuestions,
            generation: 0,
          })),
        });
      }
      const rows = itemCreateRows(items, { planId: created.id, userId, generation: 0, examDate: exam.date, subjects: context.subjects });
      if (rows.length > 0) await tx.studyPlanItem.createMany({ data: rows });
      return { planId: created.id, itemCount: rows.length + carried.length, supersededPlanId: old?.id ?? null };
    }, TX_OPTIONS);
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict("Your study plan was just changed somewhere else. Refresh to see it.");
    throw error;
  }
}

function buildPlannerInput(args: {
  userId: string;
  today: LocalDate;
  timeZone: string;
  availability: WeeklyAvailability;
  examDate: LocalDate | null;
  context: PlannerContext;
  generation: number;
}): PlanInput {
  return {
    today: args.today,
    examDate: args.examDate,
    timeZone: args.timeZone,
    availability: args.availability,
    subjects: args.context.subjects.map((s) => s.planSubject),
    recentSessions: args.context.recentSessions,
    horizonDays: PLAN_HORIZON_DAYS,
    seed: `${args.userId}:${args.today}:${args.generation}`,
    config: plannerConfigFor(args.context.subjects),
  };
}

function inputsSnapshot(args: { availability: WeeklyAvailability; timeZone: string; exam: ExamDateChoice; context: PlannerContext }): Prisma.InputJsonObject {
  return {
    version: 1,
    subjects: args.context.subjects.map((s) => ({
      subjectId: s.enrollment.subjectId,
      enrollmentId: s.enrollment.id,
      syllabusId: s.enrollment.syllabusId,
      ...(s.enrollment.targetGrade ? { targetGrade: s.enrollment.targetGrade } : {}),
      ...(s.planSubject.targetScore ? { targetScore: s.planSubject.targetScore } : {}),
      weakTopicIds: s.weakUnitIds,
    })),
    availability: { ...args.availability },
    timezone: args.timeZone,
    examDate: args.exam.date,
    examDateSource: args.exam.source,
    examSessionId: args.exam.sessionId,
    horizonDays: PLAN_HORIZON_DAYS,
  };
}

type StoredItem = {
  id: string;
  date: Date;
  sortOrder: number;
  subjectId: string;
  topicId: string | null;
  lessonId: string | null;
  activityType: StudyActivityType;
  targetMinutes: number;
  targetQuestions: number | null;
  reasonData: Prisma.JsonValue;
  status: StudyPlanItemStatus;
};

/**
 * A stored item as the planner's "completed" reservation. `keepLesson: false` (partly done or skipped) still reserves
 * the day's minutes but lets the planner schedule the lesson again later.
 */
function toExistingItem(item: StoredItem, options: { keepLesson: boolean }): ExistingPlanItem {
  const data = reasonDataSchema.safeParse(item.reasonData);
  const plannerReason = data.success && isPlannerReason(data.data.plannerReason) ? data.data.plannerReason : "EXTRA_PRACTICE";
  return {
    id: item.id,
    status: "COMPLETED",
    date: localDateFromDateColumn(item.date),
    order: item.sortOrder,
    subjectId: item.subjectId,
    ...(item.topicId ? { topicId: item.topicId } : {}),
    ...(item.lessonId && options.keepLesson ? { lessonId: item.lessonId } : {}),
    activityType: plannerActivity(item.activityType),
    targetMinutes: item.targetMinutes,
    ...(item.targetQuestions ? { targetQuestions: item.targetQuestions } : {}),
    reason: plannerReason,
  };
}

// =====================================================================================================================
// Adapt
// =====================================================================================================================

export interface AdaptResult {
  planId: string;
  /** Items kept from today on (done, partly done, skipped today). */
  kept: number;
  /** Pending items replaced. */
  removed: number;
  added: number;
}

/**
 * Re-plans the student's ACTIVE plan from today with their latest results (§16 "adapts dynamically"): completed and
 * partly done items (and anything the student skipped today) are kept and count against their day; pending items
 * from today on are replaced. Same subjects, exam date and availability as the plan; dropped subjects leave the plan.
 *
 * @throws AppError FORBIDDEN | ENTITLEMENT_REQUIRED | NOT_FOUND (no plan) | RATE_LIMITED
 */
export async function adaptPlan(actor: PlanActor, now: Date = new Date()): Promise<AdaptResult> {
  assertStudent(actor);
  await assertEntitlement(actor, "study_plan");
  await assertRateLimit(rateLimits.studyPlanGenerate(actor.userId), "You've updated your plan many times in the last hour. Please try again later.");
  const result = await adaptPlanForUser(actor.userId, { now, ...(actor.timeZone ? { timeZone: actor.timeZone } : {}) });
  if (result === null) throw AppError.notFound("You don't have a study plan yet.");
  return result;
}

/**
 * System path of {@link adaptPlan} (the `studyplan.adapt` job, flows acting for the student): no rate limit; returns
 * `null` without an ACTIVE plan or when the student's plan no longer includes study plans (the plan is left as is).
 * Credits progress first (yesterday and today) and marks earlier pending items MISSED.
 */
export async function adaptPlanForUser(userId: string, options: { now?: Date; timeZone?: string } = {}): Promise<AdaptResult | null> {
  const now = options.now ?? new Date();
  const plan = await db.studyPlan.findFirst({
    where: { userId, status: "ACTIVE" },
    select: { id: true, examDate: true, availability: true, inputs: true, adaptationCount: true },
  });
  if (!plan) return null;
  if (!(await hasEntitlement({ userId }, "study_plan"))) return null;
  const timeZone = await zoneOf(userId, options.timeZone);
  const today = localDateString(now, timeZone);
  await syncPlanProgress(db, userId, { now, timeZone });

  const inputs = readPlanInputs(plan.inputs);
  const planSubjects = new Set(inputs.subjects.map((s) => s.subjectId));
  const enrollments = (await activeEnrollments(db, userId)).filter((e) => planSubjects.size === 0 || planSubjects.has(e.subjectId));
  const context = await loadPlannerContext(userId, enrollments, now);
  const examDate = inputs.examDateSource === "NONE" ? null : localDateFromDateColumn(plan.examDate);
  const availability = readAvailability(plan.availability);
  const generation = plan.adaptationCount + 1;

  return db.$transaction(async (tx) => {
    await lockUserPlans(tx, userId);
    const current = await tx.studyPlan.findUnique({ where: { id: plan.id }, select: { status: true, adaptationCount: true } });
    // Replaced or adapted by a concurrent request meanwhile: that result stands.
    if (!current || current.status !== "ACTIVE" || current.adaptationCount !== plan.adaptationCount) {
      return { planId: plan.id, kept: 0, removed: 0, added: 0 };
    }
    const stored = await tx.studyPlanItem.findMany({
      where: {
        planId: plan.id,
        OR: [{ date: { gte: dateColumnFromLocalDate(today) } }, { status: "DONE", lessonId: { not: null } }],
      },
      select: {
        id: true,
        date: true,
        sortOrder: true,
        subjectId: true,
        topicId: true,
        lessonId: true,
        activityType: true,
        targetMinutes: true,
        targetQuestions: true,
        reasonData: true,
        status: true,
      },
    });
    const existing: ExistingPlanItem[] = stored.map((item) => {
      const date = localDateFromDateColumn(item.date);
      const reserve = item.status === "DONE" || item.status === "PARTIAL" || (item.status === "SKIPPED" && date === today);
      if (reserve) return toExistingItem(item, { keepLesson: item.status === "DONE" });
      return { ...toExistingItem(item, { keepLesson: false }), status: "PENDING" };
    });
    const adapted = adaptPlanCore(existing, buildPlannerInput({ userId, today, timeZone, availability, examDate, context, generation }));
    const removable = new Set(stored.filter((s) => s.status === "PENDING" || s.status === "SKIPPED" || s.status === "MISSED").map((s) => s.id));
    const discardIds = adapted.discard.map((d) => d.id).filter((id) => removable.has(id));
    if (discardIds.length > 0) await tx.studyPlanItem.deleteMany({ where: { planId: plan.id, id: { in: discardIds } } });
    const rows = itemCreateRows(actionableItems(adapted.add, context.subjects), { planId: plan.id, userId, generation, examDate, subjects: context.subjects });
    if (rows.length > 0) await tx.studyPlanItem.createMany({ data: rows });
    await tx.studyPlan.update({
      where: { id: plan.id },
      data: {
        lastAdaptedAt: now,
        adaptationCount: generation,
        inputs: {
          ...(plan.inputs && typeof plan.inputs === "object" && !Array.isArray(plan.inputs) ? (plan.inputs as Prisma.InputJsonObject) : {}),
          subjects: context.subjects.map((s) => ({
            subjectId: s.enrollment.subjectId,
            enrollmentId: s.enrollment.id,
            syllabusId: s.enrollment.syllabusId,
            weakTopicIds: s.weakUnitIds,
          })),
        },
      },
    });
    const keptFromToday = adapted.keep.filter((k) => daysBetween(today, k.date) >= 0).length;
    return { planId: plan.id, kept: keptFromToday, removed: discardIds.length, added: rows.length };
  }, TX_OPTIONS);
}

/**
 * Asks the worker to adapt the student's plan (after a diagnostic, practice session or mock). Call it in the same
 * transaction as the submission (`client: tx`); repeated calls on one day collapse into one pending job
 * (dedupe `plan:{planId}:{date}`). Returns false when the student has no ACTIVE plan.
 */
export async function requestPlanAdaptation(
  client: DbClient,
  userId: string,
  options: { now?: Date; timeZone?: string; delayMs?: number } = {},
): Promise<boolean> {
  const plan = await client.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true } });
  if (!plan) return false;
  const date = localDateString(options.now ?? new Date(), safeZone(options.timeZone));
  await enqueue(STUDYPLAN_ADAPT_JOB, { userId, planId: plan.id }, { client, dedupeKey: `plan:${plan.id}:${date}`, delayMs: options.delayMs ?? 60_000 });
  return true;
}

// =====================================================================================================================
// Completion matching (DB) and manual ticks
// =====================================================================================================================

const PRACTICE_ATTEMPT_MODES = ["PRACTICE", "RETEST", "LESSON_CHECK", "QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM"] as const;

/**
 * Credits the student's actual work to their ACTIVE plan (see {@link matchPlanProgress}) for yesterday and today, plus
 * lessons, mocks and diagnostics done ahead for the coming week, then marks pending items of earlier days MISSED.
 * Idempotent; safe inside the caller's transaction. Returns the number of items updated.
 */
export async function syncPlanProgress(client: DbClient, userId: string, options: { now?: Date; timeZone?: string } = {}): Promise<number> {
  const now = options.now ?? new Date();
  const plan = await client.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true, startsOn: true } });
  if (!plan) return 0;
  const timeZone = options.timeZone ? safeZone(options.timeZone) : await zoneOf(userId);
  const today = localDateString(now, timeZone);
  const yesterday = addDays(today, -1);
  const weekAhead = addDays(today, 6);
  const longAgo = addDays(today, -14);

  const items = await client.studyPlanItem.findMany({
    where: {
      planId: plan.id,
      status: { not: "SKIPPED" },
      OR: [
        { date: { gte: dateColumnFromLocalDate(yesterday), lte: dateColumnFromLocalDate(weekAhead) } },
        { activityType: { in: ["MOCK_EXAM", "DIAGNOSTIC"] }, date: { gte: dateColumnFromLocalDate(longAgo), lte: dateColumnFromLocalDate(weekAhead) } },
      ],
    },
    select: {
      id: true,
      date: true,
      sortOrder: true,
      subjectId: true,
      topicId: true,
      lessonId: true,
      activityType: true,
      status: true,
      targetQuestions: true,
      completedQuestions: true,
      createdAt: true,
    },
  });
  let updated = 0;
  if (items.length > 0) {
    const matchable: MatchableItem[] = items.map((i) => ({ ...i, date: localDateFromDateColumn(i.date) }));
    const evidence = await loadEvidence(client, userId, matchable, { today, yesterday, timeZone, now });
    const updates = matchPlanProgress(matchable, evidence, { questionDates: new Set([yesterday, today]), now });
    for (const update of updates) {
      const result = await client.studyPlanItem.updateMany({
        where: { id: update.id, planId: plan.id, status: { not: "SKIPPED" } },
        data: {
          status: update.status,
          completedQuestions: update.completedQuestions,
          ...(update.completedAt ? { completedAt: update.completedAt } : {}),
        },
      });
      updated += result.count;
    }
  }
  const missed = await client.studyPlanItem.updateMany({
    where: { planId: plan.id, status: "PENDING", date: { lt: dateColumnFromLocalDate(today) } },
    data: { status: "MISSED" },
  });
  return updated + missed.count;
}

async function loadEvidence(
  client: DbClient,
  userId: string,
  items: readonly MatchableItem[],
  window: { today: LocalDate; yesterday: LocalDate; timeZone: string; now: Date },
): Promise<ProgressEvidence> {
  const dayStart = startOfLocalDay(window.yesterday, window.timeZone);
  const dayEnd = startOfLocalDay(addDays(window.today, 1), window.timeZone);
  const earliestPlanned = items.reduce((min, i) => (i.createdAt.getTime() < min ? i.createdAt.getTime() : min), Number.POSITIVE_INFINITY);
  const subjectIds = [...new Set(items.map((i) => i.subjectId))];
  const lessonIds = [...new Set(items.flatMap((i) => (i.activityType === "LESSON" && i.lessonId ? [i.lessonId] : [])))];
  const wantsAttempts = items.some((i) => i.activityType === "MOCK_EXAM" || i.activityType === "DIAGNOSTIC");
  const wantsQuestions = items.some((i) => i.activityType === "PRACTICE" || i.activityType === "REVIEW" || i.activityType === "TEST");
  const wantsFlashcards = items.some((i) => i.activityType === "FLASHCARDS");

  // Sequential on purpose: `client` may be the caller's transaction (one connection, no concurrent queries).
  const practiceAttempts = wantsQuestions
    ? await client.assessmentAttempt.findMany({
        where: { userId, subjectId: { in: subjectIds }, mode: { in: [...PRACTICE_ATTEMPT_MODES] }, startedAt: { gte: new Date(dayStart.getTime() - 86_400_000), lt: dayEnd } },
        select: { id: true, mode: true },
      })
    : [];
  const examAttempts =
    wantsAttempts && Number.isFinite(earliestPlanned)
      ? await client.assessmentAttempt.findMany({
          where: {
            userId,
            subjectId: { in: subjectIds },
            mode: { in: ["MOCK_EXAM", "DIAGNOSTIC"] },
            OR: [{ submittedAt: { gte: new Date(earliestPlanned) } }, { status: "IN_PROGRESS", startedAt: { gte: dayStart } }],
          },
          select: { id: true, subjectId: true, mode: true, status: true, startedAt: true, submittedAt: true },
        })
      : [];
  const lessons = lessonIds.length
    ? await client.lessonProgress.findMany({ where: { userId, lessonId: { in: lessonIds } }, select: { lessonId: true, status: true, completedAt: true, lastViewedAt: true } })
    : [];
  const flashcardDays = wantsFlashcards
    ? await client.dailyActivity.findMany({
        where: { userId, date: { gte: dateColumnFromLocalDate(window.yesterday), lte: dateColumnFromLocalDate(addDays(window.today, 6)) }, flashcardsReviewed: { gt: 0 } },
        select: { date: true },
      })
    : [];

  const modeById = new Map(practiceAttempts.map((a) => [a.id, a.mode]));
  const answers = practiceAttempts.length
    ? await client.questionAttempt.findMany({
        where: { attemptId: { in: [...modeById.keys()] }, answeredAt: { gte: dayStart, lt: dayEnd }, markingStatus: { not: "UNANSWERED" } },
        select: { attemptId: true, subjectId: true, topicId: true, answeredAt: true },
      })
    : [];
  const topicIds = [...new Set(answers.map((a) => a.topicId))];
  const paths = topicIds.length ? await client.topic.findMany({ where: { id: { in: topicIds } }, select: { id: true, path: true } }) : [];
  const chainOf = new Map(paths.map((t) => [t.id, [...ancestorIdsFromPath(t.path), t.id]]));

  return {
    questions: answers.flatMap((a) =>
      a.answeredAt
        ? [
            {
              subjectId: a.subjectId,
              date: localDateString(a.answeredAt, window.timeZone),
              at: a.answeredAt,
              kind: modeById.get(a.attemptId) === "RETEST" ? ("REVIEW" as const) : ("PRACTICE" as const),
              topicIds: chainOf.get(a.topicId) ?? [a.topicId],
            },
          ]
        : [],
    ),
    attempts: examAttempts.map((a) => {
      const closed = (CLOSED_ATTEMPT_STATUSES as readonly string[]).includes(a.status) && a.submittedAt !== null;
      const at = closed && a.submittedAt ? a.submittedAt : a.startedAt;
      return { id: a.id, subjectId: a.subjectId, mode: a.mode as "MOCK_EXAM" | "DIAGNOSTIC", closed, at, date: localDateString(at, window.timeZone) };
    }),
    lessons: lessons.map((l) => ({
      lessonId: l.lessonId,
      completedAt: l.status === "COMPLETED" ? (l.completedAt ?? l.lastViewedAt) : null,
      viewedOn: localDateString(l.lastViewedAt, window.timeZone),
    })),
    flashcardDates: new Set(flashcardDays.map((d) => localDateFromDateColumn(d.date))),
  };
}

/**
 * Hook for the practice / test / lesson flows (§16 completion matching): after a practice or test attempt closes, a
 * lesson is completed, flashcards are reviewed, or a mock / diagnostic is submitted, call this (inside the same
 * transaction is fine) and the matching plan items are marked DONE or PARTIAL. No-op without an ACTIVE plan.
 *
 * `lesson`: a completed lesson's active study time — credited to the plan's LESSON items of that lesson
 * (`completedSeconds`, see {@link creditLessonPlanItems}).
 */
export async function recordPlanActivity(
  client: DbClient,
  input: { userId: string; at?: Date; timeZone?: string; lesson?: { lessonId: string; seconds: number } },
): Promise<number> {
  const updated = await syncPlanProgress(client, input.userId, {
    ...(input.at ? { now: input.at } : {}),
    ...(input.timeZone ? { timeZone: input.timeZone } : {}),
  });
  if (input.lesson) await creditLessonPlanItems(client, { userId: input.userId, ...input.lesson });
  return updated;
}

const MAX_CREDITED_SECONDS = 2_000_000_000;

/**
 * Credits a lesson's active study time to the ACTIVE plan's LESSON items of that lesson (StudyPlanItem
 * `completedSeconds` = the lesson's total, never lowered). Skipped items are the student's choice and are left alone.
 * Idempotent; safe inside the caller's transaction. Returns the number of items updated.
 */
export async function creditLessonPlanItems(
  client: DbClient,
  input: { userId: string; lessonId: string; seconds: number },
): Promise<number> {
  const seconds = Math.min(MAX_CREDITED_SECONDS, Math.max(0, Math.floor(input.seconds)));
  if (seconds === 0) return 0;
  const result = await client.studyPlanItem.updateMany({
    where: {
      userId: input.userId,
      lessonId: input.lessonId,
      activityType: "LESSON",
      status: { not: "SKIPPED" },
      completedSeconds: { lt: seconds },
      plan: { status: "ACTIVE" },
    },
    data: { completedSeconds: seconds },
  });
  return result.count;
}

export type PlanItemTick = "DONE" | "SKIPPED" | "PENDING";

async function setItemStatus(actor: PlanActor, itemId: string, tick: PlanItemTick, now: Date): Promise<PlanItemView> {
  assertStudent(actor);
  if (!uuid.safeParse(itemId).success) throw AppError.notFound("That plan item doesn't exist.");
  const item = await db.studyPlanItem.findFirst({
    where: { id: itemId, userId: actor.userId, plan: { status: "ACTIVE" } },
    select: { id: true, date: true },
  });
  if (!item) throw AppError.notFound("That plan item doesn't exist.");
  const timeZone = await zoneOf(actor.userId, actor.timeZone);
  const today = localDateString(now, timeZone);
  const past = daysBetween(localDateFromDateColumn(item.date), today) > 0;
  const data: Prisma.StudyPlanItemUpdateInput =
    tick === "DONE"
      ? { status: "DONE", completedAt: now }
      : tick === "SKIPPED"
        ? { status: "SKIPPED", completedAt: null }
        : { status: past ? "MISSED" : "PENDING", completedAt: null, completedQuestions: 0 };
  const updated = await db.studyPlanItem.update({ where: { id: item.id }, data, select: ITEM_VIEW_SELECT });
  return toItemView(updated);
}

/** The student ticks an item of their ACTIVE plan as done. @throws AppError FORBIDDEN | NOT_FOUND */
export function markItemDone(actor: PlanActor, itemId: string, now: Date = new Date()): Promise<PlanItemView> {
  return setItemStatus(actor, itemId, "DONE", now);
}

/** The student skips an item (kept as SKIPPED; never re-credited automatically). @throws AppError FORBIDDEN | NOT_FOUND */
export function skipItem(actor: PlanActor, itemId: string, now: Date = new Date()): Promise<PlanItemView> {
  return setItemStatus(actor, itemId, "SKIPPED", now);
}

/** Undo: back to pending (MISSED for an earlier day); progress is re-credited by the next sync. */
export function reopenItem(actor: PlanActor, itemId: string, now: Date = new Date()): Promise<PlanItemView> {
  return setItemStatus(actor, itemId, "PENDING", now);
}

// =====================================================================================================================
// Read models
// =====================================================================================================================

const ITEM_VIEW_SELECT = {
  id: true,
  date: true,
  sortOrder: true,
  subjectId: true,
  topicId: true,
  lessonId: true,
  assessmentId: true,
  activityType: true,
  reason: true,
  reasonData: true,
  status: true,
  targetMinutes: true,
  targetQuestions: true,
  completedQuestions: true,
  completedAt: true,
  subject: { select: { name: true } },
  topic: { select: { name: true } },
  lesson: { select: { title: true } },
  assessment: { select: { title: true } },
} as const satisfies Prisma.StudyPlanItemSelect;

type ItemViewRow = Prisma.StudyPlanItemGetPayload<{ select: typeof ITEM_VIEW_SELECT }>;

/** One planned activity, with names for display and the facts behind its reason. */
export interface PlanItemView {
  id: string;
  date: LocalDate;
  sortOrder: number;
  subjectId: string;
  subjectName: string;
  topicId: string | null;
  topicName: string | null;
  lessonId: string | null;
  lessonTitle: string | null;
  assessmentId: string | null;
  assessmentTitle: string | null;
  activityType: StudyActivityType;
  reason: StudyPlanItemReason;
  /** Detailed planner reason (e.g. WEAK_TOPIC_PRACTICE); null for items not made by the planner. */
  plannerReason: PlanReason | null;
  /** Topic mastery when the item was planned (0–100). */
  masteryScore: number | null;
  /** Days from the item's date to the exam, when the plan has one. */
  daysToExam: number | null;
  targetMinutes: number;
  targetQuestions: number | null;
  completedQuestions: number;
  status: StudyPlanItemStatus;
  completedAt: Date | null;
}

function toItemView(row: ItemViewRow): PlanItemView {
  const data = reasonDataSchema.safeParse(row.reasonData ?? {});
  const facts = data.success ? data.data : {};
  return {
    id: row.id,
    date: localDateFromDateColumn(row.date),
    sortOrder: row.sortOrder,
    subjectId: row.subjectId,
    subjectName: row.subject.name,
    topicId: row.topicId,
    topicName: row.topic?.name ?? null,
    lessonId: row.lessonId,
    lessonTitle: row.lesson?.title ?? null,
    assessmentId: row.assessmentId,
    assessmentTitle: row.assessment?.title ?? null,
    activityType: row.activityType,
    reason: row.reason,
    plannerReason: isPlannerReason(facts.plannerReason) ? facts.plannerReason : null,
    masteryScore: typeof facts.masteryScore === "number" ? facts.masteryScore : null,
    daysToExam: typeof facts.daysToExam === "number" ? facts.daysToExam : null,
    targetMinutes: row.targetMinutes,
    targetQuestions: row.targetQuestions,
    completedQuestions: row.completedQuestions,
    status: row.status,
    completedAt: row.completedAt,
  };
}

/** The plan as a whole. */
export interface PlanSummary {
  id: string;
  startsOn: LocalDate;
  /** Last planned day (inclusive). */
  endsOn: LocalDate;
  examDate: LocalDate | null;
  examDateSource: ExamDateSource;
  /** Target examination the date came from (labels: provisional / demo date). */
  exam: { name: string; isProvisional: boolean; isDemo: boolean } | null;
  /** Whole days from today to the exam (§17); null without an exam date. */
  daysUntilExam: number | null;
  mode: "EXAM_PREP" | "MAINTENANCE";
  availability: WeeklyAvailability;
  dailyTargetMinutes: number;
  weeklyTargetMinutes: number;
  generatedAt: Date;
  lastAdaptedAt: Date | null;
  subjects: { subjectId: string; name: string }[];
}

export interface PlanDay {
  date: LocalDate;
  weekday: WeekdayKey;
  isToday: boolean;
  isPast: boolean;
  /** Inside the planned date range. */
  inPlan: boolean;
  availableMinutes: number;
  plannedMinutes: number;
  doneMinutes: number;
  items: PlanItemView[];
}

export interface TodayPlan {
  date: LocalDate;
  items: PlanItemView[];
  availableMinutes: number;
  plannedMinutes: number;
  doneMinutes: number;
}

export interface WeekPlan {
  weekStart: LocalDate;
  weekEnd: LocalDate;
  days: PlanDay[];
  previousWeekStart: LocalDate | null;
  nextWeekStart: LocalDate | null;
}

export interface PlanPage {
  today: LocalDate;
  timeZone: string;
  /** The student's plan includes study plans (create / update allowed). */
  entitled: boolean;
  plan: PlanSummary | null;
  todayPlan: TodayPlan | null;
  week: WeekPlan | null;
  /** Items from today for the next two weeks ("Why this plan"). */
  upcoming: PlanItemView[];
}

const PLAN_SELECT = {
  id: true,
  startsOn: true,
  examDate: true,
  availability: true,
  inputs: true,
  dailyTargetMinutes: true,
  weeklyTargetMinutes: true,
  generatedAt: true,
  lastAdaptedAt: true,
} as const satisfies Prisma.StudyPlanSelect;

type PlanRow = Prisma.StudyPlanGetPayload<{ select: typeof PLAN_SELECT }>;

async function toPlanSummary(plan: PlanRow, today: LocalDate): Promise<PlanSummary> {
  const inputs = readPlanInputs(plan.inputs);
  const source: ExamDateSource = inputs.examDateSource ?? "INPUT";
  const examDate = source === "NONE" ? null : localDateFromDateColumn(plan.examDate);
  const subjectIds = [...new Set(inputs.subjects.map((s) => s.subjectId).filter((id) => uuid.safeParse(id).success))];
  const sessionId = inputs.examSessionId && uuid.safeParse(inputs.examSessionId).success ? inputs.examSessionId : null;
  const [bounds, subjects, session] = await Promise.all([
    db.studyPlanItem.aggregate({ where: { planId: plan.id }, _max: { date: true } }),
    subjectIds.length ? db.subject.findMany({ where: { id: { in: subjectIds } }, select: { id: true, name: true, sortOrder: true } }) : Promise.resolve([]),
    sessionId ? db.examSession.findUnique({ where: { id: sessionId }, select: { name: true, isProvisional: true, isDemo: true } }) : Promise.resolve(null),
  ]);
  const startsOn = localDateFromDateColumn(plan.startsOn);
  const daysUntilExam = examDate === null ? null : daysBetween(today, examDate);
  return {
    id: plan.id,
    startsOn,
    endsOn: bounds._max.date ? localDateFromDateColumn(bounds._max.date) : startsOn,
    examDate,
    examDateSource: source,
    exam: session && source !== "INPUT" && source !== "NONE" ? session : null,
    daysUntilExam,
    mode: daysUntilExam !== null && daysUntilExam >= 1 ? "EXAM_PREP" : "MAINTENANCE",
    availability: readAvailability(plan.availability),
    dailyTargetMinutes: plan.dailyTargetMinutes,
    weeklyTargetMinutes: plan.weeklyTargetMinutes,
    generatedAt: plan.generatedAt,
    lastAdaptedAt: plan.lastAdaptedAt,
    subjects: subjects
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "en"))
      .map((s) => ({ subjectId: s.id, name: s.name })),
  };
}

const sumMinutes = (items: readonly PlanItemView[], filter: (i: PlanItemView) => boolean = () => true) =>
  items.reduce((sum, i) => (filter(i) ? sum + i.targetMinutes : sum), 0);

/** The Monday of `requested` (when valid) or of today's week (pure). */
export function resolveWeekStart(requested: string | null | undefined, today: LocalDate): LocalDate {
  return requested && isLocalDate(requested) ? startOfWeek(requested) : startOfWeek(today);
}

/** The seven days of a week with their items (pure). */
export function buildWeek(args: {
  weekStart: LocalDate;
  today: LocalDate;
  items: readonly PlanItemView[];
  availability: WeeklyAvailability;
  planStart: LocalDate;
  planEnd: LocalDate;
}): WeekPlan {
  const weekStart = startOfWeek(args.weekStart);
  const days = eachLocalDate(weekStart, 7).map((date): PlanDay => {
    const items = args.items.filter((i) => i.date === date).sort((a, b) => a.sortOrder - b.sortOrder);
    const inPlan = daysBetween(args.planStart, date) >= 0 && daysBetween(date, args.planEnd) >= 0;
    const weekday = weekdayKey(date);
    return {
      date,
      weekday,
      isToday: date === args.today,
      isPast: daysBetween(date, args.today) > 0,
      inPlan,
      availableMinutes: args.availability[weekday],
      plannedMinutes: sumMinutes(items),
      doneMinutes: sumMinutes(items, (i) => i.status === "DONE"),
      items,
    };
  });
  const weekEnd = addDays(weekStart, 6);
  const firstWeek = startOfWeek(args.planStart);
  const lastWeek = startOfWeek(args.planEnd);
  return {
    weekStart,
    weekEnd,
    days,
    previousWeekStart: daysBetween(firstWeek, weekStart) > 0 ? addDays(weekStart, -7) : null,
    nextWeekStart: daysBetween(weekStart, lastWeek) > 0 ? addDays(weekStart, 7) : null,
  };
}

/**
 * Everything /app/plan shows (one sync + a few reads): the plan, today's items, the requested week (Monday-based,
 * default this week) and the next two weeks of items for the "why" summary. Without a plan only `entitled` matters.
 * Credits the student's latest work to the plan first ({@link syncPlanProgress}).
 *
 * @throws AppError FORBIDDEN (not a student)
 */
export async function getPlanPage(actor: PlanActor, options: { weekStart?: string | null } = {}, now: Date = new Date()): Promise<PlanPage> {
  assertStudent(actor);
  const timeZone = await zoneOf(actor.userId, actor.timeZone);
  const today = localDateString(now, timeZone);
  const [entitled, plan] = await Promise.all([
    hasEntitlement(actor, "study_plan"),
    db.studyPlan.findFirst({ where: { userId: actor.userId, status: "ACTIVE" }, select: PLAN_SELECT }),
  ]);
  if (!plan) return { today, timeZone, entitled, plan: null, todayPlan: null, week: null, upcoming: [] };

  await syncPlanProgress(db, actor.userId, { now, timeZone });
  const summary = await toPlanSummary(plan, today);
  const weekStart = resolveWeekStart(options.weekStart, today);
  const rangeStart = daysBetween(weekStart, today) > 0 ? weekStart : today;
  const rangeEnd = daysBetween(addDays(weekStart, 6), addDays(today, 13)) > 0 ? addDays(today, 13) : addDays(weekStart, 6);
  const rows = await db.studyPlanItem.findMany({
    where: { planId: plan.id, date: { gte: dateColumnFromLocalDate(rangeStart), lte: dateColumnFromLocalDate(rangeEnd) } },
    select: ITEM_VIEW_SELECT,
    orderBy: [{ date: "asc" }, { sortOrder: "asc" }],
  });
  const items = rows.map(toItemView);
  const todayItems = items.filter((i) => i.date === today);
  return {
    today,
    timeZone,
    entitled,
    plan: summary,
    todayPlan: {
      date: today,
      items: todayItems,
      availableMinutes: summary.availability[weekdayKey(today)],
      plannedMinutes: sumMinutes(todayItems),
      doneMinutes: sumMinutes(todayItems, (i) => i.status === "DONE"),
    },
    week: buildWeek({ weekStart, today, items, availability: summary.availability, planStart: summary.startsOn, planEnd: summary.endsOn }),
    upcoming: items.filter((i) => daysBetween(today, i.date) >= 0 && daysBetween(i.date, addDays(today, 13)) >= 0),
  };
}

/** Today's plan items (§6 "Today's target"), or null without a plan. */
export async function getTodayPlan(actor: PlanActor, now: Date = new Date()): Promise<(TodayPlan & { plan: PlanSummary }) | null> {
  const page = await getPlanPage(actor, {}, now);
  return page.plan && page.todayPlan ? { ...page.todayPlan, plan: page.plan } : null;
}

/** One Monday-to-Sunday week of the plan (default this week), or null without a plan. */
export async function getWeekPlan(actor: PlanActor, weekStart?: string | null, now: Date = new Date()): Promise<(WeekPlan & { plan: PlanSummary }) | null> {
  const page = await getPlanPage(actor, { weekStart: weekStart ?? null }, now);
  return page.plan && page.week ? { ...page.week, plan: page.plan } : null;
}

/** What the create / edit form needs (§16 "student enters exam date, subjects, target"). */
export interface PlanSetup {
  today: LocalDate;
  timeZone: string;
  entitled: boolean;
  subjects: {
    subjectId: string;
    name: string;
    qualificationName: string;
    targetGrade: string | null;
    targetExam: { name: string; startsOn: LocalDate; isProvisional: boolean; isDemo: boolean } | null;
  }[];
  /** Suggested exam date from the target examination; null when none is set or it has passed. */
  suggestedExam: { date: LocalDate; source: "TARGET_SESSION" | "STUDENT_TARGET"; name: string; isProvisional: boolean; isDemo: boolean } | null;
  availability: WeeklyAvailability;
  availabilitySource: "PLAN" | "DEFAULTS";
  minExamDate: LocalDate;
  maxExamDate: LocalDate;
  maxDailyMinutes: number;
  /** The ACTIVE plan's choices (edit mode); null without a plan. */
  current: { subjectIds: string[]; examDate: LocalDate | null } | null;
}

/** Defaults for the plan form: subjects from ACTIVE enrolments, exam date from the target session, availability. */
export async function getPlanSetup(actor: PlanActor, now: Date = new Date()): Promise<PlanSetup> {
  assertStudent(actor);
  const userId = actor.userId;
  const timeZone = await zoneOf(userId, actor.timeZone);
  const today = localDateString(now, timeZone);
  const [entitled, enrollments, studentSession, plan, defaults] = await Promise.all([
    hasEntitlement(actor, "study_plan"),
    activeEnrollments(db, userId),
    studentTargetSession(userId),
    db.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { examDate: true, availability: true, inputs: true } }),
    getStudyDefaults(),
  ]);
  const inputs = plan ? readPlanInputs(plan.inputs) : null;
  const suggestion = defaultExamDate(
    enrollments.map((e) => e.targetExamSession),
    studentSession,
    today,
  );
  const enrolled = new Set(enrollments.map((e) => e.subjectId));
  return {
    today,
    timeZone,
    entitled,
    subjects: enrollments.map((e) => ({
      subjectId: e.subjectId,
      name: e.subject.name,
      qualificationName: e.subject.qualification.name,
      targetGrade: e.targetGrade,
      targetExam: e.targetExamSession
        ? {
            name: e.targetExamSession.name,
            startsOn: localDateFromDateColumn(e.targetExamSession.startsOn),
            isProvisional: e.targetExamSession.isProvisional,
            isDemo: e.targetExamSession.isDemo,
          }
        : null,
    })),
    suggestedExam: suggestion
      ? {
          date: suggestion.date,
          source: suggestion.source,
          name: suggestion.session.name,
          isProvisional: suggestion.session.isProvisional,
          isDemo: suggestion.session.isDemo,
        }
      : null,
    availability: plan ? readAvailability(plan.availability) : readAvailability(defaults.availability),
    availabilitySource: plan ? "PLAN" : "DEFAULTS",
    minExamDate: addDays(today, 1),
    maxExamDate: addDays(today, MAX_EXAM_DATE_DAYS_AHEAD),
    maxDailyMinutes: MAX_DAILY_STUDY_MINUTES,
    current:
      plan && inputs
        ? {
            subjectIds: inputs.subjects.map((s) => s.subjectId).filter((id) => enrolled.has(id)),
            examDate: inputs.examDateSource === "NONE" ? null : localDateFromDateColumn(plan.examDate),
          }
        : null,
  };
}

// =====================================================================================================================
// Jobs
// =====================================================================================================================

export const studyPlanAdaptPayloadSchema = z.looseObject({
  userId: z.uuid().optional(),
  planId: z.uuid().optional(),
  periodStart: z.string().optional(),
});

/** Enqueues one `studyplan.adapt` job per ACTIVE plan (nightly sweep), in id order, 500 at a time. */
export async function enqueueNightlyAdaptations(now: Date = new Date()): Promise<number> {
  const date = localDateString(now, DEFAULT_TIMEZONE);
  let cursor: string | undefined;
  let enqueued = 0;
  for (;;) {
    const plans = await db.studyPlan.findMany({
      where: { status: "ACTIVE", ...(cursor ? { id: { gt: cursor } } : {}) },
      orderBy: { id: "asc" },
      take: 500,
      select: { id: true, userId: true },
    });
    if (plans.length === 0) break;
    for (const plan of plans) {
      const result = await enqueue(STUDYPLAN_ADAPT_JOB, { userId: plan.userId, planId: plan.id }, { dedupeKey: `plan:${plan.id}:${date}` });
      if (result.created) enqueued += 1;
    }
    cursor = plans[plans.length - 1]?.id;
    if (plans.length < 500) break;
  }
  return enqueued;
}

/**
 * Registers `studyplan.adapt` (per user: adapt that student's plan; without `userId`: the nightly sweep) and its
 * schedule, daily at 02:30 CAT (00:30 UTC). Wire it in src/worker/handlers.ts: `registerStudyPlanJobs();`.
 */
export function registerStudyPlanJobs(): void {
  registerJobHandler(
    STUDYPLAN_ADAPT_JOB,
    studyPlanAdaptPayloadSchema,
    async (payload) => {
      if (payload.userId) {
        const result = await adaptPlanForUser(payload.userId);
        return result ?? { skipped: true };
      }
      return { enqueued: await enqueueNightlyAdaptations() };
    },
    { queue: "default", maxAttempts: 3 },
  );
  registerRecurringJob("studyplan.adaptNightly", 1440, STUDYPLAN_ADAPT_JOB, { offsetMinutes: 30 });
}
