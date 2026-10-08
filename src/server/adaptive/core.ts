/**
 * Adaptive question selection and study recommendations. Pure core: no DB, no I/O, deterministic for a seed.
 * Satisfies §10 (practice sessions: subject/topic, count, difficulty) and §11 (adaptive engine).
 *
 * ## selectQuestions
 * 1. **Candidates.** The pool (already filtered by the service to PUBLISHED questions the student may see) is
 *    de-duplicated, optionally narrowed to `request.topicIds`, and sorted by id so the result never depends on DB
 *    row order — only on the inputs and the seed.
 * 2. **Topic weights** (§11 "increase practice in that topic"): NEW 1.5 · WEAK 3 · DEVELOPING 2 · COMPETENT 1.25 ·
 *    STRONG 1 · MASTERED 0.5, +1 when the topic's re-test is due, +1 while the student is on a run of misses.
 * 3. **Eligibility tiers.** Tier 0: not seen in the last `recentDays` (7) and allowed. Tier 1: seen recently.
 *    Tier 2 (adaptive mode only): exam-level questions in a topic whose mastery is below 75 (§11 introduces
 *    examination-level questions only once a student performs consistently well).
 * 4. **Allocation.** Question slots are shared across topics proportionally to weight with the Sainte-Laguë method,
 *    capped by each topic's tier-0 supply; only when the whole pool's tier 0 is exhausted are tier 1, then tier 2
 *    questions used ("avoid recently seen questions unless the pool is exhausted").
 * 5. **Within a topic** questions are ranked by distance from the target difficulty, then fewest times seen, then
 *    least recently seen, then a seeded random jitter. Target difficulty: the topic's `currentDifficulty` in adaptive
 *    mode (which the mastery update lowers after consecutive misses and raises after streaks; see
 *    {@link nextDifficulty}); a fixed centre in easy (1–2), medium (3) and hard (4–5) modes. In adaptive mode a
 *    STRONG topic reserves ~25 % of its slots (MASTERED ~40 %, at least one) for exam-level questions.
 * 6. **Warm-up** (adaptive, sessions of 4+): one question (two for 10+) one level below the main topic's target is
 *    placed first, so a session opens with something the student can do.
 * 7. **Order.** Warm-ups, then topics interleaved round-robin (largest allocation first), each topic easiest-first
 *    with exam-level questions last.
 * Every selected item carries reason codes so the UI and analytics can explain the choice.
 *
 * ## recommendationsFor
 * Maps mastery states to next actions following the §11 bullets: repeated errors / WEAK → recommend the lesson
 * ("explain the concept, recommend a lesson"), practise at the (already reduced) difficulty and schedule a re-test;
 * consistent success → stretch practice at the raised difficulty and examination-level practice.
 */
import {
  DEFAULT_MASTERY_CONFIG,
  isRetestDue,
  masteryBand,
  nextDifficulty,
  roundHalfUp,
  toDifficulty,
  type Difficulty,
  type MasteryBand,
  type TopicMasteryState,
} from "@/server/progress/core";

/** Re-exported: the §11 difficulty-stepping rule lives with the mastery state transition in `progress/core`. */
export { nextDifficulty };

// ---------------------------------------------------------------------------------------------------------------
// Seeded randomness (shared by the pure planners: adaptive selection, SRS fuzz, study-plan tie-breaks)
// ---------------------------------------------------------------------------------------------------------------

export type Seed = number | string;
/** Returns a float in [0, 1). */
export type Random = () => number;

/** 32-bit FNV-1a hash of a string seed; integers are used directly (mod 2³²). Throws on non-finite numbers. */
export function hashSeed(seed: Seed): number {
  if (typeof seed === "number") {
    if (!Number.isFinite(seed)) throw new RangeError(`Seed must be finite, received ${String(seed)}`);
    return Math.trunc(seed) >>> 0;
  }
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Deterministic PRNG (mulberry32): small, fast and statistically adequate for tie-breaking and jitter. Not for
 * anything security-related.
 */
export function createRng(seed: Seed): Random {
  let state = hashSeed(seed);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

/** Fisher–Yates shuffle into a new array. */
export function shuffled<T>(items: readonly T[], random: Random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const a = copy[i] as T;
    copy[i] = copy[j] as T;
    copy[j] = a;
  }
  return copy;
}

// ---------------------------------------------------------------------------------------------------------------
// Types and configuration
// ---------------------------------------------------------------------------------------------------------------

export type DifficultyMode = "easy" | "medium" | "hard" | "adaptive";

export interface CandidateQuestion {
  id: string;
  topicId: string;
  /** 1–5; rounded and clamped. */
  difficulty: number;
  marks: number;
  /** Question type (MCQ, STRUCTURED, ...); carried through, not interpreted here. */
  type: string;
  /** When this student last saw the question. */
  lastSeenAt?: Date | null;
  /** How many times this student has seen the question. */
  timesSeen: number;
  isExamLevel: boolean;
}

export interface SelectionRequest {
  count: number;
  difficulty: DifficultyMode;
  /** Restrict to these topics; omitted or empty means every topic in the pool. */
  topicIds?: readonly string[];
}

export interface SelectQuestionsInput {
  pool: readonly CandidateQuestion[];
  /** topicId → mastery state; topics without an entry are NEW. */
  mastery: ReadonlyMap<string, TopicMasteryState>;
  request: SelectionRequest;
  seed: Seed;
  now: Date;
  config?: Partial<AdaptiveConfig>;
}

/** Why a topic was given slots. */
export type TopicReason = "NEW_TOPIC" | "WEAK_TOPIC" | "RETEST_DUE" | "REDUCED_DIFFICULTY" | "INCREASED_DIFFICULTY" | "CONSOLIDATION";

/** Why a specific question was chosen. */
export type QuestionReason =
  | "WARM_UP"
  | "AT_TARGET_DIFFICULTY"
  | "NEAR_TARGET_DIFFICULTY"
  | "REQUESTED_DIFFICULTY"
  | "DIFFICULTY_FALLBACK"
  | "EXAM_LEVEL_STRETCH"
  | "EXAM_LEVEL_FALLBACK"
  | "RECENTLY_SEEN_FALLBACK";

export type SelectionReason = TopicReason | QuestionReason;

export interface SelectedQuestion {
  questionId: string;
  topicId: string;
  difficulty: Difficulty;
  isExamLevel: boolean;
  /** 0-based position in the session. */
  position: number;
  reasons: SelectionReason[];
}

export interface TopicAllocation {
  topicId: string;
  band: MasteryBand | null;
  weight: number;
  targetDifficulty: number;
  allocated: number;
  reasons: TopicReason[];
}

export interface SelectionResult {
  items: SelectedQuestion[];
  /** Requested minus selected (> 0 when the pool is too small). */
  shortfall: number;
  topics: TopicAllocation[];
}

export interface AdaptiveConfig {
  recentDays: number;
  topicWeights: Readonly<Record<MasteryBand | "NEW", number>>;
  retestDueBonus: number;
  strugglingBonus: number;
  /** Consecutive misses that count as "repeatedly wrong" (matches the difficulty step-down streak). */
  strugglingStreak: number;
  /** Consecutive correct answers that count as "consistently performing well". */
  successStreak: number;
  examLevelMinScore: number;
  examLevelShare: Readonly<Record<MasteryBand, number>>;
  warmUpMinCount: number;
  warmUpTwoSlotsFrom: number;
  fixedTargets: Readonly<Record<Exclude<DifficultyMode, "adaptive">, { center: number; min: Difficulty; max: Difficulty }>>;
  initialDifficulty: Difficulty;
  /** Question count suggested by PRACTICE recommendations. */
  practiceCount: number;
  recommendationLimit: number;
}

export const DEFAULT_ADAPTIVE_CONFIG: Readonly<AdaptiveConfig> = Object.freeze<AdaptiveConfig>({
  recentDays: 7,
  topicWeights: { NEW: 1.5, WEAK: 3, DEVELOPING: 2, COMPETENT: 1.25, STRONG: 1, MASTERED: 0.5 },
  retestDueBonus: 1,
  strugglingBonus: 1,
  strugglingStreak: DEFAULT_MASTERY_CONFIG.difficultyDownStreak,
  successStreak: DEFAULT_MASTERY_CONFIG.difficultyUpStreak,
  examLevelMinScore: 75,
  examLevelShare: { WEAK: 0, DEVELOPING: 0, COMPETENT: 0, STRONG: 0.25, MASTERED: 0.4 },
  warmUpMinCount: 4,
  warmUpTwoSlotsFrom: 10,
  fixedTargets: {
    easy: { center: 1.5, min: 1, max: 2 },
    medium: { center: 3, min: 3, max: 3 },
    hard: { center: 4.5, min: 4, max: 5 },
  },
  initialDifficulty: DEFAULT_MASTERY_CONFIG.initialDifficulty,
  practiceCount: 10,
  recommendationLimit: 8,
});

function resolveConfig(overrides?: Partial<AdaptiveConfig>): AdaptiveConfig {
  return overrides ? { ...DEFAULT_ADAPTIVE_CONFIG, ...overrides } : DEFAULT_ADAPTIVE_CONFIG;
}

// ---------------------------------------------------------------------------------------------------------------
// Selection internals
// ---------------------------------------------------------------------------------------------------------------

const MS_PER_DAY = 86_400_000;

interface Candidate {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  isExamLevel: boolean;
  timesSeen: number;
  lastSeenMs: number | null;
  recentlySeen: boolean;
  tier: 0 | 1 | 2;
  jitter: number;
}

interface TopicContext {
  topicId: string;
  state: TopicMasteryState | null;
  band: MasteryBand | null;
  weight: number;
  target: number;
  examReady: boolean;
  reasons: TopicReason[];
  order: number;
  candidates: Candidate[];
}

function compareIds(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Ranking inside a topic: closer to target, fewer exposures, older exposure, then seeded jitter. */
function rankKey(c: Candidate, target: number): [number, number, number, number] {
  // Never-seen sorts first. A finite sentinel (not -Infinity) keeps the subtraction in compareRank well-defined.
  return [Math.abs(c.difficulty - target), c.timesSeen, c.lastSeenMs ?? Number.MIN_SAFE_INTEGER, c.jitter];
}

function compareRank(target: number) {
  return (a: Candidate, b: Candidate): number => {
    const ka = rankKey(a, target);
    const kb = rankKey(b, target);
    for (let i = 0; i < ka.length; i++) {
      const diff = (ka[i] as number) - (kb[i] as number);
      if (diff !== 0) return diff;
    }
    return compareIds(a.id, b.id);
  };
}

/**
 * Sainte-Laguë apportionment of `seats` across topics (proportional to weight), never exceeding `capacity`.
 * Ties go to the earlier topic in `topics` order (which is seeded).
 */
function apportion(seats: number, topics: readonly TopicContext[], capacity: (t: TopicContext) => number, alloc: Map<string, number>): void {
  for (let s = 0; s < seats; s++) {
    let best: TopicContext | null = null;
    let bestQuotient = -1;
    for (const topic of topics) {
      const current = alloc.get(topic.topicId) ?? 0;
      if (current >= capacity(topic)) continue;
      const quotient = topic.weight / (2 * current + 1);
      if (quotient > bestQuotient) {
        best = topic;
        bestQuotient = quotient;
      }
    }
    if (!best) return;
    alloc.set(best.topicId, (alloc.get(best.topicId) ?? 0) + 1);
  }
}

function pickWithinTopic(topic: TopicContext, k: number, mode: DifficultyMode, cfg: AdaptiveConfig): Candidate[] {
  if (k <= 0) return [];
  const byRank = [...topic.candidates].sort((a, b) => a.tier - b.tier || compareRank(topic.target)(a, b));
  if (!(mode === "adaptive" && topic.examReady && topic.band)) return byRank.slice(0, k);

  const share = cfg.examLevelShare[topic.band];
  const freshExam = byRank.filter((c) => c.isExamLevel && c.tier === 0);
  const quota = share > 0 ? Math.min(freshExam.length, k, Math.max(1, Math.round(k * share))) : 0;
  const chosen = freshExam.slice(0, quota);
  const chosenIds = new Set(chosen.map((c) => c.id));
  const rest = byRank.filter((c) => !chosenIds.has(c.id) && !c.isExamLevel);
  const restExam = byRank.filter((c) => !chosenIds.has(c.id) && c.isExamLevel);
  // Fill with non-exam questions first (still in tier order), then any remaining exam-level ones.
  const fill = [...rest, ...restExam].sort((a, b) => a.tier - b.tier || Number(a.isExamLevel) - Number(b.isExamLevel) || compareRank(topic.target)(a, b));
  return [...chosen, ...fill.slice(0, k - chosen.length)];
}

function questionReasons(c: Candidate, topic: TopicContext, mode: DifficultyMode, warmUp: boolean, cfg: AdaptiveConfig): QuestionReason[] {
  const reasons: QuestionReason[] = [];
  if (warmUp) reasons.push("WARM_UP");
  if (mode === "adaptive") {
    const distance = Math.abs(c.difficulty - topic.target);
    if (!warmUp) reasons.push(distance === 0 ? "AT_TARGET_DIFFICULTY" : distance <= 1 ? "NEAR_TARGET_DIFFICULTY" : "DIFFICULTY_FALLBACK");
    if (c.isExamLevel) reasons.push(topic.examReady ? "EXAM_LEVEL_STRETCH" : "EXAM_LEVEL_FALLBACK");
  } else {
    const range = cfg.fixedTargets[mode];
    reasons.push(c.difficulty >= range.min && c.difficulty <= range.max ? "REQUESTED_DIFFICULTY" : "DIFFICULTY_FALLBACK");
  }
  if (c.recentlySeen) reasons.push("RECENTLY_SEEN_FALLBACK");
  return reasons;
}

// ---------------------------------------------------------------------------------------------------------------
// selectQuestions
// ---------------------------------------------------------------------------------------------------------------

/**
 * Builds an ordered practice session (§10) using the adaptive policy described in the module header.
 * Deterministic: the same inputs and seed always give the same selection and order, regardless of pool order.
 */
export function selectQuestions(input: SelectQuestionsInput): SelectionResult {
  const cfg = resolveConfig(input.config);
  const { request } = input;
  const nowMs = input.now.getTime();
  if (!Number.isFinite(nowMs)) throw new RangeError("now must be a valid Date");
  const count = Number.isFinite(request.count) ? Math.max(0, Math.floor(request.count)) : 0;
  const mode = request.difficulty;
  const random = createRng(input.seed);

  // 1. Candidates: dedupe, filter, canonical order.
  const filter = request.topicIds && request.topicIds.length > 0 ? new Set(request.topicIds) : null;
  const unique = new Map<string, CandidateQuestion>();
  for (const q of input.pool) {
    if (filter && !filter.has(q.topicId)) continue;
    if (!unique.has(q.id)) unique.set(q.id, q);
  }
  const questions = [...unique.values()].sort((a, b) => compareIds(a.id, b.id));

  // 2. Topic contexts (seeded order is the tie-breaker everywhere).
  const topicIds = [...new Set(questions.map((q) => q.topicId))].sort(compareIds);
  const topicOrder = shuffled(topicIds, random);
  const topics = new Map<string, TopicContext>();
  topicOrder.forEach((topicId, order) => {
    const state = input.mastery.get(topicId) ?? null;
    const band = state ? masteryBand(state.score) : null;
    const reasons: TopicReason[] = [];
    let weight = cfg.topicWeights[band ?? "NEW"];
    if (!state) reasons.push("NEW_TOPIC");
    else if (band === "WEAK" || band === "DEVELOPING") reasons.push("WEAK_TOPIC");
    else reasons.push("CONSOLIDATION");
    if (state && isRetestDue(state, input.now)) {
      weight += cfg.retestDueBonus;
      reasons.push("RETEST_DUE");
    }
    if (state && state.consecutiveIncorrect >= cfg.strugglingStreak) {
      weight += cfg.strugglingBonus;
      if (mode === "adaptive") reasons.push("REDUCED_DIFFICULTY");
    }
    if (mode === "adaptive" && state && state.consecutiveCorrect >= cfg.successStreak) reasons.push("INCREASED_DIFFICULTY");
    const target = mode === "adaptive" ? (state?.currentDifficulty ?? cfg.initialDifficulty) : cfg.fixedTargets[mode].center;
    const examReady = state !== null && roundHalfUp(Math.min(100, Math.max(0, state.score))) >= cfg.examLevelMinScore;
    topics.set(topicId, { topicId, state, band, weight, target, examReady, reasons, order, candidates: [] });
  });

  // 3. Tiers.
  const recentMs = cfg.recentDays * MS_PER_DAY;
  for (const q of questions) {
    const topic = topics.get(q.topicId);
    if (!topic) continue;
    const lastSeenMs = q.lastSeenAt ? q.lastSeenAt.getTime() : null;
    const recentlySeen = lastSeenMs !== null && Number.isFinite(lastSeenMs) && nowMs - lastSeenMs < recentMs;
    const examBlocked = mode === "adaptive" && q.isExamLevel && !topic.examReady;
    topic.candidates.push({
      id: q.id,
      topicId: q.topicId,
      difficulty: toDifficulty(q.difficulty),
      isExamLevel: q.isExamLevel,
      timesSeen: Math.max(0, Math.floor(q.timesSeen)),
      lastSeenMs: lastSeenMs !== null && Number.isFinite(lastSeenMs) ? lastSeenMs : null,
      recentlySeen,
      tier: examBlocked ? 2 : recentlySeen ? 1 : 0,
      jitter: random(),
    });
  }

  // 4. Apportion slots tier by tier.
  const ordered = [...topics.values()].sort((a, b) => a.order - b.order);
  const alloc = new Map<string, number>();
  for (const maxTier of [0, 1, 2] as const) {
    const taken = [...alloc.values()].reduce((sum, n) => sum + n, 0);
    if (taken >= count) break;
    apportion(count - taken, ordered, (t) => t.candidates.filter((c) => c.tier <= maxTier).length, alloc);
  }

  // 5. Pick within topics.
  const picks = new Map<string, Candidate[]>();
  for (const topic of ordered) picks.set(topic.topicId, pickWithinTopic(topic, alloc.get(topic.topicId) ?? 0, mode, cfg));

  // 6. Warm-up slots (adaptive only).
  const warmUpIds = new Set<string>();
  const warmUpSlots = mode === "adaptive" && count >= cfg.warmUpMinCount ? (count >= cfg.warmUpTwoSlotsFrom ? 2 : 1) : 0;
  const byAllocation = [...ordered].sort((a, b) => (alloc.get(b.topicId) ?? 0) - (alloc.get(a.topicId) ?? 0) || a.order - b.order);
  for (const topic of byAllocation) {
    if (warmUpIds.size >= warmUpSlots) break;
    const chosen = picks.get(topic.topicId) ?? [];
    if (chosen.length < 2 || topic.target <= 1) continue;
    const warmTarget = Math.max(1, Math.ceil(topic.target) - 1);
    const already = chosen.filter((c) => c.difficulty < topic.target && !c.isExamLevel).sort(compareRank(warmTarget))[0];
    if (already) {
      warmUpIds.add(already.id);
      continue;
    }
    const chosenIds = new Set(chosen.map((c) => c.id));
    const replacement = topic.candidates
      .filter((c) => !chosenIds.has(c.id) && c.tier === 0 && !c.isExamLevel && c.difficulty < topic.target)
      .sort(compareRank(warmTarget))[0];
    if (!replacement) continue;
    // Replace the lowest-ranked non-exam pick so the exam-level quota is preserved.
    const ranked = [...chosen].sort((a, b) => a.tier - b.tier || compareRank(topic.target)(a, b));
    const victim = [...ranked].reverse().find((c) => !c.isExamLevel);
    if (!victim) continue;
    picks.set(topic.topicId, chosen.map((c) => (c.id === victim.id ? replacement : c)));
    warmUpIds.add(replacement.id);
  }

  // 7. Order: warm-ups, then round-robin across topics, easiest first within a topic.
  const all = byAllocation.flatMap((t) => picks.get(t.topicId) ?? []);
  const warmUps = all
    .filter((c) => warmUpIds.has(c.id))
    .sort((a, b) => a.difficulty - b.difficulty || (topics.get(a.topicId)?.order ?? 0) - (topics.get(b.topicId)?.order ?? 0));
  const queues = byAllocation.map((t) =>
    (picks.get(t.topicId) ?? [])
      .filter((c) => !warmUpIds.has(c.id))
      .sort((a, b) => Number(a.isExamLevel) - Number(b.isExamLevel) || a.difficulty - b.difficulty || compareRank(t.target)(a, b)),
  );
  const sequence: Candidate[] = [...warmUps];
  for (let round = 0; queues.some((q) => q.length > round); round++) {
    for (const queue of queues) {
      const item = queue[round];
      if (item) sequence.push(item);
    }
  }

  const items: SelectedQuestion[] = sequence.map((c, position) => {
    const topic = topics.get(c.topicId) as TopicContext;
    return {
      questionId: c.id,
      topicId: c.topicId,
      difficulty: c.difficulty,
      isExamLevel: c.isExamLevel,
      position,
      reasons: [...topic.reasons, ...questionReasons(c, topic, mode, warmUpIds.has(c.id), cfg)],
    };
  });

  return {
    items,
    shortfall: count - items.length,
    topics: ordered
      .map((t) => ({
        topicId: t.topicId,
        band: t.band,
        weight: t.weight,
        targetDifficulty: t.target,
        allocated: alloc.get(t.topicId) ?? 0,
        reasons: [...t.reasons],
      }))
      .sort((a, b) => b.allocated - a.allocated || compareIds(a.topicId, b.topicId)),
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Recommendations (§11)
// ---------------------------------------------------------------------------------------------------------------

export interface LessonRef {
  lessonId: string;
  completed: boolean;
}

export type RecommendationReason =
  | "NOT_STARTED"
  | "CONCEPT_GAP"
  | "REPEATED_ERRORS"
  | "WEAK_TOPIC"
  | "BUILD_MASTERY"
  | "COMPLETE_LESSONS"
  | "RETEST_DUE"
  | "RETEST_SCHEDULED"
  | "STRETCH"
  | "EXAM_LEVEL_READY";

interface RecommendationBase {
  reason: RecommendationReason;
  /** Higher first. Bases are fixed per rule; weaker topics get up to +10. */
  priority: number;
}

export type Recommendation =
  | (RecommendationBase & { kind: "STUDY_LESSON"; topicId: string; lessonId: string })
  | (RecommendationBase & { kind: "PRACTICE"; topicId: string; difficulty: Difficulty; count: number })
  | (RecommendationBase & { kind: "RETEST"; topicId: string; dueAt: Date; isDue: boolean })
  | (RecommendationBase & { kind: "EXAM_PRACTICE"; topicIds: string[] });

export interface RecommendationOptions {
  limit?: number;
  config?: Partial<AdaptiveConfig>;
}

/**
 * Next study actions for a student across topics (§11 bullets; feeds the §6 "recommended study session" and the
 * §12 "recommended study" after a mock).
 *
 * | Situation                               | Actions (priority base)                                              |
 * |-----------------------------------------|----------------------------------------------------------------------|
 * | Never practised, has lessons            | STUDY_LESSON first unfinished lesson (40)                            |
 * | Never practised, no lessons             | PRACTICE at the initial difficulty (35)                              |
 * | WEAK or 2+ misses in a row              | STUDY_LESSON next/first lesson (70); RETEST if due (65) else         |
 * |                                         | PRACTICE at reduced difficulty (60) + scheduled RETEST (5)           |
 * | DEVELOPING / COMPETENT                  | RETEST if due (55) else PRACTICE (45 / 35); unfinished lessons (38/30) |
 * | STRONG / MASTERED                       | RETEST if due (30); STRETCH practice after 3+ correct (25);          |
 * |                                         | unfinished lessons (20); exam-ready topics → one EXAM_PRACTICE (42)  |
 *
 * Weaker topics get `(100 − score) / 10` added to the base. Sorted by priority (desc) then topic id, truncated
 * to `limit` (default 8).
 */
export function recommendationsFor(
  masteryStates: ReadonlyMap<string, TopicMasteryState>,
  lessonsByTopic: ReadonlyMap<string, readonly LessonRef[]>,
  now: Date,
  options: RecommendationOptions = {},
): Recommendation[] {
  const cfg = resolveConfig(options.config);
  const limit = Math.max(0, Math.floor(options.limit ?? cfg.recommendationLimit));
  const topicIds = [...new Set([...masteryStates.keys(), ...lessonsByTopic.keys()])].sort(compareIds);
  const out: Recommendation[] = [];
  const examReady: { topicId: string; score: number }[] = [];

  for (const topicId of topicIds) {
    const state = masteryStates.get(topicId);
    const lessons = lessonsByTopic.get(topicId) ?? [];
    const nextLesson = lessons.find((l) => !l.completed);

    if (!state) {
      if (nextLesson) out.push({ kind: "STUDY_LESSON", topicId, lessonId: nextLesson.lessonId, reason: "NOT_STARTED", priority: 40 });
      else out.push({ kind: "PRACTICE", topicId, difficulty: cfg.initialDifficulty, count: cfg.practiceCount, reason: "NOT_STARTED", priority: 35 });
      continue;
    }

    const score = Math.min(100, Math.max(0, state.score));
    const band = masteryBand(score);
    const boost = roundHalfUp((100 - score) / 10, 2);
    const due = isRetestDue(state, now);
    const struggling = state.consecutiveIncorrect >= cfg.strugglingStreak;
    const retest = (reason: RecommendationReason, priority: number): Recommendation => ({
      kind: "RETEST",
      topicId,
      dueAt: new Date(state.nextReviewAt.getTime()),
      isDue: due,
      reason,
      priority,
    });
    const practice = (reason: RecommendationReason, priority: number): Recommendation => ({
      kind: "PRACTICE",
      topicId,
      difficulty: state.currentDifficulty,
      count: cfg.practiceCount,
      reason,
      priority,
    });

    if (band === "WEAK" || struggling) {
      const lesson = nextLesson ?? lessons[0];
      const reason: RecommendationReason = struggling ? "REPEATED_ERRORS" : "CONCEPT_GAP";
      if (lesson) out.push({ kind: "STUDY_LESSON", topicId, lessonId: lesson.lessonId, reason, priority: 70 + boost });
      if (due) out.push(retest("RETEST_DUE", 65 + boost));
      else {
        out.push(practice(struggling ? "REPEATED_ERRORS" : "WEAK_TOPIC", 60 + boost));
        out.push(retest("RETEST_SCHEDULED", 5));
      }
      continue;
    }

    if (band === "DEVELOPING" || band === "COMPETENT") {
      const developing = band === "DEVELOPING";
      out.push(due ? retest("RETEST_DUE", 55 + boost) : practice("BUILD_MASTERY", (developing ? 45 : 35) + boost));
      if (nextLesson) out.push({ kind: "STUDY_LESSON", topicId, lessonId: nextLesson.lessonId, reason: "COMPLETE_LESSONS", priority: (developing ? 38 : 30) + boost });
      continue;
    }

    // STRONG / MASTERED
    if (due) out.push(retest("RETEST_DUE", 30 + boost));
    if (state.consecutiveCorrect >= cfg.successStreak) out.push(practice("STRETCH", 25 + boost));
    if (nextLesson) out.push({ kind: "STUDY_LESSON", topicId, lessonId: nextLesson.lessonId, reason: "COMPLETE_LESSONS", priority: 20 + boost });
    if (roundHalfUp(score) >= cfg.examLevelMinScore) examReady.push({ topicId, score });
  }

  if (examReady.length > 0) {
    out.push({
      kind: "EXAM_PRACTICE",
      topicIds: examReady.sort((a, b) => b.score - a.score || compareIds(a.topicId, b.topicId)).map((t) => t.topicId),
      reason: "EXAM_LEVEL_READY",
      priority: 42,
    });
  }

  const topicKey = (r: Recommendation) => (r.kind === "EXAM_PRACTICE" ? "" : r.topicId);
  return out.sort((a, b) => b.priority - a.priority || compareIds(topicKey(a), topicKey(b))).slice(0, limit);
}
