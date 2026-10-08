/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { navigatorItemLabel, QuestionNavigator, type NavigatorGroup } from "./QuestionNavigator";

afterEach(() => {
  cleanup();
});

const groups: NavigatorGroup[] = [
  {
    key: "p1",
    title: "Paper 1",
    statusLabel: "Finished",
    items: [
      { position: 1, answered: true, flagged: false, locked: true },
      { position: 2, answered: false, flagged: true, locked: true },
    ],
  },
  {
    key: "p2",
    title: "Paper 2",
    statusLabel: "In progress",
    items: [
      { position: 3, answered: true, flagged: true, locked: false },
      { position: 4, answered: false, flagged: false, locked: false },
    ],
  },
];

describe("QuestionNavigator", () => {
  it("states answered / unanswered / flagged / locked / current in words, not colour alone", () => {
    render(<QuestionNavigator groups={groups} current={3} onJump={() => {}} />);
    expect(screen.getByRole("button", { name: "Question 1, answered, locked" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Question 2, not answered, flagged for review, locked" })).toBeTruthy();
    const current = screen.getByRole("button", { name: "Question 3, answered, flagged for review, current question" });
    expect(current.getAttribute("aria-current")).toBe("step");
    expect(screen.getByRole("button", { name: "Question 4, not answered" }).getAttribute("aria-current")).toBeNull();
    // Paper headings with their state, and a legend for the icons.
    expect(screen.getByRole("heading", { name: "Paper 1" })).toBeTruthy();
    expect(screen.getByText("Finished")).toBeTruthy();
    const legend = screen.getByRole("list", { name: "Key" });
    for (const text of ["Answered", "Not answered", "Flagged for review", "Current question"]) expect(within(legend).getByText(text)).toBeTruthy();
    expect(navigatorItemLabel({ position: 7, answered: false, flagged: false, locked: false }, false)).toBe("Question 7, not answered");
  });

  it("jumps to a question when its button is pressed", () => {
    const onJump = vi.fn();
    render(<QuestionNavigator groups={groups} current={3} onJump={onJump} currentButtonId="nav-current" />);
    fireEvent.click(screen.getByRole("button", { name: /^Question 4,/ }));
    expect(onJump).toHaveBeenCalledWith(4);
    expect(document.getElementById("nav-current")?.getAttribute("aria-label")).toMatch(/^Question 3,/);
  });

  it("shows one unnamed grid for a paper without sections", () => {
    render(<QuestionNavigator groups={[{ key: "all", title: null, statusLabel: "", items: [{ position: 1, answered: false, flagged: false, locked: false }] }]} current={1} onJump={() => {}} />);
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("region", { name: "Questions" })).toBeTruthy();
  });
});
