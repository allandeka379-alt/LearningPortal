import { describe, expect, it } from "vitest";
import {
  canMoveExamSession,
  dedupeSlug,
  defaultChildKind,
  gradeBandProblems,
  isSameOrDescendantPath,
  isSubjectVerified,
  parseOutline,
  planTopicClone,
  publicCurriculumPath,
  reorderSiblings,
  sameGradeBands,
  slugify,
  subjectStatusProblems,
  suggestVersionLabel,
  syllabusPublishProblems,
  topicKindChangeProblem,
  topicPlacementProblem,
  walkOutline,
  type GradeBandInput,
  type OutlineNode,
} from "./core";

describe("slugify / dedupeSlug", () => {
  it("folds diacritics, ampersands and punctuation into hyphenated lower case", () => {
    expect(slugify("Business Enterprise & Skills")).toBe("business-enterprise-and-skills");
    expect(slugify("  Ndébélé – Isindebele!! ")).toBe("ndebele-isindebele");
    expect(slugify("1.2 Quadratic equations")).toBe("1-2-quadratic-equations");
    expect(slugify("¿¿")).toBe("");
  });

  it("truncates on a word boundary", () => {
    const slug = slugify("word ".repeat(40), 30);
    expect(slug.length).toBeLessThanOrEqual(30);
    expect(slug.endsWith("-")).toBe(false);
  });

  it("appends the first free numeric suffix", () => {
    expect(dedupeSlug("algebra", new Set())).toBe("algebra");
    expect(dedupeSlug("algebra", new Set(["algebra", "algebra-2"]))).toBe("algebra-3");
    expect(dedupeSlug("", new Set(["topic"]))).toBe("topic-2");
  });

  it("builds public paths from the non-empty segments", () => {
    expect(publicCurriculumPath("zimsec", "o-level", null, undefined)).toBe("/zimsec/o-level");
  });
});

describe("topic kinds", () => {
  it("allows sections and topics only at the top or inside sections, subtopics only below topics", () => {
    expect(topicPlacementProblem("SECTION", null)).toBeNull();
    expect(topicPlacementProblem("TOPIC", "SECTION")).toBeNull();
    expect(topicPlacementProblem("SUBTOPIC", "TOPIC")).toBeNull();
    expect(topicPlacementProblem("SUBTOPIC", "SUBTOPIC")).toBeNull();
    expect(topicPlacementProblem("TOPIC", "TOPIC")).toMatch(/subtopic/i);
    expect(topicPlacementProblem("SUBTOPIC", null)).toMatch(/inside a topic/);
    expect(topicPlacementProblem("SECTION", "TOPIC")).not.toBeNull();
  });

  it("checks existing children when a kind changes", () => {
    expect(topicKindChangeProblem("SECTION", null, ["TOPIC"])).toBeNull();
    expect(topicKindChangeProblem("SECTION", null, ["SUBTOPIC"])).toMatch(/children/);
    expect(topicKindChangeProblem("TOPIC", null, ["SUBTOPIC"])).toBeNull();
  });

  it("picks the default child kind", () => {
    expect(defaultChildKind(null)).toBe("TOPIC");
    expect(defaultChildKind(null, "SECTION")).toBe("SECTION");
    expect(defaultChildKind("SECTION")).toBe("TOPIC");
    expect(defaultChildKind("TOPIC")).toBe("SUBTOPIC");
  });
});

describe("tree helpers", () => {
  it("swaps a node with its neighbour and refuses moves past the ends", () => {
    expect(reorderSiblings(["a", "b", "c"], "b", "up")).toEqual(["b", "a", "c"]);
    expect(reorderSiblings(["a", "b", "c"], "b", "down")).toEqual(["a", "c", "b"]);
    expect(reorderSiblings(["a", "b", "c"], "a", "up")).toBeNull();
    expect(reorderSiblings(["a", "b", "c"], "c", "down")).toBeNull();
    expect(reorderSiblings(["a"], "x", "down")).toBeNull();
  });

  it("detects subtree membership by materialised path", () => {
    expect(isSameOrDescendantPath("r/a/b", "r/a")).toBe(true);
    expect(isSameOrDescendantPath("r/a", "r/a")).toBe(true);
    expect(isSameOrDescendantPath("r/ab", "r/a")).toBe(false);
  });

  it("plans a clone with fresh ids, rewritten parents and paths, parents first", () => {
    let n = 0;
    const planned = planTopicClone(
      [
        { id: "c", parentId: "a", path: "a/c", depth: 1 },
        { id: "a", parentId: null, path: "a", depth: 0 },
        { id: "d", parentId: "c", path: "a/c/d", depth: 2 },
      ],
      () => `n${(n += 1)}`,
    );
    const byId = new Map(planned.map((row) => [row.sourceId, row]));
    expect(planned.map((row) => row.sourceId)).toEqual(["a", "c", "d"]);
    const a = byId.get("a");
    const c = byId.get("c");
    const d = byId.get("d");
    expect(a?.parentId).toBeNull();
    expect(a?.path).toBe(a?.id);
    expect(c?.parentId).toBe(a?.id);
    expect(d?.path).toBe(`${a?.id}/${c?.id}/${d?.id}`);
  });
});

describe("parseOutline", () => {
  const names = (roots: readonly OutlineNode[]): string[] => {
    const out: string[] = [];
    walkOutline(roots, (node, parent) => out.push(`${parent ? `${parent.name} > ` : ""}${node.code ?? "-"} ${node.name} [${node.kind}]`));
    return out;
  };

  it("nests by relative indentation, splits codes and attaches objectives", () => {
    const result = parseOutline(
      [
        "1 Number",
        "  1.1 Integers",
        "    > Identify and use natural numbers",
        "    > E1.1a Use directed numbers",
        "  1.2 Fractions and decimals",
        "",
        "2 Algebra",
        "\t- 2.1 Linear equations",
        "\t> Solve problems in context",
      ].join("\n"),
    );
    expect(result.errors).toEqual([]);
    expect(result.topicCount).toBe(5);
    expect(result.objectiveCount).toBe(3);
    expect(result.depth).toBe(2);
    expect(names(result.roots)).toEqual([
      "1 Number [TOPIC]",
      "Number > 1.1 Integers [SUBTOPIC]",
      "Number > 1.2 Fractions and decimals [SUBTOPIC]",
      "2 Algebra [TOPIC]",
      "Algebra > 2.1 Linear equations [SUBTOPIC]",
    ]);
    const integers = result.roots[0]?.children[0];
    expect(integers?.objectives).toEqual([
      { line: 3, code: null, statement: "Identify and use natural numbers" },
      { line: 4, code: "E1.1a", statement: "Use directed numbers" },
    ]);
    // Same indentation as the subtopics: the objective belongs to the enclosing topic.
    expect(result.roots[1]?.objectives.map((o) => o.statement)).toEqual(["Solve problems in context"]);
  });

  it("does not treat words that start with digits as codes", () => {
    const result = parseOutline("2D and 3D shapes\n10 Probability");
    expect(result.roots.map((node) => [node.code, node.name])).toEqual([
      [null, "2D and 3D shapes"],
      ["10", "Probability"],
    ]);
    expect(parseOutline("1.2 Fractions", { detectCodes: false }).roots[0]?.name).toBe("1.2 Fractions");
  });

  it("uses sections at the top level when asked, and the parent's kind when inserting below a node", () => {
    expect(names(parseOutline("Pure Mathematics 1\n  Quadratics\n    Completing the square", { topLevelKind: "SECTION" }).roots)).toEqual([
      "- Pure Mathematics 1 [SECTION]",
      "Pure Mathematics 1 > - Quadratics [TOPIC]",
      "Quadratics > - Completing the square [SUBTOPIC]",
    ]);
    expect(parseOutline("Vectors", { parentKind: "TOPIC" }).roots[0]?.kind).toBe("SUBTOPIC");
    expect(parseOutline("Vectors", { parentKind: "SECTION" }).roots[0]?.kind).toBe("TOPIC");
  });

  it("dedents to the nearest shallower level", () => {
    const result = parseOutline("A\n    B\n  C\nD");
    expect(names(result.roots)).toEqual(["- A [TOPIC]", "A > - B [SUBTOPIC]", "A > - C [SUBTOPIC]", "- D [TOPIC]"]);
  });

  it("reports lines it cannot place", () => {
    const orphan = parseOutline("> objective first\nAlgebra");
    expect(orphan.errors).toEqual([{ line: 1, message: expect.stringMatching(/indented under a topic/) }]);
    expect(parseOutline("   \n\n").errors[0]?.message).toMatch(/at least one topic/);
    const deep = parseOutline(Array.from({ length: 8 }, (_, i) => `${" ".repeat(i * 2)}level ${i}`).join("\n"));
    expect(deep.errors.some((e) => /levels deep/.test(e.message))).toBe(true);
    expect(parseOutline(`A\n> ${"x".repeat(1001)}`).errors[0]?.message).toMatch(/1000/);
    expect(parseOutline("x\n".repeat(1600)).errors[0]?.message).toMatch(/at most/);
  });
});

describe("syllabus publishing", () => {
  const base = {
    status: "DRAFT" as const,
    copyrightStatus: "OWNED" as const,
    sourceId: "s",
    effectiveFrom: "2027-01-01",
    effectiveTo: null,
    topicCount: 3,
    mode: "CURRENT" as const,
    today: "2026-10-05",
  };

  it("passes a complete draft", () => {
    expect(syllabusPublishProblems(base)).toEqual({});
  });

  it("blocks uncleared copyright, missing source, bad dates, empty trees and non-drafts", () => {
    const problems = syllabusPublishProblems({
      ...base,
      status: "CURRENT",
      copyrightStatus: "UNVERIFIED",
      sourceId: null,
      effectiveTo: "2026-12-31",
      topicCount: 0,
    });
    expect(Object.keys(problems).sort()).toEqual(["_form", "copyrightStatus", "effectiveTo", "sourceId"]);
    expect(problems._form).toHaveLength(2);
  });

  it("requires a future start for UPCOMING", () => {
    expect(syllabusPublishProblems({ ...base, mode: "UPCOMING" })).toEqual({});
    expect(syllabusPublishProblems({ ...base, mode: "UPCOMING", effectiveFrom: "2026-10-05" }).mode).toBeDefined();
  });

  it("suggests a free version label", () => {
    expect(suggestVersionLabel([], "2025-2027")).toBe("2025-2027 (revision)");
    expect(suggestVersionLabel(["2025-2027 (revision)"], "2025-2027")).toBe("2025-2027 (revision) 2");
    expect(suggestVersionLabel([], "")).toBe("New version");
  });
});

describe("subject verification", () => {
  it("treats a recorded official source as verified", () => {
    expect(isSubjectVerified({ sourceId: null })).toBe(false);
    expect(isSubjectVerified({ sourceId: "x" })).toBe(true);
  });

  it("keeps unverified subjects hidden and requires a current syllabus for AVAILABLE", () => {
    expect(subjectStatusProblems({ target: "HIDDEN", sourceId: null, hasCurrentSyllabus: false })).toEqual({});
    expect(subjectStatusProblems({ target: "COMING_SOON", sourceId: null, hasCurrentSyllabus: false }).catalogueStatus).toHaveLength(1);
    expect(subjectStatusProblems({ target: "COMING_SOON", sourceId: "s", hasCurrentSyllabus: false })).toEqual({});
    expect(subjectStatusProblems({ target: "AVAILABLE", sourceId: "s", hasCurrentSyllabus: false }).catalogueStatus?.[0]).toMatch(/current syllabus/);
    expect(subjectStatusProblems({ target: "AVAILABLE", sourceId: "s", hasCurrentSyllabus: true })).toEqual({});
  });
});

describe("grade bands", () => {
  const valid: GradeBandInput[] = [
    { label: "A", minPercent: 75, isPass: true },
    { label: "B", minPercent: 62.5, isPass: true },
    { label: "C", minPercent: 50, isPass: true },
    { label: "U", minPercent: 0, isPass: false },
  ];

  it("accepts a well-formed estimate scheme", () => {
    expect(gradeBandProblems(valid)).toEqual({});
  });

  it("rejects duplicates, non-decreasing thresholds, uncovered scores and broken pass runs", () => {
    const problems = gradeBandProblems([
      { label: "A", minPercent: 70, isPass: true },
      { label: "A", minPercent: 70, isPass: false },
      { label: "", minPercent: 50.555, isPass: true },
      { label: "TOO-LONG-LABEL", minPercent: 10, isPass: false },
    ]);
    expect(problems["bands.1.label"]?.[0]).toMatch(/twice/);
    expect(problems["bands.1.minPercent"]?.[0]).toMatch(/below/);
    expect(problems["bands.2.label"]).toBeDefined();
    expect(problems["bands.2.minPercent"]?.[0]).toMatch(/two decimal/);
    expect(problems["bands.3.label"]).toBeDefined();
    expect(problems["bands.3.minPercent"]?.[0]).toMatch(/0%/);
    expect(problems.bands?.[0]).toMatch(/top bands/);
  });

  it("needs at least two bands and one pass", () => {
    expect(gradeBandProblems([{ label: "U", minPercent: 0, isPass: false }]).bands).toHaveLength(2);
  });

  it("compares band lists", () => {
    expect(sameGradeBands(valid, valid.map((band) => ({ ...band })))).toBe(true);
    expect(sameGradeBands(valid, valid.map((band, i) => (i === 1 ? { ...band, minPercent: 60 } : band)))).toBe(false);
    expect(sameGradeBands(valid, valid.slice(1))).toBe(false);
  });
});

describe("exam session transitions", () => {
  it("allows publishing drafts and cancelling published sessions, never leaving ARCHIVED", () => {
    expect(canMoveExamSession("DRAFT", "PUBLISHED")).toBe(true);
    expect(canMoveExamSession("PUBLISHED", "CANCELLED")).toBe(true);
    expect(canMoveExamSession("DRAFT", "CANCELLED")).toBe(false);
    expect(canMoveExamSession("ARCHIVED", "PUBLISHED")).toBe(false);
  });
});
