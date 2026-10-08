import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import { examAccess, examResultsRedirect, examRoomRedirect, toExamClock, unansweredAsSuch } from "./service";

/** Pure parts of the exams service: plan access (rule 9), where an attempt belongs, the clock snapshot. */

const FULL: Entitlements = {
  ...NO_ENTITLEMENTS,
  lessonAccess: "ALL",
  mockExams: true,
  mockExamsPerMonth: null,
  topicTestsPerWeek: null,
  practiceQuestionsPerDay: null,
};

const base = { accessTier: "FREE" as const, maxAttempts: null, attemptsUsed: 0, openAttemptId: null, usage: {} };

describe("examAccess", () => {
  it("is available when the plan includes the kind, with the remaining allowance when limited", () => {
    expect(examAccess({ ...base, kind: "MOCK_EXAM", entitlements: FULL })).toEqual({ status: "AVAILABLE", allowance: null });
    expect(examAccess({ ...base, kind: "TOPIC_TEST", entitlements: { ...FULL, topicTestsPerWeek: 3 }, usage: { topicTestsPerWeek: 1 } })).toEqual({
      status: "AVAILABLE",
      allowance: { limit: 3, remaining: 2, label: "topic tests left this week" },
    });
    expect(examAccess({ ...base, kind: "SUBJECT_TEST", entitlements: NO_ENTITLEMENTS })).toEqual({ status: "AVAILABLE", allowance: null });
  });

  it("asks to upgrade when the plan lacks the feature or the premium content", () => {
    const mock = examAccess({ ...base, kind: "MOCK_EXAM", entitlements: { ...FULL, mockExams: false } });
    expect(mock).toMatchObject({ status: "UPGRADE", upgradeHref: "/pricing" });
    expect(mock.status === "UPGRADE" && mock.message).toMatch(/mock exams/);
    expect(examAccess({ ...base, kind: "CHAPTER_TEST", accessTier: "PREMIUM", entitlements: { ...FULL, lessonAccess: "FREE_ONLY" } })).toMatchObject({
      status: "UPGRADE",
    });
    expect(examAccess({ ...base, kind: "TOPIC_TEST", entitlements: { ...FULL, topicTestsPerWeek: 0 } })).toMatchObject({ status: "UPGRADE" });
  });

  it("reports a used-up allowance, used-up attempts and an attempt to continue", () => {
    const limited = examAccess({ ...base, kind: "MOCK_EXAM", entitlements: { ...FULL, mockExamsPerMonth: 2 }, usage: { mockExamsPerMonth: 2 } });
    expect(limited).toMatchObject({ status: "LIMIT_REACHED", upgradeHref: "/pricing" });
    expect(limited.status === "LIMIT_REACHED" && limited.message).toMatch(/limit of 2 mock exams this month/);
    expect(examAccess({ ...base, kind: "SUBJECT_TEST", entitlements: FULL, maxAttempts: 1, attemptsUsed: 1 })).toEqual({
      status: "NO_ATTEMPTS_LEFT",
      message: "You've already taken this test.",
    });
    expect(examAccess({ ...base, kind: "SUBJECT_TEST", entitlements: FULL, maxAttempts: 3, attemptsUsed: 3 })).toMatchObject({
      message: "You've used all 3 attempts at this test.",
    });
    // An open attempt wins over everything: the student continues it.
    expect(examAccess({ ...base, kind: "MOCK_EXAM", entitlements: NO_ENTITLEMENTS, openAttemptId: "a1" })).toEqual({ status: "IN_PROGRESS", attemptId: "a1" });
  });
});

describe("where an attempt belongs", () => {
  const view = (mode: string, status: string, feedback: "IMMEDIATE" | "ON_SUBMIT") => ({ id: "a1", mode, status, feedback }) as Parameters<typeof examRoomRedirect>[0];

  it("opens exam-style attempts in the exam room and closed ones on the results page", () => {
    expect(examRoomRedirect(view("MOCK_EXAM", "IN_PROGRESS", "ON_SUBMIT"))).toBeNull();
    expect(examRoomRedirect(view("DIAGNOSTIC", "IN_PROGRESS", "ON_SUBMIT"))).toBeNull();
    expect(examRoomRedirect(view("TOPIC_TEST", "MARKED", "ON_SUBMIT"))).toBe("/app/exams/attempt/a1/results");
    expect(examResultsRedirect(view("TOPIC_TEST", "MARKED", "ON_SUBMIT"))).toBeNull();
    expect(examResultsRedirect(view("MOCK_EXAM", "IN_PROGRESS", "ON_SUBMIT"))).toBe("/app/exams/attempt/a1");
  });

  it("sends diagnostics to their own room and report (§52), except when the report itself loads the results", () => {
    expect(examResultsRedirect(view("DIAGNOSTIC", "AWAITING_MARKING", "ON_SUBMIT"))).toBe("/app/diagnostic/a1/report");
    expect(examResultsRedirect(view("DIAGNOSTIC", "MARKED", "ON_SUBMIT"))).toBe("/app/diagnostic/a1/report");
    expect(examResultsRedirect(view("DIAGNOSTIC", "IN_PROGRESS", "ON_SUBMIT"))).toBe("/app/diagnostic/a1");
    expect(examResultsRedirect(view("DIAGNOSTIC", "MARKED", "ON_SUBMIT"), { diagnosticReport: true })).toBeNull();
    expect(examRoomRedirect(view("DIAGNOSTIC", "MARKED", "ON_SUBMIT"))).toBe("/app/diagnostic/a1/report");
  });

  it("sends practice-style attempts and immediate-feedback tests to the practice runner", () => {
    expect(examRoomRedirect(view("PRACTICE", "IN_PROGRESS", "IMMEDIATE"))).toBe("/app/practice/a1");
    expect(examRoomRedirect(view("QUIZ", "IN_PROGRESS", "IMMEDIATE"))).toBe("/app/practice/a1");
    expect(examRoomRedirect(view("DAILY_QUESTION", "IN_PROGRESS", "IMMEDIATE"))).toBe("/app/daily");
    expect(examResultsRedirect(view("PRACTICE", "MARKED", "IMMEDIATE"))).toBe("/app/practice/a1/summary");
    expect(examResultsRedirect(view("RETEST", "MARKED", "IMMEDIATE"))).toBe("/app/practice/a1/summary");
    expect(examResultsRedirect(view("LESSON_CHECK", "MARKED", "IMMEDIATE"))).toBe("/app/practice/a1/summary");
    expect(examResultsRedirect(view("DAILY_QUESTION", "MARKED", "IMMEDIATE"))).toBe("/app/daily");
    expect(examResultsRedirect(view("QUIZ", "IN_PROGRESS", "IMMEDIATE"))).toBe("/app/practice/a1");
    // A closed immediate-feedback test has its results here (the practice summary sends graded modes here).
    expect(examResultsRedirect(view("QUIZ", "MARKED", "IMMEDIATE"))).toBeNull();
  });
});

describe("unansweredAsSuch", () => {
  it("shows a blank question of an unmarked (expired) attempt as not answered", () => {
    const pending = { position: 1, status: "PENDING", outcome: "pending", marksAwarded: null, marksAvailable: 2 } as unknown as Parameters<typeof unansweredAsSuch>[0];
    expect(unansweredAsSuch(pending, false)).toMatchObject({ outcome: "unanswered", marksAwarded: 0 });
    // An answer waiting for AI marking stays "Marking in progress".
    expect(unansweredAsSuch(pending, true)).toBe(pending);
    expect(unansweredAsSuch(null, false)).toBeNull();
  });
});

describe("toExamClock", () => {
  it("snapshots the server clock with paper clocks in order", () => {
    const now = new Date(Date.UTC(2026, 9, 5, 8));
    const started = new Date(now.getTime() - 60_000);
    expect(
      toExamClock(
        "a1",
        true,
        null,
        [
          { sectionNumber: 2, timeLimitSeconds: 900, startedAt: null, deadlineAt: null, submittedAt: null },
          { sectionNumber: 1, timeLimitSeconds: 600, startedAt: started, deadlineAt: new Date(started.getTime() + 600_000), submittedAt: now },
        ],
        now,
      ),
    ).toEqual({
      attemptId: "a1",
      open: true,
      serverNowMs: now.getTime(),
      deadlineMs: null,
      sections: [
        { sectionNumber: 1, timeLimitSeconds: 600, startedAtMs: started.getTime(), deadlineMs: started.getTime() + 600_000, finishedAtMs: now.getTime() },
        { sectionNumber: 2, timeLimitSeconds: 900, startedAtMs: null, deadlineMs: null, finishedAtMs: null },
      ],
    });
  });
});
