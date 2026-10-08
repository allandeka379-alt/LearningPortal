/** @vitest-environment jsdom */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SanitizedHtml } from "@/lib/content/types";
import type { ReviewQuestionView, TopicReviewItem } from "@/server/cms/review/topics";
import { ItemBadges, ItemBody } from "./TopicItems";

const html = (text: string) => text as SanitizedHtml;

function questionView(overrides: Partial<ReviewQuestionView> = {}): ReviewQuestionView {
  return {
    label: null,
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    marks: 1,
    stemHtml: html("<p>Solve the equation.</p>"),
    options: [
      { key: "A", html: html("x = 2"), isCorrect: true, rationaleHtml: null },
      { key: "B", html: html("x = -2"), isCorrect: false, rationaleHtml: html("<p>Sign error.</p>") },
    ],
    pairs: [],
    blanks: null,
    correctAnswerHtml: html("A"),
    markScheme: [],
    modelAnswerHtml: null,
    specJson: '{\n  "scoring": "all_or_nothing"\n}',
    explanationHtml: html("<p>Because it factorises.</p>"),
    workedSolutionHtml: null,
    hintsHtml: [html("<p>Factorise first.</p>")],
    parts: [],
    ...overrides,
  };
}

const base = { id: "q1", status: "IN_REVIEW" as const, revision: 1, draftOfId: null, aiGenerated: true, isOwnWork: false, author: "Content pipeline", title: "Solve", externalRef: "content:maths:q1" };

describe("TopicItems", () => {
  it("shows a question with its answer, rationales, explanation, hints and marking specification", () => {
    const item: TopicReviewItem = { ...base, entityType: "QUESTION", difficulty: 2, estimatedSeconds: 60, skill: "APPLICATION", isExamStyle: false, isDailyEligible: true, accessTier: "FREE", question: questionView() };
    render(<ItemBody item={item} />);
    const options = screen.getByRole("list", { name: "Options" });
    expect(within(options).getAllByRole("listitem")).toHaveLength(2);
    expect(within(options).getByText("Correct")).toBeTruthy();
    expect(screen.getByText("Sign error.")).toBeTruthy();
    expect(screen.getByText("Because it factorises.")).toBeTruthy();
    expect(screen.getByText("Factorise first.")).toBeTruthy();
    expect(screen.getByText("Marking specification (stored answer key)")).toBeTruthy();
    expect(screen.getByText(/can be a daily question/)).toBeTruthy();
  });

  it("shows structured parts, matching pairs, gaps and mark schemes", () => {
    const view = questionView({
      type: "STRUCTURED",
      options: [],
      correctAnswerHtml: null,
      specJson: null,
      parts: [
        questionView({ label: "(a)", type: "MATCHING", options: [], pairs: [{ leftHtml: html("Nucleus"), rightHtml: html("Controls the cell") }] }),
        questionView({ label: "(b)", type: "FILL_IN_THE_BLANK", options: [], blanks: { templateHtml: html("<p>gap 1</p>"), answers: [{ number: 1, accepted: ["water", "H2O"] }] } }),
        questionView({ label: "(c)", type: "SHORT_ANSWER", markingMode: "MANUAL", options: [], markScheme: [{ id: "M1", descriptionHtml: html("Forms the equation"), marks: 1 }] }),
      ],
    });
    const item: TopicReviewItem = { ...base, entityType: "QUESTION", difficulty: 3, estimatedSeconds: 300, skill: null, isExamStyle: true, isDailyEligible: false, accessTier: "PREMIUM", question: view };
    render(<ItemBody item={item} />);
    expect(screen.getByText("(a)")).toBeTruthy();
    expect(screen.getByText("Controls the cell")).toBeTruthy();
    expect(screen.getByText("Gap 1: water | H2O")).toBeTruthy();
    expect(screen.getByText("Forms the equation")).toBeTruthy();
    expect(screen.getByText("marked against the mark scheme")).toBeTruthy();
  });

  it("shows the workflow badges", () => {
    const item: TopicReviewItem = { ...base, draftOfId: "live", revision: 2, isOwnWork: true, entityType: "FLASHCARD", cardType: "DEFINITION", frontHtml: html("<p>Front</p>"), backHtml: html("<p>Back</p>"), notesHtml: null };
    render(
      <>
        <ItemBadges item={item} />
        <ItemBody item={item} />
      </>,
    );
    expect(screen.getByText("AI-generated")).toBeTruthy();
    expect(screen.getByText("Edit of published (rev. 2)")).toBeTruthy();
    expect(screen.getByText("Your work")).toBeTruthy();
    expect(screen.getByText("Front (definition)")).toBeTruthy();
  });
});
