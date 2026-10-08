/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { FeedbackPanel } from "./FeedbackPanel";
import { REPORT_THANKS, ReportProblemButton, type ReportProblemAction } from "./ReportProblem";
import { feedback } from "./testing";

afterEach(() => {
  cleanup();
});

const QUESTION_ID = "0199a1b2-0000-7000-8000-cccccccccccc";
const ATTEMPT_ID = "0199a1b2-0000-7000-8000-dddddddddddd";

describe("ReportProblemButton", () => {
  it("opens a short form, sends the reason and details with the attempt slot, then shows only a calm thank-you", async () => {
    const user = userEvent.setup();
    const action = vi.fn<ReportProblemAction>().mockResolvedValue({ ok: true, data: { received: true } });
    render(<ReportProblemButton action={action} entityType="QUESTION" entityId={QUESTION_ID} attemptId={ATTEMPT_ID} position={3} />);

    await user.click(screen.getByRole("button", { name: "Report a problem" }));
    const form = screen.getByRole("form", { name: "Report a problem" });
    const reason = within(form).getByLabelText("What's wrong with this question?");
    expect(document.activeElement).toBe(reason);

    // A reason is required before anything is sent.
    await user.click(within(form).getByRole("button", { name: "Send report" }));
    expect(action).not.toHaveBeenCalled();
    expect(within(form).getByText("Choose what is wrong.")).toBeTruthy();

    await user.selectOptions(reason, "INCORRECT_MARKING");
    await user.type(within(form).getByLabelText(/Details/), "I wrote 5 cm and it was marked wrong.");
    await user.click(within(form).getByRole("button", { name: "Send report" }));

    expect(action).toHaveBeenCalledWith({
      entityType: "QUESTION",
      entityId: QUESTION_ID,
      reason: "INCORRECT_MARKING",
      details: "I wrote 5 cm and it was marked wrong.",
      attemptId: ATTEMPT_ID,
      position: 3,
    });
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain(REPORT_THANKS));
    expect(screen.queryByRole("form")).toBeNull();
    expect(screen.queryByRole("button", { name: "Report a problem" })).toBeNull();
  });

  it("offers lesson reasons for lessons and keeps the form open with the server's message on failure", async () => {
    const user = userEvent.setup();
    const action = vi.fn<ReportProblemAction>().mockResolvedValue({
      ok: false,
      error: { code: "RATE_LIMITED", message: "You have sent a lot of reports recently. Please try again later." },
    });
    render(<ReportProblemButton action={action} entityType="LESSON" entityId={QUESTION_ID} itemLabel="this lesson" />);
    await user.click(screen.getByRole("button", { name: "Report a problem" }));
    const reason = screen.getByLabelText("What's wrong with this lesson?");
    const values = within(reason).getAllByRole("option").map((option) => option.getAttribute("value"));
    expect(values).not.toContain("INCORRECT_MARKING");
    expect(values).toContain("TYPO_OR_FORMATTING");

    await user.selectOptions(reason, "TYPO_OR_FORMATTING");
    await user.click(screen.getByRole("button", { name: "Send report" }));
    expect(action).toHaveBeenCalledWith({ entityType: "LESSON", entityId: QUESTION_ID, reason: "TYPO_OR_FORMATTING" });
    expect((await screen.findByRole("alert")).textContent).toContain("Please try again later.");
    expect(screen.getByRole("form", { name: "Report a problem" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("form")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Report a problem" })));
  });

  it("is offered at the foot of the feedback panel only when a report target is passed", () => {
    const action = vi.fn<ReportProblemAction>();
    const { rerender } = render(<FeedbackPanel feedback={feedback()} autoFocus={false} announce={false} />);
    expect(screen.queryByRole("button", { name: "Report a problem" })).toBeNull();
    rerender(<FeedbackPanel feedback={feedback()} autoFocus={false} announce={false} report={{ action, entityType: "QUESTION", entityId: QUESTION_ID }} />);
    expect(within(screen.getByRole("region", { name: "Correct" })).getByRole("button", { name: "Report a problem" })).toBeTruthy();
  });
});
