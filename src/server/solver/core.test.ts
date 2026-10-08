import { describe, expect, it } from "vitest";
import { buildPolicyPrompt } from "@/server/ai/policy";
import {
  buildSolverSystem,
  buildTopicCatalogue,
  cleanFormula,
  cleanText,
  emptySolution,
  finalizeSolution,
  matchTopicByName,
  MAX_CATALOGUE_TOPICS,
  nameTokens,
  parseStoredSolution,
  practiceHrefFor,
  serializeSolution,
  shouldEscalate,
  SOLUTION_LIMITS,
  solutionToMarkdown,
  solveTitle,
  solverModeGuidance,
  solverOutputSchema,
  solverPolicyBlock,
  solverQuota,
  topicIdForKey,
  tutorHrefFor,
  type CatalogueTopic,
  type SolverModelOutput,
} from "./core";

function output(overrides: Partial<SolverModelOutput> = {}): SolverModelOutput {
  return {
    readable: true,
    unreadableReason: null,
    questionText: "Solve x^2 - 5x + 6 = 0",
    subjectGuess: "Mathematics",
    topicGuess: "Quadratic equations",
    topicKey: "T2",
    concept: "A quadratic can be solved by factorising.",
    steps: [
      { title: "Factorise", explanation: "Find two numbers that multiply to 6 and add to -5.", formula: "$$(x-2)(x-3)=0$$", tryThis: "Which two numbers work?" },
      { title: "Solve", explanation: "Set each factor to zero.", formula: "x = 2 \\text{ or } x = 3", tryThis: "Should be dropped on the last step" },
    ],
    finalAnswer: "$x = 2$ or $x = 3$",
    commonMistakes: ["Sign errors when factorising", "  ", "Forgetting the second root"],
    practiceQuestions: ["Solve $x^2 - 7x + 12 = 0$.", "Solve $x^2 + x - 6 = 0$.", "A third one is dropped"],
    ...overrides,
  };
}

describe("prompts", () => {
  it("puts the frozen policy + contract first, catalogue and context next, and the mode guidance last (volatile)", () => {
    const system = buildSolverSystem({ mode: "TEACH", topicCatalogue: " <topic_catalogue>x</topic_catalogue> ", studentContext: "<student_context>y</student_context>" });
    expect(system.stable).toEqual([solverPolicyBlock(), "<topic_catalogue>x</topic_catalogue>", "<student_context>y</student_context>"]);
    expect(system.stable[0]).toContain(buildPolicyPrompt("SOLVER"));
    expect(system.stable[0]).toContain("# Output format (question solver)");
    expect(system.volatile).toBe(solverModeGuidance("TEACH"));
    // Empty blocks are left out so the cache prefix stays identical.
    expect(buildSolverSystem({ mode: "ANSWER", topicCatalogue: "  ", studentContext: null }).stable).toEqual([solverPolicyBlock()]);
  });

  it("keeps teaching in both modes: TEACH asks for something to try, ANSWER still shows every step", () => {
    expect(solverModeGuidance("TEACH")).toMatch(/tryThis/);
    expect(solverModeGuidance("TEACH")).toMatch(/only after the student has worked through every step/);
    expect(solverModeGuidance("ANSWER")).toMatch(/never only the final answer/);
  });

  it("the policy block is byte-identical across calls (prompt caching)", () => {
    expect(solverPolicyBlock()).toBe(solverPolicyBlock());
  });
});

describe("shouldEscalate (DEEP only when the plan allows it)", () => {
  const hard = { area: "MATHS", multiStep: true, difficulty: "HARD" } as const;
  it("escalates hard multi-step maths / science on a DEEP plan", () => {
    expect(shouldEscalate(hard, "DEEP")).toBe(true);
    expect(shouldEscalate({ ...hard, area: "SCIENCE" }, "DEEP")).toBe(true);
  });
  it("stays on STANDARD otherwise", () => {
    expect(shouldEscalate(hard, "STANDARD")).toBe(false);
    expect(shouldEscalate(hard, "FAST")).toBe(false);
    expect(shouldEscalate(null, "DEEP")).toBe(false);
    expect(shouldEscalate({ ...hard, area: "OTHER" }, "DEEP")).toBe(false);
    expect(shouldEscalate({ ...hard, multiStep: false }, "DEEP")).toBe(false);
    expect(shouldEscalate({ ...hard, difficulty: "STANDARD" }, "DEEP")).toBe(false);
  });
});

describe("topic catalogue and matching", () => {
  const topics: CatalogueTopic[] = [
    { id: "s1", name: "Number and Algebra", parentId: null, kind: "SECTION" },
    { id: "t1", name: "Algebra", parentId: "s1", kind: "TOPIC" },
    { id: "t2", name: "Quadratic equations", parentId: "t1", kind: "SUBTOPIC" },
    { id: "t3", name: "Simultaneous <equations>", parentId: "t1", kind: "SUBTOPIC" },
  ];

  it("lists selectable topics with keys (sections only as parent labels) and strips markup characters", () => {
    const catalogue = buildTopicCatalogue(topics);
    expect(catalogue.block).toBe(
      [
        "<topic_catalogue>",
        "Topics of the student's syllabus (key: topic):",
        "T1: Number and Algebra > Algebra",
        "T2: Algebra > Quadratic equations",
        "T3: Algebra > Simultaneous equations",
        "</topic_catalogue>",
      ].join("\n"),
    );
    expect([...catalogue.keys.entries()]).toEqual([
      ["T1", "t1"],
      ["T2", "t2"],
      ["T3", "t3"],
    ]);
    expect(buildTopicCatalogue([{ id: "s", name: "Only a section", parentId: null, kind: "SECTION" }]).block).toBe("");
  });

  it("caps the catalogue size", () => {
    const many: CatalogueTopic[] = Array.from({ length: MAX_CATALOGUE_TOPICS + 20 }, (_, i) => ({ id: `id${i}`, name: `Topic ${i}`, parentId: null, kind: "TOPIC" }));
    expect(buildTopicCatalogue(many).keys.size).toBe(MAX_CATALOGUE_TOPICS);
  });

  it("maps a model's key to a topic id, tolerating case and spaces", () => {
    const catalogue = buildTopicCatalogue(topics);
    expect(topicIdForKey(catalogue, " t2 ")).toBe("t2");
    expect(topicIdForKey(catalogue, "T99")).toBeNull();
    expect(topicIdForKey(catalogue, null)).toBeNull();
  });

  it("matches a topic guess by name (exact words, plural, accents), else null", () => {
    const candidates = topics.filter((topic) => topic.kind !== "SECTION");
    expect(matchTopicByName("Quadratic Equation", candidates)?.id).toBe("t2");
    expect(matchTopicByName("quadratic-equations!", candidates)?.id).toBe("t2");
    expect(matchTopicByName("Probability", candidates)).toBeNull();
    expect(matchTopicByName("", candidates)).toBeNull();
    expect(nameTokens("Équations of the Line")).toEqual(["equations", "line"]);
  });
});

describe("finalizeSolution", () => {
  it("cleans the model output into the stored TEACH solution", () => {
    const solution = finalizeSolution(output(), "TEACH", "typed question");
    expect(solution).not.toBeNull();
    expect(solution?.steps).toEqual([
      { title: "Factorise", explanation: "Find two numbers that multiply to 6 and add to -5.", formula: "(x-2)(x-3)=0", tryThis: "Which two numbers work?" },
      // Nothing to try before the final answer.
      { title: "Solve", explanation: "Set each factor to zero.", formula: "x = 2 \\text{ or } x = 3", tryThis: null },
    ]);
    expect(solution?.commonMistakes).toEqual(["Sign errors when factorising", "Forgetting the second root"]);
    expect(solution?.practiceQuestions).toHaveLength(SOLUTION_LIMITS.practiceQuestions);
    expect(solution?.finalAnswer).toBe("$x = 2$ or $x = 3$");
    expect(solution?.bankQuestionIds).toEqual([]);
    expect(solution).toMatchObject({ kind: "solver.solution", v: 1, mode: "TEACH", readable: true, subjectGuess: "Mathematics", topicGuess: "Quadratic equations" });
  });

  it("drops tryThis in ANSWER mode", () => {
    const solution = finalizeSolution(output(), "ANSWER", "q");
    expect(solution?.steps.every((step) => step.tryThis === null)).toBe(true);
  });

  it("returns null for a readable output without usable steps (never shown as a solution)", () => {
    expect(finalizeSolution(output({ steps: [{ title: "x", explanation: "  ", formula: "$$", tryThis: null }] }), "TEACH", "q")).toBeNull();
  });

  it("keeps only the reason for an unreadable question: no steps, no answer", () => {
    const solution = finalizeSolution(output({ readable: false, unreadableReason: "The right side of the photo is cut off." }), "ANSWER", "q");
    expect(solution).toMatchObject({ readable: false, unreadableReason: "The right side of the photo is cut off.", steps: [], finalAnswer: null, practiceQuestions: [] });
  });

  it("caps lengths and counts and names untitled steps", () => {
    const long = "a".repeat(SOLUTION_LIMITS.stepExplanation + 50);
    const steps = Array.from({ length: SOLUTION_LIMITS.steps + 3 }, () => ({ title: "", explanation: long, formula: null, tryThis: null }));
    const solution = finalizeSolution(output({ steps, questionText: "" }), "TEACH", "fallback question");
    expect(solution?.steps).toHaveLength(SOLUTION_LIMITS.steps);
    expect(solution?.steps[0]?.title).toBe("Step 1");
    expect(solution?.steps[0]?.explanation.length).toBe(SOLUTION_LIMITS.stepExplanation);
    expect(solution?.questionText).toBe("fallback question");
  });
});

describe("cleanFormula / cleanText", () => {
  it("strips math delimiters and refuses formulas that would break out of display math", () => {
    expect(cleanFormula("$$ E = mc^2 $$")).toBe("E = mc^2");
    expect(cleanFormula("$v = u + at$")).toBe("v = u + at");
    expect(cleanFormula("\\[ a^2 + b^2 = c^2 \\]")).toBe("a^2 + b^2 = c^2");
    expect(cleanFormula("x = $5")).toBeNull();
    expect(cleanFormula("  ")).toBeNull();
    expect(cleanFormula("x".repeat(SOLUTION_LIMITS.formula + 1))).toBeNull();
  });

  it("normalises line breaks and caps text with an ellipsis", () => {
    expect(cleanText("a  \r\n\r\n\r\n\r\nb", 100)).toBe("a\n\nb");
    expect(cleanText("abcdef", 4)).toBe("abc…");
    expect(cleanText(null, 4)).toBe("");
  });
});

describe("stored solution round trip", () => {
  it("serialises and parses back; foreign or corrupt content is null", () => {
    const solution = finalizeSolution(output(), "TEACH", "q");
    if (!solution) throw new Error("expected a solution");
    expect(parseStoredSolution(serializeSolution(solution))).toEqual(solution);
    expect(parseStoredSolution("Plain markdown answer")).toBeNull();
    expect(parseStoredSolution("{not json")).toBeNull();
    expect(parseStoredSolution(JSON.stringify({ kind: "other" }))).toBeNull();
  });

  it("renders Markdown with the AI-generated practice label", () => {
    const solution = finalizeSolution(output(), "TEACH", "q");
    if (!solution) throw new Error("expected a solution");
    const markdown = solutionToMarkdown(solution);
    expect(markdown).toContain("**Step 1: Factorise**");
    expect(markdown).toContain("$$\n(x-2)(x-3)=0\n$$");
    expect(markdown).toContain("*Try this:* Which two numbers work?");
    expect(markdown).toContain("**Practice (AI-generated, not from the official bank)**");
    expect(solutionToMarkdown({ ...emptySolution("TEACH", "q"), readable: false, unreadableReason: "Too blurry." })).toBe(
      "We couldn't read this question clearly. Too blurry.",
    );
  });

  it("the structured-output schema accepts what the contract asks for", () => {
    expect(solverOutputSchema.safeParse(output()).success).toBe(true);
    expect(solverOutputSchema.safeParse({ ...output(), steps: "nope" }).success).toBe(false);
  });
});

describe("small helpers", () => {
  it("titles a solve by topic, else the first line (contact details masked), else a photo label", () => {
    expect(solveTitle({ topicName: "Quadratic equations", questionText: "x", hasPhoto: false })).toBe("Quadratic equations");
    expect(solveTitle({ questionText: "\n  Email me at kid@example.com about 3x = 9\nsecond line", hasPhoto: false })).toBe("Email me at [EMAIL] about 3x = 9");
    expect(solveTitle({ questionText: "", hasPhoto: true })).toBe("Photo question");
    expect(solveTitle({ hasPhoto: false })).toBe("Question");
  });

  it("computes the allowance left (null = unlimited)", () => {
    expect(solverQuota(null, 4)).toBeNull();
    expect(solverQuota(5, 2)).toEqual({ limit: 5, remaining: 3 });
    expect(solverQuota(5, 9)).toEqual({ limit: 5, remaining: 0 });
    expect(solverQuota(5, 2, 1)).toEqual({ limit: 5, remaining: 2 });
  });

  it("builds practice and tutor deep links", () => {
    expect(practiceHrefFor(null, "t")).toBeNull();
    expect(practiceHrefFor("s", "t")).toBe("/app/practice?subjectId=s&topicId=t&count=5&origin=RECOMMENDATION");
    expect(practiceHrefFor("s", null)).toBe("/app/practice?subjectId=s&count=5&origin=RECOMMENDATION");
    expect(tutorHrefFor("s", "t")).toBe("/app/tutor/new?subjectId=s&topicId=t");
    expect(tutorHrefFor(null, null)).toBe("/app/tutor/new");
  });
});
