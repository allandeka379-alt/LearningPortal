import "server-only";
import { z } from "zod";
import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import {
  buildAssessmentDocument,
  buildFlashcardDocument,
  buildLessonDocument,
  buildQuestionDocument,
  buildStudyPackDocument,
  buildSubjectDocument,
  buildTopicDocument,
} from "./documents";
import {
  SEARCHABLE_ENTITY_TYPES,
  type BuildContext,
  type SearchableEntityType,
  type SearchDocumentInput,
  type TopicName,
} from "./types";

/**
 * Search indexer (§28, ARCHITECTURE §3.9 / §3.7 `search.index`): loads a source row with its curriculum context,
 * builds its SearchDocument with the pure builders in documents.ts, and upserts or deletes the index row.
 *
 * - The index holds PUBLISHED platform content only; the SearchDocument_status_chk CHECK backs this up in Postgres.
 * - Call {@link reindexEntity} (or enqueue `search.reindexEntity`) after every publish, publish merge, archive and
 *   catalogue change of a searchable row; it deletes the document when the row is no longer indexable.
 * - {@link reindexAll} rebuilds everything in id-ordered batches (keyset cursors, no OFFSET) and then sweeps stale
 *   documents whose source vanished or stopped qualifying. Run it after curriculum renames/visibility changes and
 *   after search-relevant code changes.
 * - Writes are one multi-row `INSERT … ON CONFLICT DO UPDATE … WHERE … IS DISTINCT FROM` per batch (parameterised
 *   `$executeRaw`), so unchanged documents are not rewritten (no tsvector/GIN churn on re-runs).
 */

export const DEFAULT_REINDEX_BATCH_SIZE = 200;
/** ~20 bound parameters per row: 500 rows stays far below Postgres' 65,535-parameter limit. */
export const MAX_REINDEX_BATCH_SIZE = 500;

// ---------------------------------------------------------------------------------------------------------------------
// Prisma selects (field names match the *Ref / *Source interfaces in types.ts)
// ---------------------------------------------------------------------------------------------------------------------

const boardSelect = {
  id: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  catalogueStatus: true,
} as const satisfies Prisma.ExamBoardSelect;

const qualificationSelect = {
  id: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  catalogueStatus: true,
  level: { select: { id: true, slug: true, name: true, shortName: true } },
  examBoard: { select: boardSelect },
} as const satisfies Prisma.QualificationSelect;

const subjectSelect = {
  id: true,
  slug: true,
  name: true,
  shortName: true,
  officialCode: true,
  languageCode: true,
  isPublic: true,
  catalogueStatus: true,
  qualification: { select: qualificationSelect },
} as const satisfies Prisma.SubjectSelect;

const syllabusSelect = {
  id: true,
  code: true,
  status: true,
  subject: { select: subjectSelect },
} as const satisfies Prisma.SyllabusSelect;

const topicSelect = {
  id: true,
  name: true,
  slug: true,
  code: true,
  path: true,
  kind: true,
  isPublic: true,
  syllabus: { select: syllabusSelect },
} as const satisfies Prisma.TopicSelect;

const workflowSelect = { status: true, draftOfId: true, updatedAt: true } as const;

const lessonSelect = {
  id: true,
  kind: true,
  title: true,
  slug: true,
  summary: true,
  body: true,
  languageCode: true,
  accessTier: true,
  ...workflowSelect,
  subject: { select: subjectSelect },
  qualification: { select: qualificationSelect },
  examBoard: { select: boardSelect },
  topics: { select: { isPrimary: true, topic: { select: topicSelect } }, orderBy: { sortOrder: "asc" } },
} as const satisfies Prisma.LessonSelect;

// Deliberately no answerSpec / explanation / workedSolution / hints / options: they must never reach the index.
const questionSelect = {
  id: true,
  parentId: true,
  schoolId: true,
  ownerUserId: true,
  type: true,
  stem: true,
  marks: true,
  paperLabel: true,
  year: true,
  isExamStyle: true,
  languageCode: true,
  accessTier: true,
  ...workflowSelect,
  subject: { select: subjectSelect },
  topics: { select: { isPrimary: true, topic: { select: topicSelect } } },
} as const satisfies Prisma.QuestionSelect;

// Deliberately no back / notes: only the front of a platform card is indexed.
const flashcardSelect = {
  id: true,
  ownerUserId: true,
  cardType: true,
  front: true,
  languageCode: true,
  accessTier: true,
  ...workflowSelect,
  subject: { select: subjectSelect },
  topics: { select: { isPrimary: true, topic: { select: topicSelect } }, orderBy: { sortOrder: "asc" } },
} as const satisfies Prisma.FlashcardSelect;

const assessmentSelect = {
  id: true,
  kind: true,
  title: true,
  description: true,
  schoolId: true,
  ownerUserId: true,
  accessTier: true,
  ...workflowSelect,
  subject: { select: subjectSelect },
  syllabus: { select: { id: true, code: true, status: true } },
  topics: { select: { topic: { select: topicSelect } } },
} as const satisfies Prisma.AssessmentSelect;

const studyPackSelect = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  description: true,
  isFeatured: true,
  ...workflowSelect,
  scopes: {
    select: {
      qualification: { select: qualificationSelect },
      subject: { select: subjectSelect },
      syllabus: { select: syllabusSelect },
    },
  },
} as const satisfies Prisma.StudyPackSelect;

const topicSourceSelect = {
  ...topicSelect,
  description: true,
  publicSummary: true,
  updatedAt: true,
} as const satisfies Prisma.TopicSelect;

const subjectSourceSelect = {
  ...subjectSelect,
  description: true,
  publicSummary: true,
  updatedAt: true,
  syllabi: { where: { status: "CURRENT" }, select: { id: true, code: true }, take: 1 },
} as const satisfies Prisma.SubjectSelect;

// ---------------------------------------------------------------------------------------------------------------------
// Per-type loaders
// ---------------------------------------------------------------------------------------------------------------------

interface LoadFilter {
  /** Load exactly these ids (any status), e.g. one entity or a sweep batch. */
  ids?: readonly string[];
  /** Keyset cursor: ids strictly greater than this one (results are ordered by id). */
  afterId?: string;
  /** Pre-filter to rows that can possibly be indexed (forward reindex pass). The builders still decide. */
  eligibleOnly: boolean;
  take?: number;
}

/** A loaded source row, ready to build once topic ancestor names are known. */
interface PreparedSource {
  id: string;
  topicPaths: readonly string[];
  build(ctx: BuildContext): SearchDocumentInput | null;
}

type Loader = (client: DbClient, filter: LoadFilter) => Promise<PreparedSource[]>;

function idWhere(filter: LoadFilter): { AND: Array<{ id: { in: string[] } | { gt: string } }> } {
  const and: Array<{ id: { in: string[] } | { gt: string } }> = [];
  if (filter.ids) and.push({ id: { in: [...filter.ids] } });
  if (filter.afterId) and.push({ id: { gt: filter.afterId } });
  return { AND: and };
}

function page(filter: LoadFilter): { orderBy: { id: "asc" }; take?: number } {
  return filter.take === undefined ? { orderBy: { id: "asc" } } : { orderBy: { id: "asc" }, take: filter.take };
}

const pathsOf = (tags: ReadonlyArray<{ topic: { path: string } }>): string[] => tags.map((tag) => tag.topic.path);

const LOADERS: Record<SearchableEntityType, Loader> = {
  async LESSON(client, filter) {
    const rows = await client.lesson.findMany({
      where: { ...idWhere(filter), ...(filter.eligibleOnly ? { status: "PUBLISHED", draftOfId: null } : {}) },
      select: lessonSelect,
      ...page(filter),
    });
    return rows.map((row) => ({ id: row.id, topicPaths: pathsOf(row.topics), build: (ctx) => buildLessonDocument(row, ctx) }));
  },

  async QUESTION(client, filter) {
    const rows = await client.question.findMany({
      where: {
        ...idWhere(filter),
        ...(filter.eligibleOnly
          ? { status: "PUBLISHED", draftOfId: null, parentId: null, schoolId: null, ownerUserId: null }
          : {}),
      },
      select: questionSelect,
      ...page(filter),
    });
    return rows.map((row) => ({ id: row.id, topicPaths: pathsOf(row.topics), build: (ctx) => buildQuestionDocument(row, ctx) }));
  },

  async FLASHCARD(client, filter) {
    const rows = await client.flashcard.findMany({
      where: {
        ...idWhere(filter),
        ...(filter.eligibleOnly ? { status: "PUBLISHED", draftOfId: null, ownerUserId: null } : {}),
      },
      select: flashcardSelect,
      ...page(filter),
    });
    return rows.map((row) => ({ id: row.id, topicPaths: pathsOf(row.topics), build: (ctx) => buildFlashcardDocument(row, ctx) }));
  },

  async ASSESSMENT(client, filter) {
    const rows = await client.assessment.findMany({
      where: {
        ...idWhere(filter),
        ...(filter.eligibleOnly ? { status: "PUBLISHED", draftOfId: null, schoolId: null, ownerUserId: null } : {}),
      },
      select: assessmentSelect,
      ...page(filter),
    });
    return rows.map((row) => {
      const source = { ...row, topics: row.topics.map((tag) => ({ topic: tag.topic, isPrimary: false })) };
      return { id: row.id, topicPaths: pathsOf(row.topics), build: (ctx) => buildAssessmentDocument(source, ctx) };
    });
  },

  async STUDY_PACK(client, filter) {
    const rows = await client.studyPack.findMany({
      where: { ...idWhere(filter), ...(filter.eligibleOnly ? { status: "PUBLISHED", draftOfId: null } : {}) },
      select: studyPackSelect,
      ...page(filter),
    });
    return rows.map((row) => ({ id: row.id, topicPaths: [], build: () => buildStudyPackDocument(row) }));
  },

  async TOPIC(client, filter) {
    const rows = await client.topic.findMany({
      where: { ...idWhere(filter), ...(filter.eligibleOnly ? { syllabus: { status: "CURRENT" } } : {}) },
      select: topicSourceSelect,
      ...page(filter),
    });
    return rows.map((row) => ({ id: row.id, topicPaths: [row.path], build: (ctx) => buildTopicDocument(row, ctx) }));
  },

  async SUBJECT(client, filter) {
    const rows = await client.subject.findMany({
      where: { ...idWhere(filter), ...(filter.eligibleOnly ? { catalogueStatus: { not: "HIDDEN" } } : {}) },
      select: subjectSourceSelect,
      ...page(filter),
    });
    return rows.map((row) => {
      const { syllabi, ...subject } = row;
      const source = { ...subject, currentSyllabus: syllabi[0] ?? null };
      return { id: row.id, topicPaths: [], build: () => buildSubjectDocument(source) };
    });
  },
};

/** Loads the names of every ancestor named in the sources' topic paths, in ONE query (no N+1). */
async function loadBuildContext(client: DbClient, sources: readonly PreparedSource[]): Promise<BuildContext> {
  const ids = new Set<string>();
  for (const source of sources) {
    for (const path of source.topicPaths) {
      const parts = path.split("/");
      // The last id is the topic itself (its name is already loaded).
      for (const id of parts.slice(0, -1)) if (id !== "") ids.add(id);
    }
  }
  const ancestors = new Map<string, TopicName>();
  if (ids.size > 0) {
    const rows = await client.topic.findMany({ where: { id: { in: [...ids] } }, select: { id: true, name: true } });
    for (const row of rows) ancestors.set(row.id, row);
  }
  return { ancestors };
}

/** Loads and builds documents; the map holds `null` for loaded rows that must not be indexed. */
async function buildDocuments(
  client: DbClient,
  entityType: SearchableEntityType,
  filter: LoadFilter,
): Promise<{ loaded: PreparedSource[]; documents: Map<string, SearchDocumentInput | null> }> {
  const loaded = await LOADERS[entityType](client, filter);
  const ctx = await loadBuildContext(client, loaded);
  const documents = new Map<string, SearchDocumentInput | null>();
  for (const source of loaded) documents.set(source.id, source.build(ctx));
  return { loaded, documents };
}

// ---------------------------------------------------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------------------------------------------------

const entityRefSchema = z.object({ entityType: z.enum(SEARCHABLE_ENTITY_TYPES), entityId: z.uuid() });

function assertEntityRef(entityType: SearchableEntityType, entityId: string): void {
  const parsed = entityRefSchema.safeParse({ entityType, entityId });
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid search index reference");
}

/**
 * Builds the SearchDocument for one entity, or null when it does not exist or must not be indexed (not PUBLISHED, a
 * draft copy, private/personal content, a hidden subject, ...).
 */
export async function documentFor(
  entityType: SearchableEntityType,
  id: string,
  client: DbClient = db,
): Promise<SearchDocumentInput | null> {
  assertEntityRef(entityType, id);
  const { documents } = await buildDocuments(client, entityType, { ids: [id], eligibleOnly: false });
  return documents.get(id) ?? null;
}

function rowValues(doc: SearchDocumentInput): Prisma.Sql {
  return Prisma.sql`(uuidv7(), ${doc.entityType}::"ContentEntityType", ${doc.entityId}::uuid, ${doc.title}::text,
    ${doc.subtitle}::text, ${doc.body}::text, ${doc.keywords}::text, ${doc.path}::text, ${doc.languageCode}::varchar(10),
    ${doc.accessTier}::"ContentAccessTier", 'PUBLISHED'::"ContentStatus", ${doc.examBoardIds}::uuid[],
    ${doc.qualificationIds}::uuid[], ${doc.levelIds}::uuid[], ${doc.subjectIds}::uuid[], ${doc.syllabusIds}::uuid[],
    ${doc.topicIds}::uuid[], ${Math.trunc(doc.rankBoost)}::int, ${doc.sourceUpdatedAt}::timestamptz, now(), now())`;
}

/**
 * Inserts or updates documents (one statement). Rows whose indexed columns are unchanged are left untouched.
 * Returns the number of rows inserted or changed. Accepts a transaction client so publish flows can index atomically.
 */
export async function upsertSearchDocuments(docs: readonly SearchDocumentInput[], client: DbClient = db): Promise<number> {
  const unique = new Map<string, SearchDocumentInput>();
  for (const doc of docs) unique.set(`${doc.entityType}:${doc.entityId}`, doc);
  if (unique.size === 0) return 0;
  const rows = [...unique.values()];
  if (rows.length > MAX_REINDEX_BATCH_SIZE) {
    let total = 0;
    for (let i = 0; i < rows.length; i += MAX_REINDEX_BATCH_SIZE) {
      total += await upsertSearchDocuments(rows.slice(i, i + MAX_REINDEX_BATCH_SIZE), client);
    }
    return total;
  }

  return client.$executeRaw`
    INSERT INTO "SearchDocument" ("id", "entityType", "entityId", "title", "subtitle", "body", "keywords", "path",
      "languageCode", "accessTier", "status", "examBoardIds", "qualificationIds", "levelIds", "subjectIds",
      "syllabusIds", "topicIds", "rankBoost", "sourceUpdatedAt", "createdAt", "updatedAt")
    VALUES ${Prisma.join(rows.map(rowValues))}
    ON CONFLICT ("entityType", "entityId") DO UPDATE SET
      "title" = EXCLUDED."title", "subtitle" = EXCLUDED."subtitle", "body" = EXCLUDED."body",
      "keywords" = EXCLUDED."keywords", "path" = EXCLUDED."path", "languageCode" = EXCLUDED."languageCode",
      "accessTier" = EXCLUDED."accessTier", "status" = EXCLUDED."status", "examBoardIds" = EXCLUDED."examBoardIds",
      "qualificationIds" = EXCLUDED."qualificationIds", "levelIds" = EXCLUDED."levelIds",
      "subjectIds" = EXCLUDED."subjectIds", "syllabusIds" = EXCLUDED."syllabusIds", "topicIds" = EXCLUDED."topicIds",
      "rankBoost" = EXCLUDED."rankBoost", "sourceUpdatedAt" = EXCLUDED."sourceUpdatedAt", "updatedAt" = now()
    WHERE ("SearchDocument"."title", "SearchDocument"."subtitle", "SearchDocument"."body", "SearchDocument"."keywords",
           "SearchDocument"."path", "SearchDocument"."languageCode", "SearchDocument"."accessTier",
           "SearchDocument"."status", "SearchDocument"."examBoardIds", "SearchDocument"."qualificationIds",
           "SearchDocument"."levelIds", "SearchDocument"."subjectIds", "SearchDocument"."syllabusIds",
           "SearchDocument"."topicIds", "SearchDocument"."rankBoost", "SearchDocument"."sourceUpdatedAt")
      IS DISTINCT FROM
          (EXCLUDED."title", EXCLUDED."subtitle", EXCLUDED."body", EXCLUDED."keywords", EXCLUDED."path",
           EXCLUDED."languageCode", EXCLUDED."accessTier", EXCLUDED."status", EXCLUDED."examBoardIds",
           EXCLUDED."qualificationIds", EXCLUDED."levelIds", EXCLUDED."subjectIds", EXCLUDED."syllabusIds",
           EXCLUDED."topicIds", EXCLUDED."rankBoost", EXCLUDED."sourceUpdatedAt")`;
}

/** Inserts or updates one document. */
export async function upsertSearchDocument(doc: SearchDocumentInput, client: DbClient = db): Promise<void> {
  await upsertSearchDocuments([doc], client);
}

/** Deletes the document of an entity (content archived, unpublished, deleted, made private). True if one existed. */
export async function removeSearchDocument(
  entityType: SearchableEntityType,
  entityId: string,
  client: DbClient = db,
): Promise<boolean> {
  assertEntityRef(entityType, entityId);
  const { count } = await client.searchDocument.deleteMany({ where: { entityType, entityId } });
  return count > 0;
}

async function removeSearchDocuments(
  entityType: SearchableEntityType,
  entityIds: readonly string[],
  client: DbClient,
): Promise<number> {
  if (entityIds.length === 0) return 0;
  const { count } = await client.searchDocument.deleteMany({ where: { entityType, entityId: { in: [...entityIds] } } });
  return count;
}

export type ReindexEntityResult = { action: "upserted"; document: SearchDocumentInput } | { action: "removed"; existed: boolean };

/** Rebuilds one entity's document: upserts it when indexable, deletes it otherwise. Idempotent. */
export async function reindexEntity(
  entityType: SearchableEntityType,
  entityId: string,
  client: DbClient = db,
): Promise<ReindexEntityResult> {
  const document = await documentFor(entityType, entityId, client);
  if (document) {
    await upsertSearchDocuments([document], client);
    return { action: "upserted", document };
  }
  return { action: "removed", existed: await removeSearchDocument(entityType, entityId, client) };
}

export interface ReindexTypeReport {
  /** Source rows examined in the forward pass. */
  scanned: number;
  /** Documents inserted or changed. */
  written: number;
  /** Documents deleted (ineligible sources found in the forward pass + stale documents found by the sweep). */
  removed: number;
}

export interface ReindexAllReport {
  types: Partial<Record<SearchableEntityType, ReindexTypeReport>>;
  durationMs: number;
  /** True when `signal` aborted the run before it finished. */
  aborted: boolean;
}

export interface ReindexAllOptions {
  batchSize?: number;
  /** Restrict to some entity types (default: all). */
  types?: readonly SearchableEntityType[];
  client?: PrismaClient;
  logger?: Logger;
  /** Stops between batches (worker shutdown). */
  signal?: AbortSignal;
  /**
   * Restrict BOTH passes to these entity ids (any type): the forward pass loads only these sources and the sweep only
   * re-checks documents of these entities. For tests and targeted repairs of a small set; omitted (the default, and
   * the job's behaviour) the whole index is rebuilt.
   */
  entityIds?: readonly string[];
}

/**
 * Rebuilds the whole index (or some types), streaming in keyset-paginated batches:
 * 1. forward pass: every potentially indexable source row (id order) is built and upserted; ineligible ones deleted;
 * 2. sweep pass: every existing document of the type is re-checked against its source, and documents whose source is
 *    gone or no longer qualifies are deleted.
 * Each batch commits on its own (no long transaction); re-running is cheap because unchanged rows are not rewritten.
 */
export async function reindexAll(options: ReindexAllOptions = {}): Promise<ReindexAllReport> {
  const batchSize = Math.min(Math.max(Math.trunc(options.batchSize ?? DEFAULT_REINDEX_BATCH_SIZE), 1), MAX_REINDEX_BATCH_SIZE);
  const client = options.client ?? db;
  const log = (options.logger ?? rootLogger).child({ job: "search.reindexAll" });
  const types = options.types ?? SEARCHABLE_ENTITY_TYPES;
  const scopedIds = options.entityIds === undefined ? undefined : [...new Set(options.entityIds)];
  const started = Date.now();
  const report: ReindexAllReport = { types: {}, durationMs: 0, aborted: false };

  outer: for (const entityType of types) {
    const stats: ReindexTypeReport = { scanned: 0, written: 0, removed: 0 };
    report.types[entityType] = stats;

    let afterId: string | undefined;
    for (;;) {
      if (options.signal?.aborted) {
        report.aborted = true;
        break outer;
      }
      const { loaded, documents } = await buildDocuments(client, entityType, {
        eligibleOnly: true,
        afterId,
        take: batchSize,
        ...(scopedIds ? { ids: scopedIds } : {}),
      });
      if (loaded.length === 0) break;
      const upserts: SearchDocumentInput[] = [];
      const removals: string[] = [];
      for (const [id, doc] of documents) {
        if (doc) upserts.push(doc);
        else removals.push(id);
      }
      stats.scanned += loaded.length;
      stats.written += await upsertSearchDocuments(upserts, client);
      stats.removed += await removeSearchDocuments(entityType, removals, client);
      afterId = loaded.at(-1)?.id;
      if (loaded.length < batchSize) break;
    }

    let afterDocumentId: string | undefined;
    for (;;) {
      if (options.signal?.aborted) {
        report.aborted = true;
        break outer;
      }
      const existing = await client.searchDocument.findMany({
        where: {
          entityType,
          ...(scopedIds ? { entityId: { in: scopedIds } } : {}),
          ...(afterDocumentId ? { id: { gt: afterDocumentId } } : {}),
        },
        select: { id: true, entityId: true },
        orderBy: { id: "asc" },
        take: batchSize,
      });
      if (existing.length === 0) break;
      const { documents } = await buildDocuments(client, entityType, {
        ids: existing.map((row) => row.entityId),
        eligibleOnly: false,
      });
      const stale = existing.filter((row) => !documents.get(row.entityId)).map((row) => row.entityId);
      stats.removed += await removeSearchDocuments(entityType, stale, client);
      afterDocumentId = existing.at(-1)?.id;
      if (existing.length < batchSize) break;
    }
    log.info("search reindex pass finished", { entityType, ...stats });
  }

  report.durationMs = Date.now() - started;
  return report;
}

// ---------------------------------------------------------------------------------------------------------------------
// Background jobs (registered by the worker; see the module report for wiring)
// ---------------------------------------------------------------------------------------------------------------------

/** Queue for search jobs (ARCHITECTURE §3.7). */
export const SEARCH_JOB_QUEUE = "search";

/** Dedupe key for `search.reindexEntity` jobs (ARCHITECTURE §3.7: `search:{type}:{id}`). */
export function searchIndexDedupeKey(entityType: SearchableEntityType, entityId: string): string {
  return `search:${entityType}:${entityId}`;
}

export const reindexEntityJobPayloadSchema = entityRefSchema;
export type ReindexEntityJobPayload = z.infer<typeof reindexEntityJobPayloadSchema>;

export const reindexAllJobPayloadSchema = z
  .object({
    batchSize: z.number().int().min(1).max(MAX_REINDEX_BATCH_SIZE).optional(),
    types: z.array(z.enum(SEARCHABLE_ENTITY_TYPES)).min(1).optional(),
  })
  .nullish();
export type ReindexAllJobPayload = z.infer<typeof reindexAllJobPayloadSchema>;

function parsePayload<T>(schema: z.ZodType<T>, payload: unknown, job: string): T {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) throw AppError.fromZod(parsed.error, `Invalid ${job} job payload`);
  return parsed.data;
}

/** Handler for `search.reindexEntity` (payload `{ entityType, entityId }`). Idempotent. */
export async function handleReindexEntityJob(payload: unknown): Promise<ReindexEntityResult> {
  const { entityType, entityId } = parsePayload(reindexEntityJobPayloadSchema, payload, "search.reindexEntity");
  return reindexEntity(entityType, entityId);
}

/** Handler for `search.reindexAll` (payload `{ batchSize?, types? }` or null). */
export async function handleReindexAllJob(payload: unknown, context: { signal?: AbortSignal } = {}): Promise<ReindexAllReport> {
  const parsed = parsePayload(reindexAllJobPayloadSchema, payload, "search.reindexAll");
  return reindexAll({ batchSize: parsed?.batchSize, types: parsed?.types, signal: context.signal });
}

/** Job name -> handler, for registration in src/worker (not done here: owned by another workstream). */
export const SEARCH_JOB_HANDLERS = {
  "search.reindexEntity": handleReindexEntityJob,
  "search.reindexAll": handleReindexAllJob,
} as const;
