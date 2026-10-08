/**
 * Leaderboards (§20 "optional competitive system: weekly questions, mock exam scores, study streak, subject mastery";
 * privacy modes real name / first name / username / anonymous). Pure core: no DB, no I/O.
 *
 * Boards are identified by (metric, periodKey, scopeType, scopeId) — the LeaderboardEntry natural key minus the user:
 *
 * | Metric           | periodKey            | Value                                                         | Scopes                         |
 * |------------------|----------------------|---------------------------------------------------------------|--------------------------------|
 * | WEEKLY_XP        | ISO week "2026-W41"  | XP earned that week (student-local days, DailyActivity)       | GLOBAL, COUNTRY, SCHOOL, CLASS |
 * | WEEKLY_QUESTIONS | ISO week             | Questions answered that week                                  | GLOBAL, COUNTRY, SCHOOL, CLASS |
 * | STREAK           | "LIVE"               | Current daily-goal streak (days)                              | GLOBAL, COUNTRY, SCHOOL, CLASS |
 * | MOCK_AVERAGE     | month "2026-10"      | Mean % of marked mock exams that month, minimum 2 mocks       | all five (SUBJECT/CLASS: that subject's mocks) |
 * | SUBJECT_MASTERY  | "LIVE"               | SubjectProgress.progressPercent of the subject                | SUBJECT, CLASS (class subject) |
 *
 * Only positive values make a row (a student with no XP this week is simply not on that week's board yet), and only
 * students who opted in (Profile.leaderboardOptIn) are ever considered — enforced by the snapshot job (./snapshot).
 * Ranks are DENSE (ties share a rank; the next distinct score is the next rank) and computed at read time from the
 * board index, except at the weekly close where final ranks are written.
 */
import type { LeaderboardDisplay, LeaderboardMetric, LeaderboardScope } from "@/generated/prisma/client";
import { addDays, isLocalDate, isoWeekKey, parseLocalDate, startOfWeek, type LocalDate } from "@/lib/dates";

export const LEADERBOARD_METRICS = ["WEEKLY_XP", "WEEKLY_QUESTIONS", "STREAK", "MOCK_AVERAGE", "SUBJECT_MASTERY"] as const satisfies readonly LeaderboardMetric[];
export const LEADERBOARD_SCOPES = ["GLOBAL", "COUNTRY", "SCHOOL", "CLASS", "SUBJECT"] as const satisfies readonly LeaderboardScope[];

/** Scopes each metric is published for (see module table). */
export const METRIC_SCOPES: Readonly<Record<LeaderboardMetric, readonly LeaderboardScope[]>> = Object.freeze({
  WEEKLY_XP: ["GLOBAL", "COUNTRY", "SCHOOL", "CLASS"],
  WEEKLY_QUESTIONS: ["GLOBAL", "COUNTRY", "SCHOOL", "CLASS"],
  STREAK: ["GLOBAL", "COUNTRY", "SCHOOL", "CLASS"],
  MOCK_AVERAGE: ["GLOBAL", "COUNTRY", "SCHOOL", "CLASS", "SUBJECT"],
  SUBJECT_MASTERY: ["SUBJECT", "CLASS"],
});

/** Weekly metrics: final ranks are written for them at the weekly close. */
export const WEEKLY_METRICS = ["WEEKLY_XP", "WEEKLY_QUESTIONS"] as const satisfies readonly LeaderboardMetric[];
export const LIVE_PERIOD_KEY = "LIVE";
/** Default minimum number of marked mocks in the month before a MOCK_AVERAGE score counts (§20 fairness). */
export const DEFAULT_MIN_MOCKS = 2;

export function isLeaderboardMetric(value: unknown): value is LeaderboardMetric {
  return typeof value === "string" && (LEADERBOARD_METRICS as readonly string[]).includes(value);
}

export function isLeaderboardScope(value: unknown): value is LeaderboardScope {
  return typeof value === "string" && (LEADERBOARD_SCOPES as readonly string[]).includes(value);
}

export function metricSupportsScope(metric: LeaderboardMetric, scope: LeaderboardScope): boolean {
  return METRIC_SCOPES[metric].includes(scope);
}

// ---------------------------------------------------------------------------------------------------------------------
// Periods
// ---------------------------------------------------------------------------------------------------------------------

const WEEK_KEY = /^(\d{4})-W(\d{2})$/;
const MONTH_KEY = /^(\d{4})-(\d{2})$/;

export function isWeekKey(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = WEEK_KEY.exec(value);
  if (!match) return false;
  const week = Number(match[2]);
  if (week < 1 || week > 53) return false;
  // Week 53 exists only in long ISO years: round-trip through the Monday to be sure.
  return isoWeekKey(mondayOfWeekKeyUnchecked(Number(match[1]), week)) === value;
}

export function isMonthKey(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = MONTH_KEY.exec(value);
  return match !== null && Number(match[2]) >= 1 && Number(match[2]) <= 12;
}

function mondayOfWeekKeyUnchecked(year: number, week: number): LocalDate {
  // ISO week 1 is the week containing 4 January.
  const jan4 = `${String(year).padStart(4, "0")}-01-04`;
  return addDays(startOfWeek(jan4), (week - 1) * 7);
}

/** Monday (local date) of an ISO week key, e.g. "2026-W41" -> "2026-10-05". Throws RangeError on a bad key. */
export function mondayOfWeekKey(weekKey: string): LocalDate {
  if (!isWeekKey(weekKey)) throw new RangeError(`Invalid ISO week key: ${weekKey}`);
  const match = WEEK_KEY.exec(weekKey)!;
  return mondayOfWeekKeyUnchecked(Number(match[1]), Number(match[2]));
}

/** First and last local day (Monday..Sunday) of an ISO week. */
export function weekRange(weekKey: string): { start: LocalDate; end: LocalDate } {
  const start = mondayOfWeekKey(weekKey);
  return { start, end: addDays(start, 6) };
}

export function previousWeekKey(weekKey: string): string {
  return isoWeekKey(addDays(mondayOfWeekKey(weekKey), -7));
}

/** "2026-10" for a local date. */
export function monthKeyOf(date: LocalDate): string {
  const { year, month } = parseLocalDate(date);
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}`;
}

/** First local day of the month and the first day of the next month (exclusive end). */
export function monthRange(monthKey: string): { start: LocalDate; endExclusive: LocalDate } {
  if (!isMonthKey(monthKey)) throw new RangeError(`Invalid month key: ${monthKey}`);
  const [year, month] = monthKey.split("-").map(Number) as [number, number];
  const start = `${monthKey}-01`;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  return { start, endExclusive: `${String(nextYear).padStart(4, "0")}-${String(nextMonth).padStart(2, "0")}-01` };
}

/** Month keys a week touches (one, or two when it straddles a month boundary), oldest first. */
export function monthKeysOfWeek(weekKey: string): string[] {
  const { start, end } = weekRange(weekKey);
  const first = monthKeyOf(start);
  const last = monthKeyOf(end);
  return first === last ? [first] : [first, last];
}

/** The periodKey a metric uses for a given week / month. */
export function periodKeyFor(metric: LeaderboardMetric, periods: { weekKey: string; monthKey: string }): string {
  switch (metric) {
    case "WEEKLY_XP":
    case "WEEKLY_QUESTIONS":
      return periods.weekKey;
    case "MOCK_AVERAGE":
      return periods.monthKey;
    case "STREAK":
    case "SUBJECT_MASTERY":
      return LIVE_PERIOD_KEY;
  }
}

/** The current periods for a student-local date. */
export function currentPeriods(today: LocalDate): { weekKey: string; monthKey: string } {
  if (!isLocalDate(today)) throw new RangeError(`Invalid local date: ${String(today)}`);
  return { weekKey: isoWeekKey(today), monthKey: monthKeyOf(today) };
}

// ---------------------------------------------------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------------------------------------------------

/** Scores are stored with one decimal (percentages) or as whole numbers (counts). */
export function roundScore(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Mean of mock percentages, or null when fewer than `minCount` mocks were marked (§20: averages need evidence). */
export function mockAverage(percentages: readonly number[], minCount: number = DEFAULT_MIN_MOCKS): number | null {
  const valid = percentages.filter((p) => Number.isFinite(p) && p >= 0 && p <= 100);
  if (valid.length === 0 || valid.length < Math.max(1, minCount)) return null;
  return roundScore(valid.reduce((sum, p) => sum + p, 0) / valid.length);
}

/** Everything the snapshot knows about one opted-in student for one run. */
export interface StudentBoardFacts {
  userId: string;
  countryId: string | null;
  /** ACTIVE STUDENT memberships of operating schools. */
  schoolIds: readonly string[];
  /** ACTIVE class memberships of non-archived classes (subject of the class, if any). */
  classes: readonly { classId: string; subjectId: string | null }[];
  /** Σ DailyActivity.xpEarned over the week (student-local days). */
  weeklyXp: number;
  /** Σ DailyActivity.questionsAttempted over the week. */
  weeklyQuestions: number;
  /** Displayed current streak (days). */
  streak: number;
  /** Marked mock exams of the month (percentages), with their subject. */
  mocks: readonly { subjectId: string; percentage: number }[];
  /** SubjectProgress.progressPercent per ACTIVE enrolment. */
  mastery: readonly { subjectId: string; percent: number }[];
}

export interface BoardRow {
  metric: LeaderboardMetric;
  periodKey: string;
  scopeType: LeaderboardScope;
  /** NULL for GLOBAL (LeaderboardEntry_scope_chk). */
  scopeId: string | null;
  userId: string;
  value: number;
}

export interface BuildRowsOptions {
  weekKey: string;
  monthKey: string;
  /** Metrics to produce (default all). */
  metrics?: readonly LeaderboardMetric[];
  minMocks?: number;
}

/** Shared scopes of the non-subject metrics: the global board, the country, each school and each class. */
function socialScopes(facts: StudentBoardFacts): { scopeType: LeaderboardScope; scopeId: string | null }[] {
  const scopes: { scopeType: LeaderboardScope; scopeId: string | null }[] = [{ scopeType: "GLOBAL", scopeId: null }];
  if (facts.countryId) scopes.push({ scopeType: "COUNTRY", scopeId: facts.countryId });
  for (const schoolId of new Set(facts.schoolIds)) scopes.push({ scopeType: "SCHOOL", scopeId: schoolId });
  for (const classId of new Set(facts.classes.map((c) => c.classId))) scopes.push({ scopeType: "CLASS", scopeId: classId });
  return scopes;
}

/**
 * The LeaderboardEntry rows one student contributes in a run (pure). Rows exist only for positive values; MOCK_AVERAGE
 * needs `minMocks` marked mocks in the month (per subject for SUBJECT boards and subject classes); SUBJECT_MASTERY is
 * published per enrolled subject and in classes that teach one of those subjects.
 */
export function buildBoardRows(facts: StudentBoardFacts, options: BuildRowsOptions): BoardRow[] {
  const wanted = new Set<LeaderboardMetric>(options.metrics ?? LEADERBOARD_METRICS);
  const minMocks = options.minMocks ?? DEFAULT_MIN_MOCKS;
  const rows: BoardRow[] = [];
  const periods = { weekKey: options.weekKey, monthKey: options.monthKey };
  const push = (metric: LeaderboardMetric, scopeType: LeaderboardScope, scopeId: string | null, value: number) => {
    rows.push({ metric, periodKey: periodKeyFor(metric, periods), scopeType, scopeId, userId: facts.userId, value });
  };
  const social = socialScopes(facts);

  const counts: [LeaderboardMetric, number][] = [
    ["WEEKLY_XP", Math.floor(facts.weeklyXp)],
    ["WEEKLY_QUESTIONS", Math.floor(facts.weeklyQuestions)],
    ["STREAK", Math.floor(facts.streak)],
  ];
  for (const [metric, value] of counts) {
    if (!wanted.has(metric) || !(value > 0)) continue;
    for (const scope of social) push(metric, scope.scopeType, scope.scopeId, value);
  }

  if (wanted.has("MOCK_AVERAGE")) {
    const overall = mockAverage(facts.mocks.map((m) => m.percentage), minMocks);
    const bySubject = new Map<string, number[]>();
    for (const mock of facts.mocks) bySubject.set(mock.subjectId, [...(bySubject.get(mock.subjectId) ?? []), mock.percentage]);
    const subjectAverage = (subjectId: string) => mockAverage(bySubject.get(subjectId) ?? [], minMocks);
    for (const scope of social) {
      if (scope.scopeType === "CLASS") {
        const subjectId = facts.classes.find((c) => c.classId === scope.scopeId)?.subjectId ?? null;
        const value = subjectId ? subjectAverage(subjectId) : overall;
        if (value !== null && value > 0) push("MOCK_AVERAGE", "CLASS", scope.scopeId, value);
      } else if (overall !== null && overall > 0) {
        push("MOCK_AVERAGE", scope.scopeType, scope.scopeId, overall);
      }
    }
    for (const subjectId of bySubject.keys()) {
      const value = subjectAverage(subjectId);
      if (value !== null && value > 0) push("MOCK_AVERAGE", "SUBJECT", subjectId, value);
    }
  }

  if (wanted.has("SUBJECT_MASTERY")) {
    const mastery = new Map<string, number>();
    for (const row of facts.mastery) if (Number.isFinite(row.percent) && row.percent > 0) mastery.set(row.subjectId, roundScore(Math.min(100, row.percent)));
    for (const [subjectId, value] of mastery) push("SUBJECT_MASTERY", "SUBJECT", subjectId, value);
    for (const cls of facts.classes) {
      const value = cls.subjectId ? mastery.get(cls.subjectId) : undefined;
      if (value !== undefined) push("SUBJECT_MASTERY", "CLASS", cls.classId, value);
    }
  }

  // A student may hold the same class twice in input (defensive): keep the first row per board.
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = boardRowKey(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Natural key of a row (board + user). */
export function boardRowKey(row: Pick<BoardRow, "metric" | "periodKey" | "scopeType" | "scopeId" | "userId">): string {
  return [row.metric, row.periodKey, row.scopeType, row.scopeId ?? "", row.userId].join("|");
}

// ---------------------------------------------------------------------------------------------------------------------
// Ranks
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Dense ranks for scores already sorted from highest to lowest (ties share a rank). `firstRank` is the rank of the
 * first value (1 for a top-N list; for a window further down, 1 + the number of distinct higher scores).
 */
export function denseRanks(sortedDescending: readonly number[], firstRank = 1): number[] {
  const ranks: number[] = [];
  let rank = firstRank;
  sortedDescending.forEach((value, index) => {
    if (index > 0 && value !== sortedDescending[index - 1]) rank += 1;
    ranks.push(rank);
  });
  return ranks;
}

// ---------------------------------------------------------------------------------------------------------------------
// Names (resolved at READ time, never stored)
// ---------------------------------------------------------------------------------------------------------------------

export interface BoardNameSource {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  display: LeaderboardDisplay;
}

/**
 * Stable pseudonym for ANONYMOUS rows ("Student #4821"), derived from a keyed digest of the user id (the caller passes
 * the hex HMAC), so the same student keeps the same label across boards and weeks without revealing who they are.
 */
export function anonymousPseudonym(digestHex: string): string {
  const head = /^[0-9a-f]{8}/i.exec(digestHex)?.[0];
  if (!head) throw new RangeError("anonymousPseudonym: expected a hex digest");
  return `Student #${1000 + (Number.parseInt(head, 16) % 9000)}`;
}

/**
 * The display mode actually used (MIN-01): REAL_NAME (full name) falls back to FIRST_NAME (first name + last initial)
 * for a minor without GRANTED guardian consent (`publicSharingAllowed`, src/server/family/consent-gate.ts), whatever the
 * stored preference says, so a withdrawal applies at the next read. Pure.
 */
export function effectiveBoardDisplay(display: LeaderboardDisplay, realNameAllowed: boolean): LeaderboardDisplay {
  return display === "REAL_NAME" && !realNameAllowed ? "FIRST_NAME" : display;
}

/**
 * Name shown on a board for the student's chosen mode (§20): REAL_NAME = first + last name; FIRST_NAME = first name +
 * last initial; USERNAME = public handle; ANONYMOUS = pseudonym. A mode the profile cannot support (no first name / no
 * username) falls back to the pseudonym. Never an email, phone or school name.
 */
export function boardDisplayName(source: BoardNameSource, pseudonym: string): string {
  const first = source.firstName?.trim() || null;
  const last = source.lastName?.trim() || null;
  switch (source.display) {
    case "REAL_NAME":
      return first ? (last ? `${first} ${last}` : first) : pseudonym;
    case "FIRST_NAME":
      return first ? (last ? `${first} ${last.charAt(0).toUpperCase()}.` : first) : pseudonym;
    case "USERNAME":
      return source.username?.trim() || pseudonym;
    case "ANONYMOUS":
      return pseudonym;
  }
}
