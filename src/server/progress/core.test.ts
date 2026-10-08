import { describe, expect, it } from "vitest";
import { masteryBandFromScore } from "@/lib/mastery-band";
import { roundHalfUp as libRoundHalfUp } from "@/lib/math";
import {
  DEFAULT_MASTERY_CONFIG,
  classifyOutcome,
  isRetestDue,
  isTopicCompleted,
  masteryBand,
  nextDifficulty,
  overallProgress,
  retestDueAt,
  roundHalfUp,
  syllabusProgress,
  toDifficulty,
  updateTopicMastery,
  type AttemptOutcome,
  type TopicMasteryState,
  type TopicProgressInput,
} from "./core";

const T0 = new Date("2026-10-05T08:00:00Z"); // 10:00 in Harare

function outcome(overrides: Partial<AttemptOutcome> = {}): AttemptOutcome {
  return { marksAwarded: 1, marksAvailable: 1, difficulty: 3, answeredAt: T0, hintsUsed: 0, ...overrides };
}

/** Applies a sequence of [fractionCorrect, difficulty] answers one minute apart. */
function replay(
  answers: readonly (readonly [number, number])[],
  start: TopicMasteryState | null = null,
  extra: Partial<AttemptOutcome> = {},
): TopicMasteryState[] {
  const states: TopicMasteryState[] = [];
  let state = start;
  const base = start ? start.lastPracticedAt.getTime() + 60_000 : T0.getTime();
  answers.forEach(([fraction, difficulty], i) => {
    state = updateTopicMastery(
      state,
      outcome({ marksAwarded: fraction, difficulty, answeredAt: new Date(base + i * 60_000), ...extra }),
    );
    states.push(state);
  });
  return states;
}

function last<T>(items: readonly T[]): T {
  const item = items[items.length - 1];
  if (item === undefined) throw new Error("empty");
  return item;
}

const repeat = (answer: readonly [number, number], times: number) => Array.from({ length: times }, () => answer);

describe("shared helpers", () => {
  it("re-uses the isomorphic implementations (behaviour is tested in src/lib)", () => {
    expect(roundHalfUp).toBe(libRoundHalfUp);
    expect(masteryBand).toBe(masteryBandFromScore);
  });
});

describe("masteryBand (§11)", () => {
  it.each([
    [0, "WEAK"],
    [39, "WEAK"],
    [39.49, "WEAK"],
    [39.5, "DEVELOPING"],
    [40, "DEVELOPING"],
    [59.4, "DEVELOPING"],
    [59.5, "COMPETENT"],
    [60, "COMPETENT"],
    [74, "COMPETENT"],
    [75, "STRONG"],
    [89, "STRONG"],
    [89.5, "MASTERED"],
    [90, "MASTERED"],
    [100, "MASTERED"],
  ] as const)("score %d → %s (round half up, inclusive boundaries)", (score, band) => {
    expect(masteryBand(score)).toBe(band);
  });

  it("clamps out-of-range scores and rejects non-finite ones", () => {
    expect(masteryBand(-3)).toBe("WEAK");
    expect(masteryBand(130)).toBe("MASTERED");
    expect(() => masteryBand(Number.NaN)).toThrow(RangeError);
  });
});

describe("toDifficulty", () => {
  it("rounds and clamps onto 1–5", () => {
    expect(toDifficulty(0)).toBe(1);
    expect(toDifficulty(2.5)).toBe(3);
    expect(toDifficulty(9)).toBe(5);
    expect(() => toDifficulty(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});

describe("classifyOutcome", () => {
  it("uses the 80 % / 50 % thresholds and the one-hint allowance", () => {
    expect(classifyOutcome({ marksAwarded: 1, marksAvailable: 1, hintsUsed: 0 })).toBe("CORRECT");
    expect(classifyOutcome({ marksAwarded: 4, marksAvailable: 5, hintsUsed: 1 })).toBe("CORRECT");
    expect(classifyOutcome({ marksAwarded: 4, marksAvailable: 5, hintsUsed: 2 })).toBe("PARTIAL");
    expect(classifyOutcome({ marksAwarded: 3, marksAvailable: 5, hintsUsed: 0 })).toBe("PARTIAL");
    expect(classifyOutcome({ marksAwarded: 2.5, marksAvailable: 5, hintsUsed: 0 })).toBe("PARTIAL");
    expect(classifyOutcome({ marksAwarded: 2, marksAvailable: 5, hintsUsed: 0 })).toBe("INCORRECT");
  });

  it("clamps over-awarded marks and rejects impossible totals", () => {
    expect(classifyOutcome({ marksAwarded: 7, marksAvailable: 5, hintsUsed: 0 })).toBe("CORRECT");
    expect(() => classifyOutcome({ marksAwarded: 0, marksAvailable: 0, hintsUsed: 0 })).toThrow(RangeError);
    expect(() => classifyOutcome({ marksAwarded: Number.NaN, marksAvailable: 2, hintsUsed: 0 })).toThrow(RangeError);
  });
});

describe("updateTopicMastery — required behaviours", () => {
  it("(a) repeated failure drives a new topic into WEAK immediately and keeps it there", () => {
    const states = replay(repeat([0, 2], 6));
    for (const state of states) expect(masteryBand(state.score)).toBe("WEAK");
    expect(last(states).score).toBeLessThan(10);
  });

  it("(a) repeated failure drives a MASTERED topic down into WEAK", () => {
    const mastered = last(replay(repeat([1, 5], 20)));
    expect(masteryBand(mastered.score)).toBe("MASTERED");
    const failing = replay(repeat([0, 3], 10), mastered);
    const firstWeak = failing.findIndex((s) => masteryBand(s.score) === "WEAK");
    expect(firstWeak).toBeGreaterThanOrEqual(0);
    expect(firstWeak).toBeLessThanOrEqual(8); // within 9 consecutive misses
    // ...and monotonically: every miss lowers the score.
    let previous = mastered.score;
    for (const state of failing) {
      expect(state.score).toBeLessThan(previous);
      previous = state.score;
    }
  });

  it("(b) consistent success on hard questions reaches MASTERED", () => {
    const states = replay(repeat([1, 5], 12));
    const firstMastered = states.findIndex((s) => masteryBand(s.score) === "MASTERED");
    expect(firstMastered).toBeGreaterThanOrEqual(7); // not before 8 answers (confidence cap)
    expect(firstMastered).toBeLessThanOrEqual(9);
    expect(masteryBand(last(states).score)).toBe("MASTERED");
    expect(replay(repeat([1, 4], 14)).some((s) => masteryBand(s.score) === "MASTERED")).toBe(true);
  });

  it("(c) one lucky answer cannot make a beginner MASTERED (or even STRONG)", () => {
    const state = updateTopicMastery(null, outcome({ difficulty: 5 }));
    expect(masteryBand(state.score)).not.toBe("MASTERED");
    expect(state.score).toBeLessThan(75);
    expect(state.evidenceCount).toBe(1);
  });

  it("(c) confidence caps hold even with a perfect start", () => {
    const states = replay(repeat([1, 5], 8));
    states.slice(0, 2).forEach((s) => expect(s.score).toBeLessThanOrEqual(74));
    states.slice(0, 7).forEach((s) => expect(s.score).toBeLessThanOrEqual(89));
  });

  it("easy-only success plateaus below STRONG; medium-only success plateaus below MASTERED", () => {
    const easy = replay(repeat([1, 1], 40));
    expect(last(easy).score).toBeLessThanOrEqual(70);
    expect(masteryBand(last(easy).score)).toBe("COMPETENT");
    const medium = replay(repeat([1, 3], 40));
    expect(masteryBand(last(medium).score)).toBe("STRONG");
  });

  it("a mixed 50 % record lands in DEVELOPING", () => {
    const states = replay(Array.from({ length: 30 }, (_, i) => [i % 2, 3] as const));
    expect(masteryBand(last(states).score)).toBe("DEVELOPING");
  });

  it("is stable later: one miss after a long run does not drop a MASTERED topic out of MASTERED", () => {
    const mastered = last(replay(repeat([1, 5], 25)));
    const afterSlip = updateTopicMastery(mastered, outcome({ marksAwarded: 0, difficulty: 3, answeredAt: new Date("2026-10-06T08:00:00Z") }));
    expect(masteryBand(afterSlip.score)).toBe("MASTERED");
    expect(afterSlip.score).toBeLessThan(mastered.score);
  });
});

describe("updateTopicMastery — evidence rules", () => {
  it("a correct answer never lowers the score and an incorrect one never raises it (one-sided evidence)", () => {
    const strong = last(replay(repeat([1, 4], 15)));
    const easyWin = updateTopicMastery(strong, outcome({ difficulty: 1, answeredAt: new Date("2026-10-06T08:00:00Z") }));
    expect(easyWin.score).toBe(strong.score);

    const weak = last(replay(repeat([0, 1], 6)));
    const hardMiss = updateTopicMastery(weak, outcome({ marksAwarded: 0, difficulty: 5, answeredAt: new Date("2026-10-06T08:00:00Z") }));
    expect(hardMiss.score).toBe(weak.score);
  });

  it("harder questions move the score more than easier ones", () => {
    const base = last(replay(repeat([0.6, 3], 4)));
    const at = new Date("2026-10-06T08:00:00Z");
    const hard = updateTopicMastery(base, outcome({ difficulty: 5, answeredAt: at }));
    const easy = updateTopicMastery(base, outcome({ difficulty: 2, answeredAt: at }));
    expect(hard.score - base.score).toBeGreaterThan(easy.score - base.score);
  });

  it("penalises hints modestly (10 % per hint, capped) and slow answers slightly", () => {
    const at = new Date("2026-10-06T08:00:00Z");
    const base = last(replay(repeat([0.5, 3], 4)));
    const clean = updateTopicMastery(base, outcome({ answeredAt: at }));
    const oneHint = updateTopicMastery(base, outcome({ answeredAt: at, hintsUsed: 1 }));
    const fiveHints = updateTopicMastery(base, outcome({ answeredAt: at, hintsUsed: 5 }));
    const threeHints = updateTopicMastery(base, outcome({ answeredAt: at, hintsUsed: 3 }));
    const slow = updateTopicMastery(base, outcome({ answeredAt: at, timeSpentSeconds: 300, expectedSeconds: 120 }));
    const onTime = updateTopicMastery(base, outcome({ answeredAt: at, timeSpentSeconds: 200, expectedSeconds: 120 }));
    expect(oneHint.score).toBeLessThan(clean.score);
    expect(oneHint.score).toBeGreaterThan(base.score); // still a gain
    expect(fiveHints.score).toBe(threeHints.score); // cap at 30 %
    expect(slow.score).toBeLessThan(clean.score);
    expect(onTime.score).toBe(clean.score);
  });

  it("weights self-assessed answers at half", () => {
    const at = new Date("2026-10-06T08:00:00Z");
    const base = last(replay(repeat([0.5, 3], 4)));
    const marked = updateTopicMastery(base, outcome({ answeredAt: at }));
    const self = updateTopicMastery(base, outcome({ answeredAt: at, selfAssessed: true }));
    expect(self.score - base.score).toBeGreaterThan(0);
    expect(self.score - base.score).toBeLessThan(marked.score - base.score);
  });

  it("tracks streaks, accuracy and evidence", () => {
    const states = replay([[1, 2], [1, 2], [0.6, 2], [0, 2], [0, 2], [1, 2]]);
    expect(states.map((s) => s.consecutiveCorrect)).toEqual([1, 2, 0, 0, 0, 1]);
    expect(states.map((s) => s.consecutiveIncorrect)).toEqual([0, 0, 0, 1, 2, 0]);
    expect(states.map((s) => s.evidenceCount)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(states[0]?.recentAccuracy).toBe(1);
    expect(states[1]?.recentAccuracy).toBe(1);
    expect(states[2]?.recentAccuracy).toBeCloseTo(0.867, 3);
    for (const s of states) {
      expect(s.recentAccuracy).toBeGreaterThanOrEqual(0);
      expect(s.recentAccuracy).toBeLessThanOrEqual(1);
    }
  });

  it("is deterministic: replaying the same attempts reproduces the same state", () => {
    const answers = [[1, 3], [0, 4], [0.5, 2], [1, 5], [1, 5]] as const;
    expect(replay(answers)).toEqual(replay(answers));
  });

  it("keeps the latest lastPracticedAt when an older attempt syncs late", () => {
    const now = last(replay([[1, 3]]));
    const late = updateTopicMastery(now, outcome({ answeredAt: new Date(T0.getTime() - 3_600_000) }));
    expect(late.lastPracticedAt.getTime()).toBe(now.lastPracticedAt.getTime());
    expect(late.evidenceCount).toBe(2);
  });

  it("does not mutate the previous state", () => {
    const prev = last(replay([[1, 3]]));
    const snapshot = structuredClone(prev);
    updateTopicMastery(prev, outcome({ marksAwarded: 0 }));
    expect(prev).toEqual(snapshot);
  });

  it("rejects structurally invalid outcomes", () => {
    expect(() => updateTopicMastery(null, outcome({ marksAvailable: 0 }))).toThrow(RangeError);
    expect(() => updateTopicMastery(null, outcome({ answeredAt: new Date(Number.NaN) }))).toThrow(RangeError);
  });

  it("scores stay within 0–100 with two decimals", () => {
    const states = replay(Array.from({ length: 60 }, (_, i) => [((i * 7) % 11) / 10, (i % 5) + 1] as const));
    for (const s of states) {
      expect(s.score).toBeGreaterThanOrEqual(0);
      expect(s.score).toBeLessThanOrEqual(100);
      expect(Number.isInteger(Math.round(s.score * 100))).toBe(true);
      expect(Math.abs(s.score * 100 - Math.round(s.score * 100))).toBeLessThan(1e-6);
    }
  });
});

describe("difficulty stepping (§11)", () => {
  it("starts new topics at the initial difficulty", () => {
    expect(updateTopicMastery(null, outcome({ marksAwarded: 0.6 })).currentDifficulty).toBe(DEFAULT_MASTERY_CONFIG.initialDifficulty);
  });

  it("steps up after every 3 consecutive correct answers at the current level", () => {
    const states = replay(repeat([1, 5], 9));
    expect(states.map((s) => s.currentDifficulty)).toEqual([2, 2, 3, 3, 3, 4, 4, 4, 5]);
  });

  it("steps down after every 2 consecutive misses at or below the current level", () => {
    const states = replay(repeat([0, 1], 5));
    expect(states.map((s) => s.currentDifficulty)).toEqual([2, 1, 1, 1, 1]);
    const fromFour = { currentDifficulty: 4 as const, consecutiveCorrect: 0, consecutiveIncorrect: 2 };
    expect(nextDifficulty(fromFour, { result: "INCORRECT", difficulty: 4 })).toBe(3);
  });

  it("does not promote on warm-up successes or demote on failed stretch questions", () => {
    expect(nextDifficulty({ currentDifficulty: 3, consecutiveCorrect: 3, consecutiveIncorrect: 0 }, { result: "CORRECT", difficulty: 1 })).toBe(3);
    expect(nextDifficulty({ currentDifficulty: 3, consecutiveCorrect: 0, consecutiveIncorrect: 2 }, { result: "INCORRECT", difficulty: 5 })).toBe(3);
  });

  it("never leaves 1–5 and ignores partial answers", () => {
    expect(nextDifficulty({ currentDifficulty: 5, consecutiveCorrect: 3, consecutiveIncorrect: 0 }, { result: "CORRECT", difficulty: 5 })).toBe(5);
    expect(nextDifficulty({ currentDifficulty: 1, consecutiveCorrect: 0, consecutiveIncorrect: 2 }, { result: "INCORRECT", difficulty: 1 })).toBe(1);
    expect(nextDifficulty({ currentDifficulty: 3, consecutiveCorrect: 0, consecutiveIncorrect: 0 }, { result: "PARTIAL", difficulty: 3 })).toBe(3);
  });

  it("honours configured streak lengths", () => {
    const cfg = { difficultyUpStreak: 2 };
    expect(nextDifficulty({ currentDifficulty: 2, consecutiveCorrect: 2, consecutiveIncorrect: 0 }, { result: "CORRECT", difficulty: 2 }, cfg)).toBe(3);
  });
});

describe("re-test scheduling (§11 're-test later')", () => {
  it("schedules weak topics sooner than strong ones, at the start of a Harare day", () => {
    const practised = new Date("2026-10-05T19:30:00Z"); // 21:30 CAT on the 5th
    expect(retestDueAt(20, "PARTIAL", practised).toISOString()).toBe("2026-10-05T22:00:00.000Z"); // 6th 00:00 CAT
    expect(retestDueAt(50, "PARTIAL", practised).toISOString()).toBe("2026-10-06T22:00:00.000Z");
    expect(retestDueAt(65, "CORRECT", practised).toISOString()).toBe("2026-10-08T22:00:00.000Z");
    expect(retestDueAt(80, "CORRECT", practised).toISOString()).toBe("2026-10-11T22:00:00.000Z");
    expect(retestDueAt(95, "CORRECT", practised).toISOString()).toBe("2026-10-18T22:00:00.000Z");
  });

  it("brings any topic back the next day after an incorrect answer", () => {
    const practised = new Date("2026-10-05T08:00:00Z");
    expect(retestDueAt(95, "INCORRECT", practised).toISOString()).toBe("2026-10-05T22:00:00.000Z");
  });

  it("uses the student's local day near midnight", () => {
    const lateNight = new Date("2026-10-05T22:30:00Z"); // already the 6th in Harare
    expect(retestDueAt(20, "INCORRECT", lateNight).toISOString()).toBe("2026-10-06T22:00:00.000Z");
    expect(retestDueAt(20, "INCORRECT", lateNight, { timeZone: "UTC" }).toISOString()).toBe("2026-10-06T00:00:00.000Z");
  });

  it("is reflected in updateTopicMastery and isRetestDue", () => {
    const weak = updateTopicMastery(null, outcome({ marksAwarded: 0 }));
    expect(weak.nextReviewAt.toISOString()).toBe("2026-10-05T22:00:00.000Z");
    expect(isRetestDue(weak, new Date("2026-10-05T21:59:59Z"))).toBe(false);
    expect(isRetestDue(weak, new Date("2026-10-05T22:00:00Z"))).toBe(true);
  });
});

describe("syllabusProgress (§6, §7)", () => {
  const topic = (id: string, mastery: number | null, lessonsCompleted = 0, lessonsTotal = 0): TopicProgressInput => ({
    id,
    mastery,
    lessonsCompleted,
    lessonsTotal,
  });

  it("defines a completed topic precisely", () => {
    expect(isTopicCompleted(topic("a", 60, 3, 3))).toBe(true); // all lessons + COMPETENT
    expect(isTopicCompleted(topic("a", 59.5, 3, 3))).toBe(true); // rounds to 60
    expect(isTopicCompleted(topic("a", 70, 2, 3))).toBe(false); // lessons outstanding, not STRONG
    expect(isTopicCompleted(topic("a", 75, 0, 3))).toBe(true); // STRONG regardless of lessons
    expect(isTopicCompleted(topic("a", 59, 3, 3))).toBe(false);
    expect(isTopicCompleted(topic("a", null, 3, 3))).toBe(false); // no evidence, never complete
    expect(isTopicCompleted(topic("a", 65, 0, 0))).toBe(true); // practice-only topic
  });

  it("matches the §7 example (Algebra 82, Geometry 64, Statistics 41, Trigonometry 91, Calculus 32)", () => {
    const result = syllabusProgress({
      topics: [
        topic("algebra", 82, 4, 4),
        topic("geometry", 64, 3, 3),
        topic("statistics", 41, 1, 3),
        topic("trigonometry", 91, 2, 2),
        topic("calculus", 32, 0, 5),
        topic("vectors", null, 0, 2),
      ],
    });
    expect(result.totalTopics).toBe(6);
    expect(result.completedTopics).toBe(3); // algebra, geometry, trigonometry
    expect(result.remainingTopics).toBe(3);
    expect(result.coveragePercent).toBe(50);
    expect(result.assessedTopics).toBe(5);
    expect(result.startedTopics).toBe(5);
    expect(result.averageMastery).toBe(62); // (82+64+41+91+32)/5
    expect(result.lessonsCompleted).toBe(10);
    expect(result.lessonsTotal).toBe(19);
    expect(result.weakest.map((t) => t.id)).toEqual(["calculus", "statistics"]);
    expect(result.weakest[0]).toEqual({ id: "calculus", mastery: 32, band: "WEAK" });
    expect(result.strongest.map((t) => t.id)).toEqual(["trigonometry", "algebra"]);
  });

  it("returns honest nulls for an empty or unassessed syllabus", () => {
    expect(syllabusProgress({ topics: [] })).toMatchObject({ totalTopics: 0, coveragePercent: null, averageMastery: null, weakest: [], strongest: [] });
    const unassessed = syllabusProgress({ topics: [topic("a", null, 1, 2), topic("b", null)] });
    expect(unassessed.averageMastery).toBeNull();
    expect(unassessed.coveragePercent).toBe(0);
    expect(unassessed.startedTopics).toBe(1);
  });

  it("limits and orders weakest/strongest deterministically", () => {
    const result = syllabusProgress(
      { topics: [topic("b", 10), topic("a", 10), topic("c", 20), topic("d", 95), topic("e", 95), topic("f", 80)] },
      { listSize: 2 },
    );
    expect(result.weakest.map((t) => t.id)).toEqual(["a", "b"]);
    expect(result.strongest.map((t) => t.id)).toEqual(["d", "e"]);
  });

  it("clamps inconsistent lesson counts and rejects non-finite mastery", () => {
    const result = syllabusProgress({ topics: [topic("a", 50, 9, 3)] });
    expect(result.lessonsCompleted).toBe(3);
    expect(() => syllabusProgress({ topics: [topic("a", Number.NaN)] })).toThrow(RangeError);
  });
});

describe("overallProgress", () => {
  it("weights subjects by topic count", () => {
    const maths = { subjectId: "maths", topics: Array.from({ length: 9 }, (_, i) => ({ id: `m${i}`, mastery: 80, lessonsCompleted: 0, lessonsTotal: 0 })) };
    const physics = { subjectId: "physics", topics: [{ id: "p0", mastery: 20, lessonsCompleted: 0, lessonsTotal: 0 }] };
    const result = overallProgress([maths, physics]);
    expect(result.totalTopics).toBe(10);
    expect(result.completedTopics).toBe(9);
    expect(result.coveragePercent).toBe(90); // not the unweighted (100 + 0) / 2 = 50
    expect(result.averageMastery).toBe(74); // (9×80 + 20) / 10
    expect(result.bySubject.map((s) => [s.subjectId, s.coveragePercent])).toEqual([
      ["maths", 100],
      ["physics", 0],
    ]);
  });

  it("handles no subjects", () => {
    expect(overallProgress([])).toMatchObject({ totalTopics: 0, coveragePercent: null, averageMastery: null, bySubject: [] });
  });
});
