import { describe, expect, it } from "vitest";
import type { TopicNode } from "@/server/curriculum/topics";
import { attachMastery, buildActivitySeries, countdownForSession, masteryDistribution, pickExamCountdown, type CountdownSessionRow } from "./student-overview";

const ZONE = "Africa/Harare";
// 2026-10-05 10:00 in Harare (UTC+2).
const NOW = new Date("2026-10-05T08:00:00.000Z");

function session(id: string, startsOn: string, overrides: Partial<CountdownSessionRow> = {}): CountdownSessionRow {
  const start = new Date(`${startsOn}T00:00:00.000Z`);
  return { id, name: `Session ${id}`, startsOn: start, endsOn: new Date(start.getTime() + 30 * 86_400_000), isProvisional: false, isDemo: false, ...overrides };
}

describe("exam countdown (§17)", () => {
  it("counts whole local days to the first exam day", () => {
    expect(countdownForSession(session("a", "2027-02-06"), ["s1"], NOW, ZONE)).toMatchObject({ daysUntil: 124, startsOn: "2027-02-06", subjectIds: ["s1"] });
    expect(countdownForSession(null, [], NOW, ZONE)).toBeNull();
  });

  it("picks the nearest upcoming target across enrolments and groups shared sessions", () => {
    const near = session("near", "2026-11-02", { isProvisional: true });
    const far = session("far", "2027-06-01");
    const result = pickExamCountdown(
      [
        { subjectId: "maths", session: far },
        { subjectId: "chem", session: near },
        { subjectId: "phys", session: near },
        { subjectId: "bio", session: null },
      ],
      null,
      NOW,
      ZONE,
    );
    expect(result).toMatchObject({ examSessionId: "near", daysUntil: 28, isProvisional: true, subjectIds: ["chem", "phys"] });
  });

  it("ignores sessions that have started and falls back to the onboarding target", () => {
    const past = session("past", "2026-10-01");
    const own = session("own", "2026-10-05");
    expect(pickExamCountdown([{ subjectId: "maths", session: past }], own, NOW, ZONE)).toMatchObject({ examSessionId: "own", daysUntil: 0, subjectIds: [] });
    expect(pickExamCountdown([{ subjectId: "maths", session: past }], past, NOW, ZONE)).toBeNull();
    expect(pickExamCountdown([], null, NOW, ZONE)).toBeNull();
  });

  it("for the dashboard card, falls back to a session under way when nothing is upcoming (one rule with the header)", () => {
    const started = session("started", "2026-10-01"); // runs to 31 October
    const ended = session("ended", "2026-06-01", { endsOn: new Date("2026-06-30T00:00:00.000Z") });
    expect(pickExamCountdown([{ subjectId: "maths", session: started }], null, NOW, ZONE)).toBeNull();
    expect(pickExamCountdown([{ subjectId: "maths", session: started }], null, NOW, ZONE, { includeUnderWay: true })).toMatchObject({
      examSessionId: "started",
      daysUntil: -4,
      subjectIds: ["maths"],
    });
    expect(pickExamCountdown([{ subjectId: "maths", session: ended }], null, NOW, ZONE, { includeUnderWay: true })).toBeNull();
    // Anything upcoming still wins.
    const own = session("own", "2027-06-01");
    expect(pickExamCountdown([{ subjectId: "maths", session: started }], own, NOW, ZONE, { includeUnderWay: true })?.examSessionId).toBe("own");
  });

  it("changes only at local midnight", () => {
    const exam = session("x", "2026-10-07");
    // 23:30 on the 5th in Harare is still the 5th (2 days), 00:30 on the 6th is 1 day.
    expect(pickExamCountdown([], exam, new Date("2026-10-05T21:30:00.000Z"), ZONE)?.daysUntil).toBe(2);
    expect(pickExamCountdown([], exam, new Date("2026-10-05T22:30:00.000Z"), ZONE)?.daysUntil).toBe(1);
  });
});

describe("activity series", () => {
  it("returns one entry per day, oldest first, with real zeros for days without activity", () => {
    const days = buildActivitySeries(
      [
        { date: "2026-10-05", studySeconds: 1830, questionsAttempted: 12, questionsCorrect: 9, xpEarned: 40, dailyGoalMet: true, streakCredited: true, streakFreezeUsed: false },
        { date: "2026-10-03", studySeconds: 59, questionsAttempted: 0, questionsCorrect: 0, xpEarned: 0, dailyGoalMet: false, streakCredited: false, streakFreezeUsed: false },
        { date: "2026-09-01", studySeconds: 999, questionsAttempted: 3, questionsCorrect: 3, xpEarned: 5, dailyGoalMet: true, streakCredited: true, streakFreezeUsed: false },
      ],
      "2026-10-05",
      5,
    );
    expect(days.map((d) => d.date)).toEqual(["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05"]);
    expect(days[4]).toMatchObject({ studyMinutes: 30, questionsAttempted: 12, questionsCorrect: 9, xpEarned: 40, goalMet: true, streakCredited: true });
    expect(days[2]).toMatchObject({ studyMinutes: 0, goalMet: false });
    expect(days[0]).toMatchObject({ studyMinutes: 0, questionsAttempted: 0, xpEarned: 0, goalMet: false });
  });

  it("defaults to a 30-day window ending today", () => {
    const days = buildActivitySeries([], "2026-10-05");
    expect(days).toHaveLength(30);
    expect(days[0]?.date).toBe("2026-09-06");
    expect(days[29]?.date).toBe("2026-10-05");
  });
});

describe("mastery distribution", () => {
  it("counts topics per band with the remainder not started", () => {
    expect(masteryDistribution({ WEAK: 2, STRONG: 1 }, 10)).toEqual({ NOT_STARTED: 7, WEAK: 2, DEVELOPING: 0, COMPETENT: 0, STRONG: 1, MASTERED: 0 });
  });

  it("never reports a negative not-started count", () => {
    expect(masteryDistribution({ MASTERED: 4 }, 3).NOT_STARTED).toBe(0);
    expect(masteryDistribution({}, 0)).toEqual({ NOT_STARTED: 0, WEAK: 0, DEVELOPING: 0, COMPETENT: 0, STRONG: 0, MASTERED: 0 });
  });
});

function node(id: string, children: TopicNode[] = [], overrides: Partial<TopicNode> = {}): TopicNode {
  return {
    id,
    syllabusId: "syl",
    parentId: null,
    kind: children.length ? "TOPIC" : "SUBTOPIC",
    depth: 0,
    path: id,
    sortOrder: 0,
    code: null,
    name: `Topic ${id}`,
    slug: id,
    description: null,
    publicSummary: null,
    metaTitle: null,
    metaDescription: null,
    isPublic: false,
    isOptional: false,
    optionGroup: null,
    examYearFrom: null,
    examYearTo: null,
    estimatedStudyMinutes: null,
    children,
    ...overrides,
  } as TopicNode;
}

describe("topic tree with mastery", () => {
  it("attaches scores to nodes with evidence and keeps the rest not started", () => {
    const tree = [node("algebra", [node("quadratics"), node("linear")]), node("geometry", [], { kind: "TOPIC", isOptional: true })];
    const result = attachMastery(tree, [
      { topicId: "algebra", score: 64.5, band: "COMPETENT", questionsAttempted: 8 },
      { topicId: "quadratics", score: 82, band: "STRONG", questionsAttempted: 5 },
      { topicId: "linear", score: 40, band: "DEVELOPING", questionsAttempted: 0 },
    ]);
    expect(result[0]).toMatchObject({ topicId: "algebra", score: 64.5, band: "COMPETENT", questionsAttempted: 8 });
    expect(result[0]?.children.map((c) => [c.topicId, c.score, c.band])).toEqual([
      ["quadratics", 82, "STRONG"],
      ["linear", null, null],
    ]);
    expect(result[1]).toMatchObject({ topicId: "geometry", score: null, band: null, isOptional: true, children: [] });
  });
});
