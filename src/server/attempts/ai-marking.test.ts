import { describe, expect, it } from "vitest";
import type { QuestionRecord } from "@/lib/questions";
import { MARKING_ESSAY_ROUTE, MARKING_ROUTE } from "@/server/ai/marking";
import {
  combineAiMarks,
  markingTierFor,
  planAiMarking,
  questionFromSnapshot,
  responseText,
  selfAssessableWithoutAi,
  type AiMarkingPlan,
} from "./ai-marking";

/** Pure planning of AI-assisted marking (ARCHITECTURE §6.5): what the rules decided vs. what the AI must decide. */

const essay: QuestionRecord = {
  id: "0199a1b2-0000-7000-8000-000000000001",
  type: "ESSAY",
  markingMode: "AI_ASSISTED",
  stem: "Discuss renewable energy for a rural community.",
  payload: { wordLimit: { max: 400 } },
  answerSpec: {
    markScheme: {
      points: [
        { id: "P1", description: "Defines renewable energy", marks: 2, indicators: ["replenished naturally"] },
        { id: "P2", description: "Two advantages with local examples", marks: 4 },
        { id: "P3", description: "Weighs disadvantages and concludes", marks: 4 },
      ],
    },
  },
  marks: 10,
};

const calculation: QuestionRecord = {
  id: "0199a1b2-0000-7000-8000-000000000002",
  type: "CALCULATION",
  markingMode: "AI_ASSISTED",
  stem: "A car travels 150 km in 2.5 h. Find its average speed.",
  payload: { unitHint: "km/h" },
  answerSpec: {
    value: 60,
    tolerance: { kind: "absolute", amount: 0.5 },
    units: { required: true, accepted: ["km/h"] },
    methodMarks: [{ id: "M1", description: "Divides distance by time", marks: 1 }],
    methodRequired: true,
  },
  marks: 3,
};

const shortAnswer: QuestionRecord = {
  id: "0199a1b2-0000-7000-8000-000000000003",
  type: "SHORT_ANSWER",
  markingMode: "AI_ASSISTED",
  stem: "Name the gas released during photosynthesis and say where it comes from.",
  payload: null,
  answerSpec: {
    accepted: [{ value: "oxygen from water" }],
    rubric: [
      { id: "R1", anyOf: ["oxygen", "O2"], marks: 1, description: "Names oxygen" },
      { id: "R2", anyOf: ["water", "H2O"], marks: 1 },
    ],
    normalise: ["trim", "lowercase"],
  },
  marks: 2,
};

const PART_A = "0199a1b2-0000-7000-8000-00000000000a";
const PART_B = "0199a1b2-0000-7000-8000-00000000000b";
const PART_C = "0199a1b2-0000-7000-8000-00000000000c";

function structured(partCMode: "AI_ASSISTED" | "MANUAL" = "AI_ASSISTED"): QuestionRecord {
  return {
    id: "0199a1b2-0000-7000-8000-000000000004",
    type: "STRUCTURED",
    markingMode: "AUTO",
    stem: "Energy in a rural clinic.",
    payload: null,
    answerSpec: null,
    marks: 8,
    parts: [
      { id: PART_A, type: "NUMERICAL", markingMode: "AUTO", stem: "How many panels?", payload: null, answerSpec: { value: 4 }, marks: 2, partLabel: "(a)", partOrder: 0 },
      { ...essay, id: PART_B, stem: "Discuss solar power.", marks: 4, partLabel: "(b)", partOrder: 1, answerSpec: { markScheme: { points: [{ id: "P1", description: "Advantage", marks: 2 }, { id: "P2", description: "Disadvantage", marks: 2 }] } } },
      {
        id: PART_C,
        type: "EXTENDED_RESPONSE",
        markingMode: partCMode,
        stem: "Explain the battery choice.",
        payload: null,
        answerSpec: { markScheme: { points: [{ id: "P1", description: "Capacity reasoning", marks: 2 }] } },
        marks: 2,
        partLabel: "(c)",
        partOrder: 2,
      },
    ],
  };
}

function planOf(question: QuestionRecord, response: unknown): AiMarkingPlan {
  const planned = planAiMarking(question, response);
  if (!planned.ok) throw new Error(`expected a plan, got ${planned.reason}`);
  return planned.plan;
}

describe("planAiMarking", () => {
  it("sends every mark-scheme point of an essay to the DEEP essay route", () => {
    const plan = planOf(essay, { type: "ESSAY", text: "  Solar power is clean but batteries are costly.  " });
    expect(plan).toMatchObject({ questionMarks: 10, fixedMarks: 0, scale: 1, forceReview: false, route: MARKING_ESSAY_ROUTE, maxMarks: 10, provisionalMarks: 0 });
    expect(plan.points.map((point) => point.id)).toEqual(["P1", "P2", "P3"]);
    expect(plan.points[0]?.text).toContain("look for: replenished naturally");
    expect(plan.response).toBe("Solar power is clean but batteries are costly.");
    expect(plan.questionStem).toBe(essay.stem);
  });

  it("asks the AI only for the method marks of a calculation and keeps the final-answer marks", () => {
    const plan = planOf(calculation, { type: "CALCULATION", value: "60", unit: "km/h", working: "150 / 2.5 = 60" });
    expect(plan.route).toBe(MARKING_ROUTE);
    expect(plan.units[0]).toMatchObject({ combine: "ADD", base: 2, aiMax: 1 });
    expect(plan.points).toEqual([{ id: "M1", text: "Divides distance by time", marks: 1 }]);
    expect(plan.response).toBe("Final answer: 60 km/h\nWorking:\n150 / 2.5 = 60");
    expect(combineAiMarks(plan, [{ pointId: "M1", marks: 1 }])).toBe(3);
    expect(combineAiMarks(plan, [])).toBe(2);
  });

  it("keeps a short answer's rule-based credit as a lower bound", () => {
    const plan = planOf(shortAnswer, { type: "SHORT_ANSWER", text: "oxygen" });
    expect(plan.units[0]).toMatchObject({ combine: "MAX", base: 1, aiMax: 2 });
    expect(plan.points.map((point) => [point.id, point.text])).toEqual([
      ["R1", "Names oxygen"],
      ["R2", "Mentions any of: water; H2O"],
    ]);
    // The AI cannot take away the rule-based mark, and can raise it.
    expect(combineAiMarks(plan, [{ pointId: "R1", marks: 0 }])).toBe(1);
    expect(combineAiMarks(plan, [{ pointId: "R1", marks: 1 }, { pointId: "R2", marks: 1 }])).toBe(2);
    // Over-awards are capped per point and per unit.
    expect(combineAiMarks(plan, [{ pointId: "R1", marks: 5 }, { pointId: "R2", marks: 5 }])).toBe(2);
  });

  it("marks every AI part of a structured answer in one call, with prefixed point ids and the auto-marked parts fixed", () => {
    const response = {
      type: "STRUCTURED",
      parts: [
        { partId: PART_A, value: "4" },
        { partId: PART_B, text: "Free sunlight, but panels are expensive." },
        { partId: PART_C, text: "A larger battery covers cloudy days." },
      ],
    };
    const plan = planOf(structured(), response);
    expect(plan).toMatchObject({ fixedMarks: 2, forceReview: false, scale: 1, maxMarks: 6, route: MARKING_ESSAY_ROUTE });
    expect(plan.points.map((point) => point.id)).toEqual(["1.P1", "1.P2", "2.P1"]);
    expect(plan.points[0]?.text).toBe("Part (b): Advantage");
    expect(plan.response).toBe("Part (b):\nFree sunlight, but panels are expensive.\n\nPart (c):\nA larger battery covers cloudy days.");
    expect(plan.questionStem).toContain("Part (c): Explain the battery choice.");
    expect(combineAiMarks(plan, [{ pointId: "1.P1", marks: 2 }, { pointId: "1.P2", marks: 1 }, { pointId: "2.P1", marks: 2 }])).toBe(7);
    // Unknown or unprefixed ids earn nothing.
    expect(combineAiMarks(plan, [{ pointId: "P1", marks: 2 }])).toBe(2);
  });

  it("keeps a structured answer in review when one of its parts needs a human anyway", () => {
    const response = {
      type: "STRUCTURED",
      parts: [
        { partId: PART_A, value: "3" },
        { partId: PART_B, text: "Free sunlight." },
        { partId: PART_C, text: "A larger battery." },
      ],
    };
    const plan = planOf(structured("MANUAL"), response);
    expect(plan.forceReview).toBe(true);
    expect(plan.units).toHaveLength(1);
    expect(plan.fixedMarks).toBe(0);
  });

  it("refuses answers that are not waiting for AI", () => {
    expect(planAiMarking(essay, null)).toEqual({ ok: false, reason: "NOT_PENDING", provisionalMarks: 0 });
    expect(planAiMarking({ ...essay, markingMode: "MANUAL" }, { type: "ESSAY", text: "An answer." })).toMatchObject({ ok: false, reason: "NOT_PENDING" });
    const correct = planAiMarking({ ...calculation, answerSpec: { ...(calculation.answerSpec as object), methodRequired: false } }, { type: "CALCULATION", value: "60", unit: "km/h", working: "150/2.5" });
    expect(correct).toMatchObject({ ok: false, reason: "NOT_PENDING", provisionalMarks: 3 });
  });

  it("refuses answers that are too long to mark automatically", () => {
    const planned = planAiMarking(essay, { type: "ESSAY", text: "word ".repeat(7_000) });
    expect(planned).toMatchObject({ ok: false, reason: "TOO_LONG" });
  });
});

describe("combineAiMarks", () => {
  it("scales a structured marks mismatch and clamps to the question's marks", () => {
    const plan: AiMarkingPlan = {
      questionMarks: 5,
      fixedMarks: 1,
      scale: 0.5,
      units: [{ label: "(a)", type: "ESSAY", stem: "", points: [{ id: "1.P1", text: "", marks: 9 }], base: 0, max: 9, aiMax: 9, combine: "MAX", response: "x" }],
      forceReview: false,
      route: MARKING_ESSAY_ROUTE,
      questionStem: "",
      response: "",
      points: [],
      maxMarks: 9,
      provisionalMarks: 0,
    };
    expect(combineAiMarks(plan, [{ pointId: "1.P1", marks: 9 }])).toBe(5);
    expect(combineAiMarks(plan, [{ pointId: "1.P1", marks: 3 }])).toBe(2);
    expect(combineAiMarks(plan, [{ pointId: "1.P1", marks: Number.NaN }])).toBe(0);
  });
});

describe("helpers", () => {
  it("floors the marking tier at STANDARD", () => {
    expect(markingTierFor("FAST")).toBe("STANDARD");
    expect(markingTierFor("STANDARD")).toBe("STANDARD");
    expect(markingTierFor("DEEP")).toBe("DEEP");
  });

  it("only lets students self-mark written answers in their own work", () => {
    expect(selfAssessableWithoutAi("ESSAY", false)).toBe(true);
    expect(selfAssessableWithoutAi("SHORT_ANSWER", false)).toBe(true);
    expect(selfAssessableWithoutAi("ESSAY", true)).toBe(false);
    expect(selfAssessableWithoutAi("CALCULATION", false)).toBe(false);
    expect(selfAssessableWithoutAi("STRUCTURED", false)).toBe(false);
  });

  it("turns responses into plain text", () => {
    expect(responseText("ESSAY", { type: "ESSAY", text: " hi " })).toBe("hi");
    expect(responseText("CALCULATION", { type: "CALCULATION", value: "", working: "" })).toBe("Final answer: (none given)");
    expect(responseText("MULTIPLE_CHOICE", { type: "MULTIPLE_CHOICE", optionKeys: ["A"] })).toBe("");
    expect(responseText("ESSAY", null)).toBe("");
  });

  it("reads a revision snapshot back into a question, parts in order", () => {
    const question = questionFromSnapshot({
      question: { id: "q", type: "STRUCTURED", markingMode: "AUTO", stem: "Root", payload: null, answerSpec: null, marks: 3, status: "PUBLISHED" },
      options: [],
      parts: [
        { id: "b", type: "NUMERICAL", markingMode: "AUTO", stem: "B", payload: null, answerSpec: { value: 1 }, marks: 1, partLabel: "(b)", partOrder: 1, options: [], parts: [] },
        { id: "a", type: "SHORT_ANSWER", markingMode: "AI_ASSISTED", stem: "A", payload: null, answerSpec: { accepted: [{ value: "x" }] }, marks: 2, partLabel: "(a)", partOrder: 0, options: [], parts: [] },
      ],
      topics: [],
      objectives: [],
    });
    expect(question?.parts?.map((part) => part.id)).toEqual(["a", "b"]);
    expect(question?.parts?.[0]).toMatchObject({ type: "SHORT_ANSWER", markingMode: "AI_ASSISTED", partLabel: "(a)" });
    expect(questionFromSnapshot({ question: { id: "q" } })).toBeNull();
    expect(questionFromSnapshot(null)).toBeNull();
  });
});
