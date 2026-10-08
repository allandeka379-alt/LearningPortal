import { describe, expect, it } from "vitest";
import { nextDifficulty as progressNextDifficulty, type TopicMasteryState } from "@/server/progress/core";
import {
  createRng,
  hashSeed,
  nextDifficulty,
  recommendationsFor,
  selectQuestions,
  shuffled,
  type CandidateQuestion,
  type LessonRef,
  type Recommendation,
  type SelectQuestionsInput,
} from "./core";

const NOW = new Date("2026-10-05T08:00:00Z");
const DAY = 86_400_000;

function state(score: number, overrides: Partial<TopicMasteryState> = {}): TopicMasteryState {
  return {
    score,
    evidenceCount: 20,
    recentAccuracy: score / 100,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0,
    currentDifficulty: 3,
    lastPracticedAt: new Date(NOW.getTime() - DAY),
    nextReviewAt: new Date(NOW.getTime() + DAY),
    ...overrides,
  };
}

/** `perLevel` questions at each difficulty 1–5 for a topic; ids like `alg-d3-1`. */
function topicPool(topicId: string, perLevel = 4, overrides: Partial<CandidateQuestion> = {}): CandidateQuestion[] {
  const out: CandidateQuestion[] = [];
  for (let d = 1; d <= 5; d++) {
    for (let i = 0; i < perLevel; i++) {
      out.push({ id: `${topicId}-d${d}-${i}`, topicId, difficulty: d, marks: d, type: "MCQ", timesSeen: 0, isExamLevel: false, ...overrides });
    }
  }
  return out;
}

function select(overrides: Partial<SelectQuestionsInput> & Pick<SelectQuestionsInput, "pool">) {
  return selectQuestions({
    mastery: new Map(),
    request: { count: 10, difficulty: "adaptive" },
    seed: 42,
    now: NOW,
    ...overrides,
  });
}

describe("seeded randomness", () => {
  it("is deterministic per seed and within [0, 1)", () => {
    const a = createRng("student-1:2026-10-05");
    const b = createRng("student-1:2026-10-05");
    const seqA = Array.from({ length: 50 }, a);
    expect(seqA).toEqual(Array.from({ length: 50 }, b));
    for (const x of seqA) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
    expect(Array.from({ length: 5 }, createRng(1))).not.toEqual(Array.from({ length: 5 }, createRng(2)));
  });

  it("hashes string and numeric seeds", () => {
    expect(hashSeed("abc")).toBe(hashSeed("abc"));
    expect(hashSeed("abc")).not.toBe(hashSeed("abd"));
    expect(hashSeed(7)).toBe(7);
    expect(hashSeed(-1)).toBe(4_294_967_295);
    expect(() => hashSeed(Number.NaN)).toThrow(RangeError);
  });

  it("shuffles into a deterministic permutation without mutating input", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const out = shuffled(input, createRng(9));
    expect(out).toEqual(shuffled(input, createRng(9)));
    expect([...out].sort((x, y) => x - y)).toEqual(input);
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("selectQuestions — basics", () => {
  it("returns exactly `count` unique questions with sequential positions", () => {
    const result = select({ pool: [...topicPool("alg"), ...topicPool("geo")] });
    expect(result.items).toHaveLength(10);
    expect(result.shortfall).toBe(0);
    expect(new Set(result.items.map((i) => i.questionId)).size).toBe(10);
    expect(result.items.map((i) => i.position)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("is deterministic for a seed and independent of pool order", () => {
    const pool = [...topicPool("alg"), ...topicPool("geo"), ...topicPool("prob")];
    const first = select({ pool, seed: "s-1" });
    const again = select({ pool: shuffled(pool, createRng(123)), seed: "s-1" });
    expect(again).toEqual(first);
  });

  it("different seeds can break ties differently", () => {
    const pool = topicPool("alg", 10);
    const selections = new Set(
      Array.from({ length: 6 }, (_, seed) => select({ pool, seed }).items.map((i) => i.questionId).sort().join(",")),
    );
    expect(selections.size).toBeGreaterThan(1);
  });

  it("de-duplicates the pool, honours topicIds and reports shortfall", () => {
    const pool = [...topicPool("alg", 1), ...topicPool("alg", 1), ...topicPool("geo", 1)];
    const result = select({ pool, request: { count: 8, difficulty: "adaptive", topicIds: ["alg"] } });
    expect(result.items).toHaveLength(5);
    expect(result.shortfall).toBe(3);
    expect(result.items.every((i) => i.topicId === "alg")).toBe(true);
  });

  it("handles empty pools and non-positive counts", () => {
    expect(select({ pool: [] })).toEqual({ items: [], shortfall: 10, topics: [] });
    expect(select({ pool: topicPool("alg"), request: { count: 0, difficulty: "adaptive" } }).items).toEqual([]);
    expect(select({ pool: topicPool("alg"), request: { count: -3, difficulty: "adaptive" } }).shortfall).toBe(0);
  });

  it("rejects an invalid clock", () => {
    expect(() => select({ pool: topicPool("alg"), now: new Date(Number.NaN) })).toThrow(RangeError);
  });
});

describe("selectQuestions — §11 adaptive policy", () => {
  it("over-weights weak topics", () => {
    const mastery = new Map([
      ["weak", state(25)],
      ["strong", state(95)],
    ]);
    const result = select({ pool: [...topicPool("weak"), ...topicPool("strong")], mastery, request: { count: 14, difficulty: "adaptive" } });
    const weakCount = result.items.filter((i) => i.topicId === "weak").length;
    const strongCount = result.items.filter((i) => i.topicId === "strong").length;
    expect(weakCount).toBeGreaterThanOrEqual(strongCount * 3);
    expect(strongCount).toBeGreaterThan(0); // strong topics still get maintenance
    expect(result.items.find((i) => i.topicId === "weak")?.reasons).toContain("WEAK_TOPIC");
  });

  it("targets each topic's currentDifficulty", () => {
    const mastery = new Map([["alg", state(70, { currentDifficulty: 4 })]]);
    const result = select({ pool: topicPool("alg", 10), mastery });
    const main = result.items.filter((i) => !i.reasons.includes("WARM_UP"));
    expect(main.every((i) => i.difficulty === 4)).toBe(true);
    expect(main.every((i) => i.reasons.includes("AT_TARGET_DIFFICULTY"))).toBe(true);
  });

  it("reduces difficulty after consecutive misses and says so", () => {
    const mastery = new Map([["alg", state(30, { currentDifficulty: 1, consecutiveIncorrect: 2 })]]);
    const result = select({ pool: topicPool("alg", 10), mastery });
    expect(result.items.every((i) => i.difficulty === 1)).toBe(true);
    expect(result.items[0]?.reasons).toEqual(expect.arrayContaining(["WEAK_TOPIC", "REDUCED_DIFFICULTY"]));
  });

  it("starts new topics at the initial difficulty", () => {
    const result = select({ pool: topicPool("new", 10), request: { count: 3, difficulty: "adaptive" } });
    expect(result.items.every((i) => i.difficulty === 2)).toBe(true);
    expect(result.items[0]?.reasons).toContain("NEW_TOPIC");
    expect(result.topics[0]).toMatchObject({ topicId: "new", band: null, targetDifficulty: 2, allocated: 3 });
  });

  it("introduces exam-level questions only once mastery ≥ 75", () => {
    const pool = [...topicPool("alg", 6), ...topicPool("alg-exam", 2, { topicId: "alg", isExamLevel: true })];
    const competent = select({ pool, mastery: new Map([["alg", state(70, { currentDifficulty: 4 })]]) });
    expect(competent.items.some((i) => i.isExamLevel)).toBe(false);

    const strong = select({ pool, mastery: new Map([["alg", state(80, { currentDifficulty: 4, consecutiveCorrect: 3 })]]) });
    const exam = strong.items.filter((i) => i.isExamLevel);
    expect(exam.length).toBeGreaterThanOrEqual(1);
    expect(exam.every((i) => i.reasons.includes("EXAM_LEVEL_STRETCH"))).toBe(true);
    expect(strong.items[0]?.reasons).toContain("INCREASED_DIFFICULTY");
    // Exam-level questions come last in the topic's run.
    expect(strong.items[strong.items.length - 1]?.isExamLevel).toBe(true);
  });

  it("falls back to exam-level questions only when nothing else is left", () => {
    const pool = [...topicPool("alg", 1), ...topicPool("alg-exam", 2, { topicId: "alg", isExamLevel: true })];
    const result = select({ pool, mastery: new Map([["alg", state(50)]]), request: { count: 8, difficulty: "adaptive" } });
    const exam = result.items.filter((i) => i.isExamLevel);
    expect(exam).toHaveLength(3);
    expect(exam.every((i) => i.reasons.includes("EXAM_LEVEL_FALLBACK"))).toBe(true);
  });

  it("avoids questions seen in the last 7 days unless the pool is exhausted", () => {
    const recent = new Date(NOW.getTime() - 2 * DAY);
    const old = new Date(NOW.getTime() - 8 * DAY);
    const pool = [
      ...topicPool("alg", 2, { lastSeenAt: recent, timesSeen: 1 }).map((q) => ({ ...q, id: `r-${q.id}` })),
      ...topicPool("alg", 1, { lastSeenAt: old, timesSeen: 1 }),
    ];
    const roomy = select({ pool, request: { count: 5, difficulty: "adaptive" } });
    expect(roomy.items.every((i) => !i.questionId.startsWith("r-"))).toBe(true);

    const exhausted = select({ pool, request: { count: 8, difficulty: "adaptive" } });
    const reused = exhausted.items.filter((i) => i.questionId.startsWith("r-"));
    expect(reused).toHaveLength(3);
    expect(reused.every((i) => i.reasons.includes("RECENTLY_SEEN_FALLBACK"))).toBe(true);
  });

  it("prefers fresh questions from other topics over recently seen ones in a weak topic", () => {
    const recent = new Date(NOW.getTime() - DAY);
    const pool = [
      ...topicPool("weak", 1),
      ...topicPool("weak", 2, { lastSeenAt: recent, timesSeen: 1 }).map((q) => ({ ...q, id: `r-${q.id}` })),
      ...topicPool("ok", 4),
    ];
    const mastery = new Map([
      ["weak", state(20)],
      ["ok", state(65)],
    ]);
    const result = select({ pool, mastery, request: { count: 12, difficulty: "adaptive" } });
    expect(result.items.some((i) => i.questionId.startsWith("r-"))).toBe(false);
    expect(result.items.filter((i) => i.topicId === "weak")).toHaveLength(5);
  });

  it("prefers less-exposed questions at equal difficulty", () => {
    const pool = topicPool("alg", 3).map((q, i) => ({ ...q, timesSeen: i % 3, lastSeenAt: new Date(NOW.getTime() - 30 * DAY) }));
    const result = select({ pool, request: { count: 2, difficulty: "adaptive" } });
    // Target difficulty 2 (new topic): the two least-exposed difficulty-2 questions.
    expect(result.items.map((i) => i.questionId).sort()).toEqual(["alg-d2-0", "alg-d2-1"]);

    const older = topicPool("alg", 2).map((q) => ({
      ...q,
      timesSeen: 1,
      lastSeenAt: new Date(NOW.getTime() - (q.id.endsWith("-1") ? 40 : 20) * DAY),
    }));
    const byAge = select({ pool: older, request: { count: 1, difficulty: "adaptive" } });
    expect(byAge.items[0]?.questionId).toBe("alg-d2-1"); // least recently seen wins
  });

  it("boosts topics whose re-test is due", () => {
    const mastery = new Map([
      ["due", state(65, { nextReviewAt: new Date(NOW.getTime() - DAY) })],
      ["later", state(65)],
    ]);
    const result = select({ pool: [...topicPool("due"), ...topicPool("later")], mastery, request: { count: 9, difficulty: "adaptive" } });
    const due = result.topics.find((t) => t.topicId === "due");
    const later = result.topics.find((t) => t.topicId === "later");
    expect(due?.reasons).toContain("RETEST_DUE");
    expect(due?.allocated ?? 0).toBeGreaterThan(later?.allocated ?? 0);
  });

  it("opens adaptive sessions with an easier warm-up question", () => {
    const mastery = new Map([
      ["alg", state(80, { currentDifficulty: 4 })],
      ["geo", state(80, { currentDifficulty: 4 })],
    ]);
    const result = select({ pool: [...topicPool("alg"), ...topicPool("geo")], mastery, request: { count: 10, difficulty: "adaptive" } });
    const [first, second] = result.items;
    expect(first?.reasons).toContain("WARM_UP");
    expect(second?.reasons).toContain("WARM_UP");
    expect(first?.difficulty).toBe(3);
    expect(result.items.slice(2).some((i) => i.reasons.includes("WARM_UP"))).toBe(false);
  });

  it("has no warm-up for short sessions or fixed difficulty modes", () => {
    const mastery = new Map([["alg", state(80, { currentDifficulty: 4 })]]);
    const short = select({ pool: topicPool("alg"), mastery, request: { count: 3, difficulty: "adaptive" } });
    expect(short.items.some((i) => i.reasons.includes("WARM_UP"))).toBe(false);
    const hard = select({ pool: topicPool("alg"), mastery, request: { count: 6, difficulty: "hard" } });
    expect(hard.items.some((i) => i.reasons.includes("WARM_UP"))).toBe(false);
  });

  it("interleaves topics round-robin", () => {
    const result = select({ pool: [...topicPool("a", 2), ...topicPool("b", 2)], request: { count: 6, difficulty: "medium" } });
    const topics = result.items.map((i) => i.topicId);
    for (let i = 1; i < topics.length; i++) expect(topics[i]).not.toBe(topics[i - 1]);
  });
});

describe("selectQuestions — fixed difficulty modes (§10)", () => {
  it("easy picks difficulty 1–2, hard 4–5, medium 3", () => {
    const pool = topicPool("alg", 4);
    const easy = select({ pool, request: { count: 6, difficulty: "easy" } });
    expect(easy.items.every((i) => i.difficulty <= 2 && i.reasons.includes("REQUESTED_DIFFICULTY"))).toBe(true);
    const hard = select({ pool, request: { count: 6, difficulty: "hard" } });
    expect(hard.items.every((i) => i.difficulty >= 4)).toBe(true);
    const medium = select({ pool, request: { count: 4, difficulty: "medium" } });
    expect(medium.items.every((i) => i.difficulty === 3)).toBe(true);
    // Easiest first within the session.
    expect(easy.items.map((i) => i.difficulty)).toEqual([...easy.items.map((i) => i.difficulty)].sort((a, b) => a - b));
  });

  it("falls back to the nearest difficulty when the requested level runs out", () => {
    const result = select({ pool: topicPool("alg", 2), request: { count: 6, difficulty: "medium" } });
    const fallbacks = result.items.filter((i) => i.reasons.includes("DIFFICULTY_FALLBACK"));
    expect(fallbacks).toHaveLength(4);
    expect(fallbacks.every((i) => i.difficulty === 2 || i.difficulty === 4)).toBe(true);
  });

  it("does not gate exam-level questions outside adaptive mode", () => {
    const pool = topicPool("alg", 2, { isExamLevel: true });
    const result = select({ pool, mastery: new Map([["alg", state(30)]]), request: { count: 4, difficulty: "hard" } });
    expect(result.items).toHaveLength(4);
    expect(result.items.every((i) => !i.reasons.includes("EXAM_LEVEL_FALLBACK"))).toBe(true);
  });
});

describe("nextDifficulty re-export", () => {
  it("is the progress/core rule", () => {
    expect(nextDifficulty).toBe(progressNextDifficulty);
  });
});

describe("recommendationsFor (§11)", () => {
  const lessons = (...ids: [string, boolean][]): LessonRef[] => ids.map(([lessonId, completed]) => ({ lessonId, completed }));

  it("starts untouched topics with their first unfinished lesson", () => {
    const recs = recommendationsFor(new Map(), new Map([["alg", lessons(["l1", true], ["l2", false])]]), NOW);
    expect(recs).toEqual([{ kind: "STUDY_LESSON", topicId: "alg", lessonId: "l2", reason: "NOT_STARTED", priority: 40 }]);
  });

  it("suggests initial practice for untouched topics without lessons", () => {
    const recs = recommendationsFor(new Map(), new Map([["alg", []]]), NOW);
    expect(recs[0]).toMatchObject({ kind: "PRACTICE", topicId: "alg", difficulty: 2, reason: "NOT_STARTED" });
  });

  it("for a weak topic: explain via lesson, practise at reduced difficulty, re-test later", () => {
    const mastery = new Map([["prob", state(30, { currentDifficulty: 1 })]]);
    const recs = recommendationsFor(mastery, new Map([["prob", lessons(["p1", true], ["p2", true], ["p3", true], ["p4", false])]]), NOW);
    expect(recs.map((r) => [r.kind, r.reason])).toEqual([
      ["STUDY_LESSON", "CONCEPT_GAP"],
      ["PRACTICE", "WEAK_TOPIC"],
      ["RETEST", "RETEST_SCHEDULED"],
    ]);
    expect(recs[0]).toMatchObject({ lessonId: "p4" }); // §12: "Probability → Lesson 4"
    expect(recs[1]).toMatchObject({ difficulty: 1, count: 10 });
    expect(recs[2]).toMatchObject({ isDue: false, dueAt: new Date(NOW.getTime() + DAY) });
  });

  it("replaces practice with a due re-test and revisits the first lesson when all are done", () => {
    const mastery = new Map([["prob", state(30, { nextReviewAt: new Date(NOW.getTime() - 1) })]]);
    const recs = recommendationsFor(mastery, new Map([["prob", lessons(["p1", true])]]), NOW);
    expect(recs.map((r) => [r.kind, r.reason])).toEqual([
      ["STUDY_LESSON", "CONCEPT_GAP"],
      ["RETEST", "RETEST_DUE"],
    ]);
    expect(recs[0]).toMatchObject({ lessonId: "p1" });
  });

  it("treats repeated errors in an otherwise competent topic as struggling", () => {
    const mastery = new Map([["alg", state(68, { consecutiveIncorrect: 2, currentDifficulty: 2 })]]);
    const recs = recommendationsFor(mastery, new Map([["alg", lessons(["a1", false])]]), NOW);
    expect(recs[0]).toMatchObject({ kind: "STUDY_LESSON", reason: "REPEATED_ERRORS" });
    expect(recs[1]).toMatchObject({ kind: "PRACTICE", reason: "REPEATED_ERRORS", difficulty: 2 });
  });

  it("stretches strong topics and introduces exam-level practice", () => {
    const mastery = new Map([
      ["trig", state(91, { consecutiveCorrect: 4, currentDifficulty: 5 })],
      ["alg", state(82)],
    ]);
    const recs = recommendationsFor(mastery, new Map(), NOW);
    const exam = recs.find((r): r is Extract<Recommendation, { kind: "EXAM_PRACTICE" }> => r.kind === "EXAM_PRACTICE");
    expect(exam?.topicIds).toEqual(["trig", "alg"]);
    expect(recs.find((r) => r.kind === "PRACTICE")).toMatchObject({ topicId: "trig", reason: "STRETCH", difficulty: 5 });
  });

  it("orders weaker work first and respects the limit", () => {
    const mastery = new Map([
      ["calc", state(32)],
      ["stats", state(41)],
      ["geo", state(64)],
      ["trig", state(91, { consecutiveCorrect: 3 })],
    ]);
    const recs = recommendationsFor(mastery, new Map(), NOW, { limit: 3 });
    expect(recs).toHaveLength(3);
    expect(recs[0]).toMatchObject({ kind: "PRACTICE", topicId: "calc" });
    expect(recs[1]).toMatchObject({ kind: "PRACTICE", topicId: "stats" });
    const all = recommendationsFor(mastery, new Map(), NOW, { limit: 50 });
    for (let i = 1; i < all.length; i++) expect((all[i - 1] as Recommendation).priority).toBeGreaterThanOrEqual((all[i] as Recommendation).priority);
  });

  it("returns nothing for no topics", () => {
    expect(recommendationsFor(new Map(), new Map(), NOW)).toEqual([]);
  });
});
