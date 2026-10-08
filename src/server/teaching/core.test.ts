import { describe, expect, it } from "vitest";
import {
  assignmentDateProblems,
  assignmentWindow,
  assignsToNewMembers,
  attemptWorkHref,
  buildPracticeConfig,
  completionPercent,
  defaultAcademicYear,
  deriveClassSubjectScope,
  formatJoinCode,
  generateJoinCode,
  isAnnouncementLive,
  isVisibleToStudents,
  JOIN_CODE_ALPHABET,
  normalizeJoinCode,
  practiceAudience,
  rosterName,
  selectWeakTopics,
  studentAssignmentView,
  summariseProgress,
  type AssignmentTiming,
} from "./core";

const NOW = new Date("2026-10-05T10:00:00.000Z");
const HOUR = 3_600_000;
const at = (hours: number) => new Date(NOW.getTime() + hours * HOUR);

function timing(overrides: Partial<AssignmentTiming> = {}): AssignmentTiming {
  return { status: "PUBLISHED", publishedAt: at(-24), dueAt: at(72), closesAt: null, allowLateSubmission: true, ...overrides };
}

describe("join codes", () => {
  it("generates codes from the unambiguous alphabet", () => {
    let i = 0;
    const code = generateJoinCode(() => i++ % JOIN_CODE_ALPHABET.length);
    expect(code).toHaveLength(7);
    expect(code).toMatch(/^[A-Z2-9]+$/);
    expect(code).not.toMatch(/[IO01]/);
    expect(() => generateJoinCode(() => 0, 5)).toThrow(RangeError);
  });

  it("normalises typed codes and rejects impossible ones", () => {
    expect(normalizeJoinCode(" abc-def7 ")).toBe("ABCDEF7");
    expect(normalizeJoinCode("abc def 7")).toBe("ABCDEF7");
    expect(normalizeJoinCode("abc")).toBeNull();
    expect(normalizeJoinCode("ABCDEFGHIJK")).toBeNull();
    expect(normalizeJoinCode("ABC$DEF")).toBeNull();
  });

  it("formats codes in two groups", () => {
    expect(formatJoinCode("ABCDEFG")).toBe("ABC DEFG");
    expect(formatJoinCode("ABC")).toBe("ABC");
  });
});

describe("class subject scope (ARCHITECTURE §5.3)", () => {
  it("uses the class subject when there is one", () => {
    expect(deriveClassSubjectScope("s1", ["s2", "s3"])).toEqual({ subjectIds: ["s1"], derived: false });
  });

  it("derives a subject-less class's scope from its assignments, de-duplicated", () => {
    expect(deriveClassSubjectScope(null, ["s3", "s2", "s3"])).toEqual({ subjectIds: ["s2", "s3"], derived: true });
  });

  it("exposes nothing for a subject-less class without work", () => {
    expect(deriveClassSubjectScope(null, [])).toEqual({ subjectIds: [], derived: true });
  });
});

describe("assignment windows", () => {
  it("follows the status, the publication time and the dates", () => {
    expect(assignmentWindow(timing({ status: "DRAFT", publishedAt: null }), NOW)).toBe("DRAFT");
    expect(assignmentWindow(timing({ status: "ARCHIVED" }), NOW)).toBe("ARCHIVED");
    expect(assignmentWindow(timing({ publishedAt: at(2) }), NOW)).toBe("SCHEDULED");
    expect(assignmentWindow(timing(), NOW)).toBe("OPEN");
    expect(assignmentWindow(timing({ dueAt: at(-1) }), NOW)).toBe("PAST_DUE");
    expect(assignmentWindow(timing({ dueAt: at(-1), allowLateSubmission: false }), NOW)).toBe("CLOSED");
    expect(assignmentWindow(timing({ closesAt: at(-1), dueAt: at(-2) }), NOW)).toBe("CLOSED");
    expect(assignmentWindow(timing({ status: "CLOSED" }), NOW)).toBe("CLOSED");
  });

  it("shows students live and closed work, never drafts, scheduled or archived work", () => {
    expect(isVisibleToStudents(timing(), NOW)).toBe(true);
    expect(isVisibleToStudents(timing({ status: "CLOSED" }), NOW)).toBe(true);
    expect(isVisibleToStudents(timing({ publishedAt: at(1) }), NOW)).toBe(false);
    expect(isVisibleToStudents(timing({ status: "DRAFT", publishedAt: null }), NOW)).toBe(false);
    expect(isVisibleToStudents(timing({ status: "ARCHIVED" }), NOW)).toBe(false);
  });
});

describe("student assignment state (late flags)", () => {
  it("flags due-soon, overdue and missed work from the window", () => {
    expect(studentAssignmentView({ status: "NOT_STARTED" }, timing(), NOW)).toMatchObject({ state: "TO_DO", dueSoon: false, canWork: true });
    expect(studentAssignmentView({ status: "NOT_STARTED" }, timing({ dueAt: at(5) }), NOW)).toMatchObject({ state: "TO_DO", dueSoon: true });
    expect(studentAssignmentView({ status: "IN_PROGRESS" }, timing({ dueAt: at(-1) }), NOW)).toMatchObject({ state: "OVERDUE", overdue: true, canWork: true });
    expect(studentAssignmentView({ status: "NOT_STARTED" }, timing({ dueAt: at(-1), allowLateSubmission: false }), NOW)).toMatchObject({
      state: "MISSED",
      canWork: false,
    });
    expect(studentAssignmentView(null, timing({ status: "CLOSED" }), NOW)).toMatchObject({ state: "MISSED" });
  });

  it("keeps handed-in work handed in, marking late submissions", () => {
    expect(studentAssignmentView({ status: "SUBMITTED" }, timing({ dueAt: at(-5) }), NOW)).toMatchObject({ state: "SUBMITTED", late: false });
    expect(studentAssignmentView({ status: "LATE" }, timing({ dueAt: at(-5) }), NOW)).toMatchObject({ state: "LATE", late: true, canWork: true });
    expect(studentAssignmentView({ status: "EXCUSED" }, timing(), NOW)).toMatchObject({ state: "EXCUSED", canWork: false });
  });
});

describe("progress summaries", () => {
  it("counts assigned, started, submitted, late, missed and excused rows", () => {
    const summary = summariseProgress([
      { status: "NOT_STARTED", scorePercent: null },
      { status: "IN_PROGRESS", scorePercent: null },
      { status: "SUBMITTED", scorePercent: 80 },
      { status: "LATE", scorePercent: 50 },
      { status: "SUBMITTED", scorePercent: null },
      { status: "MISSED", scorePercent: null },
      { status: "EXCUSED", scorePercent: 100 },
    ]);
    expect(summary).toEqual({ assigned: 6, started: 4, submitted: 3, late: 1, missed: 1, excused: 1, averageScorePercent: 65 });
    expect(completionPercent(summary)).toBe(50);
  });

  it("is honest about missing evidence", () => {
    const summary = summariseProgress([]);
    expect(summary.averageScorePercent).toBeNull();
    expect(completionPercent(summary)).toBeNull();
  });
});

describe("weak topics", () => {
  const topics = [
    { topicId: "a", topicName: "Algebra", studentsStarted: 10, averageMastery: 45, weakStudents: 6 },
    { topicId: "b", topicName: "Bearings", studentsStarted: 10, averageMastery: 70, weakStudents: 5 },
    { topicId: "c", topicName: "Circles", studentsStarted: 10, averageMastery: 85, weakStudents: 0 },
    { topicId: "d", topicName: "Decimals", studentsStarted: 1, averageMastery: 10, weakStudents: 1 },
  ];

  it("selects low-mastery topics and topics many students struggle with, weakest first", () => {
    const weak = selectWeakTopics(topics);
    expect(weak.map((t) => t.topicId)).toEqual(["a", "b"]);
    expect(weak[1]?.weakSharePercent).toBe(50);
  });

  it("needs enough students with evidence", () => {
    expect(selectWeakTopics(topics, { minStudents: 1 }).map((t) => t.topicId)).toEqual(["d", "a", "b"]);
    expect(selectWeakTopics(topics, { limit: 1 })).toHaveLength(1);
  });
});

describe("practice configuration", () => {
  it("builds immediate-feedback practice and timed papers", () => {
    expect(buildPracticeConfig({ questionCount: 10, difficulty: "ADAPTIVE", topicIds: ["t1", "t1", "t2"] })).toEqual({
      questionCount: 10,
      difficulty: "ADAPTIVE",
      topicIds: ["t1", "t2"],
      feedback: "IMMEDIATE",
      audience: "CLASS",
    });
    expect(buildPracticeConfig({ questionCount: 500, difficulty: "HARD", topicIds: ["t"], timeLimitMinutes: 30, audience: "SELECTED" })).toEqual({
      questionCount: 60,
      difficulty: "HARD",
      topicIds: ["t"],
      timeLimitSeconds: 1800,
      feedback: "ON_SUBMIT",
      audience: "SELECTED",
    });
  });

  it("gives later joiners class-wide work only", () => {
    expect(practiceAudience({ audience: "SELECTED" })).toBe("SELECTED");
    expect(practiceAudience(null)).toBe("CLASS");
    expect(assignsToNewMembers({ type: "PRACTICE", practiceConfig: { audience: "SELECTED" } })).toBe(false);
    expect(assignsToNewMembers({ type: "PRACTICE", practiceConfig: { audience: "CLASS" } })).toBe(true);
    expect(assignsToNewMembers({ type: "ASSESSMENT", practiceConfig: null })).toBe(true);
  });
});

describe("assignment dates", () => {
  it("requires future, ordered dates", () => {
    expect(assignmentDateProblems({ publishedAt: null, dueAt: at(24), closesAt: at(48) }, NOW)).toEqual({});
    expect(assignmentDateProblems({ publishedAt: null, dueAt: at(-1), closesAt: null }, NOW)).toHaveProperty("dueAt");
    expect(assignmentDateProblems({ publishedAt: at(48), dueAt: at(24), closesAt: null }, NOW)).toHaveProperty("dueAt");
    expect(assignmentDateProblems({ publishedAt: null, dueAt: at(24), closesAt: at(12) }, NOW)).toHaveProperty("closesAt");
  });
});

describe("misc", () => {
  it("routes attempts to the right player", () => {
    expect(attemptWorkHref("PRACTICE", "x")).toBe("/app/practice/x");
    expect(attemptWorkHref("TOPIC_TEST", "x")).toBe("/app/exams/attempt/x");
    expect(attemptWorkHref("TIMED_EXAM", "x")).toBe("/app/exams/attempt/x");
  });

  it("knows when an announcement is live", () => {
    expect(isAnnouncementLive({ publishedAt: at(-1), expiresAt: null, archivedAt: null }, NOW)).toBe(true);
    expect(isAnnouncementLive({ publishedAt: at(1), expiresAt: null, archivedAt: null }, NOW)).toBe(false);
    expect(isAnnouncementLive({ publishedAt: at(-2), expiresAt: at(-1), archivedAt: null }, NOW)).toBe(false);
    expect(isAnnouncementLive({ publishedAt: at(-2), expiresAt: null, archivedAt: at(-1) }, NOW)).toBe(false);
    expect(isAnnouncementLive({ publishedAt: null, expiresAt: null, archivedAt: null }, NOW)).toBe(false);
  });

  it("names roster entries without contact details", () => {
    expect(rosterName({ displayName: " Tari ", firstName: "Tariro", lastName: "Moyo" })).toBe("Tari");
    expect(rosterName({ displayName: null, firstName: "Tariro", lastName: "Moyo" })).toBe("Tariro Moyo");
    expect(rosterName(null)).toBe("Student");
    expect(defaultAcademicYear(NOW)).toBe("2026");
  });
});
