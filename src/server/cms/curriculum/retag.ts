import "server-only";
import type { SyllabusStatus } from "@/generated/prisma/client";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { assertCurriculumDraft, assertCurriculumRead, type CurriculumActor } from "./access";
import { retagSchema } from "./schemas";
import { auditCurriculum, CURRICULUM_AUDIT, inTransaction, mapDbError, parseInput, readAll, readClient, type ServiceContext } from "./shared";
import type { DbClient } from "@/server/db";

/**
 * Copy / re-tag content into a new syllabus version (§26, ARCHITECTURE §4.3). Content is tagged to topic nodes through
 * join tables, and tags are editable curriculum metadata (no content revision): this tool follows the lineage of the
 * version's tree (`Topic.originTopicId`, `LearningObjective.originObjectiveId`, set when the version was cloned) and
 * ADDS the equivalent tags for the new version:
 *
 * - `QuestionTopic` (keeps the primary flag per version: one primary topic per question and version),
 * - `LessonTopic` and `FlashcardTopic` (platform flashcards only; added as secondary tags, because a lesson or card
 *   has one home topic overall),
 * - `QuestionObjective` / `LessonObjective` for objectives with lineage.
 *
 * Existing tags are never removed or changed, so students pinned to the old version keep exactly their content.
 * Idempotent: running it twice adds nothing the second time (`ON CONFLICT DO NOTHING`). Nodes without lineage (new
 * topics) are reported so editors can tag them by hand.
 */

export interface RetagCounts {
  questions: number;
  lessons: number;
  flashcards: number;
  questionObjectives: number;
  lessonObjectives: number;
}

export interface RetagPreview {
  target: { id: string; versionLabel: string; status: SyllabusStatus };
  /** The version the target was copied from (null: not a copy, nothing to carry over). */
  source: { id: string; versionLabel: string; status: SyllabusStatus } | null;
  /** Tags that would be added now. */
  toAdd: RetagCounts;
  /** Tags already carried over (present in the target for a lineage-mapped node). */
  alreadyTagged: RetagCounts;
  /** Topics of the source version that carry tags but have no equivalent in the target (tag these by hand). */
  unmapped: { id: string; code: string | null; name: string; tags: number }[];
  /** Topics in the target with lineage. */
  mappedTopics: number;
}

async function counts(client: DbClient, sourceId: string, targetId: string, missingOnly: boolean): Promise<RetagCounts> {
  const [row] = await client.$queryRaw<{ questions: bigint; lessons: bigint; flashcards: bigint; question_objectives: bigint; lesson_objectives: bigint }[]>`
    SELECT
      (SELECT count(*) FROM "QuestionTopic" qt
         JOIN "Topic" nt ON nt."originTopicId" = qt."topicId" AND nt."syllabusId" = ${targetId}::uuid
        WHERE qt."syllabusId" = ${sourceId}::uuid
          AND (EXISTS (SELECT 1 FROM "QuestionTopic" x WHERE x."questionId" = qt."questionId" AND x."topicId" = nt."id")) <> ${missingOnly}) AS questions,
      (SELECT count(*) FROM "LessonTopic" lt
         JOIN "Topic" ot ON ot."id" = lt."topicId" AND ot."syllabusId" = ${sourceId}::uuid
         JOIN "Topic" nt ON nt."originTopicId" = ot."id" AND nt."syllabusId" = ${targetId}::uuid
        WHERE (EXISTS (SELECT 1 FROM "LessonTopic" x WHERE x."lessonId" = lt."lessonId" AND x."topicId" = nt."id")) <> ${missingOnly}) AS lessons,
      (SELECT count(*) FROM "FlashcardTopic" ft
         JOIN "Flashcard" f ON f."id" = ft."flashcardId" AND f."ownerUserId" IS NULL
         JOIN "Topic" ot ON ot."id" = ft."topicId" AND ot."syllabusId" = ${sourceId}::uuid
         JOIN "Topic" nt ON nt."originTopicId" = ot."id" AND nt."syllabusId" = ${targetId}::uuid
        WHERE (EXISTS (SELECT 1 FROM "FlashcardTopic" x WHERE x."flashcardId" = ft."flashcardId" AND x."topicId" = nt."id")) <> ${missingOnly}) AS flashcards,
      (SELECT count(*) FROM "QuestionObjective" qo
         JOIN "LearningObjective" o ON o."id" = qo."objectiveId"
         JOIN "Topic" ot ON ot."id" = o."topicId" AND ot."syllabusId" = ${sourceId}::uuid
         JOIN "LearningObjective" nobj ON nobj."originObjectiveId" = o."id"
         JOIN "Topic" nt ON nt."id" = nobj."topicId" AND nt."syllabusId" = ${targetId}::uuid
        WHERE (EXISTS (SELECT 1 FROM "QuestionObjective" x WHERE x."questionId" = qo."questionId" AND x."objectiveId" = nobj."id")) <> ${missingOnly}) AS question_objectives,
      (SELECT count(*) FROM "LessonObjective" lo
         JOIN "LearningObjective" o ON o."id" = lo."objectiveId"
         JOIN "Topic" ot ON ot."id" = o."topicId" AND ot."syllabusId" = ${sourceId}::uuid
         JOIN "LearningObjective" nobj ON nobj."originObjectiveId" = o."id"
         JOIN "Topic" nt ON nt."id" = nobj."topicId" AND nt."syllabusId" = ${targetId}::uuid
        WHERE (EXISTS (SELECT 1 FROM "LessonObjective" x WHERE x."lessonId" = lo."lessonId" AND x."objectiveId" = nobj."id")) <> ${missingOnly}) AS lesson_objectives`;
  return {
    questions: Number(row?.questions ?? 0),
    lessons: Number(row?.lessons ?? 0),
    flashcards: Number(row?.flashcards ?? 0),
    questionObjectives: Number(row?.question_objectives ?? 0),
    lessonObjectives: Number(row?.lesson_objectives ?? 0),
  };
}

async function loadTarget(client: DbClient, syllabusId: string) {
  const target = await client.syllabus.findUnique({
    where: { id: syllabusId },
    select: { id: true, versionLabel: true, status: true, supersedes: { select: { id: true, versionLabel: true, status: true } } },
  });
  if (!target) throw AppError.notFound("Syllabus version not found.");
  return target;
}

/** What re-tagging would add, what is already carried over, and which tagged topics have no equivalent. */
export async function previewRetag(actor: CurriculumActor, syllabusId: string, context: ServiceContext = {}): Promise<RetagPreview> {
  assertCurriculumRead(actor);
  const client = readClient(context);
  const target = await loadTarget(client, syllabusId);
  const empty: RetagCounts = { questions: 0, lessons: 0, flashcards: 0, questionObjectives: 0, lessonObjectives: 0 };
  const { supersedes, ...targetRow } = target;
  if (!supersedes) return { target: targetRow, source: null, toAdd: empty, alreadyTagged: empty, unmapped: [], mappedTopics: 0 };

  const [toAdd, alreadyTagged, mappedTopics, unmappedRows] = await readAll(context, [
    () => counts(client, supersedes.id, syllabusId, true),
    () => counts(client, supersedes.id, syllabusId, false),
    () => client.topic.count({ where: { syllabusId, originTopicId: { not: null } } }),
    () => client.$queryRaw<{ id: string; code: string | null; name: string; tags: bigint }[]>`
      SELECT ot."id", ot."code", ot."name",
             (SELECT count(*) FROM "QuestionTopic" q WHERE q."topicId" = ot."id")
           + (SELECT count(*) FROM "LessonTopic" l WHERE l."topicId" = ot."id")
           + (SELECT count(*) FROM "FlashcardTopic" f JOIN "Flashcard" c ON c."id" = f."flashcardId" AND c."ownerUserId" IS NULL WHERE f."topicId" = ot."id") AS tags
        FROM "Topic" ot
       WHERE ot."syllabusId" = ${supersedes.id}::uuid
         AND NOT EXISTS (SELECT 1 FROM "Topic" nt WHERE nt."originTopicId" = ot."id" AND nt."syllabusId" = ${syllabusId}::uuid)
       ORDER BY ot."path"
       LIMIT 500`,
  ]);
  return {
    target: targetRow,
    source: supersedes,
    toAdd,
    alreadyTagged,
    unmapped: unmappedRows.map((row) => ({ ...row, tags: Number(row.tags) })).filter((row) => row.tags > 0),
    mappedTopics,
  };
}

async function insertTags(tx: Tx, sourceId: string, targetId: string, input: { questions: boolean; lessons: boolean; flashcards: boolean; objectives: boolean }): Promise<RetagCounts> {
  const added: RetagCounts = { questions: 0, lessons: 0, flashcards: 0, questionObjectives: 0, lessonObjectives: 0 };
  if (input.questions) {
    // Primary stays primary for the new version unless the question already has a primary tag there (partial unique).
    added.questions = await tx.$executeRaw`
      INSERT INTO "QuestionTopic" ("questionId", "topicId", "syllabusId", "subjectId", "isPrimary", "createdAt")
      SELECT qt."questionId", nt."id", nt."syllabusId", qt."subjectId",
             qt."isPrimary" AND NOT EXISTS (
               SELECT 1 FROM "QuestionTopic" x WHERE x."questionId" = qt."questionId" AND x."syllabusId" = ${targetId}::uuid AND x."isPrimary"),
             now()
        FROM "QuestionTopic" qt
        JOIN "Topic" nt ON nt."originTopicId" = qt."topicId" AND nt."syllabusId" = ${targetId}::uuid
       WHERE qt."syllabusId" = ${sourceId}::uuid
      ON CONFLICT DO NOTHING`;
  }
  if (input.lessons) {
    added.lessons = await tx.$executeRaw`
      INSERT INTO "LessonTopic" ("lessonId", "topicId", "isPrimary", "sortOrder", "createdAt")
      SELECT lt."lessonId", nt."id", false, lt."sortOrder", now()
        FROM "LessonTopic" lt
        JOIN "Topic" ot ON ot."id" = lt."topicId" AND ot."syllabusId" = ${sourceId}::uuid
        JOIN "Topic" nt ON nt."originTopicId" = ot."id" AND nt."syllabusId" = ${targetId}::uuid
      ON CONFLICT DO NOTHING`;
  }
  if (input.flashcards) {
    added.flashcards = await tx.$executeRaw`
      INSERT INTO "FlashcardTopic" ("flashcardId", "topicId", "isPrimary", "sortOrder", "createdAt")
      SELECT ft."flashcardId", nt."id", false, ft."sortOrder", now()
        FROM "FlashcardTopic" ft
        JOIN "Flashcard" f ON f."id" = ft."flashcardId" AND f."ownerUserId" IS NULL
        JOIN "Topic" ot ON ot."id" = ft."topicId" AND ot."syllabusId" = ${sourceId}::uuid
        JOIN "Topic" nt ON nt."originTopicId" = ot."id" AND nt."syllabusId" = ${targetId}::uuid
      ON CONFLICT DO NOTHING`;
  }
  if (input.objectives) {
    added.questionObjectives = await tx.$executeRaw`
      INSERT INTO "QuestionObjective" ("questionId", "objectiveId")
      SELECT qo."questionId", nobj."id"
        FROM "QuestionObjective" qo
        JOIN "LearningObjective" o ON o."id" = qo."objectiveId"
        JOIN "Topic" ot ON ot."id" = o."topicId" AND ot."syllabusId" = ${sourceId}::uuid
        JOIN "LearningObjective" nobj ON nobj."originObjectiveId" = o."id"
        JOIN "Topic" nt ON nt."id" = nobj."topicId" AND nt."syllabusId" = ${targetId}::uuid
      ON CONFLICT DO NOTHING`;
    added.lessonObjectives = await tx.$executeRaw`
      INSERT INTO "LessonObjective" ("lessonId", "objectiveId")
      SELECT lo."lessonId", nobj."id"
        FROM "LessonObjective" lo
        JOIN "LearningObjective" o ON o."id" = lo."objectiveId"
        JOIN "Topic" ot ON ot."id" = o."topicId" AND ot."syllabusId" = ${sourceId}::uuid
        JOIN "LearningObjective" nobj ON nobj."originObjectiveId" = o."id"
        JOIN "Topic" nt ON nt."id" = nobj."topicId" AND nt."syllabusId" = ${targetId}::uuid
      ON CONFLICT DO NOTHING`;
  }
  return added;
}

/**
 * Adds the lineage-mapped tags of the version this one was copied from (see module docs). Works on DRAFT and published
 * targets (tags are metadata); students only see a version's content once it is published and pinned.
 */
export async function applyRetag(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<RetagCounts & { sourceId: string }> {
  assertCurriculumDraft(actor);
  const input = parseInput(retagSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const target = await loadTarget(tx, input.syllabusId);
      if (!target.supersedes) {
        throw AppError.conflict("This version was not copied from another version, so there is nothing to carry over. Tag content to its topics directly.");
      }
      const added = await insertTags(tx, target.supersedes.id, target.id, input);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.syllabus.retag",
        entityType: "Syllabus",
        entityId: target.id,
        metadata: { sourceId: target.supersedes.id, ...added },
      });
      return { ...added, sourceId: target.supersedes.id };
    });
  } catch (error) {
    mapDbError(error);
  }
}
