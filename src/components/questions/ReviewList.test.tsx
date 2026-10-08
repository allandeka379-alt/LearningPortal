/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import type { ActionResult } from "@/server/lib/errors";
import { ReviewList, type ReviewListItem } from "./ReviewList";
import { feedback, html, mcqSingle, shortAnswerQuestion } from "./testing";
import type { PresentedFeedback } from "./types";

const ATTEMPT = "0199a1b2-0000-7000-8000-dddddddddddd";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function items(): ReviewListItem[] {
  return [
    { position: 1, question: mcqSingle(), response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] }, feedback: feedback() },
    {
      position: 2,
      question: shortAnswerQuestion(),
      response: { type: "SHORT_ANSWER", text: "photosynthesis" },
      feedback: feedback({
        status: "PENDING",
        outcome: "pending",
        marksAwarded: null,
        marksAvailable: 4,
        mastery: null,
        selfAssessment: { maxMarks: 4, points: [{ id: "P1", descriptionHtml: html("Names the process"), marks: 4 }] },
      }),
    },
  ];
}

describe("ReviewList self-marking (AI marking not configured)", () => {
  it("opens answers waiting for marking with the form, saves the mark and refreshes the score", async () => {
    const action = vi.fn(
      async (): Promise<ActionResult<PresentedFeedback>> => ({
        ok: true,
        data: feedback({ position: 2, status: "SELF_ASSESSED", outcome: "correct", marksAwarded: 4, marksAvailable: 4, mastery: null }),
      }),
    );
    const user = userEvent.setup();
    const { container } = render(<ReviewList items={items()} selfAssess={{ attemptId: ATTEMPT, action }} />);
    const rows = container.querySelectorAll("details");
    expect(rows[0]?.open).toBe(false);
    expect(rows[1]?.open).toBe(true);
    expect(within(rows[1] as HTMLElement).getByText("Ready for you to mark")).toBeTruthy();
    // The auto-marked answer offers no form.
    expect(within(rows[0] as HTMLElement).queryByRole("button", { name: "Save my mark" })).toBeNull();

    await user.click(screen.getByRole("checkbox", { name: /Names the process/ }));
    await user.click(screen.getByRole("button", { name: "Save my mark" }));
    expect(action).toHaveBeenCalledWith({ attemptId: ATTEMPT, position: 2, pointIds: ["P1"], marks: 0 });
    expect(await screen.findByText("· self-marked")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Save my mark" })).toBeNull();
    expect(router.refresh).toHaveBeenCalledTimes(1);
    expect(rows[1]?.open).toBe(true);
  });

  it("shows the error and keeps the form when saving fails", async () => {
    const action = vi.fn(async (): Promise<ActionResult<PresentedFeedback>> => ({ ok: false, error: { code: "CONFLICT", message: "This answer has already been marked." } }));
    const user = userEvent.setup();
    render(<ReviewList items={items()} selfAssess={{ attemptId: ATTEMPT, action }} />);
    await user.click(screen.getByRole("button", { name: "Save my mark" }));
    expect(await screen.findByText("This answer has already been marked.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save my mark" })).toBeTruthy();
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("without self-marking, shows plain feedback and closed rows", () => {
    const { container } = render(<ReviewList items={items()} />);
    expect([...container.querySelectorAll("details")].every((row) => !row.open)).toBe(true);
    expect(screen.queryByText("Ready for you to mark")).toBeNull();
    expect(screen.queryByRole("button", { name: "Save my mark" })).toBeNull();
  });
});
