import "server-only";
import { crc32, inflateRawSync } from "node:zlib";
import { readSheet } from "read-excel-file/node";

/**
 * Reading uploaded Excel workbooks (.xlsx) without decompression bombs (ARCHITECTURE §3.11 imports, §5.9 uploads).
 *
 * An .xlsx file is a ZIP archive, and DEFLATE expands up to about 1000:1: a 2 MB upload can hold 2 GB of worksheet XML,
 * which `read-excel-file` inflates entirely into memory (then into one string and an array of rows) before any row
 * limit applies, so a few such uploads take the shared web process down. Upload caps only bound the COMPRESSED bytes,
 * so before the parser sees a workbook:
 *
 * 1. the ZIP central directory is read strictly (no ZIP64, multi-disk or encrypted archives; stored or deflated entries
 *    only; at most {@link MAX_XLSX_ENTRIES} entries; no duplicate names), and the DECLARED uncompressed size of the
 *    parts the parser reads (`*.xml`, `*.rels`) must fit the caller's budget;
 * 2. those parts are inflated here with a hard output cap (`maxOutputLength` = the declared size), so a lying header
 *    can never make this allocate more than the budget; each part must match its declared size and CRC-32;
 * 3. every part's XML is scanned once (linear, native `indexOf`) and refused when a single token is pathologically long:
 *    one tag, comment, processing instruction or CDATA section over {@link MAX_XML_MARKUP_BYTES}, or one run of text
 *    over {@link MAX_XML_TEXT_BYTES}; DOCTYPE and other `<!…>` declarations are refused outright (Excel never writes
 *    them). The parser feeds the XML to its SAX reader in chunks and re-scans a pending (incomplete) token from its
 *    start on every chunk, halving the chunk size whenever a chunk takes over 7 ms; a few MB inside ONE comment or
 *    attribute therefore never stops shrinking the chunks and burns a minute of CPU before overflowing the stack, even
 *    in a 20 KB file well inside the size budget (UPL-01). Real workbooks have short tags and cell texts of at most
 *    32,767 characters, far below both bounds;
 * 4. the parser is given a NEW archive holding exactly the verified parts (stored, uncompressed). It never reads the
 *    uploaded bytes, so local entries hidden outside the central directory, overlapping entries and other differences
 *    between ZIP readers cannot reach it.
 *
 * Other parts (images, printer settings, embedded binaries) are dropped unread: the parser ignores them anyway.
 */

/** Most entries an uploaded workbook may list (real workbooks have tens; hundreds with many sheets). */
export const MAX_XLSX_ENTRIES = 2_000;

/**
 * Longest single XML markup token (a tag with its attributes, a comment, a PI, a CDATA section) a part may hold. Real
 * tags are a few hundred bytes (long `sqref` lists a few KB). The parser re-scans a pending tag character by character
 * on every chunk, so the bound also caps that cost on a busy server.
 */
export const MAX_XML_MARKUP_BYTES = 64 * 1024;

/**
 * Longest run of text between two markup tokens. A cell holds at most 32,767 characters: at most ~160 KB of UTF-8 even
 * if every character were escaped as `&amp;`.
 */
export const MAX_XML_TEXT_BYTES = 192 * 1024;

export type XlsxErrorKind = "too_large" | "invalid";

/** Why a workbook was refused before parsing. `too_large`: its unpacked parts exceed the caller's budget. */
export class XlsxError extends Error {
  constructor(
    readonly kind: XlsxErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "XlsxError";
  }
}

export interface XlsxLimits {
  /** Budget for the summed uncompressed size of the workbook parts the parser reads (bytes). */
  maxUncompressedBytes: number;
}

const SIG_LOCAL = 0x04034b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_END = 0x06054b50;
const SIG_ZIP64_LOCATOR = 0x07064b50;
const LOCAL_HEADER = 30;
const CENTRAL_HEADER = 46;
const END_RECORD = 22;
const MAX_COMMENT = 0xffff;
const FLAG_ENCRYPTED = 0x0001;
const FLAG_STRONG_ENCRYPTION = 0x0040;
const FLAG_UTF8 = 0x0800;
const METHOD_STORED = 0;
const METHOD_DEFLATE = 8;
const U16_MAX = 0xffff;
const U32_MAX = 0xffffffff;

function invalid(message: string): never {
  throw new XlsxError("invalid", message);
}

function tooLarge(limits: XlsxLimits): never {
  throw new XlsxError("too_large", `The workbook is larger than ${limits.maxUncompressedBytes} bytes once unpacked.`);
}

/** The parts `read-excel-file` reads (its own entry filter keeps `*.xml` and `*.xml.rels`). */
function isParsedPart(name: string): boolean {
  return name.endsWith(".xml") || name.endsWith(".rels");
}

interface VerifiedPart {
  name: string;
  data: Buffer;
  crc: number;
}

function findEndRecord(buf: Buffer): number {
  if (buf.length < END_RECORD) invalid("Too short for a ZIP archive.");
  const last = buf.length - END_RECORD;
  const first = Math.max(0, last - MAX_COMMENT);
  for (let pos = last; pos >= first; pos -= 1) {
    if (buf.readUInt32LE(pos) === SIG_END && pos + END_RECORD + buf.readUInt16LE(pos + 20) === buf.length) return pos;
  }
  return invalid("No ZIP end-of-central-directory record.");
}

/**
 * Reads, inflates (bounded) and verifies the parts of an .xlsx archive the parser needs (module docs, steps 1–3).
 * Throws {@link XlsxError}; never allocates more than the budget for part contents.
 */
export function unpackXlsxParts(bytes: Uint8Array, limits: XlsxLimits): VerifiedPart[] {
  const buf = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const end = findEndRecord(buf);
  if (end >= 20 && buf.readUInt32LE(end - 20) === SIG_ZIP64_LOCATOR) invalid("ZIP64 archives are not accepted.");
  const disk = buf.readUInt16LE(end + 4);
  const centralDisk = buf.readUInt16LE(end + 6);
  const entriesOnDisk = buf.readUInt16LE(end + 8);
  const entries = buf.readUInt16LE(end + 10);
  const centralSize = buf.readUInt32LE(end + 12);
  const centralOffset = buf.readUInt32LE(end + 16);
  if (disk !== 0 || centralDisk !== 0 || entriesOnDisk !== entries) invalid("Multi-disk archives are not accepted.");
  if (entries === U16_MAX || centralSize === U32_MAX || centralOffset === U32_MAX) invalid("ZIP64 archives are not accepted.");
  if (entries > MAX_XLSX_ENTRIES) invalid("The archive has too many entries.");
  const centralEnd = centralOffset + centralSize;
  if (centralEnd > end) invalid("The central directory is out of bounds.");

  // Step 1: central directory (authoritative sizes, even for entries written with data descriptors).
  const listed: { name: string; method: number; crc: number; compressedSize: number; size: number; localOffset: number }[] = [];
  const names = new Set<string>();
  let declared = 0;
  let pos = centralOffset;
  for (let i = 0; i < entries; i += 1) {
    if (pos + CENTRAL_HEADER > centralEnd || buf.readUInt32LE(pos) !== SIG_CENTRAL) invalid("Malformed central directory.");
    const flags = buf.readUInt16LE(pos + 8);
    const method = buf.readUInt16LE(pos + 10);
    const crc = buf.readUInt32LE(pos + 16);
    const compressedSize = buf.readUInt32LE(pos + 20);
    const size = buf.readUInt32LE(pos + 24);
    const nameLength = buf.readUInt16LE(pos + 28);
    const extraLength = buf.readUInt16LE(pos + 30);
    const commentLength = buf.readUInt16LE(pos + 32);
    const localOffset = buf.readUInt32LE(pos + 42);
    const next = pos + CENTRAL_HEADER + nameLength + extraLength + commentLength;
    if (next > centralEnd) invalid("Malformed central directory.");
    const name = buf.toString(flags & FLAG_UTF8 ? "utf8" : "latin1", pos + CENTRAL_HEADER, pos + CENTRAL_HEADER + nameLength);
    pos = next;
    if (name.endsWith("/") || !isParsedPart(name)) continue;
    if (flags & (FLAG_ENCRYPTED | FLAG_STRONG_ENCRYPTION)) invalid("Encrypted workbooks are not accepted.");
    if (method !== METHOD_STORED && method !== METHOD_DEFLATE) invalid("Unsupported compression method.");
    if (compressedSize === U32_MAX || size === U32_MAX || localOffset === U32_MAX) invalid("ZIP64 archives are not accepted.");
    if (method === METHOD_STORED && compressedSize !== size) invalid("Malformed stored entry.");
    if (names.has(name)) invalid("Duplicate entry names.");
    names.add(name);
    declared += size;
    if (declared > limits.maxUncompressedBytes) tooLarge(limits);
    listed.push({ name, method, crc, compressedSize, size, localOffset });
  }
  if (pos !== centralEnd) invalid("Malformed central directory.");
  if (listed.length === 0) invalid("The archive holds no workbook parts.");

  // Steps 2–3: inflate each part with a hard cap at its declared size, verify size and checksum, bound its XML tokens.
  return listed.map((entry) => {
    const local = entry.localOffset;
    if (local + LOCAL_HEADER > centralOffset || buf.readUInt32LE(local) !== SIG_LOCAL) invalid("Malformed local header.");
    const dataStart = local + LOCAL_HEADER + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const dataEnd = dataStart + entry.compressedSize;
    if (dataEnd > centralOffset) invalid("Entry data is out of bounds.");
    const raw = buf.subarray(dataStart, dataEnd);
    let data: Buffer;
    if (entry.method === METHOD_STORED) {
      data = Buffer.from(raw);
    } else {
      try {
        data = inflateRawSync(raw, { maxOutputLength: Math.max(1, entry.size) });
      } catch (error) {
        // More output than declared: the header lies (a bomb dressed up as a small part).
        if ((error as { code?: unknown }).code === "ERR_BUFFER_TOO_LARGE") invalid("An entry is larger than its declared size.");
        return invalid("An entry could not be decompressed.");
      }
    }
    if (data.length !== entry.size) invalid("An entry does not match its declared size.");
    if (crc32(data) >>> 0 !== entry.crc) invalid("An entry does not match its checksum.");
    assertBoundedXml(data);
    return { name: entry.name, data, crc: entry.crc };
  });
}

const LT = 0x3c; // <
const GT = 0x3e; // >
const BANG = 0x21; // !
const QUESTION = 0x3f; // ?
const DOUBLE_QUOTE = 0x22;
const SINGLE_QUOTE = 0x27;

function tooComplex(): never {
  return invalid("The workbook XML has a tag, comment or text far longer than any real workbook.");
}

/**
 * Index just past `terminator`, searched from `from` but never beyond `limit` (the end of the longest allowed token);
 * -1 when it does not occur within that window.
 */
function terminatorEnd(data: Buffer, terminator: string, from: number, limit: number): number {
  const found = data.subarray(from, Math.min(data.length, limit)).indexOf(terminator, 0, "latin1");
  return found === -1 ? -1 : from + found + terminator.length;
}

/** Index just past the markup token that starts at `lt` (a `<`), or a refusal when it is longer than allowed. */
function markupEnd(data: Buffer, lt: number): number {
  const limit = lt + MAX_XML_MARKUP_BYTES;
  // An unterminated token that reaches the end of the part within the bound is merely malformed: the parser reports it.
  const unterminated = (): number => (limit >= data.length ? data.length : tooComplex());
  const second = data[lt + 1];
  if (second === BANG) {
    if (data.toString("latin1", lt, lt + 4) === "<!--") {
      const end = terminatorEnd(data, "-->", lt + 4, limit + 1);
      return end === -1 ? unterminated() : end;
    }
    if (data.toString("latin1", lt, lt + 9) === "<![CDATA[") {
      const end = terminatorEnd(data, "]]>", lt + 9, limit + 1);
      return end === -1 ? unterminated() : end;
    }
    // DOCTYPE / ENTITY / ELEMENT declarations: never in a workbook, and the start of entity tricks.
    return invalid("XML declarations (DOCTYPE) are not accepted.");
  }
  if (second === QUESTION) {
    const end = terminatorEnd(data, "?>", lt + 2, limit + 1);
    return end === -1 ? unterminated() : end;
  }
  // An element tag ends at the first `>` outside a quoted attribute value.
  const stop = Math.min(data.length, limit + 1);
  for (let i = lt + 1; i < stop; i += 1) {
    const byte = data[i];
    if (byte === GT) return i + 1;
    if (byte === DOUBLE_QUOTE || byte === SINGLE_QUOTE) {
      const close = data.subarray(i + 1, stop).indexOf(byte);
      if (close === -1) break;
      i += close + 1;
    }
  }
  return unterminated();
}

/**
 * Refuses XML whose single tokens are long enough to stall the parser (module docs, step 3). One linear pass: text runs
 * are skipped with native `indexOf`, and each markup token is examined at most up to its bound.
 */
export function assertBoundedXml(data: Buffer): void {
  let pos = 0;
  while (pos < data.length) {
    const lt = data.indexOf(LT, pos);
    const textEnd = lt === -1 ? data.length : lt;
    if (textEnd - pos > MAX_XML_TEXT_BYTES) tooComplex();
    if (lt === -1) return;
    const end = markupEnd(data, lt);
    if (end - lt > MAX_XML_MARKUP_BYTES) tooComplex();
    pos = end;
  }
}

/** A minimal ZIP archive of stored (uncompressed) entries with UTF-8 names (module docs, step 4). */
function storedArchive(parts: readonly VerifiedPart[]): Buffer {
  const out: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const part of parts) {
    const name = Buffer.from(part.name, "utf8");
    const local = Buffer.alloc(LOCAL_HEADER);
    local.writeUInt32LE(SIG_LOCAL, 0);
    local.writeUInt16LE(20, 4); // version needed to extract
    local.writeUInt16LE(FLAG_UTF8, 6);
    local.writeUInt16LE(METHOD_STORED, 8);
    local.writeUInt16LE(0x0021, 12); // 1980-01-01
    local.writeUInt32LE(part.crc, 14);
    local.writeUInt32LE(part.data.length, 18);
    local.writeUInt32LE(part.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    out.push(local, name, part.data);

    const header = Buffer.alloc(CENTRAL_HEADER);
    header.writeUInt32LE(SIG_CENTRAL, 0);
    header.writeUInt16LE(20, 4); // version made by
    header.writeUInt16LE(20, 6); // version needed to extract
    header.writeUInt16LE(FLAG_UTF8, 8);
    header.writeUInt16LE(METHOD_STORED, 10);
    header.writeUInt16LE(0x0021, 14);
    header.writeUInt32LE(part.crc, 16);
    header.writeUInt32LE(part.data.length, 20);
    header.writeUInt32LE(part.data.length, 24);
    header.writeUInt16LE(name.length, 28);
    header.writeUInt32LE(offset, 42);
    central.push(header, name);
    offset += LOCAL_HEADER + name.length + part.data.length;
  }
  const centralSize = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const endRecord = Buffer.alloc(END_RECORD);
  endRecord.writeUInt32LE(SIG_END, 0);
  endRecord.writeUInt16LE(parts.length, 8);
  endRecord.writeUInt16LE(parts.length, 10);
  endRecord.writeUInt32LE(centralSize, 12);
  endRecord.writeUInt32LE(offset, 16);
  return Buffer.concat([...out, ...central, endRecord]);
}

/**
 * Reads the FIRST worksheet of an uploaded .xlsx workbook as rows of raw cell values, after checking the archive
 * against `limits` (module docs). Throws {@link XlsxError} for refused archives, and the parser's own errors for
 * unreadable workbooks.
 */
export async function readFirstSheet(bytes: Uint8Array, limits: XlsxLimits): Promise<unknown[][]> {
  const archive = storedArchive(unpackXlsxParts(bytes, limits));
  return (await readSheet(archive)) as unknown[][];
}
