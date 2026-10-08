import { describe, expect, it } from "vitest";
import {
  anonymousPseudonym,
  boardDisplayName,
  boardRowKey,
  buildBoardRows,
  currentPeriods,
  denseRanks,
  isWeekKey,
  metricSupportsScope,
  mockAverage,
  mondayOfWeekKey,
  monthKeysOfWeek,
  monthRange,
  periodKeyFor,
  previousWeekKey,
  weekRange,
  type StudentBoardFacts,
} from "./core";

const facts = (overrides: Partial<StudentBoardFacts> = {}): StudentBoardFacts => ({
  userId: "u1",
  countryId: "zw",
  schoolIds: ["s1"],
  classes: [{ classId: "c1", subjectId: "maths" }],
  weeklyXp: 120,
  weeklyQuestions: 40,
  streak: 5,
  mocks: [],
  mastery: [],
  ...overrides,
});

describe("periods", () => {
  it("maps ISO week keys to their Monday and back, including long years", () => {
    expect(mondayOfWeekKey("2026-W41")).toBe("2026-10-05");
    expect(weekRange("2026-W41")).toEqual({ start: "2026-10-05", end: "2026-10-11" });
    expect(mondayOfWeekKey("2026-W01")).toBe("2025-12-29");
    expect(mondayOfWeekKey("2020-W53")).toBe("2020-12-28");
    expect(isWeekKey("2020-W53")).toBe(true);
    expect(isWeekKey("2026-W53")).toBe(true); // 2026 starts on a Thursday: a long ISO year
    expect(isWeekKey("2025-W53")).toBe(false);
    expect(isWeekKey("2026-W00")).toBe(false);
    expect(isWeekKey("2026-41")).toBe(false);
    expect(() => mondayOfWeekKey("nope")).toThrow(RangeError);
  });

  it("steps back a week across the year boundary", () => {
    expect(previousWeekKey("2026-W41")).toBe("2026-W40");
    expect(previousWeekKey("2026-W01")).toBe("2025-W52");
  });

  it("knows the months a week touches and month ranges", () => {
    expect(monthKeysOfWeek("2026-W41")).toEqual(["2026-10"]);
    expect(monthKeysOfWeek("2026-W40")).toEqual(["2026-09", "2026-10"]);
    expect(monthRange("2026-12")).toEqual({ start: "2026-12-01", endExclusive: "2027-01-01" });
    expect(() => monthRange("2026-13")).toThrow(RangeError);
  });

  it("uses week, month or LIVE period keys per metric", () => {
    const periods = currentPeriods("2026-10-06");
    expect(periods).toEqual({ weekKey: "2026-W41", monthKey: "2026-10" });
    expect(periodKeyFor("WEEKLY_XP", periods)).toBe("2026-W41");
    expect(periodKeyFor("WEEKLY_QUESTIONS", periods)).toBe("2026-W41");
    expect(periodKeyFor("MOCK_AVERAGE", periods)).toBe("2026-10");
    expect(periodKeyFor("STREAK", periods)).toBe("LIVE");
    expect(periodKeyFor("SUBJECT_MASTERY", periods)).toBe("LIVE");
  });

  it("publishes subject mastery only per subject and class", () => {
    expect(metricSupportsScope("SUBJECT_MASTERY", "GLOBAL")).toBe(false);
    expect(metricSupportsScope("SUBJECT_MASTERY", "SUBJECT")).toBe(true);
    expect(metricSupportsScope("WEEKLY_XP", "SUBJECT")).toBe(false);
    expect(metricSupportsScope("MOCK_AVERAGE", "SUBJECT")).toBe(true);
  });
});

describe("mockAverage", () => {
  it("needs the minimum number of mocks and rounds to one decimal", () => {
    expect(mockAverage([80])).toBeNull();
    expect(mockAverage([80, 71])).toBe(75.5);
    expect(mockAverage([80, 70, 61], 3)).toBe(70.3);
    expect(mockAverage([80, Number.NaN, 120])).toBeNull();
    expect(mockAverage([], 0)).toBeNull();
  });
});

describe("buildBoardRows", () => {
  const options = { weekKey: "2026-W41", monthKey: "2026-10" };

  it("puts weekly and streak values on the global, country, school and class boards", () => {
    const rows = buildBoardRows(facts(), options);
    const xp = rows.filter((r) => r.metric === "WEEKLY_XP");
    expect(xp.map((r) => [r.scopeType, r.scopeId])).toEqual([
      ["GLOBAL", null],
      ["COUNTRY", "zw"],
      ["SCHOOL", "s1"],
      ["CLASS", "c1"],
    ]);
    expect(xp.every((r) => r.value === 120 && r.periodKey === "2026-W41" && r.userId === "u1")).toBe(true);
    expect(rows.filter((r) => r.metric === "STREAK").every((r) => r.periodKey === "LIVE" && r.value === 5)).toBe(true);
  });

  it("skips zero values and missing scopes", () => {
    const rows = buildBoardRows(facts({ weeklyXp: 0, weeklyQuestions: 0, streak: 0, countryId: null, schoolIds: [], classes: [] }), options);
    expect(rows).toEqual([]);
  });

  it("averages mocks overall, per subject and per class subject, with the minimum count", () => {
    const rows = buildBoardRows(
      facts({
        classes: [
          { classId: "c1", subjectId: "maths" },
          { classId: "c2", subjectId: null },
          { classId: "c3", subjectId: "physics" },
        ],
        mocks: [
          { subjectId: "maths", percentage: 80 },
          { subjectId: "maths", percentage: 60 },
          { subjectId: "physics", percentage: 90 },
        ],
      }),
      { ...options, metrics: ["MOCK_AVERAGE"] },
    );
    const byScope = Object.fromEntries(rows.map((r) => [`${r.scopeType}:${r.scopeId ?? ""}`, r.value]));
    expect(byScope).toEqual({
      "GLOBAL:": 76.7,
      "COUNTRY:zw": 76.7,
      "SCHOOL:s1": 76.7,
      "CLASS:c1": 70,
      "CLASS:c2": 76.7,
      "SUBJECT:maths": 70,
    });
    expect(rows.every((r) => r.periodKey === "2026-10")).toBe(true);
  });

  it("publishes subject mastery per subject and for classes of that subject", () => {
    const rows = buildBoardRows(
      facts({ mastery: [{ subjectId: "maths", percent: 62.44 }, { subjectId: "physics", percent: 0 }] }),
      { ...options, metrics: ["SUBJECT_MASTERY"] },
    );
    expect(rows.map((r) => [r.scopeType, r.scopeId, r.value, r.periodKey])).toEqual([
      ["SUBJECT", "maths", 62.4, "LIVE"],
      ["CLASS", "c1", 62.4, "LIVE"],
    ]);
  });

  it("never duplicates a board row", () => {
    const rows = buildBoardRows(facts({ schoolIds: ["s1", "s1"], classes: [{ classId: "c1", subjectId: null }, { classId: "c1", subjectId: null }] }), {
      ...options,
      metrics: ["WEEKLY_XP"],
    });
    expect(new Set(rows.map(boardRowKey)).size).toBe(rows.length);
    expect(rows).toHaveLength(4);
  });
});

describe("denseRanks", () => {
  it("gives ties the same rank and the next score the next rank", () => {
    expect(denseRanks([90, 90, 80, 70, 70, 10])).toEqual([1, 1, 2, 3, 3, 4]);
    expect(denseRanks([50, 40], 7)).toEqual([7, 8]);
    expect(denseRanks([])).toEqual([]);
  });
});

describe("names", () => {
  const base = { firstName: "Tendai", lastName: "Moyo", username: "swiftkudu482" };

  it("follows the student's display mode and never exposes more", () => {
    expect(boardDisplayName({ ...base, display: "REAL_NAME" }, "Student #1234")).toBe("Tendai Moyo");
    expect(boardDisplayName({ ...base, display: "FIRST_NAME" }, "Student #1234")).toBe("Tendai M.");
    expect(boardDisplayName({ ...base, display: "USERNAME" }, "Student #1234")).toBe("swiftkudu482");
    expect(boardDisplayName({ ...base, display: "ANONYMOUS" }, "Student #1234")).toBe("Student #1234");
  });

  it("falls back to the pseudonym when the mode cannot be shown", () => {
    expect(boardDisplayName({ firstName: null, lastName: null, username: null, display: "USERNAME" }, "Student #1234")).toBe("Student #1234");
    expect(boardDisplayName({ firstName: " ", lastName: "Moyo", username: null, display: "FIRST_NAME" }, "Student #1234")).toBe("Student #1234");
    expect(boardDisplayName({ firstName: "Rudo", lastName: null, username: null, display: "FIRST_NAME" }, "Student #1234")).toBe("Rudo");
  });

  it("derives a stable four-digit pseudonym from a digest", () => {
    expect(anonymousPseudonym("00000000ffff")).toBe("Student #1000");
    expect(anonymousPseudonym("ffffffff")).toBe(`Student #${1000 + (0xffffffff % 9000)}`);
    expect(anonymousPseudonym("abcdef0123")).toBe(anonymousPseudonym("abcdef0123"));
    expect(() => anonymousPseudonym("xyz")).toThrow(RangeError);
  });
});
