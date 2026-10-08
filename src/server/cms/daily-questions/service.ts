import "server-only";
import { z } from "zod";
import { Prisma, type CatalogueStatus, type ContentAccessTier, type ContentStatus, type QuestionType } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { addDays, dateColumnFromLocalDate, daysBetween, eachLocalDate, isLocalDate, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { toExcerpt } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { qualificationLabel } from "@/server/marketing/catalogue-core";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import {
  chooseDailyQuestion,
  DAILY_ACCESS_TIERS,
  DAILY_CALENDAR_DAYS,
  DAILY_DIFFICULTY_MAX,
  DAILY_DIFFICULTY_MIN,
  DAILY_QUESTION_TYPES,
  DAILY_REUSE_WINDOW_DAYS,
  DAILY_SCHEDULE_HORIZON_DAYS,
  dailyScopeKey,
  excludedQuestionIds,
  isDailyDifficulty,
  isRecentlyScheduled,
  rootTopicKey,
  type DailyCandidate,
  type DailyHistoryEntry,
} from "./core";

/**
 * Daily-question production path (§46, §30; ARCHITECTURE §3.7 `dailyQuestion.fill`).
 *
 * - {@link fillDailyQuestions}: the nightly job body. For every ACTIVE subject (board, qualification and subject not
 *   HIDDEN) that has an automatic pool, it inserts the missing DailyQuestion row of today (catch-up) and tomorrow, one
 *   per (date, qualification, subject), with `isAutoSelected = true`. Rows that exist — an editor's choice or an
 *   earlier run — are never touched, and inserts use ON CONFLICT DO NOTHING (the NULLS NOT DISTINCT unique index), so
 *   the job is idempotent and safe next to an editor working in the calendar. Qualification-wide (mixed-subject) rows
 *   are editorial only: filled automatically they would show a question from another subject to students whose own
 *   subject has no pool (the student overview falls back to the qualification-wide row).
 * - Admin calendar (`content.publish`): {@link getDailyQuestionCalendar} (14 days per scope), the candidate list for an
 *   override, {@link scheduleDailyQuestion} (choose a question for a day), {@link autoPickDailyQuestion} (run the
 *   automatic choice for one empty day now) and {@link clearDailyQuestion} (empty a day so the job refills it). Every
 *   change is audited in the same transaction. A day that students have already answered is frozen.
 *
 * Dates are calendar days in the platform time zone (Africa/Harare), as on the public /daily page.
 */

// ---------------------------------------------------------------------------------------------------------------------
// Pools
// ---------------------------------------------------------------------------------------------------------------------

/** Catalogue states whose subjects get a daily question automatically: everything except HIDDEN. */
export const DAILY_ACTIVE_CATALOGUE_STATUSES: readonly CatalogueStatus[] = ["AVAILABLE", "COMING_SOON", "RETIRED"];

export interface DailyScope {
  qualificationId: string;
  /** null = the whole qualification (mixed subjects). */
  subjectId: string | null;
}

/** Hard rules for ANY daily question (automatic or an editor's choice); see ./core. */
const HARD_RULES: Prisma.QuestionWhereInput = {
  status: "PUBLISHED",
  draftOfId: null,
  parentId: null,
  schoolId: null,
  ownerUserId: null,
  accessTier: { in: [...DAILY_ACCESS_TIERS] },
  type: { in: [...DAILY_QUESTION_TYPES] },
  markingMode: "AUTO",
};

/** The automatic pool: hard rules + the editor's `isDailyEligible` flag + the difficulty band. */
const AUTO_RULES: Prisma.QuestionWhereInput = {
  ...HARD_RULES,
  isDailyEligible: true,
  difficulty: { gte: DAILY_DIFFICULTY_MIN, lte: DAILY_DIFFICULTY_MAX },
};

/**
 * Questions of the scope: the subject's own questions, or (qualification-wide) those of the qualification's subjects
 * that students can see, so a mixed-subject day never surfaces a HIDDEN subject's question.
 */
function scopeWhere(scope: DailyScope): Prisma.QuestionWhereInput {
  return scope.subjectId ? { subjectId: scope.subjectId } : { subject: { qualificationId: scope.qualificationId, catalogueStatus: { not: "HIDDEN" } } };
}

const TOPIC_PATHS = { topics: { select: { topic: { select: { path: true } } } } } as const;

function topicKeysOf(row: { topics: { topic: { path: string } }[] }): string[] {
  return [...new Set(row.topics.map((t) => rootTopicKey(t.topic.path)).filter((key): key is string => key !== null))];
}

/** Bound on candidates read per scope and day (oldest first by id); the reuse window rotates through larger pools. */
const MAX_CANDIDATES = 1_000;

const HISTORY_SELECT = { date: true, questionId: true, question: { select: TOPIC_PATHS } } as const satisfies Prisma.DailyQuestionSelect;

function toHistoryEntry(row: Prisma.DailyQuestionGetPayload<{ select: typeof HISTORY_SELECT }>): DailyHistoryEntry {
  return { date: localDateFromDateColumn(row.date), questionId: row.questionId, topicKeys: topicKeysOf(row.question) };
}

/** Scheduled days of a qualification (every scope) between `from` and `to`, inclusive. */
async function loadHistory(client: DbClient, qualificationId: string, from: LocalDate, to: LocalDate): Promise<DailyHistoryEntry[]> {
  const rows = await client.dailyQuestion.findMany({
    where: { qualificationId, date: { gte: dateColumnFromLocalDate(from), lte: dateColumnFromLocalDate(to) } },
    select: HISTORY_SELECT,
    take: 20_000,
  });
  return rows.map(toHistoryEntry);
}

/** The automatic choice for one scope and day (null when the pool is exhausted). */
async function pickForScope(client: DbClient, scope: DailyScope, date: LocalDate, history: readonly DailyHistoryEntry[]): Promise<DailyCandidate | null> {
  const excluded = excludedQuestionIds(date, history);
  const rows = await client.question.findMany({
    where: { ...AUTO_RULES, ...scopeWhere(scope), ...(excluded.length > 0 ? { id: { notIn: excluded } } : {}) },
    select: { id: true, difficulty: true, ...TOPIC_PATHS },
    orderBy: { id: "asc" },
    take: MAX_CANDIDATES,
  });
  return chooseDailyQuestion({
    date,
    scopeKey: dailyScopeKey(scope),
    candidates: rows.map((row) => ({ id: row.id, difficulty: row.difficulty, topicKeys: topicKeysOf(row) })),
    history,
  });
}

/** Today in the platform time zone. */
export function dailyScheduleToday(now: Date = new Date()): LocalDate {
  return localDateString(now, DEFAULT_TIMEZONE);
}

// ---------------------------------------------------------------------------------------------------------------------
// Nightly fill (job body)
// ---------------------------------------------------------------------------------------------------------------------

export interface FillDailyQuestionsOptions {
  now?: Date;
  /** Days to fill (default: today, as a catch-up, and tomorrow, in the platform time zone). At most 31. */
  dates?: readonly LocalDate[];
  /** Only these qualifications (tests, targeted runs). Default: every active qualification. */
  qualificationIds?: readonly string[];
  client?: DbClient;
}

export interface FillDailyQuestionsResult {
  dates: LocalDate[];
  /** Subject scopes with an automatic pool that were considered. */
  scopes: number;
  created: number;
  /** Days that already had a question (an editor's choice or an earlier run). */
  alreadyScheduled: number;
  /** Days left empty because every eligible question was used within the reuse window. */
  exhausted: number;
  /** Up to 20 exhausted scopes (job result / logs; ids only). */
  exhaustedScopes: { date: LocalDate; qualificationId: string; subjectId: string }[];
}

const MAX_FILL_DATES = 31;
const MAX_SUBJECTS = 5_000;

/**
 * Fills the missing automatic daily questions (see the module header). Idempotent. A failure in one scope is logged
 * and the remaining scopes are still filled; the function then throws so the job is retried.
 */
export async function fillDailyQuestions(options: FillDailyQuestionsOptions = {}): Promise<FillDailyQuestionsResult> {
  const client = options.client ?? db;
  const today = dailyScheduleToday(options.now);
  const dates = [...new Set(options.dates ?? [today, addDays(today, 1)])].sort();
  if (dates.length === 0 || dates.length > MAX_FILL_DATES || !dates.every((date) => isLocalDate(date))) {
    throw new RangeError(`fillDailyQuestions: give 1-${MAX_FILL_DATES} valid YYYY-MM-DD dates`);
  }
  const result: FillDailyQuestionsResult = { dates, scopes: 0, created: 0, alreadyScheduled: 0, exhausted: 0, exhaustedScopes: [] };
  if (options.qualificationIds && options.qualificationIds.length === 0) return result;

  const active = { in: [...DAILY_ACTIVE_CATALOGUE_STATUSES] };
  const subjects = await client.subject.findMany({
    where: {
      catalogueStatus: active,
      qualification: { catalogueStatus: active, examBoard: { catalogueStatus: active } },
      ...(options.qualificationIds ? { qualificationId: { in: [...options.qualificationIds] } } : {}),
      questions: { some: AUTO_RULES },
    },
    select: { id: true, qualificationId: true },
    orderBy: [{ qualificationId: "asc" }, { sortOrder: "asc" }, { id: "asc" }],
    take: MAX_SUBJECTS,
  });
  result.scopes = subjects.length;
  if (subjects.length === 0) return result;

  const existing = await client.dailyQuestion.findMany({
    where: { date: { in: dates.map(dateColumnFromLocalDate) }, subjectId: { in: subjects.map((s) => s.id) } },
    select: { date: true, subjectId: true },
  });
  const filled = new Set(existing.map((row) => `${localDateFromDateColumn(row.date)}|${row.subjectId}`));

  const byQualification = new Map<string, string[]>();
  for (const subject of subjects) byQualification.set(subject.qualificationId, [...(byQualification.get(subject.qualificationId) ?? []), subject.id]);

  const first = dates[0] as LocalDate;
  const last = dates[dates.length - 1] as LocalDate;
  let failures = 0;
  for (const [qualificationId, subjectIds] of byQualification) {
    const history = await loadHistory(client, qualificationId, addDays(first, -DAILY_REUSE_WINDOW_DAYS), addDays(last, DAILY_REUSE_WINDOW_DAYS));
    for (const date of dates) {
      for (const subjectId of subjectIds) {
        if (filled.has(`${date}|${subjectId}`)) {
          result.alreadyScheduled += 1;
          continue;
        }
        try {
          const pick = await pickForScope(client, { qualificationId, subjectId }, date, history);
          if (!pick) {
            result.exhausted += 1;
            if (result.exhaustedScopes.length < 20) result.exhaustedScopes.push({ date, qualificationId, subjectId });
            continue;
          }
          const inserted = await client.dailyQuestion.createMany({
            data: [{ date: dateColumnFromLocalDate(date), qualificationId, subjectId, questionId: pick.id, isAutoSelected: true }],
            skipDuplicates: true,
          });
          if (inserted.count === 1) {
            result.created += 1;
            history.push({ date, questionId: pick.id, topicKeys: pick.topicKeys });
          } else {
            // Filled meanwhile (an editor or a parallel run): count it and learn its question for the next days.
            result.alreadyScheduled += 1;
            const row = await client.dailyQuestion.findFirst({ where: { date: dateColumnFromLocalDate(date), qualificationId, subjectId }, select: HISTORY_SELECT });
            if (row) history.push(toHistoryEntry(row));
          }
        } catch (error) {
          failures += 1;
          logger.error("dailyQuestion.fill: could not fill a day", { date, qualificationId, subjectId, err: error });
        }
      }
    }
  }
  if (result.exhausted > 0) {
    logger.warn("dailyQuestion.fill: no eligible question left for some days (flag more questions as daily-eligible)", {
      exhausted: result.exhausted,
      scopes: result.exhaustedScopes,
    });
  }
  if (failures > 0) throw new Error(`dailyQuestion.fill: ${failures} day(s) could not be filled (see the error log); the rest were filled`);
  return result;
}

// ---------------------------------------------------------------------------------------------------------------------
// Admin calendar (read models)
// ---------------------------------------------------------------------------------------------------------------------

export interface DailyQualificationOption {
  id: string;
  /** "ZIMSEC O-Level". */
  label: string;
  catalogueStatus: CatalogueStatus;
  examBoardCatalogueStatus: CatalogueStatus;
}

export interface DailyScopeSummary {
  /** null = whole qualification (mixed subjects). */
  subjectId: string | null;
  name: string;
  /** null for the qualification-wide scope. */
  catalogueStatus: CatalogueStatus | null;
  /** Questions the nightly job may choose from (flagged, free, auto-marked, difficulty 2-3). */
  autoPoolSize: number;
  /** Days of the calendar window that have a question. */
  scheduledDays: number;
  /** The nightly job fills this scope (active subjects with a pool). */
  filledAutomatically: boolean;
}

export interface DailyQuestionSummary {
  id: string;
  excerpt: string;
  type: QuestionType;
  difficulty: number;
  accessTier: ContentAccessTier;
  status: ContentStatus;
  isDailyEligible: boolean;
  isDemo: boolean;
  /** Primary topic name, if tagged. */
  topicName: string | null;
}

export interface DailyCalendarEntry {
  id: string;
  isAutoSelected: boolean;
  /** Students who opened or answered it (signed-in attempts; anonymous answers are never stored). */
  attemptCount: number;
  createdAt: Date;
  question: DailyQuestionSummary;
}

export interface DailyCalendarDay {
  date: LocalDate;
  isToday: boolean;
  entry: DailyCalendarEntry | null;
  /** The day may be changed or cleared (not in the past, nobody has answered it). */
  canChange: boolean;
  lockedReason: string | null;
}

export interface DailyCalendar {
  today: LocalDate;
  qualifications: DailyQualificationOption[];
  qualification: DailyQualificationOption | null;
  /** Qualification-wide scope first, then subjects in admin order. */
  scopes: DailyScopeSummary[];
  scope: DailyScopeSummary | null;
  days: DailyCalendarDay[];
}

const QUESTION_SUMMARY_SELECT = {
  id: true,
  stem: true,
  type: true,
  difficulty: true,
  accessTier: true,
  status: true,
  isDailyEligible: true,
  isDemo: true,
  topics: { where: { isPrimary: true }, select: { topic: { select: { name: true } } }, take: 1 },
} as const satisfies Prisma.QuestionSelect;

function toQuestionSummary(row: Prisma.QuestionGetPayload<{ select: typeof QUESTION_SUMMARY_SELECT }>): DailyQuestionSummary {
  let excerpt: string;
  try {
    excerpt = toExcerpt(row.stem, 140);
  } catch {
    excerpt = row.stem.slice(0, 140);
  }
  return {
    id: row.id,
    excerpt: excerpt || "(no text)",
    type: row.type,
    difficulty: row.difficulty,
    accessTier: row.accessTier,
    status: row.status,
    isDailyEligible: row.isDailyEligible,
    isDemo: row.isDemo,
    topicName: row.topics[0]?.topic.name ?? null,
  };
}

const uuid = z.uuid({ error: "Invalid id." });

function lockReason(date: LocalDate, today: LocalDate, attemptCount: number): string | null {
  if (daysBetween(today, date) < 0) return "Past days are kept as they were.";
  if (attemptCount > 0) return "Students have already answered this day's question, so it can no longer change.";
  return null;
}

const MAX_QUALIFICATIONS = 500;
const MAX_SCOPE_SUBJECTS = 500;

/**
 * The admin calendar: qualification selector, scope summaries (pool size and coverage of the next
 * {@link DAILY_CALENDAR_DAYS} days) and, for the chosen scope, one row per day. `subjectId` "all" selects the
 * qualification-wide scope; a missing or unknown id falls back to the first automatically filled subject.
 */
export async function getDailyQuestionCalendar(
  actor: CmsActor,
  input: { qualificationId?: string | null; subjectId?: string | null } = {},
  now: Date = new Date(),
): Promise<DailyCalendar> {
  assertCmsPermission(actor, "content.publish");
  const today = dailyScheduleToday(now);
  const dates = eachLocalDate(today, DAILY_CALENDAR_DAYS);
  const lastDate = dates[dates.length - 1] as LocalDate;

  const select = { id: true, shortName: true, catalogueStatus: true, examBoard: { select: { shortName: true, catalogueStatus: true } } } as const;
  const requested = input.qualificationId && uuid.safeParse(input.qualificationId).success ? input.qualificationId : null;
  const [qualificationRows, requestedRow] = await Promise.all([
    db.qualification.findMany({
      select,
      orderBy: [{ examBoard: { sortOrder: "asc" } }, { examBoard: { slug: "asc" } }, { sortOrder: "asc" }, { slug: "asc" }],
      take: MAX_QUALIFICATIONS,
    }),
    requested ? db.qualification.findUnique({ where: { id: requested }, select }) : Promise.resolve(null),
  ]);
  const toOption = (q: (typeof qualificationRows)[number]): DailyQualificationOption => ({
    id: q.id,
    label: qualificationLabel(q.examBoard.shortName, q.shortName),
    catalogueStatus: q.catalogueStatus,
    examBoardCatalogueStatus: q.examBoard.catalogueStatus,
  });
  const qualifications = qualificationRows.map(toOption);
  // A qualification beyond the selector's cap is still reachable by id.
  if (requestedRow && !qualifications.some((q) => q.id === requestedRow.id)) qualifications.push(toOption(requestedRow));
  const qualification =
    qualifications.find((q) => q.id === requested) ?? qualifications.find((q) => q.catalogueStatus === "AVAILABLE") ?? qualifications[0] ?? null;
  if (!qualification) return { today, qualifications, qualification: null, scopes: [], scope: null, days: [] };

  const subjects = await db.subject.findMany({
    where: { qualificationId: qualification.id },
    select: { id: true, name: true, catalogueStatus: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    take: MAX_SCOPE_SUBJECTS,
  });
  const subjectIds = subjects.map((s) => s.id);
  const [pools, coverage] = await Promise.all([
    subjectIds.length === 0
      ? Promise.resolve([])
      : db.question.groupBy({ by: ["subjectId"], where: { ...AUTO_RULES, subjectId: { in: subjectIds } }, _count: { _all: true } }),
    db.dailyQuestion.groupBy({
      by: ["subjectId"],
      where: { qualificationId: qualification.id, date: { gte: dateColumnFromLocalDate(today), lte: dateColumnFromLocalDate(lastDate) } },
      _count: { _all: true },
    }),
  ]);
  const poolBySubject = new Map(pools.map((row) => [row.subjectId, row._count._all]));
  const coverageBySubject = new Map(coverage.map((row) => [row.subjectId, row._count._all]));
  const qualificationActive =
    DAILY_ACTIVE_CATALOGUE_STATUSES.includes(qualification.catalogueStatus) && DAILY_ACTIVE_CATALOGUE_STATUSES.includes(qualification.examBoardCatalogueStatus);
  const scopes: DailyScopeSummary[] = [
    {
      subjectId: null,
      name: "Whole qualification (mixed subjects)",
      catalogueStatus: null,
      autoPoolSize: subjects.filter((s) => s.catalogueStatus !== "HIDDEN").reduce((sum, s) => sum + (poolBySubject.get(s.id) ?? 0), 0),
      scheduledDays: coverageBySubject.get(null) ?? 0,
      filledAutomatically: false,
    },
    ...subjects.map((subject) => {
      const autoPoolSize = poolBySubject.get(subject.id) ?? 0;
      return {
        subjectId: subject.id,
        name: subject.name,
        catalogueStatus: subject.catalogueStatus,
        autoPoolSize,
        scheduledDays: coverageBySubject.get(subject.id) ?? 0,
        filledAutomatically: qualificationActive && DAILY_ACTIVE_CATALOGUE_STATUSES.includes(subject.catalogueStatus) && autoPoolSize > 0,
      };
    }),
  ];

  const wide = scopes[0] as DailyScopeSummary;
  const scope =
    input.subjectId === "all"
      ? wide
      : (scopes.find((s) => s.subjectId !== null && s.subjectId === input.subjectId) ??
        scopes.find((s) => s.filledAutomatically) ??
        scopes.find((s) => s.subjectId !== null) ??
        wide);

  const rows = await db.dailyQuestion.findMany({
    where: { qualificationId: qualification.id, subjectId: scope.subjectId, date: { gte: dateColumnFromLocalDate(today), lte: dateColumnFromLocalDate(lastDate) } },
    select: { id: true, date: true, isAutoSelected: true, createdAt: true, _count: { select: { attempts: true } }, question: { select: QUESTION_SUMMARY_SELECT } },
  });
  const byDate = new Map(rows.map((row) => [localDateFromDateColumn(row.date), row]));
  const days = dates.map((date): DailyCalendarDay => {
    const row = byDate.get(date);
    const attemptCount = row?._count.attempts ?? 0;
    const lockedReason = lockReason(date, today, attemptCount);
    return {
      date,
      isToday: date === today,
      entry: row ? { id: row.id, isAutoSelected: row.isAutoSelected, attemptCount, createdAt: row.createdAt, question: toQuestionSummary(row.question) } : null,
      canChange: lockedReason === null,
      lockedReason,
    };
  });
  return { today, qualifications, qualification, scopes, scope, days };
}

export interface DailyCandidateItem extends DailyQuestionSummary {
  /** In the automatic pool (flagged and difficulty 2-3). */
  inAutoPool: boolean;
  /** Most recent day it was scheduled in this qualification, if any. */
  lastScheduledOn: LocalDate | null;
  /** Scheduled within the reuse window around the day (the job would not pick it). */
  recentlyScheduled: boolean;
}

export interface DailyCandidatePage {
  date: LocalDate;
  qualification: { id: string; label: string };
  subject: { id: string; name: string } | null;
  /** The day's current question, if any. */
  current: DailyCalendarEntry | null;
  canChange: boolean;
  lockedReason: string | null;
  items: DailyCandidateItem[];
  nextCursor: string | null;
}

const localDateField = z.string({ error: "Choose a day." }).trim().refine(isLocalDate, { error: "Choose a valid day." });

const candidatesSchema = z.object({
  date: localDateField,
  qualificationId: uuid,
  subjectId: uuid.nullable(),
  q: z.string().trim().max(200).optional(),
  /** Only the automatic pool (default true). */
  autoOnly: z.boolean().default(true),
  cursor: uuid.optional(),
  limit: z.number().int().min(1).max(50).default(20),
});

function parse<S extends z.ZodType>(schema: S, input: unknown): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error, result.error.issues[0]?.message);
  return result.data;
}

/** Validates the scope: the qualification exists and the subject (if any) belongs to it. */
async function loadScope(client: DbClient, scope: DailyScope): Promise<{ qualification: { id: string; label: string }; subject: { id: string; name: string } | null }> {
  const qualification = await client.qualification.findUnique({
    where: { id: scope.qualificationId },
    select: { id: true, shortName: true, examBoard: { select: { shortName: true } } },
  });
  if (!qualification) throw AppError.notFound("Qualification not found.");
  let subject: { id: string; name: string } | null = null;
  if (scope.subjectId) {
    subject = await client.subject.findFirst({ where: { id: scope.subjectId, qualificationId: scope.qualificationId }, select: { id: true, name: true } });
    if (!subject) throw AppError.notFound("Subject not found in this qualification.");
  }
  return { qualification: { id: qualification.id, label: qualificationLabel(qualification.examBoard.shortName, qualification.shortName) }, subject };
}

function assertSchedulableDate(date: LocalDate, today: LocalDate): void {
  const ahead = daysBetween(today, date);
  if (ahead < 0) throw AppError.validation({ date: ["Past days are kept as they were."] }, "Past days are kept as they were.");
  if (ahead > DAILY_SCHEDULE_HORIZON_DAYS) {
    const message = `Days can be scheduled up to ${DAILY_SCHEDULE_HORIZON_DAYS} days ahead.`;
    throw AppError.validation({ date: [message] }, message);
  }
}

/**
 * Questions an editor may choose for a day (hard rules; `autoOnly` narrows to the automatic pool), searchable by text,
 * with when each was last scheduled in the qualification. Cursor pagination by id.
 */
export async function listDailyQuestionCandidates(actor: CmsActor, input: unknown, now: Date = new Date()): Promise<DailyCandidatePage> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(candidatesSchema, input);
  const today = dailyScheduleToday(now);
  const scope: DailyScope = { qualificationId: data.qualificationId, subjectId: data.subjectId };
  const { qualification, subject } = await loadScope(db, scope);

  const [currentRow, rows] = await Promise.all([
    db.dailyQuestion.findFirst({
      where: { date: dateColumnFromLocalDate(data.date), qualificationId: scope.qualificationId, subjectId: scope.subjectId },
      select: { id: true, isAutoSelected: true, createdAt: true, _count: { select: { attempts: true } }, question: { select: QUESTION_SUMMARY_SELECT } },
    }),
    db.question.findMany({
      where: {
        ...(data.autoOnly ? AUTO_RULES : HARD_RULES),
        ...scopeWhere(scope),
        ...(data.q ? { stem: { contains: data.q, mode: "insensitive" } } : {}),
        ...(data.cursor ? { id: { gt: data.cursor } } : {}),
      },
      select: QUESTION_SUMMARY_SELECT,
      orderBy: { id: "asc" },
      take: data.limit + 1,
    }),
  ]);
  const page = rows.slice(0, data.limit);
  const history =
    page.length === 0
      ? []
      : await db.dailyQuestion.findMany({
          where: { qualificationId: scope.qualificationId, questionId: { in: page.map((row) => row.id) } },
          select: { date: true, questionId: true },
          orderBy: { date: "desc" },
          take: 2_000,
        });
  const lastByQuestion = new Map<string, LocalDate>();
  const entries: DailyHistoryEntry[] = [];
  for (const row of history) {
    const date = localDateFromDateColumn(row.date);
    if (!lastByQuestion.has(row.questionId)) lastByQuestion.set(row.questionId, date);
    entries.push({ date, questionId: row.questionId, topicKeys: [] });
  }
  const attemptCount = currentRow?._count.attempts ?? 0;
  const lockedReason = lockReason(data.date, today, attemptCount);
  return {
    date: data.date,
    qualification,
    subject,
    current: currentRow
      ? { id: currentRow.id, isAutoSelected: currentRow.isAutoSelected, attemptCount, createdAt: currentRow.createdAt, question: toQuestionSummary(currentRow.question) }
      : null,
    canChange: lockedReason === null,
    lockedReason,
    items: page.map((row) => {
      const summary = toQuestionSummary(row);
      return {
        ...summary,
        inAutoPool: row.isDailyEligible && isDailyDifficulty(row.difficulty),
        lastScheduledOn: lastByQuestion.get(row.id) ?? null,
        recentlyScheduled: isRecentlyScheduled(row.id, data.date, entries.filter((entry) => !(entry.questionId === row.id && entry.date === data.date))),
      };
    }),
    nextCursor: rows.length > data.limit ? (page[page.length - 1]?.id ?? null) : null,
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Admin calendar (writes)
// ---------------------------------------------------------------------------------------------------------------------

const optionalReason = z
  .string()
  .trim()
  .max(500, { error: "Keep the reason under 500 characters." })
  .optional()
  .transform((value) => (value === "" ? undefined : value));

const scheduleSchema = z.object({
  date: localDateField,
  qualificationId: uuid,
  subjectId: uuid.nullable(),
  questionId: z.uuid({ error: "Choose a question." }),
  reason: optionalReason,
});

const autoPickSchema = z.object({ date: localDateField, qualificationId: uuid, subjectId: uuid.nullable(), reason: optionalReason });

const clearSchema = z.object({ dailyQuestionId: uuid, reason: optionalReason });

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function isForeignKeyViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003";
}

const FROZEN_MESSAGE = "Students have already answered this day's question, so it can no longer change.";
const RACE_MESSAGE = "This day was scheduled by someone else (or the nightly job) a moment ago. Reload the calendar and try again.";

/**
 * Chooses the question of one day and scope (an editor's override: `isAutoSelected = false`, never replaced by the
 * job). Replaces an existing choice unless students have answered it.
 *
 * @throws AppError VALIDATION (input, past or too-far day, question outside the hard rules or the scope) |
 *   NOT_FOUND (qualification / subject) | CONFLICT (answered day, concurrent change) | FORBIDDEN
 */
export async function scheduleDailyQuestion(
  actor: CmsActor,
  input: unknown,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; date: LocalDate; questionId: string; replaced: boolean }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(scheduleSchema, input);
  assertSchedulableDate(data.date, dailyScheduleToday(now));
  const scope: DailyScope = { qualificationId: data.qualificationId, subjectId: data.subjectId };
  await loadScope(db, scope);
  const question = await db.question.findFirst({ where: { id: data.questionId, ...HARD_RULES, ...scopeWhere(scope) }, select: { id: true } });
  if (!question) {
    const message = `Choose a published, free, auto-marked question (${DAILY_QUESTION_TYPES.map((t) => t.toLowerCase().replace(/_/g, " ")).join(", ")}) from this ${scope.subjectId ? "subject" : "qualification"}.`;
    throw AppError.validation({ questionId: [message] }, message);
  }
  const column = dateColumnFromLocalDate(data.date);
  try {
    return await db.$transaction(async (tx) => {
      const existing = await tx.dailyQuestion.findFirst({
        where: { date: column, qualificationId: scope.qualificationId, subjectId: scope.subjectId },
        select: { id: true, questionId: true, isAutoSelected: true },
      });
      let id: string;
      if (existing) {
        const updated = await tx.dailyQuestion.updateMany({ where: { id: existing.id, attempts: { none: {} } }, data: { questionId: question.id, isAutoSelected: false } });
        if (updated.count !== 1) throw AppError.conflict(FROZEN_MESSAGE);
        id = existing.id;
      } else {
        const created = await tx.dailyQuestion.create({
          data: { date: column, qualificationId: scope.qualificationId, subjectId: scope.subjectId, questionId: question.id, isAutoSelected: false },
          select: { id: true },
        });
        id = created.id;
      }
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: AUDIT_ACTIONS.DAILY_QUESTION_SCHEDULE,
        entityType: "DailyQuestion",
        entityId: id,
        before: existing ? { questionId: existing.questionId, isAutoSelected: existing.isAutoSelected } : null,
        after: { questionId: question.id, isAutoSelected: false },
        metadata: { operation: "override", date: data.date, qualificationId: scope.qualificationId, subjectId: scope.subjectId },
        reason: data.reason ?? null,
        request,
      });
      return { id, date: data.date, questionId: question.id, replaced: existing !== null };
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict(RACE_MESSAGE);
    throw error;
  }
}

/**
 * Runs the automatic choice for one EMPTY day now (same rules as the nightly job, any scope), so an editor can see
 * and keep (or change) the pick ahead of time.
 *
 * @throws AppError VALIDATION (input, day, or no eligible question left) | NOT_FOUND | CONFLICT (already scheduled)
 */
export async function autoPickDailyQuestion(
  actor: CmsActor,
  input: unknown,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; date: LocalDate; questionId: string }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(autoPickSchema, input);
  assertSchedulableDate(data.date, dailyScheduleToday(now));
  const scope: DailyScope = { qualificationId: data.qualificationId, subjectId: data.subjectId };
  await loadScope(db, scope);
  const column = dateColumnFromLocalDate(data.date);
  const existing = await db.dailyQuestion.findFirst({ where: { date: column, qualificationId: scope.qualificationId, subjectId: scope.subjectId }, select: { id: true } });
  if (existing) throw AppError.conflict("This day already has a question. Change it, or clear it first.");

  const history = await loadHistory(db, scope.qualificationId, addDays(data.date, -DAILY_REUSE_WINDOW_DAYS), addDays(data.date, DAILY_REUSE_WINDOW_DAYS));
  const pick = await pickForScope(db, scope, data.date, history);
  if (!pick) {
    const message = `No question is available for an automatic choice: every daily-eligible, free, auto-marked question of difficulty ${DAILY_DIFFICULTY_MIN}-${DAILY_DIFFICULTY_MAX} was used within ${DAILY_REUSE_WINDOW_DAYS} days (or none is flagged). Flag more questions as daily-eligible, or choose one yourself.`;
    throw AppError.validation({ _form: [message] }, message);
  }
  try {
    return await db.$transaction(async (tx) => {
      const created = await tx.dailyQuestion.create({
        data: { date: column, qualificationId: scope.qualificationId, subjectId: scope.subjectId, questionId: pick.id, isAutoSelected: true },
        select: { id: true },
      });
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: AUDIT_ACTIONS.DAILY_QUESTION_SCHEDULE,
        entityType: "DailyQuestion",
        entityId: created.id,
        after: { questionId: pick.id, isAutoSelected: true },
        metadata: { operation: "auto_pick", date: data.date, qualificationId: scope.qualificationId, subjectId: scope.subjectId },
        reason: data.reason ?? null,
        request,
      });
      return { id: created.id, date: data.date, questionId: pick.id };
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict(RACE_MESSAGE);
    throw error;
  }
}

/**
 * Empties a day (today or later, nobody has answered it). The nightly job fills it again unless an editor chooses a
 * question first.
 *
 * @throws AppError VALIDATION | NOT_FOUND | CONFLICT (past or answered day)
 */
export async function clearDailyQuestion(
  actor: CmsActor,
  input: unknown,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ date: LocalDate; qualificationId: string; subjectId: string | null }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(clearSchema, input);
  const row = await db.dailyQuestion.findUnique({
    where: { id: data.dailyQuestionId },
    select: { id: true, date: true, qualificationId: true, subjectId: true, questionId: true, isAutoSelected: true },
  });
  if (!row) throw AppError.notFound("This scheduled day no longer exists.");
  const date = localDateFromDateColumn(row.date);
  if (daysBetween(dailyScheduleToday(now), date) < 0) throw AppError.conflict("Past days are kept as they were.");
  try {
    await db.$transaction(async (tx) => {
      const deleted = await tx.dailyQuestion.deleteMany({ where: { id: row.id, attempts: { none: {} } } });
      if (deleted.count !== 1) throw AppError.conflict(FROZEN_MESSAGE);
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: AUDIT_ACTIONS.DAILY_QUESTION_CLEAR,
        entityType: "DailyQuestion",
        entityId: row.id,
        before: { questionId: row.questionId, isAutoSelected: row.isAutoSelected },
        metadata: { operation: "clear", date, qualificationId: row.qualificationId, subjectId: row.subjectId },
        reason: data.reason ?? null,
        request,
      });
    });
  } catch (error) {
    if (isForeignKeyViolation(error)) throw AppError.conflict(FROZEN_MESSAGE);
    throw error;
  }
  return { date, qualificationId: row.qualificationId, subjectId: row.subjectId };
}
