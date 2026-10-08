/** @vitest-environment jsdom */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { SanitizedHtml } from "@/lib/content/types";
import type { SolutionStepView } from "@/server/solver/types";
import { SolutionSteps } from "./SolutionSteps";

const html = (text: string) => `<p>${text}</p>` as SanitizedHtml;

const STEPS: SolutionStepView[] = [
  { title: "Factorise", explanationHtml: html("Find two numbers."), formulaHtml: html('<span class="katex">(x-2)(x-3)=0</span>'), tryThisHtml: html("Which two numbers work?") },
  { title: "Set each bracket to zero", explanationHtml: html("Each bracket can be zero."), formulaHtml: null, tryThisHtml: html("What does x-2=0 give?") },
  { title: "Solve", explanationHtml: html("So x is 2 or 3."), formulaHtml: null, tryThisHtml: null },
];
const FINAL = html("x = 2 or x = 3");
const BASE = "/app/solver/0199a1b2-0000-7000-8000-aaaaaaaaaaaa";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function stepTitles(): string[] {
  return screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent ?? "");
}

describe("SolutionSteps", () => {
  it("TEACH: reveals one step at a time, then the final answer, moving focus and announcing each", async () => {
    const replace = vi.spyOn(window.history, "replaceState");
    const user = userEvent.setup();
    render(<SolutionSteps mode="TEACH" steps={STEPS} finalAnswerHtml={FINAL} basePath={BASE} />);

    expect(stepTitles()).toEqual(["1Factorise"]);
    expect(screen.getByText("Step 1 of 3")).toBeTruthy();
    expect(screen.getByText("Which two numbers work?")).toBeTruthy();
    expect(screen.queryByText("x = 2 or x = 3")).toBeNull();
    // A real link: works without JavaScript and keeps the place on reload.
    const next = screen.getByRole("link", { name: "Show next step" });
    expect(next.getAttribute("href")).toBe(`${BASE}?step=2#step-2`);

    await user.click(next);
    expect(stepTitles()).toEqual(["1Factorise", "2Set each bracket to zero"]);
    await waitFor(() => expect(document.activeElement?.id).toBe("step-2-title"));
    expect(screen.getByRole("status").textContent).toBe("Step 2 of 3 shown.");
    expect(replace.mock.calls.at(-1)?.[2]).toBe(`${BASE}?step=2`);

    await user.click(screen.getByRole("link", { name: "Show next step" }));
    expect(stepTitles()).toHaveLength(3);
    expect(screen.queryByRole("link", { name: "Show next step" })).toBeNull();
    const showAnswer = screen.getByRole("link", { name: "Show the final answer" });
    expect(showAnswer.getAttribute("href")).toBe(`${BASE}?step=4#final-answer`);

    await user.click(showAnswer);
    expect(screen.getByText("x = 2 or x = 3")).toBeTruthy();
    await waitFor(() => expect(document.activeElement?.id).toBe("final-answer-title"));
    expect(screen.getByRole("status").textContent).toBe("Final answer shown.");
    expect(screen.queryByRole("link", { name: "Show the final answer" })).toBeNull();
  });

  it("TEACH: resumes from the ?step= deep link", () => {
    render(<SolutionSteps mode="TEACH" steps={STEPS} finalAnswerHtml={FINAL} basePath={BASE} initialRevealed={4} />);
    expect(stepTitles()).toEqual(["1Factorise", "2Set each bracket to zero", "3Solve", "Final answer"]);
  });

  it("TEACH without a final answer stops after the last step", () => {
    render(<SolutionSteps mode="TEACH" steps={STEPS} finalAnswerHtml={null} basePath={BASE} initialRevealed={3} />);
    expect(screen.queryByRole("link", { name: "Show the final answer" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Show next step" })).toBeNull();
  });

  it("ANSWER: the whole worked solution at once, with formulas, and no 'Your turn' prompts", () => {
    const { container } = render(<SolutionSteps mode="ANSWER" steps={STEPS} finalAnswerHtml={FINAL} basePath={BASE} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Worked solution");
    expect(stepTitles()).toEqual(["1Factorise", "2Set each bracket to zero", "3Solve", "Final answer"]);
    expect(container.querySelector(".katex")).not.toBeNull();
    expect(screen.queryByText("Your turn")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders nothing without steps", () => {
    const { container } = render(<SolutionSteps mode="TEACH" steps={[]} finalAnswerHtml={null} basePath={BASE} />);
    expect(container.innerHTML).toBe("");
  });
});
