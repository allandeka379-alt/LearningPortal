import Papa from "papaparse";
import { z } from "zod";
import type { ImportEntityType, TemplateFile } from "./constants";
import { IMPORT_COLUMNS, IMPORT_ITEM_SCHEMAS, type ColumnSpec } from "./items";

/**
 * Downloadable import templates (§25), generated from the same definitions the importer validates with
 * (./items.ts): the CSV header row is the column list, the JSON Schema is `z.toJSONSchema` of the item schema, and the
 * examples are ORIGINAL sample content (never copied from past papers or textbooks, §27) that passes the dry run
 * unchanged (a unit test checks this). Pure.
 */

type Example = Record<string, unknown>;

/** Example items per type (JSON shape). Topic references are left out so the examples import into any subject. */
export const TEMPLATE_EXAMPLES: Readonly<Record<ImportEntityType, readonly Example[]>> = {
  QUESTION: [
    {
      externalRef: "EXAMPLE-Q-0001",
      type: "MULTIPLE_CHOICE",
      stem: "Tendai buys 3 exercise books at 45 cents each. How much does she pay?",
      marks: 1,
      difficulty: 1,
      options: [{ content: "USD 1.25" }, { content: "USD 1.35" }, { content: "USD 1.45" }, { content: "USD 1.55" }],
      correct: ["B"],
      explanation: "$3 \\times 45 = 135$ cents, which is USD 1.35.",
      hints: ["Multiply the price of one book by the number of books."],
    },
    {
      externalRef: "EXAMPLE-Q-0002",
      type: "TRUE_FALSE",
      stem: "The interior angles of a triangle add up to $180^\\circ$.",
      answer: true,
      difficulty: 1,
      explanation: "This is true for every triangle drawn on a flat surface.",
    },
    {
      externalRef: "EXAMPLE-Q-0003",
      type: "SHORT_ANSWER",
      stem: "Name the gas that green plants take in from the air for photosynthesis.",
      answer: "carbon dioxide|CO2",
      difficulty: 2,
      explanation: "Plants use carbon dioxide and water to make glucose, releasing oxygen.",
    },
    {
      externalRef: "EXAMPLE-Q-0004",
      type: "NUMERICAL",
      stem: "A minibus travels 120 km from Harare to Marondera in 1.5 hours. Calculate its average speed in km/h.",
      answer: 80,
      tolerance: 0,
      units: ["km/h", "km/hr"],
      marks: 2,
      difficulty: 2,
      workedSolution: "Average speed $= \\dfrac{120}{1.5} = 80$ km/h.",
    },
    {
      externalRef: "EXAMPLE-Q-0005",
      type: "ESSAY",
      stem: "Explain two ways in which farmers can reduce soil erosion on sloping land.",
      markScheme: ["Contour ridges or terraces slow down run-off water [2]", "Cover crops, mulch or trees protect the soil surface [2]"],
      modelAnswer: "Building contour ridges slows the water flowing down the slope, so less soil is carried away. Keeping the ground covered with crops or mulch protects it from raindrops.",
      difficulty: 3,
    },
  ],
  FLASHCARD: [
    { externalRef: "EXAMPLE-F-0001", cardType: "DEFINITION", front: "Osmosis", back: "The movement of water molecules from a dilute solution to a concentrated solution through a partially permeable membrane." },
    { externalRef: "EXAMPLE-F-0002", cardType: "FORMULA", front: "Average speed", back: "$v = \\dfrac{d}{t}$", notes: "Distance divided by time taken." },
    { externalRef: "EXAMPLE-F-0003", cardType: "VOCABULARY", front: "Ecosystem", back: "A community of living things together with their non-living environment." },
  ],
  LESSON: [
    {
      externalRef: "EXAMPLE-L-0001",
      title: "Calculating average speed",
      kind: "LESSON",
      summary: "How to find average speed from distance and time.",
      body: "## What is average speed?\n\nAverage speed tells us how far something travels in each unit of time.\n\n:::formula{name=\"Average speed\"}\n$$\nv = \\frac{d}{t}\n$$\n:::\n\n:::exam-tip\nAlways write the unit, for example km/h or m/s.\n:::",
      estimatedMinutes: 8,
    },
    {
      externalRef: "EXAMPLE-L-0002",
      markdown: "---\ntitle: Introducing ecosystems\nkind: REVISION_NOTES\nsummary: Living and non-living parts of an ecosystem.\n---\n## Key ideas\n\n:::definition{term=\"Ecosystem\"}\nA community of living things together with their non-living environment.\n:::\n",
    },
  ],
  TOPIC: [
    {
      code: "N1",
      name: "Number",
      kind: "TOPIC",
      children: [
        { code: "N1.1", name: "Integers", objectives: ["Identify and use positive and negative integers", { code: "N1.1b", statement: "Order integers on a number line" }] },
        { code: "N1.2", name: "Fractions and decimals", objectives: ["Convert between fractions and decimals"] },
      ],
    },
  ],
};

/** Flat (spreadsheet) form of the topic example: children become rows with a `parent` code. */
function flattenTopicExample(items: readonly Example[], parent?: string): Example[] {
  return items.flatMap((item) => {
    const { children, ...own } = item as Example & { children?: Example[] };
    const row: Example = parent ? { ...own, parent } : own;
    return [row, ...flattenTopicExample(children ?? [], typeof own.code === "string" ? own.code : undefined)];
  });
}

function cellFor(column: ColumnSpec, item: Example): string {
  if (column.kind === "option") {
    const options = item.options as { content: string }[] | undefined;
    const index = column.optionKey ? column.optionKey.charCodeAt(0) - 65 : -1;
    return options?.[index]?.content ?? "";
  }
  const value = item[column.field];
  if (value === undefined || value === null) return "";
  if (column.kind === "keys" && Array.isArray(value)) return value.join(",");
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === "string" ? entry : typeof entry === "object" && entry !== null && "statement" in entry ? `${String((entry as { code?: string }).code ?? "")}: ${String((entry as { statement: string }).statement)}` : JSON.stringify(entry)))
      .join("|");
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/** The CSV template: every column of the type, then the example rows (UTF-8 with a BOM so Excel keeps accents). */
export function csvTemplate(entityType: ImportEntityType): string {
  const columns = IMPORT_COLUMNS[entityType];
  const examples = entityType === "TOPIC" ? flattenTopicExample(TEMPLATE_EXAMPLES.TOPIC) : entityType === "LESSON" ? TEMPLATE_EXAMPLES.LESSON.filter((item) => item.markdown === undefined) : TEMPLATE_EXAMPLES[entityType];
  const data = examples.map((item) => columns.map((column) => cellFor(column, item)));
  return `\uFEFF${Papa.unparse({ fields: columns.map((column) => column.header), data }, { newline: "\r\n" })}\r\n`;
}

/** The JSON example file. */
export function jsonExample(entityType: ImportEntityType): string {
  const key = { QUESTION: "questions", FLASHCARD: "flashcards", LESSON: "lessons", TOPIC: "topics" }[entityType];
  return `${JSON.stringify({ [key]: TEMPLATE_EXAMPLES[entityType] }, null, 2)}\n`;
}

/** JSON Schema (draft 2020-12) of a JSON import file, generated from the item schema. */
export function jsonSchema(entityType: ImportEntityType): string {
  const key = { QUESTION: "questions", FLASHCARD: "flashcards", LESSON: "lessons", TOPIC: "topics" }[entityType];
  const file = z.object({ [key]: z.array(IMPORT_ITEM_SCHEMAS[entityType]).min(1) });
  const schema = z.toJSONSchema(file, { io: "input", unrepresentable: "any", reused: "ref" });
  return `${JSON.stringify({ ...schema, title: `${entityType.toLowerCase()} import file` }, null, 2)}\n`;
}

/** File body of one template download. */
export function templateFile(entityType: ImportEntityType, file: TemplateFile): string {
  switch (file) {
    case "template.csv":
      return csvTemplate(entityType);
    case "example.json":
      return jsonExample(entityType);
    case "schema.json":
      return jsonSchema(entityType);
  }
}

/** Download file name, e.g. `questions-import-template.csv`. */
export function templateFileName(entityType: ImportEntityType, file: TemplateFile): string {
  const base = { QUESTION: "questions", FLASHCARD: "flashcards", LESSON: "lessons", TOPIC: "topics" }[entityType];
  return file === "template.csv" ? `${base}-import-template.csv` : file === "example.json" ? `${base}-import-example.json` : `${base}-import.schema.json`;
}
