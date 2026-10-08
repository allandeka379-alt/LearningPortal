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

import { DiagnosticOfferCard } from "./DiagnosticOfferCard";
import { DiagnosticSummaryCard } from "./DiagnosticSummaryCard";

describe("DiagnosticOfferCard", () => {
  it("invites a student who has not taken the diagnostic to the diagnostic hub", () => {
    const markup = renderToStaticMarkup(<DiagnosticOfferCard status="OFFER" />);
    expect(markup).toContain("Take the free diagnostic");
    expect(markup).toContain('href="/app/diagnostic"');
    expect(markup).toContain("Start the diagnostic");
  });

  it("is a quieter reminder after the student skipped it", () => {
    const markup = renderToStaticMarkup(<DiagnosticOfferCard status="SKIPPED" />);
    expect(markup).not.toContain("Take the free diagnostic");
    expect(markup).toContain("still here when you want it");
    expect(markup).toContain('href="/app/diagnostic"');
  });
});

describe("DiagnosticSummaryCard", () => {
  it("links each result to its diagnostic report", () => {
    const markup = renderToStaticMarkup(
      <DiagnosticSummaryCard
        timeZone="Africa/Harare"
        summaries={[
          {
            subjectId: "s1",
            subjectName: "Mathematics",
            attemptId: "a1",
            completedAt: new Date(Date.UTC(2026, 9, 5, 8)),
            percentage: 55,
            gradeEstimate: null,
            isProvisional: false,
            strongTopics: [],
            weakTopics: [],
          },
        ]}
      />,
    );
    expect(markup).toContain('href="/app/diagnostic/a1/report"');
    expect(markup).not.toContain("/app/exams/attempt/");
  });
});
