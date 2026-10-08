import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { json, removeTree, tempRoot, TINY_PNG, writeTree, type FileMap } from "./testing";
import { validateContent } from "./validate";

/**
 * docs/CONTENT_PIPELINE.md is the contract AI and human writers follow, so its examples must be valid: every
 * ```json block marked `<!-- example:question|flashcard|assessment -->` is validated here with the real validator,
 * against the repository's mathematics registry and syllabi plus a small biology fixture.
 */

const repoRoot = path.resolve(__dirname, "../../..");
const doc = readFileSync(path.join(repoRoot, "docs", "CONTENT_PIPELINE.md"), "utf8");

function examples(kind: string): Record<string, unknown>[] {
  const pattern = new RegExp(`<!-- example:${kind} -->\\s*\`\`\`json\\n([\\s\\S]*?)\\n\`\`\``, "g");
  return [...doc.matchAll(pattern)].map((match) => JSON.parse(match[1] as string) as Record<string, unknown>);
}

const BIOLOGY_REGISTRY = {
  family: "biology-o",
  name: "Biology (fixture)",
  level: "O",
  prefix: "bio",
  subjects: ["zimsec/o-level/biology"],
  concepts: [
    { key: "bio.cells.organelles", name: "Cell organelles" },
    { key: "bio.transport.heart", name: "The heart" },
    { key: "bio.nutrition.photosynthesis", name: "Photosynthesis" },
    { key: "bio.nutrition.digestion-absorption", name: "Digestion and absorption" },
  ],
};

const BIOLOGY_SYLLABUS = {
  board: "zimsec",
  qualification: "o-level",
  subject: "biology",
  versionLabel: "fixture",
  family: "biology-o",
  title: "Biology fixture",
  code: null,
  effectiveFrom: "2030-01-01",
  officialDocument: { title: "Fixture", url: "https://example.org/biology.pdf", publisher: "Fixture" },
  topics: [
    { key: "cells", name: "Cells", covers: ["bio.cells.organelles"] },
    { key: "transport", name: "Transport in animals", covers: ["bio.transport.heart"] },
    { key: "nutrition", name: "Nutrition", children: [
      { key: "nutrition.plants", name: "Plant nutrition", covers: ["bio.nutrition.photosynthesis"] },
      { key: "nutrition.humans", name: "Human nutrition", covers: ["bio.nutrition.digestion-absorption"] },
    ] },
  ],
};

const HISTORY_REGISTRY = {
  family: "history-o",
  name: "History (fixture)",
  level: "O",
  prefix: "hist",
  subjects: ["zimsec/o-level/history"],
  concepts: [{ key: "hist.colonial.risings-1896", name: "The risings of 1896-1897" }],
};

const HISTORY_SYLLABUS = {
  board: "zimsec",
  qualification: "o-level",
  subject: "history",
  versionLabel: "fixture",
  family: "history-o",
  title: "History fixture",
  code: null,
  effectiveFrom: "2030-01-01",
  officialDocument: { title: "Fixture", url: "https://example.org/history.pdf", publisher: "Fixture" },
  topics: [{ key: "colonial", name: "Colonial rule", covers: ["hist.colonial.risings-1896"] }],
};

/** The fixture family an example belongs to, by the prefix of its first concept. */
function familyOf(item: Record<string, unknown>): string {
  const prefix = ((item.concepts as string[])[0] ?? "").split(".")[0];
  return prefix === "bio" ? "biology-o" : prefix === "hist" ? "history-o" : "mathematics-o";
}

const roots: string[] = [];
afterAll(() => roots.forEach(removeTree));

describe("docs/CONTENT_PIPELINE.md examples", () => {
  const questions = examples("question");
  const flashcards = examples("flashcard");
  const assessments = examples("assessment");

  it("has an example for every question type", () => {
    const types = new Set(questions.map((q) => q.type));
    for (const type of ["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "NUMERICAL", "CALCULATION", "FILL_IN_THE_BLANK", "MATCHING", "DIAGRAM_LABELLING", "STRUCTURED", "ESSAY", "EXTENDED_RESPONSE"]) {
      expect(types.has(type), type).toBe(true);
    }
    expect(questions.some((q) => (q.payload as { selectMode?: string } | undefined)?.selectMode === "multiple")).toBe(true);
    // A structured example with sub-parts, answered by label path.
    expect(questions.some((q) => (q.parts as { type: string }[] | undefined)?.some((part) => part.type === "STRUCTURED"))).toBe(true);
    expect(flashcards.length).toBeGreaterThan(0);
    expect(assessments.length).toBeGreaterThanOrEqual(3);
  });

  it("validates every example with no errors", () => {
    const root = tempRoot("docs");
    roots.push(root);
    const files: FileMap = {
      "content/concepts/mathematics-o.json": readFileSync(path.join(repoRoot, "content/concepts/mathematics-o.json"), "utf8"),
      "content/syllabi/zimsec/o-level/mathematics/2015-2022.json": readFileSync(path.join(repoRoot, "content/syllabi/zimsec/o-level/mathematics/2015-2022.json"), "utf8"),
      "content/syllabi/cambridge/igcse/mathematics/2025-2027.json": readFileSync(path.join(repoRoot, "content/syllabi/cambridge/igcse/mathematics/2025-2027.json"), "utf8"),
      "content/concepts/biology-o.json": json(BIOLOGY_REGISTRY),
      "content/syllabi/zimsec/o-level/biology/fixture.json": json(BIOLOGY_SYLLABUS),
      "content/concepts/history-o.json": json(HISTORY_REGISTRY),
      "content/syllabi/zimsec/o-level/history/fixture.json": json(HISTORY_SYLLABUS),
      "content/subjects/mathematics-o/questions/examples.json": json(questions.filter((q) => familyOf(q) === "mathematics-o")),
      "content/subjects/biology-o/questions/examples.json": json(questions.filter((q) => familyOf(q) === "biology-o")),
      "content/subjects/history-o/questions/examples.json": json(questions.filter((q) => familyOf(q) === "history-o")),
      "content/subjects/mathematics-o/flashcards/examples.json": json(flashcards),
      "content/subjects/mathematics-o/assessments/examples.json": json(assessments),
      "content/subjects/biology-o/media/media.json": json([{ file: "diagrams/heart-front.png", alt: "Front view of the human heart with the aorta and vena cava", purpose: "DIAGRAM" }]),
    };
    writeTree(root, files);
    const media = path.join(root, "content/subjects/biology-o/media/diagrams");
    mkdirSync(media, { recursive: true });
    writeFileSync(path.join(media, "heart-front.png"), TINY_PNG);
    const result = validateContent({ repoRoot: root, cacheDir: null });
    const errors = result.issues.filter((i) => i.severity === "error");
    expect(errors).toEqual([]);
  }, 60_000);
});
