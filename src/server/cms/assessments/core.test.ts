import { describe, expect, it } from "vitest";
import { blueprintFeasibility, computeTotals, maxAssignable, tiersUpTo } from "./core";

describe("computeTotals", () => {
  const marks = new Map([
    ["q1", 2],
    ["q2", 3],
  ]);

  it("adds fixed items (overrides win), rules and answer-any sections", () => {
    const totals = computeTotals(
      [
        { answerCount: null, marks: null, items: [{ questionId: "q1", marks: null }, { questionId: "q2", marks: 5 }], rules: [{ questionCount: 4, marksPerQuestion: 2 }] },
        { answerCount: 2, marks: 20, items: [{ questionId: "q1", marks: null }], rules: [{ questionCount: 3, marksPerQuestion: 10 }] },
      ],
      marks,
    );
    expect(totals).toEqual({
      total: 2 + 5 + 8 + 20,
      exact: true,
      sections: [
        { total: 15, exact: true, questionCount: 6 },
        { total: 20, exact: true, questionCount: 4 },
      ],
    });
  });

  it("is a lower bound when a rule keeps the drawn questions' own marks", () => {
    const totals = computeTotals([{ answerCount: null, marks: null, items: [], rules: [{ questionCount: 5, marksPerQuestion: null }] }], marks);
    expect(totals).toMatchObject({ total: 5, exact: false });
  });
});

describe("tiersUpTo", () => {
  it("fills free tests from public and free questions only", () => {
    expect(tiersUpTo("PUBLIC")).toEqual(["PUBLIC"]);
    expect(tiersUpTo("FREE")).toEqual(["PUBLIC", "FREE"]);
    expect(tiersUpTo("PREMIUM")).toEqual(["PUBLIC", "FREE", "PREMIUM"]);
  });
});

describe("blueprint feasibility", () => {
  it("finds an assignment of distinct questions across overlapping rules", () => {
    // Rule 1 may take a or b; rule 2 only a. Greedy in order could take a for rule 1; matching re-routes it to b.
    const rules = [
      { required: 1, candidates: ["a", "b"], capped: false },
      { required: 1, candidates: ["a"], capped: false },
    ];
    expect(maxAssignable(rules)).toBe(2);
    const result = blueprintFeasibility(rules);
    expect(result).toMatchObject({ possible: true, assignable: 2, required: 2 });
    // …but an attempt filling rule 1 first may draw "a" and leave rule 2 short.
    expect(result.guaranteed).toBe(false);
    expect(result.rules.map((r) => r.guaranteed)).toEqual([true, false]);
  });

  it("reports impossible blueprints with how many questions can be drawn", () => {
    const result = blueprintFeasibility([
      { required: 3, candidates: ["a", "b"], capped: false },
      { required: 1, candidates: ["c"], capped: false },
    ]);
    expect(result).toMatchObject({ possible: false, guaranteed: false, assignable: 3, required: 4 });
  });

  it("is guaranteed when rules do not overlap, and treats capped pools as plentiful", () => {
    const result = blueprintFeasibility([
      { required: 2, candidates: ["a", "b", "c"], capped: false },
      { required: 1, candidates: ["d"], capped: false },
      { required: 50, candidates: ["x"], capped: true },
    ]);
    expect(result).toMatchObject({ possible: true, guaranteed: true, assignable: 53, required: 53 });
  });

  it("handles no rules", () => {
    expect(blueprintFeasibility([])).toMatchObject({ possible: true, guaranteed: true, assignable: 0, required: 0 });
  });
});
