import { describe, expect, it } from "vitest";
import {
  examCountdownText,
  examDateText,
  isOpenItem,
  planItemHref,
  planItemReason,
  planItemSize,
  planItemStatus,
  planItemTitle,
  planReasonGroups,
  shortDayLabel,
  weeklyMinutes,
  type PlanItemCopy,
} from "./plan-copy";

const SUBJECT = "0199a1d2-0000-7000-8000-000000000001";
const TOPIC = "0199a1d2-0000-7000-8000-000000000002";

function item(overrides: Partial<PlanItemCopy> = {}): PlanItemCopy {
  return {
    subjectId: SUBJECT,
    subjectName: "Mathematics",
    topicId: TOPIC,
    topicName: "Quadratic equations",
    lessonId: null,
    lessonTitle: null,
    assessmentId: null,
    assessmentTitle: null,
    activityType: "PRACTICE",
    reason: "WEAK_TOPIC",
    plannerReason: "WEAK_TOPIC_PRACTICE",
    masteryScore: 32,
    daysToExam: null,
    targetMinutes: 20,
    targetQuestions: 10,
    completedQuestions: 0,
    status: "PENDING",
    ...overrides,
  };
}

describe("plan item copy", () => {
  it("names the session, its size and why it is planned (§6 example shape)", () => {
    expect(planItemTitle(item())).toBe("Quadratic equations");
    expect(planItemTitle(item({ activityType: "LESSON", lessonTitle: "Lesson 3: Factorising" }))).toBe("Lesson 3: Factorising");
    expect(planItemTitle(item({ activityType: "MOCK_EXAM", topicName: null }))).toBe("Mock exam");
    expect(planItemTitle(item({ activityType: "DIAGNOSTIC", topicName: null }))).toBe("Diagnostic test");
    expect(planItemSize(item())).toBe("20 min · 10 questions");
    expect(planItemSize(item({ targetQuestions: null, targetMinutes: 75 }))).toBe("1 h 15 min");
    expect(planItemReason(item())).toBe("Weak topic: Quadratic equations (32% mastery).");
    expect(planItemReason(item({ plannerReason: "MOCK_EXAM_CADENCE", daysToExam: 42 }))).toBe(
      "Timed practice under exam conditions, 42 days before your exam.",
    );
    expect(planItemReason(item({ plannerReason: null, reason: "SPACED_REVIEW" }))).toBe("Due for review.");
  });

  it("links each activity to where it starts, never asking the builder for more than 60 questions", () => {
    expect(planItemHref(item())).toBe(`/app/practice?subjectId=${SUBJECT}&topicId=${TOPIC}&count=10&difficulty=ADAPTIVE&origin=PLAN_ITEM`);
    expect(planItemHref(item({ targetQuestions: 90 }))).toContain("count=60");
    expect(planItemHref(item({ activityType: "REVIEW" }))).toContain("mode=RETEST");
    expect(planItemHref(item({ activityType: "LESSON", lessonId: "lesson-1" }))).toBe("/app/lessons/lesson-1");
    expect(planItemHref(item({ activityType: "MOCK_EXAM" }))).toBe(`/app/exams?subjectId=${SUBJECT}`);
    expect(planItemHref(item({ activityType: "DIAGNOSTIC" }))).toBe(`/app/diagnostic?subjectId=${SUBJECT}`);
    expect(planItemHref(item({ activityType: "FLASHCARDS" }))).toBe(`/app/flashcards/review?subjectId=${SUBJECT}`);
  });

  it("labels statuses calmly, with progress for partly done practice", () => {
    expect(planItemStatus(item())).toBeNull();
    expect(planItemStatus(item({ status: "DONE" }))).toEqual({ label: "Done", tone: "success" });
    expect(planItemStatus(item({ status: "PARTIAL", completedQuestions: 6 }))).toEqual({ label: "6 of 10 questions", tone: "info" });
    expect(planItemStatus(item({ status: "MISSED" }))).toEqual({ label: "Not done", tone: "neutral" });
    expect(isOpenItem("MISSED")).toBe(true);
    expect(isOpenItem("SKIPPED")).toBe(false);
  });
});

describe("planReasonGroups (why this plan)", () => {
  it("groups the coming items' reasons, weakest topics first, without inventing anything", () => {
    const groups = planReasonGroups([
      item({ topicName: "Statistics", masteryScore: 41 }),
      item({ topicName: "Calculus", masteryScore: 32 }),
      item({ topicName: "Calculus", masteryScore: 32 }),
      item({ activityType: "LESSON", plannerReason: "NEW_TOPIC_LESSON", topicName: "Algebra", masteryScore: null }),
      item({ activityType: "REVIEW", plannerReason: "SPACED_REVIEW", topicName: "Algebra" }),
      item({ activityType: "MOCK_EXAM", plannerReason: "MOCK_EXAM_CADENCE", topicName: null }),
      item({ activityType: "DIAGNOSTIC", plannerReason: "DIAGNOSTIC_BASELINE", subjectName: "Chemistry", topicName: null }),
    ]);
    expect(groups.map((g) => g.key)).toEqual(["weak", "syllabus", "review", "mocks", "diagnostic"]);
    expect(groups[0]?.detail).toBe("Focused practice where your mastery is lowest: Calculus (32%), Statistics (41%).");
    expect(groups[3]?.detail).toBe("1 timed mock exam in the next two weeks, more often as your exam gets closer.");
    expect(groups[4]?.detail).toContain("Chemistry");
    expect(planReasonGroups([])).toEqual([]);
  });
});

describe("plan-level copy", () => {
  it("labels the exam date honestly", () => {
    expect(examDateText({ examDate: null, exam: null })).toBeNull();
    expect(examDateText({ examDate: "2026-11-02", exam: { name: "November 2026", isProvisional: true, isDemo: false } })).toBe("2 November 2026 (provisional date)");
    expect(examDateText({ examDate: "2026-11-02", exam: { name: "November 2026", isProvisional: true, isDemo: true } })).toBe(
      "2 November 2026 (demo date, development only)",
    );
    expect(examDateText({ examDate: "2026-11-02", exam: null })).toBe("2 November 2026");
    expect(examCountdownText(42)).toBe("42 days until your exam");
    expect(examCountdownText(0)).toBe("Your exam starts today");
    expect(examCountdownText(-3)).toBe("Your exam date has passed");
    expect(examCountdownText(null)).toBeNull();
  });

  it("sums the week and labels days", () => {
    expect(weeklyMinutes({ mon: 60, tue: 45, wed: 0, thu: 30, fri: 30, sat: 90, sun: 30 })).toBe(285);
    expect(shortDayLabel("2026-10-05")).toEqual({ day: "Mon", number: "5" });
    expect(shortDayLabel("2026-10-11")).toEqual({ day: "Sun", number: "11" });
  });
});
