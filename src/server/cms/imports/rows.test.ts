import { describe, expect, it } from "vitest";
import type { ParsedImportFile } from "./formats";
import {
  dryRun,
  estimateReadingMinutes,
  flattenTopicValues,
  normalizeEnumText,
  parseFrontMatter,
  parseMarkSchemeLine,
  splitListCell,
  splitObjectiveCode,
  tableRecordToItem,
  type PreparedFlashcard,
  type PreparedLesson,
  type PreparedQuestion,
  type PreparedTopic,
} from "./rows";
import { STUB_IDS, stubLookups, stubTopicLookups } from "./testing";

function table(headers: string[], rows: Record<string, string>[]): ParsedImportFile {
  return { kind: "table", format: "CSV", headers, records: rows.map((values, index) => ({ row: index + 2, values })), issues: [] };
}

function json(items: unknown[]): ParsedImportFile {
  return { kind: "json", format: "JSON", records: items.map((value, index) => ({ row: index + 1, value })), issues: [] };
}

describe("import cell helpers", () => {
  it("splits list cells on | outside maths, or on line breaks", () => {
    expect(splitListCell("a | b|c")).toEqual(["a", "b", "c"]);
    expect(splitListCell("The value of $|x - 3|$ | Hint two")).toEqual(["The value of $|x - 3|$", "Hint two"]);
    expect(splitListCell("first line\nsecond | still second")).toEqual(["first line", "second | still second"]);
    expect(splitListCell(" | ")).toEqual([]);
  });

  it("normalises enum spellings and splits objective codes", () => {
    expect(normalizeEnumText("multiple choice")).toBe("MULTIPLE_CHOICE");
    expect(normalizeEnumText("mcq")).toBe("MULTIPLE_CHOICE");
    expect(normalizeEnumText("True/False")).toBe("TRUE_FALSE");
    expect(splitObjectiveCode("E1.1a: Identify integers")).toEqual({ code: "E1.1a", statement: "Identify integers" });
    expect(splitObjectiveCode("Define: speed")).toEqual({ code: null, statement: "Define: speed" });
  });

  it("parses mark-scheme lines with optional marks", () => {
    expect(parseMarkSchemeLine("Contour ridges slow run-off [2]")).toEqual({ description: "Contour ridges slow run-off", marks: 2 });
    expect(parseMarkSchemeLine("States the law")).toEqual({ description: "States the law", marks: 1 });
    expect(parseMarkSchemeLine({ description: "Uses $F = ma$", marks: 3 })).toEqual({ description: "Uses $F = ma$", marks: 3 });
  });

  it("coerces spreadsheet cells per column and reports bad values", () => {
    const { item, issues } = tableRecordToItem("QUESTION", {
      row: 7,
      values: { type: "mcq", stem: "Pick one", option_b: "Two", option_a: "One", correct: "b", marks: "two", calculator: "yes", hints: "h1|h2" },
    });
    expect(item).toMatchObject({ type: "mcq", stem: "Pick one", correct: ["B"], calculatorAllowed: true, hints: ["h1", "h2"] });
    expect(item.options).toEqual([
      { key: "A", content: "One" },
      { key: "B", content: "Two" },
    ]);
    expect(issues).toEqual([expect.objectContaining({ row: 7, field: "marks", code: "INVALID" })]);
  });

  it("reads lesson front matter and estimates reading time", () => {
    const parsed = parseFrontMatter("---\ntitle: \"Ecosystems\"\ntopics: [1.1, integers]\n# comment\n---\n\n## Body\n");
    expect(parsed).toEqual({ fields: { title: "Ecosystems", topics: "1.1|integers" }, body: "## Body\n", problem: null });
    expect(parseFrontMatter("---\ntitle: x\n").problem).toContain("never closed");
    expect(estimateReadingMinutes(Array.from({ length: 450 }, () => "word").join(" "))).toBe(3);
    expect(estimateReadingMinutes("short")).toBe(1);
  });
});

describe("question dry run", () => {
  it("turns spreadsheet rows into editor documents with UNVERIFIED copyright and the import's source", () => {
    const file = table(["type", "stem", "option_a", "option_b", "correct", "topics", "objectives", "answer"], [
      { type: "MULTIPLE_CHOICE", stem: "What is $2 + 3$?", option_a: "4", option_b: "5", correct: "B", topics: "1.1", objectives: "E1" },
      { type: "true_false", stem: "Zero is an integer.", answer: "yes" },
      { type: "SHORT_ANSWER", stem: "Name the gas plants absorb.", answer: "carbon dioxide|CO2" },
      { type: "NUMERICAL", stem: "Compute $120 / 1.5$.", answer: "80" },
    ]);
    const result = dryRun("QUESTION", file, stubLookups(), null);
    expect(result.issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(result).toMatchObject({ totalRows: 4, validRows: 4, failedRows: 0 });
    const [mcq, tf, short, numerical] = result.prepared as PreparedQuestion[];
    expect(mcq?.doc).toMatchObject({
      type: "MULTIPLE_CHOICE",
      subjectId: STUB_IDS.subject,
      copyrightStatus: "UNVERIFIED",
      sourceId: STUB_IDS.source,
      difficulty: 3,
      accessTier: "PREMIUM",
      payload: { selectMode: "single", shuffleOptions: false },
      topics: [{ topicId: STUB_IDS.topicB, isPrimary: true }],
      objectiveIds: [STUB_IDS.objectiveA],
    });
    expect(mcq?.doc.options.map((o) => [o.key, o.isCorrect])).toEqual([
      ["A", false],
      ["B", true],
    ]);
    expect(tf?.doc.answerSpec).toEqual({ correct: true });
    expect(short?.doc.answerSpec).toEqual({ accepted: [{ value: "carbon dioxide" }, { value: "CO2" }] });
    expect(numerical?.doc.answerSpec).toEqual({ value: 80 });
  });

  it("reports schema, definition, reference, markdown and duplicate problems per row and field", () => {
    const file = json([
      { type: "MULTIPLE_CHOICE", stem: "No correct option", options: [{ content: "a" }, { content: "b" }] },
      { type: "ESSAY", stem: "Discuss.", markScheme: [] },
      { type: "TRUE_FALSE", stem: "Maths $\\frac{1$ BROKEN", answer: true },
      { type: "TRUE_FALSE", stem: "Unknown topic", answer: false, topics: ["9.9"] },
      { type: "TRUE_FALSE", stem: "Ambiguous objective", answer: false, objectives: ["E2"] },
      { type: "TRUE_FALSE", stem: "Typo key", answer: true, difficulty: 9, colour: "red" },
      { externalRef: "Q-1", type: "TRUE_FALSE", stem: "First", answer: true },
      { externalRef: "q-1", type: "TRUE_FALSE", stem: "Same ref", answer: true },
      { externalRef: "already-1", type: "TRUE_FALSE", stem: "Imported before", answer: true },
      { type: "MATCHING", stem: "Needs payload" },
    ]);
    const result = dryRun("QUESTION", file, stubLookups(), null);
    expect(result).toMatchObject({ totalRows: 10, validRows: 1, failedRows: 9 });
    const byRow = (row: number) => result.issues.filter((i) => i.row === row && i.severity === "error");
    expect(byRow(1)[0]).toMatchObject({ code: "DEFINITION", field: "options" });
    expect(byRow(2)[0]).toMatchObject({ code: "REQUIRED", field: "markScheme" });
    expect(byRow(3)[0]).toMatchObject({ code: "CONTENT", field: "stem" });
    expect(byRow(4)[0]).toMatchObject({ code: "REFERENCE", field: "topics" });
    expect(byRow(5)[0]?.message).toContain("used 2 times");
    expect(byRow(6).map((i) => i.field)).toEqual(expect.arrayContaining(["difficulty"]));
    expect(byRow(6).some((i) => i.message.includes("colour"))).toBe(true);
    expect(byRow(8)[0]).toMatchObject({ code: "DUPLICATE" });
    expect(byRow(9)[0]?.message).toContain("Already imported");
    expect(byRow(10)[0]?.message).toContain("payload and answer spec");
    expect((result.prepared[0] as PreparedQuestion).externalRef).toBe("Q-1");
  });

  it("imports structured questions and essays with our own mark scheme from JSON", () => {
    const file = json([
      {
        type: "ESSAY",
        stem: "Explain two causes of soil erosion.",
        markScheme: ["Overgrazing removes plant cover [2]", { description: "Deforestation exposes soil", marks: 2 }],
        modelAnswer: "Cattle remove grass…",
      },
      {
        type: "STRUCTURED",
        stem: "A bus travels 120 km in 1.5 h.",
        parts: [
          { partLabel: "(a)", type: "NUMERICAL", markingMode: "AUTO", stem: "Find the speed in km/h.", payload: null, answerSpec: { value: 80 }, marks: 2 },
          { partLabel: "(b)", type: "TRUE_FALSE", markingMode: "AUTO", stem: "The speed is constant.", payload: null, answerSpec: { correct: false }, marks: 1 },
        ],
      },
    ]);
    const result = dryRun("QUESTION", file, stubLookups(), null);
    expect(result.issues.filter((i) => i.severity === "error")).toEqual([]);
    const [essay, structured] = result.prepared as PreparedQuestion[];
    expect(essay?.doc).toMatchObject({ markingMode: "AI_ASSISTED", marks: 4 });
    expect(structured?.doc.marks).toBe(3);
    expect(structured?.doc.parts).toHaveLength(2);
  });

  it("needs a syllabus version to resolve topic codes", () => {
    const result = dryRun("QUESTION", json([{ type: "TRUE_FALSE", stem: "x", answer: true, topics: ["1"] }]), stubLookups({ syllabus: null }), null);
    expect(result.issues[0]?.message).toContain("Choose a syllabus version");
  });

  it("returns file-level problems without row results", () => {
    const file: ParsedImportFile = { kind: "json", format: "JSON", records: [], issues: [{ row: 0, code: "FILE", message: "Broken", severity: "error" }] };
    expect(dryRun("QUESTION", file, stubLookups(), null)).toMatchObject({ totalRows: 0, validRows: 0, prepared: [] });
  });
});

describe("flashcard and lesson dry run", () => {
  it("prepares flashcards with defaults and the primary topic", () => {
    const file = table(["front", "back", "card_type", "topic"], [
      { front: "Osmosis", back: "Water movement", card_type: "definition", topic: "Integers" },
      { front: "Speed", back: "" , card_type: "riddle" },
    ]);
    const result = dryRun("FLASHCARD", file, stubLookups(), null);
    expect(result).toMatchObject({ validRows: 1, failedRows: 1 });
    expect(result.prepared[0] as PreparedFlashcard).toMatchObject({ cardType: "DEFINITION", topicId: STUB_IDS.topicB, accessTier: "PREMIUM", notes: null });
    expect(result.issues.filter((i) => i.row === 3).map((i) => i.field)).toEqual(expect.arrayContaining(["back", "card_type"]));
  });

  it("prepares lessons from body or front-matter Markdown", () => {
    const words = Array.from({ length: 300 }, () => "word").join(" ");
    const file = json([
      { title: "Speed", body: `## Speed\n\n${words}`, topics: ["1", "1.1"], primaryTopic: "1.1", objectives: ["E1"] },
      { markdown: "---\ntitle: Ecosystems\nkind: revision notes\nestimated_minutes: 5\ntopics: [number]\n---\nBody text" },
      { markdown: "---\nkind: LESSON\n---\nNo title" },
      { title: "Bad maths", body: "$\\frac{1$ BROKEN" },
    ]);
    const result = dryRun("LESSON", file, stubLookups(), null);
    expect(result).toMatchObject({ totalRows: 4, validRows: 2, failedRows: 2 });
    const [speed, eco] = result.prepared as PreparedLesson[];
    expect(speed).toMatchObject({ title: "Speed", slugBase: "speed", estimatedMinutes: 2, primaryTopicId: STUB_IDS.topicB, objectiveIds: [STUB_IDS.objectiveA] });
    expect(speed?.topicIds).toEqual([STUB_IDS.topicA, STUB_IDS.topicB]);
    expect(eco).toMatchObject({ title: "Ecosystems", kind: "REVISION_NOTES", estimatedMinutes: 5, body: "Body text", topicIds: [STUB_IDS.topicA] });
    expect(result.issues.find((i) => i.row === 3)?.message).toContain("title");
    expect(result.issues.find((i) => i.row === 4)?.code).toBe("CONTENT");
  });
});

describe("topic outline dry run", () => {
  it("flattens nested JSON depth-first", () => {
    expect(flattenTopicValues([{ name: "A", children: [{ name: "A1" }, { name: "A2", children: [{ name: "A2a" }] }] }, { name: "B" }]).map((n) => [n.row, n.parentRow])).toEqual([
      [1, null],
      [2, 1],
      [3, 1],
      [4, 3],
      [5, null],
    ]);
  });

  it("places spreadsheet rows under earlier rows or existing topics, with default kinds", () => {
    const file = table(["code", "name", "parent", "objectives"], [
      { code: "N2", name: "Algebra" },
      { code: "N2.1", name: "Expressions", parent: "N2", objectives: "A1: Simplify expressions|Expand brackets" },
      { code: "1.9", name: "Under an existing topic", parent: "1" },
      { code: "N2", name: "Duplicate code" },
      { name: "Orphan", parent: "ZZ" },
      { code: "1", name: "Clashes with the version" },
      { name: "Child of a bad row", parent: "N9" },
    ]);
    const result = dryRun("TOPIC", file, stubLookups(), stubTopicLookups());
    expect(result).toMatchObject({ totalRows: 7, validRows: 3, failedRows: 4 });
    const [algebra, expressions, under] = result.prepared as PreparedTopic[];
    expect(algebra).toMatchObject({ kind: "TOPIC", parentKey: null, parentTopicId: null });
    expect(expressions).toMatchObject({ kind: "SUBTOPIC", parentKey: algebra?.key, objectives: [{ code: "A1", statement: "Simplify expressions" }, { code: null, statement: "Expand brackets" }] });
    expect(under).toMatchObject({ kind: "SUBTOPIC", parentTopicId: STUB_IDS.topicA });
    expect(result.issues.map((i) => [i.row, i.code])).toEqual(
      expect.arrayContaining([
        [5, "DUPLICATE"],
        [6, "REFERENCE"],
        [7, "DUPLICATE"],
        [8, "REFERENCE"],
      ]),
    );
  });

  it("reports children of invalid JSON nodes and invalid placements", () => {
    const file = json([
      { name: "", children: [{ name: "Child" }] },
      { name: "Section", kind: "SECTION", children: [{ name: "Topic in section", children: [{ name: "Sub", kind: "SECTION" }] }] },
    ]);
    const result = dryRun("TOPIC", file, stubLookups(), stubTopicLookups());
    expect(result.totalRows).toBe(5);
    expect(result.prepared.map((p) => (p as PreparedTopic).name)).toEqual(["Section", "Topic in section"]);
    expect(result.issues.find((i) => i.row === 2)?.message).toContain("parent (item 1) has errors");
    expect(result.issues.find((i) => i.row === 5)?.field).toBe("kind");
  });

  it("needs a draft syllabus version", () => {
    const result = dryRun("TOPIC", json([{ name: "A" }]), stubLookups(), null);
    expect(result.issues[0]?.message).toContain("DRAFT syllabus version");
  });
});
