import { describe, expect, it } from "vitest";
import {
  DEFAULT_SRS_CONFIG,
  formatDaysLabel,
  formatStepLabel,
  fuzzRangeDays,
  isDue,
  isRating,
  newCardState,
  previewIntervals,
  schedule,
  type CardState,
  type Rating,
  type SrsConfig,
} from "./srs";

const NOW = new Date("2026-10-05T08:00:00Z"); // 10:00 Harare, Monday
const MIN = 60_000;
const NO_FUZZ: Partial<SrsConfig> = { fuzz: false };
const TOMORROW_MIDNIGHT_CAT = "2026-10-05T22:00:00.000Z";

function harareMidnightPlus(days: number): string {
  return new Date(Date.parse(TOMORROW_MIDNIGHT_CAT) + (days - 1) * 86_400_000).toISOString();
}

function review(intervalDays: number, overrides: Partial<CardState> = {}): CardState {
  const lastReviewedAt = new Date(NOW.getTime() - intervalDays * 86_400_000);
  return {
    phase: "REVIEW",
    step: 0,
    easeFactor: 2.5,
    intervalDays,
    dueAt: new Date(NOW.getTime() - 3_600_000),
    lastReviewedAt,
    reps: 5,
    lapses: 0,
    ...overrides,
  };
}

describe("newCardState / guards", () => {
  it("starts NEW with the default ease", () => {
    expect(newCardState()).toEqual({ phase: "NEW", step: 0, easeFactor: 2.5, intervalDays: 0, dueAt: null, lastReviewedAt: null, reps: 0, lapses: 0 });
    expect(isDue(newCardState(), NOW)).toBe(true);
  });

  it("validates ratings and inputs", () => {
    expect(isRating("GOOD")).toBe(true);
    expect(isRating("good")).toBe(false);
    expect(() => schedule(newCardState(), "MAYBE" as Rating, NOW)).toThrow(RangeError);
    expect(() => schedule(newCardState(), "GOOD", new Date(Number.NaN))).toThrow(RangeError);
    expect(() => schedule({ ...newCardState(), easeFactor: Number.NaN }, "GOOD", NOW)).toThrow(RangeError);
    expect(() => schedule(newCardState(), "GOOD", NOW, { config: { learningStepsMinutes: [0] } })).toThrow(RangeError);
  });
});

describe("learning phase", () => {
  const card = newCardState();

  it("AGAIN → first step (1 min)", () => {
    const r = schedule(card, "AGAIN", NOW, { config: NO_FUZZ });
    expect(r.nextState).toMatchObject({ phase: "LEARNING", step: 0, reps: 1, intervalDays: 0 });
    expect(r.dueAt.getTime() - NOW.getTime()).toBe(1 * MIN);
    expect(r.isLearningStep).toBe(true);
  });

  it("HARD on the first step → average of the first two steps (5.5 min)", () => {
    const r = schedule(card, "HARD", NOW, { config: NO_FUZZ });
    expect(r.nextState).toMatchObject({ phase: "LEARNING", step: 0 });
    expect(r.delaySeconds).toBe(330);
  });

  it("GOOD → next step (10 min), GOOD again → graduates with 1 day", () => {
    const first = schedule(card, "GOOD", NOW, { config: NO_FUZZ });
    expect(first.nextState).toMatchObject({ phase: "LEARNING", step: 1 });
    expect(first.dueAt.getTime() - NOW.getTime()).toBe(10 * MIN);

    const later = new Date(NOW.getTime() + 10 * MIN);
    const graduated = schedule(first.nextState, "GOOD", later, { config: NO_FUZZ });
    expect(graduated.nextState).toMatchObject({ phase: "REVIEW", step: 0, intervalDays: 1, easeFactor: 2.5, reps: 2 });
    expect(graduated.dueAt.toISOString()).toBe(TOMORROW_MIDNIGHT_CAT);
    expect(graduated.isLearningStep).toBe(false);
  });

  it("HARD on a later step repeats that step", () => {
    const onStep1: CardState = { ...card, phase: "LEARNING", step: 1, dueAt: NOW };
    const r = schedule(onStep1, "HARD", NOW, { config: NO_FUZZ });
    expect(r.nextState.step).toBe(1);
    expect(r.delaySeconds).toBe(600);
  });

  it("AGAIN on a later step returns to the first step", () => {
    const onStep1: CardState = { ...card, phase: "LEARNING", step: 1, dueAt: NOW };
    expect(schedule(onStep1, "AGAIN", NOW, { config: NO_FUZZ }).nextState.step).toBe(0);
  });

  it("EASY graduates immediately with the easy interval (4 days)", () => {
    const r = schedule(card, "EASY", NOW, { config: NO_FUZZ });
    expect(r.nextState).toMatchObject({ phase: "REVIEW", intervalDays: 4 });
    expect(r.dueAt.toISOString()).toBe(harareMidnightPlus(4));
  });

  it("never changes ease while learning", () => {
    for (const rating of ["AGAIN", "HARD", "GOOD", "EASY"] as const) {
      expect(schedule(card, rating, NOW, { config: NO_FUZZ }).nextState.easeFactor).toBe(2.5);
    }
  });

  it("HARD with a single step uses 1.5× that step", () => {
    const r = schedule(card, "HARD", NOW, { config: { ...NO_FUZZ, learningStepsMinutes: [10] } });
    expect(r.delaySeconds).toBe(900);
  });

  it("graduates straight away when there are no learning steps", () => {
    const r = schedule(card, "AGAIN", NOW, { config: { ...NO_FUZZ, learningStepsMinutes: [] } });
    expect(r.nextState).toMatchObject({ phase: "REVIEW", intervalDays: 1 });
  });

  it("copes with a step index left over from a longer step configuration", () => {
    const stale: CardState = { ...card, phase: "LEARNING", step: 5, dueAt: NOW };
    expect(schedule(stale, "GOOD", NOW, { config: NO_FUZZ }).nextState.phase).toBe("REVIEW");
  });
});

describe("review phase", () => {
  it("computes SM-2 intervals for an on-time review", () => {
    const card = review(10);
    const hard = schedule(card, "HARD", NOW, { config: NO_FUZZ });
    const good = schedule(card, "GOOD", NOW, { config: NO_FUZZ });
    const easy = schedule(card, "EASY", NOW, { config: NO_FUZZ });
    expect(hard.intervalDays).toBe(12); // 10 × 1.2
    expect(good.intervalDays).toBe(25); // 10 × 2.5
    expect(easy.intervalDays).toBe(33); // 10 × 2.5 × 1.3 = 32.5 → 33
    expect(hard.nextState.easeFactor).toBe(2.35);
    expect(good.nextState.easeFactor).toBe(2.5);
    expect(easy.nextState.easeFactor).toBe(2.65);
    expect(good.dueAt.toISOString()).toBe(harareMidnightPlus(25));
  });

  it("keeps HARD < GOOD < EASY and every answer above the current interval", () => {
    for (const interval of [1, 2, 3, 5, 8, 30]) {
      const card = review(interval, { easeFactor: 1.3 });
      const [h, g, e] = (["HARD", "GOOD", "EASY"] as const).map((r) => schedule(card, r, NOW, { config: NO_FUZZ }).intervalDays);
      expect(h).toBeGreaterThan(interval);
      expect(g).toBeGreaterThan(h as number);
      expect(e).toBeGreaterThan(g as number);
    }
  });

  it("credits overdue days", () => {
    const onTime = schedule(review(10), "GOOD", NOW, { config: NO_FUZZ }).intervalDays;
    const late = schedule(review(10, { lastReviewedAt: new Date(NOW.getTime() - 14 * 86_400_000) }), "GOOD", NOW, { config: NO_FUZZ });
    expect(late.intervalDays).toBe(30); // (10 + 4/2) × 2.5
    expect(late.intervalDays).toBeGreaterThan(onTime);
  });

  it("schedules early reviews as if on time", () => {
    const early = review(10, { lastReviewedAt: new Date(NOW.getTime() - 3 * 86_400_000) });
    expect(schedule(early, "GOOD", NOW, { config: NO_FUZZ }).intervalDays).toBe(25);
  });

  it("AGAIN is a lapse: ease −0.2, lapses +1, RELEARNING for 10 minutes", () => {
    const r = schedule(review(30), "AGAIN", NOW, { config: NO_FUZZ });
    expect(r.nextState).toMatchObject({ phase: "RELEARNING", step: 0, easeFactor: 2.3, lapses: 1, intervalDays: 1 });
    expect(r.delaySeconds).toBe(600);
  });

  it("never lets ease fall below 1.3", () => {
    let card = review(5, { easeFactor: 1.35 });
    card = schedule(card, "HARD", NOW, { config: NO_FUZZ }).nextState;
    expect(card.easeFactor).toBe(1.3);
    const lapsed = schedule(review(5, { easeFactor: 1.3 }), "AGAIN", NOW, { config: NO_FUZZ });
    expect(lapsed.nextState.easeFactor).toBe(1.3);
  });

  it("caps intervals at maxIntervalDays", () => {
    const r = schedule(review(300), "EASY", NOW, { config: NO_FUZZ });
    expect(r.intervalDays).toBe(DEFAULT_SRS_CONFIG.maxIntervalDays);
    const capped = schedule(review(365), "GOOD", NOW);
    expect(capped.intervalDays).toBe(365);
  });

  it("flags leeches at the lapse threshold", () => {
    expect(schedule(review(5, { lapses: 6 }), "AGAIN", NOW).isLeech).toBe(false);
    expect(schedule(review(5, { lapses: 7 }), "AGAIN", NOW).isLeech).toBe(true);
  });

  it("can lapse straight back to REVIEW when there are no relearning steps", () => {
    const r = schedule(review(30), "AGAIN", NOW, { config: { ...NO_FUZZ, relearningStepsMinutes: [], lapseIntervalMultiplier: 0.5 } });
    expect(r.nextState).toMatchObject({ phase: "REVIEW", intervalDays: 15 });
    expect(r.dueAt.toISOString()).toBe(harareMidnightPlus(15));
  });
});

describe("relearning phase", () => {
  const lapsed = schedule(review(30), "AGAIN", NOW, { config: NO_FUZZ }).nextState;
  const later = new Date(NOW.getTime() + 10 * MIN);

  it("GOOD after the last relearning step returns to REVIEW with the post-lapse interval", () => {
    const r = schedule(lapsed, "GOOD", later, { config: NO_FUZZ });
    expect(r.nextState).toMatchObject({ phase: "REVIEW", intervalDays: 1, lapses: 1, easeFactor: 2.3 });
    expect(r.dueAt.toISOString()).toBe(TOMORROW_MIDNIGHT_CAT);
  });

  it("EASY adds a day; AGAIN and HARD stay in relearning", () => {
    expect(schedule(lapsed, "EASY", later, { config: NO_FUZZ }).nextState).toMatchObject({ phase: "REVIEW", intervalDays: 2 });
    expect(schedule(lapsed, "AGAIN", later, { config: NO_FUZZ }).nextState).toMatchObject({ phase: "RELEARNING", step: 0, lapses: 1 });
    const hard = schedule(lapsed, "HARD", later, { config: NO_FUZZ });
    expect(hard.nextState.phase).toBe("RELEARNING");
    expect(hard.delaySeconds).toBe(900); // single step: 1.5 × 10 min
  });

  it("does not change ease or lapses while relearning", () => {
    for (const rating of ["AGAIN", "HARD", "GOOD", "EASY"] as const) {
      const next = schedule(lapsed, rating, later, { config: NO_FUZZ }).nextState;
      expect(next.easeFactor).toBe(2.3);
      expect(next.lapses).toBe(1);
    }
  });
});

describe("fuzz", () => {
  it("has the documented ranges", () => {
    expect(fuzzRangeDays(1)).toBe(0);
    expect(fuzzRangeDays(2)).toBe(0);
    expect(fuzzRangeDays(3)).toBe(1);
    expect(fuzzRangeDays(10)).toBe(1);
    expect(fuzzRangeDays(15)).toBe(2);
    expect(fuzzRangeDays(100)).toBe(5);
  });

  it("stays within range, is deterministic per seed and spreads cards", () => {
    const card = review(40);
    const base = schedule(card, "GOOD", NOW, { config: NO_FUZZ }).intervalDays; // 100
    const results = Array.from({ length: 40 }, (_, i) => schedule(card, "GOOD", NOW, { seed: `card-${i}` }).intervalDays);
    for (const days of results) {
      expect(days).toBeGreaterThanOrEqual(base - 5);
      expect(days).toBeLessThanOrEqual(base + 5);
    }
    expect(new Set(results).size).toBeGreaterThan(3);
    expect(schedule(card, "GOOD", NOW, { seed: "card-1" })).toEqual(schedule(card, "GOOD", NOW, { seed: "card-1" }));
  });

  it("never fuzzes a review below the current interval + 1 or learning steps at all", () => {
    for (let i = 0; i < 30; i++) {
      expect(schedule(review(3), "HARD", NOW, { seed: i }).intervalDays).toBeGreaterThanOrEqual(4);
      expect(schedule(newCardState(), "GOOD", NOW, { seed: i }).delaySeconds).toBe(600);
    }
  });
});

describe("day alignment and time zones", () => {
  it("counts calendar days in the student's zone", () => {
    // Reviewed 23:30 CAT on the 4th, reviewed again 00:30 CAT on the 5th: one calendar day elapsed, not zero.
    const card = review(1, { lastReviewedAt: new Date("2026-10-04T21:30:00Z") });
    const r = schedule(card, "GOOD", new Date("2026-10-04T22:30:00Z"), { config: NO_FUZZ });
    expect(r.intervalDays).toBe(3);
    expect(r.dueAt.toISOString()).toBe("2026-10-07T22:00:00.000Z"); // midnight CAT on the 8th
  });

  it("uses the configured time zone", () => {
    const r = schedule(review(10), "GOOD", NOW, { config: { ...NO_FUZZ, timeZone: "UTC" } });
    expect(r.dueAt.toISOString()).toBe("2026-10-30T00:00:00.000Z");
  });

  it("isDue compares against dueAt", () => {
    const due = schedule(newCardState(), "GOOD", NOW, { config: NO_FUZZ }).nextState;
    expect(isDue(due, new Date(NOW.getTime() + 9 * MIN))).toBe(false);
    expect(isDue(due, new Date(NOW.getTime() + 10 * MIN))).toBe(true);
  });
});

describe("labels", () => {
  it("formats step and day labels", () => {
    expect(formatStepLabel(30)).toBe("<1m");
    expect(formatStepLabel(60)).toBe("<1m");
    expect(formatStepLabel(600)).toBe("<10m");
    expect(formatStepLabel(5400)).toBe("<1.5h");
    expect(formatStepLabel(2 * 86_400)).toBe("2d");
    expect(formatDaysLabel(1)).toBe("1d");
    expect(formatDaysLabel(29)).toBe("29d");
    expect(formatDaysLabel(36)).toBe("1.2mo");
    expect(formatDaysLabel(60)).toBe("2mo");
    expect(formatDaysLabel(365)).toBe("1y");
  });

  it("previews every button for a new card", () => {
    const preview = previewIntervals(newCardState(), NOW);
    expect(Object.fromEntries(Object.entries(preview).map(([k, v]) => [k, v.label]))).toEqual({
      AGAIN: "<1m",
      HARD: "<6m",
      GOOD: "<10m",
      EASY: "4d",
    });
  });

  it("previews review buttons without fuzz", () => {
    const preview = previewIntervals(review(10), NOW);
    expect([preview.AGAIN.label, preview.HARD.label, preview.GOOD.label, preview.EASY.label]).toEqual(["<10m", "12d", "25d", "1.1mo"]);
    expect(previewIntervals(review(10), NOW)).toEqual(preview);
  });
});

describe("full lifecycle", () => {
  it("follows NEW → LEARNING → REVIEW → RELEARNING → REVIEW without mutating inputs", () => {
    let card = newCardState();
    const original = card;
    const frozen = structuredClone(card);
    let clock = NOW.getTime();
    const answer = (rating: Rating, advanceMs: number) => {
      clock += advanceMs;
      card = schedule(card, rating, new Date(clock), { config: NO_FUZZ }).nextState;
      return card.phase;
    };
    expect(answer("GOOD", 0)).toBe("LEARNING");
    expect(answer("GOOD", 10 * MIN)).toBe("REVIEW");
    expect(answer("GOOD", 86_400_000)).toBe("REVIEW");
    expect(answer("AGAIN", 3 * 86_400_000)).toBe("RELEARNING");
    expect(answer("GOOD", 10 * MIN)).toBe("REVIEW");
    expect(card.lapses).toBe(1);
    expect(card.reps).toBe(5);
    expect(original).toEqual(frozen);
  });
});
