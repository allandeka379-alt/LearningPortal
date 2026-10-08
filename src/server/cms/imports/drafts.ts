import "server-only";
import { randomUUID } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import type { ContentAccessTier, FlashcardType, LessonKind, SyllabusStatus } from "@/generated/prisma/client";
import { dedupeSlug, slugify as topicSlugify } from "@/server/cms/curriculum/core";
import { nextFreeSlug } from "@/server/cms/lessons/core";
import { syncMediaUsage, assetReferences } from "@/server/cms/media/usage";
import { normaliseTopicTags } from "@/server/cms/questions/core";
import type { QuestionEditorData } from "@/server/cms/questions/schemas";
import { refreshQuestionDerived } from "@/server/cms/questions/service";
import { FLASHCARD_PREVIEW_OPTIONS } from "@/server/cms/review/checks";
import { contentHash, PIPELINE_VERSION, renderContent, renderInline, type AssetResolver } from "@/server/content/render";
import { LESSON_RENDER_OPTIONS, loadAssetResolver, renderFlashcardHtml, toRenderedJson } from "@/server/content/service";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { REVIEW_BLOCKING_WARNINGS } from "@/server/cms/review/provenance";
import type { MarkdownMode, PreparedTopic } from "./rows";

/**
 * Writers for machine-created DRAFT content — bulk imports (§25) and AI drafts (§41). Every row is inserted as DRAFT
 * (the database refuses anything else for rows carrying `importId` or `aiGenerated`), with its origin recorded
 * (`importId`, or `generationJobId` + `aiGenerated = true`), the write-time render cache filled exactly like the CMS
 * editors fill it, and `ContentMediaUsage` kept current. Nothing here approves or publishes: that only ever happens
 * through the review workflow (src/server/content/publish.ts) with a human approver.
 */

export interface DraftOrigin {
  /** Recorded as the author: under four-eyes this person cannot approve the item. */
  createdById: string;
  importId?: string | null;
  /** AI generation job: the rows are `aiGenerated` (permanently). */
  generationJobId?: string | null;
}

export interface DraftProvenance {
  sourceId: string | null;
  author: string | null;
  licenceCode: string | null;
  attribution: string | null;
  sourceUrl: string | null;
}

function originColumns(origin: DraftOrigin) {
  return {
    status: "DRAFT" as const,
    createdById: origin.createdById,
    importId: origin.importId ?? null,
    generationJobId: origin.generationJobId ?? null,
    aiGenerated: Boolean(origin.generationJobId),
  };
}

function provenanceColumns(provenance: DraftProvenance) {
  return {
    sourceId: provenance.sourceId,
    author: provenance.author,
    // Machine-created content never asserts copyright: a human clears it at review (§27).
    copyrightStatus: "UNVERIFIED" as const,
    licenceCode: provenance.licenceCode,
    attribution: provenance.attribution,
    sourceUrl: provenance.sourceUrl,
  };
}

const jsonValue = (value: unknown): Prisma.InputJsonValue | typeof Prisma.DbNull =>
  value === null || value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue);

/** Fresh UUIDv7 ids from Postgres 18 (same generator as the column defaults), so rows can be rendered before insert. */
export async function newIds(tx: Tx, count: number): Promise<string[]> {
  if (count === 0) return [];
  const rows = await tx.$queryRaw<{ id: string }[]>`SELECT uuidv7()::text AS "id" FROM generate_series(1, ${count}::int)`;
  return rows.map((row) => row.id);
}

// =====================================================================================================================
// Markdown checks (shared by the import dry run and AI output validation)
// =====================================================================================================================

/** Blocking render problems of a Markdown field: invalid LaTeX, unknown blocks, broken or undescribed images. */
export function blockingMarkdownProblems(source: string, mode: MarkdownMode, resolveAsset: AssetResolver): string[] {
  const rendered =
    mode === "inline"
      ? renderInline(source, { resolveAsset })
      : renderContent(source, { ...(mode === "lesson" ? LESSON_RENDER_OPTIONS : mode === "card" ? FLASHCARD_PREVIEW_OPTIONS : { baseHeadingLevel: 3 }), resolveAsset });
  return rendered.warnings
    .filter((warning) => REVIEW_BLOCKING_WARNINGS.has(warning.code))
    .map((warning) => (warning.line === undefined ? warning.message : `Line ${warning.line}: ${warning.message}`));
}

/** A markdown checker with every `asset:` image referenced anywhere in `sources` resolved in one query. */
export async function markdownChecker(sources: readonly string[], client: DbClient): Promise<(source: string, mode: MarkdownMode) => string[]> {
  const resolveAsset = await loadAssetResolver(sources, client);
  return (source, mode) => blockingMarkdownProblems(source, mode, resolveAsset);
}

// =====================================================================================================================
// Questions
// =====================================================================================================================

export type TopicSyllabusMap = ReadonlyMap<string, { syllabusId: string; subjectId: string }>;

/** Syllabus / subject of the given topics (QuestionTopic denormalises both), in one query. */
export async function topicSyllabusMap(client: DbClient, topicIds: readonly string[]): Promise<Map<string, { syllabusId: string; subjectId: string }>> {
  const ids = [...new Set(topicIds)];
  if (ids.length === 0) return new Map();
  const rows = await client.topic.findMany({ where: { id: { in: ids } }, select: { id: true, syllabusId: true, syllabus: { select: { subjectId: true } } } });
  return new Map(rows.map((row) => [row.id, { syllabusId: row.syllabusId, subjectId: row.syllabus.subjectId }]));
}

type Doc = QuestionEditorData;
type PartData = Doc["parts"][number] | Doc["parts"][number]["parts"][number];

function partColumns(part: PartData, index: number) {
  return {
    type: part.type,
    markingMode: part.markingMode,
    stem: part.stem,
    payload: jsonValue(part.payload),
    answerSpec: jsonValue(part.answerSpec),
    marks: part.marks,
    partLabel: part.partLabel,
    partOrder: index,
    explanation: part.explanation,
    workedSolution: part.workedSolution,
    hints: part.hints,
  };
}

async function writeOptions(tx: Tx, questionId: string, options: Doc["options"]): Promise<void> {
  if (options.length === 0) return;
  await tx.questionOption.createMany({
    data: options.map((option, index) => ({
      questionId,
      key: option.key,
      content: option.content,
      isCorrect: option.isCorrect,
      rationale: option.rationale,
      mediaAssetId: option.mediaAssetId ?? null,
      sortOrder: index,
    })),
  });
}

/**
 * Inserts one DRAFT platform question (root, options, structured parts, topic tags, objectives) from a validated
 * question-editor document, then fills `renderedHtml` and `ContentMediaUsage` like the question editor does.
 */
export async function insertQuestionDraft(
  tx: Tx,
  doc: Doc,
  origin: DraftOrigin,
  options: { externalRef?: string | null; topics: TopicSyllabusMap },
): Promise<string> {
  const inherited = {
    subjectId: doc.subjectId,
    difficulty: doc.difficulty,
    accessTier: doc.accessTier,
    languageCode: doc.languageCode,
    sourceId: doc.sourceId,
    author: doc.author,
    copyrightStatus: doc.copyrightStatus,
    licenceCode: doc.licenceCode,
    attribution: doc.attribution,
    sourceUrl: doc.sourceUrl,
    publicationDate: doc.publicationDate ? new Date(`${doc.publicationDate}T00:00:00Z`) : null,
    ...originColumns(origin),
  };
  const root = await tx.question.create({
    data: {
      ...inherited,
      type: doc.type,
      markingMode: doc.markingMode,
      stem: doc.stem,
      payload: jsonValue(doc.payload),
      answerSpec: jsonValue(doc.answerSpec),
      marks: doc.marks,
      explanation: doc.explanation,
      workedSolution: doc.workedSolution,
      conceptSummary: doc.conceptSummary,
      hints: doc.hints,
      relatedLessonId: doc.relatedLessonId,
      estimatedSeconds: doc.estimatedSeconds,
      year: doc.year,
      paperLabel: doc.paperLabel,
      cognitiveSkill: doc.cognitiveSkill,
      isExamStyle: doc.isExamStyle,
      isDailyEligible: doc.isDailyEligible,
      calculatorAllowed: doc.calculatorAllowed,
      externalRef: options.externalRef ?? null,
    },
    select: { id: true },
  });
  await writeOptions(tx, root.id, doc.options);
  for (const [index, part] of doc.parts.entries()) {
    const created = await tx.question.create({ data: { ...partColumns(part, index), ...inherited, parentId: root.id }, select: { id: true } });
    await writeOptions(tx, created.id, part.options);
    for (const [subIndex, sub] of part.parts.entries()) {
      const subCreated = await tx.question.create({ data: { ...partColumns(sub, subIndex), ...inherited, parentId: created.id }, select: { id: true } });
      await writeOptions(tx, subCreated.id, sub.options);
    }
  }
  const tags = normaliseTopicTags(doc.topics, (topicId) => options.topics.get(topicId)?.syllabusId);
  if (tags.length > 0) {
    await tx.questionTopic.createMany({
      data: tags.map((tag) => ({
        questionId: root.id,
        topicId: tag.topicId,
        syllabusId: tag.syllabusId,
        subjectId: options.topics.get(tag.topicId)?.subjectId ?? doc.subjectId,
        isPrimary: tag.isPrimary,
      })),
    });
  }
  if (doc.objectiveIds.length > 0) {
    await tx.questionObjective.createMany({ data: [...new Set(doc.objectiveIds)].map((objectiveId) => ({ questionId: root.id, objectiveId })), skipDuplicates: true });
  }
  await refreshQuestionDerived(tx, root.id);
  return root.id;
}

// =====================================================================================================================
// Flashcards
// =====================================================================================================================

export interface FlashcardDraftInput {
  subjectId: string;
  cardType: FlashcardType;
  front: string;
  back: string;
  notes: string | null;
  accessTier: ContentAccessTier;
  languageCode: string;
  topicId: string | null;
  externalRef?: string | null;
}

/** Inserts DRAFT platform flashcards in one statement (+ primary topic tags and media usage). Returns ids in order. */
export async function insertFlashcardDrafts(tx: Tx, cards: readonly FlashcardDraftInput[], origin: DraftOrigin, provenance: DraftProvenance): Promise<string[]> {
  if (cards.length === 0) return [];
  const ids = await newIds(tx, cards.length);
  const resolveAsset = await loadAssetResolver(cards.flatMap((card) => [card.front, card.back, card.notes]), tx);
  await tx.flashcard.createMany({
    data: cards.map((card, index) => {
      const id = ids[index] as string;
      return {
        id,
        subjectId: card.subjectId,
        cardType: card.cardType,
        front: card.front,
        back: card.back,
        notes: card.notes,
        accessTier: card.accessTier,
        languageCode: card.languageCode,
        externalRef: card.externalRef ?? null,
        renderedHtml: toRenderedJson(renderFlashcardHtml({ id, front: card.front, back: card.back, notes: card.notes }, resolveAsset)),
        renderVersion: PIPELINE_VERSION,
        ...provenanceColumns(provenance),
        ...originColumns(origin),
      };
    }),
  });
  const tagged = cards.map((card, index) => ({ flashcardId: ids[index] as string, topicId: card.topicId })).filter((t): t is { flashcardId: string; topicId: string } => t.topicId !== null);
  if (tagged.length > 0) await tx.flashcardTopic.createMany({ data: tagged.map((tag, index) => ({ ...tag, isPrimary: true, sortOrder: index })) });
  const refs = cards.flatMap((card, index) => assetReferences({ front: card.front, back: card.back, notes: card.notes }).map((ref) => ({ ...ref, entityId: ids[index] as string })));
  if (refs.length > 0) {
    const known = new Set((await tx.mediaAsset.findMany({ where: { id: { in: [...new Set(refs.map((r) => r.mediaAssetId))] } }, select: { id: true } })).map((r) => r.id));
    const rows = refs.filter((ref) => known.has(ref.mediaAssetId)).map((ref) => ({ entityType: "FLASHCARD" as const, ...ref }));
    if (rows.length > 0) await tx.contentMediaUsage.createMany({ data: rows, skipDuplicates: true });
  }
  return ids;
}

// =====================================================================================================================
// Lessons
// =====================================================================================================================

export interface LessonDraftInput {
  subjectId: string;
  title: string;
  slugBase: string;
  kind: LessonKind;
  summary: string | null;
  body: string;
  estimatedMinutes: number;
  accessTier: ContentAccessTier;
  languageCode: string;
  metaTitle: string | null;
  metaDescription: string | null;
  topicIds: readonly string[];
  primaryTopicId: string | null;
  objectiveIds: readonly string[];
  externalRef?: string | null;
}

/** A slug free among LIVE lessons of the subject and `alsoTaken` (slugs given to earlier lessons of the same batch). */
async function freeLessonSlug(tx: Tx, subjectId: string, base: string, alsoTaken: ReadonlySet<string>): Promise<string> {
  const rows = await tx.lesson.findMany({ where: { draftOfId: null, subjectId, slug: { startsWith: base } }, select: { slug: true }, take: 2_000 });
  return nextFreeSlug(base, new Set([...rows.map((row) => row.slug), ...alsoTaken]));
}

/** Inserts one DRAFT lesson with its render cache, topic tags (one primary), objectives and media usage. */
export async function insertLessonDraft(
  tx: Tx,
  lesson: LessonDraftInput,
  origin: DraftOrigin,
  provenance: DraftProvenance,
  batchSlugs: Set<string> = new Set(),
): Promise<{ id: string; slug: string }> {
  const slug = await freeLessonSlug(tx, lesson.subjectId, lesson.slugBase || "lesson", batchSlugs);
  batchSlugs.add(slug);
  const resolveAsset = await loadAssetResolver([lesson.body], tx);
  const rendered = renderContent(lesson.body, { ...LESSON_RENDER_OPTIONS, resolveAsset });
  const topicIds = [...new Set(lesson.topicIds.map((id) => id.toLowerCase()))];
  const primary = lesson.primaryTopicId && topicIds.includes(lesson.primaryTopicId.toLowerCase()) ? lesson.primaryTopicId.toLowerCase() : (topicIds[0] ?? null);
  const created = await tx.lesson.create({
    data: {
      subjectId: lesson.subjectId,
      kind: lesson.kind,
      title: lesson.title,
      slug,
      summary: lesson.summary,
      body: lesson.body,
      bodyHtml: rendered.html,
      renderVersion: PIPELINE_VERSION,
      contentHash: contentHash(lesson.body, LESSON_RENDER_OPTIONS),
      languageCode: lesson.languageCode,
      estimatedMinutes: lesson.estimatedMinutes,
      accessTier: lesson.accessTier,
      metaTitle: lesson.metaTitle,
      metaDescription: lesson.metaDescription,
      externalRef: lesson.externalRef ?? null,
      ...provenanceColumns(provenance),
      ...originColumns(origin),
      ...(topicIds.length > 0 ? { topics: { createMany: { data: topicIds.map((topicId) => ({ topicId, isPrimary: topicId === primary })) } } } : {}),
      ...(lesson.objectiveIds.length > 0 ? { objectives: { createMany: { data: [...new Set(lesson.objectiveIds)].map((objectiveId) => ({ objectiveId })) } } } : {}),
    },
    select: { id: true, slug: true },
  });
  await syncMediaUsage(tx, "LESSON", created.id, { body: lesson.body });
  return created;
}

// =====================================================================================================================
// Topics (into a DRAFT syllabus version)
// =====================================================================================================================

/** Locks the version row (serialises tree edits and publishing) and checks it is still a DRAFT. */
export async function lockDraftSyllabus(tx: Tx, syllabusId: string): Promise<void> {
  const rows = await tx.$queryRaw<{ status: SyllabusStatus }[]>`SELECT "status" FROM "Syllabus" WHERE "id" = ${syllabusId}::uuid FOR UPDATE`;
  const status = rows[0]?.status;
  if (status === undefined) throw AppError.notFound("Syllabus version not found.");
  if (status !== "DRAFT") throw AppError.conflict("This syllabus version is published, so its topic tree is frozen. Import the outline into a new DRAFT version.");
}

/**
 * Inserts an outline's topics and learning objectives under the given parents (after their existing children), with
 * materialised paths, unique slugs and `importId` (§25 traceability). Pre-order input keeps parents before children.
 */
export async function insertTopicOutline(tx: Tx, syllabusId: string, topics: readonly PreparedTopic[], importId: string): Promise<{ topics: number; objectives: number }> {
  await lockDraftSyllabus(tx, syllabusId);
  const existing = await tx.topic.findMany({ where: { syllabusId }, select: { id: true, parentId: true, path: true, depth: true, sortOrder: true, slug: true } });
  const taken = new Set(existing.map((row) => row.slug));
  const byId = new Map(existing.map((row) => [row.id, row]));
  const nextOrder = new Map<string, number>();
  for (const row of existing) {
    const key = row.parentId ?? "";
    nextOrder.set(key, Math.max(nextOrder.get(key) ?? 0, row.sortOrder + 1));
  }
  const placed = new Map<string, { id: string; path: string; depth: number }>();
  const topicRows: Prisma.TopicCreateManyInput[] = [];
  const objectiveRows: Prisma.LearningObjectiveCreateManyInput[] = [];
  for (const topic of topics) {
    const id = randomUUID();
    const parent = topic.parentKey ? placed.get(topic.parentKey) : topic.parentTopicId ? byId.get(topic.parentTopicId) : null;
    if ((topic.parentKey || topic.parentTopicId) && !parent) throw new Error(`insertTopicOutline: parent of row ${topic.row} was not placed`);
    const parentId = parent?.id ?? null;
    const order = nextOrder.get(parentId ?? "") ?? 0;
    nextOrder.set(parentId ?? "", order + 1);
    const path = parent ? `${parent.path}/${id}` : id;
    const depth = parent ? parent.depth + 1 : 0;
    placed.set(topic.key, { id, path, depth });
    const slug = dedupeSlug(topicSlugify(topic.name), taken);
    taken.add(slug);
    topicRows.push({
      id,
      syllabusId,
      parentId,
      kind: topic.kind,
      depth,
      path,
      sortOrder: order,
      code: topic.code,
      name: topic.name,
      slug,
      description: topic.description,
      estimatedStudyMinutes: topic.estimatedStudyMinutes,
      isOptional: topic.isOptional,
      optionGroup: topic.optionGroup,
      importId,
    });
    topic.objectives.forEach((objective, index) => {
      objectiveRows.push({ id: randomUUID(), topicId: id, code: objective.code, statement: objective.statement, sortOrder: index });
    });
  }
  if (topicRows.length > 0) await tx.topic.createMany({ data: topicRows });
  if (objectiveRows.length > 0) await tx.learningObjective.createMany({ data: objectiveRows });
  return { topics: topicRows.length, objectives: objectiveRows.length };
}
