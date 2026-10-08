/**
 * Hand-built presented questions and feedback for component tests and UI previews. Content is original placeholder
 * text; HTML is trivially safe markup standing in for the content pipeline's output. Never imported by app code.
 */
import type { SanitizedHtml } from "@/lib/content/types";
import type { PresentedFeedback, PresentedInteraction, PresentedQuestion, PresentedReveal } from "./types";

export const html = (value: string) => value as SanitizedHtml;

let counter = 0;
function nextId(): string {
  counter += 1;
  return `0199a1b2-0000-7000-8000-${String(counter).padStart(12, "0")}`;
}

export function presentedQuestion(interaction: PresentedInteraction, overrides: Partial<PresentedQuestion> = {}): PresentedQuestion {
  return {
    id: nextId(),
    type: interaction.type,
    markingMode: "AUTO",
    marks: 1,
    partLabel: null,
    stemHtml: html("<p>Original test stem.</p>"),
    interaction,
    hintCount: 0,
    calculatorAllowed: null,
    estimatedSeconds: null,
    parts: [],
    ...overrides,
  };
}

export const mcqSingle = () =>
  presentedQuestion({
    type: "MULTIPLE_CHOICE",
    selectMode: "single",
    options: [
      { key: "A", html: html("x = 2"), image: null },
      { key: "B", html: html("x = -2"), image: null },
      { key: "C", html: html("x = 3"), image: null },
    ],
  });

export const mcqMultiple = () =>
  presentedQuestion(
    {
      type: "MULTIPLE_CHOICE",
      selectMode: "multiple",
      options: [
        { key: "A", html: html("Oxygen"), image: null },
        { key: "B", html: html("Nitrogen"), image: null },
        { key: "C", html: html("Argon"), image: null },
      ],
    },
    { marks: 2 },
  );

export const trueFalseQuestion = (style: "true_false" | "yes_no" = "true_false") => presentedQuestion({ type: "TRUE_FALSE", statementStyle: style });

export const shortAnswerQuestion = () => presentedQuestion({ type: "SHORT_ANSWER", maxLength: 40 });

export const numericalQuestion = (fields: { unitHint?: string | null; answerPrefix?: string | null } = {}) =>
  presentedQuestion({ type: "NUMERICAL", unitHint: fields.unitHint ?? null, answerPrefix: fields.answerPrefix ?? null, expectsWorking: false });

export const calculationQuestion = () =>
  presentedQuestion({ type: "CALCULATION", unitHint: "km/h", answerPrefix: null, expectsWorking: true }, { marks: 2, markingMode: "AI_ASSISTED" });

export const matchingQuestion = () =>
  presentedQuestion(
    {
      type: "MATCHING",
      left: [
        { id: "l1", html: html("Mitochondrion"), label: "Mitochondrion" },
        { id: "l2", html: html("Ribosome"), label: "Ribosome" },
      ],
      right: [
        { id: "r2", html: html("Protein synthesis"), label: "Protein synthesis", letter: "A" },
        { id: "r1", html: html("Respiration"), label: "Respiration", letter: "B" },
      ],
    },
    { marks: 2 },
  );

export const fillQuestion = () =>
  presentedQuestion(
    {
      type: "FILL_IN_THE_BLANK",
      blankCount: 3,
      paragraphs: [
        [{ kind: "html", html: html("The capital of Zimbabwe is") }, { kind: "space" }, { kind: "blank", id: "b1", number: 1, input: "text", choices: null }, { kind: "html", html: html(".") }],
        [
          { kind: "html", html: html("Water boils at") },
          { kind: "space" },
          { kind: "blank", id: "b2", number: 2, input: "number", choices: null },
          { kind: "space" },
          { kind: "html", html: html("°C, and ice is") },
          { kind: "space" },
          { kind: "blank", id: "b3", number: 3, input: "select", choices: ["solid", "liquid"] },
          { kind: "html", html: html(".") },
        ],
      ],
    },
    { marks: 3 },
  );

export const diagramQuestion = (wordBank = true) =>
  presentedQuestion(
    {
      type: "DIAGRAM_LABELLING",
      image: { src: "/api/media/test/cell.png", alt: "A plant cell with two numbered parts", width: 800, height: 600 },
      labels: wordBank
        ? [
            { id: "L1", html: html("Nucleus"), label: "Nucleus" },
            { id: "L2", html: html("Cell wall"), label: "Cell wall" },
          ]
        : null,
      hotspots: [
        { id: "h1", number: 1, x: 40, y: 30, w: null, h: null },
        { id: "h2", number: 2, x: 10, y: 60, w: null, h: null },
      ],
    },
    { marks: 2 },
  );

export const essayQuestion = (max = 5) =>
  presentedQuestion({ type: "ESSAY", wordLimit: { min: null, max } }, { marks: 10, markingMode: "AI_ASSISTED" });

export const structuredQuestion = () => {
  const partA = presentedQuestion({ type: "SHORT_ANSWER", maxLength: null }, { partLabel: "(a)", stemHtml: html("<p>Write an expression for the area.</p>") });
  const partB = presentedQuestion(
    { type: "NUMERICAL", unitHint: null, answerPrefix: "x =", expectsWorking: false },
    { partLabel: "(b)", marks: 2, stemHtml: html("<p>The area is 40. Find x.</p>") },
  );
  return { question: presentedQuestion({ type: "STRUCTURED" }, { marks: 3, parts: [partA, partB] }), partA, partB };
};

export function reveal(overrides: Partial<PresentedReveal> = {}): PresentedReveal {
  return {
    questionId: nextId(),
    partLabel: null,
    correctAnswerHtml: html("x = 2"),
    explanationHtml: html("<p>Factorise: (x - 2)(x - 3) = 0.</p>"),
    workedSolutionHtml: null,
    conceptHtml: html("<p>A product is zero when a factor is zero.</p>"),
    options: [],
    markScheme: null,
    modelAnswerHtml: null,
    methodMarks: [],
    partResult: null,
    parts: [],
    ...overrides,
  };
}

export function feedback(overrides: Partial<PresentedFeedback> = {}): PresentedFeedback {
  return {
    position: 1,
    status: "AUTO_MARKED",
    outcome: "correct",
    marksAwarded: 1,
    marksAvailable: 1,
    notes: [],
    reveal: reveal(),
    markerComment: null,
    topic: { id: "0199a1b2-0000-7000-8000-aaaaaaaaaaaa", name: "Quadratic equations" },
    studyLesson: { title: "Solving quadratics", href: "/app/lessons/0199a1b2-0000-7000-8000-bbbbbbbbbbbb", premium: false },
    mastery: { before: "DEVELOPING", after: "COMPETENT", score: 61 },
    selfAssessment: null,
    attemptCompleted: false,
    nextPosition: 2,
    ...overrides,
  };
}
