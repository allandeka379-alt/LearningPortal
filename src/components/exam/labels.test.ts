import { describe, expect, it } from "vitest";
import { attemptStatusLabel, durationText, marksLine, recommendationTarget, scoreHeadline, submitReasonNote } from "./labels";

describe("exam labels", () => {
  it("describes durations", () => {
    expect(durationText(1800, 0)).toBe("30 min");
    expect(durationText(9000, 2)).toBe("2 papers · 2 h 30 min in total");
    expect(durationText(null, 0)).toBe("No time limit");
  });

  it("writes the §12 headline honestly", () => {
    expect(scoreHeadline({ percentage: 68, isProvisional: false }, false)).toBe("You scored 68%.");
    expect(scoreHeadline({ percentage: 72.7, isProvisional: true }, false)).toBe("Your score so far is 73%.");
    expect(scoreHeadline({ percentage: null, isProvisional: true }, false)).toBe("Your answers are being marked.");
    expect(scoreHeadline(null, true)).toBe("No answers were saved in this attempt.");
    expect(marksLine(34, 50, 0)).toBe("34 of 50 marks");
    expect(marksLine(1, 11, 10)).toBe("1 of 11 marks · 10 marks still being marked");
  });

  it("labels attempt states", () => {
    expect(attemptStatusLabel("MARKED", "STUDENT", false)).toBeNull();
    expect(attemptStatusLabel("MARKED", "TIME_EXPIRED", false)).toEqual({ text: "Submitted when time ran out", tone: "neutral" });
    expect(attemptStatusLabel("AWAITING_MARKING", "STUDENT", true)?.text).toBe("Marking in progress");
    expect(attemptStatusLabel("MARKED", "STUDENT", true)?.text).toBe("Marking in progress");
    expect(attemptStatusLabel("EXPIRED", "TIME_EXPIRED", false)?.text).toBe("Time ran out, nothing answered");
    expect(attemptStatusLabel("IN_PROGRESS", null, false)?.text).toBe("In progress");
    expect(submitReasonNote("TIME_EXPIRED")).toMatch(/submitted automatically/);
    expect(submitReasonNote("STUDENT")).toBeNull();
  });

  it("phrases recommendations as topic → activity", () => {
    expect(recommendationTarget({ kind: "LESSON", topicName: "Probability", lessonTitle: "Lesson 4: Tree diagrams", questionCount: null })).toEqual({
      topic: "Probability",
      action: "Lesson: Lesson 4: Tree diagrams",
    });
    expect(recommendationTarget({ kind: "PRACTICE", topicName: "Statistics", lessonTitle: null, questionCount: 10 })).toEqual({
      topic: "Statistics",
      action: "Practice test (10 questions)",
    });
    expect(recommendationTarget({ kind: "TOPIC_TEST", topicName: null, lessonTitle: null, questionCount: null })).toEqual({ topic: "This topic", action: "Topic test" });
  });
});
