import { describe, expect, it } from "vitest";
import { bombSheetRows, buildXlsx, buildXlsxBomb, writeZip, xlsxParts, type ZipTestEntry } from "@/server/cms/imports/testing";
import { assertBoundedXml, MAX_XML_MARKUP_BYTES, MAX_XML_TEXT_BYTES, readFirstSheet, unpackXlsxParts, XlsxError } from "./xlsx";

/**
 * INJ-2 regression: an .xlsx upload is a ZIP archive, and the parser used to inflate every part into memory with no
 * limit, so a ~1 MB "roster" could unpack to hundreds of MB (up to ~2 GB) inside the web process. The bounded reader
 * refuses such archives before parsing, whatever their headers claim.
 */

const MB = 1024 * 1024;
const LIMITS = { maxUncompressedBytes: 16 * MB };
const ROWS = [
  ["First name", "Last name", "Class"],
  ["Tendai", "Moyo", "3B"],
  ["Rudo", "Dube", 4],
];

function entries(sheetRows: string): ZipTestEntry[] {
  return Object.entries(xlsxParts(sheetRows)).map(([name, data]) => ({ name, data }));
}

const normalSheet = '<row r="1"><c r="A1" t="inlineStr"><is><t>First name</t></is></c></row><row r="2"><c r="A2" t="inlineStr"><is><t>Tendai</t></is></c></row>';

async function refusal(promise: Promise<unknown>): Promise<XlsxError> {
  const error = await promise.then(
    () => null,
    (e: unknown) => e,
  );
  expect(error).toBeInstanceOf(XlsxError);
  return error as XlsxError;
}

describe("readFirstSheet", () => {
  it("reads ordinary workbooks (deflated or stored parts)", async () => {
    expect(await readFirstSheet(buildXlsx(ROWS), LIMITS)).toEqual(ROWS);
    expect(await readFirstSheet(writeZip(entries(normalSheet)), LIMITS)).toEqual([["First name"], ["Tendai"]]);
    expect(await readFirstSheet(writeZip(entries(normalSheet).map((e) => ({ ...e, method: "store" as const }))), LIMITS)).toEqual([["First name"], ["Tendai"]]);
  });

  it("refuses a decompression bomb from its central directory, before inflating anything", async () => {
    const bomb = buildXlsxBomb(24 * MB);
    expect(bomb.byteLength).toBeLessThan(2 * MB); // passes the roster upload cap (2 MB compressed)
    const error = await refusal(readFirstSheet(bomb, LIMITS));
    expect(error.kind).toBe("too_large");
  });

  it("refuses a bomb whose headers lie about its size, inflating no more than the declared size", async () => {
    const forged = entries(bombSheetRows(24 * MB)).map((e) => (e.name.endsWith("sheet1.xml") ? { ...e, declaredSize: 4_096 } : e));
    const error = await refusal(readFirstSheet(writeZip(forged), LIMITS));
    expect(error.kind).toBe("invalid");
    expect(error.message).toMatch(/larger than its declared size/);
  });

  it("never lets the parser see local entries the central directory does not list", async () => {
    const hidden: ZipTestEntry = { name: "xl/sharedStrings.xml", data: new TextEncoder().encode(bombSheetRows(24 * MB)), listed: false };
    const archive = writeZip([hidden, ...entries(normalSheet)]);
    expect(unpackXlsxParts(archive, LIMITS).map((part) => part.name)).not.toContain("xl/sharedStrings.xml");
    expect(await readFirstSheet(archive, LIMITS)).toEqual([["First name"], ["Tendai"]]);
  });

  it("counts every parsed part against the budget, and many small parts add up", async () => {
    const parts = entries(normalSheet);
    const filler = Array.from({ length: 20 }, (_, i): ZipTestEntry => ({ name: `xl/extra/part${i}.xml`, data: new Uint8Array(MB) }));
    expect((await refusal(readFirstSheet(writeZip([...parts, ...filler]), LIMITS))).kind).toBe("too_large");
    // Parts the parser never reads (images, binaries) are dropped unread and do not count.
    const image: ZipTestEntry = { name: "xl/media/image1.png", data: new Uint8Array(20 * MB) };
    expect(await readFirstSheet(writeZip([...parts, image]), LIMITS)).toEqual([["First name"], ["Tendai"]]);
  });

  it("refuses malformed, encrypted, ZIP64-marked and tampered archives", async () => {
    const parts = entries(normalSheet);
    const cases: [string, Uint8Array][] = [
      ["not a zip", new TextEncoder().encode("PK\u0003\u0004not really a zip")],
      ["empty", new Uint8Array(0)],
      ["encrypted", writeZip(parts.map((e) => ({ ...e, flags: 0x0001 })))],
      ["zip64 size marker", writeZip(parts.map((e) => (e.name.endsWith("sheet1.xml") ? { ...e, declaredSize: 0xffffffff } : e)))],
      ["duplicate names", writeZip([...parts, { name: "xl/workbook.xml", data: new Uint8Array(10) }])],
      ["no workbook parts", writeZip([{ name: "xl/media/image1.png", data: new Uint8Array(10) }])],
    ];
    const tampered = writeZip(parts.map((e) => ({ ...e, method: "store" as const })));
    const at = Buffer.from(tampered).indexOf("Tendai");
    tampered[at] = 0x58; // one byte changed after the checksum was written
    cases.push(["checksum mismatch", tampered]);
    for (const [label, bytes] of cases) {
      const error = await refusal(readFirstSheet(bytes, LIMITS));
      expect(error.kind, label).toBe("invalid");
    }
  });

  // UPL-01 regression: inside the unpacked budget, ONE long token (a comment, processing instruction or attribute
  // value of a few MB, in a ~5 KB upload) made the parser re-scan it on every chunk while halving its chunk size: about
  // a minute of CPU in the web process per request, then a stack overflow. Such workbooks are now refused up front.
  it("refuses a small workbook holding one pathologically long tag, comment or PI, in milliseconds", async () => {
    const big = "x".repeat(3 * MB);
    const sheets: [string, string][] = [
      ["comment", `<!--${big}-->${normalSheet}`],
      ["processing instruction", `<?pi ${big}?>${normalSheet}`],
      ["attribute value", `<row r="1" spans="${big}"><c r="A1" t="inlineStr"><is><t>First name</t></is></c></row>`],
      ["unterminated attribute", `<row r="1" spans="${big}`],
      ["cdata", `<row r="1"><c r="A1" t="inlineStr"><is><t><![CDATA[${big}]]></t></is></c></row>`],
      ["text run", `<row r="1"><c r="A1" t="inlineStr"><is><t>${big}</t></is></c></row>`],
    ];
    for (const [label, sheet] of sheets) {
      const archive = writeZip(entries(sheet));
      expect(archive.byteLength, label).toBeLessThan(64 * 1024);
      const started = performance.now();
      const error = await refusal(readFirstSheet(archive, LIMITS));
      expect(error.kind, label).toBe("invalid");
      expect(performance.now() - started, label).toBeLessThan(1_000);
    }
  });

  it("refuses DOCTYPE and other declarations", async () => {
    const sheet = `<!DOCTYPE worksheet [<!ENTITY a "aaaa">]>${normalSheet}`;
    expect((await refusal(readFirstSheet(writeZip(entries(sheet)), LIMITS))).message).toMatch(/DOCTYPE/);
  });

  it("still reads long but legitimate tokens (near the bounds) quickly", async () => {
    const longText = "y".repeat(MAX_XML_TEXT_BYTES - 64);
    const longAttribute = "z".repeat(MAX_XML_MARKUP_BYTES - 128);
    const sheet = `<!-- generated -->${normalSheet}<row r="3" x="${longAttribute}"><c r="A3" t="inlineStr"><is><t>${longText}</t></is></c></row>`;
    const started = performance.now();
    const rows = await readFirstSheet(writeZip(entries(sheet)), LIMITS);
    expect(rows.map((cells) => String(cells[0]).slice(0, 10))).toEqual(["First name", "Tendai", "yyyyyyyyyy"]);
    // Generous for a loaded CI box: the pathological case this guards against takes over a minute.
    expect(performance.now() - started).toBeLessThan(10_000);
    const quoted = `<a b='>"' c="'>">ok</a><?xml-stylesheet x?><![CDATA[<<>>]]>`;
    expect(() => assertBoundedXml(Buffer.from(quoted))).not.toThrow();
  });
});
