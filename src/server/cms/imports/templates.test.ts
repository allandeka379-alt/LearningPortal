import { describe, expect, it } from "vitest";
import { IMPORT_ENTITY_TYPES } from "./constants";
import { parseImportFile } from "./formats";
import { IMPORT_COLUMNS, IMPORT_ITEM_SCHEMAS } from "./items";
import { dryRun } from "./rows";
import { csvTemplate, jsonExample, jsonSchema, TEMPLATE_EXAMPLES, templateFileName } from "./templates";
import { stubLookups, stubTopicLookups } from "./testing";

const encode = (text: string) => new TextEncoder().encode(text);

describe("import templates", () => {
  it.each(IMPORT_ENTITY_TYPES)("%s: the CSV template and JSON example pass the dry run unchanged", async (entityType) => {
    const topicLookups = entityType === "TOPIC" ? stubTopicLookups() : null;
    const csv = await parseImportFile(encode(csvTemplate(entityType)), "CSV", entityType);
    const csvRun = dryRun(entityType, csv, stubLookups(), topicLookups);
    expect(csvRun.issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(csvRun.validRows).toBeGreaterThan(0);

    const example = await parseImportFile(encode(jsonExample(entityType)), "JSON", entityType);
    const jsonRun = dryRun(entityType, example, stubLookups(), topicLookups);
    expect(jsonRun.issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(jsonRun.validRows).toBe(entityType === "TOPIC" ? 3 : TEMPLATE_EXAMPLES[entityType].length);
  });

  it.each(IMPORT_ENTITY_TYPES)("%s: every spreadsheet column maps onto a field of the item schema", (entityType) => {
    const text = jsonSchema(entityType);
    for (const column of IMPORT_COLUMNS[entityType]) expect(text).toContain(`"${column.field}"`);
    // Every column's field is accepted by the item schema (strict objects reject unknown keys).
    for (const column of IMPORT_COLUMNS[entityType].filter((c) => c.kind !== "option")) {
      const result = IMPORT_ITEM_SCHEMAS[entityType].safeParse({ [column.field]: null });
      const unknownKey = result.success ? false : result.error.issues.some((issue) => issue.code === "unrecognized_keys");
      expect(unknownKey, `${entityType}.${column.field}`).toBe(false);
    }
  });

  it("starts the CSV with every column header (and a BOM for Excel)", () => {
    const csv = csvTemplate("QUESTION");
    expect(csv.startsWith("﻿external_ref,type,stem,marks,difficulty,option_a")).toBe(true);
    expect(templateFileName("QUESTION", "template.csv")).toBe("questions-import-template.csv");
    expect(templateFileName("TOPIC", "schema.json")).toBe("topics-import.schema.json");
  });

  it("generates a JSON Schema with the recursive topic children", () => {
    const schema = JSON.parse(jsonSchema("TOPIC")) as Record<string, unknown>;
    expect(JSON.stringify(schema)).toContain("children");
    expect(schema.title).toBe("topic import file");
  });
});
