import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { SanitizedHtml } from "@/lib/content/types";
import { toAnswerReveal, toStudentView, type QuestionRecord, type QuestionType } from "@/lib/questions";
import type { AnswerFeedback } from "@/server/attempts";
import { sampleQuestion, type SampleQuestion } from "../../../tests/factories/questions";
import {
  normalizeResponse,
  partResultsFrom,
  presentAnswerFeedback,
  presentQuestion,
  presentReveal,
  presentSlotFeedback,
  splitFillTemplate,
} from "./present";

/** A QuestionRecord (DB-row shape) built from a pure sample definition. */
function record(type: QuestionType, overrides: Partial<SampleQuestion> = {}): QuestionRecord {
  const sample = sampleQuestion(type, overrides);
  const toRecord = (q: SampleQuestion, partOrder?: number, partLabel?: string): QuestionRecord => ({
    id: randomUUID(),
    type: q.type,
    markingMode: q.markingMode,
    stem: q.stem,
    payload: q.payload,
    answerSpec: q.answerSpec,
    marks: q.marks,
    explanation: q.explanation,
    hints: q.hints,
    options: q.options,
    ...(partOrder !== undefined ? { partOrder, partLabel: partLabel ?? null } : {}),
    parts: q.parts.map((part, index) => toRecord(part, index, part.partLabel)),
  });
  return toRecord(sample);
}

const asset = (id: string) =>
  id === "0199a1b2-0000-7000-8000-000000000ddd" ? { src: "/api/media/content/diagram.png", width: 800, height: 600, alt: "Cell diagram" } : null;

describe("presentQuestion", () => {
  it("renders the stem and MCQ options server-side (KaTeX) and never includes answer data", () => {
    const question = record("MULTIPLE_CHOICE");
    const presented = presentQuestion(toStudentView(question));
    expect(presented.stemHtml).toContain("katex");
    expect(presented.interaction.type).toBe("MULTIPLE_CHOICE");
    if (presented.interaction.type !== "MULTIPLE_CHOICE") return;
    expect(presented.interaction.options.map((o) => o.key).sort()).toEqual(["A", "B", "C", "D"]);
    expect(presented.interaction.options[0]?.html).toContain("katex");
    const json = JSON.stringify(presented);
    expect(json).not.toContain("isCorrect");
    expect(json).not.toContain("Sign error when factorising");
    expect(json).not.toContain("Original explanation");
    expect(json).not.toContain("Original hint");
    expect(presented.hintCount).toBe(1);
  });

  it("uses the write-time HTML cache when present", () => {
    const question = { ...record("TRUE_FALSE"), renderedHtml: { stem: "<p>cached stem</p>" } };
    expect(presentQuestion(toStudentView(question)).stemHtml).toBe("<p>cached stem</p>");
  });

  it("matching: inline HTML plus plain-text labels and letters for the selects", () => {
    const presented = presentQuestion(toStudentView(record("MATCHING")));
    if (presented.interaction.type !== "MATCHING") throw new Error("expected MATCHING");
    expect(presented.interaction.left.map((i) => i.label)).toEqual(["Mitochondrion", "Ribosome", "Nucleus"]);
    expect(presented.interaction.right.map((i) => i.letter)).toEqual(["A", "B", "C", "D"]);
    expect(presented.interaction.right.map((i) => i.label).sort()).toEqual(["Holds genetic material", "Photosynthesis", "Protein synthesis", "Respiration"]);
  });

  it("fill-in-the-blank: the template is split around real blanks", () => {
    const presented = presentQuestion(toStudentView(record("FILL_IN_THE_BLANK")));
    if (presented.interaction.type !== "FILL_IN_THE_BLANK") throw new Error("expected FILL_IN_THE_BLANK");
    expect(presented.interaction.blankCount).toBe(2);
    const blanks = presented.interaction.paragraphs.flat().filter((s) => s.kind === "blank");
    expect(blanks).toEqual([
      { kind: "blank", id: "b1", number: 1, input: "text", choices: null },
      { kind: "blank", id: "b2", number: 2, input: "number", choices: null },
    ]);
    expect(JSON.stringify(presented)).not.toContain("{{blank");
  });

  it("diagram labelling: resolves the image and numbers the hotspots; a missing image is null", () => {
    const view = toStudentView(
      record("DIAGRAM_LABELLING", {
        payload: {
          mediaAssetId: "0199a1b2-0000-7000-8000-000000000ddd",
          labels: [
            { id: "L1", text: "Nucleus" },
            { id: "L2", text: "Cell membrane" },
          ],
          hotspots: [
            { id: "h1", x: 42.5, y: 30 },
            { id: "h2", x: 10, y: 50 },
          ],
        },
        answerSpec: { hotspots: [{ hotspotId: "h1", labelId: "L1" }, { hotspotId: "h2", labelId: "L2" }] },
      }),
    );
    const presented = presentQuestion(view, asset);
    if (presented.interaction.type !== "DIAGRAM_LABELLING") throw new Error("expected DIAGRAM_LABELLING");
    expect(presented.interaction.image).toEqual({ src: "/api/media/content/diagram.png", alt: "Cell diagram", width: 800, height: 600 });
    expect(presented.interaction.hotspots.map((h) => h.number)).toEqual([1, 2]);
    expect(presented.interaction.labels?.map((l) => l.label).sort()).toEqual(["Cell membrane", "Nucleus"]);
    const missing = presentQuestion(view);
    if (missing.interaction.type !== "DIAGRAM_LABELLING") throw new Error("expected DIAGRAM_LABELLING");
    expect(missing.interaction.image).toBeNull();
  });

  it("structured: parts are presented recursively with labels", () => {
    const presented = presentQuestion(toStudentView(record("STRUCTURED")));
    expect(presented.parts.map((p) => [p.partLabel, p.type, p.marks])).toEqual([
      ["(a)", "SHORT_ANSWER", 1],
      ["(b)", "NUMERICAL", 2],
    ]);
  });
});

describe("splitFillTemplate", () => {
  const render = (source: string) => `[${source}]` as SanitizedHtml;
  const blanks = [
    { id: "b1", input: "text" as const, choices: null },
    { id: "b2", input: "select" as const, choices: ["solid", "gas"] },
  ];

  it("keeps the spaces around blanks and splits paragraphs on blank lines", () => {
    const { paragraphs, blankCount } = splitFillTemplate("A {{blank:b1}} B.\n\nIce is {{blank:b2}}.", blanks, render);
    expect(blankCount).toBe(2);
    expect(paragraphs).toEqual([
      [{ kind: "html", html: "[A]" }, { kind: "space" }, { kind: "blank", id: "b1", number: 1, input: "text", choices: null }, { kind: "space" }, { kind: "html", html: "[B.]" }],
      [{ kind: "html", html: "[Ice is]" }, { kind: "space" }, { kind: "blank", id: "b2", number: 2, input: "select", choices: ["solid", "gas"] }, { kind: "html", html: "[.]" }],
    ]);
  });

  it("handles a leading blank and adjacent blanks", () => {
    const { paragraphs } = splitFillTemplate("{{blank:b1}} {{blank:b2}}", blanks, render);
    expect(paragraphs[0]?.map((s) => s.kind)).toEqual(["blank", "space", "blank"]);
  });
});

describe("feedback", () => {
  it("presents a reveal with rendered texts, rationales and the mark scheme", () => {
    const question = record("ESSAY");
    const presented = presentReveal(toAnswerReveal(question));
    expect(presented.correctAnswerHtml).toBeNull();
    expect(presented.explanationHtml).toContain("Original explanation");
    expect(presented.markScheme?.points.map((p) => p.marks)).toEqual([2, 4, 4]);
    expect(presented.markScheme?.levels).toHaveLength(3);
    expect(presented.modelAnswerHtml).toContain("Original model answer");

    const mcq = presentReveal(toAnswerReveal(record("MULTIPLE_CHOICE")));
    expect(mcq.correctAnswerHtml).toBe("A");
    expect(mcq.options.find((o) => o.key === "B")?.rationaleHtml).toContain("Sign error");
  });

  it("maps per-part marks from the stored marking detail", () => {
    const question = record("STRUCTURED");
    const partId = question.parts?.[1]?.id as string;
    const reveal = presentReveal(toAnswerReveal(question), partResultsFrom({ parts: [{ partId, awarded: 0, max: 2, correct: false, pending: true }] }));
    expect(reveal.parts[1]?.partResult).toEqual({ awarded: 0, max: 2, correct: false, pending: true });
    expect(reveal.parts[0]?.partResult).toBeNull();
  });

  it("answer feedback: outcome, marks, mastery change, study link; pending marks hidden", () => {
    const question = record("MULTIPLE_CHOICE");
    const base: AnswerFeedback = {
      attemptId: randomUUID(),
      position: 2,
      status: "AUTO_MARKED",
      marksAwarded: 0,
      marksAvailable: 1,
      isCorrect: false,
      alreadyAnswered: false,
      feedback: null,
      notes: [],
      correctAnswerDisplay: "A",
      explanationHtml: "<p>engine html</p>",
      workedSolutionHtml: null,
      conceptHtml: null,
      reveal: toAnswerReveal(question),
      topic: { id: randomUUID(), name: "Quadratics" },
      studyLesson: { lessonId: randomUUID(), title: "Solving quadratics", accessTier: "PREMIUM", href: "/app/lessons/x" },
      mastery: { score: 35, band: "WEAK", before: { score: 45, band: "DEVELOPING" } },
      attemptCompleted: false,
      nextPosition: 3,
      result: null,
      selfAssessable: false,
    };
    const presented = presentAnswerFeedback(base);
    expect(presented.outcome).toBe("incorrect");
    expect(presented.reveal?.explanationHtml).toBe("<p>engine html</p>");
    expect(presented.mastery).toEqual({ before: "DEVELOPING", after: "WEAK", score: 35 });
    expect(presented.studyLesson).toEqual({ title: "Solving quadratics", href: "/app/lessons/x", premium: true });

    const pending = presentAnswerFeedback({ ...base, status: "PENDING", marksAwarded: null, isCorrect: null, mastery: null, feedback: { comment: "Good start." } });
    expect(pending.outcome).toBe("pending");
    expect(pending.marksAwarded).toBeNull();
    expect(pending.mastery).toBeNull();
    expect(pending.markerComment).toBe("Good start.");

    // First evidence in the topic: no band before.
    expect(presentAnswerFeedback({ ...base, mastery: { score: 35, band: "WEAK", before: null } }).mastery).toEqual({ before: null, after: "WEAK", score: 35 });
  });

  it("slot feedback for review; none while the slot has no visible result", () => {
    const question = record("TRUE_FALSE");
    expect(presentSlotFeedback({ position: 1, marksAvailable: 1, result: null })).toBeNull();
    const presented = presentSlotFeedback({
      position: 1,
      marksAvailable: 1,
      result: { status: "AUTO_MARKED", marksAwarded: 1, isCorrect: true, feedback: null, reveal: toAnswerReveal(question), selfAssessable: false },
    });
    expect(presented?.outcome).toBe("correct");
    expect(presented?.reveal?.correctAnswerHtml).toBe("True");
  });
});

describe("normalizeResponse", () => {
  it("keeps valid saved answers and drops malformed or mismatched ones", () => {
    expect(normalizeResponse("TRUE_FALSE", { type: "TRUE_FALSE", value: true })).toEqual({ type: "TRUE_FALSE", value: true });
    expect(normalizeResponse("TRUE_FALSE", { type: "MULTIPLE_CHOICE", optionKeys: ["A"] })).toBeNull();
    expect(normalizeResponse("SHORT_ANSWER", { type: "SHORT_ANSWER" })).toBeNull();
    expect(normalizeResponse("ESSAY", null)).toBeNull();
  });
});
