import { describe, expect, it } from "vitest";
import { sniffMimeType } from "@/server/lib/uploads";
import { cellToText, formatFromMime, normalizeHeader, parseCsvRows, parseImportFile, parseJsonItems, rowsToRecords } from "./formats";
import { MAX_IMPORT_FILE_BYTES, MAX_IMPORT_XLSX_UNPACKED_BYTES } from "./constants";
import { buildXlsx, buildXlsxBomb } from "./testing";

const encode = (text: string) => new TextEncoder().encode(text);

describe("import file formats", () => {
  it("normalises headers to snake_case", () => {
    expect(normalizeHeader("Option A")).toBe("option_a");
    expect(normalizeHeader("﻿externalRef")).toBe("external_ref");
    expect(normalizeHeader("  Correct answer(s) ")).toBe("correct_answer_s");
    expect(normalizeHeader("Estimated-Minutes")).toBe("estimated_minutes");
  });

  it("maps sniffed mime types to formats", () => {
    expect(formatFromMime("text/csv")).toBe("CSV");
    expect(formatFromMime("application/json")).toBe("JSON");
    expect(formatFromMime("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")).toBe("XLSX");
    expect(formatFromMime("image/png")).toBeNull();
  });

  it("reads CSV with a BOM, quoted multi-line cells and blank rows, keeping spreadsheet row numbers", async () => {
    const text = '﻿Front;Back;Notes\r\nOsmosis;"Movement of water;\nthrough a membrane";\r\n\r\n"Speed ""v""";$v = d/t$;Distance over time\r\n';
    const parsed = await parseImportFile(encode(text), "CSV", "FLASHCARD");
    expect(parsed.issues).toEqual([]);
    if (parsed.kind !== "table") throw new Error("expected a table");
    expect(parsed.headers).toEqual(["front", "back", "notes"]);
    expect(parsed.records).toEqual([
      { row: 2, values: { front: "Osmosis", back: "Movement of water;\nthrough a membrane" } },
      { row: 4, values: { front: 'Speed "v"', back: "$v = d/t$", notes: "Distance over time" } },
    ]);
  });

  it("reports empty files, header-only files and duplicate headers", () => {
    expect(rowsToRecords([["", ""]], "QUESTION").issues[0]).toMatchObject({ code: "FILE", row: 0 });
    expect(rowsToRecords([["type", "stem"]], "QUESTION").issues[0]?.message).toContain("no data rows");
    const dup = rowsToRecords([["Stem", "stem"], ["a", "b"]], "QUESTION");
    expect(dup.issues[0]).toMatchObject({ severity: "warning", code: "FILE" });
    expect(dup.records[0]?.values).toEqual({ stem: "a" });
  });

  it("refuses files with too many rows", () => {
    const rows = [["front", "back"], ...Array.from({ length: 5_001 }, (_, i) => [`f${i}`, `b${i}`])];
    const result = rowsToRecords(rows, "FLASHCARD");
    expect(result.records).toEqual([]);
    expect(result.issues[0]?.message).toContain("more than 5,000 rows");
  });

  it("reports broken CSV quoting", () => {
    const { issues } = parseCsvRows('front,back\n"unterminated,cell\n');
    expect(issues[0]).toMatchObject({ code: "FILE", severity: "error" });
  });

  it("accepts JSON arrays and wrapper objects, refusing anything else", () => {
    expect(parseJsonItems('[{"front":"a","back":"b"}]', "FLASHCARD").records).toHaveLength(1);
    expect(parseJsonItems('{"flashcards":[{"front":"a","back":"b"}]}', "FLASHCARD").records).toHaveLength(1);
    expect(parseJsonItems('{"items":[{}, {}]}', "QUESTION").records.map((r) => r.row)).toEqual([1, 2]);
    expect(parseJsonItems('{"cards": 3}', "QUESTION").issues[0]?.message).toContain('"questions" or "items"');
    expect(parseJsonItems("{not json", "LESSON").issues[0]?.code).toBe("FILE");
    expect(parseJsonItems("[]", "LESSON").issues[0]?.message).toContain("no items");
  });

  it("refuses text that is not UTF-8", async () => {
    const parsed = await parseImportFile(new Uint8Array([0x66, 0x72, 0xff, 0xfe, 0x0a]), "CSV", "FLASHCARD");
    expect(parsed.issues[0]?.message).toContain("UTF-8");
  });

  it("reads the first worksheet of a real .xlsx workbook", async () => {
    const bytes = buildXlsx([
      ["Front", "Back", "Card type"],
      ["Osmosis", "Water movement through a membrane", "DEFINITION"],
      [],
      ["Year Zimbabwe became independent", 1980, "DATE"],
    ]);
    expect(sniffMimeType(bytes)).toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    const parsed = await parseImportFile(bytes, "XLSX", "FLASHCARD");
    expect(parsed.issues).toEqual([]);
    if (parsed.kind !== "table") throw new Error("expected a table");
    expect(parsed.headers).toEqual(["front", "back", "card_type"]);
    expect(parsed.records.map((r) => r.values)).toEqual([
      { front: "Osmosis", back: "Water movement through a membrane", card_type: "DEFINITION" },
      { front: "Year Zimbabwe became independent", back: "1980", card_type: "DATE" },
    ]);
  });

  // INJ-2 regression: the 20 MB upload cap bounds only the compressed bytes; the workbook used to be inflated in full.
  it("refuses an Excel decompression bomb before parsing it", async () => {
    const bomb = buildXlsxBomb(MAX_IMPORT_XLSX_UNPACKED_BYTES + 1024 * 1024);
    expect(bomb.byteLength).toBeLessThan(MAX_IMPORT_FILE_BYTES);
    const parsed = await parseImportFile(bomb, "XLSX", "QUESTION");
    expect(parsed.records).toEqual([]);
    expect(parsed.issues).toEqual([expect.objectContaining({ code: "FILE", row: 0, message: expect.stringContaining("too much data once unpacked") })]);
  });

  it("reports unreadable workbooks instead of throwing", async () => {
    const parsed = await parseImportFile(encode("PK\u0003\u0004not really a zip"), "XLSX", "QUESTION");
    expect(parsed.issues[0]).toMatchObject({ code: "FILE", row: 0 });
  });

  it("turns Excel cells into text", () => {
    expect(cellToText(2)).toBe("2");
    expect(cellToText(true)).toBe("true");
    expect(cellToText(new Date("2026-10-05T00:00:00Z"))).toBe("2026-10-05");
    expect(cellToText(null)).toBe("");
  });
});
