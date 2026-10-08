/**
 * Flashcard spaced-repetition scheduler (§18: Again / Hard / Good / Easy, automatic review scheduling).
 * Pure core: no DB, no I/O; deterministic given `now` and the fuzz seed.
 *
 * An Anki-style SM-2 variant (close to Anki's v2/v3 "SM-2" scheduler):
 *
 * **Phases.** NEW → LEARNING (short steps, minutes) → REVIEW (intervals in days) ⇄ RELEARNING (after a lapse).
 *
 * **(Re)learning steps** (default learning 1 min, 10 min; relearning 10 min):
 * - AGAIN: back to the first step.
 * - HARD: repeat the current step; on the first step the delay is the average of the first two steps (or 1.5× a
 *   single step, at most one day longer).
 * - GOOD: next step; after the last step the card graduates.
 * - EASY: graduates immediately.
 * Graduating from LEARNING gives 1 day (GOOD) or 4 days (EASY). Graduating from RELEARNING restores the post-lapse
 * interval (EASY: +1 day). Ease does not change while (re)learning.
 *
 * **Review** (interval I days, ease E, days overdue D):
 * - HARD: I' = max(I + 1, (I + D/4) × 1.2);                 E −= 0.15
 * - GOOD: I' = max(I_hard + 1, (I + D/2) × E);              E unchanged
 * - EASY: I' = max(I_good + 1, (I + D) × E × 1.3);          E += 0.15
 * - AGAIN (lapse): lapses + 1, E −= 0.20, post-lapse interval max(1, I × 0) = 1 day, enters RELEARNING.
 *   Ease never drops below 1.3. Intervals use the ease *before* this answer's adjustment. Overdue days count in the
 *   student's favour (they remembered for longer than scheduled); early reviews are scheduled as if on time.
 *
 * **Fuzz.** Review intervals of 3+ days get a small seeded random spread (±15 % under a week, ±10 % under 20 days,
 * ±5 % beyond, at least ±1 day) so cards learnt together do not stay clumped on the same future day. Pass a
 * per-card seed (e.g. `${cardId}:${reps}`) so cards reviewed in one batch spread differently.
 *
 * **Caps and leeches.** Intervals never exceed `maxIntervalDays` (365 by default: exam preparation horizons are
 * short). A card with 8+ lapses is flagged as a leech so the UI can suggest rewriting or studying the lesson.
 *
 * **Day alignment.** Review due dates are the start of a local calendar day in the student's time zone
 * (ARCHITECTURE §3.12), so "due in 4 days" means "available from midnight on that day", and day counts are
 * calendar days, not 24-hour periods. Learning steps are exact minutes.
 */
import { DEFAULT_TIMEZONE, addDays, daysBetween, localDateString, startOfLocalDay } from "@/lib/dates";
import { createRng, type Seed } from "@/server/adaptive/core";

export const RATINGS = ["AGAIN", "HARD", "GOOD", "EASY"] as const;
export type Rating = (typeof RATINGS)[number];

export const CARD_PHASES = ["NEW", "LEARNING", "REVIEW", "RELEARNING"] as const;
export type CardPhase = (typeof CARD_PHASES)[number];

/** Per-student, per-card scheduling state (persisted as FlashcardState by the service layer). */
export interface CardState {
  phase: CardPhase;
  /** Index of the current (re)learning step; 0 in NEW and REVIEW. */
  step: number;
  easeFactor: number;
  /** Current review interval in whole days; 0 until the first graduation; the post-lapse interval while relearning. */
  intervalDays: number;
  /** null for NEW cards (introduced by the daily new-card limit, not by a due date). */
  dueAt: Date | null;
  lastReviewedAt: Date | null;
  /** Number of answers given (all ratings). */
  reps: number;
  /** Number of times a REVIEW card was forgotten (AGAIN). */
  lapses: number;
}

export interface SrsConfig {
  learningStepsMinutes: readonly number[];
  relearningStepsMinutes: readonly number[];
  graduatingIntervalDays: number;
  easyIntervalDays: number;
  startingEase: number;
  minEase: number;
  hardMultiplier: number;
  easyBonus: number;
  /** Global multiplier on review intervals (1 = SM-2 defaults). */
  intervalModifier: number;
  /** Post-lapse interval = max(minLapseIntervalDays, round(I × lapseIntervalMultiplier)). */
  lapseIntervalMultiplier: number;
  minLapseIntervalDays: number;
  maxIntervalDays: number;
  againEasePenalty: number;
  hardEasePenalty: number;
  easyEaseBonus: number;
  leechThreshold: number;
  fuzz: boolean;
  timeZone: string;
}

export const DEFAULT_SRS_CONFIG: Readonly<SrsConfig> = Object.freeze({
  learningStepsMinutes: [1, 10],
  relearningStepsMinutes: [10],
  graduatingIntervalDays: 1,
  easyIntervalDays: 4,
  startingEase: 2.5,
  minEase: 1.3,
  hardMultiplier: 1.2,
  easyBonus: 1.3,
  intervalModifier: 1,
  lapseIntervalMultiplier: 0,
  minLapseIntervalDays: 1,
  maxIntervalDays: 365,
  againEasePenalty: 0.2,
  hardEasePenalty: 0.15,
  easyEaseBonus: 0.15,
  leechThreshold: 8,
  fuzz: true,
  timeZone: DEFAULT_TIMEZONE,
});

export interface ScheduleOptions {
  config?: Partial<SrsConfig>;
  /** Fuzz seed; defaults to a value derived from the state and `now`. */
  seed?: Seed;
}

export interface ScheduleResult {
  nextState: CardState;
  dueAt: Date;
  /** Review interval in days; 0 while the card is on a (re)learning step. */
  intervalDays: number;
  /** Seconds from `now` until `dueAt`. */
  delaySeconds: number;
  /** True for (re)learning steps (minute delays) — used for "<10m"-style labels. */
  isLearningStep: boolean;
  isLeech: boolean;
}

const MS_PER_MINUTE = 60_000;
const ROUND_TO_CENTI = (value: number) => Math.round(value * 100) / 100;

function resolveConfig(overrides?: Partial<SrsConfig>): SrsConfig {
  const cfg = overrides ? { ...DEFAULT_SRS_CONFIG, ...overrides } : DEFAULT_SRS_CONFIG;
  for (const step of [...cfg.learningStepsMinutes, ...cfg.relearningStepsMinutes]) {
    if (!Number.isFinite(step) || step <= 0) throw new RangeError(`Learning steps must be positive minutes, received ${step}`);
  }
  if (!(cfg.maxIntervalDays >= 1)) throw new RangeError("maxIntervalDays must be at least 1");
  return cfg;
}

/** A never-reviewed card. */
export function newCardState(config?: Partial<SrsConfig>): CardState {
  const cfg = resolveConfig(config);
  return { phase: "NEW", step: 0, easeFactor: cfg.startingEase, intervalDays: 0, dueAt: null, lastReviewedAt: null, reps: 0, lapses: 0 };
}

/** Runtime guard for ratings arriving from forms, the REST API or offline sync. */
export function isRating(value: unknown): value is Rating {
  return typeof value === "string" && (RATINGS as readonly string[]).includes(value);
}

/** True when the card should be shown at `now` (NEW cards are always eligible; the daily new-card limit applies). */
export function isDue(state: Pick<CardState, "phase" | "dueAt">, now: Date): boolean {
  if (state.phase === "NEW" || state.dueAt === null) return true;
  return state.dueAt.getTime() <= now.getTime();
}

type StepOutcome = { kind: "step"; step: number; minutes: number } | { kind: "graduate"; easy: boolean };

/** (Re)learning step transition (see header). */
function stepOutcome(steps: readonly number[], currentStep: number, rating: Rating): StepOutcome {
  if (steps.length === 0) return { kind: "graduate", easy: rating === "EASY" };
  const i = Math.min(Math.max(0, Math.floor(currentStep)), steps.length - 1);
  const first = steps[0] as number;
  switch (rating) {
    case "AGAIN":
      return { kind: "step", step: 0, minutes: first };
    case "HARD": {
      if (i === 0) {
        const second = steps[1];
        const minutes = second !== undefined ? (first + second) / 2 : Math.min(first * 1.5, first + 1440);
        return { kind: "step", step: 0, minutes };
      }
      return { kind: "step", step: i, minutes: steps[i] as number };
    }
    case "GOOD": {
      const next = steps[i + 1];
      return next !== undefined ? { kind: "step", step: i + 1, minutes: next } : { kind: "graduate", easy: false };
    }
    case "EASY":
      return { kind: "graduate", easy: true };
  }
}

/** Half-width of the fuzz window in days for an interval (0 = no fuzz). */
export function fuzzRangeDays(intervalDays: number): number {
  if (intervalDays < 3) return 0;
  const fraction = intervalDays < 7 ? 0.15 : intervalDays < 20 ? 0.1 : 0.05;
  return Math.max(1, Math.round(intervalDays * fraction));
}

function applyFuzz(intervalDays: number, random: (() => number) | null, lowerBound: number, cfg: SrsConfig): number {
  let interval = Math.min(intervalDays, cfg.maxIntervalDays);
  const range = random ? fuzzRangeDays(interval) : 0;
  if (range > 0 && random) interval += Math.floor(random() * (2 * range + 1)) - range;
  return Math.min(cfg.maxIntervalDays, Math.max(1, Math.min(lowerBound, cfg.maxIntervalDays), interval));
}

function validateState(state: CardState): void {
  if (!(CARD_PHASES as readonly string[]).includes(state.phase)) throw new RangeError(`Unknown card phase ${String(state.phase)}`);
  if (!Number.isFinite(state.easeFactor)) throw new RangeError("easeFactor must be finite");
  if (!Number.isFinite(state.intervalDays) || state.intervalDays < 0) throw new RangeError("intervalDays must be a non-negative number");
}

/**
 * Applies one answer to a card and returns its new state and due date (see the header for the rules).
 * Does not mutate `state`. Throws `RangeError` on an unknown rating, invalid clock or corrupt state.
 */
export function schedule(state: CardState, rating: Rating, now: Date, options: ScheduleOptions = {}): ScheduleResult {
  if (!isRating(rating)) throw new RangeError(`Unknown rating ${String(rating)}`);
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) throw new RangeError("now must be a valid Date");
  validateState(state);
  const cfg = resolveConfig(options.config);
  const random = cfg.fuzz ? createRng(options.seed ?? `${state.reps}:${state.lapses}:${nowMs}`) : null;
  const ease = Math.max(cfg.minEase, state.easeFactor);
  const reps = state.reps + 1;
  const today = localDateString(now, cfg.timeZone);

  const reviewAt = (intervalDays: number, nextState: Omit<CardState, "dueAt" | "intervalDays">): ScheduleResult => {
    const dueAt = startOfLocalDay(addDays(today, intervalDays), cfg.timeZone);
    const full: CardState = { ...nextState, intervalDays, dueAt };
    return {
      nextState: full,
      dueAt,
      intervalDays,
      delaySeconds: Math.max(0, Math.round((dueAt.getTime() - nowMs) / 1000)),
      isLearningStep: false,
      isLeech: full.lapses >= cfg.leechThreshold,
    };
  };
  const stepAt = (minutes: number, nextState: Omit<CardState, "dueAt">): ScheduleResult => {
    const dueAt = new Date(nowMs + Math.round(minutes * MS_PER_MINUTE));
    const full: CardState = { ...nextState, dueAt };
    return {
      nextState: full,
      dueAt,
      intervalDays: 0,
      delaySeconds: Math.round((minutes * MS_PER_MINUTE) / 1000),
      isLearningStep: true,
      isLeech: full.lapses >= cfg.leechThreshold,
    };
  };

  // --- NEW / LEARNING ---
  if (state.phase === "NEW" || state.phase === "LEARNING") {
    const outcome = stepOutcome(cfg.learningStepsMinutes, state.phase === "NEW" ? 0 : state.step, rating);
    const base = { easeFactor: ease, lastReviewedAt: now, reps, lapses: state.lapses };
    if (outcome.kind === "step") {
      return stepAt(outcome.minutes, { ...base, phase: "LEARNING", step: outcome.step, intervalDays: 0 });
    }
    const interval = outcome.easy ? cfg.easyIntervalDays : cfg.graduatingIntervalDays;
    return reviewAt(applyFuzz(interval, random, 1, cfg), { ...base, phase: "REVIEW", step: 0 });
  }

  // --- RELEARNING ---
  if (state.phase === "RELEARNING") {
    const lapseInterval = Math.max(cfg.minLapseIntervalDays, Math.round(state.intervalDays));
    const outcome = stepOutcome(cfg.relearningStepsMinutes, state.step, rating);
    const base = { easeFactor: ease, lastReviewedAt: now, reps, lapses: state.lapses };
    if (outcome.kind === "step") {
      return stepAt(outcome.minutes, { ...base, phase: "RELEARNING", step: outcome.step, intervalDays: lapseInterval });
    }
    const interval = outcome.easy ? lapseInterval + 1 : lapseInterval;
    return reviewAt(applyFuzz(interval, random, 1, cfg), { ...base, phase: "REVIEW", step: 0 });
  }

  // --- REVIEW ---
  const interval = Math.max(1, Math.round(state.intervalDays));
  const elapsed = state.lastReviewedAt
    ? Math.max(0, daysBetween(localDateString(state.lastReviewedAt, cfg.timeZone), today))
    : interval;
  const overdue = Math.max(0, elapsed - interval);

  if (rating === "AGAIN") {
    const lapses = state.lapses + 1;
    const nextEase = ROUND_TO_CENTI(Math.max(cfg.minEase, ease - cfg.againEasePenalty));
    const lapseInterval = Math.min(
      cfg.maxIntervalDays,
      Math.max(cfg.minLapseIntervalDays, Math.round(interval * cfg.lapseIntervalMultiplier)),
    );
    const base = { easeFactor: nextEase, lastReviewedAt: now, reps, lapses };
    const firstRelearn = cfg.relearningStepsMinutes[0];
    if (firstRelearn !== undefined) {
      return stepAt(firstRelearn, { ...base, phase: "RELEARNING", step: 0, intervalDays: lapseInterval });
    }
    return reviewAt(lapseInterval, { ...base, phase: "REVIEW", step: 0 });
  }

  const modifier = cfg.intervalModifier;
  const hard = Math.max(interval + 1, Math.round((interval + overdue / 4) * cfg.hardMultiplier * modifier));
  const good = Math.max(hard + 1, Math.round((interval + overdue / 2) * ease * modifier));
  const easy = Math.max(good + 1, Math.round((interval + overdue) * ease * cfg.easyBonus * modifier));
  const chosen = rating === "HARD" ? hard : rating === "GOOD" ? good : easy;
  const nextEase =
    rating === "HARD"
      ? Math.max(cfg.minEase, ease - cfg.hardEasePenalty)
      : rating === "EASY"
        ? ease + cfg.easyEaseBonus
        : ease;
  return reviewAt(applyFuzz(chosen, random, interval + 1, cfg), {
    phase: "REVIEW",
    step: 0,
    easeFactor: ROUND_TO_CENTI(nextEase),
    lastReviewedAt: now,
    reps,
    lapses: state.lapses,
  });
}

/** Button label for a (re)learning delay: `"<1m"`, `"<10m"`, `"<1.5h"`, then whole days. */
export function formatStepLabel(delaySeconds: number): string {
  const minutes = delaySeconds / 60;
  if (minutes < 1) return "<1m";
  if (minutes < 60) return `<${Math.round(minutes)}m`;
  const hours = minutes / 60;
  if (hours < 24) return `<${trimDecimal(hours)}h`;
  return `${Math.round(hours / 24)}d`;
}

/** Button label for a review interval in days: `"1d"`, `"4d"`, `"1.2mo"` (30-day months), `"1y"`. */
export function formatDaysLabel(intervalDays: number): string {
  if (intervalDays < 30) return `${Math.round(intervalDays)}d`;
  if (intervalDays < 365) return `${trimDecimal(intervalDays / 30)}mo`;
  return `${trimDecimal(intervalDays / 365)}y`;
}

function trimDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export interface IntervalPreview {
  intervalDays: number;
  delaySeconds: number;
  isLearningStep: boolean;
  label: string;
}

/**
 * What each button would do, for labelling Again / Hard / Good / Easy (e.g. `<1m`, `<6m`, `<10m`, `4d`).
 * Computed without fuzz so labels are stable while the card is on screen; the real answer may land ±fuzz days.
 */
export function previewIntervals(state: CardState, now: Date, config?: Partial<SrsConfig>): Record<Rating, IntervalPreview> {
  const cfg = { ...config, fuzz: false };
  const preview = (rating: Rating): IntervalPreview => {
    const result = schedule(state, rating, now, { config: cfg });
    return {
      intervalDays: result.intervalDays,
      delaySeconds: result.delaySeconds,
      isLearningStep: result.isLearningStep,
      label: result.isLearningStep ? formatStepLabel(result.delaySeconds) : formatDaysLabel(result.intervalDays),
    };
  };
  return { AGAIN: preview("AGAIN"), HARD: preview("HARD"), GOOD: preview("GOOD"), EASY: preview("EASY") };
}
