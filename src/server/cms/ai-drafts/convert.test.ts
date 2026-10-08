import { describe, expect, it } from "vitest";
import type { TopicTarget } from "@/server/cms/imports/rows";
import { STUB_IDS, stubLookups } from "@/server/cms/imports/testing";
import { convertExplanation, convertFlashcards, convertHints, convertLesson, convertQuestions, convertStudyPlan, type ConvertContext } from "./convert";
import type { AiMcq, AiQuestion } from "./prompts";

const topic: TopicTarget = { id: STUB_IDS.topicB, kind: "SUBTOPIC", depth: 1, path: STUB_IDS.topicB, name: "Integers" };

function context(overrides: Partial<ConvertContext> = {}): ConvertContext {
  return {
    lookups: stubLookups({ topicRefs: new Map([["t1", topic]]), objectiveRefs: new Map([["o1", [STUB_IDS.objectiveA]]]) }),
    defaultTopicRef: "t1",
    count: 5,
    allowedTypes: new Set(["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "NUMERICAL", "CALCULATION", "ESSAY", "EXTENDED_RESPONSE"]),
    marksPerQuestion: null,
    ...overrides,
  };
}

const base = {
  marks: 1,
  difficulty: 2.4,
  explanation: "Because $3 \\times 4 = 12$.",
  workedSolution: null,
  hints: ["Think of 3 groups of 4.", "  "],
  conceptSummary: null,
  cognitiveSkill: "application",
  objectiveRefs: ["O1", "O9"],
  topicRef: null,
  estimatedSeconds: 45,
};

function question(overrides: Partial<AiQuestion>): AiQuestion {
  return {
    type: "MULTIPLE_CHOICE",
    stem: "What is $3 \\times 4$?",
    ...base,
    options: [],
    trueFalseAnswer: null,
    acceptedAnswers: [],
    numericAnswer: null,
    tolerance: null,
    units: [],
    markScheme: [],
    modelAnswer: null,
    ...overrides,
  };
}

describe("AI question conversion", () => {
  it("keeps valid items as editor documents tagged to the job's topic and rejects the rest with reasons", () => {
    const options = [
      { text: "7", isCorrect: false, rationale: "Added instead of multiplying." },
      { text: "12", isCorrect: true, rationale: "" },
      { text: "34", isCorrect: false, rationale: "Wrote the digits side by side." },
    ];
    const items: AiQuestion[] = [
      question({ options }),
      question({ type: "true false", stem: "Zero is even.", trueFalseAnswer: true }),
      question({ type: "NUMERICAL", stem: "Compute $120 / 1.5$ in km/h.", numericAnswer: 80, units: ["km/h"], tolerance: 0 }),
      question({ type: "ESSAY", stem: "Explain soil erosion.", markScheme: [{ description: "Run-off carries soil [2]", marks: 2 }, { description: "Cover protects soil", marks: 1.4 }], marks: 0 }),
      question({ options: [{ text: "a", isCorrect: false, rationale: "" }, { text: "b", isCorrect: false, rationale: "" }] }),
      question({ type: "MATCHING", stem: "Match them." }),
      question({ type: "NUMERICAL", stem: "No answer", numericAnswer: null }),
      question({ stem: "Bad maths $\\frac{1$ BROKEN", options }),
    ];
    const result = convertQuestions("QUESTIONS", items, context({ count: 10 }));
    expect(result.drafts.map((d) => d.doc.type)).toEqual(["MULTIPLE_CHOICE", "TRUE_FALSE", "NUMERICAL", "ESSAY"]);
    const [mcq, , numerical, essay] = result.drafts;
    expect(mcq?.doc).toMatchObject({
      difficulty: 2,
      cognitiveSkill: "APPLICATION",
      copyrightStatus: "UNVERIFIED",
      topics: [{ topicId: STUB_IDS.topicB, isPrimary: true }],
      objectiveIds: [STUB_IDS.objectiveA],
      hints: ["Think of 3 groups of 4."],
    });
    expect(mcq?.doc.options.map((o) => [o.key, o.isCorrect, o.rationale])).toEqual([
      ["A", false, "Added instead of multiplying."],
      ["B", true, null],
      ["C", false, "Wrote the digits side by side."],
    ]);
    expect(numerical?.doc.answerSpec).toEqual({ value: 80, tolerance: { kind: "absolute", amount: 0 }, units: { required: false, accepted: ["km/h"] } });
    expect(essay?.doc).toMatchObject({ markingMode: "AI_ASSISTED", marks: 3 });
    expect(result.rejected.map((r) => r.index)).toEqual([5, 6, 7, 8]);
    expect(result.rejected[0]?.reason).toContain("correct");
    expect(result.rejected[1]?.reason).toContain("not requested");
    expect(result.rejected[2]?.reason).toContain("numerical answer");
    expect(result.rejected[3]?.reason).toContain("stem");
  });

  it("forces multiple choice for MCQ jobs, applies the marks per question and caps the count", () => {
    const mcq = (stem: string): AiMcq => ({
      stem,
      ...base,
      options: [
        { text: "Harare", isCorrect: true, rationale: "" },
        { text: "Bulawayo", isCorrect: false, rationale: "" },
      ],
    });
    const result = convertQuestions("MCQ", [mcq("Capital?"), mcq("Again?"), mcq("Third?")], context({ count: 2, marksPerQuestion: 2, allowedTypes: new Set(["MULTIPLE_CHOICE"]) }));
    expect(result.drafts.map((d) => [d.doc.type, d.doc.marks])).toEqual([
      ["MULTIPLE_CHOICE", 2],
      ["MULTIPLE_CHOICE", 2],
    ]);
    expect(result.rejected).toEqual([{ index: 3, reason: "More items than requested." }]);
  });

  it("uses the item's own topic ref when the job has no topic, ignoring unknown refs", () => {
    const items = [question({ type: "TRUE_FALSE", stem: "A", trueFalseAnswer: false, topicRef: "T1" }), question({ type: "TRUE_FALSE", stem: "B", trueFalseAnswer: true, topicRef: "T7" })];
    const result = convertQuestions("QUESTIONS", items, context({ defaultTopicRef: null }));
    expect(result.drafts.map((d) => d.doc.topics)).toEqual([[{ topicId: STUB_IDS.topicB, isPrimary: true }], []]);
  });
});

describe("AI flashcards, lessons, explanations and hints", () => {
  it("validates flashcards and drops repeats", () => {
    const result = convertFlashcards(
      [
        { cardType: "definition", front: "Osmosis", back: "Water movement through a membrane", notes: null, topicRef: null },
        { cardType: "riddle", front: "Speed", back: "$v = d/t$", notes: "  ", topicRef: null },
        { cardType: "FACT", front: "osmosis", back: "Again", notes: null, topicRef: null },
        { cardType: "FACT", front: " ", back: "No front", notes: null, topicRef: null },
      ],
      context({ count: 10 }),
    );
    expect(result.drafts.map((d) => [d.front, d.cardType, d.topicId])).toEqual([
      ["Osmosis", "DEFINITION", STUB_IDS.topicB],
      ["Speed", "CONCEPT", STUB_IDS.topicB],
    ]);
    expect(result.rejected.map((r) => r.index)).toEqual([3, 4]);
  });

  it("validates a lesson body with the renderer checks", () => {
    const ok = convertLesson({ title: "Integers", summary: "Whole numbers.", body: "## Integers\n\n:::definition{term=\"Integer\"}\nA whole number.\n:::", estimatedMinutes: 12.4, objectiveRefs: ["O1"] }, context());
    expect(ok.draft).toMatchObject({ title: "Integers", estimatedMinutes: 12, primaryTopicId: STUB_IDS.topicB, objectiveIds: [STUB_IDS.objectiveA], kind: "LESSON" });
    const bad = convertLesson({ title: "", summary: "", body: "x", estimatedMinutes: 5, objectiveRefs: [] }, context());
    expect(bad.draft).toBeNull();
    expect(bad.rejected[0]?.reason).toContain("title");
  });

  it("checks explanations and hints", () => {
    const check = context().lookups.checkMarkdown;
    expect(convertExplanation({ explanation: "Because…", workedSolution: "1. Step", conceptSummary: "" }, check).patch).toEqual({ explanation: "Because…", workedSolution: "1. Step", conceptSummary: null });
    expect(convertExplanation({ explanation: " ", workedSolution: "", conceptSummary: "" }, check).rejected[0]?.reason).toContain("empty");
    expect(convertExplanation({ explanation: "BROKEN $\\frac{1$", workedSolution: "", conceptSummary: "" }, check).patch).toBeNull();
    expect(convertHints(["Look at the units.", "", "Divide.", "Too many"], 2, check)).toEqual({
      hints: ["Look at the units.", "Divide."],
      rejected: [
        { index: 2, reason: "The hint is empty." },
        { index: 4, reason: "More hints than requested." },
      ],
    });
  });
});

describe("AI study plans", () => {
  const refs = new Map([
    ["t1", { id: STUB_IDS.topicA }],
    ["t2", { id: STUB_IDS.topicB }],
  ]);

  it("keeps valid weeks and activities, numbering slots per week", () => {
    const result = convertStudyPlan(
      {
        title: "Eight weeks of Number",
        description: "For Form 3.",
        durationWeeks: 20,
        weeklyMinutes: 240,
        items: [
          { weekNumber: 1, dayOfWeek: 1, activityType: "lesson", topicRef: "T1", targetMinutes: 45, targetQuestions: null, note: "Start here." },
          { weekNumber: 1, dayOfWeek: null, activityType: "PRACTICE", topicRef: "T1", targetMinutes: 30, targetQuestions: 10, note: "" },
          { weekNumber: 2, dayOfWeek: 3, activityType: "FLASHCARDS", topicRef: "T2", targetMinutes: 15, targetQuestions: null, note: "Revise." },
          { weekNumber: 9, dayOfWeek: 1, activityType: "TEST", topicRef: "T2", targetMinutes: 30, targetQuestions: 10, note: "" },
          { weekNumber: 2, dayOfWeek: 1, activityType: "AI_TUTOR", topicRef: "T2", targetMinutes: 30, targetQuestions: null, note: "" },
          { weekNumber: 2, dayOfWeek: 1, activityType: "LESSON", topicRef: "T9", targetMinutes: 30, targetQuestions: null, note: "" },
          { weekNumber: 3, dayOfWeek: 8, activityType: "REVIEW", topicRef: "T1", targetMinutes: 30, targetQuestions: null, note: "" },
          { weekNumber: 4, dayOfWeek: null, activityType: "MOCK_EXAM", topicRef: null, targetMinutes: 120, targetQuestions: null, note: "Timed." },
        ],
      },
      { weeks: 8, weeklyMinutes: null, topicRefs: refs },
    );
    expect(result.plan).toMatchObject({ title: "Eight weeks of Number", durationWeeks: 8, weeklyMinutes: 240 });
    expect(result.plan?.items.map((i) => [i.weekNumber, i.sortOrder, i.activityType, i.topicId])).toEqual([
      [1, 0, "LESSON", STUB_IDS.topicA],
      [1, 1, "PRACTICE", STUB_IDS.topicA],
      [2, 0, "FLASHCARDS", STUB_IDS.topicB],
      [4, 0, "MOCK_EXAM", null],
    ]);
    expect(result.rejected.map((r) => r.index)).toEqual([4, 5, 6, 7]);
  });

  it("rejects a plan without a title or valid items", () => {
    expect(convertStudyPlan({ title: " ", description: "", durationWeeks: 1, weeklyMinutes: 60, items: [] }, { weeks: 4, weeklyMinutes: null, topicRefs: refs }).plan).toBeNull();
    const empty = convertStudyPlan({ title: "Plan", description: "", durationWeeks: 1, weeklyMinutes: 60, items: [] }, { weeks: 4, weeklyMinutes: null, topicRefs: refs });
    expect(empty.rejected.at(-1)?.reason).toBe("No valid plan items.");
  });
});
