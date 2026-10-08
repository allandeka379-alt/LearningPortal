/**
 * Daily-question scheduling rules (§46 daily question, §30 WhatsApp "today's question"). PURE: no database, no I/O, so
 * the nightly `dailyQuestion.fill` job, the admin calendar and the unit tests share one definition of "a good pick".
 *
 * The automatic pool for a scope (one subject of a qualification, or a whole qualification) is every question that is
 *   - PUBLISHED, a root question (no structured-question parts) of the PLATFORM bank (never a school / tutor question:
 *     the DailyQuestion tenant guard refuses those anyway),
 *   - free to see: access tier PUBLIC or FREE (the public /daily page never shows PREMIUM questions, §44),
 *   - auto-marked and short: {@link DAILY_QUESTION_TYPES} with marking mode AUTO (instant feedback on the web and on
 *     WhatsApp; the same rule the question editor enforces before `isDailyEligible` can be ticked),
 *   - flagged `isDailyEligible` by an editor (the schema's opt-in "renders on WhatsApp" contract and the partial index
 *     `Question_daily_pool_idx`),
 *   - of difficulty {@link DAILY_DIFFICULTY_MIN}–{@link DAILY_DIFFICULTY_MAX} (approachable, not trivial),
 *   - not scheduled in the same qualification within {@link DAILY_REUSE_WINDOW_DAYS} days either side of the date.
 *
 * Among those, {@link chooseDailyQuestion} prefers the question whose TOPIC (root of the syllabus topic tree) was used
 * longest ago, so consecutive days rotate through the syllabus, and breaks ties with a stable hash of
 * (scope, date, question) — deterministic for a given pool, so a retried job picks the same question.
 *
 * An editor's override (admin calendar) only needs the hard rules (published, platform, root, free, auto-marked
 * type): the flag, the difficulty band and the reuse window are guidance for automatic picks, shown to the editor.
 */
import type { ContentAccessTier, QuestionType } from "@/generated/prisma/enums";
import { daysBetween, type LocalDate } from "@/lib/dates";

/** Auto-marked types short enough for the daily question (mirrors the question editor's `isDailyEligible` rule). */
export const DAILY_QUESTION_TYPES: readonly QuestionType[] = ["MULTIPLE_CHOICE", "TRUE_FALSE", "NUMERICAL", "SHORT_ANSWER"];

/** Tiers the daily question may use: it is a free acquisition feature shown on the public site. */
export const DAILY_ACCESS_TIERS: readonly ContentAccessTier[] = ["PUBLIC", "FREE"];

export const DAILY_DIFFICULTY_MIN = 2;
export const DAILY_DIFFICULTY_MAX = 3;

/** A question is not picked automatically again within this many days (before or after) in the same qualification. */
export const DAILY_REUSE_WINDOW_DAYS = 60;

/** Days the admin calendar shows (today first). */
export const DAILY_CALENDAR_DAYS = 14;

/** How far ahead an editor may schedule a day by hand. */
export const DAILY_SCHEDULE_HORIZON_DAYS = 90;

/** A candidate question: id, difficulty and the ROOT topic ids it is tagged to (variety key). */
export interface DailyCandidate {
  id: string;
  difficulty: number;
  topicKeys: readonly string[];
}

/** A day already scheduled in the same qualification (any scope), with its question's root topic ids. */
export interface DailyHistoryEntry {
  date: LocalDate;
  questionId: string;
  topicKeys: readonly string[];
}

export interface ChooseDailyQuestionInput {
  /** The day being filled. */
  date: LocalDate;
  /** Stable scope identifier (e.g. `subject:<id>`), part of the tie-break seed. */
  scopeKey: string;
  candidates: readonly DailyCandidate[];
  /** Scheduled days of the qualification around `date` (both directions); other dates' rows only matter within the window. */
  history: readonly DailyHistoryEntry[];
}

/** True for difficulties inside the automatic band. */
export function isDailyDifficulty(difficulty: number): boolean {
  return Number.isInteger(difficulty) && difficulty >= DAILY_DIFFICULTY_MIN && difficulty <= DAILY_DIFFICULTY_MAX;
}

/** True when `questionId` is scheduled within the reuse window around `date` (the same day included). */
export function isRecentlyScheduled(questionId: string, date: LocalDate, history: readonly DailyHistoryEntry[]): boolean {
  return history.some((entry) => entry.questionId === questionId && Math.abs(daysBetween(entry.date, date)) <= DAILY_REUSE_WINDOW_DAYS);
}

/** Question ids the reuse window excludes for `date` (for the database query). */
export function excludedQuestionIds(date: LocalDate, history: readonly DailyHistoryEntry[]): string[] {
  const ids = new Set<string>();
  for (const entry of history) if (Math.abs(daysBetween(entry.date, date)) <= DAILY_REUSE_WINDOW_DAYS) ids.add(entry.questionId);
  return [...ids];
}

/**
 * Days between `date` and the nearest OTHER scheduled day that used one of the candidate's topics (either direction);
 * `Infinity` when none of its topics is scheduled (or it has no topic tags). Bigger is better.
 */
export function topicDistance(candidate: Pick<DailyCandidate, "topicKeys">, date: LocalDate, history: readonly DailyHistoryEntry[]): number {
  if (candidate.topicKeys.length === 0) return Number.POSITIVE_INFINITY;
  const keys = new Set(candidate.topicKeys);
  let nearest = Number.POSITIVE_INFINITY;
  for (const entry of history) {
    if (!entry.topicKeys.some((key) => keys.has(key))) continue;
    const distance = Math.abs(daysBetween(entry.date, date));
    if (distance < nearest) nearest = distance;
  }
  return nearest;
}

/** 32-bit FNV-1a hash (stable across processes and releases): the deterministic tie-break. */
export function stableHash(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/**
 * Picks the question for one scope and day, or `null` when the pool is exhausted (every candidate is outside the
 * difficulty band or scheduled within the reuse window). See the module header for the ranking.
 */
export function chooseDailyQuestion(input: ChooseDailyQuestionInput): DailyCandidate | null {
  let best: DailyCandidate | null = null;
  let bestDistance = -1;
  let bestHash = 0;
  for (const candidate of input.candidates) {
    if (!isDailyDifficulty(candidate.difficulty)) continue;
    if (isRecentlyScheduled(candidate.id, input.date, input.history)) continue;
    const distance = topicDistance(candidate, input.date, input.history);
    const hash = stableHash(`${input.scopeKey}|${input.date}|${candidate.id}`);
    if (best === null || distance > bestDistance || (distance === bestDistance && (hash < bestHash || (hash === bestHash && candidate.id < best.id)))) {
      best = candidate;
      bestDistance = distance;
      bestHash = hash;
    }
  }
  return best;
}

/** Root topic id of a materialised topic path (`"<root>/<child>/…"`). */
export function rootTopicKey(path: string): string | null {
  const root = path.split("/")[0]?.trim();
  return root ? root : null;
}

/** Scope key used in seeds, logs and URLs: `subject:<id>` or `qualification:<id>` (mixed subjects). */
export function dailyScopeKey(scope: { qualificationId: string; subjectId: string | null }): string {
  return scope.subjectId ? `subject:${scope.subjectId}` : `qualification:${scope.qualificationId}`;
}
