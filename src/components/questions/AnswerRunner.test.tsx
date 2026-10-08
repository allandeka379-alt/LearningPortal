/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
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
import { AnswerRunner, type AnswerInput } from "./AnswerRunner";
import { feedback, html, mcqSingle, shortAnswerQuestion } from "./testing";
import type { PresentedFeedback, PresentedHint } from "./types";

const ATTEMPT = "0199a1b2-0000-7000-8000-cccccccccccc";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  window.sessionStorage.clear();
});

function renderRunner(props: Partial<Parameters<typeof AnswerRunner>[0]> = {}) {
  const answerAction = vi.fn<(input: AnswerInput) => Promise<ActionResult<PresentedFeedback>>>(async () => ({ ok: true, data: feedback() }));
  const user = userEvent.setup();
  render(
    <AnswerRunner
      attemptId={ATTEMPT}
      position={3}
      question={mcqSingle()}
      heading="Question 3 of 10"
      answerAction={answerAction}
      completion={{ href: `/app/practice/${ATTEMPT}/summary`, label: "See your results" }}
      upgradeHref="/pricing"
      {...props}
    />,
  );
  return { user, answerAction: (props.answerAction as typeof answerAction | undefined) ?? answerAction };
}

describe("AnswerRunner", () => {
  it("checks the answer, shows the feedback and loads the next question from the server", async () => {
    const { user, answerAction } = renderRunner();
    const check = screen.getByRole("button", { name: "Check answer" }) as HTMLButtonElement;
    expect(check.disabled).toBe(true);
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(check);
    expect(answerAction).toHaveBeenCalledTimes(1);
    const input = answerAction.mock.calls[0]?.[0];
    expect(input).toMatchObject({ attemptId: ATTEMPT, position: 3, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] }, hintsUsed: 0 });
    expect(typeof input?.timeSpentSeconds).toBe("number");

    const panel = await screen.findByRole("region", { name: "Correct" });
    expect(document.activeElement).toBe(panel);
    expect(screen.queryByRole("button", { name: "Check answer" })).toBeNull();
    // The question is now read-only.
    expect((screen.getByRole("radio", { name: /x = 2/ }) as HTMLInputElement).disabled).toBe(true);
    // The band change is recorded by the server on the attempt: nothing is kept in the browser.
    expect(window.sessionStorage.length).toBe(0);

    await user.click(screen.getByRole("button", { name: "Next question" }));
    expect(router.refresh).toHaveBeenCalledTimes(1);
  });

  it("Enter in a text answer submits it", async () => {
    const { user, answerAction } = renderRunner({ question: shortAnswerQuestion() });
    await user.type(screen.getByRole("textbox", { name: "Your answer" }), "oxygen{Enter}");
    expect(answerAction).toHaveBeenCalledWith(expect.objectContaining({ response: { type: "SHORT_ANSWER", text: "oxygen" } }));
  });

  it("the last answer links to the results", async () => {
    const answerAction = vi.fn(async (): Promise<ActionResult<PresentedFeedback>> => ({ ok: true, data: feedback({ attemptCompleted: true, nextPosition: null }) }));
    const { user } = renderRunner({ answerAction });
    await user.click(screen.getByRole("radio", { name: /x = 3/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    const link = await screen.findByRole("link", { name: "See your results" });
    expect(link.getAttribute("href")).toBe(`/app/practice/${ATTEMPT}/summary`);
  });

  it("a used-up allowance shows a friendly upgrade prompt and keeps the answer", async () => {
    const answerAction = vi.fn(
      async (): Promise<ActionResult<PresentedFeedback>> => ({
        ok: false,
        error: { code: "QUOTA_EXCEEDED", message: "You've reached your plan's limit of 20 practice questions today." },
      }),
    );
    const { user } = renderRunner({ answerAction });
    await user.click(screen.getByRole("radio", { name: /x = -2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("You've reached today's practice limit");
    expect(screen.getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
    expect((screen.getByRole("radio", { name: /x = -2/ }) as HTMLInputElement).checked).toBe(true);
    expect(await screen.findByRole("button", { name: "Check answer" })).toBeTruthy();
  });

  it("a closed session offers a reload instead of a raw error", async () => {
    const answerAction = vi.fn(async (): Promise<ActionResult<PresentedFeedback>> => ({ ok: false, error: { code: "CONFLICT", message: "This attempt has been submitted." } }));
    const { user } = renderRunner({ answerAction });
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    await screen.findByText("This attempt has been submitted.");
    await user.click(screen.getByRole("button", { name: "Reload" }));
    expect(router.refresh).toHaveBeenCalled();
  });

  it("an answer error is announced and linked to the answer controls with aria-describedby", async () => {
    const answerAction = vi.fn(
      async (): Promise<ActionResult<PresentedFeedback>> => ({
        ok: false,
        error: { code: "VALIDATION", message: "Check your answer.", fieldErrors: { response: ["Your answer is too long."] } },
      }),
    );
    const { user } = renderRunner({ question: shortAnswerQuestion(), answerAction });
    const box = screen.getByRole("textbox", { name: "Your answer" });
    await user.type(box, "oxygen");
    await user.click(screen.getByRole("button", { name: "Check answer" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Your answer is too long.");
    expect(alert.id).not.toBe("");
    const describedBy = (box.getAttribute("aria-describedby") ?? "").split(" ");
    expect(describedBy).toContain(alert.id);
    // The question stem stays in the description too.
    expect(describedBy.length).toBeGreaterThan(1);
  });

  it("links the error to a choice question's group, but not plan or session errors", async () => {
    const validation = vi.fn(async (): Promise<ActionResult<PresentedFeedback>> => ({ ok: false, error: { code: "VALIDATION", message: "Choose one answer." } }));
    const { user } = renderRunner({ answerAction: validation });
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    const alert = await screen.findByRole("alert");
    const group = screen.getByRole("group", { name: "Choose one answer" });
    expect((group.getAttribute("aria-describedby") ?? "").split(" ")).toContain(alert.id);
    cleanup();

    const quota = vi.fn(async (): Promise<ActionResult<PresentedFeedback>> => ({ ok: false, error: { code: "QUOTA_EXCEEDED", message: "Limit reached." } }));
    const second = renderRunner({ answerAction: quota });
    await second.user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await second.user.click(screen.getByRole("button", { name: "Check answer" }));
    await screen.findByRole("alert");
    expect(screen.getByRole("group", { name: "Choose one answer" }).getAttribute("aria-describedby")?.split(" ")).toHaveLength(1);
  });

  it("reveals hints one at a time and reports them with the answer", async () => {
    const hintAction = vi.fn(async (): Promise<ActionResult<PresentedHint>> => ({ ok: true, data: { hintNumber: 1, totalHints: 1, html: html("<p>Try factorising.</p>") } }));
    const { user, answerAction } = renderRunner({ question: { ...mcqSingle(), hintCount: 1 }, hintAction });
    expect(screen.getByText("Hints lower the credit you get for this question.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Show a hint" }));
    expect(await screen.findByText("Try factorising.")).toBeTruthy();
    expect(screen.getByText("Hint 1 of 1")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /hint/ })).toBeNull();
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(answerAction).toHaveBeenCalledWith(expect.objectContaining({ hintsUsed: 1 }));
  });

  it("restored feedback (already answered) neither steals focus nor offers 'Check answer'", () => {
    renderRunner({
      initialResponse: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
      initialFeedback: feedback({ attemptCompleted: true }),
      completion: { href: "/app/practice?subjectId=x", label: "Practise more" },
    });
    expect(screen.getByRole("region", { name: "Correct" })).toBeTruthy();
    expect(document.activeElement).toBe(document.body);
    expect(screen.queryByRole("button", { name: "Check answer" })).toBeNull();
    expect(screen.getByRole("link", { name: "Practise more" })).toBeTruthy();
  });

  it("self-assessment replaces the pending mark and keeps the topic context", async () => {
    const pending = feedback({
      status: "PENDING",
      outcome: "pending",
      marksAwarded: null,
      marksAvailable: 4,
      selfAssessment: { maxMarks: 4, points: [{ id: "P1", descriptionHtml: html("Defines the term"), marks: 4 }] },
    });
    const answerAction = vi.fn(async (): Promise<ActionResult<PresentedFeedback>> => ({ ok: true, data: pending }));
    const selfAssessAction = vi.fn(
      async (): Promise<ActionResult<PresentedFeedback>> => ({
        ok: true,
        data: feedback({ status: "SELF_ASSESSED", outcome: "correct", marksAwarded: 4, marksAvailable: 4, topic: null, studyLesson: null, mastery: null }),
      }),
    );
    const { user } = renderRunner({ question: shortAnswerQuestion(), answerAction, selfAssessAction });
    await user.type(screen.getByRole("textbox", { name: "Your answer" }), "my answer");
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    await screen.findByRole("region", { name: "Marking in progress" });
    await user.click(screen.getByRole("checkbox", { name: /Defines the term/ }));
    await user.click(screen.getByRole("button", { name: "Save my mark" }));
    expect(selfAssessAction).toHaveBeenCalledWith({ attemptId: ATTEMPT, position: 3, pointIds: ["P1"], marks: 0 });
    expect(await screen.findByRole("region", { name: "Correct" })).toBeTruthy();
    expect(screen.getByText("· self-marked")).toBeTruthy();
    expect(screen.getByText("Quadratic equations")).toBeTruthy();
  });
});

describe("AnswerRunner headings", () => {
  it("uses the given heading level for the question and its feedback (inside a section with its own h2)", async () => {
    const { user } = renderRunner({ headingLevel: 3 });
    expect(screen.getByRole("heading", { level: 3, name: /Question 3 of 10/ })).toBeTruthy();
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    await screen.findByRole("region", { name: "Correct" });
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(1);
  });
});

describe("AnswerRunner hints after a reload", () => {
  it("shows the hints revealed before the reload, offers the next one and keeps counting them", async () => {
    const hintAction = vi.fn(async (): Promise<ActionResult<PresentedHint>> => ({ ok: true, data: { hintNumber: 2, totalHints: 2, html: html("<p>Then use the formula.</p>") } }));
    const { user, answerAction } = renderRunner({
      question: { ...mcqSingle(), hintCount: 2 },
      hintAction,
      initialHints: [{ hintNumber: 1, totalHints: 2, html: html("<p>Try factorising.</p>") }],
    });
    expect(screen.getByText("Try factorising.")).toBeTruthy();
    expect(screen.getByText("Hint 1 of 2")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Show another hint" }));
    expect(await screen.findByText("Then use the formula.")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /hint/ })).toBeNull();
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(answerAction).toHaveBeenCalledWith(expect.objectContaining({ hintsUsed: 2 }));
  });

  it("explains next to the button when the hints were already used, without blocking the answer", async () => {
    const hintAction = vi.fn(async (): Promise<ActionResult<PresentedHint>> => ({ ok: false, error: { code: "CONFLICT", message: "There are no more hints for this question." } }));
    const { user } = renderRunner({ question: { ...mcqSingle(), hintCount: 1 }, hintAction });
    await user.click(screen.getByRole("button", { name: "Show a hint" }));
    expect(await screen.findByText("There are no more hints for this question.")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /hint/ })).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("button", { name: "Check answer" })).toBeTruthy();
  });
});
