import { describe, expect, it } from "vitest";
import { collapseUnchanged, diffSnapshots, flattenSnapshot, labelForPath, lineDiff, referencedIds, type JsonObject } from "./diff";

const T1 = "11111111-1111-4111-8111-111111111111";
const T2 = "22222222-2222-4222-8222-222222222222";
const SRC = "33333333-3333-4333-8333-333333333333";
const Q1 = "44444444-4444-4444-8444-444444444444";

function lesson(overrides: Partial<Record<string, unknown>> = {}, extra: Partial<JsonObject> = {}): JsonObject {
  return {
    lesson: {
      id: "L",
      title: "Solving equations",
      body: "## Method\n\nStep one.\nStep two.\nStep three.",
      summary: null,
      sourceId: SRC,
      status: "PUBLISHED",
      revision: 1,
      updatedAt: "2026-10-01T10:00:00.000Z",
      publicationDate: "2026-10-01T00:00:00.000Z",
      ...overrides,
    } as JsonObject,
    topics: [{ topicId: T1, isPrimary: true, sortOrder: 0 }],
    objectives: [],
    questions: [{ questionId: Q1, sortOrder: 0 }],
    ...extra,
  };
}

const labels = new Map([
  [T1, "1 Algebra"],
  [T2, "2 Geometry"],
  [SRC, "Original content"],
  [Q1, "Solve 2x = 4 [numerical]"],
]);

describe("diffSnapshots", () => {
  it("reports only content changes, with readable labels and line diffs for long text", () => {
    const before = lesson();
    const after = lesson(
      { title: "Solving linear equations", body: "## Method\n\nStep one.\nStep 2 (revised).\nStep three.", status: "DRAFT", revision: 2, updatedAt: "2026-10-05T10:00:00.000Z" },
      { topics: [{ topicId: T1, isPrimary: true, sortOrder: 0 }, { topicId: T2, isPrimary: false, sortOrder: 0 }] },
    );
    const entries = diffSnapshots("LESSON", before, after, labels);
    expect(entries.map((e) => e.path)).toEqual(["lesson.title", "lesson.body", "topics"]);
    expect(entries[0]).toMatchObject({ label: "Title", change: "changed", before: "Solving equations", after: "Solving linear equations" });
    expect(entries[1]?.lines).toEqual([
      { kind: "same", text: "## Method" },
      { kind: "same", text: "" },
      { kind: "same", text: "Step one." },
      { kind: "del", text: "Step two." },
      { kind: "add", text: "Step 2 (revised)." },
      { kind: "same", text: "Step three." },
    ]);
    expect(entries[2]).toMatchObject({ label: "Topics", before: "1 Algebra (primary)", after: "1 Algebra (primary)\n2 Geometry" });
  });

  it("marks added and removed fields and names ids through labels", () => {
    const before = lesson({ summary: null });
    const after = lesson({ summary: "Short summary", sourceId: null }, { questions: [] });
    const entries = diffSnapshots("LESSON", before, after, labels);
    expect(entries.find((e) => e.path === "lesson.summary")).toMatchObject({ change: "added", after: "Short summary" });
    expect(entries.find((e) => e.path === "lesson.sourceId")).toMatchObject({ change: "removed", before: "Original content", label: "Source" });
    expect(entries.find((e) => e.path === "questions")).toMatchObject({ change: "removed", before: "1. Solve 2x = 4 [numerical]" });
    expect(diffSnapshots("LESSON", before, before, labels)).toEqual([]);
  });

  it("flattens questions by option key and part label", () => {
    const snapshot: JsonObject = {
      question: { id: "q", stem: "Solve", marks: 2, partOrder: 0 },
      options: [{ id: "o1", key: "A", content: "$x = 1$", isCorrect: true, sortOrder: 0 }],
      parts: [{ id: "p1", partLabel: "(a)", stem: "Part a", marks: 1, options: [], parts: [] }],
      topics: [],
      objectives: [],
    };
    const flat = flattenSnapshot("QUESTION", snapshot);
    expect(flat.get("options.A.content")).toBe("$x = 1$");
    expect(flat.get("options.A.isCorrect")).toBe("Yes");
    expect(flat.get("parts.(a).stem")).toBe("Part a");
    expect(labelForPath("options.A.isCorrect")).toBe("Option A · Correct");
    expect(labelForPath("parts.(a).marks")).toBe("Part (a) · Marks");
    expect(labelForPath("lesson.metaTitle")).toBe("SEO title");
    expect(labelForPath("sections.2.items")).toBe("Section 2 · Items");
  });

  it("collects referenced ids for label loading", () => {
    expect([...referencedIds(lesson())].sort()).toEqual([Q1, SRC, T1].sort());
  });
});

describe("lineDiff / collapseUnchanged", () => {
  it("diffs line by line and collapses long unchanged runs", () => {
    const before = Array.from({ length: 12 }, (_, i) => `line ${i}`).join("\n");
    const after = before.replace("line 6", "line six");
    const lines = lineDiff(before, after);
    expect(lines.filter((l) => l.kind !== "same")).toEqual([
      { kind: "del", text: "line 6" },
      { kind: "add", text: "line six" },
    ]);
    const collapsed = collapseUnchanged(lines, 1);
    expect(collapsed[0]).toEqual({ kind: "skip", count: 5 });
    expect(collapsed.at(-1)).toEqual({ kind: "skip", count: 4 });
    expect(lineDiff("", "a\nb")).toEqual([
      { kind: "add", text: "a" },
      { kind: "add", text: "b" },
    ]);
  });
});
