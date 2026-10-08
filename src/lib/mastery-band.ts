/**
 * Topic mastery bands (§11). Pure + isomorphic so the same mapping is used by the adaptive engine, the REST API,
 * WhatsApp summaries and the UI (`MasteryBadge`, `MasteryBar`).
 *
 * | Score  | Band       |
 * |--------|------------|
 * | 0–39   | WEAK       |
 * | 40–59  | DEVELOPING |
 * | 60–74  | COMPETENT  |
 * | 75–89  | STRONG     |
 * | 90–100 | MASTERED   |
 *
 * Band names intentionally match the upper-case enum style used in the Prisma schema, so a DB enum value can be
 * passed straight through without mapping.
 *
 * This module is the SINGLE source of the band boundaries and of the score → band mapping. Server cores
 * (`@/server/progress/core`, exam scoring, the planner) import it rather than re-declaring thresholds, so the band a
 * student sees in the UI is always the band the adaptive engine acted on.
 */
import { clamp, roundHalfUp } from "@/lib/math";

/** Ordered weakest → strongest. The index doubles as the step on the 5-step colour ramp. */
export const MASTERY_BANDS = ["WEAK", "DEVELOPING", "COMPETENT", "STRONG", "MASTERED"] as const;

export type MasteryBand = (typeof MASTERY_BANDS)[number];

/** Inclusive lower bound of each band on the 0–100 scale. */
export const MASTERY_BAND_MIN_SCORE: Readonly<Record<MasteryBand, number>> = {
  WEAK: 0,
  DEVELOPING: 40,
  COMPETENT: 60,
  STRONG: 75,
  MASTERED: 90,
};

/** Human-readable labels. Always render these next to any mastery colour (never colour alone, §43). */
export const MASTERY_BAND_LABELS: Readonly<Record<MasteryBand, string>> = {
  WEAK: "Weak",
  DEVELOPING: "Developing",
  COMPETENT: "Competent",
  STRONG: "Strong",
  MASTERED: "Mastered",
};

/**
 * Maps a 0–100 mastery score to its band.
 *
 * The score is first rounded half up to a whole percentage, then compared against the inclusive integer
 * boundaries of the §11 table. Rounding first is deliberate: scores are stored with two decimals but always
 * DISPLAYED as whole percentages (`formatPercent`), so `39.5` is shown as "40%" and must therefore be DEVELOPING —
 * otherwise a badge could read "Weak · 40%". Scores outside 0–100 are clamped because they can legitimately arise
 * from floating-point aggregation (e.g. `100.0000001`). Non-finite input is a programming error and throws.
 */
export function masteryBandFromScore(score: number): MasteryBand {
  if (!Number.isFinite(score)) {
    throw new RangeError(`Mastery score must be a finite number, received ${String(score)}`);
  }
  const whole = roundHalfUp(clamp(score, 0, 100));
  for (let i = MASTERY_BANDS.length - 1; i > 0; i--) {
    const band = MASTERY_BANDS[i];
    if (band !== undefined && whole >= MASTERY_BAND_MIN_SCORE[band]) return band;
  }
  return "WEAK";
}

/** 1-based step (1 = WEAK … 5 = MASTERED) used to pick `--color-mastery-N` tokens. */
export function masteryBandStep(band: MasteryBand): 1 | 2 | 3 | 4 | 5 {
  return (MASTERY_BANDS.indexOf(band) + 1) as 1 | 2 | 3 | 4 | 5;
}

/** Type guard for values coming from the DB, query strings or API payloads. */
export function isMasteryBand(value: unknown): value is MasteryBand {
  return typeof value === "string" && (MASTERY_BANDS as readonly string[]).includes(value);
}
