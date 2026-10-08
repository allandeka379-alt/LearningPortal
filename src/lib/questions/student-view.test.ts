import { describe, expect, it } from "vitest";
import { sampleQuestion, type SampleQuestion } from "../../../tests/factories/questions";
import { QUESTION_TYPES } from "./constants";
import { toAnswerReveal, toStudentView } from "./student-view";
import type { QuestionRecord } from "./types";

let n = 0;
function record(sample: SampleQuestion, extra: Partial<QuestionRecord> = {}): QuestionRecord {
  n += 1;
  return {
    id: `01990000-0000-7000-8000-${String(n).padStart(12, "0")}`,
    type: sample.type,
    markingMode: sample.markingMode,
    stem: sample.stem,
    payload: sample.payload,
    answerSpec: sample.answerSpec,
    marks: sample.marks,
    explanation: "SECRET-EXPLANATION",
    workedSolution: "SECRET-WORKED-SOLUTION",
    conceptSummary: "SECRET-CONCEPT",
    hints: ["SECRET-HINT-1", "SECRET-HINT-2"],
    renderedHtml: {
      stem: "<p>stem</p>",
      explanation: "<p>SECRET-EXPLANATION-HTML</p>",
      workedSolution: "<p>SECRET-WORKED-HTML</p>",
      conceptSummary: "<p>SECRET-CONCEPT-HTML</p>",
      hints: ["<p>SECRET-HINT-HTML</p>"],
      options: { A: "<p>2</p>", B: "<p>-2</p>" },
    },
    options: sample.options.map((o) => ({ ...o, rationale: `SECRET-RATIONALE-${o.key}` })),
    parts: sample.parts.map((p, i) => ({ ...record(p), partLabel: p.partLabel, partOrder: i })),
    ...extra,
  };
}

/** Every string an answer could leak through, per type. */
function secretsOf(q: QuestionRecord): string[] {
  const secrets = ["SECRET", "isCorrect", "answerSpec", "rationale", "markScheme", "modelAnswer", "accepted", "methodMarks", "pairs"];
  if (q.type === "SHORT_ANSWER") secrets.push("oxygen");
  if (q.type === "FILL_IN_THE_BLANK") secrets.push("Harare");
  return secrets;
}

describe("toStudentView never leaks answers", () => {
  it.each(QUESTION_TYPES.map((t) => [t]))("%s", (type) => {
    const q = record(sampleQuestion(type));
    const json = JSON.stringify(toStudentView(q, { shuffleSeed: "attempt-1:1" }));
    for (const secret of secretsOf(q)) expect(json).not.toContain(secret);
    expect(json).not.toContain('"correct"');
  });

  it("exposes only the hint count", () => {
    expect(toStudentView(record(sampleQuestion("NUMERICAL"))).hintCount).toBe(2);
  });

  it("keeps whitelisted option fields and rendered option HTML", () => {
    const view = toStudentView(record(sampleQuestion("MULTIPLE_CHOICE", { payload: { selectMode: "single", shuffleOptions: false } })));
    expect(view.interaction.type).toBe("MULTIPLE_CHOICE");
    if (view.interaction.type !== "MULTIPLE_CHOICE") return;
    expect(view.interaction.options.map((o) => o.key)).toEqual(["A", "B", "C", "D"]);
    expect(Object.keys(view.interaction.options[0] ?? {}).sort()).toEqual(["content", "html", "key", "mediaAssetId"]);
    expect(view.interaction.options[0]?.html).toBe("<p>2</p>");
    expect(view.stemHtml).toBe("<p>stem</p>");
  });

  it("ignores non-string values in the rendered HTML cache", () => {
    const view = toStudentView(record(sampleQuestion("TRUE_FALSE"), { renderedHtml: { stem: 42, payload: { a: "<b>x</b>", b: 1 } } }));
    expect(view.stemHtml).toBeNull();
    expect(view.payloadHtml).toEqual({ a: "<b>x</b>" });
  });

  it("throws for a corrupt payload instead of rendering a broken question", () => {
    expect(() => toStudentView(record(sampleQuestion("MATCHING"), { payload: { left: "oops" } }))).toThrow();
  });
});

describe("toStudentView shuffling", () => {
  const matching = record(sampleQuestion("MATCHING"));

  it("is deterministic per seed and differs across seeds", () => {
    const order = (seed: string) => {
      const view = toStudentView(matching, { shuffleSeed: seed });
      return view.interaction.type === "MATCHING" ? view.interaction.right.map((r) => r.id).join(",") : "";
    };
    expect(order("a")).toBe(order("a"));
    const orders = new Set(Array.from({ length: 20 }, (_, i) => order(`seed-${i}`)));
    expect(orders.size).toBeGreaterThan(1);
  });

  it("keeps every item when shuffling", () => {
    const view = toStudentView(matching, { shuffleSeed: 7 });
    if (view.interaction.type !== "MATCHING") throw new Error("expected matching");
    expect(view.interaction.right.map((r) => r.id).sort()).toEqual(["r1", "r2", "r3", "r4"]);
    expect(view.interaction.left.map((l) => l.id)).toEqual(["l1", "l2", "l3"]);
  });

  it("shuffles MCQ options and the diagram word bank only when asked", () => {
    const fixed = toStudentView(record(sampleQuestion("MULTIPLE_CHOICE", { payload: { selectMode: "single", shuffleOptions: false } })), { shuffleSeed: 1 });
    if (fixed.interaction.type === "MULTIPLE_CHOICE") expect(fixed.interaction.options.map((o) => o.key)).toEqual(["A", "B", "C", "D"]);
    const keys = new Set(
      Array.from({ length: 20 }, (_, i) => {
        const v = toStudentView(record(sampleQuestion("MULTIPLE_CHOICE")), { shuffleSeed: i });
        return v.interaction.type === "MULTIPLE_CHOICE" ? v.interaction.options.map((o) => o.key).join("") : "";
      }),
    );
    expect(keys.size).toBeGreaterThan(1);
  });
});

describe("toStudentView per type", () => {
  it("describes the answer UI", () => {
    const calc = toStudentView(record(sampleQuestion("CALCULATION")));
    expect(calc.interaction).toEqual({ type: "CALCULATION", unitHint: "km/h", answerPrefix: null, expectsWorking: true });
    const essay = toStudentView(record(sampleQuestion("ESSAY")));
    expect(essay.interaction).toEqual({ type: "ESSAY", wordLimit: { min: null, max: 400 } });
    const blanks = toStudentView(record(sampleQuestion("FILL_IN_THE_BLANK")));
    expect(blanks.interaction.type === "FILL_IN_THE_BLANK" && blanks.interaction.blanks).toEqual([
      { id: "b1", input: "text", choices: null },
      { id: "b2", input: "number", choices: null },
    ]);
  });

  it("projects structured parts recursively in part order", () => {
    const view = toStudentView(record(sampleQuestion("STRUCTURED")));
    expect(view.interaction).toEqual({ type: "STRUCTURED" });
    expect(view.parts.map((p) => [p.partLabel, p.type, p.marks])).toEqual([
      ["(a)", "SHORT_ANSWER", 1],
      ["(b)", "NUMERICAL", 2],
    ]);
  });
});

describe("toAnswerReveal", () => {
  it("reveals the answer, explanation and rationale after submission", () => {
    const reveal = toAnswerReveal(record(sampleQuestion("MULTIPLE_CHOICE")));
    expect(reveal.correctAnswerDisplay).toBe("A");
    expect(reveal.explanation).toBe("SECRET-EXPLANATION");
    expect(reveal.html.explanation).toBe("<p>SECRET-EXPLANATION-HTML</p>");
    expect(reveal.options[0]).toEqual({ key: "A", isCorrect: true, rationale: "SECRET-RATIONALE-A" });
  });

  it("reveals the mark scheme and model answer of open responses", () => {
    const reveal = toAnswerReveal(record(sampleQuestion("ESSAY")));
    expect(reveal.correctAnswerDisplay).toBeNull();
    expect(reveal.markScheme?.points).toHaveLength(3);
    expect(reveal.modelAnswer).toBe("Original model answer written for tests.");
  });

  it("reveals method marks and per-part answers", () => {
    expect(toAnswerReveal(record(sampleQuestion("CALCULATION"))).methodMarks).toEqual([{ id: "M1", description: "Divides distance by time", marks: 1 }]);
    expect(toAnswerReveal(record(sampleQuestion("STRUCTURED"))).parts.map((p) => p.correctAnswerDisplay)).toEqual(["x^2+3x", "5"]);
  });

  it("reveals nothing for an invalid spec instead of throwing", () => {
    expect(toAnswerReveal(record(sampleQuestion("NUMERICAL"), { answerSpec: { value: "five" } })).correctAnswerDisplay).toBeNull();
  });
});
