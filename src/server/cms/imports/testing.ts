/**
 * Test helpers for the import module (not used by application code): stub lookups for the pure dry run and a tiny
 * `.xlsx` writer (inline strings) so Excel parsing is tested against real workbook bytes, plus a ZIP writer that can forge
 * archives (decompression bombs, lying headers, hidden entries) for the bounded `.xlsx` reader.
 */
import { randomUUID } from "node:crypto";
import { crc32, deflateRawSync } from "node:zlib";
import { strToU8, zipSync } from "fflate";
import type { ImportLookups, TopicLookups, TopicTarget } from "./rows";

export const STUB_IDS = {
  subject: randomUUID(),
  syllabus: randomUUID(),
  source: randomUUID(),
  topicA: randomUUID(),
  topicB: randomUUID(),
  objectiveA: randomUUID(),
  objectiveB: randomUUID(),
  objectiveC: randomUUID(),
} as const;

function target(id: string, name: string, kind: TopicTarget["kind"] = "TOPIC", depth = 0): TopicTarget {
  return { id, name, kind, depth, path: id };
}

/** Lookups for a subject whose version has topics "1" (Number) and "1.1" (Integers), objective codes E1, E2 (twice). */
export function stubLookups(overrides: Partial<ImportLookups> = {}): ImportLookups {
  const number = target(STUB_IDS.topicA, "Number");
  const integers = target(STUB_IDS.topicB, "Integers", "SUBTOPIC", 1);
  return {
    subject: { id: STUB_IDS.subject, languageCode: "en" },
    syllabus: { id: STUB_IDS.syllabus, label: "Test syllabus 2026" },
    topicRefs: new Map<string, TopicTarget | null>([
      ["1", number],
      ["number", number],
      ["1.1", integers],
      ["integers", integers],
      ["x", null],
    ]),
    objectiveRefs: new Map<string, readonly string[]>([
      ["e1", [STUB_IDS.objectiveA]],
      ["e2", [STUB_IDS.objectiveB, STUB_IDS.objectiveC]],
    ]),
    existingRefs: new Set(["already-1"]),
    defaults: { difficulty: 3, accessTier: "PREMIUM" },
    provenance: { sourceId: STUB_IDS.source, author: "Content team", licenceCode: "PROPRIETARY", attribution: null, sourceUrl: null },
    checkMarkdown: (source) => (source.includes("\\frac{") && !source.includes("}{") ? ["Line 1: The maths could not be read."] : source.includes("BROKEN") ? ["Line 1: The maths could not be read."] : []),
    ...overrides,
  };
}

export function stubTopicLookups(): TopicLookups {
  return {
    syllabus: { id: STUB_IDS.syllabus, label: "Test syllabus 2026" },
    existingByCode: new Map<string, TopicTarget | null>([["1", target(STUB_IDS.topicA, "Number")]]),
  };
}

function cellXml(value: string | number, column: number, row: number): string {
  const ref = `${String.fromCharCode(65 + column)}${row}`;
  if (typeof value === "number") return `<c r="${ref}"><v>${value}</v></c>`;
  const escaped = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escaped}</t></is></c>`;
}

function sheetRowsXml(rows: readonly (readonly (string | number)[])[]): string {
  return rows.map((cells, index) => `<row r="${index + 1}">${cells.map((cell, column) => cellXml(cell, column, index + 1)).join("")}</row>`).join("");
}

/** A minimal single-sheet `.xlsx` workbook (inline strings, numbers) built in memory. */
export function buildXlsx(rows: readonly (readonly (string | number)[])[]): Uint8Array {
  return zipSync(xlsxParts(sheetRowsXml(rows)));
}

/** The parts of a minimal single-sheet workbook whose `<sheetData>` is `sheetRows`. */
export function xlsxParts(sheetRows: string): Record<string, Uint8Array> {
  return {
    "[Content_Types].xml": strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
    ),
    "_rels/.rels": strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    ),
    "xl/workbook.xml": strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets></workbook>',
    ),
    "xl/_rels/workbook.xml.rels": strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
    ),
    "xl/worksheets/sheet1.xml": strToU8(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetRows}</sheetData></worksheet>`,
    ),
  };
}

/** One entry of {@link writeZip}. The overrides forge archives the way an attacker would. */
export interface ZipTestEntry {
  name: string;
  data: Uint8Array;
  /** Default "deflate" (level 9). */
  method?: "deflate" | "store";
  /** Uncompressed size written in BOTH headers instead of the real one (a lying header). */
  declaredSize?: number;
  /** General-purpose flags (e.g. 0x0001 = encrypted). */
  flags?: number;
  /** false: a local entry that the central directory does not list (hidden from directory-based readers). */
  listed?: boolean;
}

/** A tiny ZIP writer (node:zlib) for archive-level tests of `.xlsx` reading. */
export function writeZip(entries: readonly ZipTestEntry[]): Uint8Array {
  const out: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  let listedCount = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.name, "utf8");
    const store = entry.method === "store";
    const body = store ? Buffer.from(entry.data) : deflateRawSync(entry.data, { level: 9 });
    const size = entry.declaredSize ?? entry.data.byteLength;
    const crc = crc32(entry.data) >>> 0;
    const flags = (entry.flags ?? 0) | 0x0800;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(flags, 6);
    local.writeUInt16LE(store ? 0 : 8, 8);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(size, 22);
    local.writeUInt16LE(name.length, 26);
    out.push(local, name, body);
    if (entry.listed !== false) {
      const header = Buffer.alloc(46);
      header.writeUInt32LE(0x02014b50, 0);
      header.writeUInt16LE(20, 4);
      header.writeUInt16LE(20, 6);
      header.writeUInt16LE(flags, 8);
      header.writeUInt16LE(store ? 0 : 8, 10);
      header.writeUInt32LE(crc, 16);
      header.writeUInt32LE(body.length, 20);
      header.writeUInt32LE(size, 24);
      header.writeUInt16LE(name.length, 28);
      header.writeUInt32LE(offset, 42);
      central.push(header, name);
      listedCount += 1;
    }
    offset += 30 + name.length + body.length;
  }
  const centralSize = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(listedCount, 8);
  end.writeUInt16LE(listedCount, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  return new Uint8Array(Buffer.concat([...out, ...central, end]));
}

/** Worksheet rows of about `bytes` of XML: one 32,000-character inline string per row (compresses about 1000:1). */
export function bombSheetRows(bytes: number): string {
  const text = "a".repeat(32_000);
  const rows: string[] = [];
  let total = 0;
  for (let r = 1; total < bytes; r += 1) {
    const row = `<row r="${r}"><c r="A${r}" t="inlineStr"><is><t>${text}</t></is></c></row>`;
    rows.push(row);
    total += row.length;
  }
  return rows.join("");
}

/**
 * A decompression bomb: a VALID single-sheet workbook whose worksheet XML is at least `unpackedBytes` long while the
 * file itself stays small (e.g. 24 MB of XML in about 30 KB).
 */
export function buildXlsxBomb(unpackedBytes: number): Uint8Array {
  return writeZip(Object.entries(xlsxParts(bombSheetRows(unpackedBytes))).map(([name, data]) => ({ name, data })));
}
