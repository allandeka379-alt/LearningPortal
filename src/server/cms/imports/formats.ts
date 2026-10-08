import Papa from "papaparse";
import { readFirstSheet, XlsxError } from "@/server/lib/xlsx";
import { IMPORT_FORMATS, MAX_IMPORT_ROWS, MAX_IMPORT_XLSX_UNPACKED_BYTES, type ImportEntityType, type ImportFormat, type ImportIssue } from "./constants";

/**
 * Reading uploaded import files (§25) into records, before any validation of their content. No database access.
 *
 * - CSV (comma, semicolon or tab; detected), UTF-8 with or without BOM; quoted cells may span lines. Row numbers are
 *   SPREADSHEET row numbers (header = row 1) so editors can find a reported row in Excel / Google Sheets.
 * - Excel `.xlsx`: the FIRST worksheet; the first non-empty row is the header. Unpacked through `@/server/lib/xlsx`
 *   (bounded by {@link MAX_IMPORT_XLSX_UNPACKED_BYTES}: decompression bombs are refused before parsing).
 * - JSON: an array of items, or `{ "<entity plural>": [...] }` / `{ "items": [...] }`. Row numbers are 1-based item
 *   numbers.
 * Headers are normalised to snake_case (`Option A` → `option_a`, `externalRef` → `external_ref`); blank rows are
 * skipped. The file type was already decided by magic-byte sniffing at upload (never by the file name).
 */

/** One data row of a spreadsheet: normalised header → raw cell text (blank cells omitted). */
export interface TableRecord {
  row: number;
  values: Record<string, string>;
}

/** One item of a JSON import. */
export interface JsonRecord {
  row: number;
  value: unknown;
}

export type ParsedImportFile =
  | { kind: "table"; format: "CSV" | "XLSX"; headers: string[]; records: TableRecord[]; issues: ImportIssue[] }
  | { kind: "json"; format: "JSON"; records: JsonRecord[]; issues: ImportIssue[] };

const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

/** The import format of a SNIFFED mime type (see `sniffMimeType`), or null when the type cannot be imported. */
export function formatFromMime(mimeType: string): ImportFormat | null {
  switch (mimeType) {
    case "text/csv":
      return "CSV";
    case XLSX_MIME:
      return "XLSX";
    case "application/json":
      return "JSON";
    default:
      return null;
  }
}

export function isImportFormat(value: unknown): value is ImportFormat {
  return typeof value === "string" && (IMPORT_FORMATS as readonly string[]).includes(value);
}

/** `Option A` → `option_a`, `externalRef` → `external_ref`, `Correct answer(s)` → `correct_answer_s`. */
export function normalizeHeader(raw: string): string {
  return raw
    .replace(/^﻿/, "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function fileIssue(message: string, row = 0): ImportIssue {
  return { row, code: "FILE", message, severity: "error" };
}

function decodeText(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^﻿/, "");
  } catch {
    return null;
  }
}

/** Turns raw rows (first non-empty row = header) into records. Pure. */
export function rowsToRecords(
  rows: readonly (readonly string[])[],
  entityType: ImportEntityType,
): { headers: string[]; records: TableRecord[]; issues: ImportIssue[] } {
  const issues: ImportIssue[] = [];
  const headerIndex = rows.findIndex((cells) => cells.some((cell) => cell.trim() !== ""));
  if (headerIndex < 0) return { headers: [], records: [], issues: [fileIssue("The file is empty. Download a template to see the expected columns.")] };
  const rawHeaders = rows[headerIndex] ?? [];
  const headers = rawHeaders.map((cell) => normalizeHeader(cell));
  const seen = new Set<string>();
  headers.forEach((header, index) => {
    if (header === "") return;
    if (seen.has(header)) {
      issues.push({ row: headerIndex + 1, field: rawHeaders[index]?.trim(), code: "FILE", message: `The column "${rawHeaders[index]?.trim()}" appears twice; only the first one is read.`, severity: "warning" });
      headers[index] = "";
    }
    seen.add(header);
  });

  const records: TableRecord[] = [];
  const max = MAX_IMPORT_ROWS[entityType];
  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const cells = rows[index] ?? [];
    if (!cells.some((cell) => cell.trim() !== "")) continue;
    if (records.length >= max) {
      return {
        headers,
        records: [],
        issues: [fileIssue(`The file has more than ${max.toLocaleString("en")} rows. Split it into smaller files.`, index + 1)],
      };
    }
    const values: Record<string, string> = {};
    cells.forEach((cell, column) => {
      const header = headers[column];
      if (header && cell.trim() !== "" && !(header in values)) values[header] = cell;
    });
    records.push({ row: index + 1, values });
  }
  if (records.length === 0) issues.push(fileIssue("The file has a header row but no data rows."));
  return { headers: headers.filter((header) => header !== ""), records, issues };
}

/** Parses CSV text into raw rows (no type coercion). */
export function parseCsvRows(text: string): { rows: string[][]; issues: ImportIssue[] } {
  const result = Papa.parse<string[]>(text, { header: false, skipEmptyLines: false, dynamicTyping: false });
  const issues: ImportIssue[] = [];
  for (const error of result.errors) {
    // A one-column file has no delimiter to detect; papaparse falls back to a comma, which is right.
    if (error.code === "UndetectableDelimiter") continue;
    issues.push(fileIssue(`The CSV could not be read near row ${(error.row ?? 0) + 1}: ${error.message}.`, (error.row ?? 0) + 1));
  }
  return { rows: result.data.map((cells) => (Array.isArray(cells) ? cells.map((cell) => (typeof cell === "string" ? cell : String(cell ?? ""))) : [])), issues };
}

/** Excel cell → text: numbers as written, booleans as true/false, dates as YYYY-MM-DD (or ISO when they carry a time). */
export function cellToText(cell: unknown): string {
  if (cell === null || cell === undefined) return "";
  if (typeof cell === "string") return cell;
  if (typeof cell === "number") return Number.isFinite(cell) ? String(cell) : "";
  if (typeof cell === "boolean") return cell ? "true" : "false";
  if (cell instanceof Date) {
    if (Number.isNaN(cell.getTime())) return "";
    const iso = cell.toISOString();
    return iso.endsWith("T00:00:00.000Z") ? iso.slice(0, 10) : iso;
  }
  return String(cell);
}

const JSON_COLLECTION_KEYS: Readonly<Record<ImportEntityType, readonly string[]>> = {
  QUESTION: ["questions", "items"],
  FLASHCARD: ["flashcards", "cards", "items"],
  LESSON: ["lessons", "items"],
  TOPIC: ["topics", "items"],
};

/** Parses JSON text into items (pure). */
export function parseJsonItems(text: string, entityType: ImportEntityType): { records: JsonRecord[]; issues: ImportIssue[] } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return { records: [], issues: [fileIssue(`The JSON could not be read: ${error instanceof Error ? error.message : "syntax error"}.`)] };
  }
  let items: unknown = parsed;
  if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
    const key = JSON_COLLECTION_KEYS[entityType].find((candidate) => Array.isArray((parsed as Record<string, unknown>)[candidate]));
    items = key ? (parsed as Record<string, unknown>)[key] : undefined;
  }
  if (!Array.isArray(items)) {
    const keys = JSON_COLLECTION_KEYS[entityType].map((k) => `"${k}"`).join(" or ");
    return { records: [], issues: [fileIssue(`The JSON must be an array of items, or an object with a ${keys} array.`)] };
  }
  const max = MAX_IMPORT_ROWS[entityType];
  if (items.length > max) return { records: [], issues: [fileIssue(`The file has more than ${max.toLocaleString("en")} items. Split it into smaller files.`)] };
  if (items.length === 0) return { records: [], issues: [fileIssue("The JSON contains no items.")] };
  return { records: items.map((value, index) => ({ row: index + 1, value })), issues: [] };
}

/**
 * Reads an import file into records. Never throws for bad content: problems are returned as FILE issues (with no
 * records when the file as a whole is unusable).
 */
export async function parseImportFile(bytes: Uint8Array, format: ImportFormat, entityType: ImportEntityType): Promise<ParsedImportFile> {
  if (format === "XLSX") {
    let sheet: unknown[][];
    try {
      // Bounded unpacking (decompression bombs): the upload cap only limits the compressed bytes.
      sheet = await readFirstSheet(bytes, { maxUncompressedBytes: MAX_IMPORT_XLSX_UNPACKED_BYTES });
    } catch (error) {
      const message =
        error instanceof XlsxError && error.kind === "too_large"
          ? "This Excel workbook holds too much data once unpacked. Keep only the import sheet, split it into smaller files, or export it as CSV."
          : "This does not look like a readable Excel workbook (.xlsx). Save it again from Excel or export it as CSV.";
      return { kind: "table", format, headers: [], records: [], issues: [fileIssue(message)] };
    }
    const rows = sheet.map((cells) => (Array.isArray(cells) ? cells.map(cellToText) : []));
    return { kind: "table", format, ...rowsToRecords(rows, entityType) };
  }
  const text = decodeText(bytes);
  if (text === null) {
    const issue = fileIssue("The file is not UTF-8 text. In Excel use “Save as → CSV UTF-8”, or upload the .xlsx file instead.");
    return format === "JSON" ? { kind: "json", format, records: [], issues: [issue] } : { kind: "table", format, headers: [], records: [], issues: [issue] };
  }
  if (format === "JSON") return { kind: "json", format, ...parseJsonItems(text, entityType) };
  const csv = parseCsvRows(text);
  if (csv.issues.some((issue) => issue.severity === "error")) return { kind: "table", format, headers: [], records: [], issues: csv.issues };
  const table = rowsToRecords(csv.rows, entityType);
  return { kind: "table", format, headers: table.headers, records: table.records, issues: [...csv.issues, ...table.issues] };
}
