/** @vitest-environment jsdom */
import { act, cleanup, render, screen, within } from "@testing-library/react";
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

import { FeedbackPanel, feedbackSummary } from "./FeedbackPanel";
import { feedback, html, reveal } from "./testing";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function liveRegion(): HTMLElement {
  const region = document.querySelector('[aria-live="polite"]');
  if (!(region instanceof HTMLElement)) throw new Error("no live region");
  return region;
}

describe("FeedbackPanel", () => {
  it("correct: marks, the answer, why, the concept, topic, mastery change and the study link", () => {
    render(<FeedbackPanel feedback={feedback()} />);
    const panel = screen.getByRole("region", { name: "Correct" });
    expect(within(panel).getByText("1 of 1 mark")).toBeTruthy();
    expect(within(panel).getByRole("heading", { name: "Correct answer" })).toBeTruthy();
    expect(within(panel).getByText("x = 2")).toBeTruthy();
    expect(within(panel).getByRole("heading", { name: "Why this is the answer" })).toBeTruthy();
    expect(within(panel).getByText("Factorise: (x - 2)(x - 3) = 0.")).toBeTruthy();
    expect(within(panel).getByRole("heading", { name: "Key concept" })).toBeTruthy();
    expect(within(panel).getByText("Quadratic equations")).toBeTruthy();
    expect(within(panel).getByText("Developing")).toBeTruthy();
    expect(within(panel).getByText("Competent")).toBeTruthy();
    const link = within(panel).getByRole("link", { name: /Study this topic/ });
    expect(link.getAttribute("href")).toBe("/app/lessons/0199a1b2-0000-7000-8000-bbbbbbbbbbbb");
    expect(link.textContent).toContain("Solving quadratics");
  });

  it("moves focus to itself and announces the result through a polite live region", () => {
    vi.useFakeTimers();
    render(<FeedbackPanel feedback={feedback({ outcome: "partial", marksAwarded: 1, marksAvailable: 2 })} />);
    const panel = screen.getByRole("region", { name: "Partly correct" });
    expect(document.activeElement).toBe(panel);
    expect(liveRegion().textContent).toBe("");
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(liveRegion().textContent).toBe("Partly correct. 1 of 2 marks.");
  });

  it("can stay quiet (review lists): no focus move, no announcement", () => {
    vi.useFakeTimers();
    render(<FeedbackPanel feedback={feedback({ outcome: "incorrect", marksAwarded: 0 })} autoFocus={false} announce={false} />);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(document.activeElement).toBe(document.body);
    expect(liveRegion().textContent).toBe("");
    expect(screen.getByRole("region", { name: "Incorrect" })).toBeTruthy();
  });

  it("shows marker notes, MCQ rationales and the mark scheme / model answer", () => {
    render(
      <FeedbackPanel
        feedback={feedback({
          outcome: "incorrect",
          marksAwarded: 0,
          notes: ["Include the unit (km/h)."],
          reveal: reveal({
            options: [
              { key: "A", isCorrect: true, rationaleHtml: html("<p>Both factors vanish.</p>") },
              { key: "B", isCorrect: false, rationaleHtml: html("<p>Sign error.</p>") },
            ],
            markScheme: { points: [{ id: "P1", descriptionHtml: html("Defines the term"), marks: 2 }], levels: [] },
            modelAnswerHtml: html("<p>Model answer text.</p>"),
          }),
        })}
      />,
    );
    expect(screen.getByText("Include the unit (km/h).")).toBeTruthy();
    expect(screen.getByText("About each option")).toBeTruthy();
    expect(screen.getByText("Sign error.")).toBeTruthy();
    expect(screen.getByText("Mark scheme")).toBeTruthy();
    expect(screen.getByText("Defines the term")).toBeTruthy();
    expect(screen.getByText("Model answer text.")).toBeTruthy();
  });

  it("per-part results for structured questions", () => {
    render(
      <FeedbackPanel
        feedback={feedback({
          outcome: "partial",
          marksAwarded: 1,
          marksAvailable: 3,
          reveal: reveal({
            correctAnswerHtml: null,
            parts: [
              reveal({ partLabel: "(a)", partResult: { awarded: 1, max: 1, correct: true, pending: false } }),
              reveal({ partLabel: "(b)", correctAnswerHtml: html("5"), partResult: { awarded: 0, max: 2, correct: false, pending: false } }),
            ],
          }),
        })}
      />,
    );
    expect(screen.getByText("(a)")).toBeTruthy();
    expect(screen.getByText("1 of 1 mark")).toBeTruthy();
    expect(screen.getByText("0 of 2 marks")).toBeTruthy();
  });

  it("pending marking with the self-assessment fallback: ticked points are sent, errors are shown", async () => {
    const user = userEvent.setup();
    const onSelfAssess = vi.fn(async () => "Something went wrong.");
    render(
      <FeedbackPanel
        feedback={feedback({
          status: "PENDING",
          outcome: "pending",
          marksAwarded: null,
          marksAvailable: 10,
          mastery: null,
          selfAssessment: {
            maxMarks: 10,
            points: [
              { id: "P1", descriptionHtml: html("Defines renewable energy"), marks: 2 },
              { id: "P2", descriptionHtml: html("Two advantages with examples"), marks: 4 },
            ],
          },
        })}
        onSelfAssess={onSelfAssess}
      />,
    );
    expect(screen.getByRole("region", { name: "Marking in progress" })).toBeTruthy();
    expect(screen.getByText(/Your answer is saved/)).toBeTruthy();
    expect(screen.queryByText("0 of 10 marks")).toBeNull();
    const form = screen.getByRole("group", { name: "Mark your own answer" });
    await user.click(within(form).getByRole("checkbox", { name: /Two advantages/ }));
    expect(screen.getByText("Your mark: 4 of 10 marks")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Save my mark" }));
    expect(onSelfAssess).toHaveBeenCalledWith({ pointIds: ["P2"], marks: 0 });
    expect((await screen.findByRole("alert")).textContent).toBe("Something went wrong.");
  });

  it("without mark-scheme points the student picks a mark", async () => {
    const user = userEvent.setup();
    const onSelfAssess = vi.fn(async () => null);
    render(
      <FeedbackPanel
        feedback={feedback({ status: "PENDING", outcome: "pending", marksAwarded: null, marksAvailable: 3, selfAssessment: { maxMarks: 3, points: [] } })}
        onSelfAssess={onSelfAssess}
      />,
    );
    await user.selectOptions(screen.getByRole("combobox", { name: "Marks you think you earned" }), "2");
    await user.click(screen.getByRole("button", { name: "Save my mark" }));
    expect(onSelfAssess).toHaveBeenCalledWith({ pointIds: [], marks: 2 });
  });

  it("provisional marks and self-marked labels", () => {
    render(<FeedbackPanel feedback={feedback({ status: "NEEDS_REVIEW", outcome: "review", marksAwarded: 2, marksAvailable: 6 })} autoFocus={false} />);
    expect(screen.getByText(/a reviewer will confirm it/)).toBeTruthy();
    cleanup();
    render(<FeedbackPanel feedback={feedback({ status: "SELF_ASSESSED", outcome: "partial", marksAwarded: 4, marksAvailable: 10 })} autoFocus={false} />);
    expect(screen.getByText("· self-marked")).toBeTruthy();
  });

  it("summary text", () => {
    expect(feedbackSummary({ outcome: "correct", marksAwarded: 2, marksAvailable: 2 })).toBe("Correct. 2 of 2 marks.");
    expect(feedbackSummary({ outcome: "pending", marksAwarded: null, marksAvailable: 10 })).toBe("Marking in progress.");
  });
});
