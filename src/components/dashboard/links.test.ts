import { describe, expect, it } from "vitest";
import {
  activityLabel,
  attemptModeLabel,
  greetingText,
  planItemHref,
  practiceHref,
  reasonLabel,
  recommendationActivity,
  recommendationHref,
  recommendationSize,
} from "./links";

describe("dashboard links", () => {
  it("builds practice links with the builder's query contract", () => {
    expect(practiceHref({ subjectId: "s1", topicId: "t1", count: 20 })).toBe("/app/practice?subjectId=s1&topicId=t1&count=20&difficulty=ADAPTIVE");
    expect(practiceHref({ subjectId: "s1", difficulty: "EASY" })).toBe("/app/practice?subjectId=s1&difficulty=EASY");
    expect(practiceHref({ subjectId: "s1", topicId: "t1", count: 0, mode: "RETEST" })).toBe("/app/practice?subjectId=s1&topicId=t1&difficulty=ADAPTIVE&mode=RETEST");
  });

  it("links recommendations; practice links are adaptive and recorded as recommendations", () => {
    expect(recommendationHref({ kind: "PRACTICE", topicId: "t1", questionCount: 20 }, "s1")).toBe(
      "/app/practice?subjectId=s1&topicId=t1&count=20&difficulty=ADAPTIVE&origin=RECOMMENDATION",
    );
    // Re-tests open in RETEST mode (the builder records their origin itself).
    expect(recommendationHref({ kind: "REVIEW", topicId: "t1" }, "s1")).toBe("/app/practice?subjectId=s1&topicId=t1&difficulty=ADAPTIVE&mode=RETEST");
    expect(recommendationHref({ kind: "LESSON", topicId: "t1", lessonId: "abc" }, "s1")).toBe("/app/lessons/abc");
    expect(recommendationHref({ kind: "LESSON", topicId: "t1", lessonId: null }, "s1")).toBe("/app/practice?subjectId=s1&topicId=t1&difficulty=ADAPTIVE&origin=RECOMMENDATION");
    expect(recommendationHref({ kind: "TOPIC_TEST", topicId: "t1" }, "s1")).toBe("/app/exams?subjectId=s1&topicId=t1");
    expect(recommendationHref({ kind: "FLASHCARDS", topicId: "t1" }, "s1")).toBe("/app/flashcards/review?subjectId=s1&topicId=t1");
  });

  it("words recommendation sizes (§6)", () => {
    expect(recommendationSize({ kind: "PRACTICE", questionCount: 20, lessonTitle: null })).toBe("20 questions");
    expect(recommendationSize({ kind: "LESSON", lessonTitle: "Solving quadratics" })).toBe("Solving quadratics");
    expect(recommendationSize({ kind: "LESSON", lessonTitle: null })).toBe("Lesson");
    expect(recommendationSize({ kind: "TOPIC_TEST", lessonTitle: null })).toBe("Topic test");
    expect(recommendationActivity("REVIEW")).toBe("Review");
    expect(recommendationActivity("SOMETHING_NEW")).toBe("Study");
  });

  it("links plan items to where they start", () => {
    const base = { subjectId: "s1", topicId: "t1", lessonId: null, assessmentId: null, targetQuestions: 15 };
    expect(planItemHref({ ...base, activityType: "PRACTICE" })).toBe("/app/practice?subjectId=s1&topicId=t1&count=15&difficulty=ADAPTIVE&origin=PLAN_ITEM");
    expect(planItemHref({ ...base, activityType: "REVIEW" })).toContain("mode=RETEST");
    expect(planItemHref({ ...base, activityType: "LESSON", lessonId: "l1" })).toBe("/app/lessons/l1");
    expect(planItemHref({ ...base, activityType: "LESSON" })).toBe("/app/plan");
    expect(planItemHref({ ...base, activityType: "MOCK_EXAM", assessmentId: "a1" })).toBe("/app/exams/a1");
    expect(planItemHref({ ...base, activityType: "TEST" })).toBe("/app/exams?subjectId=s1");
    expect(planItemHref({ ...base, activityType: "FLASHCARDS" })).toBe("/app/plan");
  });

  it("greets in the student's part of day without inventing a name", () => {
    expect(greetingText("MORNING", "Tariro")).toBe("Good morning, Tariro");
    expect(greetingText("EVENING", "  ")).toBe("Good evening");
    expect(greetingText("AFTERNOON", null)).toBe("Good afternoon");
  });

  it("labels reasons, activities and attempt modes", () => {
    expect(reasonLabel("SPACED_REVIEW")).toBe("Due for review");
    expect(reasonLabel("UNKNOWN")).toBe("Suggested");
    expect(activityLabel("MOCK_EXAM")).toBe("Mock exam");
    expect(attemptModeLabel("TOPIC_TEST")).toBe("Topic test");
  });
});
