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
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element -- test double for next/image
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

import type { SanitizedHtml } from "@/lib/content/types";
import type { SolutionView } from "@/server/solver/types";
import { AI_PRACTICE_LABEL } from "./labels";
import { SolutionDetail } from "./SolutionDetail";
import type { RateSolutionAction } from "./SolutionRating";

const html = (text: string) => `<p>${text}</p>` as SanitizedHtml;
const ID = "0199a1b2-0000-7000-8000-aaaaaaaaaaaa";
const MESSAGE_ID = "0199a1b2-0000-7000-8000-bbbbbbbbbbbb";

function view(overrides: Partial<SolutionView> = {}): SolutionView {
  return {
    id: ID,
    messageId: MESSAGE_ID,
    createdAt: new Date("2026-10-05T10:00:00Z"),
    mode: "TEACH",
    outcome: "COMPLETE",
    title: "Quadratic equations",
    question: { text: "Solve x^2 - 5x + 6 = 0", readHtml: null, imageUrl: null, imageWidth: null, imageHeight: null },
    subject: { id: "s1", name: "Mathematics" },
    topic: { id: "t1", name: "Quadratic equations" },
    unreadableReason: null,
    conceptHtml: html("Factorise into two brackets."),
    steps: [
      { title: "Factorise", explanationHtml: html("Two numbers."), formulaHtml: null, tryThisHtml: html("Try it.") },
      { title: "Solve", explanationHtml: html("Each bracket is zero."), formulaHtml: null, tryThisHtml: null },
    ],
    finalAnswerHtml: html("x = 2 or x = 3"),
    commonMistakesHtml: [html("Mixing up the signs.")],
    similar: {
      bank: [{ id: "q1", stemHtml: html("Solve x^2 - 7x + 12 = 0."), marks: 3 }],
      generatedHtml: [html("Solve x^2 + x - 6 = 0.")],
    },
    practiceHref: "/app/practice?subjectId=s1&topicId=t1&count=5&origin=RECOMMENDATION",
    tutorHref: "/app/tutor/new?subjectId=s1&topicId=t1",
    rating: null,
    ...overrides,
  };
}

const okRate: RateSolutionAction = async () => ({ ok: true, data: null });

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("SolutionDetail", () => {
  it("shows the question, concept, first step, mistakes and similar questions with the AI label", () => {
    render(<SolutionDetail view={view()} rateAction={okRate} />);
    expect(screen.getByText("Solve x^2 - 5x + 6 = 0")).toBeTruthy();
    expect(screen.getByText("Topic: Quadratic equations")).toBeTruthy();
    expect(screen.getByText("Factorise into two brackets.")).toBeTruthy();
    // Teach me: only the first step until the student asks for more.
    expect(screen.getByText("Two numbers.")).toBeTruthy();
    expect(screen.queryByText("Each bracket is zero.")).toBeNull();
    expect(screen.queryByText("x = 2 or x = 3")).toBeNull();
    expect(screen.getByText("Mixing up the signs.")).toBeTruthy();

    const similar = screen.getByRole("region", { name: "Practise similar questions" });
    expect(within(similar).getByText("Solve x^2 - 7x + 12 = 0.")).toBeTruthy();
    expect(within(similar).getByText("3 marks")).toBeTruthy();
    expect(within(similar).getByRole("link", { name: "Practise Quadratic equations" }).getAttribute("href")).toBe(
      "/app/practice?subjectId=s1&topicId=t1&count=5&origin=RECOMMENDATION",
    );
    expect(within(similar).getByText(AI_PRACTICE_LABEL)).toBeTruthy();
    expect(within(similar).getByText("Solve x^2 + x - 6 = 0.")).toBeTruthy();

    expect(screen.getByRole("link", { name: "Ask the tutor" }).getAttribute("href")).toBe("/app/tutor/new?subjectId=s1&topicId=t1");
    expect(screen.getByRole("link", { name: "Ask another question" }).getAttribute("href")).toBe("/app/solver");
  });

  it("shows the whole solution in answer mode", () => {
    render(<SolutionDetail view={view({ mode: "ANSWER" })} rateAction={okRate} />);
    expect(screen.getByText("Each bracket is zero.")).toBeTruthy();
    expect(screen.getByText("x = 2 or x = 3")).toBeTruthy();
    expect(screen.getByText("Full answer")).toBeTruthy();
  });

  it("shows the photo and how the solver read it", () => {
    render(
      <SolutionDetail
        view={view({ question: { text: "", readHtml: html("Find the area of the circle."), imageUrl: "/api/media/solver/2026/10/a.png", imageWidth: 640, imageHeight: 480 } })}
        rateAction={okRate}
      />,
    );
    expect(screen.getByRole("img", { name: "Your photo of the question" }).getAttribute("src")).toBe("/api/media/solver/2026/10/a.png");
    expect(screen.getByText("How the solver read your photo")).toBeTruthy();
    expect(screen.getByText("Find the area of the circle.")).toBeTruthy();
  });

  it("an unreadable photo: the reason and a way forward, no solution", () => {
    render(
      <SolutionDetail
        view={view({ outcome: "UNREADABLE", unreadableReason: "The bottom of the question is cut off.", steps: [], conceptHtml: null, finalAnswerHtml: null, commonMistakesHtml: [], similar: { bank: [], generatedHtml: [] }, practiceHref: null, messageId: MESSAGE_ID })}
        rateAction={okRate}
      />,
    );
    expect(screen.getByText("We couldn't read this question clearly")).toBeTruthy();
    expect(screen.getByText(/The bottom of the question is cut off\./)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Try again" }).getAttribute("href")).toBe("/app/solver");
    expect(screen.queryByRole("region", { name: "Practise similar questions" })).toBeNull();
    expect(screen.queryByText("Was this helpful?")).toBeNull();
  });

  it("a declined or failed solve shows a calm message and never a fabricated answer", () => {
    const empty = { steps: [], conceptHtml: null, finalAnswerHtml: null, commonMistakesHtml: [], similar: { bank: [], generatedHtml: [] }, practiceHref: null };
    render(<SolutionDetail view={view({ outcome: "REFUSED", ...empty })} rateAction={okRate} />);
    expect(screen.getByText("The solver can't help with this one")).toBeTruthy();
    cleanup();
    render(<SolutionDetail view={view({ outcome: "ERROR", ...empty })} rateAction={okRate} />);
    expect(screen.getByText("Something went wrong while solving this question")).toBeTruthy();
    expect(screen.queryByText("The idea behind it")).toBeNull();
  });

  it("records 'Was this helpful?' and clears it when pressed again; reverts on failure", async () => {
    const calls: { messageId: string; rating: 1 | -1 | null }[] = [];
    let fail = false;
    const rateAction: RateSolutionAction = async (input) => {
      calls.push(input);
      return fail ? { ok: false, error: { code: "INTERNAL", message: "x" } } : { ok: true, data: null };
    };
    const user = userEvent.setup();
    render(<SolutionDetail view={view()} rateAction={rateAction} />);
    const yes = screen.getByRole("button", { name: "Yes" });
    await user.click(yes);
    await waitFor(() => expect(screen.getByText("Thanks for the feedback.")).toBeTruthy());
    expect(yes.getAttribute("aria-pressed")).toBe("true");
    await user.click(yes);
    await waitFor(() => expect(screen.getByText("Feedback removed.")).toBeTruthy());
    expect(calls).toEqual([
      { messageId: MESSAGE_ID, rating: 1 },
      { messageId: MESSAGE_ID, rating: null },
    ]);

    fail = true;
    const no = screen.getByRole("button", { name: "No" });
    await user.click(no);
    await waitFor(() => expect(screen.getByText("We couldn't save your feedback. Please try again.")).toBeTruthy());
    expect(no.getAttribute("aria-pressed")).toBe("false");
  });
});
