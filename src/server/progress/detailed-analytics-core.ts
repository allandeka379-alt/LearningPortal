import { addDays, type LocalDate } from "@/lib/dates";
import { roundHalfUp } from "@/lib/math";

/**
 * Pure core of the "Detailed analytics" section of /app/progress (§6, §11; the `advancedAnalytics` entitlement, §31).
 * No I/O (CLAUDE.md rule 2): the service (./detailed-analytics.ts) aggregates QuestionAttempt rows per (subject, topic,
 * difficulty, week) and DailyActivity rows per day in SQL, and this module turns them into:
 *
 * - weekly trend: study minutes, questions and accuracy per week (DailyActivity, the same source as "Last 30 days");
 * - per-topic trends: the most-practised topics with weekly accuracy, and the change between the recent and the earlier
 *   half of the window (only when both halves have enough answers: an honest "not enough data" otherwise);
 * - accuracy by difficulty (1-5, the difficulty stored on each answer at attempt time);
 * - time per question: overall and per subject, from the client-measured active time (answers without a measured time
 *   are left out rather than counted as 0 s).
 *
 * Weeks are 7-day buckets ending TODAY in the student's time zone (index 0 = the last 7 days), not calendar weeks, so
 * the current bucket is always complete.
 */

/** Weeks covered by the section. */
export const DETAILED_WEEKS = 8;
/** Answers each half of the window needs before a topic's change is shown. */
export const TREND_MIN_ANSWERS = 5;
/** Change (percentage points) below which a topic counts as steady. */
export const TREND_STEADY_POINTS = 5;
/** Topics listed (most answered first). */
export const TOPIC_TREND_LIMIT = 8;

/** Student-facing names of the 1-5 difficulty scale (UI copy). */
export const DIFFICULTY_NAMES: Readonly<Record<number, string>> = { 1: "Very easy", 2: "Easy", 3: "Medium", 4: "Hard", 5: "Very hard" };

/** One SQL group of marked, answered QuestionAttempt rows. */
export interface AttemptAggregateRow {
  subjectId: string;
  topicId: string;
  difficulty: number;
  /** 0 = the last 7 days (ending today), 1 = the 7 days before, ... */
  weekIndex: number;
  answered: number;
  correct: number;
  /** Answers with a measured active time (> 0 s). */
  timed: number;
  /** Sum of the measured active time of `timed` answers. */
  seconds: number;
}

/** One DailyActivity row (local date). */
export interface DailyActivityLite {
  date: LocalDate;
  studySeconds: number;
  questionsAttempted: number;
  questionsCorrect: number;
}

export interface AnalyticsWeek {
  index: number;
  from: LocalDate;
  to: LocalDate;
  studyMinutes: number;
  questionsAnswered: number;
  accuracyPercent: number | null;
}

export type TrendDirection = "up" | "down" | "steady";

export interface TopicTrend {
  topicId: string;
  topicName: string;
  subjectId: string;
  subjectName: string;
  answered: number;
  accuracyPercent: number | null;
  /** Accuracy per week, oldest first (null = no answers that week). */
  weekly: (number | null)[];
  recent: { answered: number; accuracyPercent: number | null };
  earlier: { answered: number; accuracyPercent: number | null };
  /** Recent minus earlier accuracy in percentage points; null when either half has too few answers. */
  change: number | null;
  direction: TrendDirection | null;
}

export interface DifficultyRow {
  difficulty: number;
  label: string;
  answered: number;
  correct: number;
  accuracyPercent: number | null;
  secondsPerQuestion: number | null;
}

export interface SubjectTime {
  subjectId: string;
  subjectName: string;
  answered: number;
  secondsPerQuestion: number | null;
}

export interface DetailedAnalytics {
  window: { from: LocalDate; to: LocalDate; weeks: number };
  /** Any marked answer in the window (false: show an honest empty state). */
  hasAnswers: boolean;
  /** Oldest first. */
  weeks: AnalyticsWeek[];
  topics: TopicTrend[];
  /** All five levels, easiest first (levels without answers have null rates). */
  difficulty: DifficultyRow[];
  time: { secondsPerQuestion: number | null; timedAnswers: number; bySubject: SubjectTime[] };
}

export interface DetailedAnalyticsInput {
  today: LocalDate;
  weeks?: number;
  attempts: readonly AttemptAggregateRow[];
  activity: readonly DailyActivityLite[];
  topicNames: ReadonlyMap<string, string>;
  subjectNames: ReadonlyMap<string, string>;
}

const pct = (part: number, whole: number): number | null => (whole > 0 ? roundHalfUp((part * 100) / whole, 1) : null);
const perQuestion = (seconds: number, timed: number): number | null => (timed > 0 ? roundHalfUp(seconds / timed, 0) : null);

/** First local date of the window ending `today` (inclusive). */
export function windowStart(today: LocalDate, weeks: number = DETAILED_WEEKS): LocalDate {
  return addDays(today, -(weeks * 7 - 1));
}

/** Week bucket of a local date (0 = the last 7 days), or null outside the window. Pure. */
export function weekIndexOf(date: LocalDate, today: LocalDate, weeks: number = DETAILED_WEEKS): number | null {
  if (date > today) return null;
  for (let index = 0; index < weeks; index++) {
    if (date >= addDays(today, -(index * 7 + 6))) return index;
  }
  return null;
}

/** Direction of a change in percentage points (pure). */
export function trendDirection(change: number | null): TrendDirection | null {
  if (change === null) return null;
  if (change >= TREND_STEADY_POINTS) return "up";
  if (change <= -TREND_STEADY_POINTS) return "down";
  return "steady";
}

interface Tally {
  answered: number;
  correct: number;
  timed: number;
  seconds: number;
}

const emptyTally = (): Tally => ({ answered: 0, correct: 0, timed: 0, seconds: 0 });

function add(tally: Tally, row: Pick<AttemptAggregateRow, "answered" | "correct" | "timed" | "seconds">): void {
  tally.answered += Math.max(0, row.answered);
  tally.correct += Math.max(0, Math.min(row.correct, row.answered));
  tally.timed += Math.max(0, row.timed);
  tally.seconds += Math.max(0, row.seconds);
}

/** Builds the section from the aggregates (pure; module doc). Rows outside the window are ignored. */
export function buildDetailedAnalytics(input: DetailedAnalyticsInput): DetailedAnalytics {
  const weeksCount = input.weeks ?? DETAILED_WEEKS;
  const rows = input.attempts.filter((row) => Number.isInteger(row.weekIndex) && row.weekIndex >= 0 && row.weekIndex < weeksCount);
  const half = Math.floor(weeksCount / 2);

  // Weekly overview from DailyActivity.
  const weeks: AnalyticsWeek[] = [];
  for (let index = weeksCount - 1; index >= 0; index--) {
    weeks.push({ index, from: addDays(input.today, -(index * 7 + 6)), to: addDays(input.today, -(index * 7)), studyMinutes: 0, questionsAnswered: 0, accuracyPercent: null });
  }
  const correctByWeek = new Map<number, number>();
  for (const day of input.activity) {
    const index = weekIndexOf(day.date, input.today, weeksCount);
    const week = index === null ? undefined : weeks.find((w) => w.index === index);
    if (!week || index === null) continue;
    week.studyMinutes += Math.max(0, day.studySeconds) / 60;
    week.questionsAnswered += Math.max(0, day.questionsAttempted);
    correctByWeek.set(index, (correctByWeek.get(index) ?? 0) + Math.max(0, Math.min(day.questionsCorrect, day.questionsAttempted)));
  }
  for (const week of weeks) {
    week.studyMinutes = Math.floor(week.studyMinutes);
    week.accuracyPercent = pct(correctByWeek.get(week.index) ?? 0, week.questionsAnswered);
  }

  // Per topic.
  const byTopic = new Map<string, { subjectId: string; total: Tally; recent: Tally; earlier: Tally; weekly: Tally[] }>();
  for (const row of rows) {
    let entry = byTopic.get(row.topicId);
    if (!entry) {
      entry = { subjectId: row.subjectId, total: emptyTally(), recent: emptyTally(), earlier: emptyTally(), weekly: Array.from({ length: weeksCount }, emptyTally) };
      byTopic.set(row.topicId, entry);
    }
    add(entry.total, row);
    add(row.weekIndex < half ? entry.recent : entry.earlier, row);
    const bucket = entry.weekly[weeksCount - 1 - row.weekIndex];
    if (bucket) add(bucket, row);
  }
  const topics: TopicTrend[] = [...byTopic.entries()]
    .sort(([idA, a], [idB, b]) => b.total.answered - a.total.answered || (idA < idB ? -1 : idA > idB ? 1 : 0))
    .slice(0, TOPIC_TREND_LIMIT)
    .map(([topicId, entry]) => {
      const recentAccuracy = pct(entry.recent.correct, entry.recent.answered);
      const earlierAccuracy = pct(entry.earlier.correct, entry.earlier.answered);
      const enough = entry.recent.answered >= TREND_MIN_ANSWERS && entry.earlier.answered >= TREND_MIN_ANSWERS;
      const change = enough && recentAccuracy !== null && earlierAccuracy !== null ? roundHalfUp(recentAccuracy - earlierAccuracy, 1) : null;
      return {
        topicId,
        topicName: input.topicNames.get(topicId) ?? "Topic",
        subjectId: entry.subjectId,
        subjectName: input.subjectNames.get(entry.subjectId) ?? "",
        answered: entry.total.answered,
        accuracyPercent: pct(entry.total.correct, entry.total.answered),
        weekly: entry.weekly.map((tally) => pct(tally.correct, tally.answered)),
        recent: { answered: entry.recent.answered, accuracyPercent: recentAccuracy },
        earlier: { answered: entry.earlier.answered, accuracyPercent: earlierAccuracy },
        change,
        direction: trendDirection(change),
      };
    });

  // By difficulty (all five levels; out-of-range values are clamped onto the scale).
  const byDifficulty = new Map<number, Tally>([1, 2, 3, 4, 5].map((level) => [level, emptyTally()]));
  const overall = emptyTally();
  const bySubject = new Map<string, Tally>();
  for (const row of rows) {
    const level = Math.min(5, Math.max(1, Math.round(row.difficulty)));
    add(byDifficulty.get(level) as Tally, row);
    add(overall, row);
    const subject = bySubject.get(row.subjectId) ?? emptyTally();
    add(subject, row);
    bySubject.set(row.subjectId, subject);
  }
  const difficulty: DifficultyRow[] = [...byDifficulty.entries()].map(([level, tally]) => ({
    difficulty: level,
    label: DIFFICULTY_NAMES[level] ?? String(level),
    answered: tally.answered,
    correct: tally.correct,
    accuracyPercent: pct(tally.correct, tally.answered),
    secondsPerQuestion: perQuestion(tally.seconds, tally.timed),
  }));

  return {
    window: { from: windowStart(input.today, weeksCount), to: input.today, weeks: weeksCount },
    hasAnswers: overall.answered > 0,
    weeks,
    topics,
    difficulty,
    time: {
      secondsPerQuestion: perQuestion(overall.seconds, overall.timed),
      timedAnswers: overall.timed,
      bySubject: [...bySubject.entries()]
        .map(([subjectId, tally]) => ({
          subjectId,
          subjectName: input.subjectNames.get(subjectId) ?? "",
          answered: tally.answered,
          secondsPerQuestion: perQuestion(tally.seconds, tally.timed),
        }))
        .sort((a, b) => b.answered - a.answered || a.subjectName.localeCompare(b.subjectName, "en")),
    },
  };
}
