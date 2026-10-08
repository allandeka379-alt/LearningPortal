/**
 * Topic mastery, difficulty stepping, re-test scheduling and syllabus roll-ups.
 * Pure core: no DB, no I/O, deterministic. Satisfies §11 (mastery bands, "reduce difficulty", "re-test later"),
 * §6/§7 (topics completed/remaining, weakest/strongest, overall progress) and §51 ("progress calculation" tests).
 *
 * ## Mastery bands (§11)
 * WEAK 0–39 · DEVELOPING 40–59 · COMPETENT 60–74 · STRONG 75–89 · MASTERED 90–100 (inclusive integer boundaries).
 * Scores are stored with two decimals; {@link masteryBand} rounds half up to an integer first, so the band always
 * agrees with the whole-number percentage shown in the UI (39.5 is displayed "40%" and is DEVELOPING).
 *
 * ## Mastery update (evidence-weighted exponential moving average)
 * For each answered question with difficulty d (1–5):
 *
 *   p      = marksAwarded / marksAvailable                         (raw fraction, clamped to [0, 1])
 *   p'     = p · (1 − min(0.1·hints, 0.3) − slowPenalty)          (hints cost 10 % each, max 30 %; 10 % when the
 *                                                                   answer took > 2× the expected time)
 *   target = floor_d + p' · (ceiling_d − floor_d)                   (what this answer says about the student, 0–100)
 *   w      = weight_d · (0.5 if self-assessed)                      (harder questions are stronger evidence)
 *   α      = w / (priorEvidence + min(n, window) + w)                (n = attempts so far)
 *   α     ×= streak boost (1 + 0.25 per same-direction attempt beyond the 2nd, max ×2), capped at 0.5
 *   score' = score + α · (target − score),  score₀ = prior (40)
 *   score' = min(score', confidenceCap(n + 1))
 *
 * Why this shape:
 * - **Fast early, stable later.** For the first attempts α ≈ w / (2 + n + w), i.e. a running weighted mean that
 *   starts from a weak neutral prior (40, worth 2 attempts). Once n reaches the window (12) α settles at
 *   w / (14 + w) ≈ 0.05–0.10: an EMA with a memory of roughly the last 12–16 answers, so one slip does not undo
 *   weeks of work (a single miss after a long run keeps a MASTERED topic MASTERED), while 8 straight misses at
 *   medium difficulty take it to WEAK.
 * - **Harder questions count more** twice over: they carry more weight w, and their anchors are higher — a
 *   correct answer at difficulty 1 can only lift the score towards 70 (COMPETENT); MASTERED needs success at
 *   difficulty ≥ 4 (ceilings 96–100). Failing a hard question is less damning than failing an easy one (floors
 *   0 → 25).
 * - **One-sided evidence.** A CORRECT answer never lowers the score (an easy success says nothing against a higher
 *   ability) and an INCORRECT answer never raises it (failing a stretch question says nothing against the current
 *   level). PARTIAL answers move the score either way.
 * - **Streak boost.** Sustained runs in one direction (3+ correct or 3+ incorrect) temporarily raise α so that a
 *   real change in ability (a forgotten topic, a breakthrough) shows within a handful of answers.
 * - **Confidence caps.** However lucky the answers, the score cannot exceed 74 (COMPETENT) before 3 attempts or
 *   89 (STRONG) before 8 attempts: MASTERED is a claim that needs evidence. The capped score is also the prior for
 *   the next update, which deliberately makes the climb into the top bands require sustained success.
 *
 * ## Difficulty stepping (§11 "reduce difficulty initially" / "increase difficulty")
 * Every `difficultyUpStreak` (3) consecutive CORRECT answers at or above the current level step the topic's
 * difficulty up by one; every `difficultyDownStreak` (2) consecutive INCORRECT answers at or below it step it down.
 *
 * ## Re-test scheduling (§11 "re-test the student later")
 * `nextReviewAt` is the start of a local calendar day (student's time zone) after the last practice:
 * WEAK +1 day, DEVELOPING +2, COMPETENT +4, STRONG +7, MASTERED +14; any INCORRECT answer caps it at +1 day.
 */
import { masteryBandFromScore, MASTERY_BAND_MIN_SCORE, type MasteryBand } from "@/lib/mastery-band";
import { DEFAULT_TIMEZONE, addDays, localDateString, startOfLocalDay } from "@/lib/dates";
import { clamp, roundHalfUp } from "@/lib/math";

export type { MasteryBand };
// Re-exported so the server cores (exam scoring, study plans) keep one import site for progress maths.
export { roundHalfUp };

// ---------------------------------------------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------------------------------------------

/** Question difficulty on the platform's 1 (easiest) … 5 (hardest) scale (§9 metadata). */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export const DIFFICULTIES: readonly Difficulty[] = [1, 2, 3, 4, 5];

/** Clamps and rounds any finite number onto the 1–5 difficulty scale. Throws on non-finite input. */
export function toDifficulty(value: number): Difficulty {
  if (!Number.isFinite(value)) throw new RangeError(`Difficulty must be finite, received ${String(value)}`);
  return Math.min(5, Math.max(1, Math.round(value))) as Difficulty;
}

/**
 * §11 band for a 0–100 score: rounds half up to an integer first (39.5 → 40 → DEVELOPING), then applies the
 * inclusive band boundaries. Out-of-range scores are clamped; non-finite input throws.
 *
 * An alias of `masteryBandFromScore` from `@/lib/mastery-band`, the isomorphic single source of truth also used by
 * the UI (`MasteryBadge`, `MasteryBar`), so server decisions and displayed bands can never disagree.
 */
export const masteryBand: (score: number) => MasteryBand = masteryBandFromScore;

// ---------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------

/** One marked answer in a topic, adapted from a practice/exam attempt row by the service layer. */
export interface AttemptOutcome {
  marksAwarded: number;
  /** Must be > 0. */
  marksAvailable: number;
  /** 1–5; rounded and clamped. */
  difficulty: number;
  answeredAt: Date;
  /** Number of tutor/question hints revealed before answering. */
  hintsUsed: number;
  timeSpentSeconds?: number | null;
  /** The question's estimated time (§9 metadata). */
  expectedSeconds?: number | null;
  /** Self-marked open answers (no AI configured) count half (ARCHITECTURE §6.5). */
  selfAssessed?: boolean;
}

/** CORRECT: ≥ 80 % of marks with at most one hint. INCORRECT: < 50 % of marks. Otherwise PARTIAL. */
export type OutcomeResult = "CORRECT" | "PARTIAL" | "INCORRECT";

/** Per-student, per-topic mastery state (persisted as a TopicMastery row by the service layer). */
export interface TopicMasteryState {
  /** 0–100, two decimals. */
  score: number;
  /** Number of answers that have contributed to the score. */
  evidenceCount: number;
  /** Exponentially weighted raw accuracy (0–1, three decimals) over roughly the last 10 answers. */
  recentAccuracy: number;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  /** Difficulty the adaptive engine should target next for this topic. */
  currentDifficulty: Difficulty;
  lastPracticedAt: Date;
  /** When the topic should be re-tested (start of a local day). */
  nextReviewAt: Date;
}

export interface DifficultyAnchor {
  /** Target score for a completely wrong answer at this difficulty. */
  floor: number;
  /** Target score for a fully correct, unaided answer at this difficulty. */
  ceiling: number;
}

export interface MasteryConfig {
  /** Neutral prior the first answer is blended with (bottom of DEVELOPING). */
  priorScore: number;
  /** How many attempts' worth of weight the prior carries. */
  priorEvidence: number;
  /** Attempts after which the learning rate stops shrinking (EMA memory). */
  evidenceWindow: number;
  difficultyWeight: Readonly<Record<Difficulty, number>>;
  difficultyAnchors: Readonly<Record<Difficulty, DifficultyAnchor>>;
  hintPenaltyPerHint: number;
  maxHintPenalty: number;
  /** An answer slower than `slowAnswerRatio` × expected time is penalised by `slowAnswerPenalty`. */
  slowAnswerRatio: number;
  slowAnswerPenalty: number;
  selfAssessedWeight: number;
  /** Learning-rate boost per same-direction answer beyond `streakBoostFrom − 1`. */
  streakBoostPerAttempt: number;
  streakBoostFrom: number;
  maxStreakBoost: number;
  maxLearningRate: number;
  /** Score ceilings while evidence is thin; first matching row (ascending `belowEvidence`) applies. */
  confidenceCaps: readonly { belowEvidence: number; maxScore: number }[];
  /** Floor of the accuracy EWMA rate (0.2 ≈ last 10 answers). */
  accuracyMinAlpha: number;
  correctThreshold: number;
  incorrectThreshold: number;
  maxHintsForCorrect: number;
  initialDifficulty: Difficulty;
  difficultyUpStreak: number;
  difficultyDownStreak: number;
  retestIntervalDays: Readonly<Record<MasteryBand, number>>;
  retestAfterIncorrectDays: number;
  /** Student's IANA time zone for re-test day boundaries. */
  timeZone: string;
}

export const DEFAULT_MASTERY_CONFIG: Readonly<MasteryConfig> = Object.freeze({
  priorScore: 40,
  priorEvidence: 2,
  evidenceWindow: 12,
  difficultyWeight: { 1: 0.8, 2: 1.0, 3: 1.2, 4: 1.4, 5: 1.6 },
  difficultyAnchors: {
    1: { floor: 0, ceiling: 70 },
    2: { floor: 0, ceiling: 80 },
    3: { floor: 5, ceiling: 88 },
    4: { floor: 15, ceiling: 96 },
    5: { floor: 25, ceiling: 100 },
  },
  hintPenaltyPerHint: 0.1,
  maxHintPenalty: 0.3,
  slowAnswerRatio: 2,
  slowAnswerPenalty: 0.1,
  selfAssessedWeight: 0.5,
  streakBoostPerAttempt: 0.25,
  streakBoostFrom: 3,
  maxStreakBoost: 2,
  maxLearningRate: 0.5,
  confidenceCaps: [
    { belowEvidence: 3, maxScore: 74 },
    { belowEvidence: 8, maxScore: 89 },
  ],
  accuracyMinAlpha: 0.2,
  correctThreshold: 0.8,
  incorrectThreshold: 0.5,
  maxHintsForCorrect: 1,
  initialDifficulty: 2,
  difficultyUpStreak: 3,
  difficultyDownStreak: 2,
  retestIntervalDays: { WEAK: 1, DEVELOPING: 2, COMPETENT: 4, STRONG: 7, MASTERED: 14 },
  retestAfterIncorrectDays: 1,
  timeZone: DEFAULT_TIMEZONE,
});

function resolveConfig(overrides?: Partial<MasteryConfig>): MasteryConfig {
  return overrides ? { ...DEFAULT_MASTERY_CONFIG, ...overrides } : DEFAULT_MASTERY_CONFIG;
}

// ---------------------------------------------------------------------------------------------------------------
// Outcome classification and difficulty stepping
// ---------------------------------------------------------------------------------------------------------------

function markFraction(outcome: Pick<AttemptOutcome, "marksAwarded" | "marksAvailable">): number {
  if (!Number.isFinite(outcome.marksAvailable) || outcome.marksAvailable <= 0) {
    throw new RangeError(`marksAvailable must be a positive number, received ${String(outcome.marksAvailable)}`);
  }
  if (!Number.isFinite(outcome.marksAwarded)) {
    throw new RangeError(`marksAwarded must be finite, received ${String(outcome.marksAwarded)}`);
  }
  return clamp(outcome.marksAwarded / outcome.marksAvailable, 0, 1);
}

function hintCount(hintsUsed: number): number {
  return Number.isFinite(hintsUsed) ? Math.max(0, Math.floor(hintsUsed)) : 0;
}

/** Classifies one answer as CORRECT / PARTIAL / INCORRECT (thresholds documented on {@link OutcomeResult}). */
export function classifyOutcome(
  outcome: Pick<AttemptOutcome, "marksAwarded" | "marksAvailable" | "hintsUsed">,
  config?: Partial<MasteryConfig>,
): OutcomeResult {
  const cfg = resolveConfig(config);
  const p = markFraction(outcome);
  if (p < cfg.incorrectThreshold) return "INCORRECT";
  if (p >= cfg.correctThreshold && hintCount(outcome.hintsUsed) <= cfg.maxHintsForCorrect) return "CORRECT";
  return "PARTIAL";
}

/** Streak counters and current level, as they stand AFTER the last outcome has been counted. */
export interface DifficultyContext {
  currentDifficulty: Difficulty;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
}

/**
 * Next target difficulty for a topic (§11).
 *
 * `state` must already include `lastOutcome` in its streak counters (this is how {@link updateTopicMastery} calls
 * it). Rules:
 * - Up one level each time the correct streak reaches a multiple of `difficultyUpStreak` (3), provided the last
 *   question was at or above the current level (warm-up successes do not promote).
 * - Down one level each time the incorrect streak reaches a multiple of `difficultyDownStreak` (2), provided the last
 *   question was at or below the current level (failing a stretch question does not demote).
 * - Otherwise unchanged; always within 1–5. Using multiples (not resets) keeps the counters honest for
 *   recommendations while still requiring a fresh run of evidence for every further step.
 */
export function nextDifficulty(
  state: DifficultyContext,
  lastOutcome: { result: OutcomeResult; difficulty: number },
  config?: Partial<MasteryConfig>,
): Difficulty {
  const cfg = resolveConfig(config);
  const current = state.currentDifficulty;
  const answered = toDifficulty(lastOutcome.difficulty);
  if (
    lastOutcome.result === "CORRECT" &&
    state.consecutiveCorrect > 0 &&
    state.consecutiveCorrect % cfg.difficultyUpStreak === 0 &&
    answered >= current
  ) {
    return toDifficulty(current + 1);
  }
  if (
    lastOutcome.result === "INCORRECT" &&
    state.consecutiveIncorrect > 0 &&
    state.consecutiveIncorrect % cfg.difficultyDownStreak === 0 &&
    answered <= current
  ) {
    return toDifficulty(current - 1);
  }
  return current;
}

// ---------------------------------------------------------------------------------------------------------------
// Mastery update
// ---------------------------------------------------------------------------------------------------------------

function confidenceCap(evidenceCount: number, cfg: MasteryConfig): number {
  const caps = [...cfg.confidenceCaps].sort((a, b) => a.belowEvidence - b.belowEvidence);
  for (const cap of caps) if (evidenceCount < cap.belowEvidence) return cap.maxScore;
  return 100;
}

function performancePenalty(outcome: AttemptOutcome, cfg: MasteryConfig): number {
  let penalty = Math.min(hintCount(outcome.hintsUsed) * cfg.hintPenaltyPerHint, cfg.maxHintPenalty);
  const spent = outcome.timeSpentSeconds;
  const expected = outcome.expectedSeconds;
  if (
    spent != null &&
    expected != null &&
    Number.isFinite(spent) &&
    Number.isFinite(expected) &&
    expected > 0 &&
    spent > expected * cfg.slowAnswerRatio
  ) {
    penalty += cfg.slowAnswerPenalty;
  }
  return clamp(penalty, 0, 1);
}

/** The re-test instant for a topic: start of the local day `interval` days after `practicedAt` (see header). */
export function retestDueAt(
  score: number,
  lastResult: OutcomeResult,
  practicedAt: Date,
  config?: Partial<MasteryConfig>,
): Date {
  const cfg = resolveConfig(config);
  let days = cfg.retestIntervalDays[masteryBand(score)];
  if (lastResult === "INCORRECT") days = Math.min(days, cfg.retestAfterIncorrectDays);
  const day = localDateString(practicedAt, cfg.timeZone);
  return startOfLocalDay(addDays(day, Math.max(1, Math.round(days))), cfg.timeZone);
}

/**
 * Folds one marked answer into a topic's mastery state (see the header for the maths). `prev = null` means the
 * student has never answered a question in this topic.
 *
 * Replaying a student's attempts in `answeredAt` order reproduces the same state, which the nightly reconcile job
 * relies on. Outcomes that arrive out of order (offline sync) are still folded in; `lastPracticedAt` keeps the
 * latest instant. Throws `RangeError` on structurally invalid input (non-positive `marksAvailable`, invalid date).
 */
export function updateTopicMastery(
  prev: TopicMasteryState | null,
  outcome: AttemptOutcome,
  config?: Partial<MasteryConfig>,
): TopicMasteryState {
  const cfg = resolveConfig(config);
  if (!(outcome.answeredAt instanceof Date) || Number.isNaN(outcome.answeredAt.getTime())) {
    throw new RangeError("answeredAt must be a valid Date");
  }
  const difficulty = toDifficulty(outcome.difficulty);
  const p = markFraction(outcome);
  const result = classifyOutcome(outcome, cfg);

  const consecutiveCorrect = result === "CORRECT" ? (prev?.consecutiveCorrect ?? 0) + 1 : 0;
  const consecutiveIncorrect = result === "INCORRECT" ? (prev?.consecutiveIncorrect ?? 0) + 1 : 0;

  // --- score ---
  const n = prev?.evidenceCount ?? 0;
  const prevScore = prev?.score ?? cfg.priorScore;
  const anchor = cfg.difficultyAnchors[difficulty];
  const adjusted = p * (1 - performancePenalty(outcome, cfg));
  const target = anchor.floor + adjusted * (anchor.ceiling - anchor.floor);

  const weight = cfg.difficultyWeight[difficulty] * (outcome.selfAssessed ? cfg.selfAssessedWeight : 1);
  let alpha = weight / (cfg.priorEvidence + Math.min(n, cfg.evidenceWindow) + weight);
  const streak = Math.max(consecutiveCorrect, consecutiveIncorrect);
  if (streak >= cfg.streakBoostFrom) {
    alpha *= Math.min(cfg.maxStreakBoost, 1 + cfg.streakBoostPerAttempt * (streak - cfg.streakBoostFrom + 1));
  }
  alpha = Math.min(alpha, cfg.maxLearningRate);

  const oneSidedNoChange = (result === "CORRECT" && target < prevScore) || (result === "INCORRECT" && target > prevScore);
  const raw = oneSidedNoChange ? prevScore : prevScore + alpha * (target - prevScore);
  const evidenceCount = n + 1;
  const score = roundHalfUp(clamp(Math.min(raw, confidenceCap(evidenceCount, cfg)), 0, 100), 2);

  // --- accuracy EWMA (raw marks, no penalties) ---
  const accuracyAlpha = Math.max(1 / evidenceCount, cfg.accuracyMinAlpha);
  const prevAccuracy = prev?.recentAccuracy ?? p;
  const recentAccuracy = roundHalfUp(clamp(prevAccuracy + accuracyAlpha * (p - prevAccuracy), 0, 1), 3);

  // --- difficulty ---
  const currentDifficulty = nextDifficulty(
    { currentDifficulty: prev?.currentDifficulty ?? cfg.initialDifficulty, consecutiveCorrect, consecutiveIncorrect },
    { result, difficulty },
    cfg,
  );

  // --- timing ---
  const lastPracticedAt =
    prev && prev.lastPracticedAt.getTime() > outcome.answeredAt.getTime() ? prev.lastPracticedAt : outcome.answeredAt;

  return {
    score,
    evidenceCount,
    recentAccuracy,
    consecutiveCorrect,
    consecutiveIncorrect,
    currentDifficulty,
    lastPracticedAt: new Date(lastPracticedAt.getTime()),
    nextReviewAt: retestDueAt(score, result, lastPracticedAt, cfg),
  };
}

/** True when the topic's re-test is due at `now`. */
export function isRetestDue(state: Pick<TopicMasteryState, "nextReviewAt">, now: Date): boolean {
  return state.nextReviewAt.getTime() <= now.getTime();
}

// ---------------------------------------------------------------------------------------------------------------
// Syllabus roll-ups (§6, §7)
// ---------------------------------------------------------------------------------------------------------------

export interface TopicProgressInput {
  id: string;
  /** Current mastery score, or null when the topic has never been assessed. */
  mastery: number | null;
  lessonsCompleted: number;
  /** Published lessons in the topic (0 is allowed: some topics are practice-only). */
  lessonsTotal: number;
}

export interface TopicSummary {
  id: string;
  mastery: number;
  band: MasteryBand;
}

export interface SyllabusProgress {
  totalTopics: number;
  /** Topics meeting {@link isTopicCompleted}. */
  completedTopics: number;
  remainingTopics: number;
  /** Topics with any lesson completed or any mastery evidence. */
  startedTopics: number;
  /** Topics with a mastery score. */
  assessedTopics: number;
  /** completedTopics / totalTopics × 100, one decimal; null when the syllabus has no topics. */
  coveragePercent: number | null;
  lessonsCompleted: number;
  lessonsTotal: number;
  /** Mean mastery over ASSESSED topics only (one decimal); null when nothing has been assessed. */
  averageMastery: number | null;
  /** Up to `listSize` assessed topics below COMPETENT (< 60), weakest first. */
  weakest: TopicSummary[];
  /** Up to `listSize` assessed topics at STRONG or above (≥ 75), strongest first. */
  strongest: TopicSummary[];
}

export interface ProgressOptions {
  /** Maximum length of `weakest` / `strongest` (default 3). */
  listSize?: number;
}

const COMPETENT_MIN = MASTERY_BAND_MIN_SCORE.COMPETENT;
const STRONG_MIN = MASTERY_BAND_MIN_SCORE.STRONG;

function lessonCounts(topic: TopicProgressInput): { completed: number; total: number } {
  const total = Math.max(0, Math.floor(topic.lessonsTotal));
  const completed = clamp(Math.floor(topic.lessonsCompleted), 0, total);
  return { completed, total };
}

/**
 * Definition of a "completed" topic (§6 "topics completed / remaining"):
 * - every published lesson completed AND mastery ≥ 60 (COMPETENT), or
 * - mastery ≥ 75 (STRONG) regardless of lessons (the student demonstrably knows it; lessons are a means, not an end).
 * A topic with no mastery evidence is never complete, even when all its lessons are read. Mastery is compared after
 * rounding half up, consistent with {@link masteryBand}.
 */
export function isTopicCompleted(topic: TopicProgressInput): boolean {
  if (topic.mastery === null) return false;
  const mastery = roundHalfUp(clamp(topic.mastery, 0, 100));
  if (mastery >= STRONG_MIN) return true;
  const { completed, total } = lessonCounts(topic);
  return completed >= total && mastery >= COMPETENT_MIN;
}

function summarise(topic: TopicProgressInput & { mastery: number }): TopicSummary {
  return { id: topic.id, mastery: topic.mastery, band: masteryBand(topic.mastery) };
}

/**
 * Syllabus progress for one subject's topics (§7 "syllabus progress", "weakest / strongest topics").
 * Pure aggregation: no invented values — anything without evidence is `null` or excluded (CLAUDE.md rule 6).
 */
export function syllabusProgress(input: { topics: readonly TopicProgressInput[] }, options: ProgressOptions = {}): SyllabusProgress {
  const listSize = Math.max(0, Math.floor(options.listSize ?? 3));
  const topics = input.topics;
  let completedTopics = 0;
  let startedTopics = 0;
  let lessonsCompleted = 0;
  let lessonsTotal = 0;
  const assessed: (TopicProgressInput & { mastery: number })[] = [];

  for (const topic of topics) {
    if (topic.mastery !== null && !Number.isFinite(topic.mastery)) {
      throw new RangeError(`Topic ${topic.id} has a non-finite mastery score`);
    }
    const lessons = lessonCounts(topic);
    lessonsCompleted += lessons.completed;
    lessonsTotal += lessons.total;
    if (isTopicCompleted(topic)) completedTopics += 1;
    if (topic.mastery !== null) assessed.push({ ...topic, mastery: clamp(topic.mastery, 0, 100) });
    if (topic.mastery !== null || lessons.completed > 0) startedTopics += 1;
  }

  const byScoreThenId = (a: { mastery: number; id: string }, b: { mastery: number; id: string }) =>
    a.mastery - b.mastery || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const ascending = [...assessed].sort(byScoreThenId);
  const weakest = ascending.filter((t) => roundHalfUp(t.mastery) < COMPETENT_MIN).slice(0, listSize).map(summarise);
  const strongest = ascending
    .filter((t) => roundHalfUp(t.mastery) >= STRONG_MIN)
    .sort((a, b) => b.mastery - a.mastery || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    .slice(0, listSize)
    .map(summarise);

  const masterySum = assessed.reduce((sum, t) => sum + t.mastery, 0);
  return {
    totalTopics: topics.length,
    completedTopics,
    remainingTopics: topics.length - completedTopics,
    startedTopics,
    assessedTopics: assessed.length,
    coveragePercent: topics.length === 0 ? null : roundHalfUp((completedTopics / topics.length) * 100, 1),
    lessonsCompleted,
    lessonsTotal,
    averageMastery: assessed.length === 0 ? null : roundHalfUp(masterySum / assessed.length, 1),
    weakest,
    strongest,
  };
}

export interface SubjectProgressInput {
  subjectId: string;
  topics: readonly TopicProgressInput[];
}

export interface OverallProgress {
  bySubject: (SyllabusProgress & { subjectId: string })[];
  totalTopics: number;
  completedTopics: number;
  remainingTopics: number;
  assessedTopics: number;
  /** Σ completed / Σ topics across subjects (each topic weighs the same, so big syllabi weigh more). */
  coveragePercent: number | null;
  /** Mean over every assessed topic across subjects (topic-count weighted); null when nothing assessed. */
  averageMastery: number | null;
}

/**
 * Overall progress across a student's enrolled subjects (§6 "overall progress"), weighted by topic count: a subject
 * with 40 topics moves the overall figure more than one with 10. Computed from the raw topics, not from rounded
 * per-subject percentages, so there is no compounding rounding error.
 */
export function overallProgress(subjects: readonly SubjectProgressInput[], options: ProgressOptions = {}): OverallProgress {
  const bySubject = subjects.map((s) => ({ subjectId: s.subjectId, ...syllabusProgress({ topics: s.topics }, options) }));
  let totalTopics = 0;
  let completedTopics = 0;
  let assessedTopics = 0;
  let masterySum = 0;
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      totalTopics += 1;
      if (isTopicCompleted(topic)) completedTopics += 1;
      if (topic.mastery !== null) {
        assessedTopics += 1;
        masterySum += clamp(topic.mastery, 0, 100);
      }
    }
  }
  return {
    bySubject,
    totalTopics,
    completedTopics,
    remainingTopics: totalTopics - completedTopics,
    assessedTopics,
    coveragePercent: totalTopics === 0 ? null : roundHalfUp((completedTopics / totalTopics) * 100, 1),
    averageMastery: assessedTopics === 0 ? null : roundHalfUp(masterySum / assessedTopics, 1),
  };
}
