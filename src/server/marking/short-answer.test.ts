import { describe, expect, it } from "vitest";
import type { MarkingMode } from "@/lib/questions";
import { markResponse } from "./mark";

function sa(text: string | null, answerSpec: unknown, markingMode: MarkingMode = "AUTO", marks = 2) {
  return markResponse({
    type: "SHORT_ANSWER",
    marks,
    markingMode,
    payload: null,
    answerSpec,
    response: text === null ? null : { type: "SHORT_ANSWER", text },
  });
}

const oxygen = { accepted: [{ value: "oxygen" }, { value: "O2" }], normalise: ["trim", "lowercase"] };

describe("short answer — accepted answers", () => {
  it.each([
    "oxygen",
    "Oxygen",
    "  OXYGEN  ",
    "O2",
    "O₂",
    "o2",
    "ｏｘｙｇｅｎ",
    "oxy​gen",
    "﻿oxygen",
  ])("accepts %j", (text) => {
    expect(sa(text, oxygen)).toMatchObject({ status: "MARKED", marksAwarded: 2, isCorrect: true });
  });

  it.each(["oxygen gas", "hydrogen", "0xygen", "оxygen", "oxygenn", "O 2"])("rejects %j", (text) => {
    expect(sa(text, oxygen)).toMatchObject({ status: "MARKED", marksAwarded: 0, isCorrect: false });
  });

  it("shows the first full-mark accepted answer", () => {
    expect(sa("hydrogen", oxygen).feedback.correctAnswerDisplay).toBe("oxygen");
  });

  it("respects case-sensitive accepted answers", () => {
    const spec = { accepted: [{ value: "NaCl", caseSensitive: true }] };
    expect(sa("NaCl", spec).marksAwarded).toBe(2);
    expect(sa("nacl", spec).marksAwarded).toBe(0);
  });

  it("applies the normalise flags symmetrically", () => {
    const spec = { accepted: [{ value: "x^2 + 3x" }], normalise: ["remove_whitespace"] };
    expect(sa("x²+3x", spec).marksAwarded).toBe(2);
    expect(sa("x ^ 2 + 3 x", spec).marksAwarded).toBe(2);
    const dna = { accepted: [{ value: "DNA" }], normalise: ["strip_punctuation"] };
    expect(sa("D.N.A.", dna).marksAwarded).toBe(2);
    const article = { accepted: [{ value: "mitochondria" }], normalise: ["strip_articles"] };
    expect(sa("The mitochondria", article).marksAwarded).toBe(2);
  });

  it("awards partially creditworthy answers their own marks", () => {
    const spec = { accepted: [{ value: "photosynthesis" }, { value: "light reaction", marks: 1, feedback: "Name the whole process." }] };
    const r = sa("light reaction", spec);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 1, isCorrect: null });
    expect(r.feedback.responseFeedback).toBe("Name the whole process.");
    expect(r.feedback.flags).toContain("PARTIAL_ANSWER");
  });

  it("caps an accepted answer's marks at the question's marks", () => {
    expect(sa("oxygen", { accepted: [{ value: "oxygen", marks: 5 }] }).marksAwarded).toBe(2);
  });
});

describe("short answer — rejected answers", () => {
  const spec = { accepted: [{ value: "carbon dioxide" }], keywords: { all: ["carbon"] }, rejected: [{ value: "carbon monoxide", feedback: "Monoxide is a different gas." }] };

  it("never credits a rejected answer even if keywords match", () => {
    const r = sa("Carbon monoxide", spec);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 0 });
    expect(r.feedback.flags).toContain("REJECTED_ANSWER");
    expect(r.feedback.responseFeedback).toBe("Monoxide is a different gas.");
  });

  it("keeps rejection final under AI-assisted marking", () => {
    expect(sa("carbon monoxide", spec, "AI_ASSISTED")).toMatchObject({ status: "MARKED", marksAwarded: 0 });
  });
});

describe("short answer — safe patterns", () => {
  const spec = { patterns: ["^(?:the )?nucleus$", "^\\d+(?:\\.\\d+)? ?cm$"] };

  it.each([
    ["nucleus", 2],
    ["The nucleus", 2],
    ["12.5 cm", 2],
    ["12cm", 2],
    ["nuclei", 0],
    ["a nucleus", 0],
  ])("%j → %i", (text, expected) => {
    expect(sa(text, spec).marksAwarded).toBe(expected);
  });

  it("does not run patterns over very long answers", () => {
    const r = sa(`nucleus ${"x".repeat(300)}`, spec);
    expect(r.marksAwarded).toBe(0);
    expect(r.feedback.flags).toContain("PATTERN_SKIPPED");
  });

  it("treats a stored spec with an injected unsafe regex as unmarkable", () => {
    const r = sa("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!", { patterns: ["^(a+)+$"] });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(r.feedback.flags).toContain("SPEC_INVALID");
  });

  it("treats regex metacharacters in answers literally", () => {
    expect(sa(".*", { accepted: [{ value: "oxygen" }] }).marksAwarded).toBe(0);
    expect(sa("(a+)+$", { accepted: [{ value: "oxygen" }], keywords: { any: ["oxygen"] } }).marksAwarded).toBe(0);
  });
});

describe("short answer — keywords and rubric", () => {
  const keywords = { keywords: { all: ["light"], any: ["glucose", "sugar", "starch"], minAny: 1 } };

  it.each([
    ["Plants use light to make glucose", 2],
    ["LIGHT energy makes sugar.", 2],
    ["They make glucose", 0],
    ["light only", 0],
    ["lightning makes sugar", 0],
  ])("keywords: %j → %i", (text, expected) => {
    expect(sa(text, keywords).marksAwarded).toBe(expected);
  });

  it("requires minAny of the 'any' keywords", () => {
    const spec = { keywords: { any: ["evaporation", "condensation", "precipitation"], minAny: 2 } };
    expect(sa("evaporation then condensation", spec).marksAwarded).toBe(2);
    expect(sa("evaporation only", spec).marksAwarded).toBe(0);
  });

  const rubric = {
    rubric: [
      { id: "R1", anyOf: ["evaporat*"], marks: 1, description: "Evaporation" },
      { id: "R2", anyOf: ["condens*", "cloud*"], marks: 1 },
      { id: "R3", anyOf: ["rain", "precipitation"], marks: 1 },
    ],
  };

  it.each([
    ["Water evaporates, condenses into clouds and falls as rain.", 3],
    ["Water evaporates and forms clouds.", 2],
    ["It rains.", 0],
    ["rain", 1],
    ["nothing relevant", 0],
  ])("rubric: %j → %i of 3", (text, expected) => {
    expect(sa(text, rubric, "AUTO", 3).marksAwarded).toBe(expected);
  });

  it("lists rubric points with evidence", () => {
    const r = sa("Water evaporates and forms clouds.", rubric, "AUTO", 3);
    expect(r.feedback.matchedPoints).toEqual([
      { pointId: "R1", description: "Evaporation", maxMarks: 1, awarded: 1, evidence: "evaporat*" },
      { pointId: "R2", description: null, maxMarks: 1, awarded: 1, evidence: "cloud*" },
      { pointId: "R3", description: null, maxMarks: 1, awarded: 0, evidence: null },
    ]);
    expect(r.feedback.flags).toContain("RUBRIC_PARTIAL");
  });

  it("matches whole words unless the keyword ends with *", () => {
    const strict = { rubric: [{ id: "R", anyOf: ["cloud"], marks: 1 }] };
    expect(sa("clouds form", strict, "AUTO", 1).marksAwarded).toBe(0);
    expect(sa("a cloud forms", strict, "AUTO", 1).marksAwarded).toBe(1);
  });

  it("caps rubric credit at the question's marks", () => {
    expect(sa("evaporation condensation rain", rubric, "AUTO", 2).marksAwarded).toBe(2);
  });
});

describe("short answer — marking modes", () => {
  const spec = {
    accepted: [{ value: "oxygen" }],
    rubric: [{ id: "R1", anyOf: ["gas"], marks: 1 }],
    markScheme: { points: [{ id: "P1", description: "Names oxygen", marks: 2 }] },
  };

  it("AI-assisted: an exact accepted answer is final without AI", () => {
    expect(sa("Oxygen", spec, "AI_ASSISTED")).toMatchObject({ status: "MARKED", marksAwarded: 2, pendingMarks: 0 });
  });

  it("AI-assisted: anything else goes to the AI marker with the deterministic credit as a floor", () => {
    const r = sa("the gas plants breathe out", spec, "AI_ASSISTED");
    expect(r).toMatchObject({ status: "PENDING_AI", marksAwarded: 1, pendingMarks: 1, isCorrect: null });
    expect(r.feedback.flags).toContain("AI_REQUIRED");
  });

  it("AI-assisted: keyword matches are not trusted (negation)", () => {
    const r = sa("not oxygen", { keywords: { all: ["oxygen"] } }, "AI_ASSISTED");
    expect(r.status).toBe("PENDING_AI");
  });

  it("AUTO: keyword matches are final", () => {
    expect(sa("definitely oxygen", { keywords: { all: ["oxygen"] } }, "AUTO")).toMatchObject({ status: "MARKED", marksAwarded: 2 });
  });

  it("MANUAL: always needs review, with the rule-based suggestion", () => {
    expect(sa("oxygen", spec, "MANUAL")).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 2, isCorrect: null });
    expect(sa("gas", spec, "MANUAL")).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 1, pendingMarks: 1 });
  });

  it("mark-scheme-only short answers wait for AI", () => {
    const r = sa("Oxygen is released", { markScheme: spec.markScheme }, "AI_ASSISTED");
    expect(r).toMatchObject({ status: "PENDING_AI", marksAwarded: 0, pendingMarks: 2 });
    expect(r.feedback.correctAnswerDisplay).toBeNull();
  });
});

describe("short answer — adversarial input", () => {
  it("treats blank and invisible answers as unanswered", () => {
    for (const text of ["", "   ", "​‌‍", "\n\t"]) {
      expect(sa(text, oxygen)).toMatchObject({ status: "UNANSWERED", marksAwarded: 0 });
    }
  });

  it("refuses over-long answers as invalid responses (bounded work)", () => {
    const r = sa("oxygen ".repeat(1_000), oxygen);
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(r.feedback.flags).toContain("RESPONSE_INVALID");
  });

  it("handles the longest allowed answer quickly", () => {
    const started = performance.now();
    const r = sa(`${"evaporation ".repeat(166)}x`.slice(0, 2_000), { rubric: [{ id: "R", anyOf: ["condens*"], marks: 1 }], patterns: ["^.*.*x$"] });
    expect(r.marksAwarded).toBe(0);
    expect(performance.now() - started).toBeLessThan(1_000);
  });
});
