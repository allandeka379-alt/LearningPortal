/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import type { SolveSummary } from "@/server/solver/types";
import { NOT_CONFIGURED_TITLE } from "./labels";
import { SolveHistory } from "./SolveHistory";
import { SolverAvailabilityNotice, SolverQuotaIndicator } from "./SolverNotices";

const archive = async (): Promise<void> => undefined;

function summary(overrides: Partial<SolveSummary> = {}): SolveSummary {
  return {
    id: "0199a1b2-0000-7000-8000-aaaaaaaaaaaa",
    title: "Quadratic equations",
    mode: "TEACH",
    outcome: "COMPLETE",
    hasPhoto: false,
    subjectName: "Mathematics",
    topicName: "Quadratic equations",
    createdAt: new Date("2026-10-05T10:00:00Z"),
    ...overrides,
  };
}

afterEach(cleanup);

describe("SolveHistory", () => {
  it("lists past solves with links, mode, status and a remove control", () => {
    render(
      <SolveHistory
        items={[
          summary(),
          summary({ id: "0199a1b2-0000-7000-8000-bbbbbbbbbbbb", title: "Photo question", mode: "ANSWER", outcome: "UNREADABLE", hasPhoto: true, topicName: null }),
        ]}
        timeZone="Africa/Harare"
        archiveAction={archive}
      />,
    );
    const list = screen.getByRole("list", { name: "Your past questions" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    const first = items[0] as HTMLElement;
    expect(within(first).getByRole("link", { name: "Quadratic equations" }).getAttribute("href")).toBe("/app/solver/0199a1b2-0000-7000-8000-aaaaaaaaaaaa");
    // The topic is not repeated when it is the title.
    expect(within(first).getByText("Mathematics")).toBeTruthy();
    expect(within(first).getByText("Teach me")).toBeTruthy();
    const second = items[1] as HTMLElement;
    expect(within(second).getByText("Full answer")).toBeTruthy();
    expect(within(second).getByText("Couldn't read it")).toBeTruthy();
    expect(within(second).getByText("Photo question.")).toBeTruthy();
    const remove = within(second).getByRole("button", { name: 'Remove "Photo question" from your history' });
    const hidden = remove.closest("form")?.querySelector('input[name="solveId"]') as HTMLInputElement | null;
    expect(hidden?.value).toBe("0199a1b2-0000-7000-8000-bbbbbbbbbbbb");
  });

  it("an honest empty state on the first page, nothing on later pages", () => {
    render(<SolveHistory items={[]} timeZone="Africa/Harare" archiveAction={archive} />);
    expect(screen.getByText("No questions yet")).toBeTruthy();
    cleanup();
    const { container } = render(<SolveHistory items={[]} timeZone="Africa/Harare" archiveAction={archive} emptyState={false} />);
    expect(container.innerHTML).toBe("");
  });
});

describe("SolverAvailabilityNotice / SolverQuotaIndicator", () => {
  it("shows the calm not-configured state, the plan prompt and the exam lock", () => {
    const { rerender } = render(<SolverAvailabilityNotice availability="not_configured" upgradeHref="/pricing" />);
    expect(screen.getByText(NOT_CONFIGURED_TITLE)).toBeTruthy();
    rerender(<SolverAvailabilityNotice availability="not_entitled" upgradeHref="/pricing" />);
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
    rerender(<SolverAvailabilityNotice availability="exam_locked" upgradeHref="/pricing" />);
    expect(screen.getByText("AI help is paused during your exam")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Go to your exam" }).getAttribute("href")).toBe("/app/exams");
    rerender(<SolverAvailabilityNotice availability="ready" upgradeHref="/pricing" />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("shows the allowance left, an upgrade prompt when it is used up, and nothing when unlimited", () => {
    const { rerender, container } = render(<SolverQuotaIndicator quota={{ limit: 10, remaining: 3 }} upgradeHref="/pricing" />);
    expect(screen.getByText("3 of 10 questions left today")).toBeTruthy();
    rerender(<SolverQuotaIndicator quota={{ limit: 10, remaining: 0 }} upgradeHref="/pricing" />);
    expect(screen.getByText("You've used today's solver questions")).toBeTruthy();
    rerender(<SolverQuotaIndicator quota={null} upgradeHref="/pricing" />);
    expect(container.innerHTML).toBe("");
  });
});
