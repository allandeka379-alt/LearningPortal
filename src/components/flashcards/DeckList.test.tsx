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

import { DeckList, type SubjectDeckItem } from "./DeckList";
import type { DeckCounts } from "./types";

const counts = (overrides: Partial<DeckCounts> = {}): DeckCounts => ({
  total: 0,
  due: 0,
  newAvailable: 0,
  learning: 0,
  young: 0,
  mature: 0,
  suspended: 0,
  ...overrides,
});

const SUBJECTS: SubjectDeckItem[] = [
  {
    subjectId: "maths",
    name: "Mathematics",
    entitled: true,
    counts: counts({ total: 30, due: 4, newAvailable: 26, mature: 2, suspended: 1 }),
    personalCards: 2,
    topics: [
      { topicId: "algebra", name: "Algebra", code: "1", counts: counts({ total: 20, due: 4, newAvailable: 16 }) },
      { topicId: "geometry", name: "Geometry", code: "2", counts: counts({ total: 10, mature: 10 }) },
    ],
  },
  { subjectId: "history", name: "History", entitled: false, counts: counts(), personalCards: 0, topics: [] },
  { subjectId: "biology", name: "Biology", entitled: true, counts: counts(), personalCards: 0, topics: [] },
];

afterEach(cleanup);

describe("DeckList", () => {
  it("shows each deck's counts and links the decks with something to review", () => {
    render(<DeckList subjects={SUBJECTS} newRemainingToday={10} focusTopicId="algebra" upgradeHref="/pricing" />);
    const maths = screen.getByRole("region", { name: "Mathematics" });
    expect(within(maths).getByText(/4 due · 10 new · 30 cards · 2 mature/)).toBeTruthy();
    expect(within(maths).getByRole("link", { name: "Review Mathematics" }).getAttribute("href")).toBe("/app/flashcards/review?subjectId=maths");
    expect(within(maths).getByRole("link", { name: "Review Algebra" }).getAttribute("href")).toBe("/app/flashcards/review?subjectId=maths&topicId=algebra");
    expect(within(maths).queryByRole("link", { name: "Review Geometry" })).toBeNull();
    expect(within(maths).getByText("Nothing to review · 10 cards")).toBeTruthy();
    expect(within(maths).getByText("1 hidden")).toBeTruthy();
    expect(within(maths).getByText(/2 cards of your own/)).toBeTruthy();
    expect(document.getElementById("topic-algebra")?.getAttribute("aria-current")).toBe("true");
    expect(within(maths).getByRole("link", { name: "Add a card" }).getAttribute("href")).toBe("/app/flashcards/new?subjectId=maths");
  });

  it("is honest about locked and empty subjects", () => {
    render(<DeckList subjects={SUBJECTS} newRemainingToday={10} upgradeHref="/pricing" />);
    const history = screen.getByRole("region", { name: "History" });
    expect(within(history).getByText("Not included in your plan")).toBeTruthy();
    expect(within(history).getByRole("link", { name: "See plans" }).getAttribute("href")).toBe("/pricing");
    expect(within(history).queryByRole("link", { name: /Review/ })).toBeNull();
    const biology = screen.getByRole("region", { name: "Biology" });
    expect(within(biology).getByText("No flashcards yet")).toBeTruthy();
    expect(within(biology).getByText(/no published flashcards for your syllabus yet/)).toBeTruthy();
  });
});
