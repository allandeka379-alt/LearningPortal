/**
 * Bulk content import (§25): shared constants, labels and the pure status rules. Isomorphic (no server-only imports),
 * so admin pages and tests can use the same vocabulary as the services.
 *
 * Lifecycle (`ContentImportStatus`):
 *
 *   UPLOADED ──validate──▶ VALIDATING ──▶ VALIDATED ──commit──▶ IMPORTING ──▶ COMPLETED
 *       │                      │              │  ▲                  │
 *       └──────────────────────┴──cancel──────┴──┴─ re-check        └──cancel (rows already written stay DRAFT)
 *   A file that cannot be read at all ends in FAILED (re-check is allowed: the curriculum may have been fixed since).
 *
 * Validation is a DRY RUN: it never writes content. Committing only ever creates DRAFT rows (the database refuses
 * anything else for rows carrying `importId`), and an import never asserts copyright: every item arrives with
 * `copyrightStatus = UNVERIFIED` and the import's source, so editors clear licensing per item at review (§27).
 */

export const IMPORT_ENTITY_TYPES = ["QUESTION", "FLASHCARD", "LESSON", "TOPIC"] as const;
export type ImportEntityType = (typeof IMPORT_ENTITY_TYPES)[number];

export const IMPORT_FORMATS = ["CSV", "XLSX", "JSON"] as const;
export type ImportFormat = (typeof IMPORT_FORMATS)[number];

export const IMPORT_STATUSES = ["UPLOADED", "VALIDATING", "VALIDATED", "IMPORTING", "COMPLETED", "FAILED", "CANCELLED"] as const;
export type ImportStatus = (typeof IMPORT_STATUSES)[number];

export const IMPORT_ENTITY_LABELS: Readonly<Record<ImportEntityType, { singular: string; plural: string; hint: string }>> = {
  QUESTION: {
    singular: "Question",
    plural: "Questions",
    hint: "Multiple choice, true/false, short answer, numerical and essay questions from a spreadsheet; every type (including structured questions) from JSON.",
  },
  FLASHCARD: { singular: "Flashcard", plural: "Flashcards", hint: "Front, back and optional notes, tagged to a topic." },
  LESSON: { singular: "Lesson", plural: "Lessons", hint: "Markdown lessons with their details (front matter) in JSON, or one lesson per spreadsheet row." },
  TOPIC: { singular: "Topic", plural: "Topics (outline)", hint: "A topic outline with learning objectives, added to a DRAFT syllabus version." },
};

export const IMPORT_FORMAT_LABELS: Readonly<Record<ImportFormat, string>> = { CSV: "CSV", XLSX: "Excel (.xlsx)", JSON: "JSON" };

export const IMPORT_STATUS_META: Readonly<Record<ImportStatus, { label: string; tone: "neutral" | "info" | "primary" | "success" | "warning" | "danger"; outline?: boolean }>> = {
  UPLOADED: { label: "Uploaded", tone: "neutral" },
  VALIDATING: { label: "Checking", tone: "info" },
  VALIDATED: { label: "Checked", tone: "primary" },
  IMPORTING: { label: "Importing", tone: "info" },
  COMPLETED: { label: "Imported", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  CANCELLED: { label: "Cancelled", tone: "neutral", outline: true },
};

/**
 * Upload size cap (ARCHITECTURE §3.11: 20 MB for import files). Uploads go through the streamed route
 * `POST /api/v1/uploads?purpose=import` (src/server/uploads), which enforces it while reading; Server Actions keep
 * their 6 MB body limit (next.config.ts).
 */
export const MAX_IMPORT_FILE_BYTES = 20 * 1024 * 1024;

/**
 * Budget for the UNPACKED size of an Excel import (worksheet XML, shared strings and the other parts the parser reads).
 * The upload cap bounds only the compressed bytes, and DEFLATE expands up to about 1000:1 (`src/server/lib/xlsx.ts`).
 */
export const MAX_IMPORT_XLSX_UNPACKED_BYTES = 64 * 1024 * 1024;

/** Maximum data rows per file (content items); topic outlines are smaller and written in one transaction. */
export const MAX_IMPORT_ROWS: Readonly<Record<ImportEntityType, number>> = {
  QUESTION: 5_000,
  FLASHCARD: 5_000,
  LESSON: 1_000,
  TOPIC: 2_000,
};

/** Files with more rows than this are checked and imported by the background job (`imports.run`) with progress. */
export const INLINE_ROW_LIMIT = 200;

/** Rows written per transaction by the background commit (each chunk records its progress atomically). */
export const COMMIT_CHUNK_SIZE = 100;

/** At most this many row problems are stored on the import (the counters stay exact). */
export const MAX_STORED_ISSUES = 1_000;

/** One problem found in a row during the dry run (or at commit). Stored in `ContentImport.errors`. */
export interface ImportIssue {
  /** Spreadsheet row number (header = row 1) or 1-based item number for JSON; 0 = the file as a whole. */
  row: number;
  field?: string;
  code: ImportIssueCode;
  message: string;
  severity: "error" | "warning";
}

export const IMPORT_ISSUE_CODES = [
  /** The file could not be read (format, encoding, empty, too many rows). */
  "FILE",
  /** A header the importer does not recognise (ignored). */
  "UNKNOWN_COLUMN",
  "REQUIRED",
  "INVALID",
  /** A topic, objective or parent reference that does not resolve. */
  "REFERENCE",
  /** externalRef already used in the file or by existing content. */
  "DUPLICATE",
  /** Question definition rules (`validateQuestionDefinition`). */
  "DEFINITION",
  /** Markdown that would not render cleanly (invalid LaTeX, unknown block, broken image). */
  "CONTENT",
  /** A write failed at commit time. */
  "WRITE",
] as const;
export type ImportIssueCode = (typeof IMPORT_ISSUE_CODES)[number];

export type ImportAction = "validate" | "commit" | "cancel";

/** Which actions an import in `status` allows (pure; the services enforce it with conditional updates). */
export function allowedImportActions(status: ImportStatus, counts: { validRows: number }): ImportAction[] {
  switch (status) {
    case "UPLOADED":
      return ["validate", "cancel"];
    case "VALIDATING":
      return ["cancel"];
    case "VALIDATED":
      return counts.validRows > 0 ? ["commit", "validate", "cancel"] : ["validate", "cancel"];
    case "IMPORTING":
      return ["cancel"];
    case "FAILED":
      return ["validate", "cancel"];
    case "COMPLETED":
    case "CANCELLED":
      return [];
  }
}

/** True while the background job is (or will be) working on the import: pages refresh themselves. */
export function isImportActive(status: ImportStatus): boolean {
  return status === "VALIDATING" || status === "IMPORTING" || status === "UPLOADED";
}

/** "Row 12" for spreadsheets, "Item 3" for JSON, "File" for whole-file problems. */
export function issueLocation(format: ImportFormat, row: number): string {
  if (row <= 0) return "File";
  return format === "JSON" ? `Item ${row}` : `Row ${row}`;
}

/** Template files offered per entity type (download route segment → content type). */
export const TEMPLATE_FILES = {
  "template.csv": "text/csv; charset=utf-8",
  "example.json": "application/json; charset=utf-8",
  "schema.json": "application/schema+json; charset=utf-8",
} as const;
export type TemplateFile = keyof typeof TEMPLATE_FILES;
