import { describe, expect, it } from "vitest";
import { recommendationLabel, recommendationReason } from "./recommendations";

describe("recommendation copy", () => {
  it("labels each kind from data and maps reason codes to sentences", () => {
    expect(recommendationLabel({ kind: "LESSON", topicName: "Sets", lessonTitle: "Venn diagrams", questionCount: null, reason: "CONCEPT_GAP" })).toBe(
      "Read the lesson: Venn diagrams",
    );
    expect(recommendationLabel({ kind: "PRACTICE", topicName: "Sets", lessonTitle: null, questionCount: 10, reason: "WEAK_TOPIC" })).toBe("Practise Sets (10 questions)");
    expect(recommendationLabel({ kind: "TOPIC_TEST", topicName: null, lessonTitle: null, questionCount: null, reason: "EXAM_LEVEL_READY" })).toBe(
      "Take a topic test: this topic",
    );
    expect(recommendationReason("RETEST_DUE")).toMatch(/stuck/);
    expect(recommendationReason("SOMETHING_NEW")).toBeNull();
  });

  it("falls back to the topic without a lesson title or count, and names flashcard reviews", () => {
    const base = { topicName: "Quadratics", lessonTitle: null, questionCount: null, reason: "WEAK_TOPIC" };
    expect(recommendationLabel({ ...base, kind: "LESSON" })).toBe("Study Quadratics");
    expect(recommendationLabel({ ...base, kind: "PRACTICE" })).toBe("Practise Quadratics");
    expect(recommendationLabel({ ...base, kind: "FLASHCARDS" })).toBe("Review flashcards: Quadratics");
    expect(recommendationReason("WEAK_TOPIC")).toBe("This is one of your weaker topics.");
  });
});
