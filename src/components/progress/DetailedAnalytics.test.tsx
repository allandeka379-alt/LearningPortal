/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { buildDetailedAnalytics } from "@/server/progress/detailed-analytics-core";
import { DetailedAnalytics, DetailedAnalyticsLocked, formatSecondsPerQuestion } from "./DetailedAnalytics";

afterEach(() => {
  cleanup();
});

const TODAY = "2026-10-07";

describe("DetailedAnalytics", () => {
  it("renders topic trends, accuracy by difficulty, time per question and the weekly table from real values", () => {
    const data = buildDetailedAnalytics({
      today: TODAY,
      attempts: [
        { subjectId: "s1", topicId: "t1", difficulty: 3, weekIndex: 5, answered: 6, correct: 3, timed: 0, seconds: 0 },
        { subjectId: "s1", topicId: "t1", difficulty: 4, weekIndex: 0, answered: 6, correct: 6, timed: 6, seconds: 270 },
        { subjectId: "s1", topicId: "t2", difficulty: 2, weekIndex: 0, answered: 2, correct: 1, timed: 0, seconds: 0 },
      ],
      activity: [{ date: TODAY, studySeconds: 3000, questionsAttempted: 8, questionsCorrect: 7 }],
      topicNames: new Map([
        ["t1", "Quadratic equations"],
        ["t2", "Vectors"],
      ]),
      subjectNames: new Map([["s1", "Mathematics"]]),
    });
    render(<DetailedAnalytics data={data} />);
    expect(screen.getByRole("heading", { name: "Detailed analytics" })).toBeTruthy();
    expect(screen.getByText("Quadratic equations")).toBeTruthy();
    expect(screen.getByText("Up 50 points")).toBeTruthy();
    expect(screen.getByText("Not enough answers yet")).toBeTruthy();
    expect(screen.getByRole("progressbar", { name: "Hard · 6 answers" })).toBeTruthy();
    expect(screen.getByText("About 45 s per question")).toBeTruthy();
    expect(screen.getByText("Last 7 days")).toBeTruthy();
    expect(screen.getByRole("table")).toBeTruthy();
  });

  it("is an honest empty state without answers, and the locked card loads nothing", () => {
    render(<DetailedAnalytics data={buildDetailedAnalytics({ today: TODAY, attempts: [], activity: [], topicNames: new Map(), subjectNames: new Map() })} />);
    expect(screen.getByText("No marked answers in the last few weeks")).toBeTruthy();
    cleanup();
    render(<DetailedAnalyticsLocked />);
    // Outside the student layout (no offer provided) the prompt is "Get full access" on the unlock page.
    expect(screen.getByRole("link", { name: "Get full access" }).getAttribute("href")).toBe("/app/unlock");
  });

  it("formats seconds per question", () => {
    expect(formatSecondsPerQuestion(null)).toBe("—");
    expect(formatSecondsPerQuestion(44.6)).toBe("45 s");
    expect(formatSecondsPerQuestion(120)).toBe("2 min");
    expect(formatSecondsPerQuestion(95)).toBe("1 min 35 s");
  });
});
