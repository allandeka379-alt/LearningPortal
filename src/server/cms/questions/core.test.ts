import { describe, expect, it } from "vitest";
import {
  definitionReport,
  issuesToFieldErrors,
  mergeFieldErrors,
  nextOptionKey,
  normaliseEditorDocument,
  normaliseTopicTags,
  plainExcerpt,
  provenanceProblems,
} from "./core";
import { questionEditorSchema, type QuestionEditorInput } from "./schemas";

const SUBJECT = "0199a2b4-0000-7000-8000-000000000001";

function doc(overrides: Partial<QuestionEditorInput> = {}): QuestionEditorInput {
  return {
    subjectId: SUBJECT,
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    stem: "Which value of $x$ satisfies $x + 1 = 3$?",
    payload: { selectMode: "single", shuffleOptions: true },
    answerSpec: { scoring: "all_or_nothing" },
    marks: 1,
    options: [
      { key: "A", content: "$2$", isCorrect: true },
      { key: "B", content: "$4$", isCorrect: false },
    ],
    difficulty: 2,
    accessTier: "FREE",
    copyrightStatus: "OWNED",
    ...overrides,
  };
}

describe("questionEditorSchema", () => {
  it("accepts a complete MCQ document and applies defaults", () => {
    const parsed = questionEditorSchema.parse(doc());
    expect(parsed.hints).toEqual([]);
    expect(parsed.languageCode).toBe("en");
    expect(parsed.topics).toEqual([]);
    expect(parsed.publicationDate).toBeNull();
  });

  it("reports licence evidence rules as field errors", () => {
    const result = questionEditorSchema.safeParse(doc({ copyrightStatus: "LICENSED" }));
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((i) => i.path.join(".") === "sourceId")).toBe(true);
    const open = questionEditorSchema.safeParse(doc({ copyrightStatus: "OPEN_LICENSE" }));
    expect(open.error?.issues.some((i) => i.path.join(".") === "licenceCode")).toBe(true);
    expect(questionEditorSchema.safeParse(doc({ copyrightStatus: "OPEN_LICENSE", licenceCode: "CC-BY-4.0" })).success).toBe(true);
  });

  it("bounds metadata ranges", () => {
    expect(questionEditorSchema.safeParse(doc({ difficulty: 6 })).success).toBe(false);
    expect(questionEditorSchema.safeParse(doc({ year: 1800 })).success).toBe(false);
    expect(questionEditorSchema.safeParse(doc({ marks: 0 })).success).toBe(false);
    expect(questionEditorSchema.safeParse(doc({ sourceUrl: "javascript:alert(1)" })).success).toBe(false);
    expect(questionEditorSchema.safeParse(doc({ payload: [1, 2] })).success).toBe(false);
  });
});

describe("normaliseEditorDocument", () => {
  it("sums structured parts and strips answer data from the root", () => {
    const parsed = questionEditorSchema.parse(
      doc({
        type: "STRUCTURED",
        payload: { selectMode: "single" },
        answerSpec: { scoring: "partial" },
        marks: 99,
        parts: [
          { partLabel: "(a)", type: "SHORT_ANSWER", markingMode: "AUTO", stem: "Name it.", payload: null, answerSpec: { accepted: [{ value: "x" }] }, marks: 1, options: [{ key: "A", content: "stray", isCorrect: true }] },
          {
            partLabel: "(b)",
            type: "STRUCTURED",
            markingMode: "AUTO",
            stem: "Then:",
            payload: null,
            answerSpec: null,
            marks: 50,
            parts: [
              { partLabel: "(i)", type: "NUMERICAL", markingMode: "AUTO", stem: "Find x.", payload: null, answerSpec: { value: 5 }, marks: 2 },
              { partLabel: "(ii)", type: "NUMERICAL", markingMode: "AUTO", stem: "Find y.", payload: null, answerSpec: { value: 6 }, marks: 3 },
            ],
          },
        ],
      }),
    );
    const normalised = normaliseEditorDocument(parsed);
    expect(normalised.marks).toBe(6);
    expect(normalised.payload).toBeNull();
    expect(normalised.answerSpec).toBeNull();
    expect(normalised.options).toEqual([]);
    expect(normalised.parts[0]?.options).toEqual([]);
    expect(normalised.parts[1]?.marks).toBe(5);
    expect(definitionReport(normalised).errors).toEqual([]);
  });

  it("drops parts from non-structured questions", () => {
    const parsed = questionEditorSchema.parse(doc({ parts: [{ partLabel: "(a)", type: "TRUE_FALSE", markingMode: "AUTO", stem: "?", payload: null, answerSpec: { correct: true }, marks: 1 }] }));
    expect(normaliseEditorDocument(parsed).parts).toEqual([]);
  });
});

describe("definitionReport / issuesToFieldErrors", () => {
  it("separates blocking errors from warnings with dot-joined paths", () => {
    const parsed = normaliseEditorDocument(questionEditorSchema.parse(doc({ options: [{ key: "A", content: "$2$", isCorrect: false }, { key: "B", content: "$3$", isCorrect: false }] })));
    const report = definitionReport(parsed);
    expect(report.errors.map((e) => e.message)).toContain("Mark at least one option as correct.");
    expect(issuesToFieldErrors(report.errors)).toEqual({ options: ["Mark at least one option as correct."] });

    const warned = definitionReport(normaliseEditorDocument(questionEditorSchema.parse(doc({ markingMode: "MANUAL" }))));
    expect(warned.errors).toEqual([]);
    expect(warned.warnings[0]?.path).toEqual(["markingMode"]);
  });

  it("keys whole-question problems under _form", () => {
    expect(issuesToFieldErrors([{ severity: "error", path: [], message: "Broken." }])).toEqual({ _form: ["Broken."] });
  });
});

describe("normaliseTopicTags", () => {
  const syllabusOf = (id: string) => ({ t1: "s1", t2: "s1", t3: "s2" })[id];

  it("keeps one primary per syllabus version and drops duplicates and unknown topics", () => {
    const tags = normaliseTopicTags(
      [
        { topicId: "t1", isPrimary: false },
        { topicId: "t2", isPrimary: true },
        { topicId: "t2", isPrimary: false },
        { topicId: "t3", isPrimary: false },
        { topicId: "zz", isPrimary: true },
      ],
      syllabusOf,
    );
    expect(tags).toEqual([
      { topicId: "t1", syllabusId: "s1", isPrimary: false },
      { topicId: "t2", syllabusId: "s1", isPrimary: true },
      { topicId: "t3", syllabusId: "s2", isPrimary: true },
    ]);
  });
});

describe("nextOptionKey", () => {
  it("never re-uses a key the question has had", () => {
    expect(nextOptionKey([])).toBe("A");
    expect(nextOptionKey(["A", "B", "D"])).toBe("C");
    expect(nextOptionKey("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))).toBe("A1");
  });
});

describe("helpers", () => {
  it("plainExcerpt trims markdown and long text", () => {
    expect(plainExcerpt("## Find **x** in ![a](asset:1)\n\nnow {{blank:b1}}")).toBe("Find x in [image] now ___");
    expect(plainExcerpt("a".repeat(200), 10)).toHaveLength(10);
  });

  it("provenanceProblems requires a cleared copyright and a named origin", () => {
    expect(provenanceProblems({ copyrightStatus: "UNVERIFIED", sourceId: null, author: null })).toMatchObject({ copyrightStatus: expect.any(Array), sourceId: expect.any(Array) });
    expect(provenanceProblems({ copyrightStatus: "OWNED", sourceId: null, author: "Editorial team" })).toEqual({});
  });

  it("mergeFieldErrors de-duplicates messages", () => {
    expect(mergeFieldErrors({ a: ["x"] }, { a: ["x", "y"], b: ["z"] })).toEqual({ a: ["x", "y"], b: ["z"] });
  });
});
