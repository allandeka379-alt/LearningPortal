import { describe, expect, it } from "vitest";
import type { MarketingLevel } from "./catalogue-core";
import { buildMarketingForms, hasStats, roundedCount, type YearGroupRow } from "./learning-core";

const O = { id: "lvl-o", slug: "o-level", name: "O-Level" };
const A = { id: "lvl-a", slug: "a-level", name: "A-Level" };

function level(l: typeof O, quals: { id: string; board: string; short: string; href: string | null }[]): MarketingLevel {
  return {
    ...l,
    qualifications: quals.map((q) => ({
      id: q.id,
      slug: q.id,
      name: q.short,
      shortName: q.short,
      summary: null,
      comingSoon: false,
      href: q.href,
      board: { id: q.board, slug: q.board.toLowerCase(), shortName: q.board, name: q.board },
      level: { id: l.id, slug: l.slug, name: l.name },
    })),
  };
}

const LEVELS = [
  level(O, [
    { id: "zo", board: "ZIMSEC", short: "O-Level", href: "/zimsec/o-level" },
    { id: "ci", board: "Cambridge", short: "IGCSE", href: "/cambridge/igcse" },
  ]),
  level(A, [{ id: "za", board: "ZIMSEC", short: "A-Level", href: "/zimsec/a-level" }]),
];

const YEARS: YearGroupRow[] = [
  { code: "L6", name: "Lower Sixth (Form 5)", ordinal: 5, typicalLevel: A },
  { code: "F4", name: "Form 4", ordinal: 4, typicalLevel: O },
  { code: "F2", name: "Form 2", ordinal: 2, typicalLevel: null },
  { code: "F3", name: "Form 3", ordinal: 3, typicalLevel: O },
  { code: "U6", name: "Upper Sixth (Form 6)", ordinal: 6, typicalLevel: A },
];

describe("buildMarketingForms", () => {
  it("lists years with a listed level in age order, first year = course, last year = exam", () => {
    const forms = buildMarketingForms(YEARS, LEVELS);
    expect(forms.map((f) => [f.code, f.stage])).toEqual([
      ["F3", "course"],
      ["F4", "exam"],
      ["L6", "course"],
      ["U6", "exam"],
    ]);
  });

  it("links each year to the qualifications of its level", () => {
    const [f3] = buildMarketingForms(YEARS, LEVELS);
    expect(f3?.qualifications.map((q) => q.label)).toEqual(["ZIMSEC O-Level", "Cambridge IGCSE"]);
    expect(f3?.qualifications[0]?.href).toBe("/zimsec/o-level");
  });

  it("drops years whose level is not listed and treats a lone year as the exam year", () => {
    const forms = buildMarketingForms(YEARS, LEVELS.slice(0, 1));
    expect(forms.map((f) => f.code)).toEqual(["F3", "F4"]);
    const lone = buildMarketingForms([{ code: "U6", name: "Upper Sixth", ordinal: 6, typicalLevel: A }], LEVELS);
    expect(lone[0]?.stage).toBe("exam");
  });
});

describe("roundedCount", () => {
  it("never rounds up", () => {
    expect(roundedCount(2_473)).toBe("2,400+");
    expect(roundedCount(98)).toBe("90+");
    expect(roundedCount(7)).toBe("7");
    expect(roundedCount(500)).toBe("500");
    expect(roundedCount(41_250)).toBe("41,000+");
    expect(roundedCount(0)).toBe("0");
    expect(roundedCount(-3)).toBe("0");
  });
});

describe("hasStats", () => {
  it("needs published lessons and subjects", () => {
    expect(hasStats({ subjects: 0, lessons: 0, questions: 0, flashcards: 0, tests: 0 })).toBe(false);
    expect(hasStats({ subjects: 3, lessons: 10, questions: 0, flashcards: 0, tests: 0 })).toBe(true);
  });
});
