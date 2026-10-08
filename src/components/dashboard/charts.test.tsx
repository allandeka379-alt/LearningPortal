import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { ActivityChart, axisMaxMinutes } from "./ActivityChart";
import { distributionSegments, MasteryDistribution } from "./MasteryDistribution";
import { ExamCountdownCard } from "./ExamCountdownCard";

describe("activity chart", () => {
  it("rounds the axis to a clean number of minutes", () => {
    expect(axisMaxMinutes(0)).toBe(30);
    expect(axisMaxMinutes(37)).toBe(45);
    expect(axisMaxMinutes(61)).toBe(90);
    expect(axisMaxMinutes(200)).toBe(240);
  });

  it("server-renders bars plus a table with every day", () => {
    const markup = renderToStaticMarkup(
      <ActivityChart
        today="2026-10-05"
        days={[
          { date: "2026-10-04", studyMinutes: 0, questionsAttempted: 0, goalMet: false },
          { date: "2026-10-05", studyMinutes: 30, questionsAttempted: 12, goalMet: true },
        ]}
      />,
    );
    expect(markup).toContain("height:100%");
    expect(markup).toContain("<caption");
    expect((markup.match(/<tr>/g) ?? []).length).toBe(3);
    expect(markup).toContain("Daily goal met");
  });
});

describe("mastery distribution", () => {
  const counts = { NOT_STARTED: 5, WEAK: 2, DEVELOPING: 0, COMPETENT: 1, STRONG: 0, MASTERED: 2 };

  it("orders segments strongest first and drops empty bands", () => {
    const segments = distributionSegments(counts, 10);
    expect(segments.map((s) => s.key)).toEqual(["MASTERED", "COMPETENT", "WEAK", "NOT_STARTED"]);
    expect(segments.reduce((sum, s) => sum + s.percent, 0)).toBeCloseTo(100);
    expect(distributionSegments(counts, 0)).toEqual([]);
  });

  it("writes the counts out as text, not colour alone", () => {
    const markup = renderToStaticMarkup(
      <MasteryDistribution subjects={[{ subjectId: "s1", name: "Mathematics", qualificationName: "O-Level", topicsTotal: 10, assessed: 5, counts }]} />,
    );
    expect(markup).toContain("Mastered 2");
    expect(markup).toContain("Not started 5");
    expect(markup).toContain("5 of 10 topics assessed");
  });
});

describe("exam countdown card (§17)", () => {
  it("states the days and labels provisional and demo dates", () => {
    const markup = renderToStaticMarkup(
      <ExamCountdownCard countdown={{ name: "November 2026", startsOn: "2026-11-02", daysUntil: 28, isProvisional: true, isDemo: true }} />,
    );
    expect(markup).toContain("days until your examination");
    expect(markup).toContain(">28<");
    expect(markup).toContain("Provisional date");
    expect(markup).toContain("Demo date (development only)");
  });

  it("invites the student to set a target when there is none", () => {
    const markup = renderToStaticMarkup(<ExamCountdownCard countdown={null} />);
    expect(markup).toContain("No examination date yet");
    expect(markup).toContain('href="/app/subjects/manage"');
  });

  it("says the target session is under way once it has started (no negative countdown, no 'set a target')", () => {
    const markup = renderToStaticMarkup(
      <ExamCountdownCard
        countdown={{ name: "November 2026", startsOn: "2026-10-01", endsOn: "2026-11-30", daysUntil: -5, isProvisional: true, isDemo: true }}
      />,
    );
    expect(markup).toContain("Your examinations are under way");
    expect(markup).toContain("Change your target exam");
    expect(markup).toContain("Demo date (development only)");
    expect(markup).not.toContain("No examination date yet");
    expect(markup).not.toContain("days until your examination");
    expect(markup).not.toContain(">-5<");
  });
});
