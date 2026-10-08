import { describe, expect, it } from "vitest";
import { distinctiveNumbers, lessonBlocks, renderedStrings, selfCheck, unescapedDollarCount } from "./self-check";

const LESSON_BODY = [
  "## Simple interest",
  "",
  ":::worked-solution[Example 1: US\\$1200 at 6% for 3 years]",
  "1. $I = \\dfrac{1200 \\times 6 \\times 3}{100} = 216$.",
  ":::",
  "",
  "## Compound interest",
  "Interest earns interest.",
].join("\n");

describe("distinctiveNumbers", () => {
  it("ignores trivial numbers, LaTeX commands and thousands separators", () => {
    expect([...distinctiveNumbers("US\\$13\\,500 at 6% for 3 years, then 13,500 and 2 500")].sort()).toEqual(["13500", "2500"]);
    expect([...distinctiveNumbers("$\\frac{1}{2}$ of 360 degrees in 2026")]).toEqual([]);
  });

  it("drops the exponents of powers of ten", () => {
    expect([...distinctiveNumbers("$H_0 = 2.2 \\times 10^{-18}\\ \\text{s}^{-1}$ and $5.0 \\times 10^{24}$ m")].sort()).toEqual(["2.2", "5.0"]);
    expect([...distinctiveNumbers("3.2 x 10^4 kg, or 147 kg")].sort()).toEqual(["147", "3.2"]);
  });
});

describe("lessonBlocks", () => {
  it("splits at headings and opening directives, keeping the closing fence with its block", () => {
    const blocks = lessonBlocks(LESSON_BODY, 1);
    expect(blocks.map((block) => block.label)).toEqual([":::worked-solution[Example 1: US\\$1200 at 6% for 3 years]"]);
    expect([...blocks[0]!.numbers].sort()).toEqual(["1200", "216"]);
  });
});

describe("unescapedDollarCount / renderedStrings", () => {
  it("counts only unescaped dollars", () => {
    expect(unescapedDollarCount("US\\$5 and $x$")).toBe(2);
    expect(unescapedDollarCount("$x = 3")).toBe(1);
    expect(unescapedDollarCount("\\\\$x$")).toBe(2);
  });

  it("walks rendered fields only (payload text included, prefixes and responses excluded)", () => {
    const paths = renderedStrings({
      key: "q1",
      stem: "S",
      payload: { answerPrefix: "US$", template: "T {{blank:a}}", left: [{ id: "l1", content: "L" }] },
      options: [{ key: "A", content: "C", rationale: "R" }],
      modelResponse: { type: "NUMERICAL", value: "$5" },
      parts: [{ label: "a", stem: "P", hints: ["H"] }],
    }).map((entry) => entry.path);
    expect(paths).toEqual(["stem", "payload.template", "payload.left[0].content", "options[0].content", "options[0].rationale", "parts[0].stem", "parts[0].hints[0]"]);
  });
});

describe("selfCheck", () => {
  const lesson = { file: "l.md", key: "finance.interest", concepts: ["c.interest"], body: LESSON_BODY };

  it("flags a question repeating a lesson example, and two questions sharing their numbers", () => {
    const findings = selfCheck({
      lessons: [lesson],
      questions: [
        { file: "q.json", key: "q.copy", concepts: ["c.interest"], data: { stem: "Find the interest on US\\$1200 at 6% for 3 years. It is 216." } },
        { file: "q.json", key: "q.fresh", concepts: ["c.interest"], data: { stem: "Find the interest on US\\$1500 at 7.5% for 14 years." } },
        { file: "q.json", key: "q.twin", concepts: ["c.interest"], data: { stem: "US\\$1500 is invested at 7.5% for 14 years." } },
        { file: "q.json", key: "q.other", concepts: ["c.other"], data: { stem: "US\\$1200 and 216 again, another concept." } },
      ],
    });
    expect(findings.map((f) => `${f.kind} ${f.key}`)).toEqual(["LESSON_REUSE q.copy", "QUESTION_REUSE q.fresh"]);
    expect(findings[1]!.detail).toContain("q.twin");
  });

  it("flags unbalanced maths in lessons and items", () => {
    const findings = selfCheck({
      lessons: [{ ...lesson, body: "Line with $x$ and US\\$5.\nBroken $y = 2 line.\n$$\nx^2\n$$" }],
      questions: [{ file: "q.json", key: "q1", concepts: ["c.interest"], data: { stem: "ok $x$", options: [{ content: "bad $x" }] } }],
      others: [{ file: "f.json", key: "f1", concepts: [], data: { front: "fine", back: "also $fine$" } }],
    });
    expect(findings.map((f) => `${f.kind} ${f.key} ${f.detail.split(":")[0]}`)).toEqual([
      "UNBALANCED_MATH finance.interest body line 2",
      "UNBALANCED_MATH q1 options[0].content",
    ]);
  });
});
