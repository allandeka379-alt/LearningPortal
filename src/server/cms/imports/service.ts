import "server-only";
import { setImmediate as yieldToEventLoop } from "node:timers/promises";
import { z } from "zod";
import { Prisma, type ContentImportStatus } from "@/generated/prisma/client";
import { curriculumAccess } from "@/server/cms/curriculum/access";
import { personName, PERSON_SELECT } from "@/server/cms/questions/context";
import { assertCmsPermission, infraActor, type CmsActor } from "@/server/cms/users/access";
import { afterCursorWhere, decodeCursor, pageOf } from "@/server/cms/users/cursor";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError, isAppError } from "@/server/lib/errors";
import { cancelJob, enqueue, PermanentJobError, registerJobHandler, type JobContext } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getStorage, type StorageDriver } from "@/server/lib/storage";
import { createMediaAsset } from "@/server/lib/uploads";
import {
  allowedImportActions,
  COMMIT_CHUNK_SIZE,
  IMPORT_ENTITY_TYPES,
  IMPORT_STATUSES,
  INLINE_ROW_LIMIT,
  MAX_IMPORT_FILE_BYTES,
  MAX_STORED_ISSUES,
  type ImportAction,
  type ImportEntityType,
  type ImportFormat,
  type ImportIssue,
  type ImportStatus,
} from "./constants";
import { insertFlashcardDrafts, insertLessonDraft, insertQuestionDraft, insertTopicOutline, markdownChecker, topicSyllabusMap, type DraftOrigin, type DraftProvenance } from "./drafts";
import { formatFromMime, parseImportFile, type ParsedImportFile } from "./formats";
import { ACCESS_TIERS, columnIndex } from "./items";
import { createDryRun, type DryRunResult, type ImportLookups, type PreparedFlashcard, type PreparedLesson, type PreparedQuestion, type PreparedTopic, type TopicLookups, type TopicTarget } from "./rows";

/**
 * Bulk content import (§25; ARCHITECTURE §3.7 `imports.run`, §3.11 import files, §4.4 licensing).
 *
 *  upload    → the file is sniffed and stored PRIVATE (MediaAsset IMPORT_FILE, rate limited), a ContentImport row is
 *              created with the import-level source and licence, and the DRY RUN starts: inline for small files,
 *              otherwise as the background job with progress. Re-uploading a file whose checksum matches an earlier
 *              import is allowed but WARNED about (and committing it needs an explicit confirmation).
 *  dry run   → every row is validated (./rows.ts) and the report (row, field, problem) is stored. Nothing is written.
 *  commit    → valid rows are written as DRAFT content with `importId` (questions, flashcards, lessons) or as topics of
 *              a DRAFT syllabus version; rows with errors are skipped only when the editor says so. Small files are
 *              written in one transaction; large ones in chunks whose progress commits atomically with the rows, so a
 *              retried job continues where it stopped. External references make re-imports idempotent.
 *  cancel    → stops a pending or running import (rows already written stay DRAFT).
 *
 * Authorisation (ARCHITECTURE §5.2): `imports.run` (content imports are CONTENT_EDITOR's "restricted" scope) AND
 * `content.draft` platform-wide; topic outlines also need curriculum drafting. Students, parents, teachers and school
 * admins are refused. Every step writes an audit entry.
 */

export const IMPORT_JOB_TYPE = "imports.run";
export const IMPORT_JOB_QUEUE = "imports";
const LONG_TX = { timeout: 120_000, maxWait: 10_000 } as const;
const VALIDATION_SLICE = 250;

// =====================================================================================================================
// Context, permissions and audit
// =====================================================================================================================

export interface ImportServiceContext {
  /** Request metadata for audit entries. */
  request?: AuditRequestInfo | null;
}

export interface ImportServiceDeps {
  storage?: StorageDriver;
  /** Files with more rows than this go to the background job (tests set 0 to exercise the job path). */
  inlineRowLimit?: number;
}

/** What the actor may import (UI: which choices to offer). */
export function importAccess(actor: CmsActor): { content: boolean; topics: boolean } {
  const content = canDo(actor, "imports.run", "restricted") && canDo(actor, "content.draft", "all");
  return { content, topics: content && curriculumAccess(actor).canDraft };
}

function canDo(actor: CmsActor, permission: "imports.run" | "content.draft", scope: "all" | "restricted"): boolean {
  try {
    assertCmsPermission(actor, permission, scope);
    return true;
  } catch {
    return false;
  }
}

/** Content imports need `imports.run` + platform `content.draft`; topic outlines also curriculum drafting. */
export function assertCanImport(actor: CmsActor, entityType?: ImportEntityType): void {
  const access = importAccess(actor);
  if (!access.content || (entityType === "TOPIC" && !access.topics)) throw AppError.forbidden();
}

/** Import steps (also written to `metadata.operation`). */
export const IMPORT_OPERATIONS = {
  upload: "import.upload",
  validate: "import.validate",
  commit: "import.commit",
  complete: "import.complete",
  cancel: "import.cancel",
  fail: "import.fail",
} as const;
export type ImportOperation = (typeof IMPORT_OPERATIONS)[keyof typeof IMPORT_OPERATIONS];

/** Audit action per import step (precise keys of the shared registry). */
export const IMPORT_AUDIT = {
  "import.upload": AUDIT_ACTIONS.IMPORT_UPLOAD,
  "import.validate": AUDIT_ACTIONS.IMPORT_VALIDATE,
  "import.commit": AUDIT_ACTIONS.IMPORT_COMMIT,
  "import.complete": AUDIT_ACTIONS.IMPORT_COMPLETE,
  "import.cancel": AUDIT_ACTIONS.IMPORT_CANCEL,
  "import.fail": AUDIT_ACTIONS.IMPORT_FAIL,
} as const satisfies Record<ImportOperation, AuditAction>;

async function auditImport(
  client: DbClient,
  actor: CmsActor | null,
  context: ImportServiceContext,
  entry: { operation: ImportOperation; importId: string; metadata?: Record<string, unknown>; after?: unknown },
): Promise<void> {
  const fields = actor ? infraActor(actor) : null;
  await auditInTx(client, {
    actorUserId: fields?.kind === "user" ? fields.userId : null,
    actorRoles: fields?.kind === "user" ? fields.roles : [],
    action: IMPORT_AUDIT[entry.operation],
    entityType: "ContentImport",
    entityId: entry.importId,
    after: entry.after,
    metadata: { operation: entry.operation, ...entry.metadata },
    request: context.request ?? null,
  });
}

// =====================================================================================================================
// Stored options and issues
// =====================================================================================================================

const nullableText = z.string().nullable().default(null);

/** `ContentImport.options` (Json): import-level defaults, licensing, column mapping and job progress. */
export const importOptionsSchema = z.looseObject({
  version: z.literal(1).default(1),
  defaults: z.object({
    difficulty: z.int().min(1).max(5).default(3),
    accessTier: z.enum(ACCESS_TIERS).default("PREMIUM"),
    sourceId: z.uuid(),
  }),
  provenance: z.object({ author: nullableText, licenceCode: nullableText, attribution: nullableText, sourceUrl: nullableText }),
  /** Spreadsheet header → item field it was read into ("" = ignored). */
  columnMap: z.record(z.string(), z.string()).default({}),
  progress: z
    .object({
      phase: z.enum(["validate", "commit"]),
      processed: z.int().min(0).default(0),
      total: z.int().min(0).default(0),
      /** Highest source row already written (resume point of the chunked commit). */
      committedThroughRow: z.int().min(0).default(0),
    })
    .nullable()
    .default(null),
});
export type ImportOptions = z.output<typeof importOptionsSchema>;

const issueSchema = z.object({
  row: z.number(),
  field: z.string().optional(),
  code: z.string(),
  message: z.string(),
  severity: z.enum(["error", "warning"]).default("error"),
});

function parseOptions(value: unknown): ImportOptions {
  const parsed = importOptionsSchema.safeParse(value);
  if (!parsed.success) throw new PermanentJobError("Import options are unreadable");
  return parsed.data;
}

function parseIssues(value: unknown): ImportIssue[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    const parsed = issueSchema.safeParse(entry);
    return parsed.success ? [parsed.data as ImportIssue] : [];
  });
}

function storedIssues(issues: readonly ImportIssue[]): Prisma.InputJsonValue {
  return issues.slice(0, MAX_STORED_ISSUES).map((i) => ({ ...i })) as unknown as Prisma.InputJsonValue;
}

function optionsJson(options: ImportOptions): Prisma.InputJsonValue {
  return options as unknown as Prisma.InputJsonValue;
}

// =====================================================================================================================
// Input schemas
// =====================================================================================================================

const blankToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null));
const optionalTrimmed = (max: number) => z.preprocess((value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)), z.string().max(max, `Use at most ${max} characters.`).nullable());

export const createImportSchema = z
  .object({
    entityType: z.enum(IMPORT_ENTITY_TYPES, { message: "Choose what you are importing." }),
    subjectId: z.uuid("Choose a subject."),
    syllabusId: z.preprocess(blankToNull, z.uuid("Choose a syllabus version.").nullable()),
    sourceId: z.uuid("Choose the content source this material comes from (§27)."),
    licenceCode: optionalTrimmed(64),
    attribution: optionalTrimmed(1_000),
    author: optionalTrimmed(200),
    sourceUrl: z.preprocess(blankToNull, z.url({ protocol: /^https?$/, message: "Use a full http(s) link." }).max(2_000).nullable()),
    defaultDifficulty: z.preprocess((value) => (value === "" || value === null || value === undefined ? 3 : Number(value)), z.int().min(1, "Choose 1 to 5.").max(5, "Choose 1 to 5.")),
    defaultAccessTier: z.preprocess((value) => (value === "" || value === null || value === undefined ? "PREMIUM" : value), z.enum(ACCESS_TIERS)),
    rightsConfirmed: z.literal(true, { message: "Confirm that this material is original or licensed for this use." }),
  })
  .superRefine((value, ctx) => {
    if (value.entityType === "TOPIC" && !value.syllabusId) ctx.addIssue({ code: "custom", path: ["syllabusId"], message: "Topic outlines are added to a DRAFT syllabus version: choose one." });
  });
export type CreateImportInput = z.input<typeof createImportSchema>;

const idSchema = z.object({ id: z.uuid("Choose a valid import.") });
const commitSchema = z.object({
  id: z.uuid("Choose a valid import."),
  skipInvalid: z.preprocess((v) => v === true || v === "true" || v === "on", z.boolean()).default(false),
  confirmDuplicate: z.preprocess((v) => v === true || v === "true" || v === "on", z.boolean()).default(false),
});

export const importFilterSchema = z.object({
  status: z.enum(IMPORT_STATUSES).optional(),
  entityType: z.enum(IMPORT_ENTITY_TYPES).optional(),
  mine: z.preprocess((v) => v === true || v === "true" || v === "1", z.boolean()).default(false),
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

function parseInput<S extends z.ZodType>(schema: S, raw: unknown): z.output<S> {
  const result = schema.safeParse(raw);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

// =====================================================================================================================
// Lookups for the dry run
// =====================================================================================================================

const RUN_SELECT = {
  id: true,
  entityType: true,
  format: true,
  status: true,
  subjectId: true,
  syllabusId: true,
  options: true,
  createdById: true,
  totalRows: true,
  validRows: true,
  failedRows: true,
  importedRows: true,
  file: { select: { storageKey: true, checksumSha256: true } },
} as const satisfies Prisma.ContentImportSelect;
type RunRow = Prisma.ContentImportGetPayload<{ select: typeof RUN_SELECT }>;

function isImportEntity(value: string): value is ImportEntityType {
  return (IMPORT_ENTITY_TYPES as readonly string[]).includes(value);
}

function entityOf(row: { entityType: string }): ImportEntityType {
  if (!isImportEntity(row.entityType)) throw new PermanentJobError(`Unsupported import type ${row.entityType}`);
  return row.entityType;
}

/** External references named by the file (exact spelling), so existing ones are looked up in one query per 1,000. */
function fileExternalRefs(entityType: ImportEntityType, parsed: ParsedImportFile): string[] {
  if (entityType === "TOPIC") return [];
  const refs = new Set<string>();
  if (parsed.kind === "table") {
    const headers = [...columnIndex(entityType).entries()].filter(([, spec]) => spec.field === "externalRef").map(([header]) => header);
    for (const record of parsed.records) for (const header of headers) if (record.values[header]) refs.add(record.values[header].trim());
  } else {
    for (const record of parsed.records) {
      const value = record.value as { externalRef?: unknown } | null;
      if (value && typeof value === "object" && typeof value.externalRef === "string") refs.add(value.externalRef.trim());
    }
  }
  return [...refs].filter((ref) => ref !== "");
}

async function existingExternalRefs(client: DbClient, entityType: ImportEntityType, refs: readonly string[], importId: string): Promise<Set<string>> {
  const found = new Set<string>();
  const notThisImport = { OR: [{ importId: null }, { importId: { not: importId } }] };
  for (let i = 0; i < refs.length; i += 1_000) {
    const slice = refs.slice(i, i + 1_000);
    const where = { externalRef: { in: slice }, ...notThisImport };
    const rows =
      entityType === "QUESTION"
        ? await client.question.findMany({ where, select: { externalRef: true } })
        : entityType === "FLASHCARD"
          ? await client.flashcard.findMany({ where, select: { externalRef: true } })
          : await client.lesson.findMany({ where, select: { externalRef: true } });
    for (const row of rows) if (row.externalRef) found.add(row.externalRef.toLowerCase());
  }
  return found;
}

async function loadLookups(client: DbClient, row: RunRow, parsed: ParsedImportFile, options: ImportOptions): Promise<{ lookups: ImportLookups; topicLookups: TopicLookups | null }> {
  const entityType = entityOf(row);
  if (!row.subjectId) throw AppError.validation({ subjectId: ["The subject of this import no longer exists."] });
  const subject = await client.subject.findUnique({ where: { id: row.subjectId }, select: { id: true, languageCode: true } });
  if (!subject) throw AppError.validation({ subjectId: ["The subject of this import no longer exists."] });
  const syllabus = row.syllabusId
    ? await client.syllabus.findUnique({ where: { id: row.syllabusId }, select: { id: true, title: true, versionLabel: true, status: true } })
    : null;
  const label = syllabus ? `${syllabus.title} (${syllabus.versionLabel})` : "";

  const topicRefs = new Map<string, TopicTarget | null>();
  const existingByCode = new Map<string, TopicTarget | null>();
  const objectiveRefs = new Map<string, string[]>();
  if (syllabus) {
    const topics = await client.topic.findMany({ where: { syllabusId: syllabus.id }, select: { id: true, code: true, slug: true, kind: true, depth: true, path: true, name: true }, take: 10_000 });
    for (const topic of topics) {
      const target: TopicTarget = { id: topic.id, kind: topic.kind, depth: topic.depth, path: topic.path, name: topic.name };
      topicRefs.set(topic.slug.toLowerCase(), target);
      if (topic.code) {
        const key = topic.code.trim().toLowerCase();
        const clash = existingByCode.has(key);
        existingByCode.set(key, clash ? null : target);
        if (!topicRefs.has(key) || clash) topicRefs.set(key, clash ? null : target);
      }
    }
    const objectives = await client.learningObjective.findMany({ where: { topic: { syllabusId: syllabus.id }, code: { not: null } }, select: { id: true, code: true }, take: 20_000 });
    for (const objective of objectives) {
      const key = (objective.code ?? "").trim().toLowerCase();
      if (key) objectiveRefs.set(key, [...(objectiveRefs.get(key) ?? []), objective.id]);
    }
  }

  const sources = parsed.kind === "json" ? [JSON.stringify(parsed.records.map((r) => r.value))] : parsed.records.flatMap((r) => Object.values(r.values));
  const lookups: ImportLookups = {
    subject: { id: subject.id, languageCode: subject.languageCode },
    syllabus: syllabus ? { id: syllabus.id, label } : null,
    topicRefs,
    objectiveRefs,
    existingRefs: await existingExternalRefs(client, entityType, fileExternalRefs(entityType, parsed), row.id),
    defaults: { difficulty: options.defaults.difficulty, accessTier: options.defaults.accessTier },
    provenance: { sourceId: options.defaults.sourceId, ...options.provenance },
    checkMarkdown: await markdownChecker(sources, client),
  };
  const topicLookups = entityType === "TOPIC" && syllabus && syllabus.status === "DRAFT" ? { syllabus: { id: syllabus.id, label }, existingByCode } : null;
  return { lookups, topicLookups };
}

function columnMapOf(entityType: ImportEntityType, parsed: ParsedImportFile): Record<string, string> {
  if (parsed.kind !== "table") return {};
  const index = columnIndex(entityType);
  return Object.fromEntries(parsed.headers.map((header) => [header, index.get(header)?.header ?? ""]));
}

async function readFile(row: RunRow, deps: ImportServiceDeps): Promise<Uint8Array> {
  const bytes = await (deps.storage ?? getStorage()).get(row.file.storageKey);
  if (!bytes) throw new PermanentJobError("The uploaded file is no longer in storage");
  return bytes;
}

// =====================================================================================================================
// Dry run (validate)
// =====================================================================================================================

async function loadRunRow(client: DbClient, id: string): Promise<RunRow> {
  const row = await client.contentImport.findUnique({ where: { id }, select: RUN_SELECT });
  if (!row) throw AppError.notFound("Import not found.");
  return row;
}

async function runDryRun(
  row: RunRow,
  parsed: ParsedImportFile,
  options: ImportOptions,
  onProgress?: (processed: number, total: number) => Promise<void>,
): Promise<DryRunResult> {
  const { lookups, topicLookups } = await loadLookups(db, row, parsed, options);
  const runner = createDryRun(entityOf(row), parsed, lookups, topicLookups);
  if (!onProgress) {
    runner.step(Number.MAX_SAFE_INTEGER);
    return runner.result();
  }
  while (!runner.step(VALIDATION_SLICE)) {
    await onProgress(runner.processed, runner.total);
    await yieldToEventLoop();
  }
  return runner.result();
}

/** Validates the file and stores the report. Only an import still in UPLOADED / VALIDATING is updated. */
async function validateAndStore(row: RunRow, bytes: Uint8Array, background: boolean): Promise<{ status: ImportStatus; result: DryRunResult }> {
  const entityType = entityOf(row);
  const options = parseOptions(row.options);
  const parsed = await parseImportFile(bytes, row.format as ImportFormat, entityType);
  const progress = background
    ? async (processed: number, total: number) => {
        await db.contentImport.updateMany({
          where: { id: row.id, status: "VALIDATING" },
          data: { options: optionsJson({ ...options, progress: { phase: "validate", processed, total, committedThroughRow: 0 } }) },
        });
      }
    : undefined;
  const result = await runDryRun(row, parsed, options, progress);
  const unreadable = result.totalRows === 0 && result.issues.some((i) => i.severity === "error");
  const status: ImportStatus = unreadable ? "FAILED" : "VALIDATED";
  const updated = await db.contentImport.updateMany({
    where: { id: row.id, status: { in: ["UPLOADED", "VALIDATING"] } },
    data: {
      status,
      totalRows: result.totalRows,
      validRows: result.validRows,
      failedRows: result.failedRows,
      importedRows: 0,
      errors: storedIssues(result.issues),
      options: optionsJson({ ...options, columnMap: columnMapOf(entityType, parsed), progress: null }),
      ...(unreadable ? { completedAt: new Date() } : {}),
    },
  });
  return { status: updated.count === 1 ? status : ((await loadRunRow(db, row.id)).status as ImportStatus), result };
}

/**
 * Earlier imports of the same file INTO THE SAME PLACE (same content type and subject; same syllabus version for
 * outlines): the same outline imported into a new version is not a duplicate.
 */
function sameFileWhere(entityType: ImportEntityType, checksum: string, subjectId: string | null, syllabusId: string | null): Prisma.ContentImportWhereInput {
  return { entityType, subjectId, ...(entityType === "TOPIC" ? { syllabusId } : {}), file: { checksumSha256: checksum } };
}

async function enqueueRun(client: DbClient, importId: string, phase: "validate" | "commit"): Promise<void> {
  await enqueue(IMPORT_JOB_TYPE, { importId, phase }, { client, queue: IMPORT_JOB_QUEUE, dedupeKey: `import:${importId}:${phase}`, maxAttempts: 3 });
}

/** Runs the dry run inline for small files, otherwise hands it to the background job. */
async function startValidation(row: RunRow, bytes: Uint8Array, deps: ImportServiceDeps): Promise<ImportStatus> {
  const parsed = await parseImportFile(bytes, row.format as ImportFormat, entityOf(row));
  const limit = deps.inlineRowLimit ?? INLINE_ROW_LIMIT;
  if (parsed.records.length <= limit || parsed.issues.some((i) => i.severity === "error" && i.row <= 0)) {
    return (await validateAndStore(row, bytes, false)).status;
  }
  const options = parseOptions(row.options);
  await db.$transaction(async (tx) => {
    await tx.contentImport.update({
      where: { id: row.id },
      data: { status: "VALIDATING", options: optionsJson({ ...options, progress: { phase: "validate", processed: 0, total: parsed.records.length, committedThroughRow: 0 } }) },
    });
    await enqueueRun(tx, row.id, "validate");
  });
  return "VALIDATING";
}

// =====================================================================================================================
// Upload
// =====================================================================================================================

export interface UploadImportResult {
  id: string;
  status: ImportStatus;
  /** Earlier imports of exactly the same file (same checksum and content type). */
  duplicates: { id: string; status: ContentImportStatus; createdAt: Date; importedRows: number }[];
}

/**
 * Stores the file and starts the dry run. The source and licence are chosen once for the whole file and recorded on
 * every row; copyright is never asserted by an import (every item arrives UNVERIFIED and is cleared at review).
 */
export async function uploadImport(
  actor: CmsActor,
  file: { bytes: Uint8Array; filename?: string | null },
  raw: unknown,
  context: ImportServiceContext = {},
  deps: ImportServiceDeps = {},
): Promise<UploadImportResult> {
  assertCanImport(actor);
  const input = parseInput(createImportSchema, raw);
  assertCanImport(actor, input.entityType);
  if (file.bytes.byteLength === 0) throw AppError.validation({ file: ["Choose a file to upload."] });
  if (file.bytes.byteLength > MAX_IMPORT_FILE_BYTES) {
    throw AppError.validation({ file: [`The file is too large (maximum ${MAX_IMPORT_FILE_BYTES / 1024 / 1024} MB). Split it into smaller files.`] });
  }

  const [subject, syllabus, source] = await Promise.all([
    db.subject.findUnique({ where: { id: input.subjectId }, select: { id: true } }),
    input.syllabusId ? db.syllabus.findUnique({ where: { id: input.syllabusId }, select: { id: true, subjectId: true, status: true } }) : null,
    db.contentSource.findUnique({ where: { id: input.sourceId }, select: { id: true, isActive: true, licenceCode: true, attributionText: true, requiresAttribution: true } }),
  ]);
  const errors: Record<string, string[]> = {};
  if (!subject) errors.subjectId = ["Choose an existing subject."];
  if (input.syllabusId && (!syllabus || syllabus.subjectId !== input.subjectId)) errors.syllabusId = ["Choose a syllabus version of this subject."];
  if (input.entityType === "TOPIC" && syllabus && syllabus.status !== "DRAFT") errors.syllabusId = ["This version is published, so its topic tree is frozen. Choose a DRAFT version."];
  if (!source || !source.isActive) errors.sourceId = ["Choose an active content source."];
  if (Object.keys(errors).length > 0 || !source) throw AppError.validation(errors);

  const media = await createMediaAsset(
    infraActor(actor),
    { bytes: file.bytes, filename: file.filename ?? null },
    { purpose: "IMPORT_FILE", visibility: "PRIVATE", sourceId: source.id, licenceCode: input.licenceCode ?? source.licenceCode },
    deps.storage ? { storage: deps.storage } : {},
  );
  const format = formatFromMime(media.mimeType);
  if (!format) throw AppError.validation({ file: ["Upload a CSV, Excel (.xlsx) or JSON file."] });

  const options: ImportOptions = {
    version: 1,
    defaults: { difficulty: input.defaultDifficulty, accessTier: input.defaultAccessTier, sourceId: source.id },
    provenance: {
      author: input.author,
      licenceCode: input.licenceCode ?? source.licenceCode ?? null,
      attribution: input.attribution ?? (source.requiresAttribution ? source.attributionText : null) ?? null,
      sourceUrl: input.sourceUrl,
    },
    columnMap: {},
    progress: null,
  };
  const duplicates = await db.contentImport.findMany({
    where: { ...sameFileWhere(input.entityType, media.checksumSha256, input.subjectId, input.syllabusId), status: { not: "CANCELLED" } },
    select: { id: true, status: true, createdAt: true, importedRows: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const created = await db.$transaction(async (tx) => {
    const row = await tx.contentImport.create({
      data: {
        entityType: input.entityType,
        format,
        status: "UPLOADED",
        fileMediaId: media.id,
        subjectId: input.subjectId,
        syllabusId: input.syllabusId,
        options: optionsJson(options),
        createdById: actor.userId,
      },
      select: RUN_SELECT,
    });
    await auditImport(tx, actor, context, {
      operation: IMPORT_OPERATIONS.upload,
      importId: row.id,
      after: { entityType: input.entityType, format, subjectId: input.subjectId, syllabusId: input.syllabusId, sourceId: source.id, fileMediaId: media.id },
      metadata: { byteSize: media.byteSize, checksumSha256: media.checksumSha256, duplicateOf: duplicates.map((d) => d.id) },
    });
    return row;
  });
  const status = await startValidation(created, file.bytes, deps);
  return { id: created.id, status, duplicates };
}

/** Runs the dry run again (e.g. after the curriculum was fixed). The report is replaced. */
export async function revalidateImport(actor: CmsActor, raw: unknown, context: ImportServiceContext = {}, deps: ImportServiceDeps = {}): Promise<{ id: string; status: ImportStatus }> {
  assertCanImport(actor);
  const { id } = parseInput(idSchema, raw);
  const row = await loadRunRow(db, id);
  assertCanImport(actor, entityOf(row));
  if (!allowedImportActions(row.status as ImportStatus, row).includes("validate")) throw AppError.conflict("This import can't be checked again in its current state.");
  const moved = await db.$transaction(async (tx) => {
    const updated = await tx.contentImport.updateMany({ where: { id, status: row.status }, data: { status: "UPLOADED", completedAt: null } });
    if (updated.count === 1) await auditImport(tx, actor, context, { operation: IMPORT_OPERATIONS.validate, importId: id });
    return updated.count === 1;
  });
  if (!moved) throw AppError.conflict();
  const status = await startValidation({ ...row, status: "UPLOADED" }, await readFile(row, deps), deps);
  return { id, status };
}

// =====================================================================================================================
// Commit
// =====================================================================================================================

/** Writes one chunk of prepared rows as DRAFT content. Returns the ids created. */
async function writeRows(tx: Tx, entityType: ImportEntityType, rows: readonly (PreparedQuestion | PreparedFlashcard | PreparedLesson)[], origin: DraftOrigin, provenance: DraftProvenance, languageCode: string, subjectId: string): Promise<string[]> {
  if (entityType === "FLASHCARD") {
    return insertFlashcardDrafts(
      tx,
      (rows as PreparedFlashcard[]).map((card) => ({ subjectId, cardType: card.cardType, front: card.front, back: card.back, notes: card.notes, accessTier: card.accessTier, languageCode, topicId: card.topicId, externalRef: card.externalRef })),
      origin,
      provenance,
    );
  }
  if (entityType === "LESSON") {
    const ids: string[] = [];
    const slugs = new Set<string>();
    for (const lesson of rows as PreparedLesson[]) {
      const created = await insertLessonDraft(tx, { ...lesson, subjectId, languageCode, externalRef: lesson.externalRef }, origin, provenance, slugs);
      ids.push(created.id);
    }
    return ids;
  }
  const questions = rows as PreparedQuestion[];
  const topics = await topicSyllabusMap(tx, questions.flatMap((q) => q.doc.topics.map((t) => t.topicId.toLowerCase())));
  const ids: string[] = [];
  for (const question of questions) ids.push(await insertQuestionDraft(tx, question.doc, origin, { externalRef: question.externalRef, topics }));
  return ids;
}

/** Locks the import row and returns its status (serialises chunk writes against a concurrent cancel). */
async function lockStatus(tx: Tx, id: string): Promise<ImportStatus | null> {
  const rows = await tx.$queryRaw<{ status: ImportStatus }[]>`SELECT "status" FROM "ContentImport" WHERE "id" = ${id}::uuid FOR UPDATE`;
  return rows[0]?.status ?? null;
}

interface CommitOutcome {
  status: ImportStatus;
  importedRows: number;
}

/**
 * Writes the valid rows of an IMPORTING import. `chunked` (background job) writes COMMIT_CHUNK_SIZE rows per
 * transaction and records the resume point with them; otherwise everything is written in ONE transaction.
 */
async function commitRows(row: RunRow, bytes: Uint8Array, chunked: boolean, signal?: AbortSignal): Promise<CommitOutcome> {
  const entityType = entityOf(row);
  const options = parseOptions(row.options);
  const parsed = await parseImportFile(bytes, row.format as ImportFormat, entityType);
  const result = await runDryRun(row, parsed, options);
  const subject = await db.subject.findUniqueOrThrow({ where: { id: row.subjectId ?? "" }, select: { languageCode: true } });
  const origin: DraftOrigin = { createdById: row.createdById, importId: row.id };
  const provenance: DraftProvenance = { sourceId: options.defaults.sourceId, ...options.provenance };
  const resumeAfter = options.progress?.committedThroughRow ?? 0;
  const pending = result.prepared.filter((p) => p.row > resumeAfter);
  let imported = row.importedRows;

  const finish = async (tx: Tx) => {
    await tx.contentImport.update({
      where: { id: row.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        importedRows: imported,
        totalRows: result.totalRows,
        validRows: Math.max(result.validRows, imported),
        failedRows: result.failedRows,
        errors: storedIssues(result.issues),
        options: optionsJson({ ...options, progress: null }),
      },
    });
    await auditImport(tx, null, {}, { operation: IMPORT_OPERATIONS.complete, importId: row.id, metadata: { entityType, importedRows: imported, failedRows: result.failedRows, requestedBy: row.createdById } });
  };

  if (entityType === "TOPIC") {
    if (!row.syllabusId) throw new PermanentJobError("Topic import without a syllabus version");
    const syllabusId = row.syllabusId;
    return db.$transaction(async (tx) => {
      if ((await lockStatus(tx, row.id)) !== "IMPORTING") return { status: "CANCELLED", importedRows: 0 } as CommitOutcome;
      const written = await insertTopicOutline(tx, syllabusId, pending as PreparedTopic[], row.id);
      imported = written.topics;
      // Sequential: a transaction is one connection.
      const version = await tx.syllabus.findUniqueOrThrow({ where: { id: syllabusId }, select: { sourceId: true, sourceNotes: true } });
      const source = await tx.contentSource.findUnique({ where: { id: options.defaults.sourceId }, select: { id: true, name: true } });
      const note = `[${new Date().toISOString().slice(0, 10)}] Outline imported (${written.topics} topics, ${written.objectives} objectives)${source ? ` from ${source.name}` : ""}, import ${row.id}.`;
      await tx.syllabus.update({
        where: { id: syllabusId },
        data: { sourceNotes: [version.sourceNotes, note].filter(Boolean).join("\n").slice(-5_000), ...(version.sourceId === null && source ? { sourceId: source.id } : {}) },
      });
      await finish(tx);
      return { status: "COMPLETED", importedRows: imported } as CommitOutcome;
    }, LONG_TX);
  }

  const contentRows = pending as (PreparedQuestion | PreparedFlashcard | PreparedLesson)[];
  const size = chunked ? COMMIT_CHUNK_SIZE : Math.max(1, contentRows.length);
  if (!chunked) {
    return db.$transaction(async (tx) => {
      if ((await lockStatus(tx, row.id)) !== "IMPORTING") return { status: "CANCELLED", importedRows: 0 } as CommitOutcome;
      imported += (await writeRows(tx, entityType, contentRows, origin, provenance, subject.languageCode, row.subjectId as string)).length;
      await finish(tx);
      return { status: "COMPLETED", importedRows: imported } as CommitOutcome;
    }, LONG_TX);
  }

  for (let start = 0; start < contentRows.length; start += size) {
    if (signal?.aborted) throw new Error("Worker shutting down; the import resumes from its last chunk");
    const chunk = contentRows.slice(start, start + size);
    const stillImporting = await db.$transaction(async (tx) => {
      if ((await lockStatus(tx, row.id)) !== "IMPORTING") return false;
      const ids = await writeRows(tx, entityType, chunk, origin, provenance, subject.languageCode, row.subjectId as string);
      imported += ids.length;
      const lastRow = chunk.at(-1)?.row ?? resumeAfter;
      await tx.contentImport.update({
        where: { id: row.id },
        data: {
          importedRows: imported,
          options: optionsJson({ ...options, progress: { phase: "commit", processed: imported, total: result.validRows, committedThroughRow: lastRow } }),
        },
      });
      return true;
    }, LONG_TX);
    if (!stillImporting) return { status: "CANCELLED", importedRows: imported };
    await yieldToEventLoop();
  }
  return db.$transaction(async (tx) => {
    if ((await lockStatus(tx, row.id)) !== "IMPORTING") return { status: "CANCELLED", importedRows: imported } as CommitOutcome;
    await finish(tx);
    return { status: "COMPLETED", importedRows: imported } as CommitOutcome;
  }, LONG_TX);
}

function safeFailureMessage(error: unknown): string {
  if (isAppError(error)) return error.message;
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return "An item with the same external reference or slug was created meanwhile.";
  return "An unexpected error stopped the import.";
}

/**
 * Writes the valid rows as DRAFT content. Refused unless the dry run passed; rows with errors are skipped only with
 * `skipInvalid`, and an exact duplicate of an earlier completed import only with `confirmDuplicate`.
 */
export async function commitImport(actor: CmsActor, raw: unknown, context: ImportServiceContext = {}, deps: ImportServiceDeps = {}): Promise<{ id: string; status: ImportStatus; importedRows: number }> {
  assertCanImport(actor);
  const input = parseInput(commitSchema, raw);
  const row = await loadRunRow(db, input.id);
  const entityType = entityOf(row);
  assertCanImport(actor, entityType);
  if (row.status !== "VALIDATED") throw AppError.conflict("Only a checked import can be imported. Check it again first.");
  if (row.validRows === 0) throw AppError.validation({ _form: ["No row passed the check, so there is nothing to import."] });
  if (row.failedRows > 0 && !input.skipInvalid) {
    throw AppError.validation({ skipInvalid: [`${row.failedRows} row${row.failedRows === 1 ? " has" : "s have"} errors. Fix the file, or confirm that only the ${row.validRows} valid rows should be imported.`] });
  }
  const completedTwin = await db.contentImport.findFirst({
    where: { ...sameFileWhere(entityType, row.file.checksumSha256, row.subjectId, row.syllabusId), id: { not: row.id }, status: "COMPLETED" },
    select: { id: true },
  });
  if (completedTwin && !input.confirmDuplicate) {
    throw AppError.validation({ confirmDuplicate: ["This exact file was imported before. Confirm that you want to import it again (rows with an external reference are never duplicated)."] });
  }
  const moved = await db.$transaction(async (tx) => {
    const updated = await tx.contentImport.updateMany({ where: { id: row.id, status: "VALIDATED" }, data: { status: "IMPORTING", startedAt: new Date() } });
    if (updated.count !== 1) return false;
    await auditImport(tx, actor, context, {
      operation: IMPORT_OPERATIONS.commit,
      importId: row.id,
      metadata: { entityType, validRows: row.validRows, failedRows: row.failedRows, skipInvalid: input.skipInvalid, duplicateOf: completedTwin?.id ?? null },
    });
    return true;
  });
  if (!moved) throw AppError.conflict("This import is already being imported.");

  const limit = deps.inlineRowLimit ?? INLINE_ROW_LIMIT;
  if (row.totalRows > limit) {
    const options = parseOptions(row.options);
    await db.$transaction(async (tx) => {
      await tx.contentImport.update({ where: { id: row.id }, data: { options: optionsJson({ ...options, progress: { phase: "commit", processed: 0, total: row.validRows, committedThroughRow: 0 } }) } });
      await enqueueRun(tx, row.id, "commit");
    });
    return { id: row.id, status: "IMPORTING", importedRows: 0 };
  }
  try {
    const outcome = await commitRows({ ...row, status: "IMPORTING" }, await readFile(row, deps), false);
    return { id: row.id, ...outcome };
  } catch (error) {
    logger.error("import commit failed", { importId: row.id, err: error });
    const issues = parseIssues((await db.contentImport.findUnique({ where: { id: row.id }, select: { errors: true } }))?.errors);
    await db.contentImport.updateMany({
      where: { id: row.id, status: "IMPORTING" },
      data: { status: "VALIDATED", startedAt: null, errors: storedIssues([{ row: 0, code: "WRITE", message: `Nothing was imported: ${safeFailureMessage(error)}`, severity: "error" }, ...issues.filter((i) => i.code !== "WRITE")]) },
    });
    throw AppError.conflict(`Nothing was imported: ${safeFailureMessage(error)} Check the report and try again.`);
  }
}

// =====================================================================================================================
// Cancel
// =====================================================================================================================

/** Cancels an import that has not finished. A running background import stops after its current chunk. */
export async function cancelImport(actor: CmsActor, raw: unknown, context: ImportServiceContext = {}): Promise<{ id: string; status: ImportStatus }> {
  assertCanImport(actor);
  const { id } = parseInput(idSchema, raw);
  const row = await loadRunRow(db, id);
  assertCanImport(actor, entityOf(row));
  if (!allowedImportActions(row.status as ImportStatus, row).includes("cancel")) throw AppError.conflict("This import has already finished.");
  const cancelled = await db.$transaction(async (tx) => {
    const updated = await tx.contentImport.updateMany({
      where: { id, status: { in: ["UPLOADED", "VALIDATING", "VALIDATED", "IMPORTING", "FAILED"] } },
      data: { status: "CANCELLED", completedAt: new Date() },
    });
    if (updated.count !== 1) return false;
    await auditImport(tx, actor, context, { operation: IMPORT_OPERATIONS.cancel, importId: id, metadata: { previousStatus: row.status, importedRows: row.importedRows } });
    return true;
  });
  if (!cancelled) throw AppError.conflict();
  const pending = await db.job.findMany({ where: { type: IMPORT_JOB_TYPE, status: "PENDING", dedupeKey: { in: [`import:${id}:validate`, `import:${id}:commit`] } }, select: { id: true } });
  for (const job of pending) await cancelJob(job.id);
  return { id, status: "CANCELLED" };
}

// =====================================================================================================================
// Background job: imports.run
// =====================================================================================================================

export const importJobPayloadSchema = z.object({ importId: z.uuid(), phase: z.enum(["validate", "commit"]) });
export type ImportJobPayload = z.output<typeof importJobPayloadSchema>;

/**
 * `imports.run` handler (queue `imports`): the dry run or the chunked commit of one import. Idempotent: an import that
 * is no longer VALIDATING / IMPORTING is skipped, and the commit resumes after the last chunk it recorded. On the last
 * attempt a failure marks the import FAILED with the reason in its report.
 */
export async function handleImportJob(payload: unknown, context: Pick<JobContext, "attempt" | "maxAttempts" | "signal"> = { attempt: 1, maxAttempts: 1, signal: new AbortController().signal }, deps: ImportServiceDeps = {}): Promise<Record<string, unknown>> {
  const { importId, phase } = importJobPayloadSchema.parse(payload);
  const row = await db.contentImport.findUnique({ where: { id: importId }, select: RUN_SELECT });
  if (!row) return { skipped: "missing" };
  const expected = phase === "validate" ? "VALIDATING" : "IMPORTING";
  if (row.status !== expected) return { skipped: row.status };
  try {
    const bytes = await readFile(row, deps);
    if (phase === "validate") {
      const { status, result } = await validateAndStore(row, bytes, true);
      return { status, totalRows: result.totalRows, validRows: result.validRows, failedRows: result.failedRows };
    }
    const outcome = await commitRows(row, bytes, true, context.signal);
    return { status: outcome.status, importedRows: outcome.importedRows };
  } catch (error) {
    const lastAttempt = context.attempt >= context.maxAttempts || error instanceof PermanentJobError;
    if (!lastAttempt) throw error;
    const issues = parseIssues((await db.contentImport.findUnique({ where: { id: importId }, select: { errors: true } }))?.errors);
    await db.$transaction(async (tx) => {
      const updated = await tx.contentImport.updateMany({
        where: { id: importId, status: expected },
        data: {
          status: "FAILED",
          completedAt: new Date(),
          errors: storedIssues([{ row: 0, code: "WRITE", message: `The ${phase === "validate" ? "check" : "import"} stopped: ${safeFailureMessage(error)}`, severity: "error" }, ...issues]),
        },
      });
      if (updated.count === 1) await auditImport(tx, null, {}, { operation: IMPORT_OPERATIONS.fail, importId, metadata: { phase, attempts: context.attempt } });
    });
    throw error instanceof PermanentJobError ? error : new PermanentJobError(safeFailureMessage(error), { cause: error });
  }
}

/** Registers `imports.run` (queue `imports`, 3 attempts). Call from src/worker/handlers.ts `registerAllJobs()`. */
export function registerImportJobs(): void {
  registerJobHandler(IMPORT_JOB_TYPE, importJobPayloadSchema, (payload, context) => handleImportJob(payload, context), { queue: IMPORT_JOB_QUEUE, maxAttempts: 3 });
}

// =====================================================================================================================
// Read models
// =====================================================================================================================

export interface ImportListRow {
  id: string;
  entityType: ImportEntityType;
  format: ImportFormat;
  status: ImportStatus;
  fileName: string | null;
  subject: string | null;
  syllabus: string | null;
  totalRows: number;
  validRows: number;
  failedRows: number;
  importedRows: number;
  createdBy: string | null;
  createdByMe: boolean;
  createdAt: Date;
  completedAt: Date | null;
  progress: ImportOptions["progress"];
}

const LIST_SELECT = {
  id: true,
  entityType: true,
  format: true,
  status: true,
  totalRows: true,
  validRows: true,
  failedRows: true,
  importedRows: true,
  createdAt: true,
  completedAt: true,
  createdById: true,
  options: true,
  file: { select: { originalFilename: true, byteSize: true, checksumSha256: true } },
  subject: { select: { name: true } },
  syllabus: { select: { title: true, versionLabel: true } },
  createdBy: PERSON_SELECT,
} as const satisfies Prisma.ContentImportSelect;
type ListRowData = Prisma.ContentImportGetPayload<{ select: typeof LIST_SELECT }>;

function progressOf(options: unknown): ImportOptions["progress"] {
  const parsed = importOptionsSchema.safeParse(options);
  return parsed.success ? parsed.data.progress : null;
}

function toListRow(row: ListRowData, actor: CmsActor): ImportListRow {
  return {
    id: row.id,
    entityType: entityOf(row),
    format: row.format as ImportFormat,
    status: row.status as ImportStatus,
    fileName: row.file.originalFilename,
    subject: row.subject?.name ?? null,
    syllabus: row.syllabus ? `${row.syllabus.title} (${row.syllabus.versionLabel})` : null,
    totalRows: row.totalRows,
    validRows: row.validRows,
    failedRows: row.failedRows,
    importedRows: row.importedRows,
    createdBy: personName(row.createdBy),
    createdByMe: row.createdById === actor.userId,
    createdAt: row.createdAt,
    completedAt: row.completedAt,
    progress: progressOf(row.options),
  };
}

/** Imports newest first, with status / type / "mine" filters and cursor pages. */
export async function listImports(actor: CmsActor, raw: unknown = {}): Promise<{ items: ImportListRow[]; nextCursor: string | null }> {
  assertCanImport(actor);
  const filter = parseInput(importFilterSchema, raw);
  const cursor = filter.cursor ? decodeCursor(filter.cursor) : null;
  const rows = await db.contentImport.findMany({
    where: {
      entityType: filter.entityType ? filter.entityType : { in: [...IMPORT_ENTITY_TYPES] },
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.mine ? { createdById: actor.userId } : {}),
      ...afterCursorWhere(cursor),
    },
    select: LIST_SELECT,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: filter.limit + 1,
  });
  const page = pageOf(rows, filter.limit);
  return { items: page.items.map((row) => toListRow(row, actor)), nextCursor: page.nextCursor };
}

export interface ImportCreatedItem {
  id: string;
  label: string;
  status: string | null;
}

export interface ImportDetail extends ImportListRow {
  fileBytes: number;
  checksum: string;
  subjectId: string | null;
  syllabusId: string | null;
  syllabusStatus: string | null;
  source: { id: string; name: string } | null;
  options: ImportOptions | null;
  issues: ImportIssue[];
  /** Problems not stored (the report keeps the first MAX_STORED_ISSUES). */
  issuesTruncated: boolean;
  duplicates: { id: string; status: ImportStatus; createdAt: Date; importedRows: number; createdBy: string | null }[];
  actions: ImportAction[];
  created: { total: number; byStatus: Record<string, number>; items: ImportCreatedItem[] };
  job: { status: string; attempts: number; lastError: string | null } | null;
  startedAt: Date | null;
}

async function createdItems(id: string, entityType: ImportEntityType): Promise<ImportDetail["created"]> {
  const take = 50;
  if (entityType === "TOPIC") {
    const [total, items] = await Promise.all([
      db.topic.count({ where: { importId: id } }),
      db.topic.findMany({ where: { importId: id }, select: { id: true, code: true, name: true }, orderBy: { path: "asc" }, take }),
    ]);
    return { total, byStatus: {}, items: items.map((t) => ({ id: t.id, label: `${t.code ? `${t.code} ` : ""}${t.name}`, status: null })) };
  }
  if (entityType === "QUESTION") {
    const where = { importId: id, parentId: null };
    const [groups, items] = await Promise.all([
      db.question.groupBy({ by: ["status"], where, _count: { _all: true } }),
      db.question.findMany({ where, select: { id: true, stem: true, status: true }, orderBy: [{ createdAt: "asc" }, { id: "asc" }], take }),
    ]);
    return summarise(groups, items.map((q) => ({ id: q.id, label: excerpt(q.stem), status: q.status })));
  }
  if (entityType === "FLASHCARD") {
    const where = { importId: id };
    const [groups, items] = await Promise.all([
      db.flashcard.groupBy({ by: ["status"], where, _count: { _all: true } }),
      db.flashcard.findMany({ where, select: { id: true, front: true, status: true }, orderBy: [{ createdAt: "asc" }, { id: "asc" }], take }),
    ]);
    return summarise(groups, items.map((f) => ({ id: f.id, label: excerpt(f.front), status: f.status })));
  }
  const where = { importId: id };
  const [groups, items] = await Promise.all([
    db.lesson.groupBy({ by: ["status"], where, _count: { _all: true } }),
    db.lesson.findMany({ where, select: { id: true, title: true, status: true }, orderBy: [{ createdAt: "asc" }, { id: "asc" }], take }),
  ]);
  return summarise(groups, items.map((l) => ({ id: l.id, label: l.title, status: l.status })));
}

function summarise(groups: { status: string; _count: { _all: number } }[], items: ImportCreatedItem[]): ImportDetail["created"] {
  const byStatus = Object.fromEntries(groups.map((g) => [g.status, g._count._all]));
  return { total: groups.reduce((sum, g) => sum + g._count._all, 0), byStatus, items };
}

function excerpt(markdown: string, max = 110): string {
  const text = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, "[image]").replace(/[#*_`>]/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** One import with its report, duplicates, created items and the background job's state. */
export async function getImportDetail(actor: CmsActor, id: string): Promise<ImportDetail> {
  assertCanImport(actor);
  if (!z.uuid().safeParse(id).success) throw AppError.notFound("Import not found.");
  const row = await db.contentImport.findUnique({
    where: { id },
    select: { ...LIST_SELECT, errors: true, subjectId: true, syllabusId: true, startedAt: true, syllabus: { select: { title: true, versionLabel: true, status: true } } },
  });
  if (!row || !isImportEntity(row.entityType)) throw AppError.notFound("Import not found.");
  const options = importOptionsSchema.safeParse(row.options);
  const entityType = entityOf(row);
  const [source, duplicates, created, job] = await Promise.all([
    options.success ? db.contentSource.findUnique({ where: { id: options.data.defaults.sourceId }, select: { id: true, name: true } }) : null,
    db.contentImport.findMany({
      where: { ...sameFileWhere(entityType, row.file.checksumSha256, row.subjectId, row.syllabusId), id: { not: id }, status: { not: "CANCELLED" } },
      select: { id: true, status: true, createdAt: true, importedRows: true, createdBy: PERSON_SELECT },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    createdItems(id, entityType),
    db.job.findFirst({
      where: { type: IMPORT_JOB_TYPE, dedupeKey: { in: [`import:${id}:validate`, `import:${id}:commit`] }, status: { in: ["PENDING", "RUNNING"] } },
      select: { status: true, attempts: true, lastError: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  const issues = parseIssues(row.errors);
  const status = row.status as ImportStatus;
  return {
    ...toListRow(row, actor),
    fileBytes: row.file.byteSize,
    checksum: row.file.checksumSha256,
    subjectId: row.subjectId,
    syllabusId: row.syllabusId,
    syllabusStatus: row.syllabus?.status ?? null,
    source,
    options: options.success ? options.data : null,
    issues,
    issuesTruncated: issues.length >= MAX_STORED_ISSUES,
    duplicates: duplicates.map((d) => ({ id: d.id, status: d.status as ImportStatus, createdAt: d.createdAt, importedRows: d.importedRows, createdBy: personName(d.createdBy) })),
    actions: allowedImportActions(status, row),
    created,
    job: job ? { status: job.status, attempts: job.attempts, lastError: job.lastError ? "The background job hit an error and will retry." : null } : null,
    startedAt: row.startedAt,
  };
}

/** The dry-run report as CSV (row, field, severity, code, message) for download. */
export async function importReportCsv(actor: CmsActor, id: string): Promise<{ fileName: string; csv: string }> {
  const detail = await getImportDetail(actor, id);
  // Cells can echo text from the uploaded file: neutralise spreadsheet formulas (CSV injection), then quote.
  const escape = (raw: string) => {
    const value = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
    return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  };
  const lines = [
    ["row", "field", "severity", "code", "message"].join(","),
    ...detail.issues.map((i) => [String(i.row), i.field ?? "", i.severity, i.code, i.message].map(escape).join(",")),
  ];
  return { fileName: `import-${id.slice(0, 8)}-report.csv`, csv: `﻿${lines.join("\r\n")}\r\n` };
}
