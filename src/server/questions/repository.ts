import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { CognitiveSkill, Prisma, type ContentAccessTier } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import type { CandidateQuestion } from "@/server/adaptive/core";
import { AppError } from "@/server/lib/errors";
import { QUESTION_TYPES, type QuestionOptionRecord, type QuestionRecord, type QuestionType } from "@/lib/questions";

/**
 * Question-bank reads for attempts and practice selection (§9, §10, §11). Read-only; no authorization here — callers
 * (practice / exams services) authorize the actor and pass the tenancy they are allowed to see.
 *
 * Visibility rules applied to every read:
 * - students only ever get PUBLISHED, live (not a draft copy) ROOT questions (parts are loaded with their root);
 * - tenancy (§22, ARCHITECTURE §4.4): platform-bank questions always; school / tutor questions only for the
 *   `schoolIds` / `ownerUserIds` the caller passes (default: platform only — secure by default);
 * - parts: every non-ARCHIVED part of the live root (the publish merge mirrors status onto parts and archives or
 *   deletes removed ones), ordered by partOrder.
 */

/** Private pools a caller may include besides the platform bank. */
export interface QuestionTenancy {
  schoolIds?: readonly string[];
  ownerUserIds?: readonly string[];
}

export interface AttemptQuestionPart extends QuestionRecord {
  difficulty: number;
  partLabel: string | null;
  partOrder: number;
  hints: string[];
  options: QuestionOptionRecord[];
  parts: AttemptQuestionPart[];
}

/** A question as needed to run an attempt: render (via `toStudentView`), mark (`markQuestion`) and record. */
export interface AttemptQuestion extends QuestionRecord {
  /** Current ContentRevision number: store it as QuestionAttempt.questionRevision. */
  revision: number;
  subjectId: string;
  difficulty: number;
  accessTier: ContentAccessTier;
  isExamStyle: boolean;
  cognitiveSkill: CognitiveSkill | null;
  schoolId: string | null;
  ownerUserId: string | null;
  hints: string[];
  options: QuestionOptionRecord[];
  parts: AttemptQuestionPart[];
  /**
   * Topic for QuestionAttempt.topicId: the question's primary tag in `syllabusId` (falling back to any tag in that
   * version), or — without a syllabus — its most recent primary tag. Null when the question is untagged.
   */
  primaryTopicId: string | null;
}

const MAX_ATTEMPT_QUESTIONS = 500;
const MAX_POOL = 2_000;

const uuid = z.uuid();
const tenancySchema = z
  .strictObject({
    schoolIds: z.array(uuid).max(50).optional(),
    ownerUserIds: z.array(uuid).max(50).optional(),
  })
  .optional();

function parseOrThrow<T>(schema: z.ZodType<T>, value: unknown, message: string): T {
  const result = schema.safeParse(value);
  if (!result.success) throw AppError.fromZod(result.error, message);
  return result.data;
}

function tenancyWhere(tenancy: QuestionTenancy | undefined): Prisma.QuestionWhereInput {
  const or: Prisma.QuestionWhereInput[] = [{ schoolId: null, ownerUserId: null }];
  if (tenancy?.schoolIds?.length) or.push({ schoolId: { in: [...tenancy.schoolIds] } });
  if (tenancy?.ownerUserIds?.length) or.push({ ownerUserId: { in: [...tenancy.ownerUserIds] } });
  return { OR: or };
}

const OPTION_SELECT = { key: true, content: true, isCorrect: true, rationale: true, mediaAssetId: true, sortOrder: true } satisfies Prisma.QuestionOptionSelect;
const OPTION_ORDER: Prisma.QuestionOptionOrderByWithRelationInput[] = [{ sortOrder: "asc" }, { key: "asc" }];
const PART_ORDER: Prisma.QuestionOrderByWithRelationInput[] = [{ partOrder: "asc" }, { id: "asc" }];
const LIVE_PARTS: Prisma.QuestionWhereInput = { status: { not: "ARCHIVED" } };

const CONTENT_SELECT = {
  id: true,
  type: true,
  markingMode: true,
  stem: true,
  payload: true,
  answerSpec: true,
  explanation: true,
  workedSolution: true,
  hints: true,
  conceptSummary: true,
  relatedLessonId: true,
  difficulty: true,
  marks: true,
  estimatedSeconds: true,
  calculatorAllowed: true,
  renderedHtml: true,
  partLabel: true,
  partOrder: true,
  options: { select: OPTION_SELECT, orderBy: OPTION_ORDER },
} satisfies Prisma.QuestionSelect;

const ATTEMPT_SELECT = {
  ...CONTENT_SELECT,
  revision: true,
  subjectId: true,
  accessTier: true,
  isExamStyle: true,
  cognitiveSkill: true,
  schoolId: true,
  ownerUserId: true,
  parts: {
    where: LIVE_PARTS,
    orderBy: PART_ORDER,
    select: { ...CONTENT_SELECT, parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: CONTENT_SELECT } },
  },
} satisfies Prisma.QuestionSelect;

type ContentRow = Prisma.QuestionGetPayload<{ select: typeof CONTENT_SELECT }> & { parts?: ContentRow[] };

function toPart(row: ContentRow): AttemptQuestionPart {
  return {
    id: row.id,
    type: row.type,
    markingMode: row.markingMode,
    stem: row.stem,
    payload: row.payload,
    answerSpec: row.answerSpec,
    marks: row.marks,
    difficulty: row.difficulty,
    partLabel: row.partLabel,
    partOrder: row.partOrder,
    explanation: row.explanation,
    workedSolution: row.workedSolution,
    hints: row.hints,
    conceptSummary: row.conceptSummary,
    relatedLessonId: row.relatedLessonId,
    calculatorAllowed: row.calculatorAllowed,
    estimatedSeconds: row.estimatedSeconds,
    renderedHtml: row.renderedHtml,
    options: row.options.map((o) => ({ ...o })),
    parts: (row.parts ?? []).map(toPart),
  };
}

export interface GetQuestionsForAttemptOptions {
  client?: DbClient;
  /** Private pools the caller may use (default: platform bank only). */
  tenancy?: QuestionTenancy;
  /** The student's pinned syllabus version, to resolve `primaryTopicId`. */
  syllabusId?: string;
}

/**
 * Loads PUBLISHED root questions (with options, parts and current revision) in the order of `ids`. Ids that are not
 * visible (unknown, unpublished, a part, a draft copy, another tenant's) are silently omitted — compare lengths to
 * detect them. At most 500 ids per call.
 */
export async function getQuestionsForAttempt(ids: readonly string[], options: GetQuestionsForAttemptOptions = {}): Promise<AttemptQuestion[]> {
  const requested = parseOrThrow(z.array(uuid).max(MAX_ATTEMPT_QUESTIONS), [...ids], "Invalid question ids.");
  const tenancy = parseOrThrow(tenancySchema, options.tenancy, "Invalid tenancy.");
  const syllabusId = options.syllabusId === undefined ? undefined : parseOrThrow(uuid, options.syllabusId, "Invalid syllabus id.");
  const unique = [...new Set(requested)];
  if (unique.length === 0) return [];
  const client = options.client ?? db;

  const rows = await client.question.findMany({
    where: { id: { in: unique }, status: "PUBLISHED", parentId: null, draftOfId: null, ...tenancyWhere(tenancy) },
    select: ATTEMPT_SELECT,
  });
  if (rows.length === 0) return [];

  const tags = await client.questionTopic.findMany({
    where: { questionId: { in: rows.map((r) => r.id) }, ...(syllabusId ? { syllabusId } : { isPrimary: true }) },
    select: { questionId: true, topicId: true },
    orderBy: [{ isPrimary: "desc" }, { createdAt: "desc" }, { topicId: "asc" }],
  });
  const topicByQuestion = new Map<string, string>();
  for (const tag of tags) if (!topicByQuestion.has(tag.questionId)) topicByQuestion.set(tag.questionId, tag.topicId);

  const byId = new Map(rows.map((row) => [row.id, row]));
  const out: AttemptQuestion[] = [];
  for (const id of unique) {
    const row = byId.get(id);
    if (!row) continue;
    out.push({
      ...toPart(row as ContentRow),
      revision: row.revision,
      subjectId: row.subjectId,
      accessTier: row.accessTier,
      isExamStyle: row.isExamStyle,
      cognitiveSkill: row.cognitiveSkill,
      schoolId: row.schoolId,
      ownerUserId: row.ownerUserId,
      primaryTopicId: topicByQuestion.get(id) ?? null,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// Candidate pool for adaptive selection
// ---------------------------------------------------------------------------------------------------------------

const ACCESS_TIERS_UP_TO: Readonly<Record<ContentAccessTier, ContentAccessTier[]>> = {
  PUBLIC: ["PUBLIC"],
  FREE: ["PUBLIC", "FREE"],
  PREMIUM: ["PUBLIC", "FREE", "PREMIUM"],
};

const candidatePoolSchema = z.strictObject({
  subjectId: uuid,
  syllabusId: uuid.optional(),
  topicIds: z.array(uuid).max(500).optional(),
  difficultyRange: z
    .strictObject({ min: z.int().min(1).max(5), max: z.int().min(1).max(5) })
    .refine((r) => r.min <= r.max, "min must not exceed max.")
    .optional(),
  types: z.array(z.enum(QUESTION_TYPES as [QuestionType, ...QuestionType[]])).max(QUESTION_TYPES.length).optional(),
  marks: z.int().min(1).max(1_000).optional(),
  cognitiveSkill: z.enum(CognitiveSkill).optional(),
  objectiveIds: z.array(uuid).max(500).optional(),
  examStyleOnly: z.boolean().optional(),
  excludeIds: z.array(uuid).max(5_000).optional(),
  limit: z.int().min(1).max(MAX_POOL),
  accessTier: z.enum(["PUBLIC", "FREE", "PREMIUM"]).optional(),
  userId: uuid.optional(),
  tenancy: tenancySchema,
  seed: z.string().min(1).max(200).optional(),
});

export interface CandidatePoolInput {
  subjectId: string;
  /** The student's pinned syllabus version (strongly recommended: topics and mastery are per version). */
  syllabusId?: string;
  /** Restrict to these topics (tags on exactly these topic ids; expand subtrees before calling). */
  topicIds?: readonly string[];
  /** Inclusive difficulty band (1–5). */
  difficultyRange?: { min: number; max: number };
  types?: readonly QuestionType[];
  /** Only questions worth exactly this many marks (assessment blueprint `marksPerQuestion`). */
  marks?: number;
  /** Only questions testing this skill (blueprint `cognitiveSkill`). */
  cognitiveSkill?: CognitiveSkill;
  /** Only questions tagged with at least one of these learning objectives (blueprint `objectiveId`). */
  objectiveIds?: readonly string[];
  /** Only exam-style questions (blueprint `examStyleOnly`, mock exams). */
  examStyleOnly?: boolean;
  /** Questions to leave out (e.g. already in this session). */
  excludeIds?: readonly string[];
  /** Maximum candidates returned (1–2000). */
  limit: number;
  /** Highest access tier the student may use: PUBLIC → PUBLIC; FREE → PUBLIC + FREE; PREMIUM → all. Default: all. */
  accessTier?: ContentAccessTier;
  /** When set, `timesSeen` / `lastSeenAt` are filled from this student's attempts. */
  userId?: string;
  tenancy?: QuestionTenancy;
  /** Seed of the pseudo-random sample taken when more than `limit` questions match (default: random). */
  seed?: string;
}

interface PoolRow {
  id: string;
  topicId: string;
  difficulty: number;
  marks: number;
  type: string;
  isExamStyle: boolean;
}

/**
 * The lean candidate list consumed by `selectQuestions` (src/server/adaptive/core.ts): PUBLISHED live root questions
 * tagged in the subject (and syllabus version / topics when given), filtered by difficulty, type, access tier and
 * tenancy. Each question appears once, under its primary tag when that tag qualifies, else under its first matching
 * tag. When more than `limit` match, a pseudo-random sample (seeded) is returned so large pools still vary.
 * Uses the partial index QuestionTopic_platform_pool_idx (syllabusId, topicId) WHERE "isPlatform".
 */
export async function candidatePool(input: CandidatePoolInput, client: DbClient = db): Promise<CandidateQuestion[]> {
  const p = parseOrThrow(candidatePoolSchema, input, "Invalid practice pool request.");
  const conditions: Prisma.Sql[] = [
    Prisma.sql`qt."subjectId" = ${p.subjectId}::uuid`,
    Prisma.sql`q."status" = 'PUBLISHED'`,
    Prisma.sql`q."parentId" IS NULL`,
    Prisma.sql`q."draftOfId" IS NULL`,
  ];
  if (p.syllabusId) conditions.push(Prisma.sql`qt."syllabusId" = ${p.syllabusId}::uuid`);
  const schoolIds = p.tenancy?.schoolIds ?? [];
  const ownerIds = p.tenancy?.ownerUserIds ?? [];
  if (schoolIds.length > 0 || ownerIds.length > 0) {
    conditions.push(
      Prisma.sql`(qt."isPlatform" OR q."schoolId" = ANY(${schoolIds}::uuid[]) OR q."ownerUserId" = ANY(${ownerIds}::uuid[]))`,
    );
  } else {
    conditions.push(Prisma.sql`qt."isPlatform"`);
  }
  if (p.topicIds !== undefined) {
    if (p.topicIds.length === 0) return [];
    conditions.push(Prisma.sql`qt."topicId" = ANY(${p.topicIds}::uuid[])`);
  }
  if (p.difficultyRange) conditions.push(Prisma.sql`q."difficulty" BETWEEN ${p.difficultyRange.min} AND ${p.difficultyRange.max}`);
  if (p.types !== undefined) {
    if (p.types.length === 0) return [];
    conditions.push(Prisma.sql`q."type"::text = ANY(${p.types}::text[])`);
  }
  if (p.marks !== undefined) conditions.push(Prisma.sql`q."marks" = ${p.marks}`);
  if (p.cognitiveSkill) conditions.push(Prisma.sql`q."cognitiveSkill"::text = ${p.cognitiveSkill}`);
  if (p.objectiveIds !== undefined) {
    if (p.objectiveIds.length === 0) return [];
    // QuestionObjective PK (questionId, objectiveId): one index probe per candidate.
    conditions.push(
      Prisma.sql`EXISTS (SELECT 1 FROM "QuestionObjective" qo WHERE qo."questionId" = q."id" AND qo."objectiveId" = ANY(${p.objectiveIds}::uuid[]))`,
    );
  }
  if (p.examStyleOnly) conditions.push(Prisma.sql`q."isExamStyle"`);
  if (p.accessTier) conditions.push(Prisma.sql`q."accessTier"::text = ANY(${ACCESS_TIERS_UP_TO[p.accessTier]}::text[])`);
  if (p.excludeIds?.length) conditions.push(Prisma.sql`NOT (q."id" = ANY(${p.excludeIds}::uuid[]))`);
  const seed = p.seed ?? randomUUID();

  const rows = await client.$queryRaw<PoolRow[]>`
    SELECT c."id"::text AS "id", c."topicId"::text AS "topicId", c."difficulty", c."marks", c."type", c."isExamStyle"
    FROM (
      SELECT DISTINCT ON (q."id") q."id", qt."topicId", q."difficulty", q."marks", q."type"::text AS "type", q."isExamStyle"
      FROM "QuestionTopic" qt
      JOIN "Question" q ON q."id" = qt."questionId"
      WHERE ${Prisma.join(conditions, " AND ")}
      ORDER BY q."id", qt."isPrimary" DESC, qt."createdAt" DESC, qt."topicId"
    ) c
    ORDER BY md5(c."id"::text || ${seed}), c."id"
    LIMIT ${p.limit}`;
  if (rows.length === 0) return [];

  const seen = new Map<string, { timesSeen: number; lastSeenAt: Date }>();
  if (p.userId) {
    const questionIds = rows.map((r) => r.id);
    const topicIds = [...new Set(rows.map((r) => r.topicId))];
    // Index QuestionAttempt (userId, topicId, createdAt): bounded by this student's own history.
    const history = await client.$queryRaw<{ questionId: string; timesSeen: number; lastSeenAt: Date }[]>`
      SELECT qa."questionId"::text AS "questionId", count(*)::int AS "timesSeen", max(qa."createdAt") AS "lastSeenAt"
      FROM "QuestionAttempt" qa
      WHERE qa."userId" = ${p.userId}::uuid
        AND qa."topicId" = ANY(${topicIds}::uuid[])
        AND qa."questionId" = ANY(${questionIds}::uuid[])
      GROUP BY qa."questionId"`;
    for (const h of history) seen.set(h.questionId, { timesSeen: h.timesSeen, lastSeenAt: h.lastSeenAt });
  }

  return rows.map((r) => {
    const history = seen.get(r.id);
    return {
      id: r.id,
      topicId: r.topicId,
      difficulty: r.difficulty,
      marks: r.marks,
      type: r.type,
      isExamLevel: r.isExamStyle,
      timesSeen: history?.timesSeen ?? 0,
      lastSeenAt: history?.lastSeenAt ?? null,
    };
  });
}
