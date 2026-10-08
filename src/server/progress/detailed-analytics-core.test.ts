import { describe, expect, it } from "vitest";
import {
  buildDetailedAnalytics,
  DETAILED_WEEKS,
  TOPIC_TREND_LIMIT,
  trendDirection,
  weekIndexOf,
  windowStart,
  type AttemptAggregateRow,
} from "./detailed-analytics-core";

const TODAY = "2026-10-07";

function row(over: Partial<AttemptAggregateRow>): AttemptAggregateRow {
  return { subjectId: "maths", topicId: "quadratics", difficulty: 3, weekIndex: 0, answered: 0, correct: 0, timed: 0, seconds: 0, ...over };
}

const names = {
  topicNames: new Map([
    ["quadratics", "Quadratic equations"],
    ["vectors", "Vectors"],
  ]),
  subjectNames: new Map([
    ["maths", "Mathematics"],
    ["physics", "Physics"],
  ]),
};

describe("weeks", () => {
  it("buckets local dates into 7-day weeks ending today (index 0 = the last 7 days)", () => {
    expect(windowStart(TODAY)).toBe("2026-08-13");
    expect(weekIndexOf(TODAY, TODAY)).toBe(0);
    expect(weekIndexOf("2026-10-01", TODAY)).toBe(0);
    expect(weekIndexOf("2026-09-30", TODAY)).toBe(1);
    expect(weekIndexOf("2026-08-13", TODAY)).toBe(DETAILED_WEEKS - 1);
    expect(weekIndexOf("2026-08-12", TODAY)).toBeNull();
    expect(weekIndexOf("2026-10-08", TODAY)).toBeNull();
  });

  it("classifies a change of at least 5 points as up or down", () => {
    expect(trendDirection(null)).toBeNull();
    expect(trendDirection(5)).toBe("up");
    expect(trendDirection(4.9)).toBe("steady");
    expect(trendDirection(-5)).toBe("down");
  });
});

describe("buildDetailedAnalytics", () => {
  it("is an honest empty state without answers", () => {
    const empty = buildDetailedAnalytics({ today: TODAY, attempts: [], activity: [], ...names });
    expect(empty.hasAnswers).toBe(false);
    expect(empty.weeks).toHaveLength(DETAILED_WEEKS);
    expect(empty.weeks.every((week) => week.accuracyPercent === null && week.studyMinutes === 0)).toBe(true);
    expect(empty.topics).toEqual([]);
    expect(empty.difficulty.map((d) => [d.label, d.answered, d.accuracyPercent])).toEqual([
      ["Very easy", 0, null],
      ["Easy", 0, null],
      ["Medium", 0, null],
      ["Hard", 0, null],
      ["Very hard", 0, null],
    ]);
    expect(empty.time).toEqual({ secondsPerQuestion: null, timedAnswers: 0, bySubject: [] });
    expect(empty.window).toEqual({ from: "2026-08-13", to: TODAY, weeks: DETAILED_WEEKS });
  });

  it("builds the weekly overview from DailyActivity, oldest week first", () => {
    const result = buildDetailedAnalytics({
      today: TODAY,
      attempts: [],
      activity: [
        { date: TODAY, studySeconds: 1800, questionsAttempted: 10, questionsCorrect: 7 },
        { date: "2026-10-02", studySeconds: 650, questionsAttempted: 10, questionsCorrect: 9 },
        { date: "2026-09-29", studySeconds: 600, questionsAttempted: 4, questionsCorrect: 9 }, // correct clamped to 4
        { date: "2026-07-01", studySeconds: 6000, questionsAttempted: 50, questionsCorrect: 50 }, // outside the window
      ],
      ...names,
    });
    const last = result.weeks.at(-1);
    expect(last).toEqual({ index: 0, from: "2026-10-01", to: TODAY, studyMinutes: 40, questionsAnswered: 20, accuracyPercent: 80 });
    expect(result.weeks.at(-2)).toMatchObject({ index: 1, from: "2026-09-24", to: "2026-09-30", studyMinutes: 10, questionsAnswered: 4, accuracyPercent: 100 });
    expect(result.weeks[0]).toMatchObject({ index: 7, from: "2026-08-13", to: "2026-08-19", studyMinutes: 0, accuracyPercent: null });
  });

  it("shows per-topic trends: weekly accuracy and the change between the recent and earlier halves", () => {
    const result = buildDetailedAnalytics({
      today: TODAY,
      attempts: [
        // Quadratics: earlier half 3/6 (50%), recent half 6/6 (100%).
        row({ weekIndex: 5, answered: 6, correct: 3 }),
        row({ weekIndex: 1, answered: 2, correct: 2, difficulty: 4 }),
        row({ weekIndex: 0, answered: 4, correct: 4, difficulty: 4, timed: 4, seconds: 120 }),
        // Vectors: too few answers in the earlier half for a change.
        row({ topicId: "vectors", subjectId: "physics", weekIndex: 6, answered: 2, correct: 1, timed: 2, seconds: 200 }),
        row({ topicId: "vectors", subjectId: "physics", weekIndex: 0, answered: 9, correct: 3, timed: 0 }),
        // Outside the window: ignored.
        row({ weekIndex: 8, answered: 50, correct: 0 }),
      ],
      activity: [],
      ...names,
    });
    expect(result.hasAnswers).toBe(true);
    expect(result.topics.map((t) => t.topicId)).toEqual(["quadratics", "vectors"]);
    const [quadratics, vectors] = result.topics;
    expect(quadratics).toMatchObject({
      topicName: "Quadratic equations",
      subjectName: "Mathematics",
      answered: 12,
      accuracyPercent: 75,
      recent: { answered: 6, accuracyPercent: 100 },
      earlier: { answered: 6, accuracyPercent: 50 },
      change: 50,
      direction: "up",
    });
    expect(quadratics?.weekly).toEqual([null, null, 50, null, null, null, 100, 100]);
    expect(vectors).toMatchObject({ answered: 11, change: null, direction: null, earlier: { answered: 2, accuracyPercent: 50 } });

    // Accuracy and time by difficulty; time per question only from answers with a measured time.
    const byLevel = Object.fromEntries(result.difficulty.map((d) => [d.difficulty, d]));
    expect(byLevel[3]).toMatchObject({ answered: 17, correct: 7, accuracyPercent: 41.2, secondsPerQuestion: 100 });
    expect(byLevel[4]).toMatchObject({ answered: 6, correct: 6, accuracyPercent: 100, secondsPerQuestion: 30 });
    expect(byLevel[1]).toMatchObject({ answered: 0, accuracyPercent: null, secondsPerQuestion: null });
    expect(result.time.secondsPerQuestion).toBe(53);
    expect(result.time.timedAnswers).toBe(6);
    expect(result.time.bySubject).toEqual([
      { subjectId: "maths", subjectName: "Mathematics", answered: 12, secondsPerQuestion: 30 },
      { subjectId: "physics", subjectName: "Physics", answered: 11, secondsPerQuestion: 100 },
    ]);
  });

  it("lists at most the most-answered topics, ties by id", () => {
    const attempts = Array.from({ length: TOPIC_TREND_LIMIT + 3 }, (_, i) => row({ topicId: `t${String(i).padStart(2, "0")}`, answered: i % 3 === 0 ? 5 : 1, correct: 1 }));
    const result = buildDetailedAnalytics({ today: TODAY, attempts, activity: [], ...names });
    expect(result.topics).toHaveLength(TOPIC_TREND_LIMIT);
    expect(result.topics.slice(0, 4).map((t) => t.topicId)).toEqual(["t00", "t03", "t06", "t09"]);
    expect(result.topics[0]?.topicName).toBe("Topic");
  });
});
